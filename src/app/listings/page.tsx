"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import MLSCardAttribution from "@/components/MLSCardAttribution";

const ListingsMap = dynamic(() => import("@/components/ListingsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[640px] place-items-center rounded-3xl bg-charcoal/5">
      <p className="text-[12px] uppercase tracking-[0.25em] text-charcoal/75">Loading map…</p>
    </div>
  ),
});

const CDN = "https://cdn.repliers.io/";

type Listing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice: number | null;
  status: string;
  lastStatus: string;
  standardStatus?: string | null;
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

type StatusBadge = { label: string; tone: "active" | "pending" | "sold" };

// Reads RESO standardStatus directly (per Repliers' recommendation) and
// falls back to the binary status / lastStatus fields if standardStatus
// is missing for any reason.
function getStatusBadge(l: Pick<Listing, "status" | "lastStatus" | "standardStatus">): StatusBadge {
  const standard = (l.standardStatus || "").trim();
  const last = (l.lastStatus || "").trim();

  if (standard) {
    const lc = standard.toLowerCase();
    if (lc === "active") return { label: "Active", tone: "active" };
    if (lc === "closed") return { label: "Sold", tone: "sold" };
    if (lc === "pending" || lc === "active under contract") {
      return { label: standard, tone: "pending" };
    }
    // Canceled / Expired / Hold / Withdrawn / Coming Soon
    return { label: standard, tone: "sold" };
  }

  // Fallback (older / partial Repliers payloads).
  if (l.status === "U") {
    if (last === "Sld") return { label: "Sold", tone: "sold" };
    return { label: last || "Off-Market", tone: "sold" };
  }
  return { label: "Active", tone: "active" };
}

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
          {(() => {
            const badge = getStatusBadge(listing);
            const tone =
              badge.tone === "active"
                ? "bg-white/90 text-charcoal"
                : badge.tone === "pending"
                  ? "bg-amber-400/95 text-charcoal"
                  : "bg-charcoal/80 text-white";
            return (
              <span
                className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium ${tone}`}
              >
                {badge.label}
              </span>
            );
          })()}
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
        <p className="mb-3 text-[13px] text-charcoal/90">{addr.city}, {addr.state} {addr.zip}</p>
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
        {listing.office?.brokerageName && (
          <p className="mb-3 text-[11px] text-charcoal/80 italic not-italic">
            Listed by {listing.office.brokerageName}
          </p>
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
  const router = useRouter();
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
  const [mlsLookup, setMlsLookup] = useState("");
  const [stateFilter, setStateFilter] = useState("WA");
  const [totalDbCount, setTotalDbCount] = useState<number | null>(null);
  const [dataRefreshedAt, setDataRefreshedAt] = useState<Date | null>(null);

  function handleMlsLookup(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = mlsLookup.trim();
    if (!trimmed) return;
    router.push(`/listings/${encodeURIComponent(trimmed)}`);
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
  }, [status, city, stateFilter, propertyType, minBeds, minBaths, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      status,
      pageSize: viewMode === "map" ? "100" : "24",
      page: String(page),
      sortBy,
    });
    if (city) params.set("city", city);
    if (stateFilter) {
      params.set("state", stateFilter);
      if (stateFilter === "WA") params.set("boardId", "110");
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
  }, [status, city, stateFilter, propertyType, minBeds, minBaths, minPrice, maxPrice, sortBy, page, viewMode]);

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

              {stateFilter ? (
                <button
                  onClick={() => setStateFilter("")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
                  title="Click to search all states"
                >
                  {stateFilter}
                  <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round"/>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setStateFilter("WA")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/50 transition hover:border-white/40 hover:text-white/80"
                >
                  + State
                </button>
              )}

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[12px] tracking-wide text-white placeholder:text-white/80 focus:border-white/50 focus:outline-none"
              />

              <form onSubmit={handleMlsLookup} className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={mlsLookup}
                  onChange={(e) => setMlsLookup(e.target.value)}
                  placeholder="MLS #"
                  className="w-28 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[12px] tracking-wide text-white placeholder:text-white/80 focus:border-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!mlsLookup.trim()}
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
            {loading ? (
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
                {viewMode === "map" ? (
                  <ListingsMap listings={listings} />
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                      <ListingCard key={listing.mlsNumber} listing={listing} />
                    ))}
                  </div>
                )}

                {/* Pagination — list view only; map view loads up to 100 pins */}
                {viewMode === "list" && numPages > 1 && (
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
                <p className="text-[11px] leading-[1.8] text-charcoal/90 max-w-4xl">
                  Listings are provided courtesy of the Northwest Multiple Listing Service and may
                  be listed by brokerages other than OnSite Real Estate Group — attribution is
                  shown on each listing card.
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
