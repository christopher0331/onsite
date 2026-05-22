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
      // Repliers stores NWMLS listings under their prefixed id (e.g.
      // "NWM2310987"). When the auditor types or links to the bare
      // "2310987" form, the direct GET above 404s. Try the prefixed /
      // de-prefixed direct GETs before falling back to the search query.
      const isNwmls = /^(NWM)?\d+$/.test(mlsNumber);
      const bare = mlsNumber.replace(/^[A-Z]+/, "");
      const prefixed = `NWM${bare}`;

      const directVariants = isNwmls
        ? Array.from(new Set([prefixed, bare].filter((v) => v && v !== mlsNumber)))
        : [];
      for (const variant of directVariants) {
        const r = await fetch(`${REPLIERS_BASE}/${encodeURIComponent(variant)}`, FETCH_OPTS);
        if (r.ok) {
          const data = await r.json();
          if (data?.mlsNumber) return NextResponse.json(data);
        }
      }

      // Final fallback: searchFields=mlsNumber. Repliers' search index does
      // not always cover legacy NWMLS ids, so this only succeeds for some
      // boards — kept as a last resort.
      const attempts: { term: string; board?: string }[] = isNwmls
        ? [
            { term: prefixed, board: "110" },
            { term: bare,     board: "110" },
            { term: prefixed },
            { term: bare },
          ]
        : [
            { term: mlsNumber },
            { term: bare },
          ];

      for (const { term, board } of attempts) {
        const p = new URLSearchParams({
          searchFields: "mlsNumber",
          search: term,
          pageSize: "1",
        });
        if (board) p.set("boardId", board);
        const fallback = await fetch(`${REPLIERS_BASE}?${p}`, FETCH_OPTS);
        if (fallback.ok) {
          const payload = await fallback.json();
          const hit = Array.isArray(payload?.listings) ? payload.listings[0] : null;
          if (hit) return NextResponse.json(hit);
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
