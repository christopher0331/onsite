import { NextRequest, NextResponse } from "next/server";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import {
  buildListingsQueryParams,
  listingInBounds,
  type MapBounds,
} from "@/lib/listings-api-params";

const PAGE_SIZE = "100";
const MAX_PAGES_WITH_CITY = 30;
const MAX_PAGES_WITHOUT_CITY = 15;
const MAX_RETURN = 400;

type ListingRow = {
  mlsNumber?: string;
  map?: { latitude?: number | null; longitude?: number | null } | null;
  details?: { numBathrooms?: number | null };
};

function parseBounds(searchParams: URLSearchParams): MapBounds | null {
  const north = Number(searchParams.get("north"));
  const south = Number(searchParams.get("south"));
  const east = Number(searchParams.get("east"));
  const west = Number(searchParams.get("west"));
  if ([north, south, east, west].some((n) => Number.isNaN(n))) return null;
  return { north, south, east, west };
}

async function fetchAllForQuery(baseParams: URLSearchParams, maxPages: number) {
  const headers = {
    "repliers-api-key": process.env.REPLIERS_API_KEY || "",
    "Content-Type": "application/json",
  };

  const firstParams = new URLSearchParams(baseParams);
  firstParams.set("pageSize", PAGE_SIZE);
  firstParams.set("page", "1");

  const firstRes = await fetch(repliersListingsUrl(`?${firstParams.toString()}`), {
    headers,
    next: { revalidate: 300 },
  });
  if (!firstRes.ok) return { listings: [] as ListingRow[], total: 0, scanned: 0 };

  const firstData = enrichListingsResponse(await firstRes.json());
  const total =
    typeof (firstData as { count?: unknown }).count === "number"
      ? ((firstData as { count: number }).count ?? 0)
      : 0;
  const listings = [...((firstData.listings ?? []) as ListingRow[])];
  const pages = Math.min(maxPages, Math.max(1, Math.ceil(total / Number(PAGE_SIZE))));

  for (let page = 2; page <= pages; page++) {
    const pageParams = new URLSearchParams(baseParams);
    pageParams.set("pageSize", PAGE_SIZE);
    pageParams.set("page", String(page));
    const res = await fetch(repliersListingsUrl(`?${pageParams.toString()}`), {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) break;
    const data = enrichListingsResponse(await res.json());
    listings.push(...((data.listings ?? []) as ListingRow[]));
  }

  return { listings, total, scanned: listings.length };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bounds = parseBounds(searchParams);
  if (!bounds) {
    return NextResponse.json({ error: "north, south, east, west are required" }, { status: 400 });
  }

  const minBaths = searchParams.get("minBaths");
  const city = searchParams.get("city")?.trim() || "";
  const baseParams = buildListingsQueryParams(searchParams, PAGE_SIZE, "1");

  try {
    const maxPages = city ? MAX_PAGES_WITH_CITY : MAX_PAGES_WITHOUT_CITY;
    const { listings, total, scanned } = await fetchAllForQuery(baseParams, maxPages);

    let filtered = listings.filter((row) => row.mlsNumber && listingInBounds(row, bounds));

    if (minBaths) {
      const min = Number(minBaths);
      if (!Number.isNaN(min)) {
        filtered = filtered.filter((row) => (row.details?.numBathrooms ?? 0) >= min);
      }
    }

    const withCoords = listings.filter(
      (row) =>
        row.mlsNumber &&
        typeof row.map?.latitude === "number" &&
        typeof row.map?.longitude === "number"
    );

    let poolFiltered = withCoords;
    if (minBaths) {
      const min = Number(minBaths);
      if (!Number.isNaN(min)) {
        poolFiltered = poolFiltered.filter((row) => (row.details?.numBathrooms ?? 0) >= min);
      }
    }

    const inBounds = poolFiltered.filter((row) => listingInBounds(row, bounds)).slice(0, MAX_RETURN);

    return NextResponse.json({
      listings: inBounds,
      pool: city ? poolFiltered : undefined,
      inBoundsCount: poolFiltered.filter((row) => listingInBounds(row, bounds)).length,
      areaTotal: total,
      searchCity: city || null,
      scanned,
      truncated: !city && scanned < total,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
