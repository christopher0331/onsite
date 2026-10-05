import { connection } from "next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenHousesBrowser from "@/components/open-house/OpenHousesBrowser";
import { getUpcomingOpenHouseListings } from "@/lib/open-house-listings";

export default async function OpenHousesPage() {
  // Render at request time so a missing build-time API key cannot freeze an
  // empty list. The Repliers fetch inside still revalidates every 5 minutes.
  await connection();
  const { listings, asOfMs } = await getUpcomingOpenHouseListings(80, "directory");

  return (
    <>
      <Header />
      <main className="bg-white">
        <OpenHousesBrowser listings={listings} renderedAtMs={asOfMs} />
      </main>
      <Footer />
    </>
  );
}
