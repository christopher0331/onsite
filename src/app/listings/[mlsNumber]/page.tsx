"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import dynamic from "next/dynamic";

const MarketChart = dynamic(() => import("@/components/MarketChart"), { ssr: false });
const InventoryGauge = dynamic(() => import("@/components/InventoryGauge"), { ssr: false });

type CityStats = {
  active: {
    available: { mth: Record<string, number> };
    new: { count: number; mth: Record<string, { count: number }> };
  } | null;
  sold: {
    soldPrice: { med: number; sum: number; mth: Record<string, { med: number; sum: number; count: number }> };
    daysOnMarket: { avg: number; mth: Record<string, { avg: number; count: number }> };
    closed: { count: number; mth: Record<string, { count: number }> };
  } | null;
  chart: {
    soldPrice?: { med: number; mth: Record<string, { med: number; count: number }> };
    daysOnMarket?: { med: number; mth: Record<string, { med: number; count: number }> };
  } | null;
};

function recentMonths(mth: Record<string, unknown> | undefined, count: number): string[] {
  if (!mth) return [];
  return Object.keys(mth).sort().slice(-count);
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function fmtCompact(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

const CDN = "https://cdn.repliers.io/";

type Listing = {
  mlsNumber: string;
  status: string;
  lastStatus: string;
  standardStatus: string;
  type: string;
  listPrice: number;
  soldPrice: number | null;
  originalPrice: number | null;
  listDate: string;
  soldDate: string | null;
  daysOnMarket: number;
  simpleDaysOnMarket: number;
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
    area: string;
  };
  map: { latitude: number; longitude: number };
  details: {
    numBedrooms: number | null;
    numBedroomsPlus: number | null;
    numBathrooms: number | null;
    numBathroomsHalf: number | null;
    numFireplaces: string | null;
    numParkingSpaces: number | null;
    sqft: number | null;
    propertyType: string | null;
    description: string | null;
    style: string | null;
    yearBuilt: string | null;
    garage: string | null;
    numGarageSpaces: number | null;
    viewType: string | null;
    heating: string | null;
    airConditioning: string | null;
    sewer: string | null;
    waterSource: string | null;
    HOAFee: string | null;
    zoningDescription: string | null;
    waterfront: string | null;
    virtualTourUrl: string | null;
    flooringType: string | null;
    foundationType: string | null;
    roofMaterial: string | null;
    swimmingPool: string | null;
    extras: string | null;
    landscapeFeatures: string | null;
    basement1: string | null;
    basement2: string | null;
    furnished: string | null;
    elevator: string | null;
    energuideRating: string | null;
    livingAreaMeasurement: string | null;
  };
  lot: {
    acres: number | null;
    squareFeet: number | null;
    features: string | null;
    size: string | null;
    dimensions: string | null;
    source: string | null;
    measurement: string | null;
  } | null;
  taxes: { annualAmount: number | null; assessmentYear: string | null } | null;
  nearby: { amenities: string[] } | null;
  openHouse: { startTime: string; endTime: string; type: string }[];
  agents: {
    name: string;
    phones: string[];
    brokerage: { name: string };
  }[];
  buyerAgents: {
    name: string;
    phones: string[];
    brokerage: { name: string };
  }[] | null;
  office: { brokerageName: string } | null;
  permissions?: { displayAddressOnInternet?: string };
  updatedOn: string | null;
  timestamps: {
    listingUpdated: string | null;
    idxUpdated: string | null;
    photosUpdated: string | null;
    repliersUpdatedOn: string | null;
  } | null;
  estimate: {
    value: number;
    low: number;
    high: number;
    confidence: number;
    date: string | null;
    history?: { mth: Record<string, { value: number }> } | null;
  } | null;
  comparables: ComparableListing[] | null;
  images: string[];
  photoCount: number;
  condominium: { fees: { maintenance: number | null } } | null;
};

type ComparableListing = {
  mlsNumber: string;
  listPrice: number;
  soldPrice: number | null;
  soldDate: string | null;
  lastStatus: string | null;
  distance: number | null;
  address: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    streetDirection?: string;
    city?: string;
    state?: string;
    zip?: string;
    neighborhood?: string;
  };
  details: {
    numBedrooms: number | null;
    numBathrooms: number | null;
    sqft: string | number | null;
    yearBuilt: string | null;
    style: string | null;
  };
  images?: string[];
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function formatAddress(a: Listing["address"]) {
  return [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ") + (a.unitNumber ? ` #${a.unitNumber}` : "");
}

function imgUrl(path: string) {
  if (!path) return null;
  return path.startsWith("http") ? path : CDN + path;
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ListingDetailPage() {
  const { mlsNumber } = useParams<{ mlsNumber: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [dataRefreshedAt, setDataRefreshedAt] = useState<Date | null>(null);

  const [cityStats, setCityStats] = useState<CityStats | null>(null);

  useEffect(() => {
    if (!mlsNumber) return;
    fetch(`/api/listings/${mlsNumber}`)
      .then((r) => r.json())
      .then((data) => { setListing(data); setDataRefreshedAt(new Date()); setLoading(false); })
      .catch(() => setLoading(false));
  }, [mlsNumber]);

  useEffect(() => {
    if (!listing?.address?.city) return;
    fetch(`/api/statistics?city=${encodeURIComponent(listing.address.city)}&chart=true`)
      .then((r) => r.json())
      .then((data) => setCityStats(data))
      .catch(() => {});
  }, [listing?.address?.city]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-white">
          <div className="pt-40 pb-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-charcoal/20 border-t-charcoal" />
            <p className="mt-6 text-[13px] text-charcoal/40">Loading listing…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Header />
        <main className="bg-white pt-40 pb-20 text-center">
          <p className="font-serif text-2xl font-light text-charcoal/40">Listing not found.</p>
          <Link href="/listings" className="mt-6 inline-block text-[12px] uppercase tracking-[0.25em] text-charcoal/50 hover:text-charcoal">
            ← Back to Listings
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const showAddress = listing.permissions?.displayAddressOnInternet !== "N";
  const street = showAddress ? formatAddress(listing.address) : "Undisclosed";
  const images = listing.images || [];
  const isActive = listing.status === "A";
  const det = listing.details;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`)}`;

  // Build details rows
  const detailRows: { label: string; value: string | number }[] = [];
  if (det.propertyType) detailRows.push({ label: "Property Type", value: det.propertyType });
  if (det.style) detailRows.push({ label: "Style", value: det.style });
  if (det.yearBuilt) detailRows.push({ label: "Year Built", value: det.yearBuilt });
  if (det.sqft) detailRows.push({ label: "Living Area", value: `${Number(det.sqft).toLocaleString()} ${det.livingAreaMeasurement === "Square Feet" || !det.livingAreaMeasurement ? "sqft" : det.livingAreaMeasurement.toLowerCase()}` });
  if (listing.lot?.squareFeet) detailRows.push({ label: "Lot Size", value: `${Number(listing.lot.squareFeet).toLocaleString()} sqft` });
  if (listing.lot?.acres) detailRows.push({ label: "Lot Acres", value: `${listing.lot.acres} ac` });
  if (listing.lot?.dimensions) detailRows.push({ label: "Lot Dimensions", value: listing.lot.dimensions });
  if (det.numBedrooms) {
    const bedVal = det.numBedroomsPlus
      ? `${det.numBedrooms} + ${det.numBedroomsPlus}`
      : det.numBedrooms;
    detailRows.push({ label: "Bedrooms", value: bedVal });
  }
  if (det.numBathrooms) {
    const bathVal = det.numBathroomsHalf
      ? `${det.numBathrooms} full · ${det.numBathroomsHalf} half`
      : det.numBathrooms;
    detailRows.push({ label: "Bathrooms", value: bathVal });
  }
  if (det.numFireplaces) detailRows.push({ label: "Fireplaces", value: det.numFireplaces });
  if (det.numGarageSpaces) detailRows.push({ label: "Garage Spaces", value: det.numGarageSpaces });
  if (det.numParkingSpaces && det.numParkingSpaces !== det.numGarageSpaces) {
    detailRows.push({ label: "Total Parking", value: det.numParkingSpaces });
  }
  if (det.basement1) {
    const basementVal = det.basement2 ? `${det.basement1} · ${det.basement2}` : det.basement1;
    detailRows.push({ label: "Basement", value: basementVal });
  }
  if (det.furnished) detailRows.push({ label: "Furnished", value: det.furnished });
  if (det.elevator === "Y") detailRows.push({ label: "Elevator", value: "Yes" });
  if (det.heating) detailRows.push({ label: "Heating", value: det.heating });
  if (det.airConditioning) detailRows.push({ label: "Cooling", value: det.airConditioning });
  if (det.energuideRating) detailRows.push({ label: "Energy Rating", value: det.energuideRating });
  if (det.sewer) detailRows.push({ label: "Sewer", value: det.sewer });
  if (det.waterSource) detailRows.push({ label: "Water", value: det.waterSource });
  if (det.flooringType) detailRows.push({ label: "Flooring", value: det.flooringType });
  if (det.roofMaterial) detailRows.push({ label: "Roof", value: det.roofMaterial });
  if (det.foundationType) detailRows.push({ label: "Foundation", value: det.foundationType });
  if (det.viewType) detailRows.push({ label: "View", value: det.viewType });
  if (det.waterfront === "Y") detailRows.push({ label: "Waterfront", value: "Yes" });
  if (det.swimmingPool) detailRows.push({ label: "Pool", value: det.swimmingPool });
  if (det.zoningDescription) detailRows.push({ label: "Zoning", value: det.zoningDescription });
  if (det.HOAFee) detailRows.push({ label: "HOA Fee", value: `$${det.HOAFee}/mo` });
  if (listing.condominium?.fees?.maintenance) detailRows.push({ label: "Maintenance", value: `$${listing.condominium.fees.maintenance}/mo` });
  if (listing.taxes?.annualAmount) detailRows.push({ label: "Annual Taxes", value: `$${listing.taxes.annualAmount.toLocaleString()} (${listing.taxes.assessmentYear})` });
  if (listing.lot?.features) detailRows.push({ label: "Lot Features", value: listing.lot.features });
  if (listing.lot?.source) detailRows.push({ label: "Lot Source", value: listing.lot.source });
  if (det.landscapeFeatures) detailRows.push({ label: "Landscaping", value: det.landscapeFeatures });
  if (det.extras) detailRows.push({ label: "Extras", value: det.extras });
  detailRows.push({ label: "Days on Market", value: listing.simpleDaysOnMarket ?? listing.daysOnMarket });
  if (listing.listDate) detailRows.push({ label: "Listed", value: formatDate(listing.listDate) });
  if (listing.originalPrice && listing.originalPrice !== listing.listPrice) {
    detailRows.push({ label: "Original Price", value: formatPrice(listing.originalPrice) });
  }

  const displayImages = showAllPhotos ? images : images.slice(0, 9);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Breadcrumb + hero */}
        <section className="bg-[#1a1a18] pt-36 pb-12 sm:pt-44 sm:pb-16">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <Link href="/listings" className="hover:text-white/70 transition-colors">Listings</Link>
              <span>/</span>
              <span className="text-white/60">{listing.address.city}</span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-medium ${
                    isActive ? "bg-white text-charcoal" : "bg-white/20 text-white"
                  }`}>
                    {listing.standardStatus || (isActive ? "Active" : listing.lastStatus)}
                  </span>
                  {det.propertyType && (
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/50">
                      {det.propertyType}
                    </span>
                  )}
                </div>
                <h1 className="mb-3 font-serif text-[clamp(1.8rem,4vw,3.4rem)] font-light leading-tight text-white">
                  {street}
                </h1>
                <p className="text-[15px] text-white/60">
                  {showAddress ? `${listing.address.city}, ${listing.address.state} ${listing.address.zip}` : listing.address.city}
                  {listing.address.neighborhood && listing.address.neighborhood !== listing.address.city && (
                    <span className="ml-2 text-white/35">· {listing.address.neighborhood}</span>
                  )}
                </p>
              </div>

              <div className="shrink-0 text-right">
                {listing.soldPrice ? (
                  <>
                    <p className="text-[12px] uppercase tracking-[0.2em] text-white/50 mb-1">Sold</p>
                    <p className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-none text-white">
                      {formatPrice(listing.soldPrice)}
                    </p>
                    <p className="mt-2 text-[14px] text-white/70">
                      Listed: {formatPrice(listing.listPrice)}
                    </p>
                    {(() => {
                      const diff = listing.soldPrice! - listing.listPrice;
                      const absDiff = Math.abs(diff);
                      if (absDiff < 100) return null;
                      return (
                        <p className={`mt-1 text-[13px] font-medium ${diff > 0 ? "text-green-400" : "text-red-400"}`}>
                          {diff > 0 ? "▲" : "▼"} {formatPrice(absDiff)} {diff > 0 ? "above" : "below"} asking
                        </p>
                      );
                    })()}
                    {listing.soldDate && (
                      <p className="mt-2 text-[13px] text-white/60">
                        Sale date: {new Date(listing.soldDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-none text-white">
                    {formatPrice(listing.listPrice)}
                  </p>
                )}
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/35">
                  MLS# {listing.mlsNumber}
                </p>
              </div>
            </div>

            {/* Quick stats bar */}
            {(det.numBedrooms || det.numBathrooms || det.sqft || listing.lot?.acres) && (
              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                {det.numBedrooms && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">{det.numBedrooms}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Bedrooms</p>
                  </div>
                )}
                {det.numBathrooms && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">
                      {det.numBathroomsHalf
                        ? `${det.numBathrooms}.${det.numBathroomsHalf > 0 ? "5" : "0"}`
                        : det.numBathrooms}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Bathrooms</p>
                  </div>
                )}
                {det.sqft && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">{Number(det.sqft).toLocaleString()}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Sq Ft</p>
                  </div>
                )}
                {listing.lot?.acres && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">{listing.lot.acres}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Acres</p>
                  </div>
                )}
                {listing.estimate?.value && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">{formatPrice(Math.round(listing.estimate.value))}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">Est. Value</p>
                  </div>
                )}
                {(listing.simpleDaysOnMarket ?? listing.daysOnMarket) > 0 && (
                  <div>
                    <p className="font-serif text-[1.8rem] font-light text-white">
                      {listing.simpleDaysOnMarket ?? listing.daysOnMarket}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                      {listing.soldPrice ? "Days on Market" : "Days Listed"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Photo Gallery */}
        {images.length > 0 && (
          <section className="bg-white py-10">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              {/* Main image */}
              <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-charcoal/5 shadow-[0_14px_50px_rgba(0,0,0,0.12)]">
                <Image
                  src={imgUrl(images[activeImg]) || ""}
                  alt={street}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="100vw"
                  priority
                  unoptimized
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-4 py-1.5 text-[11px] text-white/80 backdrop-blur-sm">
                      {activeImg + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-200 ${
                      activeImg === i
                        ? "ring-2 ring-charcoal ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl(img) || ""}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                      unoptimized
                    />
                    {!showAllPhotos && i === 8 && images.length > 9 && (
                      <div
                        onClick={(e) => { e.stopPropagation(); setShowAllPhotos(true); }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 text-[12px] font-medium text-white"
                      >
                        +{images.length - 9} more
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Listed By + Bought With attribution */}
              {(listing.agents?.length > 0 || listing.buyerAgents?.length) && (
                <div className="mt-5 flex flex-wrap gap-x-12 gap-y-3 border-t border-charcoal/8 pt-5">
                  {listing.agents?.length > 0 && (
                    <div className="flex items-start gap-4">
                      <span className="text-[12px] text-charcoal/80 shrink-0 pt-0.5">Listed By:</span>
                      <div className="flex flex-col gap-0.5">
                        {listing.agents.map((agent, i) => (
                          <span key={i} className="text-[13px]">
                            <span className="font-medium text-charcoal">{agent.name}</span>
                            {agent.brokerage?.name && (
                              <span className="text-charcoal/80">,&nbsp;{agent.brokerage.name}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {listing.buyerAgents && listing.buyerAgents.length > 0 && (
                    <div className="flex items-start gap-4">
                      <span className="text-[12px] text-charcoal/80 shrink-0 pt-0.5">Bought With:</span>
                      <div className="flex flex-col gap-0.5">
                        {listing.buyerAgents.map((agent, i) => (
                          <span key={i} className="text-[13px]">
                            <span className="font-medium text-charcoal">{agent.name}</span>
                            {agent.brokerage?.name && (
                              <span className="text-charcoal/80">,&nbsp;{agent.brokerage.name}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {listing.office?.brokerageName && !listing.agents?.some(a => a.brokerage?.name) && (
                    <span className="text-[13px] text-charcoal/80">{listing.office.brokerageName}</span>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Description + Details */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">

              {/* Left: description + details table */}
              <div>
                {det.description && (
                  <div className="mb-14">
                    <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-mid-gray">About This Home</p>
                    <p className="text-[16px] leading-[1.85] text-charcoal whitespace-pre-line">
                      {det.description.replace(/\*{4}\s*SAMPLE DATA\s*\*{4}/gi, "").trim()}
                    </p>
                  </div>
                )}

                {/* Listing Updated + Last Checked + Source */}
                <div className="mb-14 space-y-2 border-t border-charcoal/8 pt-6">
                  {listing.timestamps?.listingUpdated && (
                    <p className="text-[13px] text-charcoal">
                      <span className="font-medium text-charcoal/80">Listing Updated:</span>{" "}
                      {new Date(listing.timestamps.listingUpdated).toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                        hour: "numeric", minute: "2-digit", timeZoneName: "short",
                      })}
                    </p>
                  )}
                  {listing.timestamps?.idxUpdated && listing.timestamps.idxUpdated !== listing.timestamps.listingUpdated && (
                    <p className="text-[13px] text-charcoal">
                      <span className="font-medium text-charcoal/80">IDX Feed Updated:</span>{" "}
                      {new Date(listing.timestamps.idxUpdated).toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                        hour: "numeric", minute: "2-digit", timeZoneName: "short",
                      })}
                    </p>
                  )}
                  {listing.timestamps?.photosUpdated && (
                    <p className="text-[13px] text-charcoal">
                      <span className="font-medium text-charcoal/80">Photos Updated:</span>{" "}
                      {new Date(listing.timestamps.photosUpdated).toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </p>
                  )}
                  <p className="text-[13px] text-charcoal">
                    <span className="font-medium text-charcoal/80">OnSite last checked:</span>{" "}
                    {dataRefreshedAt
                      ? (() => {
                          const diff = Math.round((Date.now() - dataRefreshedAt.getTime()) / 60000);
                          return diff < 1 ? "just now" : `${diff} minute${diff === 1 ? "" : "s"} ago`;
                        })()
                      : "just now"}
                    <span className="mx-3 text-charcoal/40">|</span>
                    <span className="font-medium text-charcoal/80">Source:</span>{" "}
                    NWMLS as Distributed by MLS Grid #{listing.mlsNumber}
                  </p>
                  <p className="text-[12px] leading-[1.7] text-charcoal/80">
                    Listing provided courtesy of Northwest MLS. Information contained herein is derived from different sources but has not been independently verified by OnSite Real Estate Group, MLS Grid, or the MLS, and should be verified by the buyer. Open house information is subject to change without notice. All information should be independently reviewed and verified for accuracy. Properties may or may not be listed by the office or agent presenting the information.
                  </p>
                </div>

                {detailRows.length > 0 && (
                  <div>
                    <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Property Details</p>
                    <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                      {detailRows.map((row, i) => (
                        <div key={i} className="flex items-start justify-between border-b border-charcoal/8 py-3.5">
                          <span className="text-[13px] text-charcoal/80">{row.label}</span>
                          <span className="ml-4 text-right text-[13px] font-medium text-charcoal">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby amenities */}
                {(listing.nearby?.amenities?.length ?? 0) > 0 && (
                  <div className="mt-12">
                    <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Nearby & Community</p>
                    <div className="flex flex-wrap gap-2">
                      {listing.nearby?.amenities.map((a, i) => (
                        <span key={i} className="rounded-full border border-charcoal/20 px-4 py-2 text-[12px] text-charcoal">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Open Houses */}
                {listing.openHouse?.length > 0 && (
                  <div className="mt-12">
                    <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Open House</p>
                    <div className="space-y-3">
                      {listing.openHouse.map((oh, i) => {
                        const start = new Date(oh.startTime);
                        const end = new Date(oh.endTime);
                        const dateStr = start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                        const startTime = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                        const endTime = end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                        return (
                          <div key={i} className="flex items-start gap-4 rounded-2xl border border-charcoal/10 bg-[#f9f7f4] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal text-white text-[12px] font-medium">
                              {start.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                              <br className="hidden" />
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-charcoal">{dateStr}</p>
                              <p className="text-[13px] text-charcoal">{startTime} – {endTime}</p>
                              {oh.type && <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-charcoal/70">{oh.type}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Virtual tour */}
                {det.virtualTourUrl && (
                  <div className="mt-12">
                    <a
                      href={det.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition hover:border-charcoal/50"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                      Virtual Tour
                    </a>
                  </div>
                )}

                {/* Comparable Sales */}
                {listing.comparables && listing.comparables.length > 0 && (
                  <div className="mt-14">
                    <div className="mb-6 flex items-end justify-between">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray">Comparable Sales</p>
                      <p className="text-[11px] text-charcoal/60">
                        {listing.comparables.length} similar nearby {listing.comparables.length === 1 ? "property" : "properties"}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {listing.comparables.slice(0, 6).map((c) => {
                        const cStreet = [c.address?.streetNumber, c.address?.streetDirection, c.address?.streetName, c.address?.streetSuffix]
                          .filter(Boolean).join(" ");
                        const cPhoto = c.images?.[0]
                          ? (c.images[0].startsWith("http") ? c.images[0] : CDN + c.images[0])
                          : null;
                        return (
                          <Link
                            key={c.mlsNumber}
                            href={`/listings/${c.mlsNumber}`}
                            className="group flex gap-4 rounded-2xl border border-charcoal/10 bg-white p-3 transition hover:border-charcoal/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                          >
                            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-charcoal/5">
                              {cPhoto ? (
                                <Image src={cPhoto} alt={cStreet || c.mlsNumber} fill sizes="100px" className="object-cover" unoptimized />
                              ) : null}
                            </div>
                            <div className="flex flex-1 flex-col justify-between py-0.5">
                              <div>
                                <p className="font-serif text-[0.95rem] font-light leading-tight text-charcoal">
                                  {cStreet || `MLS# ${c.mlsNumber}`}
                                </p>
                                <p className="text-[11px] text-charcoal/60">
                                  {c.address?.city}, {c.address?.state}
                                  {c.distance ? ` · ${c.distance.toFixed(1)} mi` : ""}
                                </p>
                              </div>
                              <div className="flex items-center justify-between text-[12px]">
                                <span className="text-charcoal/80">
                                  {c.details?.numBedrooms ? `${c.details.numBedrooms}bd` : ""}
                                  {c.details?.numBathrooms ? ` · ${c.details.numBathrooms}ba` : ""}
                                  {c.details?.sqft ? ` · ${Number(c.details.sqft).toLocaleString()} sf` : ""}
                                </span>
                                <span className="font-serif font-light text-charcoal">
                                  {c.soldPrice ? formatPrice(c.soldPrice) : formatPrice(c.listPrice)}
                                  {c.lastStatus === "Sld" && <span className="ml-1 text-[10px] uppercase tracking-[0.15em] text-charcoal/50">sold</span>}
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-[11px] text-charcoal/60 italic not-italic">
                      Comparable sales are selected by Repliers.io based on proximity, size, and type — they are not part of the NWMLS listing data for this property.
                    </p>
                  </div>
                )}
              </div>

              {/* Right: sticky CTA card */}
              <div>
                <div className="sticky top-28 space-y-5">
                  {/* Price card */}
                  <div className="rounded-3xl bg-[#1a1a18] p-8 text-white">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.3em] text-white/50">
                      {isActive ? "Asking Price" : "Sold Price"}
                    </p>
                    <p className="mb-6 font-serif text-[2.4rem] font-light leading-none">
                      {formatPrice(listing.soldPrice || listing.listPrice)}
                    </p>
                    <div className="space-y-4">
                      <Link
                        href="/contact-us"
                        className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition hover:bg-white/90"
                      >
                        Request a Showing
                      </Link>
                      <a
                        href="tel:2534419764"
                        className="flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
                      >
                        (253) 441-9764
                      </a>
                      <Link
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-white/60 transition hover:bg-white/10 hover:text-white"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        View on Map
                      </Link>
                    </div>
                  </div>

                  {/* Agent card — listing agent(s) + buyer agent(s) */}
                  {(listing.agents?.length > 0 || listing.buyerAgents?.length) && (
                    <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-7 space-y-5">
                      {listing.agents?.length > 0 && (
                        <div>
                          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Listed By</p>
                          <div className="space-y-3">
                            {listing.agents.map((agent, i) => (
                              <div key={i} className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal/10 text-charcoal text-[12px] font-serif font-light">
                                  {agent.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                </div>
                                <div>
                                  <p className="font-serif text-[1rem] font-light text-charcoal">{agent.name}</p>
                                  {agent.brokerage?.name && (
                                    <p className="text-[12px] text-charcoal/80">{agent.brokerage.name}</p>
                                  )}
                                  {agent.phones?.[0] && (
                                    <a href={`tel:${agent.phones[0].replace(/\D/g, "")}`} className="text-[12px] text-charcoal/80 hover:text-charcoal transition-colors">
                                      {agent.phones[0]}
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {listing.buyerAgents && listing.buyerAgents.length > 0 && (
                        <div className="border-t border-charcoal/8 pt-5">
                          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Bought With</p>
                          <div className="space-y-3">
                            {listing.buyerAgents.map((agent, i) => (
                              <div key={i} className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal/10 text-charcoal text-[12px] font-serif font-light">
                                  {agent.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                </div>
                                <div>
                                  <p className="font-serif text-[1rem] font-light text-charcoal">{agent.name}</p>
                                  {agent.brokerage?.name && (
                                    <p className="text-[12px] text-charcoal/80">{agent.brokerage.name}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {listing.office?.brokerageName && (
                        <p className="text-[11px] text-charcoal/80 border-t border-charcoal/8 pt-4">
                          {listing.office.brokerageName}
                        </p>
                      )}
                    </div>
                  )}

                  {/* OnSite contact card */}
                  <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-7">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Questions? Contact OnSite</p>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-white text-[14px] font-light font-serif">
                        AB
                      </div>
                      <div>
                        <p className="font-serif text-[1.1rem] font-light text-charcoal">André Bohall</p>
                        <p className="text-[12px] text-charcoal/80">WA Lic. #25031564 · OnSite Real Estate Group</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2 text-[13px] text-charcoal">
                      <a href="tel:2534419764" className="flex items-center gap-2 hover:text-charcoal transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                        (253) 441-9764
                      </a>
                      <a href="mailto:andre@onsiteregroup.com" className="flex items-center gap-2 hover:text-charcoal transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        andre@onsiteregroup.com
                      </a>
                    </div>
                  </div>

                  {/* Estimate card */}
                  {listing.estimate?.value && (
                    <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-7">
                      <p className="mb-1 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Estimated Value</p>
                      <p className="font-serif text-[1.8rem] font-light text-charcoal">
                        {formatPrice(Math.round(listing.estimate.value))}
                      </p>
                      <p className="mt-1 text-[12px] text-charcoal/80">
                        Range: {formatPrice(Math.round(listing.estimate.low))} – {formatPrice(Math.round(listing.estimate.high))}
                      </p>

                      {/* 12-month history sparkline */}
                      {listing.estimate.history?.mth && Object.keys(listing.estimate.history.mth).length > 1 && (() => {
                        const entries = Object.entries(listing.estimate.history.mth)
                          .sort(([a], [b]) => a.localeCompare(b))
                          .slice(-12);
                        const values = entries.map(([, v]) => v.value);
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const range = max - min || 1;
                        const W = 260, H = 44, pad = 2;
                        const points = entries.map(([, v], i) => {
                          const x = pad + (i * (W - 2 * pad)) / Math.max(1, entries.length - 1);
                          const y = pad + (H - 2 * pad) * (1 - (v.value - min) / range);
                          return `${x.toFixed(1)},${y.toFixed(1)}`;
                        }).join(" ");
                        const first = entries[0][1].value;
                        const last = entries[entries.length - 1][1].value;
                        const change = ((last - first) / first) * 100;
                        return (
                          <div className="mt-4 border-t border-charcoal/8 pt-4">
                            <div className="mb-2 flex items-baseline justify-between">
                              <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60">12-Month Trend</p>
                              <p className={`text-[12px] font-medium ${change >= 0 ? "text-green-700" : "text-red-700"}`}>
                                {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
                              </p>
                            </div>
                            <svg viewBox={`0 0 ${W} ${H}`} className="h-11 w-full">
                              <polyline
                                fill="none"
                                stroke="#1a1a18"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={points}
                              />
                            </svg>
                          </div>
                        );
                      })()}

                      {listing.estimate.confidence !== null && listing.estimate.confidence !== undefined && (
                        <p className="mt-3 text-[11px] text-charcoal/70">
                          Confidence: {(listing.estimate.confidence * 100).toFixed(1)}%
                          {listing.estimate.date && (
                            <> · As of {new Date(listing.estimate.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>
                          )}
                        </p>
                      )}
                      <p className="mt-3 text-[11px] text-charcoal/80 border-t border-charcoal/8 pt-3">
                        Estimated value provided by Repliers.io — not sourced from NWMLS or MLS Grid.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City Residential Insights */}
        {cityStats && (cityStats.active || cityStats.sold) && (
          <section className="bg-white py-16 sm:py-20 border-t border-charcoal/8">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light text-charcoal">
                  {listing.address.city} Residential Insights
                </h2>
                <p className="text-[13px] leading-relaxed text-charcoal bg-[#f0ede8] rounded-xl px-5 py-3 max-w-md sm:text-right">
                  Market statistics and visualizations are provided by{" "}
                  <a href="https://repliers.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-charcoal/70">Repliers.com</a>{" "}
                  and are based on NWMLS data as Distributed by MLS Grid.
                </p>
              </div>

              {/* Chart + Gauge row */}
              {cityStats.chart && (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-8">
                  <MarketChart data={cityStats.chart} city={listing.address.city} />
                  {(() => {
                    const availMths = recentMonths(cityStats.active?.available?.mth, 1);
                    const latestAvail = availMths[availMths.length - 1];
                    const activeCount = latestAvail ? (cityStats.active?.available?.mth?.[latestAvail] ?? 0) : 0;
                    const closedMths = recentMonths(cityStats.sold?.closed?.mth, 3);
                    const avgMonthlySold = closedMths.length > 0
                      ? closedMths.reduce((sum, m) => sum + (cityStats.sold?.closed?.mth?.[m]?.count ?? 0), 0) / closedMths.length
                      : 1;
                    const monthsOfInventory = avgMonthlySold > 0 ? activeCount / avgMonthlySold : 0;
                    return <InventoryGauge months={monthsOfInventory} />;
                  })()}
                </div>
              )}

              {/* Stat cards */}
              {(() => {
                const soldMths = recentMonths(cityStats.sold?.soldPrice?.mth, 3);
                const newMths = recentMonths(cityStats.active?.new?.mth, 3);
                const closedMths = recentMonths(cityStats.sold?.closed?.mth, 3);
                const domMths = recentMonths(cityStats.sold?.daysOnMarket?.mth, 3);
                const availMths = recentMonths(cityStats.active?.available?.mth, 1);
                const latestAvail = availMths[availMths.length - 1];

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-1">Active Listings</p>
                      <p className="text-[2rem] font-serif font-light text-charcoal">
                        {latestAvail ? cityStats.active?.available?.mth?.[latestAvail] ?? "\u2014" : "\u2014"}
                        <span className="text-[13px] font-sans text-charcoal/70 ml-1">active listings</span>
                      </p>
                      {latestAvail && <p className="mt-1 text-[11px] text-charcoal/70">For {monthLabel(latestAvail)}</p>}
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-1">Median Sold Price</p>
                      <p className="text-[2rem] font-serif font-light text-charcoal">
                        {cityStats.sold?.soldPrice?.med ? formatPrice(cityStats.sold.soldPrice.med) : "\u2014"}
                      </p>
                      {soldMths.length > 0 && <p className="mt-1 text-[11px] text-charcoal/70">For {monthLabel(soldMths[soldMths.length - 1])}</p>}
                    </div>

                    <div className="rounded-2xl border border-charcoal/10 p-6">
                      <p className="text-[12px] text-charcoal/80 mb-3">Sales Volume</p>
                      <div className="flex gap-6">
                        {soldMths.map((m) => (
                          <div key={m}>
                            <p className="text-[1.2rem] font-serif font-light text-charcoal">{fmtCompact(cityStats.sold!.soldPrice.mth[m]?.sum ?? 0)}</p>
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
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">{cityStats.active!.new.mth[m]?.count ?? 0}</p>
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
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">{cityStats.sold!.closed.mth[m]?.count ?? 0}</p>
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
                            <p className="text-[1.5rem] font-serif font-light text-charcoal">{cityStats.sold!.daysOnMarket.mth[m]?.avg ?? 0}</p>
                            <p className="text-[10px] text-charcoal/70">{monthLabel(m)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* MLS Grid / NWMLS compliance */}
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
                  Listing data provided by NWMLS as distributed by MLS Grid.
                  {dataRefreshedAt && (
                    <> Data last refreshed: {dataRefreshedAt.toLocaleString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "numeric", minute: "2-digit", timeZoneName: "short",
                    })}.</>
                  )}
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/70 max-w-4xl">
                  Based on information submitted to the MLS Grid as of {dataRefreshedAt?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) ?? "today"}.
                  All data is obtained from various sources and may not have been verified by broker or MLS Grid.
                  Supplied Open House Information is subject to change without notice.
                  All information should be independently reviewed and verified for accuracy.
                  Properties may or may not be listed by the office/agent presenting the information.
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

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Interested in This Property?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Make It<br />Happen.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  The OnSite team is ready to walk you through this home, answer every question, and guide you to the closing table.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href="/listings"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    ← All Listings
                  </Link>
                </div>
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
