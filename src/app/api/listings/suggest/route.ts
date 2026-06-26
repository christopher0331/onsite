import { NextRequest, NextResponse } from "next/server";
import { repliersListingsUrl } from "@/lib/repliers-enrich";
import { formatStreetAddress } from "@/lib/format-address";
import { getBathroomCount } from "@/lib/format-bathrooms";

// Address/city autocomplete backed by the live Repliers/MLS feed. Powers the
// homepage hero "search by address" box: as the user types we query the MLS for
// matching for-sale listings, then surface individual addresses (which deep-link
// to the property page) plus the distinct cities those listings sit in.

const CDN = "https://cdn.repliers.io/";

type RepliersAddress = {
  streetNumber?: string;
  streetName?: string;
  streetSuffix?: string;
  streetDirection?: string;
  streetDirectionPrefix?: string | null;
  unitNumber?: string | null;
  city?: string;
  state?: string;
  zip?: string;
  neighborhood?: string;
};

type RepliersListing = {
  mlsNumber?: string;
  listPrice?: number | null;
  address?: RepliersAddress | null;
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    numBathroomsHalf?: number | null;
    sqft?: number | null;
    propertyType?: string | null;
  } | null;
  raw?: Record<string, unknown> | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string } | null;
};

type AddressSuggestion = {
  type: "address";
  mlsNumber: string;
  label: string;
  sublabel: string;
  price: number | null;
  beds: number | null;
  baths: number | null;
  image: string | null;
};

type CitySuggestion = {
  type: "city";
  city: string;
  state: string;
  label: string;
  sublabel: string;
};

type Suggestion = AddressSuggestion | CitySuggestion;

function formatStreet(a: RepliersAddress | null | undefined): string {
  return formatStreetAddress(a);
}

function formatCityLine(a: RepliersAddress | null | undefined): string {
  if (!a) return "";
  return [a.city, a.state, a.zip].filter(Boolean).join(", ");
}

function firstImage(images: string[] | null | undefined): string | null {
  if (!images?.length) return null;
  const path = images[0];
  return path.startsWith("http") ? path : CDN + path;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().slice(0, 60);
  const state = (searchParams.get("state") || "WA").trim();

  // Require at least 2 characters before hitting the MLS — single keystrokes
  // are too broad to produce useful address matches.
  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] as Suggestion[] });
  }

  const params = new URLSearchParams({ resultsPerPage: "12", pageNum: "1" });
  // For-sale inventory only (matches the site's default "Active" status tab).
  params.append("standardStatus", "Active");
  params.append("standardStatus", "Active Under Contract");
  if (state) params.set("state", state);
  // Repliers keyword search across the address sub-fields. Sending the fields as
  // a comma list lets a query like "1234 main" match streetNumber + streetName.
  params.set(
    "searchFields",
    "address.streetNumber,address.streetName,address.streetSuffix,address.city,address.zip"
  );
  params.set("search", q);

  let listings: RepliersListing[] = [];
  try {
    const res = await fetch(repliersListingsUrl(`?${params.toString()}`), {
      headers: {
        "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 120 },
    });
    if (res.ok) {
      const data = (await res.json()) as { listings?: RepliersListing[] };
      listings = Array.isArray(data.listings) ? data.listings : [];
    }
  } catch {
    // Network/parse failure — fall through and return whatever we have (likely
    // empty) so the dropdown simply shows no matches rather than erroring.
  }

  const lower = q.toLowerCase();
  const startsAlpha = /^[a-z]/i.test(q);

  // ── Address suggestions (deep-link to the property page) ──────────────────
  const seenMls = new Set<string>();
  const addressSuggestions: AddressSuggestion[] = [];
  for (const l of listings) {
    if (!l.mlsNumber || seenMls.has(l.mlsNumber)) continue;
    // Skip listings whose address is suppressed from the internet — we can't
    // present them as a typed-address match.
    if (l.permissions?.displayAddressOnInternet === "N") continue;
    const street = formatStreet(l.address);
    if (!street || /undisclosed/i.test(street)) continue;
    seenMls.add(l.mlsNumber);
    addressSuggestions.push({
      type: "address",
      mlsNumber: l.mlsNumber,
      label: street,
      sublabel: formatCityLine(l.address),
      price: typeof l.listPrice === "number" ? l.listPrice : null,
      beds: l.details?.numBedrooms ?? null,
      baths: getBathroomCount(l.details, l.raw),
      image: firstImage(l.images),
    });
    if (addressSuggestions.length >= 6) break;
  }

  // ── City suggestions (filter the listings page to that city) ──────────────
  const cityCounts = new Map<string, { city: string; state: string; count: number }>();
  for (const l of listings) {
    const city = l.address?.city?.trim();
    if (!city || !city.toLowerCase().includes(lower)) continue;
    const key = city.toLowerCase();
    const existing = cityCounts.get(key);
    if (existing) existing.count += 1;
    else cityCounts.set(key, { city, state: l.address?.state?.trim() || state, count: 1 });
  }
  const citySuggestions: CitySuggestion[] = Array.from(cityCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(({ city, state: st, count }) => ({
      type: "city",
      city,
      state: st,
      label: city,
      sublabel: `${count}${count >= 12 ? "+" : ""} ${count === 1 ? "home" : "homes"} for sale`,
    }));

  // When the query reads like a place name, lead with the city matches; when it
  // starts with a number (street address / ZIP) lead with the addresses.
  const cityStartsWithQuery = citySuggestions.some((c) =>
    c.city.toLowerCase().startsWith(lower)
  );
  const suggestions: Suggestion[] =
    startsAlpha && cityStartsWithQuery
      ? [...citySuggestions, ...addressSuggestions]
      : [...addressSuggestions, ...citySuggestions];

  return NextResponse.json({ suggestions: suggestions.slice(0, 8) });
}
