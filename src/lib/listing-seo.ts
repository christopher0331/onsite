import type { Metadata } from "next";
import { formatStreetAddress } from "@/lib/format-address";
import { formatBathroomCount } from "@/lib/format-bathrooms";
import {
  cityHubPath,
  isListingIndexable,
} from "@/lib/listing-index-policy";
import { PHONE_DISPLAY, SITE_BRAND } from "@/lib/nap";
import { repliersImageUrl } from "@/lib/repliers-images";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const SITE_URL = getCanonicalBaseUrl();

export type SeoListing = {
  mlsNumber?: string;
  listPrice?: number | null;
  soldPrice?: number | null;
  listDate?: string | null;
  status?: string | null;
  standardStatus?: string | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string } | null;
  address?: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    streetDirectionPrefix?: string | null;
    unitNumber?: string | null;
    city?: string;
    state?: string;
    zip?: string;
  } | null;
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    numBathroomsHalf?: number | null;
    sqft?: number | string | null;
    propertyType?: string | null;
    description?: string | null;
  } | null;
  raw?: Record<string, unknown> | null;
  office?: { brokerageName?: string } | null;
  agents?: Array<{ name?: string; boardAgentId?: string }> | null;
  map?: { latitude?: number | null; longitude?: number | null } | null;
};

function formatPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

function publicDescription(text: string | null | undefined) {
  return (text ?? "").replace(/\*{4}\s*SAMPLE DATA\s*\*{4}/gi, "").trim();
}

export function listingStreetLine(listing: SeoListing): string {
  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  if (!showAddress) return "";
  return formatStreetAddress(listing.address ?? {});
}

export function listingMetaDescription(listing: SeoListing): string {
  const det = listing.details ?? {};
  const a = listing.address ?? {};
  const bathLabel = formatBathroomCount(det, listing.raw);
  const specs = [
    det.numBedrooms ? `${det.numBedrooms} bd` : null,
    bathLabel ? `${bathLabel} ba` : null,
    det.sqft ? `${Number(det.sqft).toLocaleString()} sqft` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const cityLine = [a.city, a.state].filter(Boolean).join(", ");
  const location = cityLine ? `in ${cityLine}` : "in East Pierce County";
  const facts = specs ? `${specs} ${location}` : `Home for sale ${location}`;
  return `${facts}. Work with OnSite Real Estate Group — local Lake Tapps / East Pierce agents. Call ${PHONE_DISPLAY} to tour this home.`;
}

export function listingNotFoundMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: "Listing not found | OnSite Real Estate Group",
    description:
      "This listing is no longer available. Browse East Pierce homes for sale with OnSite Real Estate Group.",
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/listings` },
  };
}

export function listingDetailMetadata(mlsNumber: string, listing: SeoListing | null): Metadata {
  if (!listing) return listingNotFoundMetadata();

  const a = listing.address ?? {};
  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = listingStreetLine(listing);
  const cityLine = [a.city, a.state, a.zip].filter(Boolean).join(", ");
  const price = formatPrice(listing.soldPrice ?? listing.listPrice);
  const det = listing.details ?? {};
  const indexable = isListingIndexable(listing);
  const selfUrl = `${SITE_URL}/listings/${encodeURIComponent(mlsNumber)}`;
  const canonicalPath = indexable ? `/listings/${mlsNumber}` : cityHubPath(a.city);
  const canonical = `${SITE_URL}${canonicalPath}`;

  const streetAddress = showAddress && street ? street : null;
  const tabHeadline = streetAddress
    ? [streetAddress, a.city].filter(Boolean).join(", ")
    : a.city
      ? `${det.numBedrooms ? `${det.numBedrooms} bd ` : ""}home in ${a.city}`
      : "Home for sale";
  const title = `${tabHeadline} | OnSite Real Estate Group`;

  const shareHeadline = streetAddress ?? (cityLine || "Home for sale");
  const ogTitle = `${price} · ${shareHeadline} | OnSite Real Estate Group`;
  const description = listingMetaDescription(listing);
  const img = repliersImageUrl(listing.images?.[0], "medium");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: selfUrl,
      type: "website",
      siteName: SITE_BRAND,
      images: img
        ? [
            {
              url: img,
              width: 1200,
              height: 630,
              alt: showAddress && street ? street : "Property photo",
            },
          ]
        : undefined,
    },
    twitter: {
      card: img ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      images: img ? [img] : undefined,
    },
  };
}

export function listingJsonLd(mlsNumber: string, listing: SeoListing) {
  const a = listing.address ?? {};
  const det = listing.details ?? {};
  const street = listingStreetLine(listing);
  const name = street
    ? [street, a.city].filter(Boolean).join(", ")
    : `MLS# ${listing.mlsNumber || mlsNumber}`;
  const description =
    publicDescription(det.description).slice(0, 5000) || listingMetaDescription(listing);
  const img = repliersImageUrl(listing.images?.[0], "large");
  const price = listing.soldPrice ?? listing.listPrice;
  const url = `${SITE_URL}/listings/${encodeURIComponent(mlsNumber)}`;
  const sqft = det.sqft != null ? Number(det.sqft) : NaN;
  const isSold =
    listing.standardStatus === "Closed" || listing.status === "U";

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    url,
    description,
    datePosted: listing.listDate || undefined,
    image: img || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: street || undefined,
      addressLocality: a.city || undefined,
      addressRegion: a.state || undefined,
      postalCode: a.zip || undefined,
      addressCountry: "US",
    },
    ...(typeof listing.map?.latitude === "number" &&
    typeof listing.map?.longitude === "number"
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: listing.map.latitude,
            longitude: listing.map.longitude,
          },
        }
      : {}),
    ...(det.propertyType
      ? {
          additionalType: det.propertyType,
        }
      : {}),
    ...(Number.isFinite(sqft) && sqft > 0
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: sqft,
            unitCode: "FTK",
          },
        }
      : {}),
    ...(det.numBedrooms
      ? { numberOfRooms: det.numBedrooms, numberOfBedrooms: det.numBedrooms }
      : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "USD",
            availability: isSold
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            url,
            seller: {
              "@type": "RealEstateAgent",
              name: SITE_BRAND,
              telephone: PHONE_DISPLAY,
              url: SITE_URL,
            },
          },
        }
      : {}),
  };
}
