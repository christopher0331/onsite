"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { MarkerCluster } from "leaflet";
import L, { type LatLngBounds, type LatLngTuple, type Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
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

const DEFAULT_CENTER: LatLngTuple = [47.1854, -122.2929]; // Puyallup
const DEFAULT_ZOOM = 11;
const CDN = "https://cdn.repliers.io/";

function fullPrice(n: number | null | undefined) {
  if (!n || Number.isNaN(n)) return "Price on request";
  return "$" + n.toLocaleString("en-US");
}

function streetLine(a: MapListing["address"]) {
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = a.unitNumber ? ` #${a.unitNumber}` : "";
  return street ? `${street}${unit}` : "";
}

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
    return raw
      .slice(0, 8)
      .map((p) => (p.startsWith("http") ? p : CDN + p));
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
    <Link href={`/listings/${listing.mlsNumber}`} className="group block w-[340px] no-underline">
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

const PIN_PALETTE: Record<StatusTone, { bg: string; fg: string; border: string }> = {
  active: { bg: "#ffffff", fg: "#1a1a18", border: "#1a1a18" },
  pending: { bg: "#fbbf24", fg: "#1a1a18", border: "#1a1a18" },
  sold: { bg: "#1a1a18", fg: "#ffffff", border: "#1a1a18" },
};

function dollarPin(label: string, tone: StatusTone) {
  const { bg, fg, border } = PIN_PALETTE[tone];
  return L.divIcon({
    className: "",
    html: `<div style="background:${bg};color:${fg};border:1px solid ${border};border-radius:9999px;padding:4px 10px;font-family:'Times New Roman',serif;font-size:13px;font-weight:500;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.18);">${label}</div>`,
    iconSize: [60, 24],
    iconAnchor: [30, 24],
    popupAnchor: [0, -22],
  });
}

function compactPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

function boundsFromLeaflet(b: LatLngBounds): MapBounds {
  const northWest = b.getNorthWest();
  const southEast = b.getSouthEast();
  return {
    north: northWest.lat,
    south: southEast.lat,
    east: southEast.lng,
    west: northWest.lng,
  };
}

function MapViewportWatcher({
  onViewportChange,
}: {
  onViewportChange: (viewport: MapViewport) => void;
}) {
  const map = useMap();
  const firedInitial = useRef(false);
  const onChangeRef = useRef(onViewportChange);
  onChangeRef.current = onViewportChange;

  const emit = () => {
    const center = map.getCenter();
    onChangeRef.current({
      bounds: boundsFromLeaflet(map.getBounds()),
      center: { lat: center.lat, lng: center.lng },
      zoom: map.getZoom(),
    });
  };

  useMapEvents({
    moveend: emit,
    zoomend: emit,
  });

  useEffect(() => {
    if (firedInitial.current) return;
    firedInitial.current = true;
    emit();
  }, [map]);

  return null;
}

// The "Searching…"/"Showing X homes" banners live in the wrapper's stacking
// context (above the map), so a popup that opens near the top can render under
// them. Hiding the banners while a card is open keeps the card unobstructed.
function PopupStateWatcher({ onChange }: { onChange: (open: boolean) => void }) {
  useMapEvents({
    popupopen: () => onChange(true),
    popupclose: () => onChange(false),
  });
  return null;
}

export default function ListingsMap({
  listings,
  onViewportChange,
  statusLine,
  loading = false,
  initialCenter = DEFAULT_CENTER,
  initialZoom = DEFAULT_ZOOM,
}: {
  listings: MapListing[];
  onViewportChange: (viewport: MapViewport) => void;
  statusLine?: string;
  loading?: boolean;
  initialCenter?: LatLngTuple;
  initialZoom?: number;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const validListings = useMemo(() => {
    const seen = new Set<string>();
    return listings.filter(
      (l): l is MapListing & { map: { latitude: number; longitude: number } } => {
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

  return (
    <div className="relative overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_14px_50px_rgba(0,0,0,0.10)]">
      <style>{`
        .airbnb-cluster { background: transparent !important; border: none !important; }
        .airbnb-cluster-inner {
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
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          cursor: pointer;
        }
        .airbnb-cluster-inner:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 14px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.14);
        }
        .listing-popup {
          z-index: 1200 !important;
        }
        .listing-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12);
        }
        .listing-popup .leaflet-popup-content {
          margin: 0;
          width: 340px !important;
        }
        .listing-popup .leaflet-popup-content p {
          margin: 0;
        }
        .listing-popup .leaflet-popup-tip-container { display: none; }
        .listing-popup a.leaflet-popup-close-button {
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 9999px;
          color: #222222;
          font-size: 18px;
          font-weight: 600;
          line-height: 1;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transition: transform 0.15s ease;
        }
        .listing-popup a.leaflet-popup-close-button:hover {
          background: #ffffff;
          color: #000000;
          transform: scale(1.08);
        }
      `}</style>
      {loading && !popupOpen && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex justify-center pt-6">
          <div className="flex items-center gap-3 rounded-full bg-charcoal px-7 py-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-[14px] font-medium uppercase tracking-[0.18em]">
              Searching this area…
            </span>
          </div>
        </div>
      )}
      {!loading && statusLine && !popupOpen && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex justify-center pt-6">
          <div className="rounded-full bg-white/95 px-6 py-3 text-[13px] font-medium text-charcoal shadow-[0_10px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            {statusLine}
          </div>
        </div>
      )}
      <MapContainer
        ref={mapRef}
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom
        zoomSnap={0.25}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        wheelDebounceTime={15}
        zoomAnimation
        style={{ height: 640, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewportWatcher onViewportChange={onViewportChange} />
        <PopupStateWatcher onChange={setPopupOpen} />
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          zoomToBoundsOnClick
          removeOutsideVisibleBounds
          disableClusteringAtZoom={15}
          maxClusterRadius={48}
          iconCreateFunction={(cluster: MarkerCluster) => {
            const count = cluster.getChildCount();
            const label = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
            const size = count >= 100 ? 48 : count >= 25 ? 42 : 36;
            return L.divIcon({
              className: "airbnb-cluster",
              html: `<div class="airbnb-cluster-inner" style="width:${size}px;height:${size}px;font-size:${count >= 100 ? 13 : 14}px;">${label}</div>`,
              iconSize: [size, size],
              iconAnchor: [size / 2, size / 2],
            });
          }}
        >
          {validListings.map((l) => {
            const badge = getListingStatusBadge(l);
            const price = l.soldPrice ?? l.listPrice;
            const pillBg =
              badge.tone === "active"
                ? "rgba(255,255,255,0.95)"
                : badge.tone === "pending"
                  ? "#fbbf24"
                  : "#1a1a18";
            const pillFg = badge.tone === "sold" ? "#ffffff" : "#1a1a18";
            return (
              <Marker
                key={l.mlsNumber}
                position={[l.map.latitude, l.map.longitude]}
                icon={dollarPin(compactPrice(price), badge.tone)}
              >
                <Popup className="listing-popup" maxWidth={340} minWidth={340} autoPan>
                  <ListingPopupCard
                    listing={l}
                    price={price}
                    badgeLabel={badge.label}
                    pillBg={pillBg}
                    pillFg={pillFg}
                  />
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      {validListings.length === 0 && !loading && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-charcoal/5">
          <p className="rounded-full bg-white/95 px-6 py-3 text-[13px] text-charcoal/80 shadow">
            No mappable listings in this map area. Pan or zoom to search another neighborhood.
          </p>
        </div>
      )}
    </div>
  );
}
