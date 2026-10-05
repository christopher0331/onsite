"use client";

import Link from "next/link";
import OpenHouseLeadForm from "@/components/open-house/OpenHouseLeadForm";
import { trackLeadIntent, trackPhoneCall } from "@/lib/analytics";
import { contactHref } from "@/lib/contact-link";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_TEL } from "@/lib/nap";
import { downloadOpenHouseIcs } from "@/lib/open-house-ics";
import {
  formatOpenHouseDay,
  formatOpenHouseTimeRange,
  isOpenHouseLive,
  type UpcomingOpenHouse,
} from "@/lib/open-house";

type OpenHouse = UpcomingOpenHouse<{
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  type?: string | null;
  status?: string | null;
}>;

function formatWhen(oh: OpenHouse) {
  const day = formatOpenHouseDay(oh);
  const time = formatOpenHouseTimeRange(oh);
  return time ? `${day}, ${time} PT` : day;
}

export default function ListingOpenHouseCard({
  mlsNumber,
  street,
  location,
  contactAddress,
  mapsUrl,
  listPrice,
  brokerageName,
  upcoming,
  now,
}: {
  mlsNumber: string;
  street: string;
  location: string;
  contactAddress: string;
  mapsUrl: string;
  listPrice: string;
  brokerageName: string;
  upcoming: OpenHouse[];
  now: number;
}) {
  const next = upcoming[0];
  if (!next) return null;
  const later = upcoming.slice(1);
  const isNow = isOpenHouseLive(next, now);
  const timeRange = formatOpenHouseTimeRange(next);
  const when = formatWhen(next);
  const track = { mls: mlsNumber, surface: "listing_open_house", is_live: isNow };
  const askHref = contactHref({
    mls: mlsNumber,
    address: contactAddress,
    src: "ask_question",
    topic: "buying",
  });

  return (
    <div
      id="open-house-lead"
      className="w-full scroll-mt-28 overflow-hidden rounded-3xl border border-[#3daf3d] bg-[#1f2a1f] text-left shadow-[0_0_0_1px_rgba(61,175,61,0.25),0_18px_60px_-10px_rgba(61,175,61,0.45)] lg:ml-auto lg:w-[500px]"
    >
      <div className="flex items-center justify-between gap-2 bg-[#3daf3d] px-4 py-3.5 sm:gap-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-white sm:gap-2.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M10 21v-6h4v6" />
          </svg>
          <span className="whitespace-nowrap text-[19px] font-extrabold uppercase leading-none tracking-[0.08em] sm:text-[22px] sm:tracking-[0.14em]">
            Open House
          </span>
        </div>
        {isNow ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1f6f1f] sm:gap-2 sm:px-3 sm:tracking-[0.16em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#3daf3d] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3daf3d]" />
            </span>
            Happening now
          </span>
        ) : next.type ? (
          <span className="shrink-0 whitespace-nowrap rounded-full border border-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {next.type}
          </span>
        ) : null}
      </div>

      <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
        <p className="text-[clamp(1.9rem,8.5vw,2.6rem)] font-bold leading-[1.05] tracking-tight text-white">
          {formatOpenHouseDay(next)}
        </p>
        {timeRange && <p className="mt-1.5 text-[clamp(1.35rem,6vw,1.75rem)] font-medium leading-tight text-[#7fd67f]">{timeRange}</p>}
        {isNow && next.type ? <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/70">{next.type} open house</p> : null}

        <div className="mt-5">
          <OpenHouseLeadForm
            theme="dark"
            mode="listing"
            source="listing_open_house"
            surface="listing_open_house"
            mls={mlsNumber}
            address={contactAddress}
            openHouseWhen={when}
            brokerageName={brokerageName}
            listPrice={listPrice}
            isLive={isNow}
          />
        </div>

        <a
          href={PHONE_HREF}
          onClick={() => trackPhoneCall(PHONE_TEL, track)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#3daf3d] px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#3daf3d]/90"
        >
          Call OnSite
          <span className="font-medium normal-case tracking-normal">{PHONE_DISPLAY}</span>
        </a>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              trackLeadIntent("oh_add_to_calendar", track);
              downloadOpenHouseIcs(next, {
                title: `Open House: ${street}`,
                location,
                url: `${window.location.origin}/listings/${mlsNumber}`,
                mlsNumber,
              });
            }}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5" />
            </svg>
            Add to Calendar
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLeadIntent("oh_directions", track)}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
          </a>
        </div>

        <Link
          href={askHref}
          onClick={() => trackLeadIntent("ask_question", track)}
          className="mt-3 block text-center text-[11px] uppercase tracking-[0.22em] text-white/70 underline-offset-4 transition hover:text-white hover:underline"
        >
          Ask a Question
        </Link>

        {later.length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-2.5 text-[10px] uppercase tracking-[0.25em] text-white/60">Also open</p>
            <div className="flex flex-wrap gap-2">
              {later.map((oh, i) => {
                const range = formatOpenHouseTimeRange(oh);
                return (
                  <span key={i} className="rounded-full border border-[#3daf3d]/50 bg-[#3daf3d]/10 px-3 py-1.5 text-[12px] font-medium text-white">
                    {formatOpenHouseDay(oh, "short")}
                    {range ? <span className="text-white/70"> · {range}</span> : null}
                    {oh.type && oh.type !== "Public" ? (
                      <span className="ml-1.5 text-[10px] uppercase tracking-[0.15em] text-white/60">{oh.type}</span>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-white/55">
          Open house times are subject to change. Listing data courtesy of NWMLS as distributed by MLS Grid.
        </p>
      </div>
    </div>
  );
}
