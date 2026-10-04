import { cache } from "react";
import { applyEastPierceCityFilters } from "@/lib/listing-index-policy";
import { ONSITE_BROKERAGE_NAME, ONSITE_LEAD_AGENTS } from "@/lib/onsite-listings";
import { enrichListingsResponse, repliersListingsUrl, type RepliersRaw } from "@/lib/repliers-enrich";
import { repliersImageUrl } from "@/lib/repliers-images";
import { formatStreetAddress } from "@/lib/format-address";
import { formatBathroomCount } from "@/lib/format-bathrooms";
import {
  getUpcomingOpenHouses,
  openHouseSortKey,
  pacificDateString,
  type OpenHouseEntry,
} from "@/lib/open-house";

// Same cache window as the rest of the Repliers listing data (listing-fetch.ts).
const REPLIERS_REVALIDATE = 300;
const RESULTS_PER_QUERY = 100;
const MAX_PAGES = 3;
// Only look a week ahead — the section is sorted soonest first anyway.
const LOOKAHEAD_DAYS = 7;

/** Slim, serializable listing shape for the homepage open house cards. */
export type OpenHouseListing = {
  mlsNumber: string;
  listPrice: number | null;
  street: string;
  cityLine: string;
  state: string | null;
  beds: number | null;
  baths: string | null;
  sqft: number | null;
  image: string | null;
  brokerageName: string | null;
  openHouses: OpenHouseEntry[];
};

type RepliersOpenHouseRow = {
  mlsNumber?: string;
  listPrice?: number | string | null;
  address?: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    streetDirectionPrefix?: string;
    unitNumber?: string | null;
    city?: string;
    state?: string;
    zip?: string;
  } | null;
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    numBathroomsHalf?: number | null;
    sqft?: number | string | null;
  } | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string } | null;
  office?: { brokerageName?: string | null } | null;
  raw?: RepliersRaw;
  openHouse?: OpenHouseEntry[] | null;
};

function num(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : null;
}

/** Repliers search URL that also returns the `openHouse` array. */
function openHouseSearchUrl(params: URLSearchParams) {
  const u = new URL(repliersListingsUrl(`?${params.toString()}`));
  u.searchParams.set("fields", `${u.searchParams.get("fields")},openHouse`);
  return u.toString();
}

async function fetchPage(params: URLSearchParams, pageNum: number) {
  const pageParams = new URLSearchParams(params);
  pageParams.set("pageNum", String(pageNum));
  const res = await fetch(openHouseSearchUrl(pageParams), {
    headers: {
      "repliers-api-key": process.env.REPLIERS_API_KEY || "",
      "Content-Type": "application/json",
    },
    next: { revalidate: REPLIERS_REVALIDATE },
  });
  if (!res.ok) return null;
  return enrichListingsResponse(await res.json()) as {
    count?: number;
    listings?: RepliersOpenHouseRow[];
  };
}

async function fetchRows(params: URLSearchParams): Promise<RepliersOpenHouseRow[]> {
  try {
    const first = await fetchPage(params, 1);
    if (!first) return [];
    const rows = Array.isArray(first.listings) ? [...first.listings] : [];
    const total = typeof first.count === "number" ? first.count : rows.length;
    const pages = Math.min(MAX_PAGES, Math.ceil(total / RESULTS_PER_QUERY));
    for (let pageNum = 2; pageNum <= pages; pageNum++) {
      const next = await fetchPage(params, pageNum);
      if (!next?.listings?.length) break;
      rows.push(...next.listings);
    }
    return rows;
  } catch {
    return [];
  }
}

function toCard(row: RepliersOpenHouseRow): OpenHouseListing | null {
  if (!row.mlsNumber) return null;
  // Visitors need an address to attend; skip listings that withhold it.
  if (row.permissions?.displayAddressOnInternet === "N") return null;
  const a = row.address ?? {};
  const street = formatStreetAddress(a);
  if (!street) return null;
  const det = row.details ?? {};
  return {
    mlsNumber: row.mlsNumber,
    listPrice: num(row.listPrice),
    street,
    cityLine: [a.city, a.state, a.zip].filter(Boolean).join(", "),
    state: a.state ?? null,
    beds: num(det.numBedrooms),
    baths: formatBathroomCount(det, row.raw) || null,
    sqft: num(det.sqft),
    image: repliersImageUrl(row.images?.[0], "medium"),
    brokerageName: row.office?.brokerageName?.trim() || null,
    openHouses: (row.openHouse ?? []).map((oh) => ({
      date: oh.date ?? null,
      startTime: oh.startTime ?? null,
      endTime: oh.endTime ?? null,
      type: oh.type ?? null,
      status: oh.status ?? null,
    })),
  };
}

/**
 * Active listings with an open house that is upcoming or happening now,
 * soonest first. Scope matches the site's listing index policy: East Pierce
 * cities plus OnSite's own listings (Timber Real Estate brokerage and lead
 * agents) wherever they are. Data comes from Repliers (NWMLS via MLS Grid)
 * using the existing REPLIERS_API_KEY — returns [] when the key is missing
 * or the API fails, so callers can simply hide the section. `asOfMs` is the
 * instant the upcoming/past cut was made (pass it on as the render time).
 */
export const getUpcomingOpenHouseListings = cache(
  async (limit = 8): Promise<{ listings: OpenHouseListing[]; asOfMs: number }> => {
    const nowMs = Date.now();
    if (!process.env.REPLIERS_API_KEY) return { listings: [], asOfMs: nowMs };

    const base = new URLSearchParams({
      resultsPerPage: String(RESULTS_PER_QUERY),
      pageNum: "1",
      state: "WA",
      // Repliers matches on the open house's local date, so "today" in Pacific
      // keeps open houses later today (and ones in progress) in the result set.
      minOpenHouseDate: pacificDateString(nowMs),
      maxOpenHouseDate: pacificDateString(nowMs + LOOKAHEAD_DAYS * 86_400_000),
      sortBy: "updatedOnDesc",
    });
    base.append("standardStatus", "Active");
    base.append("standardStatus", "Active Under Contract");

    const eastPierce = new URLSearchParams(base);
    applyEastPierceCityFilters(eastPierce);

    const brokerage = new URLSearchParams(base);
    brokerage.set("office.brokerageName", ONSITE_BROKERAGE_NAME);

    const agents = new URLSearchParams(base);
    const agentIds = ONSITE_LEAD_AGENTS.flatMap((a) => a.boardAgentIds ?? []);
    for (const id of agentIds) agents.append("boardAgentId", id);

    const results = await Promise.all([
      fetchRows(eastPierce),
      fetchRows(brokerage),
      agentIds.length ? fetchRows(agents) : Promise.resolve([]),
    ]);

    const byMls = new Map<string, { card: OpenHouseListing; next: number }>();
    for (const row of results.flat()) {
      if (!row?.mlsNumber || byMls.has(row.mlsNumber)) continue;
      const card = toCard(row);
      if (!card) continue;
      const upcoming = getUpcomingOpenHouses(card.openHouses, nowMs);
      if (upcoming.length === 0) continue;
      byMls.set(card.mlsNumber, { card, next: openHouseSortKey(upcoming[0]) });
    }

    const listings = Array.from(byMls.values())
      .sort((a, b) => a.next - b.next)
      .slice(0, limit)
      .map((entry) => entry.card);
    return { listings, asOfMs: nowMs };
  }
);
