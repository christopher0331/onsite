import Image from "next/image";
import Link from "next/link";
import MLSCardAttribution from "@/components/MLSCardAttribution";
import { getListingStatusBadge } from "@/lib/listing-status";
import { getCitySlugByName } from "@/lib/service-areas/data";

const CDN = "https://cdn.repliers.io/";

export type CardListing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice?: number | null;
  status?: string | null;
  lastStatus?: string | null;
  standardStatus?: string | null;
  raw?: Record<string, unknown> | null;
  address?: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    unitNumber?: string | null;
    city?: string;
    state?: string;
    zip?: string;
    neighborhood?: string;
  } | null;
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    sqft?: number | null;
    propertyType?: string | null;
  } | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string };
  office?: { brokerageName?: string } | null;
  listDate?: string | null;
};

function formatPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

function formatAddress(a: CardListing["address"]) {
  if (!a) return "Address unavailable";
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = a.unitNumber ? ` #${a.unitNumber}` : "";
  return street ? `${street}${unit}` : "Address unavailable";
}

function formatCityLine(a: CardListing["address"]) {
  if (!a) return "";
  return [a.city, a.state, a.zip].filter(Boolean).join(", ");
}

function getImageUrl(images: string[] | null | undefined) {
  if (!images?.length) return null;
  const path = images[0];
  if (path.startsWith("http")) return path;
  return CDN + path;
}

export default function ListingCard({
  listing,
  sourceLabel,
}: {
  listing: CardListing;
  sourceLabel?: string;
}) {
  const img = getImageUrl(listing.images ?? []);
  const addr = listing.address;
  const det = listing.details ?? {};
  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = showAddress ? formatAddress(addr) : "Undisclosed";
  const cityLine = formatCityLine(addr);
  const serviceAreaSlug = addr?.city ? getCitySlugByName(addr.city) : null;
  const badge = getListingStatusBadge(listing);
  const tone =
    badge.tone === "active"
      ? "bg-white/90 text-charcoal"
      : badge.tone === "pending"
        ? "bg-amber-400/95 text-charcoal"
        : "bg-charcoal/80 text-white";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1">
      {/* Stretched primary link — keeps the whole card clickable without
          nesting anchors (the service-area link below sits above it). */}
      <Link
        href={`/listings/${listing.mlsNumber}`}
        aria-label={street}
        className="absolute inset-0 z-10"
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
        {img ? (
          <Image
            src={img}
            alt={showAddress ? street : "Property photo"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-charcoal/20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        )}
        <div className="absolute left-4 top-4 z-20 max-w-[calc(100%-2rem)]">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium whitespace-normal text-center ${tone}`}
          >
            {badge.label}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
          {listing.soldPrice ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/60 mb-0.5">Sold</p>
              <p className="font-serif text-[1.6rem] font-light leading-none text-white">
                {formatPrice(listing.soldPrice)}
              </p>
              <p className="mt-1 text-[12px] text-white/60">Listed: {formatPrice(listing.listPrice)}</p>
            </>
          ) : (
            <p className="font-serif text-[1.6rem] font-light leading-none text-white">
              {formatPrice(listing.listPrice)}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 font-serif text-[1.05rem] font-light leading-snug text-charcoal">{street}</h3>
        {cityLine && <p className="mb-3 text-[13px] text-charcoal/90">{cityLine}</p>}
        {serviceAreaSlug && (
          <Link
            href={`/service-areas/${serviceAreaSlug}`}
            className="relative z-20 mb-3 inline-flex w-fit items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-charcoal/70 underline-offset-4 hover:text-charcoal hover:underline"
          >
            Service Area: {addr?.city}
          </Link>
        )}
        {(det.numBedrooms || det.numBathrooms || det.sqft) && (
          <div className="mb-3 flex gap-4 text-[13px] text-charcoal/75">
            {det.numBedrooms && <span><strong className="text-charcoal font-semibold">{det.numBedrooms}</strong> bd</span>}
            {det.numBathrooms && <span><strong className="text-charcoal font-semibold">{det.numBathrooms}</strong> ba</span>}
            {det.sqft && <span><strong className="text-charcoal font-semibold">{Number(det.sqft).toLocaleString()}</strong> sqft</span>}
          </div>
        )}
        {det.propertyType && (
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-charcoal/80">{det.propertyType}</p>
        )}
        {sourceLabel ? (
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-charcoal/80">
            {sourceLabel}
          </p>
        ) : (
          listing.office?.brokerageName && (
            <p className="mb-3 text-[11px] text-charcoal/80">
              Listed by {listing.office.brokerageName}
            </p>
          )
        )}
        <div className="mt-auto flex items-center justify-between border-t border-charcoal/10 pt-4">
          <span className="text-[11px] text-charcoal/80">MLS# {listing.mlsNumber}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/80 transition-colors duration-300 group-hover:text-charcoal">View →</span>
        </div>
        <MLSCardAttribution state={addr?.state} />
      </div>
    </div>
  );
}
