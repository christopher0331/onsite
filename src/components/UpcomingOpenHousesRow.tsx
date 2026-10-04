"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import MLSCardAttribution from "@/components/MLSCardAttribution";
import type { OpenHouseListing } from "@/lib/open-house-listings";
import {
  currentMinute,
  formatOpenHouseDay,
  formatOpenHouseTimeRange,
  getUpcomingOpenHouses,
  isOpenHouseLive,
  subscribeMinute,
} from "@/lib/open-house";

const MAX_CARDS = 6;

function formatPrice(n: number | null) {
  if (!n) return "Price on request";
  return "$" + n.toLocaleString("en-US");
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

function HouseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

export default function UpcomingOpenHousesRow({
  listings,
  renderedAtMs,
}: {
  listings: OpenHouseListing[];
  renderedAtMs: number;
}) {
  // Server render + hydration use the request time; the browser then re-checks
  // every minute so finished open houses drop off and "Happening now" flips on.
  const now = useSyncExternalStore(subscribeMinute, currentMinute, () => renderedAtMs);
  const reduceMotion = useReducedMotion();

  const cards = listings
    .map((listing) => ({ listing, upcoming: getUpcomingOpenHouses(listing.openHouses, now) }))
    .filter((c) => c.upcoming.length > 0)
    .slice(0, MAX_CARDS);

  if (cards.length === 0) return null;
  const anyLive = cards.some((c) => isOpenHouseLive(c.upcoming[0], now));

  return (
    <section
      aria-labelledby="upcoming-open-houses-heading"
      className="relative overflow-hidden bg-white py-14 sm:py-20"
    >
      {/* Soft green glow behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-[#3daf3d]/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3daf3d] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              <HouseIcon />
              {anyLive ? "Open now & this week" : "This week"}
            </p>
            <h2
              id="upcoming-open-houses-heading"
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-charcoal"
            >
              Upcoming <span className="text-[#2e8f2e]">Open Houses</span>
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-charcoal/75">
              Tour these homes in person — no appointment needed. Times shown in Pacific Time.
            </p>
          </div>
          <Link
            href="/listings"
            className="group inline-flex w-fit items-center gap-3 border border-charcoal/20 px-7 py-3 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
          >
            Search All Homes
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Mobile/tablet: swipeable row. Desktop: 3-column grid. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {cards.map(({ listing, upcoming }, i) => {
            const next = upcoming[0];
            const live = isOpenHouseLive(next, now);
            const timeRange = formatOpenHouseTimeRange(next);
            const more = upcoming.length - 1;
            return (
              <motion.div
                key={listing.mlsNumber}
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.08 }}
                className="w-[82%] max-w-[380px] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:max-w-none"
              >
                <Link
                  href={`/listings/${listing.mlsNumber}`}
                  aria-label={`Open house: ${listing.street}, ${formatOpenHouseDay(next)}${timeRange ? ` ${timeRange} PT` : ""}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#3daf3d]/40 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-[#3daf3d] hover:shadow-[0_0_0_1px_rgba(61,175,61,0.25),0_22px_60px_-12px_rgba(61,175,61,0.45)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
                    {listing.image ? (
                      <Image
                        src={listing.image}
                        alt={listing.street}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 33vw"
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-charcoal/20">
                        <HouseIcon size={48} />
                      </div>
                    )}
                    <div className="absolute left-4 top-4 z-10">
                      {live ? (
                        <LiveBadge />
                      ) : (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#3daf3d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                          <HouseIcon size={12} />
                          Open house
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
                      <p className="font-serif text-[1.6rem] font-light leading-none text-white">
                        {formatPrice(listing.listPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Green date band — mirrors the listing page's open house card */}
                  <div className="flex items-center justify-between gap-3 bg-[#1f2a1f] px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="text-[17px] font-bold leading-tight tracking-tight text-white">
                        {formatOpenHouseDay(next)}
                      </p>
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

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <h3 className="mb-1 font-serif text-[1.05rem] font-light leading-snug text-charcoal">
                      {listing.street}
                    </h3>
                    {listing.cityLine && (
                      <p className="mb-3 text-[13px] text-charcoal/90">{listing.cityLine}</p>
                    )}
                    {(listing.beds || listing.baths || listing.sqft) && (
                      <div className="mb-3 flex gap-4 text-[13px] text-charcoal/75">
                        {listing.beds && (
                          <span><strong className="font-semibold text-charcoal">{listing.beds}</strong> bd</span>
                        )}
                        {listing.baths && (
                          <span><strong className="font-semibold text-charcoal">{listing.baths}</strong> ba</span>
                        )}
                        {listing.sqft && (
                          <span><strong className="font-semibold text-charcoal">{listing.sqft.toLocaleString()}</strong> sqft</span>
                        )}
                      </div>
                    )}
                    {listing.brokerageName && (
                      <p className="mb-3 text-[11px] text-charcoal/80">Listed by {listing.brokerageName}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between border-t border-charcoal/10 pt-3">
                      <span className="text-[11px] text-charcoal/80">MLS# {listing.mlsNumber}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2e8f2e] transition-colors duration-300 group-hover:text-[#1f6f1f]">
                        View home →
                      </span>
                    </div>
                    <MLSCardAttribution state={listing.state} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
