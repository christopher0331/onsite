import { NextRequest, NextResponse } from "next/server";

const REPLIERS_BASE = "https://api.repliers.io/listings";
const KEY = process.env.REPLIERS_API_KEY || "";

const FETCH_OPTS = {
  headers: {
    "repliers-api-key": KEY,
    "Content-Type": "application/json",
  },
  next: { revalidate: 300 },
};

// Per Repliers support:
//   1. The canonical mlsNumber may be prefixed (e.g. NWM2310987). When the
//      auditor types `2310987` we still need to find it.
//   2. Direct GET /listings/{id} only works on the exact stored id.
//   3. A search query with `searchFields=mlsNumber&search=X` accepts either
//      the prefixed or the un-prefixed form.
// Strategy: try the direct fetch first (cheap, exact); if it 404s, fall
// back to the search query and return the first match.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mlsNumber: string }> }
) {
  const { mlsNumber } = await params;

  try {
    const direct = await fetch(`${REPLIERS_BASE}/${encodeURIComponent(mlsNumber)}`, FETCH_OPTS);
    if (direct.ok) {
      const data = await direct.json();
      return NextResponse.json(data);
    }

    if (direct.status === 404) {
      const searchUrl = `${REPLIERS_BASE}?searchFields=mlsNumber&search=${encodeURIComponent(mlsNumber)}&pageSize=1`;
      const fallback = await fetch(searchUrl, FETCH_OPTS);
      if (fallback.ok) {
        const payload = await fallback.json();
        const hit = Array.isArray(payload?.listings) ? payload.listings[0] : null;
        if (hit) {
          return NextResponse.json(hit);
        }
      }
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: direct.status }
    );
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
