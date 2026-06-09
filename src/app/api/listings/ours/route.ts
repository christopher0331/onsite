import { NextRequest, NextResponse } from "next/server";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import type { CardListing } from "@/components/ListingCard";
import {
  mergeOnsiteListings,
  ONSITE_BROKERAGE_NAME,
  ONSITE_LEAD_AGENT_NAME,
  parseOnsiteListingScope,
  sortOnsiteListings,
  tagOnsiteListings,
} from "@/lib/onsite-listings";

const ALLOWED_SORT_BY = new Set([
  "createdOnDesc",
  "createdOnAsc",
  "updatedOnDesc",
  "updatedOnAsc",
  "listPriceAsc",
  "listPriceDesc",
  "soldDateDesc",
]);

type ListingRow = CardListing & {
  agents?: Array<{ name?: string }>;
};

function applyStatus(params: URLSearchParams, status: string) {
  switch (status) {
    case "All":
      params.append("standardStatus", "Active");
      params.append("standardStatus", "Active Under Contract");
      params.append("standardStatus", "Pending");
      params.append("standardStatus", "Closed");
      break;
    case "P":
      params.append("standardStatus", "Pending");
      params.append("standardStatus", "Active Under Contract");
      break;
    case "U":
      params.set("standardStatus", "Closed");
      break;
    case "A":
    default:
      params.append("standardStatus", "Active");
      params.append("standardStatus", "Active Under Contract");
      break;
  }
}

async function fetchScope(params: URLSearchParams) {
  const headers = {
    "repliers-api-key": process.env.REPLIERS_API_KEY || "",
    "Content-Type": "application/json",
  };

  // Repliers paginates with `pageNum`/`resultsPerPage`; the `page`/`pageSize`
  // request params are ignored (they only echo back as metadata), so sending
  // them returns page 1 every time and floods the pool with duplicates.
  const resultsPerPage = params.get("pageSize") || "100";
  const fetchPage = async (pageNum: number) => {
    const pageParams = new URLSearchParams(params);
    pageParams.delete("page");
    pageParams.delete("pageSize");
    pageParams.set("resultsPerPage", resultsPerPage);
    pageParams.set("pageNum", String(pageNum));
    const res = await fetch(repliersListingsUrl(`?${pageParams.toString()}`), {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return enrichListingsResponse(await res.json());
  };

  const firstPayload = await fetchPage(1);
  if (!firstPayload) return [];

  const total =
    typeof (firstPayload as { count?: unknown }).count === "number"
      ? ((firstPayload as { count: number }).count ?? 0)
      : 0;

  // Dedupe by MLS# — the feed can return the same listing across pages.
  const byMls = new Map<string, ListingRow>();
  const ingest = (payload: { listings?: unknown }) => {
    for (const row of (payload.listings ?? []) as ListingRow[]) {
      if (row?.mlsNumber && !byMls.has(row.mlsNumber)) byMls.set(row.mlsNumber, row);
    }
  };
  ingest(firstPayload);

  const pages = Math.ceil(total / Number(resultsPerPage));
  for (let pageNum = 2; pageNum <= pages; pageNum++) {
    const payload = await fetchPage(pageNum);
    if (!payload) break;
    ingest(payload);
  }

  return Array.from(byMls.values());
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "All";
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const pageSize = Math.min(48, Math.max(1, Number(searchParams.get("pageSize") || "24")));
  const city = searchParams.get("city");
  const state = searchParams.get("state") || "WA";
  const sortBy = searchParams.get("sortBy") || "updatedOnDesc";
  const scope = parseOnsiteListingScope(searchParams.get("scope"));

  const base = new URLSearchParams({
    pageSize: "100",
    page: "1",
    state,
  });
  applyStatus(base, status);
  if (city) base.set("city", city);
  if (ALLOWED_SORT_BY.has(sortBy)) base.set("sortBy", sortBy);

  const timberParams = new URLSearchParams(base);
  timberParams.set("office.brokerageName", ONSITE_BROKERAGE_NAME);

  const andreParams = new URLSearchParams(base);
  andreParams.set("searchFields", "agents.name");
  andreParams.set("search", ONSITE_LEAD_AGENT_NAME);

  try {
    const [timber, andre] = await Promise.all([
      fetchScope(timberParams),
      fetchScope(andreParams),
    ]);

    let merged =
      scope === "andre"
        ? tagOnsiteListings(andre)
        : scope === "timber"
          ? tagOnsiteListings(timber)
          : mergeOnsiteListings(timber, andre);

    merged = sortOnsiteListings(merged, sortBy, scope);
    const start = (page - 1) * pageSize;
    const slice = merged.slice(start, start + pageSize);

    return NextResponse.json({
      count: merged.length,
      numPages: Math.max(1, Math.ceil(merged.length / pageSize)),
      page,
      pageSize,
      scope,
      timberCount: timber.length,
      andreCount: andre.length,
      listings: slice,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
