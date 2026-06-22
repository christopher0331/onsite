"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer, type Marker, type Renderer } from "@googlemaps/markerclusterer";
import { getListingStatusBadge, type StatusTone } from "@/lib/listing-status";

export type MapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type MapViewport = {
  bounds: MapBounds;
  center: { lat: number; lng: number };
  zoom: number;
};

export type MapFocus = {
  lat: number;
  lng: number;
  zoom?: number;
  // Bumped each time the caller wants to recenter, so repeated searches for the
  // same place still move the map there.
  nonce: number;
};

type MapListing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice: number | null;
  status: string;
  lastStatus: string;
  standardStatus?: string | null;
  raw?: Record<string, unknown> | null;
  address: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    unitNumber?: string | null;
    city: string;
    state: string;
    zip: string;
  };
  details?: {
    numBedrooms?: number | null;
    numBathrooms?: number | null;
    sqft?: number | null;
  } | null;
  images?: string[] | null;
  permissions?: { displayAddressOnInternet?: string };
  map?: { latitude: number | null; longitude: number | null } | null;
};

type ValidListing = MapListing & { map: { latitude: number; longitude: number } };

const DEFAULT_CENTER = { lat: 47.1854, lng: -122.2929 }; // Puyallup
const DEFAULT_ZOOM = 11;
const CDN = "https://cdn.repliers.io/";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
// AdvancedMarkers require a Map ID. Set NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID to a
// Cloud-styled map for production; DEMO_MAP_ID is Google's testing fallback.
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

// Tracks a viewport breakpoint so the map can adapt touch gestures, height, and
// popup sizing for phones (where "greedy" gestures trap page scrolling).
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

function fullPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

function compactPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

function streetLine(a: MapListing["address"]) {
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = a.unitNumber ? ` #${a.unitNumber}` : "";
  return street ? `${street}${unit}` : "";
}

const PIN_PALETTE: Record<StatusTone, { bg: string; fg: string; border: string }> = {
  active: { bg: "#ffffff", fg: "#1a1a18", border: "#1a1a18" },
  pending: { bg: "#fbbf24", fg: "#1a1a18", border: "#1a1a18" },
  sold: { bg: "#1a1a18", fg: "#ffffff", border: "#1a1a18" },
};

function ListingPopupCard({
  listing,
  price,
  badgeLabel,
  pillBg,
  pillFg,
}: {
  listing: MapListing;
  price: number;
  badgeLabel: string;
  pillBg: string;
  pillFg: string;
}) {
  const images = useMemo(() => {
    const raw = listing.images ?? [];
    return raw.slice(0, 8).map((p) => (p.startsWith("http") ? p : CDN + p));
  }, [listing.images]);

  const [idx, setIdx] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[Math.min(idx, images.length - 1)] ?? null;

  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = showAddress ? streetLine(listing.address) : "";
  const cityLine = [listing.address?.city, listing.address?.state, listing.address?.zip]
    .filter(Boolean)
    .join(", ");
  const det = listing.details ?? {};

  const step = (e: React.MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((prev) => (prev + dir + images.length) % images.length);
  };

  const arrowClass =
    "absolute top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition hover:bg-white hover:scale-105";

  return (
    <Link
      href={`/listings/${listing.mlsNumber}`}
      className="group block w-[min(340px,calc(100vw-72px))] no-underline"
    >
      <div className="relative h-[200px] w-full overflow-hidden bg-charcoal/5">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt={street || "Property photo"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-charcoal/20">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        )}
        <span
          className="absolute left-3 top-3 z-20 inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] shadow-sm"
          style={{ background: pillBg, color: pillFg }}
        >
          {badgeLabel}
        </span>
        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => step(e, -1)}
              className={`${arrowClass} left-2 opacity-0 group-hover:opacity-100`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => step(e, 1)}
              className={`${arrowClass} right-2 opacity-0 group-hover:opacity-100`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === Math.min(idx, images.length - 1) ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-serif text-[21px] leading-none text-charcoal">{fullPrice(price)}</p>
          {(det.numBedrooms || det.numBathrooms || det.sqft) && (
            <div className="flex gap-2.5 whitespace-nowrap text-[12px] text-charcoal/70">
              {det.numBedrooms ? (
                <span><strong className="font-semibold text-charcoal">{det.numBedrooms}</strong> bd</span>
              ) : null}
              {det.numBathrooms ? (
                <span><strong className="font-semibold text-charcoal">{det.numBathrooms}</strong> ba</span>
              ) : null}
              {det.sqft ? (
                <span><strong className="font-semibold text-charcoal">{Number(det.sqft).toLocaleString()}</strong> sqft</span>
              ) : null}
            </div>
          )}
        </div>
        {street && (
          <p className="pt-2 text-[13px] font-medium leading-snug text-charcoal">{street}</p>
        )}
        <div className="mt-1.5 flex items-center justify-between gap-3">
          {cityLine && <p className="truncate text-[12px] text-charcoal/65">{cityLine}</p>}
          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-charcoal/60 transition-colors group-hover:text-charcoal">
            View listing →
          </span>
        </div>
      </div>
    </Link>
  );
}

// Recenter the map on a caller-provided location (e.g. a geocoded city search).
function MapFocusController({ focus }: { focus: MapFocus | null }) {
  const map = useMap();
  const [lastNonce, setLastNonce] = useState(-1);
  useEffect(() => {
    if (!map || !focus || focus.nonce === lastNonce) return;
    setLastNonce(focus.nonce);
    map.panTo({ lat: focus.lat, lng: focus.lng });
    if (typeof focus.zoom === "number") map.setZoom(focus.zoom);
  }, [map, focus, lastNonce]);
  return null;
}

// Emit the viewport (bounds/center/zoom) whenever the map settles, so the page
// can fetch listings for the visible area.
function ViewportWatcher({
  onViewportChange,
}: {
  onViewportChange: (viewport: MapViewport) => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const emit = () => {
      const b = map.getBounds();
      const c = map.getCenter();
      if (!b || !c) return;
      const ne = b.getNorthEast();
      const sw = b.getSouthWest();
      onViewportChange({
        bounds: { north: ne.lat(), south: sw.lat(), east: ne.lng(), west: sw.lng() },
        center: { lat: c.lat(), lng: c.lng() },
        zoom: map.getZoom() ?? DEFAULT_ZOOM,
      });
    };
    const listener = map.addListener("idle", emit);
    return () => listener.remove();
  }, [map, onViewportChange]);
  return null;
}

