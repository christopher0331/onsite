const ALLOWED_SORT_BY = new Set([
  "createdOnDesc",
  "createdOnAsc",
  "updatedOnDesc",
  "updatedOnAsc",
  "listPriceAsc",
  "listPriceDesc",
  "soldDateDesc",
]);

// UI home-type chips → Repliers native `propertyType` values (verified against
// the WA aggregate feed). Sent as repeated params, which Repliers ORs together.
export const PROPERTY_TYPE_MAP: Record<string, string[]> = {
  House: ["Single Family Residence"],
  Condo: ["Condominium"],
  Land: ["Land"],
  "Multi-family": ["Multi Family"],
  Mobile: ["Manufactured Home"],
  "Manufactured On Land": ["Manufactured On Land"],
  Rental: ["Rental"],
  "Commercial / Industrial": ["Commercial Industrial"],
  "Boat Slip": ["Boat Slip"],
  "Business Opportunity": ["Business Opportunity"],
  // "Other" buckets the long-tail propertyTypes not surfaced as their own chip.
  Other: ["Other", "Farm & Ranch", "Timeshare"],
};

// Townhouse isn't a Repliers `propertyType` — townhomes span Single Family /
// Condominium / Rental and are only distinguished by `details.style`.
export const STYLE_MAP: Record<string, string[]> = {
  Townhouse: ["Townhouse"],
};

// Home-feature checkbox labels whose remarks-matching dictionary entry uses a
// different label than the UI chip. Most labels match FEATURE_GROUPS directly.
export const FEATURE_LABEL_TO_GROUP: Record<string, string> = {
  "Has a view": "View",
};

// Feature checkboxes Repliers supports as native filters (full-dataset, correct
// pagination). Everything else is matched against remarks text. There is no
// native `view` param, so "Has a view" is a remarks match (see map above).
export const NATIVE_FEATURE_LABELS = ["Waterfront", "Basement"];

export function validPositiveInt(value: string | null): string | null {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const i = Math.trunc(n);
  return i > 0 ? String(i) : null;
}

/** Map UI home-type chips onto native `propertyType` (OR'd) / `style` filters.
 *  Repliers ANDs `propertyType` with `style`, so when a townhouse selection is
 *  mixed with concrete propertyTypes we filter by the propertyTypes (townhomes
 *  still surface via their own SFR/Condo/Rental type) rather than returning an
 *  empty intersection. */
export function applyHomeTypeFilters(params: URLSearchParams, types: string[]) {
  if (!types.length) return;
  const propertyTypeValues = new Set<string>();
  const styleValues = new Set<string>();
  for (const t of types) {
    if (PROPERTY_TYPE_MAP[t]) PROPERTY_TYPE_MAP[t].forEach((v) => propertyTypeValues.add(v));
    else if (STYLE_MAP[t]) STYLE_MAP[t].forEach((v) => styleValues.add(v));
  }
  if (propertyTypeValues.size > 0) {
    propertyTypeValues.forEach((v) => params.append("propertyType", v));
  } else if (styleValues.size > 0) {
    styleValues.forEach((v) => params.append("style", v));
  }
}

/** Sanitize + forward the numeric range / garage filters that map 1:1 to
 *  Repliers params. minBeds/minPrice/maxPrice are handled by the caller. */
