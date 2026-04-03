"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import MLSCardAttribution from "@/components/MLSCardAttribution";

const CDN = "https://cdn.repliers.io/";

type Listing = {
  mlsNumber: string;
  listPrice: number;
  status: string;
  lastStatus: string;
  listDate: string;
  address: {
    streetNumber: string;
    streetName: string;
    streetSuffix: string;
    streetDirection: string;
    unitNumber: string | null;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
  };
  details: {
    numBedrooms: number | null;
    numBathrooms: number | null;
    sqft: number | null;
    propertyType: string | null;
    description: string | null;
    style: string | null;
    yearBuilt: string | null;
    garage: string | null;
    viewType: string | null;
  };
  images: string[];
  map: { latitude: number; longitude: number };
  permissions?: { displayAddressOnInternet?: string };
};

type ApiResponse = {
  count: number;
  numPages: number;
  page: number;
  listings: Listing[];
  statistics?: { listPrice: { min: number; max: number } };
};

type Tab = "market" | "ours";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function formatAddress(a: Listing["address"]) {
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = a.unitNumber ? ` #${a.unitNumber}` : "";
  return `${street}${unit}`;
}

function getImageUrl(images: string[]) {
  if (!images?.length) return null;
  const path = images[0];
  if (path.startsWith("http")) return path;
  return CDN + path;
}

const STATUS_FILTERS = [
  { label: "Active", value: "A" },
  { label: "Sold", value: "U" },
];

const COUNTY_OPTIONS = [
  { label: "Pierce County", value: "Pierce" },
  { label: "King County", value: "King" },
];

const PINNED_UNDISCLOSED = ["NWM2448909", "NWM2237560", "NWM2291535"];

type MarketStats = {
  county: string;
  active: {
    available: { mth: Record<string, number> };
    new: { count: number; mth: Record<string, { count: number }> };
  } | null;
  sold: {
    soldPrice: { med: number; sum: number; mth: Record<string, { med: number; sum: number; count: number }> };
    daysOnMarket: { avg: number; mth: Record<string, { avg: number; count: number }> };
    closed: { count: number; mth: Record<string, { count: number }> };
  } | null;
};

