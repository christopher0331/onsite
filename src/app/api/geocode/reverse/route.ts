import { NextRequest, NextResponse } from "next/server";

function pickCity(payload: {
  address?: Record<string, string>;
}) {
  const a = payload.address ?? {};
  return a.city || a.town || a.village || a.hamlet || a.municipality || null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "json");
  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lng);
  url.searchParams.set("zoom", "10");

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "OnSiteRealEstateGroup/1.0 (listings map; contact@onsiteregroup.com)",
        Accept: "application/json",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ city: null });
    }

    const data = await res.json();
    const city = pickCity(data);

    return NextResponse.json({
      city,
      label: city || data.display_name || null,
    });
  } catch {
    return NextResponse.json({ city: null });
  }
}
