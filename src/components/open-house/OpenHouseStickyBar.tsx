"use client";

import { trackLeadIntent, trackPhoneCall } from "@/lib/analytics";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_TEL } from "@/lib/nap";

export default function OpenHouseStickyBar({
  mlsNumber,
  dayLabel,
  timeLabel,
  isLive,
}: {
  mlsNumber: string;
  dayLabel: string;
  timeLabel: string;
  isLive: boolean;
}) {
  const track = { mls: mlsNumber, surface: "listing_open_house_sticky", is_live: isLive };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#3daf3d]/50 bg-[#1f2a1f] px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{isLive ? "Happening now" : dayLabel}</p>
          {timeLabel ? <p className="truncate text-[12px] text-[#7fd67f]">{timeLabel} PT</p> : null}
        </div>
        <a
          href="#open-house-lead"
          onClick={() => trackLeadIntent("oh_tour_request", track)}
          className="shrink-0 rounded-full bg-white px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal"
        >
          Request tour
        </a>
        <a
          href={PHONE_HREF}
          onClick={() => trackPhoneCall(PHONE_TEL, track)}
          className="shrink-0 rounded-full bg-[#3daf3d] px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
        >
          Call
          <span className="sr-only"> OnSite at {PHONE_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}