function fmtCompact(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function recentMonths(mth: Record<string, unknown> | undefined, count: number): string[] {
  if (!mth) return [];
  return Object.keys(mth).sort().slice(-count);
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function ListingCard({ listing }: { listing: Listing }) {
  const img = getImageUrl(listing.images);
  const addr = listing.address;
  const det = listing.details;
  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = showAddress ? formatAddress(addr) : "Undisclosed";

  return (
    <Link
      href={`/listings/${listing.mlsNumber}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
    >
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
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium ${
            listing.status === "A" ? "bg-white/90 text-charcoal" : "bg-charcoal/80 text-white"
          }`}>
            {listing.status === "A" ? "Active" : listing.lastStatus || "Sold"}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
          <p className="font-serif text-[1.6rem] font-light leading-none text-white">
            {formatPrice(listing.listPrice)}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 font-serif text-[1.05rem] font-light leading-snug text-charcoal">{street}</h3>
        <p className="mb-3 text-[13px] text-charcoal/70">{addr.city}, {addr.state} {addr.zip}</p>
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
        <div className="mt-auto flex items-center justify-between border-t border-charcoal/10 pt-4">
          <span className="text-[11px] text-charcoal/80">MLS# {listing.mlsNumber}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/80 transition-colors duration-300 group-hover:text-charcoal">View →</span>
        </div>
        <MLSCardAttribution />
      </div>
    </Link>
  );
}

export default function ListingsPage() {
  const [tab, setTab] = useState<Tab>("market");
  const [listings, setListings] = useState<Listing[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("A");
  const [county, setCounty] = useState("Pierce");
  const [minBeds, setMinBeds] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dataRefreshedAt, setDataRefreshedAt] = useState<Date | null>(null);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (tab !== "market") { setStats(null); return; }
    setStatsLoading(true);
    fetch(`/api/statistics?county=${county}`)
      .then((r) => r.json())
      .then((data: MarketStats) => { setStats(data); setStatsLoading(false); })
      .catch(() => setStatsLoading(false));
  }, [tab, county]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ status, pageSize: "12" });
    if (tab === "market") {
      params.set("county", county);
      if (minBeds) params.set("minBeds", minBeds);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      const marketFetch = fetch(`/api/listings?${params}`).then((r) => r.json());

      // Only inject pinned undisclosed listings when viewing Active
      const pinnedFetches = status === "A"
        ? PINNED_UNDISCLOSED.map((mls) =>
            fetch(`/api/listings/${mls}`).then((r) => r.json()).catch(() => null)
          )
        : [];

      Promise.all([marketFetch, ...pinnedFetches])
        .then(([data, ...pinnedResults]) => {
          const market: Listing[] = (data as ApiResponse).listings || [];
          const pinned: Listing[] = pinnedResults
            .filter((p): p is Listing => p !== null && !p.error)
            .filter((p) => p.status === status)
            .filter((p) => !market.find((m) => m.mlsNumber === p.mlsNumber));
          setListings([...pinned, ...market]);
          setCount((data as ApiResponse).count || 0);
          setDataRefreshedAt(new Date());
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      params.set("agentOnly", "true");
      if (minBeds) params.set("minBeds", minBeds);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      fetch(`/api/listings?${params}`)
        .then((r) => r.json())
        .then((data: ApiResponse) => {
          setListings(data.listings || []);
          setCount(data.count || 0);
          setDataRefreshedAt(new Date());
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [tab, status, county, minBeds, minPrice, maxPrice]);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero + Controls */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Title row */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">
                  {tab === "market"
                    ? `${county} County, WA`
                    : "OnSite Real Estate Group"}
                </p>
                <h1 className="mb-6 font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
                  {tab === "market" ? "Market Search." : "Our Listings."}
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  {tab === "market"
                    ? "Browse current properties across Pierce & King County markets."
                    : "Properties listed by André Bohall & the OnSite Real Estate Group team."}
                </p>
              </div>
              <div className="shrink-0 text-right">
                {!loading && (
                  <p className="text-[13px] text-white/50">
                    <span className="text-white text-2xl font-serif font-light">{count.toLocaleString()}</span>
                    <br />properties found
                  </p>
                )}
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-10 border-b border-white/10 pb-0">
              <button
                onClick={() => { setTab("market"); setMinBeds(""); setMinPrice(""); setMaxPrice(""); }}
                className={`pb-4 px-1 text-[12px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 -mb-px ${
                  tab === "market"
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                Market Search
              </button>
              <button
                onClick={() => { setTab("ours"); setMinBeds(""); setMinPrice(""); setMaxPrice(""); }}
                className={`pb-4 px-1 ml-8 text-[12px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 -mb-px ${
                  tab === "ours"
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                Our Listings
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4">
              {/* Status */}
              <div className="flex gap-2">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setStatus(f.value)}
                    className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      status === f.value
                        ? "border-white bg-white text-charcoal"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* County — only shown on market tab */}
              {tab === "market" && (
                <div className="flex gap-2">
                  {COUNTY_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCounty(c.value)}
                      className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                        county === c.value
                          ? "border-white bg-white text-charcoal"
                          : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Min beds */}
              <select
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="">Any Beds</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>

              {/* Price */}
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="">Min Price</option>
                <option value="300000">$300k+</option>
                <option value="500000">$500k+</option>
                <option value="750000">$750k+</option>
                <option value="1000000">$1M+</option>
              </select>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="">Max Price</option>
                <option value="500000">Up to $500k</option>
                <option value="750000">Up to $750k</option>
                <option value="1000000">Up to $1M</option>
                <option value="1500000">Up to $1.5M</option>
              </select>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-charcoal/10" />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl font-light text-charcoal/70">No listings found.</p>
                <p className="mt-3 text-[14px] text-charcoal/60">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.mlsNumber} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Market Insights — below listing cards */}
        {tab === "market" && (
          <section className="bg-white py-16 sm:py-20 border-b border-charcoal/8">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light text-charcoal">
                  {county} County Residential Insights
                </h2>
                <p className="text-[13px] leading-relaxed text-charcoal bg-[#f0ede8] rounded-xl px-5 py-3 max-w-md sm:text-right">
                  Market statistics and visualizations are provided by{" "}
                  <a href="https://repliers.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-charcoal/70">Repliers.com</a>{" "}
                  and are based on NWMLS data as Distributed by MLS Grid.
                </p>
              </div>

              {statsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[130px] animate-pulse rounded-2xl bg-charcoal/5" />
                  ))}
                </div>
              ) : stats?.active || stats?.sold ? (() => {
                const soldMths = recentMonths(stats.sold?.soldPrice?.mth, 3);
                const newMths = recentMonths(stats.active?.new?.mth, 3);
                const closedMths = recentMonths(stats.sold?.closed?.mth, 3);
                const domMths = recentMonths(stats.sold?.daysOnMarket?.mth, 3);
                const availMths = recentMonths(stats.active?.available?.mth, 1);
                const latestAvail = availMths[availMths.length - 1];

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-1">Active Listings</p>
                      <p className="text-[2rem] font-serif font-light text-charcoal">
                        {latestAvail ? stats.active?.available?.mth?.[latestAvail] ?? "—" : "—"}
                        <span className="text-[13px] font-sans text-charcoal/70 ml-1">active listings</span>
                      </p>
                      {latestAvail && (
                        <p className="mt-1 text-[11px] text-charcoal/70">For {monthLabel(latestAvail)}</p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-1">Median Sold Price</p>
                      <p className="text-[2rem] font-serif font-light text-charcoal">
                        {stats.sold?.soldPrice?.med ? formatPrice(stats.sold.soldPrice.med) : "—"}
                      </p>
                      {soldMths.length > 0 && (
                        <p className="mt-1 text-[11px] text-charcoal/70">For {monthLabel(soldMths[soldMths.length - 1])}</p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-3">Sales Volume</p>
                      <div className="flex gap-6">
                        {soldMths.map((m) => (
                          <div key={m}>
                            <p className="text-[1.2rem] font-serif font-light text-charcoal">
                              {fmtCompact(stats.sold!.soldPrice.mth[m]?.sum ?? 0)}
                            </p>
                            <p className="text-[10px] text-charcoal/70">{monthLabel(m)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-3">New Listings</p>
                      <div className="flex gap-6">
                        {newMths.map((m) => (
                          <div key={m}>
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">
                              {stats.active!.new.mth[m]?.count ?? 0}
                            </p>
                            <p className="text-[10px] text-charcoal/70">{monthLabel(m)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-3">Residential Sold</p>
                      <div className="flex gap-6">
                        {closedMths.map((m) => (
                          <div key={m}>
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">
                              {stats.sold!.closed.mth[m]?.count ?? 0}
                            </p>
                            <p className="text-[10px] text-charcoal/70">{monthLabel(m)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-3">Days on Market</p>
                      <div className="flex gap-6">
                        {domMths.map((m) => (
                          <div key={m}>
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">
                              {stats.sold!.daysOnMarket.mth[m]?.avg ?? 0}
                            </p>
                            <p className="text-[10px] text-charcoal/70">{monthLabel(m)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })() : null}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Work With André</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Ready to Find<br />Your Next Home?
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  André Bohall — WA Managing Broker Lic. #25031564 — and the OnSite team are ready to help you buy, sell, or invest in Pierce County.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/free-home-evaluation"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Free Home Evaluation
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MLS compliance */}
        <section className="bg-white border-t border-charcoal/8 py-10">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png"
                alt="NWMLS Three Trees Logo"
                width={48}
                height={48}
                className="h-10 w-auto shrink-0 opacity-50"
              />
              <div className="space-y-2">
                <p className="text-[12px] text-charcoal font-medium">
                  Listing data provided by NWMLS as distributed by MLS Grid.{" "}
                  {dataRefreshedAt
                    ? `Data last refreshed: ${dataRefreshedAt.toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                        hour: "numeric", minute: "2-digit", timeZoneName: "short",
                      })}.`
                    : null}
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/70 max-w-4xl">
                  IDX information is provided exclusively for consumers&apos; personal noncommercial use, that it may not be
                  used for any purpose other than to identify prospective properties consumers may be interested in
                  purchasing, that the data is deemed reliable but is not guaranteed by MLS GRID, and that the use of
                  the MLS GRID Data may be subject to an end user license agreement prescribed by the Member
                  Participant&apos;s applicable MLS if any and as amended from time to time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
