import { NextRequest, NextResponse } from "next/server";
import { resolvePlaceCoordinates } from "@/lib/geocode-place";

// Geocodes a free-text place query (city, neighborhood, ZIP, address) into a
// center + viewport so the listings map can recenter on what the user typed.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").trim();
  const state = (searchParams.get("state") || "WA").trim();

  if (!query) {
    return NextResponse.json({ error: "Missing q" }, { status: 400 });
  }

  try {
    const result = await resolvePlaceCoordinates(query, state);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
  }
}
