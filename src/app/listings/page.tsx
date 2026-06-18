"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ListingCard from "@/components/ListingCard";
import AiSearchPanel from "@/components/AiSearchPanel";
import FilterPopover from "@/components/FilterPopover";
import Modal from "@/components/Modal";
import type { MapViewport, MapFocus } from "@/components/ListingsMap";
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

const HOME_TYPE_OPTIONS = [
  { label: "House", value: "House" },
  { label: "Townhouse", value: "Townhouse" },
  { label: "Condo", value: "Condo" },
  { label: "Land", value: "Land" },
  { label: "Multi-family", value: "Multi-family" },
  { label: "Mobile", value: "Mobile" },
  { label: "Manufactured On Land", value: "Manufactured On Land" },
  { label: "Rental", value: "Rental" },
  { label: "Commercial / Industrial", value: "Commercial / Industrial" },
  { label: "Boat Slip", value: "Boat Slip" },
  { label: "Business Opportunity", value: "Business Opportunity" },
  { label: "Other", value: "Other" },
];

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [count, setCount] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("A");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");
  const [maxBaths, setMaxBaths] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSqft, setMinSqft] = useState("");
  const [maxSqft, setMaxSqft] = useState("");
  const [minYearBuilt, setMinYearBuilt] = useState("");
  const [maxYearBuilt, setMaxYearBuilt] = useState("");
  const [minLotSize, setMinLotSize] = useState("");
  const [maxLotSize, setMaxLotSize] = useState("");
  const [garageSpots, setGarageSpots] = useState("Any");
  const [homeFeatures, setHomeFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdOnDesc");
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mlsInput, setMlsInput] = useState("");
  const [mlsSearch, setMlsSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("WA");
  const [totalDbCount, setTotalDbCount] = useState<number | null>(null);
  const [dataRefreshedAt, setDataRefreshedAt] = useState<Date | null>(null);
  const [mapListings, setMapListings] = useState<Listing[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapStatusLine, setMapStatusLine] = useState("");
  const [mapFocus, setMapFocus] = useState<MapFocus | null>(null);
  const [filtersAppliedAt, setFiltersAppliedAt] = useState(0);
  const [pendingApplyFeedback, setPendingApplyFeedback] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState<string | null>(null);

  const mapDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRequestIdRef = useRef(0);
  const lastViewportRef = useRef<MapViewport | null>(null);
  const resultsSectionRef = useRef<HTMLElement | null>(null);

  // Geocode a typed place (city / ZIP / neighborhood) and recenter the map on
  // it. Returns true when the map was recentered (which triggers a refetch via
  // the resulting moveend). Powered by the server-side Google Maps key.
  const focusMapOnPlace = useCallback(
    async (place: string): Promise<boolean> => {
      try {
        const params = new URLSearchParams({ q: place });
        if (stateFilter) params.set("state", stateFilter);
        const res = await fetch(`/api/geocode?${params}`);
        if (!res.ok) return false;
        const data = (await res.json()) as {
          found?: boolean;
          center?: { lat: number; lng: number };
          types?: string[];
        };
        if (!data.found || !data.center) return false;
        const zoom = data.types?.includes("postal_code")
          ? 13
          : data.types?.includes("neighborhood")
            ? 14
            : 12;
        setMapFocus({ lat: data.center.lat, lng: data.center.lng, zoom, nonce: Date.now() });
        return true;
      } catch {
        return false;
      }
    },
    [stateFilter]
  );

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

  // In map mode the map shows its own progress/status banner, so we skip the
  // hero "Applying filters…" feedback (which is only cleared by the list-view
  // fetch and would otherwise hang forever on the map).
  function markFiltersApplied() {
    setPage(1);
    setFiltersAppliedAt((v) => v + 1);
    if (viewMode === "map") {
      setPendingApplyFeedback(false);
      setApplyFeedback(null);
      // The map has its own status banner instead of the "homes found" hero
      // feedback, so scroll down to the results so the user sees the updated map.
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      setPendingApplyFeedback(true);
      setApplyFeedback("Applying filters…");
    }
  }

  function handleMlsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMlsSearch(mlsInput.trim());
    markFiltersApplied();
  }

  function clearMlsSearch() {
    setMlsInput("");
    setMlsSearch("");
    markFiltersApplied();
  }

  function applyRegularFilters(closeModal = false) {
    markFiltersApplied();
    if (closeModal) setIsMoreFiltersOpen(false);
  }

  // Fetch total database count once on mount (no filters) to show in hero
  useEffect(() => {
    fetch("/api/listings?status=All&pageSize=1&page=1")
      .then((r) => r.json())
      .then((data: ApiResponse) => setTotalDbCount(data.count || null))
      .catch(() => {});
  }, []);

  // Filters are applied explicitly via the "Go"/"Apply Filters" action.

  const handleMapViewport = useCallback(
    (viewport: MapViewport) => {
      if (viewMode !== "map") return;

      // Remember the latest viewport so we can refetch in place when filters
      // change without the user panning/zooming.
      lastViewportRef.current = viewport;

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
          if (propertyType.length > 0) {
            propertyType.forEach((t) => params.append("type", t));
          }
          if (minBeds) params.set("minBeds", minBeds);
          if (maxBeds) params.set("maxBeds", maxBeds);
          if (minBaths) params.set("minBaths", minBaths);
          if (maxBaths) params.set("maxBaths", maxBaths);
          if (minPrice) params.set("minPrice", minPrice);
          if (maxPrice) params.set("maxPrice", maxPrice);
          if (minSqft) params.set("minSqft", minSqft);
          if (maxSqft) params.set("maxSqft", maxSqft);
          if (minYearBuilt) params.set("minYearBuilt", minYearBuilt);
          if (maxYearBuilt) params.set("maxYearBuilt", maxYearBuilt);
          if (minLotSize) params.set("minLotSize", minLotSize);
          if (maxLotSize) params.set("maxLotSize", maxLotSize);
          if (garageSpots) params.set("garageSpots", garageSpots);
          if (homeFeatures.length > 0) {
            homeFeatures.forEach((f) => params.append("features", f));
          }

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
      maxBeds,
      minBaths,
      maxBaths,
      minPrice,
      maxPrice,
      minSqft,
      maxSqft,
      minYearBuilt,
      maxYearBuilt,
      minLotSize,
      maxLotSize,
      garageSpots,
      homeFeatures,
      city,
    ]
  );

  useEffect(() => {
    return () => {
      if (mapDebounceRef.current) clearTimeout(mapDebounceRef.current);
    };
  }, []);

  // Keep the map in sync when filters are applied (Go/Apply) or when switching
  // into map view. Recenter on the typed city/ZIP (which refetches via the
  // resulting move); otherwise refetch the current viewport in place.
  useEffect(() => {
    if (viewMode !== "map") return;
    let cancelled = false;
    void (async () => {
      const place = city.trim();
      const recentered = place ? await focusMapOnPlace(place) : false;
      if (cancelled || recentered) return;
      if (lastViewportRef.current) handleMapViewport(lastViewportRef.current);
    })();
    return () => {
      cancelled = true;
    };
    // handleMapViewport/focusMapOnPlace are stable enough; re-run on apply +
    // view switch only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersAppliedAt, viewMode]);

  useEffect(() => {
    if (viewMode !== "list") return;

    let cancelled = false;
    setLoading(true);
    const effectiveStatus = mlsSearch ? "All" : status;
    const params = new URLSearchParams({
      // When searching by MLS#, override status to All so sold/pending
      // listings are included regardless of the status tab selection.
      status: effectiveStatus,
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
    if (propertyType.length > 0) {
      propertyType.forEach((t) => params.append("type", t));
    }
    if (minBeds) params.set("minBeds", minBeds);
    if (maxBeds) params.set("maxBeds", maxBeds);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minBaths) params.set("minBaths", minBaths);
    if (maxBaths) params.set("maxBaths", maxBaths);
    if (minSqft) params.set("minSqft", minSqft);
    if (maxSqft) params.set("maxSqft", maxSqft);
    if (minYearBuilt) params.set("minYearBuilt", minYearBuilt);
    if (maxYearBuilt) params.set("maxYearBuilt", maxYearBuilt);
    if (minLotSize) params.set("minLotSize", minLotSize);
    if (maxLotSize) params.set("maxLotSize", maxLotSize);
    if (garageSpots) params.set("garageSpots", garageSpots);
    if (homeFeatures.length > 0) {
      homeFeatures.forEach((f) => params.append("features", f));
    }

    // On the default first-page browse (no search/filters applied), lead with
    // OnSite's own inventory — lead agents first (André, then Cindie), then
    // Timber Real Estate — matching the priority order used on /our-listings.
    const isDefaultBrowse =
      page === 1 &&
      !mlsSearch &&
      !city &&
      propertyType.length === 0 &&
      !minBeds && !maxBeds &&
      !minBaths && !maxBaths &&
      !minPrice && !maxPrice &&
      !minSqft && !maxSqft &&
      !minYearBuilt && !maxYearBuilt &&
      !minLotSize && !maxLotSize &&
      garageSpots === "Any" &&
      homeFeatures.length === 0;

    const ownerParams = new URLSearchParams({
      status: effectiveStatus,
      scope: "all",
      page: "1",
      pageSize: "48",
    });
    if (stateFilter) ownerParams.set("state", stateFilter);

    (async () => {
      try {
        const [data, ownerData] = await Promise.all([
          fetch(`/api/listings?${params}`).then((r) => r.json() as Promise<ApiResponse>),
          isDefaultBrowse
            ? fetch(`/api/listings/ours?${ownerParams}`)
                .then((r) => r.json() as Promise<{ listings?: Listing[] }>)
                .catch(() => null)
            : Promise.resolve(null),
        ]);
        if (cancelled) return;

        let results = data.listings || [];
        if (minBaths) {
          const min = Number(minBaths);
          results = results.filter((l) => (l.details.numBathrooms ?? 0) >= min);
        }

        const owner = ownerData?.listings ?? [];
        if (owner.length) {
          const ownerIds = new Set(owner.map((l) => l.mlsNumber));
          results = [...owner, ...results.filter((l) => !ownerIds.has(l.mlsNumber))];
        }

        setListings(results);
        setCount(data.count || 0);
        setNumPages(data.numPages || 1);
        setDataRefreshedAt(new Date());
        if (pendingApplyFeedback) {
          setApplyFeedback(`${(data.count || 0).toLocaleString()} ${(data.count || 0) === 1 ? "home" : "homes"} found`);
          setTimeout(() => {
            resultsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 60);
          setPendingApplyFeedback(false);
        }
        setLoading(false);
      } catch {
        if (!cancelled) {
          if (pendingApplyFeedback) {
            setApplyFeedback("Unable to load homes. Please try again.");
            setPendingApplyFeedback(false);
          }
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filtersAppliedAt, page, viewMode, pendingApplyFeedback]);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero + Controls */}
        <section className="relative overflow-visible bg-[#13211a] pt-40 pb-24 sm:pt-52 sm:pb-32">
          {/* Brand-green ambient glow so the hero isn't flat black/white */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 12% 0%, rgba(61,175,61,0.28) 0%, rgba(61,175,61,0.06) 38%, rgba(19,33,26,0) 70%), radial-gradient(50% 70% at 100% 100%, rgba(61,175,61,0.16) 0%, rgba(19,33,26,0) 60%)",
            }}
          />
          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-10">
              <div>
                <h1 className="mb-6 font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
                  Search <span className="text-[#3daf3d]">Homes.</span>
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Search the full MLS database. Filter by location, price, beds, and more.
                </p>
                <Link
                  href="/service-areas"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/75 hover:text-[#3daf3d] transition-colors"
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
                    <span className="text-[#3daf3d] text-3xl font-serif font-light">{totalDbCount.toLocaleString()}+</span>
                    <br />listings in the database
                  </p>
                )}
              </div>
            </div>

            {/* Redfin-style Filters UI */}
            <div className="relative z-40 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-3">
                      {/* Search Bar */}
                      <div className="relative flex items-center bg-white/5 rounded-full border border-white/20 overflow-hidden transition-all focus-within:bg-white focus-within:border-white group">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City, Neighborhood, Zip"
                          className="w-48 sm:w-64 bg-transparent px-5 py-2.5 text-[13px] text-white placeholder:text-white/50 focus:text-charcoal focus:placeholder:text-charcoal/50 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/50 focus:outline-none"
                        />
                        <div className="w-px h-6 bg-white/20 group-focus-within:bg-charcoal/10" />
                        <form onSubmit={handleMlsSubmit} className="m-0 p-0 relative">
                          <input
                            type="text"
                            value={mlsInput}
                            onChange={(e) => setMlsInput(e.target.value)}
                            placeholder="MLS #"
                            className="w-32 bg-transparent px-5 py-2.5 pr-12 text-[13px] text-white placeholder:text-white/50 focus:text-charcoal focus:placeholder:text-charcoal/50 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/50 focus:outline-none"
                          />
                          {mlsInput.trim() !== mlsSearch && mlsInput.trim().length > 0 ? (
                            <button
                              type="submit"
                              className="absolute right-1 top-1 bottom-1 rounded-full bg-[#3daf3d] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#3daf3d]/90 transition"
                            >
                              Go
                            </button>
                          ) : mlsSearch ? (
                            <button
                              type="button"
                              onClick={clearMlsSearch}
                              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white group-focus-within:text-charcoal/40 group-focus-within:hover:bg-charcoal/5 group-focus-within:hover:text-charcoal transition"
                            >
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                              </svg>
                            </button>
                          ) : null}
                        </form>
                      </div>
              
                      {/* Status Popover */}
                      <FilterPopover label={status === "A" ? "For Sale" : status === "P" ? "Pending" : status === "U" ? "Sold" : "All Status"} isActive={status !== "A"}>
                        <div className="flex flex-col gap-2">
                          {STATUS_FILTERS.map((f) => (
                            <label key={f.value} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-charcoal/5 rounded-lg">
                              <input
                                type="radio"
                                name="status"
                                value={f.value}
                                checked={status === f.value}
                                onChange={() => setStatus(f.value)}
                                className="w-4 h-4 text-[#3daf3d] border-charcoal/20 focus:ring-[#3daf3d] cursor-pointer"
                              />
                              <span className="text-[14px] text-charcoal">{f.label}</span>
                            </label>
                          ))}
                        </div>
                      </FilterPopover>
              
                      {/* Price Popover */}
                      <FilterPopover label={minPrice || maxPrice ? `${minPrice ? '$'+(Number(minPrice)/1000)+'k' : '$0'} - ${maxPrice ? '$'+(Number(maxPrice)/1000)+'k' : 'Any'}` : "Price"} isActive={!!minPrice || !!maxPrice}>
                        <div className="flex items-center gap-4 p-2">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] uppercase tracking-wider text-charcoal/50">Minimum</label>
                            <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-32 border border-charcoal/20 rounded-lg p-2 text-[14px] focus:outline-none focus:border-charcoal">
                              <option value="">No Min</option>
                              <option value="300000">$300k</option>
                              <option value="500000">$500k</option>
                              <option value="750000">$750k</option>
                              <option value="1000000">$1M</option>
                              <option value="1500000">$1.5M</option>
                            </select>
                          </div>
                          <span className="mt-5 text-charcoal/30">-</span>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] uppercase tracking-wider text-charcoal/50">Maximum</label>
                            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-32 border border-charcoal/20 rounded-lg p-2 text-[14px] focus:outline-none focus:border-charcoal">
                              <option value="">No Max</option>
                              <option value="500000">$500k</option>
                              <option value="750000">$750k</option>
                              <option value="1000000">$1M</option>
                              <option value="1500000">$1.5M</option>
                              <option value="2500000">$2.5M</option>
                            </select>
                          </div>
                        </div>
                      </FilterPopover>
              
                      {/* Beds & Baths Popover */}
                      <FilterPopover label={minBeds || minBaths ? `${minBeds ? minBeds+'+ Beds' : 'Any Beds'}, ${minBaths ? minBaths+'+ Baths' : 'Any Baths'}` : "Beds & Baths"} isActive={!!minBeds || !!minBaths}>
                        <div className="flex flex-col gap-6 p-2 min-w-[300px]">
                          <div>
                            <p className="text-[14px] font-medium text-charcoal mb-3">Bedrooms</p>
                            <div className="flex rounded-lg border border-charcoal/20 overflow-hidden">
                              {["", "1", "2", "3", "4", "5"].map((val, idx) => (
                                <button
                                  key={val}
                                  onClick={() => setMinBeds(val)}
                                  className={`flex-1 py-2 text-[14px] text-center border-r border-charcoal/20 last:border-r-0 transition ${
                                    minBeds === val ? "bg-[#3daf3d]/10 text-[#3daf3d] font-bold" : "bg-white text-charcoal hover:bg-charcoal/5"
                                  }`}
                                >
                                  {val === "" ? "Any" : `${val}+`}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-charcoal mb-3">Bathrooms</p>
                            <div className="flex rounded-lg border border-charcoal/20 overflow-hidden">
                              {["", "1", "2", "3", "4"].map((val, idx) => (
                                <button
                                  key={val}
                                  onClick={() => setMinBaths(val)}
                                  className={`flex-1 py-2 text-[14px] text-center border-r border-charcoal/20 last:border-r-0 transition ${
                                    minBaths === val ? "bg-[#3daf3d]/10 text-[#3daf3d] font-bold" : "bg-white text-charcoal hover:bg-charcoal/5"
                                  }`}
                                >
                                  {val === "" ? "Any" : `${val}+`}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </FilterPopover>
              
                      {/* Home Type Popover */}
                      <FilterPopover label={propertyType.length > 0 ? `${propertyType.length} Selected` : "Home Type"} isActive={propertyType.length > 0}>
                        <div className="grid grid-cols-2 gap-3 p-2 min-w-[320px]">
                          {HOME_TYPE_OPTIONS.map((opt) => (
                            <label key={opt.value} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition ${
                              propertyType.includes(opt.value) ? "border-[#3daf3d] bg-[#3daf3d]/5 text-[#3daf3d]" : "border-charcoal/10 bg-white hover:border-charcoal/30 text-charcoal"
                            }`}>
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={propertyType.includes(opt.value)}
                                onChange={(e) => {
                                  if (e.target.checked) setPropertyType([...propertyType, opt.value]);
                                  else setPropertyType(propertyType.filter((t) => t !== opt.value));
                                }}
                              />
                              <span className="text-[14px] font-medium currentColor">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </FilterPopover>
              
                      {/* All Filters Button */}
                      <button
                        onClick={() => setIsMoreFiltersOpen(true)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-wide transition-all ${
                          isMoreFiltersOpen
                            ? "border-[#3daf3d] bg-[#3daf3d]/20 text-[#3daf3d]"
                            : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                        All Filters
                      </button>
                      
                      {/* State dropdown, small */}
                      <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[12px] font-medium text-white focus:outline-none transition-all hover:bg-white/10 hover:border-white/40 appearance-none"
                      >
                        <option value="" className="text-charcoal bg-white">All States</option>
                        <option value="WA" className="text-charcoal bg-white">WA</option>
                        <option value="OR" className="text-charcoal bg-white">OR</option>
                        <option value="CA" className="text-charcoal bg-white">CA</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => applyRegularFilters(false)}
                        className="rounded-full bg-[#3daf3d] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3daf3d]/90"
                      >
                        Go
                      </button>
                    </div>
              
                    <Modal
                      isOpen={isMoreFiltersOpen}
                      onClose={() => setIsMoreFiltersOpen(false)}
                      title="All Filters"
                      footer={
                        <div className="flex justify-between items-center w-full">
                          <button
                            onClick={() => {
                              setCity(""); setMlsInput(""); setMlsSearch(""); setStateFilter("WA");
                              setPropertyType([]); setMinBeds(""); setMaxBeds(""); setMinBaths(""); setMaxBaths("");
                              setMinPrice(""); setMaxPrice(""); setMinSqft(""); setMaxSqft(""); setMinYearBuilt("");
                              setMaxYearBuilt(""); setMinLotSize(""); setMaxLotSize(""); setGarageSpots("Any");
                              setHomeFeatures([]); setSortBy("createdOnDesc");
                              setPage(1);
                              setFiltersAppliedAt((v) => v + 1);
                            }}
                            className="text-[14px] text-charcoal/60 hover:text-charcoal font-medium underline underline-offset-4"
                          >
                            Clear All
                          </button>
                          <button
                            onClick={() => applyRegularFilters(true)}
                            className="rounded-full bg-[#3daf3d] px-8 py-3 text-[14px] font-bold text-white hover:bg-[#3daf3d]/90 transition"
                          >
                            Apply Filters
                          </button>
                        </div>
                      }
                    >
                      <div className="flex flex-col gap-10">
                        {/* Home Type */}
                        <section>
                          <h3 className="text-[18px] font-bold text-charcoal mb-5">Home type</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {HOME_TYPE_OPTIONS.map((opt) => (
                              <label
                                key={opt.value}
                                className={`flex min-h-[64px] items-center justify-center rounded-xl border px-3 text-center text-[14px] font-medium cursor-pointer transition ${
                                  propertyType.includes(opt.value)
                                    ? "border-[#3daf3d] bg-[#3daf3d]/10 text-[#3daf3d]"
                                    : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/35"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={propertyType.includes(opt.value)}
                                  onChange={(e) => {
                                    if (e.target.checked) setPropertyType([...propertyType, opt.value]);
                                    else setPropertyType(propertyType.filter((t) => t !== opt.value));
                                  }}
                                />
                                {opt.label}
                              </label>
                            ))}
                          </div>
                        </section>

                        <hr className="border-charcoal/10" />

                        {/* Property Details */}
                        <section>
                          <h3 className="text-[18px] font-bold text-charcoal mb-5">Property details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-[13px] font-medium text-charcoal">Square feet</label>
                              <div className="flex items-center gap-2">
                                <input type="number" min={1} placeholder="No min" value={minSqft} onChange={e => setMinSqft(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                                <span className="text-charcoal/30">-</span>
                                <input type="number" min={1} placeholder="No max" value={maxSqft} onChange={e => setMaxSqft(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[13px] font-medium text-charcoal">Lot size (sqft)</label>
                              <div className="flex items-center gap-2">
                                <input type="number" min={1} placeholder="No min" value={minLotSize} onChange={e => setMinLotSize(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                                <span className="text-charcoal/30">-</span>
                                <input type="number" min={1} placeholder="No max" value={maxLotSize} onChange={e => setMaxLotSize(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[13px] font-medium text-charcoal">Year built</label>
                              <div className="flex items-center gap-2">
                                <input type="number" min={1800} max={2100} placeholder="No min" value={minYearBuilt} onChange={e => setMinYearBuilt(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                                <span className="text-charcoal/30">-</span>
                                <input type="number" min={1800} max={2100} placeholder="No max" value={maxYearBuilt} onChange={e => setMaxYearBuilt(e.target.value)} className="w-full border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal" />
                              </div>
                            </div>
                          </div>
                        </section>
              
                        <hr className="border-charcoal/10" />
              
                        {/* Home Features */}
                        <section>
                          <h3 className="text-[18px] font-bold text-charcoal mb-5">Home features</h3>
                          <div className="mb-6">
                            <label className="text-[13px] font-medium text-charcoal block mb-2">Garage spots</label>
                            <div className="inline-flex rounded-lg border border-charcoal/20 overflow-hidden">
                              {["Any", "1+", "2+", "3+", "4+", "5+"].map((val) => (
                                <button
                                  key={val}
                                  onClick={() => setGarageSpots(val)}
                                  className={`px-4 py-2 text-[14px] text-center border-r border-charcoal/20 last:border-r-0 transition ${
                                    garageSpots === val ? "bg-[#3daf3d]/10 text-[#3daf3d] font-bold" : "bg-white text-charcoal hover:bg-charcoal/5"
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
              
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              "Air conditioning", "Waterfront", "Has a view", "Fireplace", "Fixer / opportunity",
                              "ADU / MIL / multigen", "Elevator", "Basement", "Washer/dryer hookup", "Pets allowed",
                              "Primary on main", "RV parking / storage", "Green home", "Accessible home"
                            ].map(feat => (
                              <label key={feat} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  homeFeatures.includes(feat) ? "bg-[#3daf3d] border-[#3daf3d] text-white" : "border-charcoal/30 group-hover:border-[#3daf3d]"
                                }`}>
                                  {homeFeatures.includes(feat) && (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={homeFeatures.includes(feat)}
                                  onChange={(e) => {
                                    if (e.target.checked) setHomeFeatures([...homeFeatures, feat]);
                                    else setHomeFeatures(homeFeatures.filter(f => f !== feat));
                                  }}
                                />
                                <span className="text-[15px] text-charcoal">{feat}</span>
                              </label>
                            ))}
                          </div>
                        </section>
              
                        <hr className="border-charcoal/10" />
              
                        {/* Sort */}
                        <section>
                          <h3 className="text-[18px] font-bold text-charcoal mb-5">Sort By</h3>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full max-w-xs border border-charcoal/20 rounded-lg p-2.5 text-[14px] focus:outline-none focus:border-charcoal bg-white"
                          >
                            {SORT_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </section>
                      </div>
                    </Modal>
            </div>

            {applyFeedback && (
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[#3daf3d]">
                {applyFeedback}
              </p>
            )}

            {/* View-mode toggle */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/80">View</span>
              <div className="inline-flex rounded-full border border-white/15 p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition ${
                    viewMode === "list"
                      ? "bg-[#3daf3d] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`rounded-full px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition ${
                    viewMode === "map"
                      ? "bg-[#3daf3d] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI natural-language search */}
        <AiSearchPanel />

        {/* Grid */}
        <section ref={resultsSectionRef} className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {viewMode === "map" ? (
              <ListingsMap
                listings={mapListings}
                onViewportChange={handleMapViewport}
                loading={mapLoading}
                statusLine={mapStatusLine}
                focus={mapFocus}
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
