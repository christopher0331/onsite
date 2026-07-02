import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import type { OnsiteListing } from "@/lib/onsite-listings";

type Props = {
  areaLabel: string;
  listings: OnsiteListing[];
  viewAllHref: string;
  /** Copy tweak for neighborhood spokes, which show city-wide inventory. */
  scopeNote?: string;
};

export default function AreaListings({ areaLabel, listings, viewAllHref, scopeNote }: Props) {
  if (listings.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#f2ede6]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
              For Sale Now
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
              Homes for sale in <span>{areaLabel}</span>
            </h2>
            {scopeNote && (
              <p className="mt-3 max-w-xl text-[14.5px] leading-7 text-charcoal/70">
                {scopeNote}
              </p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500 shrink-0"
          >
            View All {areaLabel} Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.mlsNumber}
              listing={listing}
              sourceLabel={listing.sourceLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
