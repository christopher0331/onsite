import { CITIES } from "@/lib/service-areas/data";

export type GeocodeHit = {
  found: true;
  center: { lat: number; lng: number };
  viewport: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  } | null;
  types: string[];
};

export type GeocodeMiss = { found: false };

export type GeocodeResponse = GeocodeHit | GeocodeMiss;

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

/** Approximate bounding box ~12mi radius around a center for map focus. */
function viewportAround(lat: number, lng: number, delta = 0.12) {
  return {
    northeast: { lat: lat + delta, lng: lng + delta },
    southwest: { lat: lat - delta, lng: lng - delta },
  };
}

// Major WA places outside the service-area seed list.
const EXTRA_WA_PLACES: Record<string, { lat: number; lng: number; types?: string[] }> = {
  spokane: { lat: 47.6588, lng: -117.426 },
  "spokane valley": { lat: 47.6733, lng: -117.2394 },
  vancouver: { lat: 45.6387, lng: -122.6615 },
  everett: { lat: 47.979, lng: -122.2021 },
  bellevue: { lat: 47.6101, lng: -122.2015 },
  kent: { lat: 47.3809, lng: -122.2348 },
  renton: { lat: 47.4829, lng: -122.2171 },
  "federal way": { lat: 47.3223, lng: -122.3126 },
  yakima: { lat: 46.6021, lng: -120.5059 },
  bellingham: { lat: 48.7519, lng: -122.4787 },
  kennewick: { lat: 46.2112, lng: -119.1372 },
  auburn: { lat: 47.3073, lng: -122.2285 },
  marysville: { lat: 48.0518, lng: -122.1771 },
  lakewood: { lat: 47.1718, lng: -122.5185 },
  redmond: { lat: 47.674, lng: -122.1215 },
  shoreline: { lat: 47.7557, lng: -122.3415 },
  olympia: { lat: 47.0379, lng: -122.9007 },
  lynnwood: { lat: 47.8209, lng: -122.3151 },
  bothell: { lat: 47.7623, lng: -122.2054 },
  kirkland: { lat: 47.6769, lng: -122.206 },
};

const ZIP_COORDS: Record<string, { lat: number; lng: number }> = {
  "98101": { lat: 47.6109, lng: -122.3364 },
  "98103": { lat: 47.6733, lng: -122.3426 },
  "98115": { lat: 47.6869, lng: -122.2902 },
  "98401": { lat: 47.2529, lng: -122.4443 },
  "98391": { lat: 47.2349, lng: -122.1685 },
  "98373": { lat: 47.1854, lng: -122.2929 },
  "98092": { lat: 47.2032, lng: -122.2407 },
};

export function lookupStaticPlace(query: string, state = "WA"): GeocodeResponse {
  const raw = query.trim();
  if (!raw) return { found: false };

  if (/^\d{5}$/.test(raw)) {
    const zip = ZIP_COORDS[raw];
    if (zip) {
      return {
        found: true,
        center: zip,
        viewport: viewportAround(zip.lat, zip.lng, 0.08),
        types: ["postal_code"],
      };
    }
  }

  const key = normalizeKey(raw);
  const stateCode = state.trim().toUpperCase();

  for (const city of CITIES) {
    if (stateCode && city.stateCode !== stateCode) continue;
    const nameKey = normalizeKey(city.name);
    const slugKey = normalizeKey(city.slug.replace(/-/g, " "));
    if (key === nameKey || key === slugKey) {
      return {
        found: true,
        center: { lat: city.geo.lat, lng: city.geo.lng },
        viewport: viewportAround(city.geo.lat, city.geo.lng),
        types: ["locality"],
      };
    }
  }

  const extra = EXTRA_WA_PLACES[key];
  if (extra && (!stateCode || stateCode === "WA")) {
    return {
      found: true,
      center: { lat: extra.lat, lng: extra.lng },
      viewport: viewportAround(extra.lat, extra.lng),
      types: extra.types ?? ["locality"],
    };
  }

  return { found: false };
}

export function googleMapsApiKey(): string | undefined {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
}

export async function geocodeWithGoogle(
  query: string,
  state: string
): Promise<GeocodeResponse> {
  const apiKey = googleMapsApiKey();
  if (!apiKey) return { found: false };

  const address = state && !/\b[A-Z]{2}\b/.test(query) ? `${query}, ${state}` : query;
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("components", "country:US");
  url.searchParams.set("key", apiKey);

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

  if (data.status !== "OK" || !data.results?.length) return { found: false };

  const best = data.results[0];
  const location = best.geometry?.location;
  if (!location) return { found: false };

  return {
    found: true,
    center: { lat: location.lat, lng: location.lng },
    viewport: best.geometry?.viewport ?? null,
    types: best.types ?? [],
  };
}

export async function geocodeWithNominatim(
  query: string,
  state: string
): Promise<GeocodeResponse> {
  const q = state && !/\b[A-Z]{2}\b/.test(query) ? `${query}, ${state}, USA` : `${query}, USA`;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "us");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "OnSiteReGroup/1.0 (listings search; contact@onsiteregroup.com)",
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) return { found: false };

  const rows = (await res.json()) as Array<{ lat: string; lon: string; type?: string }>;
  const hit = rows[0];
  if (!hit) return { found: false };

  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return { found: false };

  return {
    found: true,
    center: { lat, lng },
    viewport: viewportAround(lat, lng),
    types: hit.type ? [hit.type] : ["locality"],
  };
}

export async function resolvePlaceCoordinates(
  query: string,
  state = "WA"
): Promise<GeocodeResponse> {
  const staticHit = lookupStaticPlace(query, state);
  if (staticHit.found) return staticHit;

  try {
    const googleHit = await geocodeWithGoogle(query, state);
    if (googleHit.found) return googleHit;
  } catch {
    // fall through to Nominatim
  }

  try {
    return await geocodeWithNominatim(query, state);
  } catch {
    return { found: false };
  }
}
