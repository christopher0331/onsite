const ALLOWED_SORT_BY = new Set([
  "createdOnDesc",
  "createdOnAsc",
  "updatedOnDesc",
  "updatedOnAsc",
  "listPriceAsc",
  "listPriceDesc",
  "soldDateDesc",
]);

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
  const type = searchParams.get("type");
  const brokerageOnly = searchParams.get("brokerageOnly") === "true";
  const agentOnly = searchParams.get("agentOnly") === "true";
  const agentName = searchParams.get("agentName");
  const search = searchParams.get("search");
  const searchFields = searchParams.get("searchFields");

  if (state) params.set("state", state);
  if (boardId) params.set("boardId", boardId);
  applyListingStatus(params, status);
  if (city) params.set("city", city);
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
  if (type) params.set("type", type);
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
