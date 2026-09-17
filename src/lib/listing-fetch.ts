import { cache } from "react";
import type { CardListing } from "@/components/ListingCard";
import {
  applyEastPierceCityFilters,
  EAST_PIERCE_CITIES,
  isListingIndexable,
} from "@/lib/listing-index-policy";
import {
  mergeOnsiteListings,
  ONSITE_BROKERAGE_NAME,
  ONSITE_LEAD_AGENTS,
  parseOnsiteListingScope,
  sortOnsiteListings,
  tagOnsiteListings,
  type OnsiteListing,
  type OnsiteListingScope,
} from "@/lib/onsite-listings";
import { enrichListing, enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";

const REPLIERS_REVALIDATE = 300;
const SITEMAP_MAX_LISTINGS = 5000;
const SITEMAP_MAX_PAGES = 40;

function repliersHeaders() {
  return {
    "repliers-api-key": process.env.REPLIERS_API_KEY || "",
    "Content-Type": "application/json",
  };
}

function fetchOpts() {
  return {
    headers: repliersHeaders(),
    next: { revalidate: REPLIERS_REVALIDATE } as const,
  };
}

export async function fetchListingByMlsNumber(mlsNumber: string) {
  if (!mlsNumber || !process.env.REPLIERS_API_KEY) return null;

  try {
    const direct = await fetch(
      repliersListingsUrl(`/${encodeURIComponent(mlsNumber)}`),
      fetchOpts()
    );
    if (direct.ok) {
      const data = enrichListing(await direct.json());
      return data?.mlsNumber ? data : null;
    }

    if (direct.status !== 404) return null;

    const isNwmls = /^(NWM)?\d+$/.test(mlsNumber);
    const bare = mlsNumber.replace(/^[A-Z]+/, "");
    const prefixed = `NWM${bare}`;

    const directVariants = isNwmls
      ? Array.from(new Set([prefixed, bare].filter((v) => v && v !== mlsNumber)))
      : [];
    for (const variant of directVariants) {
      const r = await fetch(repliersListingsUrl(`/${encodeURIComponent(variant)}`), fetchOpts());
      if (r.ok) {
        const data = enrichListing(await r.json());
        if (data?.mlsNumber) return data;
      }
    }

    const attempts: { term: string; board?: string }[] = isNwmls
      ? [
          { term: prefixed, board: "110" },
          { term: bare, board: "110" },
          { term: prefixed },
          { term: bare },
        ]
      : [{ term: mlsNumber }, { term: bare }];

    for (const { term, board } of attempts) {
      const p = new URLSearchParams({
        searchFields: "mlsNumber",
        search: term,
        pageSize: "1",
      });
      if (board) p.set("boardId", board);
      const fallback = await fetch(repliersListingsUrl(`?${p}`), fetchOpts());
      if (fallback.ok) {
        const payload = await fallback.json();
        const hit = Array.isArray(payload?.listings) ? payload.listings[0] : null;
        if (hit) {
          const data = enrichListing(hit);
          if (data?.mlsNumber) return data;
        }
      }
    }
  } catch {
    return null;
  }

  return null;
}

/** Request-deduped listing fetch for generateMetadata + the App Router page. */
export const getListingByMlsNumber = cache(fetchListingByMlsNumber);

type ListingRow = CardListing & {
  agents?: Array<{ name?: string; boardAgentId?: string }>;
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
  const resultsPerPage = params.get("pageSize") || "100";
  const fetchPage = async (pageNum: number) => {
    const pageParams = new URLSearchParams(params);
    pageParams.delete("page");
    pageParams.delete("pageSize");
    pageParams.set("resultsPerPage", resultsPerPage);
    pageParams.set("pageNum", String(pageNum));
    const res = await fetch(repliersListingsUrl(`?${pageParams.toString()}`), fetchOpts());
    if (!res.ok) return null;
    return enrichListingsResponse(await res.json());
  };

  const firstPayload = await fetchPage(1);
  if (!firstPayload) return [];

  const total =
    typeof (firstPayload as { count?: unknown }).count === "number"
      ? ((firstPayload as { count: number }).count ?? 0)
      : 0;

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

const ALLOWED_SORT_BY = new Set([
  "createdOnDesc",
  "createdOnAsc",
  "updatedOnDesc",
  "updatedOnAsc",
  "listPriceAsc",
  "listPriceDesc",
  "soldDateDesc",
]);

export type OnsiteListingsPage = {
  count: number;
  numPages: number;
  page: number;
  pageSize: number;
  scope: OnsiteListingScope;
  timberCount: number;
  agentCounts: Record<string, number>;
  listings: OnsiteListing[];
};

async function loadOnsiteListings(opts: {
  status?: string;
  city?: string | null;
  state?: string;
  sortBy?: string;
  scope?: string | null;
}): Promise<Omit<OnsiteListingsPage, "page" | "pageSize" | "numPages"> & { listings: OnsiteListing[] }> {
  const status = opts.status || "All";
  const state = opts.state || "WA";
  const sortBy = opts.sortBy || "updatedOnDesc";
  const scope = parseOnsiteListingScope(opts.scope ?? null);
  const empty = {
    count: 0,
    scope,
    timberCount: 0,
    agentCounts: {} as Record<string, number>,
    listings: [] as OnsiteListing[],
  };

  if (!process.env.REPLIERS_API_KEY) return empty;

  const base = new URLSearchParams({
    pageSize: "100",
    page: "1",
    state,
  });
  applyStatus(base, status);
  if (opts.city) base.set("city", opts.city);
  if (ALLOWED_SORT_BY.has(sortBy)) base.set("sortBy", sortBy);

  const timberParams = new URLSearchParams(base);
  timberParams.set("office.brokerageName", ONSITE_BROKERAGE_NAME);

  const agentParamSets = ONSITE_LEAD_AGENTS.map((agent) => {
    const params = new URLSearchParams(base);
    if (agent.boardAgentIds?.length) {
      for (const id of agent.boardAgentIds) params.append("boardAgentId", id);
    } else if (agent.searchName) {
      params.set("searchFields", "agents.name");
      params.set("search", agent.searchName);
    }
    return { agent, params };
  });

  const [timber, ...agentResults] = await Promise.all([
    fetchScope(timberParams),
    ...agentParamSets.map((set) => fetchScope(set.params)),
  ]);

  const agentCounts: Record<string, number> = {};
  agentParamSets.forEach((set, i) => {
    agentCounts[set.agent.key] = agentResults[i]?.length ?? 0;
  });

  const scopedAgentIndex = agentParamSets.findIndex((set) => set.agent.key === scope);

  let merged =
    scope === "timber"
      ? tagOnsiteListings(timber)
      : scopedAgentIndex >= 0
        ? tagOnsiteListings(agentResults[scopedAgentIndex] ?? [])
        : mergeOnsiteListings(timber, ...agentResults);

  merged = sortOnsiteListings(merged, sortBy, scope);

  return {
    count: merged.length,
    scope,
    timberCount: timber.length,
    agentCounts,
    listings: merged,
  };
}

export async function queryOnsiteListings(opts: {
  status?: string;
  page?: number;
  pageSize?: number;
  city?: string | null;
  state?: string;
  sortBy?: string;
  scope?: string | null;
}): Promise<OnsiteListingsPage> {
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = Math.min(48, Math.max(1, opts.pageSize ?? 24));
  const loaded = await loadOnsiteListings(opts);
  const start = (page - 1) * pageSize;

  return {
    count: loaded.count,
    numPages: Math.max(1, Math.ceil(loaded.count / pageSize)),
    page,
    pageSize,
    scope: loaded.scope,
    timberCount: loaded.timberCount,
    agentCounts: loaded.agentCounts,
    listings: loaded.listings.slice(start, start + pageSize),
  };
}

export type PublicListingsPage = {
  count: number;
  numPages: number;
  page: number;
  listings: CardListing[];
};

export async function queryPublicListingsPage(opts: {
  status?: string;
  page?: number;
  pageSize?: number;
  city?: string;
  state?: string;
  sortBy?: string;
  prependOurs?: boolean;
}): Promise<PublicListingsPage> {
  const status = opts.status || "A";
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = Math.min(48, Math.max(1, opts.pageSize ?? 24));
  const sortBy = ALLOWED_SORT_BY.has(opts.sortBy || "")
    ? (opts.sortBy as string)
    : "createdOnDesc";
  const empty: PublicListingsPage = { count: 0, numPages: 1, page, listings: [] };
  if (!process.env.REPLIERS_API_KEY) return empty;

  const params = new URLSearchParams({
    resultsPerPage: String(pageSize),
    pageNum: String(page),
    state: opts.state || "WA",
    sortBy,
  });
  applyStatus(params, status);
  if (opts.city) {
    const q = opts.city.trim();
    if (/^\d{5}$/.test(q)) params.set("zip", q);
    else params.set("city", q);
  } else {
    applyEastPierceCityFilters(params);
  }

  const res = await fetch(repliersListingsUrl(`?${params.toString()}`), fetchOpts());
  if (!res.ok) return empty;
  const data = enrichListingsResponse(await res.json()) as PublicListingsPage & {
    listings?: CardListing[];
  };
  let listings = Array.isArray(data.listings) ? data.listings : [];
  const count = typeof data.count === "number" ? data.count : listings.length;
  const numPages =
    typeof data.numPages === "number" ? data.numPages : Math.max(1, Math.ceil(count / pageSize));

  const isDefaultBrowse = page === 1 && !opts.city && (opts.prependOurs ?? true);
  if (isDefaultBrowse) {
    try {
      const ours = await queryOnsiteListings({
        status,
        page: 1,
        pageSize: 48,
        state: opts.state || "WA",
        scope: "all",
      });
      const owner = ours.listings ?? [];
      if (owner.length) {
        const ownerIds = new Set(owner.map((l) => l.mlsNumber));
        listings = [...owner, ...listings.filter((l) => !ownerIds.has(l.mlsNumber))];
      }
    } catch {
      // Keep the East Pierce page even if the ours prepend fails.
    }
  }

  return { count, numPages, page, listings };
}

type SitemapListing = {
  mlsNumber: string;
  updatedOn?: string | null;
  timestamps?: { listingUpdated?: string | null } | null;
  listDate?: string | null;
};

async function fetchEastPierceForSaleSitemap(): Promise<SitemapListing[]> {
  const params = new URLSearchParams({
    resultsPerPage: "100",
    pageNum: "1",
    state: "WA",
    sortBy: "updatedOnDesc",
  });
  params.append("standardStatus", "Active");
  params.append("standardStatus", "Active Under Contract");
  params.append("standardStatus", "Pending");
  applyEastPierceCityFilters(params);

  const byMls = new Map<string, SitemapListing>();
  const fetchPage = async (pageNum: number) => {
    const pageParams = new URLSearchParams(params);
    pageParams.set("pageNum", String(pageNum));
    const res = await fetch(repliersListingsUrl(`?${pageParams.toString()}`), {
      headers: repliersHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return enrichListingsResponse(await res.json()) as {
      count?: number;
      listings?: SitemapListing[];
    };
  };

  const first = await fetchPage(1);
  if (!first) return [];
  const total = typeof first.count === "number" ? first.count : 0;
  for (const row of first.listings ?? []) {
    if (row?.mlsNumber) byMls.set(row.mlsNumber, row);
  }

  const pages = Math.min(SITEMAP_MAX_PAGES, Math.max(1, Math.ceil(total / 100)));
  for (let pageNum = 2; pageNum <= pages; pageNum++) {
    if (byMls.size >= SITEMAP_MAX_LISTINGS) break;
    const payload = await fetchPage(pageNum);
    if (!payload) break;
    for (const row of payload.listings ?? []) {
      if (row?.mlsNumber) byMls.set(row.mlsNumber, row);
    }
  }

  return Array.from(byMls.values());
}

export async function getIndexableListingSitemapEntries(): Promise<
  Array<{ mlsNumber: string; lastModified?: Date }>
> {
  if (!process.env.REPLIERS_API_KEY) return [];

  try {
    const [eastPierce, ours] = await Promise.all([
      fetchEastPierceForSaleSitemap(),
      loadOnsiteListings({
        status: "All",
        state: "WA",
        scope: "all",
      }),
    ]);

    const byMls = new Map<string, SitemapListing>();
    for (const row of eastPierce) {
      if (row.mlsNumber) byMls.set(row.mlsNumber, row);
    }
    for (const row of ours.listings) {
      if (row.mlsNumber && isListingIndexable(row)) {
        byMls.set(row.mlsNumber, row);
      }
    }

    return Array.from(byMls.values())
      .slice(0, SITEMAP_MAX_LISTINGS)
      .map((row) => {
        const raw =
          row.timestamps?.listingUpdated || row.updatedOn || row.listDate || undefined;
        const parsed = raw ? Date.parse(raw) : NaN;
        return {
          mlsNumber: row.mlsNumber,
          lastModified: Number.isNaN(parsed) ? undefined : new Date(parsed),
        };
      });
  } catch {
    return [];
  }
}

export { EAST_PIERCE_CITIES };
