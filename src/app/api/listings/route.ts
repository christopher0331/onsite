import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API = "https://api.repliers.io/listings";
const AGENT_LICENSE = "25031564";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "A";
  const pageSize = searchParams.get("pageSize") || "12";
  const page = searchParams.get("page") || "1";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minBeds = searchParams.get("minBeds");
  const type = searchParams.get("type");
  const county = searchParams.get("county") || "Pierce";
  const agentOnly = searchParams.get("agentOnly") === "true";

  const params = new URLSearchParams({
    status,
    pageSize,
    page,
    state: "WA",
  });

  // When fetching sold listings, filter to actual sales only
  if (status === "U") {
    params.set("lastStatus", "Sld");
  }

  if (agentOnly) {
    params.set("agentLicense", AGENT_LICENSE);
  } else {
    params.set("area", county);
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
      return NextResponse.json({ error: "Failed to fetch listings" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
