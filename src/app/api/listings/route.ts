import { NextRequest, NextResponse } from "next/server";
import {
  enrichListing,
  enrichListingsResponse,
  repliersListingsUrl,
} from "@/lib/repliers-enrich";
import { FEATURE_GROUPS, matchFeaturesInText } from "@/lib/listing-search-terms";

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
  const page = searchParams.get("page") || "1";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minBeds = searchParams.get("minBeds");
  const maxBeds = searchParams.get("maxBeds");
  const minBaths = searchParams.get("minBaths");
  const maxBaths = searchParams.get("maxBaths");
  const minSqft = searchParams.get("minSqft");
  const maxSqft = searchParams.get("maxSqft");
  const minYearBuilt = searchParams.get("minYearBuilt");
  const maxYearBuilt = searchParams.get("maxYearBuilt");
  const minLotSize = searchParams.get("minLotSize");
  const maxLotSize = searchParams.get("maxLotSize");
  const garageSpots = searchParams.get("garageSpots");
  const features = searchParams.getAll("features"); // Array of feature keys
  
  const type = searchParams.getAll("type"); // Now an array for multi-select
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

  if (city) params.set("city", city);
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
  if (maxBeds) params.set("maxBeds", maxBeds);
  if (minBaths) params.set("minBaths", minBaths);
  if (maxBaths) params.set("maxBaths", maxBaths);
  if (minSqft) params.set("minSqft", minSqft);
  if (maxSqft) params.set("maxSqft", maxSqft);
  if (minYearBuilt) params.set("minYearBuilt", minYearBuilt);
  if (maxYearBuilt) params.set("maxYearBuilt", maxYearBuilt);
  if (minLotSize) params.set("minLotSqft", minLotSize);
  if (maxLotSize) params.set("maxLotSqft", maxLotSize);
  if (garageSpots && garageSpots !== "Any") params.set("minParkingSpaces", garageSpots.replace("+", ""));
  
  if (type && type.length > 0) {
    // Redfin categories mapped to Repliers types
    const mappedTypes = new Set<string>();
    for (const t of type) {
      if (t === "House") mappedTypes.add("Single Family");
      if (t === "Townhouse") mappedTypes.add("Townhouse");
      if (t === "Condo") mappedTypes.add("Condo");
      if (t === "Land") mappedTypes.add("Vacant Land");
      if (t === "Multi-family") mappedTypes.add("Multi-Family");
      if (t === "Mobile") mappedTypes.add("Manufactured");
    }
    for (const mt of mappedTypes) {
      params.append("type", mt);
    }
  }

  // Exact map for the checkboxes that Repliers supports natively
  if (features.includes("Waterfront")) params.set("waterfront", "not:null");
  if (features.includes("Has a view")) params.set("view", "not:null");
  if (features.includes("Basement")) params.set("basement", "not:null");

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

    // Post-filter for text-based features
    const textFeaturesToMatch = features.filter(
      (f) => !["Waterfront", "Has a view", "Basement"].includes(f)
    );

    if (textFeaturesToMatch.length > 0 && data.listings) {
      const requestedGroups = FEATURE_GROUPS.filter((g) => textFeaturesToMatch.includes(g.label));
      
      if (requestedGroups.length > 0) {
        data.listings = data.listings.filter((listing) => {
          const matched = matchFeaturesInText((listing as any).details?.description, requestedGroups);
          return matched.length === requestedGroups.length; // MUST match all requested text features
        });
        (data as any).count = data.listings.length; // Note: this count is only for the current page, true pagination is tricky with post-filtering
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