// Single price pin. Its ref/onClick callbacks are memoized so the marker's ref
// identity stays stable across renders — inline callbacks here cause React to
// re-run the ref every render, which churns the marker map state and locks the
// page in an infinite render loop.
function PriceMarker({
  listing,
  setMarkerRef,
  onSelect,
}: {
  listing: ValidListing;
  setMarkerRef: (marker: Marker | null, key: string) => void;
  onSelect: (listing: ValidListing) => void;
}) {
  const ref = useCallback(
    (marker: Marker | null) => setMarkerRef(marker, listing.mlsNumber),
    [setMarkerRef, listing.mlsNumber]
  );
  const handleClick = useCallback(() => onSelect(listing), [onSelect, listing]);

  const badge = getListingStatusBadge(listing);
  const price = listing.soldPrice ?? listing.listPrice;
  const { bg, fg, border } = PIN_PALETTE[badge.tone];

  return (
    <AdvancedMarker
      position={{ lat: listing.map.latitude, lng: listing.map.longitude }}
      ref={ref}
      onClick={handleClick}
    >
      <div
        className="gmaps-price-pin"
        style={{ background: bg, color: fg, border: `1px solid ${border}` }}
      >
        {compactPrice(price)}
      </div>
    </AdvancedMarker>
  );
}