export function applyRangeFilters(params: URLSearchParams, sp: URLSearchParams) {
  const maxBeds = sp.get("maxBeds");
  const minBaths = sp.get("minBaths");
  const maxBaths = sp.get("maxBaths");
  const minSqft = validPositiveInt(sp.get("minSqft"));
  const maxSqft = validPositiveInt(sp.get("maxSqft"));
  const minYearBuilt = validPositiveInt(sp.get("minYearBuilt"));
  const maxYearBuilt = validPositiveInt(sp.get("maxYearBuilt"));
  const minLotSize = validPositiveInt(sp.get("minLotSize"));
  const maxLotSize = validPositiveInt(sp.get("maxLotSize"));
  const garageSpots = sp.get("garageSpots");

  if (maxBeds) params.set("maxBeds", maxBeds);
  if (minBaths) params.set("minBaths", minBaths);
  if (maxBaths) params.set("maxBaths", maxBaths);
  if (minSqft) params.set("minSqft", minSqft);
  if (maxSqft) params.set("maxSqft", maxSqft);
  if (minYearBuilt) params.set("minYearBuilt", minYearBuilt);
  if (maxYearBuilt) params.set("maxYearBuilt", maxYearBuilt);
  if (minLotSize) params.set("minLotSizeSqft", minLotSize);
  if (maxLotSize) params.set("maxLotSizeSqft", maxLotSize);
  if (garageSpots && garageSpots !== "Any") {
    params.set("minParkingSpaces", garageSpots.replace("+", ""));
  }
}

/** Apply the home-feature checkboxes Repliers can filter natively. */
export function applyNativeFeatureFilters(params: URLSearchParams, features: string[]) {
  if (features.includes("Waterfront")) params.set("waterfront", "Y");
  if (features.includes("Basement")) params.set("basement", "not:null");
}

export function applyListingStatus(params: URLSearchParams, status: string) {
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

export function buildListingsQueryParams(searchParams: URLSearchParams, pageSize = "100", page = "1") {
  const params = new URLSearchParams({ pageSize, page });
  const status = searchParams.get("status") || "A";
  const sortBy = searchParams.get("sortBy") || "createdOnDesc";

  const state = searchParams.get("state");
  const boardId = searchParams.get("boardId");
  const city = searchParams.get("city");
  const county = searchParams.get("county");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minBeds = searchParams.get("minBeds");
  // UI home-type chips map to native `propertyType`/`style` filters (not the
  // Repliers `type` param, which is transaction type sale/lease).
  const homeTypes = searchParams.getAll("type").filter((t) => t !== "sale" && t !== "lease");
  const features = searchParams.getAll("features");
  const brokerageOnly = searchParams.get("brokerageOnly") === "true";
  const agentOnly = searchParams.get("agentOnly") === "true";
  const agentName = searchParams.get("agentName");
  const search = searchParams.get("search");
  const searchFields = searchParams.get("searchFields");

  if (state) params.set("state", state);
  if (boardId) params.set("boardId", boardId);
  applyListingStatus(params, status);
  if (city) {
    const q = city.trim();
    if (/^\d{5}$/.test(q)) params.set("zip", q);
    else params.set("city", q);
  }
  if (county) params.set("area", county);
  if (brokerageOnly) {
    const brokerage = process.env.ONSITE_BROKERAGE_NAME || "Timber Real Estate";
    params.set("office.brokerageName", brokerage);
  }
  if (agentOnly) {
    params.set("searchFields", "agents.name");
    params.set("search", agentName || process.env.ONSITE_LEAD_AGENT_NAME || "Andre Bohall");
  } else if (agentName) {
    params.set("searchFields", "agents.name");
    params.set("search", agentName);
  }
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (minBeds) params.set("minBeds", minBeds);
  applyHomeTypeFilters(params, homeTypes);
  applyRangeFilters(params, searchParams);
  applyNativeFeatureFilters(params, features);
  if (ALLOWED_SORT_BY.has(sortBy)) params.set("sortBy", sortBy);
  if (!agentOnly && !agentName && search && searchFields) {
    params.set("searchFields", searchFields);
    params.set("search", search);
  }

  return params;
}

export type MapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export function listingInBounds(
  listing: { map?: { latitude?: number | null; longitude?: number | null } | null },
  bounds: MapBounds
) {
  const lat = listing.map?.latitude;
  const lng = listing.map?.longitude;
  if (typeof lat !== "number" || typeof lng !== "number") return false;
  return lat <= bounds.north && lat >= bounds.south && lng <= bounds.east && lng >= bounds.west;
}
