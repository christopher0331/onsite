import { NextRequest, NextResponse } from "next/server";
import {
  enrichListing,
  enrichListingsResponse,
  repliersListingsUrl,
} from "@/lib/repliers-enrich";

const REPLIERS_API = "https://api.repliers.io/listings";
const ONSITE_BROKERAGE_NAME = process.env.ONSITE_BROKERAGE_NAME || "";

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
  const type = searchParams.get("type");
  const city = searchParams.get("city");
  const county = searchParams.get("county");
  const sortBy = searchParams.get("sortBy") || "createdOnDesc";
  const brokerageOnly = searchParams.get("brokerageOnly") === "true";
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

  const params = new URLSearchParams({ pageSize, page });

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
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (minBeds) params.set("minBeds", minBeds);
  if (type) params.set("type", type);
  if (ALLOWED_SORT_BY.has(sortBy)) params.set("sortBy", sortBy);

  // MLS# (or any field-targeted) text search — Repliers requires both
  // `searchFields` and `search` to be present. Works with prefixed or
  // un-prefixed MLS numbers (e.g. NWM2310987 or 2310987).
  if (search && searchFields) {
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
