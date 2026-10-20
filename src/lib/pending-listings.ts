import { queryOnsiteListings } from "@/lib/listing-fetch";
import { getListingStatusBadge } from "@/lib/listing-status";
import { isLeadAgentListing, type OnsiteListing } from "@/lib/onsite-listings";

/**
 * OnSite Real Estate Group listings currently under contract (Pending,
 * Pending Inspection, Contingent, …), fed straight from the IDX feed.
 *
 * Reuses `queryOnsiteListings` (same cached Repliers fetch as /our-listings
 * and the homepage active listings), so this adds no new upstream calls.
 * Only listings with André or Cindie Bohall as a listing agent are kept —
 * other Timber Real Estate agents and other brokerages are excluded.
 * Cards drop off automatically once the feed status leaves Pending.
 */
export async function getOnsitePendingListings(limit = 24): Promise<OnsiteListing[]> {
  try {
    const data = await queryOnsiteListings({
      scope: "all",
      status: "P",
      page: 1,
      pageSize: 48,
      sortBy: "updatedOnDesc",
      state: "WA",
    });
    return data.listings
      .filter(isLeadAgentListing)
      .filter((l) => getListingStatusBadge(l).tone === "pending")
      .slice(0, limit);
  } catch {
    return [];
  }
}
