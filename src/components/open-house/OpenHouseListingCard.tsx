"use client";

import Image from "next/image";
import Link from "next/link";
import MLSCardAttribution from "@/components/MLSCardAttribution";
import { trackLeadIntent } from "@/lib/analytics";
import type { OpenHouseListing } from "@/lib/open-house-listings";
import {
  formatOpenHouseDay,
  formatOpenHouseTimeRange,
  isOpenHouseLive,
  type UpcomingOpenHouse,
} from "@/lib/open-house";

function formatPrice(n: number | null) {
  if (!n) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

function HouseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1f6f1f] shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#3daf3d] opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3daf3d]" />
      </span>
      Happening now
    </span>
  );
}

type CardOpenHouse = UpcomingOpenHouse<OpenHouseListing["openHouses"][number]>;

export default function OpenHouseListingCard({
  listing,
  upcoming,
  now,
  surface,
  imagePriority = false,
}: {
  listing: OpenHouseListing;
  upcoming: CardOpenHouse[];
  now: number;
  surface: "homepage_open_houses" | "open_houses_directory";
  imagePriority?: boolean;
}) {
  const next = upcoming[0];
  if (!next) return null;
  const live = isOpenHouseLive(next, now);
  const timeRange = formatOpenHouseTimeRange(next);
  const more = upcoming.length - 1;
  const track = { mls: listing.mlsNumber, surface, is_live: live };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#3daf3d]/40 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <Link
        href={`/listings/${listing.mlsNumber}`}
        aria-label={`Open house: ${listing.street}, ${formatOpenHouseDay(next)}${timeRange ? ` ${timeRange} PT` : ""}`}
        onClick={() => trackLeadIntent("oh_card_click", track)}
        className="group flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
          {listing.image ? (
            <Image
              src={listing.image}
              alt={listing.street}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 33vw"
              loading={imagePriority ? "eager" : "lazy"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-charcoal/20">
              <HouseIcon size={48} />
            </div>
          )}
          <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-2">
            {live ? (
              <LiveBadge />
            ) : (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#3daf3d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                <HouseIcon size={12} />
                Open house
              </span>
            )}
            {listing.isModelHome && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal shadow-sm">
                Model home
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
            <p className="font-serif text-[1.6rem] font-light leading-none text-white">{formatPrice(listing.listPrice)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 bg-[#1f2a1f] px-5 py-3.5">
          <div className="min-w-0">
            <p className="text-[17px] font-bold leading-tight tracking-tight text-white">{formatOpenHouseDay(next)}</p>
            {timeRange && (
              <p className="mt-0.5 text-[14px] font-medium leading-tight text-[#7fd67f]">
                {timeRange} <span className="text-[11px] text-white/60">PT</span>
              </p>
            )}
          </div>
          {more > 0 && (
            <span className="shrink-0 rounded-full border border-[#3daf3d]/50 bg-[#3daf3d]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
              +{more} more
            </span>
          )}
        </div>

        <div className="flex flex-col px-5 pb-4 pt-4">
          <h3 className="mb-1 font-serif text-[1.05rem] font-light leading-snug text-charcoal">{listing.street}</h3>
          {listing.cityLine && <p className="mb-3 text-[13px] text-charcoal/90">{listing.cityLine}</p>}
          {(listing.beds || listing.baths || listing.sqft) && (
            <div className="mb-3 flex gap-4 text-[13px] text-charcoal/75">
              {listing.beds && (
                <span>
                  <strong className="font-semibold text-charcoal">{listing.beds}</strong> bd
                </span>
              )}
              {listing.baths && (
                <span>
                  <strong className="font-semibold text-charcoal">{listing.baths}</strong> ba
                </span>
              )}
              {listing.sqft && (
                <span>
                  <strong className="font-semibold text-charcoal">{listing.sqft.toLocaleString()}</strong> sqft
                </span>
              )}
            </div>
          )}
          {listing.isOnsite && <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2e8f2e]">OnSite listing</p>}
          {listing.brokerageName && <p className="mb-3 text-[11px] text-charcoal/80">Listed by {listing.brokerageName}</p>}
          <div className="flex items-center justify-between border-t border-charcoal/10 pt-3">
            <span className="text-[11px] text-charcoal/80">MLS# {listing.mlsNumber}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2e8f2e] transition-colors duration-300 group-hover:text-[#1f6f1f]">
              View home →
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-auto px-5 pb-5">
        <Link
          href={`/listings/${listing.mlsNumber}#open-house-lead`}
          onClick={() => trackLeadIntent("oh_tour_request", track)}
          className="flex w-full items-center justify-center rounded-full bg-[#1f2a1f] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2e8f2e]"
        >
          Tell us you&apos;re coming
        </Link>
        <MLSCardAttribution state={listing.state} />
      </div>
    </article>
  );
}
