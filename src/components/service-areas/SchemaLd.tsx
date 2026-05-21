// JSON-LD helpers for Tier-1 Service Area pages.
//
// These render <script type="application/ld+json"> blocks consumed by Google
// for entity recognition. Keeping them in their own component module means
// the page-level files stay focused on layout, and there's a single place to
// audit schema changes.

import type { City, Neighborhood } from "@/lib/service-areas/types";

const ORG_NAME = "OnSite ReGroup";
const ORG_URL = "https://www.onsiteregroup.com";
const ORG_PHONE = "+1-253-441-9764";
const ORG_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "3920 W Tapps Dr E",
  addressLocality: "Lake Tapps",
  addressRegion: "WA",
  postalCode: "98391",
  addressCountry: "US",
};
const SERVICE_TYPE = "Real Estate Brokerage";

type BreadcrumbEntry = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbEntry[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CityServiceSchema({
  city,
  pageUrl,
}: {
  city: City;
  pageUrl: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: SERVICE_TYPE,
    provider: {
      "@type": "RealEstateAgent",
      name: ORG_NAME,
      url: ORG_URL,
      telephone: ORG_PHONE,
      address: ORG_ADDRESS,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.stateCode,
        addressCountry: "US",
      },
      containsPlace: city.zipCodes.map((zip) => ({
        "@type": "PostalCodeArea",
        postalCode: zip,
      })),
    },
    url: pageUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CityPlaceSchema({ city }: { city: City }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${city.name}, ${city.stateCode}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.stateCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function NeighborhoodServiceSchema({
  neighborhood,
  cityName,
  cityStateCode,
  pageUrl,
}: {
  neighborhood: Neighborhood;
  cityName: string;
  cityStateCode: string;
  pageUrl: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: SERVICE_TYPE,
    provider: {
      "@type": "RealEstateAgent",
      name: ORG_NAME,
      url: ORG_URL,
      telephone: ORG_PHONE,
      address: ORG_ADDRESS,
    },
    areaServed: neighborhood.zipCodes.map((zip) => ({
      "@type": "PostalCodeArea",
      postalCode: zip,
      addressRegion: cityStateCode,
      addressCountry: "US",
    })),
    url: pageUrl,
    name: `Real Estate in ${neighborhood.name}, ${cityName}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function NeighborhoodPlaceSchema({
  neighborhood,
  cityName,
  cityStateCode,
}: {
  neighborhood: Neighborhood;
  cityName: string;
  cityStateCode: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${neighborhood.name}, ${cityName}, ${cityStateCode}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: cityStateCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: neighborhood.geo.lat,
      longitude: neighborhood.geo.lng,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
