import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API = "https://api.repliers.io/listings";
const ONSITE_BROKERAGE_NAME = process.env.ONSITE_BROKERAGE_NAME || "";

// NWMLS pending / contingent codes that live in `lastStatus` on `status=A`
// records. Repliers itself does not expose a top-level Pending status.
const PENDING_LAST_STATUSES = ["Pen", "Pi", "Ps", "Pf", "Pba", "Sc"];

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

  const params = new URLSearchParams({ pageSize, page });

  // Friendly-status → Repliers query mapping. Repliers only knows
  // status=A (On-Market) and status=U (Off-Market); the NWMLS Pending /
  // Contingent / Sold buckets live in `lastStatus`.
  switch (status) {
    case "All":
      params.append("status", "A");
      params.append("status", "U");
      break;
    case "P": // Pending — on-market with a pending lastStatus code
      params.set("status", "A");
      for (const code of PENDING_LAST_STATUSES) {
        params.append("lastStatus", code);
      }
      break;
    case "U": // Sold
      params.set("status", "U");
      params.set("lastStatus", "Sld");
      break;
    case "A":
    default:
      params.set("status", "A");
      // Exclude pending lastStatus codes from straight-Active so the
      // "Active" tab doesn't double up with the "Pending" tab.
      // Repliers does not support `notLastStatus`, so we filter client-side
      // in the page if needed; for now pass through plain Active.
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
