"use client";

import { useEffect, useMemo, useRef } from "react";
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
  address: { city: string; state: string; zip: string };
  map?: { latitude: number | null; longitude: number | null } | null;
};

const DEFAULT_CENTER: LatLngTuple = [47.1854, -122.2929]; // Puyallup
const DEFAULT_ZOOM = 11;

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

  const validListings = useMemo(
    () =>
      listings.filter(
        (l): l is MapListing & { map: { latitude: number; longitude: number } } =>
          !!l.map &&
          typeof l.map.latitude === "number" &&
          typeof l.map.longitude === "number"
      ),
    [listings]
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_14px_50px_rgba(0,0,0,0.10)]">
      {(statusLine || loading) && (
        <div className="pointer-events-none absolute left-4 right-4 top-4 z-[500] flex justify-center">
          <div className="rounded-full bg-white/95 px-5 py-2.5 text-[12px] text-charcoal shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            {loading ? "Searching this area…" : statusLine}
          </div>
        </div>
      )}
      <MapContainer
        ref={mapRef}
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom
        style={{ height: 640, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewportWatcher onViewportChange={onViewportChange} />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster: MarkerCluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              className: "",
              html: `<div style="background:#1a1a18;color:#fff;border-radius:9999px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:13px;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,0.25);border:2px solid #fff;">${count}</div>`,
              iconSize: [44, 44],
              iconAnchor: [22, 22],
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
                <Popup>
                  <div className="min-w-[180px] space-y-1">
                    <p className="font-serif text-[15px] text-charcoal">
                      {compactPrice(price)}
                    </p>
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium"
                      style={{ background: pillBg, color: pillFg }}
                    >
                      {badge.label}
                    </span>
                    <p className="text-[12px] text-charcoal/90">
                      {[l.address?.city, l.address?.state, l.address?.zip]
                        .filter(Boolean)
                        .join(", ") || "Location unavailable"}
                    </p>
                    <p className="text-[11px] text-charcoal/80">MLS# {l.mlsNumber}</p>
                    <Link
                      href={`/listings/${l.mlsNumber}`}
                      className="mt-2 inline-block text-[11px] uppercase tracking-[0.2em] text-charcoal underline-offset-4 hover:underline"
                    >
                      View Listing →
                    </Link>
                  </div>
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
