import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API = "https://api.repliers.io/listings";
const ONSITE_BROKERAGE_NAME = process.env.ONSITE_BROKERAGE_NAME || "";

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
  const brokerageOnly = searchParams.get("brokerageOnly") === "true";

  const params = new URLSearchParams({ pageSize, page });

  // Repliers only knows status=A (Active / On-Market) and status=U (Unavailable
  // / Off-Market). Multi-status is expressed by appending the param twice.
  if (status === "All") {
    params.append("status", "A");
    params.append("status", "U");
  } else {
    params.set("status", status);
    if (status === "U") params.set("lastStatus", "Sld");
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
