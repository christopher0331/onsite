"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { type LatLngTuple, type Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type MapListing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice: number | null;
  status: string;
  lastStatus: string;
  address: { city: string; state: string; zip: string };
  map?: { latitude: number | null; longitude: number | null } | null;
};

const FALLBACK_CENTER: LatLngTuple = [47.2529, -122.4443]; // Tacoma, WA
const FALLBACK_ZOOM = 9;

function dollarPin(label: string, isSold: boolean) {
  const bg = isSold ? "#1a1a18" : "#ffffff";
  const fg = isSold ? "#ffffff" : "#1a1a18";
  return L.divIcon({
    className: "",
    html: `<div style="background:${bg};color:${fg};border:1px solid #1a1a18;border-radius:9999px;padding:4px 10px;font-family:'Times New Roman',serif;font-size:13px;font-weight:500;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.18);">${label}</div>`,
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

// Auto-fits the viewport to the visible listings whenever the set changes.
function FitToListings({ points }: { points: LatLngTuple[] }) {
  const map = useMap();
  const lastSig = useRef<string>("");

  useEffect(() => {
    if (points.length === 0) return;
    const sig = points.map((p) => `${p[0]},${p[1]}`).join("|");
    if (sig === lastSig.current) return;
    lastSig.current = sig;
    if (points.length === 1) {
      map.setView(points[0], 14);
    } else {
      map.fitBounds(points, { padding: [40, 40], maxZoom: 14 });
    }
  }, [map, points]);

  return null;
}

export default function ListingsMap({ listings }: { listings: MapListing[] }) {
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

  const points = useMemo<LatLngTuple[]>(
    () => validListings.map((l) => [l.map.latitude, l.map.longitude]),
    [validListings]
  );

  if (validListings.length === 0) {
    return (
      <div className="grid h-[640px] place-items-center rounded-3xl border border-charcoal/10 bg-charcoal/5 text-center">
        <div className="px-6">
          <p className="font-serif text-2xl font-light text-charcoal/90">
            No mappable listings in this result set.
          </p>
          <p className="mt-3 text-[13px] text-charcoal/80">
            Repliers did not return coordinates for the current filters. Try widening the search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_14px_50px_rgba(0,0,0,0.10)]">
      <MapContainer
        ref={mapRef}
        center={points[0] ?? FALLBACK_CENTER}
        zoom={FALLBACK_ZOOM}
        scrollWheelZoom
        style={{ height: 640, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToListings points={points} />
        <MarkerClusterGroup chunkedLoading>
          {validListings.map((l) => {
            const isSold = l.lastStatus === "Sld" || l.status === "U";
            const price = l.soldPrice ?? l.listPrice;
            return (
              <Marker
                key={l.mlsNumber}
                position={[l.map.latitude, l.map.longitude]}
                icon={dollarPin(compactPrice(price), isSold)}
              >
                <Popup>
                  <div className="min-w-[180px] space-y-1">
                    <p className="font-serif text-[15px] text-charcoal">
                      {compactPrice(price)} {isSold ? "· Sold" : ""}
                    </p>
                    <p className="text-[12px] text-charcoal/90">
                      {l.address.city}, {l.address.state} {l.address.zip}
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
    </div>
  );
}
