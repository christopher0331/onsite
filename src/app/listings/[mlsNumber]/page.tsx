import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getListingLookup } from "@/lib/listing-fetch";
import { isListingIndexable } from "@/lib/listing-index-policy";
import { listingJsonLd } from "@/lib/listing-seo";
import ListingDetailView, { type Listing } from "./ListingDetailView";

export const revalidate = 300;

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ mlsNumber: string }>;
}) {
  const { mlsNumber } = await params;
  const lookup = await getListingLookup(mlsNumber);
  const listing = lookup.listing as Listing | null;
  // Gone from the feed, or Expired / Canceled / Temporarily Off Market / Sale-Fail /
  // MlgCanView=false: respond 404 (not a soft 200). Transient lookup errors keep the
  // soft "not found" page below so a feed hiccup never 404s a live listing.
  if (!listing && lookup.gone) notFound();
  const indexable = isListingIndexable(listing);
  const jsonLd = listing && indexable ? listingJsonLd(mlsNumber, listing) : null;

  if (!listing) {
    return (
      <>
        <Header />
        <main className="w-full max-w-full overflow-x-hidden bg-white pt-28 pb-20 text-center sm:pt-40">
          <h1 className="font-serif text-2xl font-light text-charcoal">Listing not found.</h1>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-charcoal/70">
            This MLS listing is no longer available or the link is incorrect. Browse East Pierce
            homes for sale, or search by MLS number.
          </p>
          <Link
            href="/listings"
            className="mt-6 inline-block text-[12px] uppercase tracking-[0.25em] text-charcoal/75 hover:text-charcoal"
          >
            ← Back to Listings
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <ListingDetailView listing={listing} fetchedAtIso={new Date().toISOString()} />
    </>
  );
}
