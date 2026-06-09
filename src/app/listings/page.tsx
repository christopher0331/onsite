"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ListingCard from "@/components/ListingCard";
import type { MapViewport } from "@/components/ListingsMap";
import { listingInBounds } from "@/lib/listings-api-params";

const MAP_MIN_ZOOM = 9;

const ListingsMap = dynamic(() => import("@/components/ListingsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[640px] place-items-center rounded-3xl bg-charcoal/5">
      <p className="text-[12px] uppercase tracking-[0.25em] text-charcoal/75">Loading map…</p>
    </div>
  ),
});

type Listing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice: number | null;
  status: string;
  lastStatus: string;
  standardStatus?: string | null;
  raw?: Record<string, unknown> | null;
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
  office?: { brokerageName?: string } | null;
};

type ApiResponse = {
  count: number;
  numPages: number;
  page: number;
  listings: Listing[];
  statistics?: { listPrice: { min: number; max: number } };
};

const STATUS_FILTERS = [
  { label: "All", value: "All" },
  { label: "Active", value: "A" },
  { label: "Pending", value: "P" },
  { label: "Sold", value: "U" },
];

const PROPERTY_TYPE_OPTIONS = [
  { label: "Any Type", value: "" },
  { label: "Residential", value: "Residential" },
  { label: "Condominium", value: "Condominium" },
  { label: "Manufactured", value: "Manufactured" },
  { label: "Land", value: "Land" },
  { label: "Multi-Family", value: "Multi-Family" },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "createdOnDesc" },
  { label: "Recently Updated", value: "updatedOnDesc" },
  { label: "Price: High to Low", value: "listPriceDesc" },
  { label: "Price: Low to High", value: "listPriceAsc" },
];

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [count, setCount] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("A");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdOnDesc");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mlsInput, setMlsInput] = useState("");
  const [mlsSearch, setMlsSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("WA");
  const [totalDbCount, setTotalDbCount] = useState<number | null>(null);
  const [dataRefreshedAt, setDataRefreshedAt] = useState<Date | null>(null);
  const [mapListings, setMapListings] = useState<Listing[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapStatusLine, setMapStatusLine] = useState("");

  const mapDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRequestIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cityFromUrl = params.get("city");
    const stateFromUrl = params.get("state");
    const statusFromUrl = params.get("status");
    if (cityFromUrl) setCity(cityFromUrl);
    if (stateFromUrl) setStateFilter(stateFromUrl);
    if (statusFromUrl && ["All", "A", "P", "U"].includes(statusFromUrl)) {
      setStatus(statusFromUrl);
    }
  }, []);

  function handleMlsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMlsSearch(mlsInput.trim());
    setPage(1);
  }

  function clearMlsSearch() {
    setMlsInput("");
    setMlsSearch("");
    setPage(1);
  }

  // Fetch total database count once on mount (no filters) to show in hero
  useEffect(() => {
    fetch("/api/listings?status=All&pageSize=1&page=1")
      .then((r) => r.json())
      .then((data: ApiResponse) => setTotalDbCount(data.count || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setPage(1);
  }, [status, city, stateFilter, mlsSearch, propertyType, minBeds, minBaths, minPrice, maxPrice, sortBy]);

  const handleMapViewport = useCallback(
    (viewport: MapViewport) => {
      if (viewMode !== "map") return;

      if (mapDebounceRef.current) clearTimeout(mapDebounceRef.current);

      mapDebounceRef.current = setTimeout(() => {
        void (async () => {
          const requestId = ++mapRequestIdRef.current;
          const { bounds, zoom } = viewport;
          const homeLabel = (n: number) => `${n.toLocaleString()} ${n === 1 ? "home" : "homes"}`;

          if (zoom < MAP_MIN_ZOOM) {
            setMapListings([]);
            setMapLoading(false);
            setMapStatusLine("Zoom in to search listings in this area");
            return;
          }

          setMapLoading(true);

          if (mlsSearch) {
            const params = new URLSearchParams({
              status: "All",
              pageSize: "1",
              page: "1",
              searchFields: "mlsNumber",
              search: mlsSearch,
            });
            if (stateFilter) params.set("state", stateFilter);
            const res = await fetch(`/api/listings?${params}`);
            const data = (await res.json()) as ApiResponse;
            if (requestId !== mapRequestIdRef.current) return;
            const rows = (data.listings || []).filter((l) => listingInBounds(l, bounds));
            setMapListings(rows);
            setMapLoading(false);
            setMapStatusLine(
              rows.length
                ? `1 MLS match in this area`
                : "MLS match is outside the current map view"
            );
            return;
          }

          // Query the visible viewport polygon directly so every listing in the
          // map area is returned, regardless of which city it sits in.
          const params = new URLSearchParams({
            status,
            north: String(bounds.north),
            south: String(bounds.south),
            east: String(bounds.east),
            west: String(bounds.west),
          });
          if (stateFilter) params.set("state", stateFilter);
          if (city) params.set("city", city);
          if (propertyType) params.set("type", propertyType);
          if (minBeds) params.set("minBeds", minBeds);
          if (minBaths) params.set("minBaths", minBaths);
          if (minPrice) params.set("minPrice", minPrice);
          if (maxPrice) params.set("maxPrice", maxPrice);

          const res = await fetch(`/api/listings/map?${params}`);
          if (requestId !== mapRequestIdRef.current) return;

          if (!res.ok) {
            setMapListings([]);
            setMapLoading(false);
            setMapStatusLine("Unable to load listings for this area");
            return;
          }

          const data = (await res.json()) as {
            listings: Listing[];
            inBoundsCount: number;
            areaTotal: number;
            truncated?: boolean;
          };

          setMapListings(data.listings || []);
          setMapLoading(false);

          if (data.truncated) {
            setMapStatusLine(
              `Showing ${homeLabel(data.listings.length)} · ${data.areaTotal.toLocaleString()} in view — zoom in for all`
            );
          } else {
            setMapStatusLine(`${homeLabel(data.inBoundsCount)} in view`);
          }
        })();
      }, 350);
    },
    [
      viewMode,
      mlsSearch,
      stateFilter,
      status,
      propertyType,
      minBeds,
      minBaths,
      minPrice,
      maxPrice,
      city,
    ]
  );

  useEffect(() => {
    return () => {
      if (mapDebounceRef.current) clearTimeout(mapDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (viewMode !== "list") return;

    setLoading(true);
    const params = new URLSearchParams({
      // When searching by MLS#, override status to All so sold/pending
      // listings are included regardless of the status tab selection.
      status: mlsSearch ? "All" : status,
      pageSize: "24",
      page: String(page),
      sortBy,
    });
    if (city) params.set("city", city);
    if (stateFilter) {
      params.set("state", stateFilter);
    }
    if (mlsSearch) {
      params.set("searchFields", "mlsNumber");
      params.set("search", mlsSearch);
    }
    if (propertyType) params.set("type", propertyType);
    if (minBeds) params.set("minBeds", minBeds);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    fetch(`/api/listings?${params}`)
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        let results = data.listings || [];
        if (minBaths) {
          const min = Number(minBaths);
          results = results.filter(
            (l) => (l.details.numBathrooms ?? 0) >= min
          );
        }
        setListings(results);
        setCount(data.count || 0);
        setNumPages(data.numPages || 1);
        setDataRefreshedAt(new Date());
        setLoading(false);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(() => setLoading(false));
  }, [status, city, stateFilter, mlsSearch, propertyType, minBeds, minBaths, minPrice, maxPrice, sortBy, page, viewMode]);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero + Controls */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-10">
              <div>
                <h1 className="mb-6 font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
                  Search Homes.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Search the full MLS database. Filter by location, price, beds, and more.
                </p>
                <Link
                  href="/service-areas"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/75 hover:text-white transition-colors"
                >
                  Explore Service Areas
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="shrink-0 text-right">
                {totalDbCount !== null && (
                  <p className="text-[13px] text-white/60">
                    <span className="text-white text-3xl font-serif font-light">{totalDbCount.toLocaleString()}+</span>
                    <br />listings in the database
                  </p>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-wrap gap-2">
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

              <div className="relative inline-flex items-center">
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className={`rounded-full border px-5 py-2.5 pr-8 text-[11px] uppercase tracking-[0.2em] bg-transparent focus:outline-none appearance-none cursor-pointer transition-all duration-300 ${
                    stateFilter
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  <option value="" className="bg-[#1a1a18] text-white">All States</option>
                  <option value="WA" className="bg-[#1a1a18] text-white">WA</option>
                  <option value="OR" className="bg-[#1a1a18] text-white">OR</option>
                  <option value="CA" className="bg-[#1a1a18] text-white">CA</option>
                  <option value="ID" className="bg-[#1a1a18] text-white">ID</option>
                  <option value="MT" className="bg-[#1a1a18] text-white">MT</option>
                  <option value="AZ" className="bg-[#1a1a18] text-white">AZ</option>
                  <option value="NV" className="bg-[#1a1a18] text-white">NV</option>
                  <option value="CO" className="bg-[#1a1a18] text-white">CO</option>
                  <option value="TX" className="bg-[#1a1a18] text-white">TX</option>
                  <option value="FL" className="bg-[#1a1a18] text-white">FL</option>
                  <option value="NY" className="bg-[#1a1a18] text-white">NY</option>
                  <option value="NC" className="bg-[#1a1a18] text-white">NC</option>
                </select>
                <svg className="pointer-events-none absolute right-3 w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[12px] tracking-wide text-white placeholder:text-white/80 focus:border-white/50 focus:outline-none"
              />

              <form onSubmit={handleMlsSubmit} className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={mlsInput}
                    onChange={(e) => setMlsInput(e.target.value)}
                    placeholder="MLS #"
                    className="w-32 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[12px] tracking-wide text-white placeholder:text-white/80 focus:border-white/50 focus:outline-none"
                  />
                  {mlsSearch && (
                    <button
                      type="button"
                      onClick={clearMlsSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!mlsInput.trim()}
                  className="rounded-full border border-white/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Go
                </button>
              </form>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                {PROPERTY_TYPE_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-charcoal text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-charcoal text-white">Any Beds</option>
                <option value="1" className="bg-charcoal text-white">1+ Beds</option>
                <option value="2" className="bg-charcoal text-white">2+ Beds</option>
                <option value="3" className="bg-charcoal text-white">3+ Beds</option>
                <option value="4" className="bg-charcoal text-white">4+ Beds</option>
                <option value="5" className="bg-charcoal text-white">5+ Beds</option>
              </select>

              <select
                value={minBaths}
                onChange={(e) => setMinBaths(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-charcoal text-white">Any Baths</option>
                <option value="1" className="bg-charcoal text-white">1+ Baths</option>
                <option value="2" className="bg-charcoal text-white">2+ Baths</option>
                <option value="3" className="bg-charcoal text-white">3+ Baths</option>
                <option value="4" className="bg-charcoal text-white">4+ Baths</option>
              </select>

              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-charcoal text-white">Min Price</option>
                <option value="300000" className="bg-charcoal text-white">$300k+</option>
                <option value="500000" className="bg-charcoal text-white">$500k+</option>
                <option value="750000" className="bg-charcoal text-white">$750k+</option>
                <option value="1000000" className="bg-charcoal text-white">$1M+</option>
                <option value="1500000" className="bg-charcoal text-white">$1.5M+</option>
              </select>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-charcoal text-white">Max Price</option>
                <option value="500000" className="bg-charcoal text-white">Up to $500k</option>
                <option value="750000" className="bg-charcoal text-white">Up to $750k</option>
                <option value="1000000" className="bg-charcoal text-white">Up to $1M</option>
                <option value="1500000" className="bg-charcoal text-white">Up to $1.5M</option>
                <option value="2500000" className="bg-charcoal text-white">Up to $2.5M</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/60 focus:border-white/40 focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-charcoal text-white"
                  >
                    Sort: {opt.label}
                  </option>
                ))}
              </select>

              {(city ||
                mlsSearch ||
                !stateFilter ||
                propertyType ||
                minBeds ||
                minBaths ||
                minPrice ||
                maxPrice ||
                sortBy !== "createdOnDesc") && (
                <button
                  onClick={() => {
                    setCity("");
                    setMlsInput("");
                    setMlsSearch("");
                    setStateFilter("WA");
                    setPropertyType("");
                    setMinBeds("");
                    setMinBaths("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSortBy("createdOnDesc");
                  }}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>

            {/* View-mode toggle */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/80">View</span>
              <div className="inline-flex rounded-full border border-white/15 p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition ${
                    viewMode === "list"
                      ? "bg-white text-charcoal"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`rounded-full px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition ${
                    viewMode === "map"
                      ? "bg-white text-charcoal"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {viewMode === "map" ? (
              <ListingsMap
                listings={mapListings}
                onViewportChange={handleMapViewport}
                loading={mapLoading}
                statusLine={mapStatusLine}
              />
            ) : loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-charcoal/10" />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl font-light text-charcoal/90">No listings found.</p>
                <p className="mt-3 text-[14px] text-charcoal/80">Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {listings.map((listing) => (
                    <ListingCard key={listing.mlsNumber} listing={listing} />
                  ))}
                </div>

                {numPages > 1 && (
                  <div className="mt-14 flex items-center justify-center gap-3">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded-full border border-charcoal/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal transition hover:border-charcoal/50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <span className="text-[12px] text-charcoal/80 px-4">
                      {page} / {numPages}
                    </span>
                    <button
                      disabled={page >= numPages}
                      onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                      className="rounded-full border border-charcoal/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal transition hover:border-charcoal/50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

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
                  André Bohall — WA Managing Broker Lic. #25031564 — and the OnSite team are ready to help you buy, sell, or invest across Washington.
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
              {stateFilter === "WA" && (
                <Image
                  src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png"
                  alt="NWMLS Three Trees Logo"
                  width={48}
                  height={48}
                  className="h-10 w-auto shrink-0 opacity-50"
                />
              )}
              <div className="space-y-2">
                <p className="text-[12px] text-charcoal font-medium">
                  {stateFilter === "WA"
                    ? "Listing data provided by NWMLS as distributed by MLS Grid."
                    : "Listing data provided by MLS Grid."}{" "}
                  {dataRefreshedAt
                    ? `Data last refreshed: ${dataRefreshedAt.toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                        hour: "numeric", minute: "2-digit", timeZoneName: "short",
                      })}.`
                    : null}
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/90 max-w-4xl">
                  {stateFilter === "WA"
                    ? "Listings are provided courtesy of the Northwest Multiple Listing Service and may be listed by brokerages other than OnSite Real Estate Group — attribution is shown on each listing card."
                    : "Listings are provided via MLS Grid and may be listed by brokerages other than OnSite Real Estate Group — attribution is shown on each listing card."}
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/90 max-w-4xl">
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
