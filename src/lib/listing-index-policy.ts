/**
 * Listing index policy — locked 2026-09-17 (Christopher).
 *
 * Indexable set: East Pierce cities ∪ OnSite agents’ listings (`/api/listings/ours`).
 * Rule: indexable = isOurs OR cityInEastPierceAllowlist
 *
 * Non-allowlisted `/listings/[mlsNumber]` stay 200 OK for humans with
 * `noindex,follow`. Do not Disallow `/listings` in robots.txt.
 */

import {
  listingMatchesAgent,
  ONSITE_BROKERAGE_NAME,
  ONSITE_LEAD_AGENTS,
} from "@/lib/onsite-listings";

/** Canonical East Pierce city names as they appear in the NWMLS/Repliers `city` field. */
export const EAST_PIERCE_CITIES = [
  "Lake Tapps",
  "Bonney Lake",
  "Sumner",
  "Edgewood",
  "Milton",
  "Buckley",
  "Puyallup",
  "Graham",
  "Auburn",
  "Orting",
  "Enumclaw",
  "South Prairie",
  "Carbonado",
] as const;

export type EastPierceCity = (typeof EAST_PIERCE_CITIES)[number];

export function normalizeCityName(city: string | null | undefined): string {
  return (city ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

const EAST_PIERCE_NORMALIZED = new Set(
  EAST_PIERCE_CITIES.map((city) => normalizeCityName(city))
);

export function isEastPierceCity(city: string | null | undefined): boolean {
  const key = normalizeCityName(city);
  return key.length > 0 && EAST_PIERCE_NORMALIZED.has(key);
}

type OursCheckListing = {
  office?: { brokerageName?: string | null } | null;
  agents?: Array<{ name?: string; boardAgentId?: string }> | null;
};

/**
 * True when this listing would be returned by `/api/listings/ours`
 * (Timber brokerage and/or André/Cindie roster).
 */
export function isOnsiteOursListing(listing: OursCheckListing | null | undefined): boolean {
  if (!listing) return false;
  const office = listing.office?.brokerageName?.trim() ?? "";
  if (office.toLowerCase() === ONSITE_BROKERAGE_NAME.trim().toLowerCase()) {
    return true;
  }
  return ONSITE_LEAD_AGENTS.some((agent) =>
    listingMatchesAgent({ agents: listing.agents }, agent)
  );
}

export function isListingIndexable(listing: {
  address?: { city?: string | null } | null;
  office?: { brokerageName?: string | null } | null;
  agents?: Array<{ name?: string; boardAgentId?: string }> | null;
} | null | undefined): boolean {
  if (!listing) return false;
  return isOnsiteOursListing(listing) || isEastPierceCity(listing.address?.city);
}

/**
 * Public `/api/listings` (and the /listings hub) default to East Pierce unless
 * the caller already scoped the query (city/ZIP, map viewport, MLS# lookup,
 * statewide opt-out, or an OnSite-only filter).
 */
export function shouldDefaultEastPierceScope(searchParams: URLSearchParams): boolean {
  if (searchParams.get("geo") === "statewide") return false;
  if (searchParams.get("searchFields") === "mlsNumber") return false;
  if (searchParams.get("city")) return false;
  if (searchParams.get("brokerageOnly") === "true") return false;
  if (searchParams.get("agentOnly") === "true") return false;
  if (searchParams.get("agentName")) return false;
  if (
    searchParams.get("north") &&
    searchParams.get("south") &&
    searchParams.get("east") &&
    searchParams.get("west")
  ) {
    return false;
  }
  return true;
}

export function applyEastPierceCityFilters(params: URLSearchParams) {
  for (const city of EAST_PIERCE_CITIES) {
    params.append("city", city);
  }
}

export function cityHubPath(city: string | null | undefined): string {
  const trimmed = (city ?? "").trim();
  if (!trimmed) return "/listings";
  return `/listings?city=${encodeURIComponent(trimmed)}`;
}
