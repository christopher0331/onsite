import type { Metadata } from "next";
import { repliersListingsUrl } from "@/lib/repliers-enrich";

const CDN = "https://cdn.repliers.io/";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://onsiteregroup.com";

type OgListing = {
  mlsNumber?: string;
  listPrice?: number | null;
  soldPrice?: number | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string } | null;
  address?: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    unitNumber?: string | null;
    city?: string;
    state?: string;
    zip?: string;
  } | null;
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    sqft?: number | string | null;
  } | null;
  office?: { brokerageName?: string } | null;
};

async function fetchListing(mlsNumber: string): Promise<OgListing | null> {
  const headers = {
    "repliers-api-key": process.env.REPLIERS_API_KEY || "",
    "Content-Type": "application/json",
  };
  const bare = mlsNumber.replace(/^[A-Za-z]+/, "");
  const candidates = [...new Set([mlsNumber, `NWM${bare}`, bare].filter(Boolean))];
  for (const id of candidates) {
    try {
      const res = await fetch(repliersListingsUrl(`/${encodeURIComponent(id)}`), {
        headers,
        next: { revalidate: 300 },
      });
      if (res.ok) return (await res.json()) as OgListing;
    } catch {
      // try next candidate
    }
  }
  return null;
}

function imageUrl(images: string[] | null | undefined) {
  if (!images?.length) return null;
  const path = images[0];
  return path.startsWith("http") ? path : CDN + path;
}

function formatPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mlsNumber: string }>;
}): Promise<Metadata> {
  const { mlsNumber } = await params;
  const listing = await fetchListing(mlsNumber);

  const fallbackTitle = "Listing | OnSite Real Estate Group";
  if (!listing) {
    return { title: fallbackTitle };
  }

  const a = listing.address ?? {};
  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = a.unitNumber ? ` #${a.unitNumber}` : "";
  const cityLine = [a.city, a.state, a.zip].filter(Boolean).join(", ");
  const price = formatPrice(listing.soldPrice ?? listing.listPrice);

  const det = listing.details ?? {};

  // Browser tabs truncate the END of the title, so lead with the most
  // identifiable info (street + city) and keep the brand as a suffix. This
  // makes multiple open listing tabs instantly distinguishable instead of all
  // starting with a clipped dollar amount.
  const streetAddress = showAddress && street ? `${street}${unit}` : null;
  const tabHeadline = streetAddress
    ? [streetAddress, a.city].filter(Boolean).join(", ")
    : a.city
      ? `${det.numBedrooms ? `${det.numBedrooms} bd ` : ""}home in ${a.city}`
      : "Home for sale";
  const title = `${tabHeadline} | OnSite Real Estate Group`;

  // Richer, price-led headline reserved for social share cards where the full
  // string is shown (not truncated like a tab).
  const shareHeadline = streetAddress ?? cityLine || "Home for sale";
  const ogTitle = `${price} · ${shareHeadline} | OnSite Real Estate Group`;

  const specs = [
    det.numBedrooms ? `${det.numBedrooms} bd` : null,
    det.numBathrooms ? `${det.numBathrooms} ba` : null,
    det.sqft ? `${Number(det.sqft).toLocaleString()} sqft` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const brokerage = listing.office?.brokerageName;
  const description = [
    specs,
    cityLine ? `in ${cityLine}` : null,
    brokerage ? `Listed by ${brokerage}.` : null,
  ]
    .filter(Boolean)
    .join(" · ")
    .replace(" · in ", " in ");

  const img = imageUrl(listing.images);
  const url = `${SITE_URL}/listings/${mlsNumber}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: description || undefined,
    alternates: { canonical: `/listings/${mlsNumber}` },
    openGraph: {
      title: ogTitle,
      description: description || undefined,
      url,
      type: "website",
      siteName: "OnSite Real Estate Group",
      images: img
        ? [{ url: img, width: 1200, height: 630, alt: showAddress && street ? street : "Property photo" }]
        : undefined,
    },
    twitter: {
      card: img ? "summary_large_image" : "summary",
      title: ogTitle,
      description: description || undefined,
      images: img ? [img] : undefined,
    },
  };
}

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
