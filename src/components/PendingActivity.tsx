import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { getOnsitePendingListings } from "@/lib/pending-listings";

/** Homepage + /pending "Pending / Recent Activity" section (IDX-fed). */
export default async function PendingActivity({
  limit = 6,
  showViewAll = true,
  headingLevel = "h2",
}: {
  limit?: number;
  showViewAll?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const listings = await getOnsitePendingListings(limit);
  if (listings.length === 0) return null;
  const Heading = headingLevel;

  return (
    <section id="pending" className="relative scroll-mt-24 py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
            Recent Activity
          </p>
          <Heading className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-tight">
            Pending Listings
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-charcoal/75">
            Homes listed by André &amp; Cindie Bohall that are now under contract. Updated automatically from NWMLS.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard
              key={listing.mlsNumber}
              listing={listing}
              sourceLabel={listing.sourceLabel}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="mt-14 text-center">
            <Link
              href="/pending"
              className="inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500"
            >
              View All Pending
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
