import UpcomingOpenHousesRow from "@/components/UpcomingOpenHousesRow";
import { getUpcomingOpenHouseListings } from "@/lib/open-house-listings";

/**
 * Homepage "Upcoming Open Houses" section (server component).
 * Fetches live open house data from Repliers on the server (cached 5 min like
 * other listing data) and renders nothing when none are upcoming.
 */
export default async function UpcomingOpenHouses() {
  const { listings, asOfMs } = await getUpcomingOpenHouseListings(8);
  if (listings.length === 0) return null;
  return <UpcomingOpenHousesRow listings={listings} renderedAtMs={asOfMs} />;
}
