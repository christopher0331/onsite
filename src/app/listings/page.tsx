"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ListingCard from "@/components/ListingCard";
import AiSearchPanel from "@/components/AiSearchPanel";
import ListingsFilterToolbar from "@/components/listings/ListingsFilterToolbar";
import type { MapViewport, MapFocus } from "@/components/ListingsMap";
import { listingInBounds } from "@/lib/listings-api-params";
import { getBathroomCount } from "@/lib/format-bathrooms";

const MAP_MIN_ZOOM = 9;

const ListingsMap = dynamic(() => import("@/components/ListingsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[68vh] place-items-center rounded-3xl bg-charcoal/5 sm:h-[640px]">
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
    numBathroomsHalf: number | null;
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

export default function ListingsPage() {
  const router = useRouter();
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
    // `q` is the homepage hero alias for the city / neighborhood / ZIP box.
    const cityFromUrl = params.get("q") || params.get("city");
    const stateFromUrl = params.get("state");
    const statusFromUrl = params.get("status");
    // The hero routes un-matched street addresses here with view=map so the map
    // geocodes the address and recenters on it (via the map-sync effect below).
    const viewFromUrl = params.get("view");
    if (cityFromUrl) setCity(cityFromUrl);
    if (stateFromUrl) setStateFilter(stateFromUrl);
    if (statusFromUrl && ["All", "A", "P", "U"].includes(statusFromUrl)) {
      setStatus(statusFromUrl);
    }
    if (viewFromUrl === "map") setViewMode("map");
    // Deep links (hero search, service-area pages) arrive with the query
    // pre-filled — apply it so the grid loads filtered results immediately
    // instead of the default unfiltered browse.
    if (cityFromUrl || statusFromUrl || viewFromUrl === "map") {
      setFiltersAppliedAt((v) => v + 1);
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

  // Address suggestion selected from the location autocomplete — jump straight
  // to the property page instead of trying to filter the grid by street name.
  function handleSelectAddress(mlsNumber: string) {
    router.push(`/listings/${encodeURIComponent(mlsNumber)}`);
  }

  // City suggestion selected from the location autocomplete — apply it as the
  // city filter immediately, same as picking a city on the homepage hero.
  function handleSelectCity(selectedCity: string, selectedState: string) {
    setCity(selectedCity);
    if (selectedState) setStateFilter(selectedState);
    markFiltersApplied();
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
          results = results.filter((l) => (getBathroomCount(l.details, l.raw) ?? 0) >= min);
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

  function clearAllFilters() {
    setCity("");
    setMlsInput("");
    setMlsSearch("");
    setStateFilter("WA");
    setPropertyType([]);
    setMinBeds("");
    setMaxBeds("");
    setMinBaths("");
    setMaxBaths("");
    setMinPrice("");
    setMaxPrice("");
    setMinSqft("");
    setMaxSqft("");
    setMinYearBuilt("");
    setMaxYearBuilt("");
    setMinLotSize("");
    setMaxLotSize("");
    setGarageSpots("Any");
    setHomeFeatures([]);
    setSortBy("createdOnDesc");
    setPage(1);
    setFiltersAppliedAt((v) => v + 1);
  }

  const filterToolbarProps = {
    city,
    setCity,
    status,
    setStatus,
    propertyType,
    setPropertyType,
    minBeds,
    setMinBeds,
    maxBeds,
    setMaxBeds,
    minBaths,
    setMinBaths,
    maxBaths,
    setMaxBaths,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minSqft,
    setMinSqft,
    maxSqft,
    setMaxSqft,
    minYearBuilt,
    setMinYearBuilt,
    maxYearBuilt,
    setMaxYearBuilt,
    minLotSize,
    setMinLotSize,
    maxLotSize,
    setMaxLotSize,
    garageSpots,
    setGarageSpots,
    homeFeatures,
    setHomeFeatures,
    sortBy,
    setSortBy,
    mlsInput,
    setMlsInput,
    mlsSearch,
    stateFilter,
    setStateFilter,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
    handleMlsSubmit,
    clearMlsSearch,
    applyRegularFilters,
    handleSelectAddress,
    handleSelectCity,
    onClearAll: clearAllFilters,
  };

  return (
    <>
      <Header />
      <main className="w-full max-w-full overflow-x-hidden bg-white">

        {/* Hero + Controls. overflow-x-hidden (not overflow-hidden) so the
            address-autocomplete dropdown below the search bar isn't clipped
            vertically by the hero's bottom edge — only horizontal bleed from
            the ambient glow needs containing. */}
        <section
          className={`relative w-full max-w-full overflow-x-hidden bg-[#13211a] ${
            viewMode === "map"
              ? "pt-28 pb-8 sm:pt-36 sm:pb-10 lg:pt-40 lg:pb-12"
              : "pt-28 pb-12 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-32"
          }`}
        >
          {/* Brand-green ambient glow so the hero isn't flat black/white */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 12% 0%, rgba(61,175,61,0.28) 0%, rgba(61,175,61,0.06) 38%, rgba(19,33,26,0) 70%), radial-gradient(50% 70% at 100% 100%, rgba(61,175,61,0.16) 0%, rgba(19,33,26,0) 60%)",
            }}
          />
          <div className="relative mx-auto w-full min-w-0 max-w-[1440px] px-4 sm:px-6 lg:px-12">

            <div className="mb-6 flex flex-col gap-5 sm:mb-10 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="mb-4 font-serif text-[clamp(2rem,6vw,5.8rem)] font-light leading-[1.02] text-white sm:mb-6 sm:leading-[1.0]">
                  Search <span className="text-[#3daf3d]">Homes.</span>
                </h1>
                <p className="max-w-xl text-[14px] leading-7 text-white/70 sm:text-[16px] sm:leading-8">
                  Search the full MLS database. Filter by location, price, beds, and more.
                </p>
                <Link
                  href="/service-areas"
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/75 transition-colors hover:text-[#3daf3d] sm:mt-6"
                >
                  Explore Service Areas
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="shrink-0 text-left lg:text-right">
                {totalDbCount !== null && (
                  <p className="text-[13px] text-white/60">
                    <span className="font-serif text-2xl font-light text-[#3daf3d] sm:text-3xl">{totalDbCount.toLocaleString()}+</span>
                    <br />listings in the database
                  </p>
                )}
              </div>
            </div>

            {viewMode !== "map" && (
              <ListingsFilterToolbar variant="hero" {...filterToolbarProps} />
            )}

            {applyFeedback && viewMode !== "map" && (
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[#3daf3d]">
                {applyFeedback}
              </p>
            )}

            {/* View-mode toggle */}
            <div className="mt-5 flex items-center gap-3 sm:mt-8">
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
                  onClick={() => {
                    setViewMode("map");
                    setTimeout(() => {
                      resultsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 60);
                  }}
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

        {viewMode !== "map" && <AiSearchPanel />}

        {/* Grid / Map */}
        <section
          ref={resultsSectionRef}
          className={`bg-[#f2ede6] ${viewMode === "map" ? "py-4 sm:py-6" : "py-12 sm:py-20 lg:py-28"}`}
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {viewMode === "map" && (
              <div className="sticky top-16 z-40 -mx-6 mb-4 border-b border-charcoal/10 bg-[#f2ede6]/95 px-6 py-4 backdrop-blur-sm sm:top-20 lg:top-24 lg:-mx-12 lg:px-12">
                <ListingsFilterToolbar variant="map" {...filterToolbarProps} />
              </div>
            )}
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
