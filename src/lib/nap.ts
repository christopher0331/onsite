/**
 * Canonical NAP aligned to the Google Business Profile:
 * OnSite Real Estate Group
 * 3920 W Tapps Dr E, Lake Tapps, WA 98391 · (253) 441-9764
 *
 * Visible contact blocks and JSON-LD should read from here so Google,
 * Semrush, and on-page NAP stay in sync.
 */
import { getCanonicalBaseUrl } from "@/lib/site-url";

export const GBP_NAME = "OnSite Real Estate Group";
/** Primary brand for titles, Open Graph site name, and chrome. */
export const SITE_BRAND = GBP_NAME;
export const GBP_ALTERNATE_NAMES = ["OnSite Real Estate Group"] as const;

/** Office hours (shown on /contact-us + footer and emitted in JSON-LD). Sunday: by appointment only, no hours entry. */
export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], label: "Mon – Thu", opens: "08:00", closes: "18:00", display: "8:00 AM – 6:00 PM" },
  { days: ["Friday"], label: "Fri", opens: "08:00", closes: "17:30", display: "8:00 AM – 5:30 PM" },
  { days: ["Saturday"], label: "Sat", opens: "10:00", closes: "16:00", display: "10:00 AM – 4:00 PM" },
] as const;
export const SUNDAY_HOURS_NOTE = "By appointment";
export const GBP_DESCRIPTION =
  "Real estate agency specializing in buying and selling residential properties.";
/** Declarative entity sentence (footer + JSON-LD description). */
export const ENTITY_STATEMENT =
  "OnSite Real Estate Group is a real estate team at Timber Real Estate serving Lake Tapps, Bonney Lake, and surrounding Pierce County communities.";
export const BROKERAGE_DISCLAIMER =
  "OnSite Real Estate Group is an independent real estate marketing group affiliated with Timber Real Estate.";
export const PARENT_BROKERAGE_NAME = "Timber Real Estate";

/** One-sentence definitive statement for service-area pages. */
export function areaEntityStatement(area: string, county = "Pierce County") {
  return `OnSite Real Estate Group is a real estate team at Timber Real Estate serving ${area} and nearby ${county} communities.`;
}

/** Served places with Wikidata entity IDs (verified via wbgetentities 2026-11-02). */
export const AREA_SERVED_PLACES = [
  { type: "City", name: "Lake Tapps, WA", wikidata: "Q111207060" },
  { type: "City", name: "Bonney Lake, WA", wikidata: "Q657810" },
  { type: "City", name: "Tehaleh, WA", wikidata: "Q5048209" },
  { type: "City", name: "Puyallup, WA", wikidata: "Q179336" },
  { type: "AdministrativeArea", name: "Pierce County, WA", wikidata: "Q156459" },
] as const;

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
  "https://maps.google.com/?cid=7815725805259282556";

export const LOGO_URL =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/68dc8d33f60130dc306e6c8e_Timber.png";

export const SAME_AS = [
  GOOGLE_MAPS_PLACE_URL,
  "https://www.facebook.com/OnSiteREGroup",
  "https://www.instagram.com/onsiterealestategroup/",
  "https://www.tiktok.com/@onsiteregroup",
  "https://www.youtube.com/@OnSiteRealEstateGroup",
  "https://x.com/OnSiteREGroup",
] as const;

/** Google Business Profile aggregate as of 2026-08-18. Visible UI only — not emitted in JSON-LD. */
export const GOOGLE_RATING = {
  ratingValue: 5,
  reviewCount: 121,
  bestRating: 5,
} as const;

export function localBusinessId(baseUrl = getCanonicalBaseUrl()) {
  return `${baseUrl}/#localbusiness`;
}

/** JSON-LD pointer to the sitewide LocalBusiness node. Do not add aggregateRating or Review JSON-LD. */
export function localBusinessRef(baseUrl = getCanonicalBaseUrl()) {
  return { "@id": localBusinessId(baseUrl) };
}

export function postalAddressNode() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: ADDRESS_STREET,
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    postalCode: ADDRESS_POSTAL,
    addressCountry: ADDRESS_COUNTRY,
  };
}

export function localBusinessNode(baseUrl = getCanonicalBaseUrl()) {
  return {
    // LocalBusiness first: Semrush (and some crawlers) only bind required
    // fields like address to @type[0]. RealEstateAgent remains as the
    // more specific type.
    "@type": ["LocalBusiness", "RealEstateAgent"] as const,
    "@id": localBusinessId(baseUrl),
    name: GBP_NAME,
    alternateName: [...GBP_ALTERNATE_NAMES],
    description: ENTITY_STATEMENT,
    url: baseUrl,
    telephone: PHONE_E164,
    image: LOGO_URL,
    logo: LOGO_URL,
    address: postalAddressNode(),
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_PLACE_URL,
    sameAs: [...SAME_AS],
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: {
      "@type": "Organization" as const,
      name: PARENT_BROKERAGE_NAME,
    },
    // City/AdministrativeArea (no address required, unlike Place-as-LocalBusiness) anchored to Wikidata so AI/knowledge-graph crawlers can
    // resolve each area to a real entity. King County stays as text.
    areaServed: [
      ...AREA_SERVED_PLACES.map((a) => ({
        "@type": a.type,
        name: a.name,
        sameAs: `https://www.wikidata.org/wiki/${a.wikidata}`,
      })),
      "King County, WA",
    ],
  };
}
