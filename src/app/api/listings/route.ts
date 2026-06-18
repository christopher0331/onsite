import { NextRequest, NextResponse } from "next/server";
import {
  enrichListing,
  enrichListingsResponse,
  repliersListingsUrl,
} from "@/lib/repliers-enrich";
import { FEATURE_GROUPS, matchFeaturesInText } from "@/lib/listing-search-terms";
import {
  applyHomeTypeFilters,
  applyNativeFeatureFilters,
  applyRangeFilters,
  FEATURE_LABEL_TO_GROUP,
  NATIVE_FEATURE_LABELS,
} from "@/lib/listings-api-params";

const REPLIERS_API = "https://api.repliers.io/listings";
// OnSite operates under the "Timber Real Estate" NWMLS brokerage. Repliers
// ignores the legacy `agentLicense` filter, so owner listings are scoped by
// brokerage name. Override via env if the brokerage affiliation changes.
const ONSITE_BROKERAGE_NAME =
  process.env.ONSITE_BROKERAGE_NAME || "Timber Real Estate";
const ONSITE_LEAD_AGENT_NAME =
  process.env.ONSITE_LEAD_AGENT_NAME || "Andre Bohall";

const ALLOWED_SORT_BY = new Set([
  "createdOnDesc",
  "createdOnAsc",
  "updatedOnDesc",
  "updatedOnAsc",
  "listPriceAsc",
  "listPriceDesc",
  "soldDateDesc",
]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || "A";
  const pageSize = searchParams.get("pageSize") || "24";
  const pageSizeNum = Math.max(1, Number(pageSize) || 24);
  const page = searchParams.get("page") || "1";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minBeds = searchParams.get("minBeds");
  // Numeric ranges (maxBeds, baths, sqft, year, lot, garage) are read and
  // sanitized inside applyRangeFilters; feature checkboxes drive both native
  // filters and remarks matching below.
  const features = searchParams.getAll("features");
  const type = searchParams.getAll("type"); // Multi-select home-type chips
  const city = searchParams.get("city");
  const county = searchParams.get("county");
  const sortBy = searchParams.get("sortBy") || "createdOnDesc";
  const brokerageOnly = searchParams.get("brokerageOnly") === "true";
  const agentOnly = searchParams.get("agentOnly") === "true";
  const agentName = searchParams.get("agentName");
  const search = searchParams.get("search");
  const searchFields = searchParams.get("searchFields");
  const state = searchParams.get("state");
  const boardId = searchParams.get("boardId");

  // MLS# direct lookup — Repliers' searchFields param is unreliable.
  // When the caller passes searchFields=mlsNumber we do a direct GET
  // on the listing ID and return it as a single-item array so the grid
  // renders exactly like a normal results page.
  if (searchFields === "mlsNumber" && search) {
    const bare = search.replace(/^[A-Za-z]+/, "");
    const candidates = [`NWM${bare}`, bare, search];
    const headers = {
      "repliers-api-key": process.env.REPLIERS_API_KEY || "",
      "Content-Type": "application/json",
    };
    for (const id of candidates) {
      const res = await fetch(repliersListingsUrl(`/${encodeURIComponent(id)}`), {
        headers,
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const listing = enrichListing(await res.json());
        if (listing?.mlsNumber) {
          return NextResponse.json({ count: 1, numPages: 1, page: 1, listings: [listing] });
        }
      }
    }
    return NextResponse.json({ count: 0, numPages: 0, page: 1, listings: [] });
  }

  // Repliers paginates with `pageNum`/`resultsPerPage`. The `page`/`pageSize`
  // names are response-only metadata and are ignored as request params, so
  // sending them returns page 1 every time (broken Next/Prev navigation).
  const params = new URLSearchParams({ resultsPerPage: pageSize, pageNum: page });

  // When many "home feature" checkboxes are selected, we need a wider candidate
  // pool before text matching in remarks; otherwise page-size=24 can falsely
  // look like "no results" even when nearby matches exist.
  if (features.length > 0 && page === "1" && pageSizeNum < 100) {
    params.set("resultsPerPage", "100");
  }

  if (state) params.set("state", state);
  if (boardId) params.set("boardId", boardId);

  // Friendly status filter → Repliers `standardStatus` (RESO compliant).
  // Per Repliers support: prefer standardStatus over lastStatus / status
  // for filtering. Multiple values are sent as repeated params (Repliers
  // array notation).
  switch (status) {
    case "All":
      // Repliers returns 0 results when standardStatus is omitted — must
      // enumerate all statuses explicitly to get the full feed.
      params.append("standardStatus", "Active");
      params.append("standardStatus", "Active Under Contract");
      params.append("standardStatus", "Pending");
      params.append("standardStatus", "Closed");
      break;
    case "P": // Pending — includes Active Under Contract (contingent)
      params.append("standardStatus", "Pending");
      params.append("standardStatus", "Active Under Contract");
      break;
    case "U": // Sold
      params.set("standardStatus", "Closed");
      break;
    case "A":
    default:
      // NWMLS requires contingent (Active Under Contract) to appear
      // alongside Active listings in search results.
      params.append("standardStatus", "Active");
      params.append("standardStatus", "Active Under Contract");
      break;
  }

  if (city) {
    const q = city.trim();
    if (/^\d{5}$/.test(q)) params.set("zip", q);
    else params.set("city", q);
  }
  if (county) params.set("area", county);
  if (brokerageOnly && ONSITE_BROKERAGE_NAME) {
    params.set("office.brokerageName", ONSITE_BROKERAGE_NAME);
  }
  if (agentOnly) {
    params.set("searchFields", "agents.name");
    params.set("search", agentName || ONSITE_LEAD_AGENT_NAME);
  } else if (agentName) {
    params.set("searchFields", "agents.name");
    params.set("search", agentName);
  }
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (minBeds) params.set("minBeds", minBeds);

  // Home types map to native `propertyType`/`style` filters; numeric ranges and
  // native feature checkboxes are forwarded as Repliers params. Shared with the
  // map route via listings-api-params so both views filter identically.
  applyHomeTypeFilters(params, type);
  applyRangeFilters(params, searchParams);
  applyNativeFeatureFilters(params, features);

  if (ALLOWED_SORT_BY.has(sortBy)) params.set("sortBy", sortBy);

  // MLS# (or any field-targeted) text search — Repliers requires both
  // `searchFields` and `search` to be present. Works with prefixed or
  // un-prefixed MLS numbers (e.g. NWM2310987 or 2310987).
  if (!agentOnly && !agentName && search && searchFields) {
    params.set("searchFields", searchFields);
    params.set("search", search);
  }

  try {
    const fetchListings = async (query: URLSearchParams) => {
      const res = await fetch(repliersListingsUrl(`?${query.toString()}`), {
        headers: {
          "repliers-api-key": process.env.REPLIERS_API_KEY || "",
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      });
      if (!res.ok) return { res, data: null as ReturnType<typeof enrichListingsResponse> | null };
      const data = enrichListingsResponse(await res.json());
      return { res, data };
    };

    const primary = await fetchListings(params);
    if (!primary.res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: primary.res.status }
      );
    }

    let data = primary.data!;

    // Post-filter for text-based features matched against remarks. Waterfront
    // and Basement are filtered natively above, so they're excluded here.
    const textFeaturesToMatch = features.filter(
      (f) => !NATIVE_FEATURE_LABELS.includes(f)
    );

    if (textFeaturesToMatch.length > 0 && data.listings) {
      // Map UI checkbox labels to FEATURE_GROUPS labels where they differ.
      const groupLabels = new Set(
        textFeaturesToMatch.map((f) => FEATURE_LABEL_TO_GROUP[f] ?? f)
      );
      const requestedGroups = FEATURE_GROUPS.filter((g) => groupLabels.has(g.label));
      
      if (requestedGroups.length > 0) {
        const scored = data.listings.map((listing) => {
          const matched = matchFeaturesInText((listing as any).details?.description, requestedGroups);
          return { listing, matchedCount: matched.length };
        });

        // For 1-2 requested features, keep strict AND semantics.
        // For larger sets, require overlap so users don't hit empty-dead-end
        // results because one checkbox term is missing from remarks text.
        const strictNeedAll = requestedGroups.length <= 2;
        const minMatches = strictNeedAll
          ? requestedGroups.length
          : Math.max(2, Math.ceil(requestedGroups.length * 0.5));

        let filtered = scored.filter((s) => s.matchedCount >= minMatches);
        if (!filtered.length) {
          filtered = scored.filter((s) => s.matchedCount > 0);
        }

        filtered.sort((a, b) => b.matchedCount - a.matchedCount);

        const totalMatched = filtered.length;
        data.listings = filtered.map((s) => s.listing).slice(0, pageSizeNum);
        (data as any).count = totalMatched;
        (data as any).numPages = Math.max(1, Math.ceil(totalMatched / pageSizeNum));
        (data as any).page = Number(page) || 1;
      }
    }

    const primaryCount =
      typeof (data as { count?: unknown }).count === "number"
        ? ((data as { count: number }).count ?? 0)
        : 0;

    // Some production keys return zero WA listings when boardId=110 is forced.
    // Retry once without boardId so WA state filtering still returns inventory.
    if (
      boardId &&
      state?.toUpperCase() === "WA" &&
      primaryCount === 0
    ) {
      const fallbackParams = new URLSearchParams(params);
      fallbackParams.delete("boardId");
      const fallback = await fetchListings(fallbackParams);
      const fallbackCount =
        fallback.data && typeof (fallback.data as { count?: unknown }).count === "number"
          ? ((fallback.data as { count: number }).count ?? 0)
          : 0;
      if (fallback.res.ok && fallback.data && fallbackCount > 0) {
        data = fallback.data;
      }
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
