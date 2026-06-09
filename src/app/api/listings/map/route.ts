import { NextRequest, NextResponse } from "next/server";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import {
  buildListingsQueryParams,
  listingInBounds,
  type MapBounds,
} from "@/lib/listings-api-params";

const PAGE_SIZE = "100";
const MAX_PAGES = 12; // up to ~1,200 listings per viewport before clustering carries the rest
const MAX_RETURN = 1200;

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

// Repliers accepts a GeoJSON polygon (`map`) as a nested ring of [lng, lat]
// pairs. We build a closed rectangle from the viewport bounds so the query
// returns every listing inside the visible map area, across all cities.
function polygonFromBounds(b: MapBounds): string {
  const ring = [
    [b.west, b.north],
    [b.east, b.north],
    [b.east, b.south],
    [b.west, b.south],
    [b.west, b.north],
  ];
  return JSON.stringify([ring]);
}

async function fetchAllForQuery(baseParams: URLSearchParams, maxPages: number) {
  const headers = {
    "repliers-api-key": process.env.REPLIERS_API_KEY || "",
    "Content-Type": "application/json",
  };

  // Repliers paginates with `pageNum`/`resultsPerPage` — the `page`/`pageSize`
  // names are response-only metadata and are ignored as request params (sending
  // them returns page 1 every time).
  const fetchPage = async (pageNum: number) => {
    const pageParams = new URLSearchParams(baseParams);
    pageParams.delete("page");
    pageParams.delete("pageSize");
    pageParams.set("resultsPerPage", PAGE_SIZE);
    pageParams.set("pageNum", String(pageNum));
    const res = await fetch(repliersListingsUrl(`?${pageParams.toString()}`), {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return enrichListingsResponse(await res.json());
  };

  const firstData = await fetchPage(1);
  if (!firstData) return { listings: [] as ListingRow[], total: 0, scanned: 0 };

  const total =
    typeof (firstData as { count?: unknown }).count === "number"
      ? ((firstData as { count: number }).count ?? 0)
      : 0;

  // Dedupe by MLS# — the NWMLS/Repliers feed returns the same listing more than
  // once (re-lists, multi-board entries, overlapping pages), which inflated the
  // map counts well beyond the number of unique pins actually rendered.
  const byMls = new Map<string, ListingRow>();
  const ingest = (rows: ListingRow[]) => {
    for (const row of rows) {
      if (row?.mlsNumber && !byMls.has(row.mlsNumber)) byMls.set(row.mlsNumber, row);
    }
  };

  ingest((firstData.listings ?? []) as ListingRow[]);
  const pages = Math.min(maxPages, Math.max(1, Math.ceil(total / Number(PAGE_SIZE))));

  for (let pageNum = 2; pageNum <= pages; pageNum++) {
    const data = await fetchPage(pageNum);
    if (!data) break;
    ingest((data.listings ?? []) as ListingRow[]);
  }

  const listings = Array.from(byMls.values());
  return { listings, total, scanned: listings.length };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bounds = parseBounds(searchParams);
  if (!bounds) {
    return NextResponse.json({ error: "north, south, east, west are required" }, { status: 400 });
  }

  const minBaths = searchParams.get("minBaths");
  // The viewport polygon defines the search area so listings from every city in
  // view are returned. An explicit user-typed `city` filter (if present) still
  // narrows within that area via buildListingsQueryParams.
  const baseParams = buildListingsQueryParams(searchParams, PAGE_SIZE, "1");
  baseParams.set("map", polygonFromBounds(bounds));

  try {
    const { listings, total, scanned } = await fetchAllForQuery(baseParams, MAX_PAGES);

    // Only listings with real coordinates can render as pins — these are the
    // numbers the UI should report so the counts match what's on the map.
    let mappable = listings.filter(
      (row) =>
        row.mlsNumber &&
        typeof row.map?.latitude === "number" &&
        typeof row.map?.longitude === "number"
    );

    if (minBaths) {
      const min = Number(minBaths);
      if (!Number.isNaN(min)) {
        mappable = mappable.filter((row) => (row.details?.numBathrooms ?? 0) >= min);
      }
    }

    // The polygon already constrains results to the viewport; this is a safety
    // net against any edge listings Repliers includes outside the exact box.
    const inBoundsAll = mappable.filter((row) => listingInBounds(row, bounds));
    const inBounds = inBoundsAll.slice(0, MAX_RETURN);

    return NextResponse.json({
      listings: inBounds,
      inBoundsCount: inBoundsAll.length,
      areaTotal: total,
      truncated: total > scanned,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