// Custom-styled price pins with Airbnb-style clustering.
function PriceMarkers({
  listings,
  onSelect,
}: {
  listings: ValidListing[];
  onSelect: (listing: ValidListing) => void;
}) {
  const map = useMap();
  const markerLib = useMapsLibrary("marker");
  const [markers, setMarkers] = useState<Record<string, Marker>>({});

  const clusterer = useMemo(() => {
    if (!map || !markerLib) return null;
    const renderer: Renderer = {
      render: ({ count, position }) => {
        const div = document.createElement("div");
        div.className = "gmaps-cluster";
        div.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
        const size = count >= 100 ? 48 : count >= 25 ? 42 : 36;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.fontSize = count >= 100 ? "13px" : "14px";
        return new markerLib.AdvancedMarkerElement({
          position,
          content: div,
          zIndex: 1000,
        });
      },
    };
    return new MarkerClusterer({ map, renderer });
  }, [map, markerLib]);

  useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  useEffect(() => {
    return () => clusterer?.clearMarkers();
  }, [clusterer]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((prev) => {
      if (marker && prev[key]) return prev;
      if (!marker && !prev[key]) return prev;
      const next = { ...prev };
      if (marker) next[key] = marker;
      else delete next[key];
      return next;
    });
  }, []);

  return (
    <>
      {listings.map((l) => (
        <PriceMarker
          key={l.mlsNumber}
          listing={l}
          setMarkerRef={setMarkerRef}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

function MapInner({
  listings,
  onViewportChange,
  focus,
  initialCenter,
  initialZoom,
  onPopupChange,
}: {
  listings: ValidListing[];
  onViewportChange: (viewport: MapViewport) => void;
  focus: MapFocus | null;
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
  onPopupChange: (open: boolean) => void;
}) {
  const [selected, setSelected] = useState<ValidListing | null>(null);
  const isMobile = useIsMobile();
  const infoWindowWidth = isMobile ? 280 : 340;

  useEffect(() => {
    onPopupChange(!!selected);
  }, [selected, onPopupChange]);

  // Drop the open card if its listing leaves the result set (filter/pan).
  useEffect(() => {
    if (selected && !listings.some((l) => l.mlsNumber === selected.mlsNumber)) {
      setSelected(null);
    }
  }, [listings, selected]);

  const selectedBadge = selected ? getListingStatusBadge(selected) : null;
  const selectedPrice = selected ? selected.soldPrice ?? selected.listPrice : 0;

  return (
    <GoogleMap
      mapId={MAP_ID}
      defaultCenter={initialCenter}
      defaultZoom={initialZoom}
      gestureHandling={isMobile ? "cooperative" : "greedy"}
      disableDefaultUI={false}
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      zoomControl={!isMobile}
      clickableIcons={false}
      onClick={() => setSelected(null)}
      style={{ height: isMobile ? "68vh" : 640, width: "100%" }}
    >
      <ViewportWatcher onViewportChange={onViewportChange} />
      <MapFocusController focus={focus} />
      <PriceMarkers listings={listings} onSelect={setSelected} />
      {selected && (
        <InfoWindow
          position={{ lat: selected.map.latitude, lng: selected.map.longitude }}
          onCloseClick={() => setSelected(null)}
          headerDisabled
          minWidth={infoWindowWidth}
          maxWidth={infoWindowWidth}
          pixelOffset={[0, -8]}
        >
          <ListingPopupCard
            listing={selected}
            price={selectedPrice}
            badgeLabel={selectedBadge?.label ?? ""}
            pillBg={
              selectedBadge?.tone === "active"
                ? "rgba(255,255,255,0.95)"
                : selectedBadge?.tone === "pending"
                  ? "#fbbf24"
                  : "#1a1a18"
            }
            pillFg={selectedBadge?.tone === "sold" ? "#ffffff" : "#1a1a18"}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default function ListingsMap({
  listings,
  onViewportChange,
  statusLine,
  loading = false,
  initialCenter = DEFAULT_CENTER,
  initialZoom = DEFAULT_ZOOM,
  focus = null,
}: {
  listings: MapListing[];
  onViewportChange: (viewport: MapViewport) => void;
  statusLine?: string;
  loading?: boolean;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  focus?: MapFocus | null;
}) {
  const [popupOpen, setPopupOpen] = useState(false);

  const validListings = useMemo<ValidListing[]>(() => {
    const seen = new Set<string>();
    return listings.filter(
      (l): l is ValidListing => {
        if (
          !l.map ||
          typeof l.map.latitude !== "number" ||
          typeof l.map.longitude !== "number"
        ) {
          return false;
        }
        if (seen.has(l.mlsNumber)) return false;
        seen.add(l.mlsNumber);
        return true;
      }
    );
  }, [listings]);

  if (!API_KEY) {
    return (
      <div className="grid h-[68vh] place-items-center rounded-3xl border border-charcoal/10 bg-charcoal/5 sm:h-[640px]">
        <p className="rounded-full bg-white px-6 py-3 text-[13px] text-charcoal/80 shadow">
          Map unavailable — missing Google Maps API key.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_14px_50px_rgba(0,0,0,0.10)]">
      <style>{`
        .gmaps-price-pin {
          border-radius: 9999px;
          padding: 4px 10px;
          font-family: 'Times New Roman', serif;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          cursor: pointer;
          transition: transform 0.12s ease;
        }
        .gmaps-price-pin:hover { transform: scale(1.08); }
        .gmaps-cluster {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #1a1a18;
          border-radius: 9999px;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-weight: 600;
          line-height: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12);
          border: 1px solid rgba(0,0,0,0.08);
          cursor: pointer;
        }
        /* Strip the default InfoWindow chrome so the card sits flush. */
        .gm-style .gm-style-iw-c { padding: 0 !important; border-radius: 16px !important; overflow: hidden !important; box-shadow: 0 8px 28px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12) !important; }
        .gm-style .gm-style-iw-d { overflow: hidden !important; }
        .gm-style .gm-style-iw-tc { display: none !important; }
      `}</style>

      {loading && !popupOpen && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex justify-center px-4 pt-6">
          <div className="flex items-center gap-3 rounded-full bg-charcoal px-5 py-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-7 sm:py-4">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] sm:text-[14px]">
              Searching this area…
            </span>
          </div>
        </div>
      )}
      {!loading && statusLine && !popupOpen && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex justify-center px-4 pt-6">
          <div className="max-w-[calc(100vw-32px)] rounded-full bg-white/95 px-5 py-2.5 text-center text-[12px] font-medium text-charcoal shadow-[0_10px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-[13px]">
            {statusLine}
          </div>
        </div>
      )}

      <APIProvider apiKey={API_KEY}>
        <MapInner
          listings={validListings}
          onViewportChange={onViewportChange}
          focus={focus}
          initialCenter={initialCenter}
          initialZoom={initialZoom}
          onPopupChange={setPopupOpen}
        />
      </APIProvider>

      {validListings.length === 0 && !loading && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-charcoal/5 px-6">
          <p className="max-w-sm rounded-2xl bg-white/95 px-6 py-4 text-center text-[13px] leading-relaxed text-charcoal/80 shadow">
            No mappable listings in this map area. Pan or zoom to search another neighborhood.
          </p>
        </div>
      )}
    </div>
  );
}
