/**
 * Canonical NAP aligned to the Google Business Profile:
 * OnSite Real Estate Agents - Lake Tapps
 * 3920 W Tapps Dr E, Lake Tapps, WA 98391 · (253) 441-9764
 *
 * Visible contact blocks and JSON-LD should read from here so Google,
 * Semrush, and on-page NAP stay in sync.
 */
import { getCanonicalBaseUrl } from "@/lib/site-url";

export const GBP_NAME = "OnSite Real Estate Agents - Lake Tapps";
export const SITE_BRAND = "OnSite ReGroup";
export const GBP_ALTERNATE_NAMES = [
  "OnSite ReGroup",
  "OnSite Real Estate Group",
  "Onsite ReGroup",
] as const;
export const GBP_DESCRIPTION =
  "Real estate agency specializing in buying and selling residential properties.";
export const GBP_CATEGORY = "Real estate agent";

export const PHONE_DISPLAY = "(253) 441-9764";
export const PHONE_TEL = "253-441-9764";
export const PHONE_HREF = `tel:${PHONE_TEL}`;
export const PHONE_E164 = "+1-253-441-9764";

export const ADDRESS_STREET = "3920 W Tapps Dr E";
export const ADDRESS_LOCALITY = "Lake Tapps";
export const ADDRESS_REGION = "WA";
export const ADDRESS_POSTAL = "98391";
export const ADDRESS_COUNTRY = "US";
export const ADDRESS_LINE = `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${ADDRESS_POSTAL}`;

/** Pin from the GBP / Google Maps listing for this street address. */
export const GEO = {
  latitude: 47.2206376,
  longitude: -122.1975826,
} as const;

export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir//3920+W+Tapps+Dr+E,+Lake+Tapps,+WA+98391";
export const GOOGLE_MAPS_PLACE_URL =
  "https://maps.google.com/?cid=7810132482151176316";

export const LOGO_URL =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/68dc8d33f60130dc306e6c8e_Timber.png";

export const SAME_AS = [
  GOOGLE_MAPS_PLACE_URL,
  "https://www.facebook.com/OnSiteREGroup",
  "https://www.instagram.com/watchmeasirealestate",
  "https://www.tiktok.com/@onsiteregroup",
  "https://www.youtube.com/@OnSiteRealEstateGroup",
] as const;

/** Google Business Profile aggregate as of 2026-08-18. */
export const GOOGLE_RATING = {
  ratingValue: 5,
  reviewCount: 121,
  bestRating: 5,
} as const;

export function localBusinessId(baseUrl = getCanonicalBaseUrl()) {
  return `${baseUrl}/#localbusiness`;
}

export function localBusinessNode(baseUrl = getCanonicalBaseUrl()) {
  return {
    "@type": ["RealEstateAgent", "LocalBusiness"] as const,
    "@id": localBusinessId(baseUrl),
    name: GBP_NAME,
    alternateName: [...GBP_ALTERNATE_NAMES],
    description: GBP_DESCRIPTION,
    url: baseUrl,
    telephone: PHONE_E164,
    image: LOGO_URL,
    logo: LOGO_URL,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: ADDRESS_POSTAL,
      addressCountry: ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_PLACE_URL,
    sameAs: [...SAME_AS],
    aggregateRating: {
      "@type": "AggregateRating" as const,
      ratingValue: GOOGLE_RATING.ratingValue,
      reviewCount: GOOGLE_RATING.reviewCount,
      bestRating: GOOGLE_RATING.bestRating,
    },
    areaServed: [
      { "@type": "Place", name: "Lake Tapps, WA" },
      { "@type": "AdministrativeArea", name: "Pierce County, WA" },
      { "@type": "AdministrativeArea", name: "King County, WA" },
    ],
  };
}
