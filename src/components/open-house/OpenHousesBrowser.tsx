"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import OpenHouseLeadForm from "@/components/open-house/OpenHouseLeadForm";
import OpenHouseListingCard from "@/components/open-house/OpenHouseListingCard";
import { trackLeadIntent } from "@/lib/analytics";
import { contactHref } from "@/lib/contact-link";
import type { OpenHouseListing } from "@/lib/open-house-listings";
import {
  currentMinute,
  formatOpenHouseDay,
  getUpcomingOpenHouses,
  isOpenHouseLive,
  isThisWeekendOpen,
  subscribeMinute,
} from "@/lib/open-house";

export default function OpenHousesBrowser({
  listings,
  renderedAtMs,
}: {
  listings: OpenHouseListing[];
  renderedAtMs: number;
}) {
  const now = useSyncExternalStore(subscribeMinute, currentMinute, () => renderedAtMs);
  const cards = useMemo(
    () =>
      listings
        .map((listing) => ({ listing, upcoming: getUpcomingOpenHouses(listing.openHouses, now) }))
        .filter((card) => card.upcoming.length > 0),
    [listings, now]
  );

  const weekendCount = cards.filter(
    (card) => !card.listing.isModelHome && isThisWeekendOpen(card.upcoming[0], now)
  ).length;

  const [when, setWhen] = useState<"weekend" | "week">(weekendCount > 0 ? "weekend" : "week");
  const [city, setCity] = useState("all");
  const [onsiteOnly, setOnsiteOnly] = useState(false);
  const [includeModels, setIncludeModels] = useState(false);

  const cities = Array.from(new Set(cards.map((card) => card.listing.city).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );

  const visible = cards.filter((card) => {
    if (!includeModels && card.listing.isModelHome) return false;
    if (onsiteOnly && !card.listing.isOnsite) return false;
    if (city !== "all" && card.listing.city !== city) return false;
    if (when === "weekend" && !isThisWeekendOpen(card.upcoming[0], now)) return false;
    return true;
  });

  const anyLive = visible.some((card) => isOpenHouseLive(card.upcoming[0], now));
  const tourHref = contactHref({ src: "open_houses_page", topic: "buying" });

  return (
    <>
      <section className="bg-[#1a1a18] pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/60">East Pierce County</p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.02] text-white">
            Open Houses <span className="text-[#7fd67f]">This Weekend</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/75">
            Homes opening across Lake Tapps, Bonney Lake, Sumner, Puyallup, and the rest of OnSite&apos;s East Pierce coverage, plus OnSite&apos;s own listings. Tell us you&apos;re coming or request a private tour — an agent will reach out. Times are Pacific and subject to change. Nothing is booked online.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={tourHref}
              onClick={() => trackLeadIntent("oh_tour_request", { surface: "open_houses_directory", is_live: anyLive })}
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] text-charcoal transition hover:bg-white/90"
            >
              Request a private tour
            </Link>
            <a
              href="#open-house-alerts"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/35 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Get open house alerts
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterButton active={when === "weekend"} onClick={() => setWhen("weekend")}>
                This weekend
              </FilterButton>
              <FilterButton active={when === "week"} onClick={() => setWhen("week")}>
                This week
              </FilterButton>
              <FilterButton active={onsiteOnly} onClick={() => setOnsiteOnly((v) => !v)}>
                OnSite listings
              </FilterButton>
              <FilterButton active={includeModels} onClick={() => setIncludeModels((v) => !v)}>
                Include model homes
              </FilterButton>
            </div>
            {cities.length > 1 && (
              <label className="flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-charcoal/70">
                City
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-[14px] normal-case tracking-normal text-charcoal"
                >
                  <option value="all">All cities</option>
                  {cities.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <p className="mb-6 text-[13px] text-charcoal/65">
            {visible.length === 0
              ? "No open houses match these filters."
              : `${visible.length} open ${visible.length === 1 ? "house" : "houses"}${
                  when === "weekend" ? " this weekend" : " in the next week"
                }. Daily builder model homes stay hidden unless you include them.`}
            {visible[0] ? ` Next up: ${formatOpenHouseDay(visible[0].upcoming[0])}.` : ""}
          </p>

          {visible.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(({ listing, upcoming }, i) => (
                <OpenHouseListingCard
                  key={listing.mlsNumber}
                  listing={listing}
                  upcoming={upcoming}
                  now={now}
                  surface="open_houses_directory"
                  imagePriority={i < 3}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-8">
              <p className="font-serif text-[1.6rem] font-light text-charcoal">Want a tour anyway?</p>
              <p className="mt-2 max-w-xl text-[15px] leading-7 text-charcoal/75">
                Leave your info and an OnSite agent will follow up. Switch to this week or include model homes if you were looking for a posted open house.
              </p>
            </div>
          )}

          <p className="mt-8 max-w-3xl text-[11px] leading-relaxed text-charcoal/60">
            Open house times are subject to change without notice. Listing information is courtesy of Northwest MLS as distributed by MLS Grid and should be verified. Properties may or may not be listed by OnSite Real Estate Group.
          </p>
        </div>
      </section>

      <section className="bg-[#f2ede6] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-2 lg:px-12">
          <div className="rounded-3xl border border-charcoal/[0.08] bg-white p-7 sm:p-9">
            <OpenHouseLeadForm
              mode="visit"
              source="open_houses_page"
              surface="open_houses_directory"
              isLive={anyLive}
              heading="Tell us you're coming"
              subcopy="Name the home if you have one. Choose a posted open house or ask for a private tour. An OnSite agent will reach out."
            />
          </div>
          <div id="open-house-alerts" className="scroll-mt-28 rounded-3xl border border-charcoal/[0.08] bg-white p-7 sm:p-9">
            <OpenHouseLeadForm mode="alerts" source="oh_alerts" surface="open_houses_directory" />
          </div>
        </div>
      </section>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition ${
        active ? "bg-charcoal text-white" : "border border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
      }`}
    >
      {children}
    </button>
  );
}
