import type { CardListing } from "@/components/ListingCard";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import {
  sortOnsiteListings,
  tagOnsiteListings,
  type OnsiteListing,
} from "@/lib/onsite-listings";

type RawListingRow = CardListing & {
  agents?: Array<{ name?: string; boardAgentId?: string }> | null;
};

/**
 * Active/pending listings for a service-area page, ranked with the same
 * priority as the rest of the site: André & Cindie first, then the Timber
 * brokerage, then the general market — per `sortOnsiteListings`.
 *
 * This hits Repliers directly (rather than round-tripping through our own
 * `/api/listings` route) since it's called from server components at build
 * / request time.
 */
export async function getServiceAreaListings(
  cityName: string,
  limit = 6
): Promise<{ listings: OnsiteListing[]; count: number }> {
  const params = new URLSearchParams({
    resultsPerPage: "75",
    pageNum: "1",
    state: "WA",
    city: cityName,
    sortBy: "createdOnDesc",
  });
  params.append("standardStatus", "Active");
  params.append("standardStatus", "Active Under Contract");

  try {
    const res = await fetch(repliersListingsUrl(`?${params.toString()}`), {
      headers: {
        "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 900 },
    });
    if (!res.ok) return { listings: [], count: 0 };

    const data = enrichListingsResponse(await res.json()) as {
      listings?: RawListingRow[];
    };
    const rows = Array.isArray(data.listings) ? data.listings : [];
    const ranked = sortOnsiteListings(tagOnsiteListings(rows));

    return { listings: ranked.slice(0, limit), count: ranked.length };
  } catch {
    return { listings: [], count: 0 };
  }
}

/**
 * Narrows a city-wide listing set down to a neighborhood's zip codes.
 * Falls back to the full city set (still capped to `limit`) when nothing
 * matches yet, so a brand-new neighborhood spoke never renders an empty
 * section.
 */
export function filterListingsByZip(
  listings: OnsiteListing[],
  zipCodes: string[],
  limit = 6
): OnsiteListing[] {
  const zips = new Set(zipCodes);
  const matched = listings.filter((l) => l.address?.zip && zips.has(l.address.zip));
  return (matched.length > 0 ? matched : listings).slice(0, limit);
}
