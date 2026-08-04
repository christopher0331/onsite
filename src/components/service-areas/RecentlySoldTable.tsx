import Link from "next/link";
import type { SoldListingRow } from "@/lib/service-area-market";
import { formatStreetAddressOrUnavailable } from "@/lib/format-address";

type Props = {
  cityName: string;
  listings: SoldListingRow[];
  viewAllHref: string;
};

function formatPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "—";
  return "$" + n.toLocaleString("en-US");
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function pricePerSqft(listing: SoldListingRow) {
  const price = listing.soldPrice || listing.listPrice;
  const sqft = listing.details?.sqft;
  if (!price || !sqft || sqft <= 0) return "—";
  return "$" + Math.round(price / sqft).toLocaleString("en-US");
}

export default function RecentlySoldTable({
  cityName,
  listings,
  viewAllHref,
}: Props) {
  if (listings.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-charcoal/8">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-4">
              Recently Sold · {cityName}
            </p>
            <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
              What {cityName} homes are actually closing for.
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500 shrink-0"
          >
            View all recently sold
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-charcoal/10">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-charcoal/10 bg-warm-gray/40 text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                <th className="px-5 py-4 font-medium">Address</th>
                <th className="px-5 py-4 font-medium">Sold price</th>
                <th className="px-5 py-4 font-medium">$/sqft</th>
                <th className="px-5 py-4 font-medium">DOM</th>
                <th className="px-5 py-4 font-medium">Sold date</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => {
                const street = formatStreetAddressOrUnavailable(
                  listing.address
                );
                const zip = listing.address?.zip;
                return (
                  <tr
                    key={listing.mlsNumber}
                    className="border-b border-charcoal/6 last:border-0 hover:bg-warm-gray/30 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/listings/${listing.mlsNumber}`}
                        className="font-medium text-charcoal hover:text-[#3daf3d] underline-offset-2 hover:underline"
                      >
                        {street}
                      </Link>
                      {zip ? (
                        <span className="block text-[12px] text-charcoal/55 mt-0.5">
                          {zip}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/85">
                      {formatPrice(listing.soldPrice || listing.listPrice)}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/85">
                      {pricePerSqft(listing)}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/85">
                      {listing.daysOnMarket ??
                        listing.simpleDaysOnMarket ??
                        "—"}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/85">
                      {formatDate(listing.soldDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
