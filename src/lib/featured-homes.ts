import { getListingByMlsNumber } from "@/lib/listing-fetch";

/**
 * MLS numbers for /featured-homes/[slug]. Status, price, and close date are
 * read from the same cached Repliers fetch the /listings/[mlsNumber] pages use
 * (revalidate 300s). A slug with no MLS# — or one the feed no longer returns —
 * is hidden: dropped from lists + sitemap and redirected to /our-listings.
 */
export const FEATURED_HOME_MLS: Record<string, string | null> = {
  "charming-downtown-puyallup-home": "NWM2367638",
  "entertainers-dream-home-with-pickleball-court-on-1-2-acre": "NWM2362168",
  "luxury-rambler-on-15-acres-with-rainier-views": null,
};

export const FEATURED_HOME_FALLBACK_PATH = "/our-listings";

export type FeaturedHomeLive = {
  mlsNumber: string;
  status: "Active" | "Pending" | "Sold";
  /** e.g. "$575,000" — sold price when sold, otherwise list price. */
  price: string | null;
  /** e.g. "May 4, 2025" when sold. */
  closedOn: string | null;
};

type FeedListing = {
  mlsNumber?: string;
  standardStatus?: string | null;
  listPrice?: number | string | null;
  soldPrice?: number | string | null;
  soldDate?: string | null;
};

function money(v: number | string | null | undefined): string | null {
  const n = typeof v === "string" ? Number(v) : v;
  if (!n || !Number.isFinite(n)) return null;
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function day(v: string | null | undefined): string | null {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Live feed state for a featured slug, or null when it should be hidden. */
export async function getFeaturedHomeLive(slug: string): Promise<FeaturedHomeLive | null> {
  const mls = FEATURED_HOME_MLS[slug];
  if (!mls) return null;
  const l = (await getListingByMlsNumber(mls)) as FeedListing | null;
  if (!l?.mlsNumber) return null;
  const s = (l.standardStatus || "").toLowerCase();
  if (s === "closed") {
    return {
      mlsNumber: l.mlsNumber,
      status: "Sold",
      price: money(l.soldPrice) ?? money(l.listPrice),
      closedOn: day(l.soldDate),
    };
  }
  if (s === "active" || s === "active under contract" || s === "pending") {
    return {
      mlsNumber: l.mlsNumber,
      status: s === "active" ? "Active" : "Pending",
      price: money(l.listPrice),
      closedOn: null,
    };
  }
  // Expired / withdrawn / cancelled / unknown → hide.
  return null;
}

/** Slugs that are currently visible, in the given order. */
export async function getVisibleFeaturedSlugs(slugs: string[]): Promise<string[]> {
  const live = await Promise.all(slugs.map((s) => getFeaturedHomeLive(s)));
  return slugs.filter((_, i) => live[i]);
}
