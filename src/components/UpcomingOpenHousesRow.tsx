"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import OpenHouseListingCard from "@/components/open-house/OpenHouseListingCard";
import { trackLeadIntent } from "@/lib/analytics";
import { contactHref } from "@/lib/contact-link";
import type { OpenHouseListing } from "@/lib/open-house-listings";
import {
  currentMinute,
  getUpcomingOpenHouses,
  isOpenHouseLive,
  subscribeMinute,
} from "@/lib/open-house";

const MAX_CARDS = 6;

function HouseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  const now = useSyncExternalStore(subscribeMinute, currentMinute, () => renderedAtMs);
  const reduceMotion = useReducedMotion();

  const cards = listings
    .map((listing) => ({ listing, upcoming: getUpcomingOpenHouses(listing.openHouses, now) }))
    .filter((c) => c.upcoming.length > 0)
    .slice(0, MAX_CARDS);

  if (cards.length === 0) return null;
  const anyLive = cards.some((c) => isOpenHouseLive(c.upcoming[0], now));
  const tourHref = contactHref({ src: "homepage_open_houses", topic: "buying" });

  return (
    <section aria-labelledby="upcoming-open-houses-heading" className="relative overflow-hidden bg-white py-14 sm:py-20">
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
              Tour these homes in person this week. Tell us you&apos;re coming, or request a private tour if the posted time doesn&apos;t work — an OnSite agent will reach out. No online booking. Times are Pacific and subject to change.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={tourHref}
              onClick={() =>
                trackLeadIntent("oh_tour_request", {
                  surface: "homepage_open_houses",
                  is_live: anyLive,
                })
              }
              className="inline-flex w-fit items-center justify-center bg-[#1f2a1f] px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-[#2e8f2e]"
            >
              Request a private tour
            </Link>
            <Link
              href="/open-houses"
              className="inline-flex w-fit items-center justify-center border border-charcoal/20 px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-charcoal transition hover:bg-charcoal hover:text-white"
            >
              This week&apos;s list
            </Link>
            <Link
              href="/listings"
              className="group inline-flex w-fit items-center gap-3 border border-charcoal/20 px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
            >
              Search All Homes
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {cards.map(({ listing, upcoming }, i) => (
            <motion.div
              key={listing.mlsNumber}
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.08 }}
              className="w-[82%] max-w-[380px] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:max-w-none"
            >
              <OpenHouseListingCard
                listing={listing}
                upcoming={upcoming}
                now={now}
                surface="homepage_open_houses"
                imagePriority={i < 3}
              />
            </motion.div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-charcoal/60">
          Open house times are subject to change. Listing data provided by NWMLS as distributed by MLS Grid. OnSite does not book a time slot online.
        </p>
      </div>
    </section>
  );
}
