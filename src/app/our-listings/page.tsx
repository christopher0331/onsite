"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ListingCard from "@/components/ListingCard";
import type { OnsiteListing, OnsiteListingScope } from "@/lib/onsite-listings";
import {
  ONSITE_BROKERAGE_NAME,
  ONSITE_LEAD_AGENT_NAME,
} from "@/lib/onsite-listings";

type ApiResponse = {
  count: number;
  numPages: number;
  page: number;
  scope: OnsiteListingScope;
  timberCount: number;
  andreCount: number;
  listings: OnsiteListing[];
};

const SCOPE_FILTERS: { label: string; value: OnsiteListingScope; description: string }[] = [
  { label: "All Listings", value: "all", description: "Timber & André combined" },
  { label: "André Bohall", value: "andre", description: ONSITE_LEAD_AGENT_NAME },
  { label: "Timber Real Estate", value: "timber", description: ONSITE_BROKERAGE_NAME },
];

const STATUS_FILTERS = [
  { label: "All", value: "All" },
  { label: "Active", value: "A" },
  { label: "Pending", value: "P" },
  { label: "Sold", value: "U" },
];

export default function OurListingsPage() {
  const [listings, setListings] = useState<OnsiteListing[]>([]);
  const [count, setCount] = useState(0);
  const [timberCount, setTimberCount] = useState(0);
  const [andreCount, setAndreCount] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scope, setScope] = useState<OnsiteListingScope>("all");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    setPage(1);
  }, [status, scope]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      const params = new URLSearchParams({
        scope,
        status,
        page: String(page),
        pageSize: "24",
        sortBy: "updatedOnDesc",
        state: "WA",
      });

      const res = await fetch(`/api/listings/ours?${params.toString()}`);
      if (!res.ok) {
        if (!cancelled) {
          setListings([]);
          setCount(0);
          setTimberCount(0);
          setAndreCount(0);
          setNumPages(1);
          setLoading(false);
        }
        return;
      }

      const data = (await res.json()) as ApiResponse;
      if (cancelled) return;

      setListings(data.listings ?? []);
      setCount(data.count ?? 0);
      setTimberCount(data.timberCount ?? 0);
      setAndreCount(data.andreCount ?? 0);
      setNumPages(data.numPages ?? 1);
      setLoading(false);
    }

    load().catch(() => {
      if (!cancelled) {
        setListings([]);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [scope, status, page]);

  const statusLabel =
    STATUS_FILTERS.find((f) => f.value === status)?.label?.toLowerCase() ?? "total";
  const scopeLabel = SCOPE_FILTERS.find((f) => f.value === scope)?.label ?? "All Listings";
  const filteredCount = count;

  return (
    <>
      <Header />
      <main className="bg-warm-gray pt-28 sm:pt-32">
        <section className="border-b border-charcoal/10 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">
              OnSite Real Estate Group
            </p>
            <h1 className="mb-5 font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-tight text-charcoal">
              Our Listings
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-charcoal/80">
              Every property listed by {ONSITE_BROKERAGE_NAME} and {ONSITE_LEAD_AGENT_NAME},
              including active, pending, and sold homes across Washington.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[12px] text-charcoal/75">
              <span
                className={`rounded-full border px-4 py-2 ${
                  scope === "timber"
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-charcoal/15"
                }`}
              >
                {ONSITE_BROKERAGE_NAME}: {timberCount}{" "}
                {status === "All" ? "total" : statusLabel}
              </span>
              <span
                className={`rounded-full border px-4 py-2 ${
                  scope === "andre"
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-charcoal/15"
                }`}
              >
                {ONSITE_LEAD_AGENT_NAME}: {andreCount}{" "}
                {status === "All" ? "total" : statusLabel}
              </span>
              {scope === "all" && (
                <span className="rounded-full border border-charcoal/15 bg-charcoal px-4 py-2 text-white">
                  {count} unique {status === "All" ? "total" : statusLabel}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="sticky top-20 z-30 border-b border-charcoal/10 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] space-y-3 px-6 py-4 lg:px-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                Listed by
              </span>
              {SCOPE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setScope(filter.value)}
                  className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    scope === filter.value
                      ? "bg-charcoal text-white"
                      : "bg-charcoal/5 text-charcoal/80 hover:bg-charcoal/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-charcoal/8 pt-3">
              <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                Status
              </span>
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatus(filter.value)}
                  className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    status === filter.value
                      ? "bg-charcoal text-white"
                      : "bg-charcoal/5 text-charcoal/80 hover:bg-charcoal/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16">
          {loading ? (
            <div className="grid h-48 place-items-center">
              <p className="text-[12px] uppercase tracking-[0.25em] text-charcoal/60">
                Loading listings…
              </p>
            </div>
          ) : listings.length === 0 ? (
            <div className="rounded-3xl border border-charcoal/10 bg-white px-8 py-16 text-center">
              <p className="font-serif text-2xl text-charcoal">No listings found</p>
              <p className="mt-3 text-[14px] text-charcoal/70">
                No {statusLabel} listings for {scopeLabel}. Try another filter or browse all
                Washington homes.
              </p>
              <Link
                href="/listings?status=A&state=WA"
                className="mt-8 inline-flex border border-charcoal/20 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-white"
              >
                Search All MLS Listings
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                    {scopeLabel}
                    {status !== "All" ? ` · ${STATUS_FILTERS.find((f) => f.value === status)?.label}` : ""}
                  </p>
                  <p className="mt-1 text-[14px] text-charcoal/80">
                    Showing {listings.length} of {filteredCount} listings
                    {numPages > 1 ? ` · Page ${page} of ${numPages}` : ""}
                  </p>
                </div>
                <Link
                  href="/listings?status=A&state=WA"
                  className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70 underline-offset-4 hover:text-charcoal hover:underline"
                >
                  Search all MLS homes →
                </Link>
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

              {numPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-full border border-charcoal/20 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-charcoal disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-[12px] text-charcoal/70">
                    {page} / {numPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= numPages}
                    onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                    className="rounded-full border border-charcoal/20 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-charcoal disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Marquee />
      <Footer />
    </>
  );
}
