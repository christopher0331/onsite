import { NextRequest, NextResponse } from "next/server";

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

  const params = new URLSearchParams({ pageSize, page });

  if (state) params.set("state", state);
  if (boardId) params.set("boardId", boardId);

  // Friendly status filter → Repliers `standardStatus` (RESO compliant).
  // Per Repliers support: prefer standardStatus over lastStatus / status
  // for filtering. Multiple values are sent as repeated params (Repliers
  // array notation).
  switch (status) {
    case "All":
      // Omit the status filter entirely so we get every record in the feed.
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
      // Plain Active only — contingent (Active Under Contract) is excluded
      // here so the auditor's "Active" tab doesn't double up with Pending.
      params.set("standardStatus", "Active");
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
    const res = await fetch(`${REPLIERS_API}?${params.toString()}`, {
      headers: {
        "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
