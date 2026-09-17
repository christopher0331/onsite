import { queryOnsiteListings } from "@/lib/listing-fetch";
import OurListingsClient from "./OurListingsClient";

export const revalidate = 300;

export default async function OurListingsPage() {
  const initial = await queryOnsiteListings({
    scope: "all",
    status: "All",
    page: 1,
    pageSize: 24,
    sortBy: "updatedOnDesc",
    state: "WA",
  });

  return <OurListingsClient initial={initial} />;
}
