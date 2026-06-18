import { NextRequest, NextResponse } from "next/server";

const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json";

// Geocodes a free-text place query (city, neighborhood, ZIP, address) into a
// center + viewport so the listings map can recenter on what the user typed.
// Uses the server-side GOOGLE_MAPS_API_KEY (never exposed to the browser).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").trim();
  const state = (searchParams.get("state") || "").trim();

  if (!query) {
    return NextResponse.json({ error: "Missing q" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Geocoding is not configured" }, { status: 503 });
  }

  // A bare ZIP or "City" can be ambiguous nationwide — bias toward the selected
  // state (and the US) so "Renton" resolves to Renton, WA.
  const address = state && !/\b[A-Z]{2}\b/.test(query) ? `${query}, ${state}` : query;
  const url = new URL(GOOGLE_GEOCODE_API);
  url.searchParams.set("address", address);
  url.searchParams.set("components", "country:US");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = (await res.json()) as {
      status: string;
      results?: Array<{
        geometry?: {
          location?: { lat: number; lng: number };
          viewport?: {
            northeast: { lat: number; lng: number };
            southwest: { lat: number; lng: number };
          };
        };
        types?: string[];
      }>;
    };

    if (data.status !== "OK" || !data.results?.length) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    const best = data.results[0];
    const location = best.geometry?.location;
    if (!location) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    return NextResponse.json({
      found: true,
      center: { lat: location.lat, lng: location.lng },
      viewport: best.geometry?.viewport ?? null,
      types: best.types ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
  }
}
