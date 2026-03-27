"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

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
    numBathrooms: number | null;
    numBathroomsHalf: number | null;
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
  };
  lot: {
    acres: number | null;
    squareFeet: number | null;
    features: string | null;
    size: string | null;
  } | null;
  taxes: { annualAmount: number | null; assessmentYear: string | null } | null;
  nearby: { amenities: string[] } | null;
  openHouse: { startTime: string; endTime: string; type: string }[];
  agents: {
    name: string;
    phones: string[];
    brokerage: { name: string };
  }[];
  office: { brokerageName: string } | null;
  estimate: { value: number; low: number; high: number; confidence: number } | null;
  images: string[];
  photoCount: number;
  condominium: { fees: { maintenance: number | null } } | null;
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

  useEffect(() => {
    if (!mlsNumber) return;
    fetch(`/api/listings/${mlsNumber}`)
      .then((r) => r.json())
      .then((data) => { setListing(data); setDataRefreshedAt(new Date()); setLoading(false); })
      .catch(() => setLoading(false));
  }, [mlsNumber]);

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

  const street = formatAddress(listing.address);
  const images = listing.images || [];
  const isActive = listing.status === "A";
  const det = listing.details;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`)}`;

  // Build details rows
  const detailRows: { label: string; value: string | number }[] = [];
  if (det.propertyType) detailRows.push({ label: "Property Type", value: det.propertyType });
  if (det.style) detailRows.push({ label: "Style", value: det.style });
  if (det.yearBuilt) detailRows.push({ label: "Year Built", value: det.yearBuilt });
  if (det.sqft) detailRows.push({ label: "Living Area", value: `${Number(det.sqft).toLocaleString()} sqft` });
  if (listing.lot?.squareFeet) detailRows.push({ label: "Lot Size", value: `${Number(listing.lot.squareFeet).toLocaleString()} sqft` });
  if (listing.lot?.acres) detailRows.push({ label: "Lot Acres", value: `${listing.lot.acres} ac` });
  if (det.numGarageSpaces) detailRows.push({ label: "Garage Spaces", value: det.numGarageSpaces });
  if (det.heating) detailRows.push({ label: "Heating", value: det.heating });
  if (det.airConditioning) detailRows.push({ label: "Cooling", value: det.airConditioning });
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
  if (det.landscapeFeatures) detailRows.push({ label: "Landscaping", value: det.landscapeFeatures });
  if (det.extras) detailRows.push({ label: "Extras", value: det.extras });
  detailRows.push({ label: "Days on Market", value: listing.simpleDaysOnMarket });
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
                  {listing.address.city}, {listing.address.state} {listing.address.zip}
                  {listing.address.neighborhood && listing.address.neighborhood !== listing.address.city && (
                    <span className="ml-2 text-white/35">· {listing.address.neighborhood}</span>
                  )}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-none text-white">
                  {formatPrice(listing.listPrice)}
                </p>
                {listing.soldPrice && (
                  <p className="mt-1 text-[13px] text-white/50">
                    Sold: {formatPrice(listing.soldPrice)}
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
                    <p className="text-[16px] leading-[1.85] text-charcoal/70 whitespace-pre-line">
                      {det.description.replace(/\*{4}\s*SAMPLE DATA\s*\*{4}/gi, "").trim()}
                    </p>
                  </div>
                )}

                {detailRows.length > 0 && (
                  <div>
                    <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Property Details</p>
                    <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                      {detailRows.map((row, i) => (
                        <div key={i} className="flex items-start justify-between border-b border-charcoal/6 py-3.5">
                          <span className="text-[13px] text-charcoal/45">{row.label}</span>
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
                        <span key={i} className="rounded-full border border-charcoal/12 px-4 py-2 text-[12px] text-charcoal/60">
                          {a}
                        </span>
                      ))}
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
                      className="inline-flex items-center gap-3 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal/60 transition hover:border-charcoal/50 hover:text-charcoal"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                      Virtual Tour
                    </a>
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

                  {/* Agent card */}
                  <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-7">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Listed With OnSite</p>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-white text-[14px] font-light font-serif">
                        AB
                      </div>
                      <div>
                        <p className="font-serif text-[1.1rem] font-light text-charcoal">André Bohall</p>
                        <p className="text-[12px] text-charcoal/45">WA Lic. #25031564 · Timber Real Estate</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2 text-[13px] text-charcoal/55">
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
                      <p className="mt-1 text-[12px] text-charcoal/40">
                        Range: {formatPrice(Math.round(listing.estimate.low))} – {formatPrice(Math.round(listing.estimate.high))}
                      </p>
                    </div>
                  )}
                </div>
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
                <p className="text-[12px] text-charcoal/50 font-medium">
                  Listing data provided by NWMLS as distributed by MLS Grid.
                  {dataRefreshedAt && (
                    <> Data last refreshed: {dataRefreshedAt.toLocaleString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "numeric", minute: "2-digit", timeZoneName: "short",
                    })}.</>
                  )}
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/35 max-w-4xl">
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
