"use client";

import type { FormEvent } from "react";
import FilterPopover from "@/components/FilterPopover";
import LocationSearchInput from "@/components/LocationSearchInput";
import Modal from "@/components/Modal";

const STATUS_FILTERS = [
  { label: "All", value: "All" },
  { label: "Active", value: "A" },
  { label: "Pending", value: "P" },
  { label: "Sold", value: "U" },
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

export type ListingsFilterToolbarProps = {
  variant: "hero" | "map";
  city: string;
  setCity: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  propertyType: string[];
  setPropertyType: (value: string[]) => void;
  minBeds: string;
  setMinBeds: (value: string) => void;
  maxBeds: string;
  setMaxBeds: (value: string) => void;
  minBaths: string;
  setMinBaths: (value: string) => void;
  maxBaths: string;
  setMaxBaths: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minSqft: string;
  setMinSqft: (value: string) => void;
  maxSqft: string;
  setMaxSqft: (value: string) => void;
  minYearBuilt: string;
  setMinYearBuilt: (value: string) => void;
  maxYearBuilt: string;
  setMaxYearBuilt: (value: string) => void;
  minLotSize: string;
  setMinLotSize: (value: string) => void;
  maxLotSize: string;
  setMaxLotSize: (value: string) => void;
  garageSpots: string;
  setGarageSpots: (value: string) => void;
  homeFeatures: string[];
  setHomeFeatures: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  mlsInput: string;
  setMlsInput: (value: string) => void;
  mlsSearch: string;
  stateFilter: string;
  setStateFilter: (value: string) => void;
  isMoreFiltersOpen: boolean;
  setIsMoreFiltersOpen: (value: boolean) => void;
  handleMlsSubmit: (e: FormEvent) => void;
  clearMlsSearch: () => void;
  applyRegularFilters: (closeModal?: boolean) => void;
  handleSelectAddress: (mlsNumber: string) => void;
  handleSelectCity: (selectedCity: string, selectedState: string) => void;
  onClearAll: () => void;
};

function filterStyles(variant: "hero" | "map") {
  const light = variant === "map";
  return {
    popoverVariant: light ? ("light" as const) : ("hero" as const),
    mobileInput:
      "w-full rounded-full border px-5 py-3 text-[14px] focus:outline-none " +
      (light
        ? "border-charcoal/20 bg-white text-charcoal placeholder:text-charcoal/45 focus:border-charcoal"
        : "border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-white focus:bg-white focus:text-charcoal focus:placeholder:text-charcoal/50"),
    desktopPill:
      "relative hidden items-center rounded-full border transition-all group sm:flex " +
      (light
        ? "border-charcoal/20 bg-white focus-within:border-charcoal"
        : "border-white/20 bg-white/5 focus-within:border-white focus-within:bg-white"),
    desktopInput:
      "w-full bg-transparent px-5 py-2.5 text-[13px] focus:outline-none " +
      (light
        ? "text-charcoal placeholder:text-charcoal/45 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/45"
        : "text-white placeholder:text-white/50 focus:text-charcoal focus:placeholder:text-charcoal/50 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/50"),
    desktopDivider: light ? "h-6 w-px bg-charcoal/15" : "h-6 w-px bg-white/20 group-focus-within:bg-charcoal/10",
    mlsInput:
      "bg-transparent px-5 py-2.5 pr-12 text-[13px] focus:outline-none " +
      (light
        ? "w-32 text-charcoal placeholder:text-charcoal/45 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/45"
        : "w-32 text-white placeholder:text-white/50 focus:text-charcoal focus:placeholder:text-charcoal/50 group-focus-within:text-charcoal group-focus-within:placeholder:text-charcoal/50"),
    clearMlsButton:
      "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full transition " +
      (light
        ? "right-2 h-6 w-6 text-charcoal/40 hover:bg-charcoal/5 hover:text-charcoal"
        : "right-2 h-6 w-6 text-white/50 hover:bg-white/10 hover:text-white group-focus-within:text-charcoal/40 group-focus-within:hover:bg-charcoal/5 group-focus-within:hover:text-charcoal"),
    mobileClearMls:
      "absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full " +
      (light ? "text-charcoal/40 hover:bg-charcoal/5 hover:text-charcoal" : "text-white/50 hover:bg-white/10 hover:text-white"),
    allFiltersButton: (open: boolean) =>
      `flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-wide whitespace-nowrap transition-all ${
        open
          ? "border-[#3daf3d] bg-[#3daf3d]/20 text-[#3daf3d]"
          : light
            ? "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/35 hover:bg-charcoal/5"
            : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
      }`,
    stateSelect:
      "shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-medium transition-all focus:outline-none appearance-none " +
      (light
        ? "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/35 hover:bg-charcoal/5"
        : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"),
  };
}

export default function ListingsFilterToolbar(props: ListingsFilterToolbarProps) {
  const {
    variant,
    city,
    setCity,
    status,
    setStatus,
    propertyType,
    setPropertyType,
    minBeds,
    setMinBeds,
    minBaths,
    setMinBaths,
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
    onClearAll,
  } = props;

  const styles = filterStyles(variant);
  const idSuffix = variant;

  return (
    <div className="relative z-40 flex flex-col gap-4">
      <div className="flex w-full flex-col gap-2.5 sm:hidden">
        <LocationSearchInput
          value={city}
          onValueChange={setCity}
          onSelectAddress={handleSelectAddress}
          onSelectCity={handleSelectCity}
          onEnterNoSelection={() => applyRegularFilters(false)}
          state={stateFilter}
          placeholder="Address, city, or ZIP"
          listboxId={`listings-search-mobile-${idSuffix}`}
          inputClassName={styles.mobileInput}
        />
        <form onSubmit={handleMlsSubmit} className="relative w-full">
          <input
            type="text"
            value={mlsInput}
            onChange={(e) => setMlsInput(e.target.value)}
            placeholder="MLS #"
            className={`${styles.mobileInput} pr-16`}
          />
          {mlsInput.trim() !== mlsSearch && mlsInput.trim().length > 0 ? (
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full bg-[#3daf3d] px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#3daf3d]/90"
            >
              Go
            </button>
          ) : mlsSearch ? (
            <button type="button" onClick={clearMlsSearch} className={styles.mobileClearMls}>
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
        </form>
      </div>

      <div className="w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max max-w-none items-center gap-2 sm:w-auto sm:flex-wrap">
          <div className={styles.desktopPill}>
            <LocationSearchInput
              value={city}
              onValueChange={setCity}
              onSelectAddress={handleSelectAddress}
              onSelectCity={handleSelectCity}
              onEnterNoSelection={() => applyRegularFilters(false)}
              state={stateFilter}
              placeholder="Address, City, Zip"
              listboxId={`listings-search-desktop-${idSuffix}`}
              wrapperClassName="relative w-48 sm:w-64"
              dropdownMinWidthPx={380}
              inputClassName={styles.desktopInput}
            />
            <div className={styles.desktopDivider} />
            <form onSubmit={handleMlsSubmit} className="relative m-0 p-0">
              <input
                type="text"
                value={mlsInput}
                onChange={(e) => setMlsInput(e.target.value)}
                placeholder="MLS #"
                className={styles.mlsInput}
              />
              {mlsInput.trim() !== mlsSearch && mlsInput.trim().length > 0 ? (
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 rounded-full bg-[#3daf3d] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#3daf3d]/90"
                >
                  Go
                </button>
              ) : mlsSearch ? (
                <button type="button" onClick={clearMlsSearch} className={styles.clearMlsButton}>
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                  </svg>
                </button>
              ) : null}
            </form>
          </div>

          <FilterPopover
            variant={styles.popoverVariant}
            label={status === "A" ? "For Sale" : status === "P" ? "Pending" : status === "U" ? "Sold" : "All Status"}
            isActive={status !== "A"}
          >
            <div className="flex flex-col gap-2">
              {STATUS_FILTERS.map((f) => (
                <label key={f.value} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-charcoal/5">
                  <input
                    type="radio"
                    name={`status-${idSuffix}`}
                    value={f.value}
                    checked={status === f.value}
                    onChange={() => setStatus(f.value)}
                    className="h-4 w-4 cursor-pointer border-charcoal/20 text-[#3daf3d] focus:ring-[#3daf3d]"
                  />
                  <span className="text-[14px] text-charcoal">{f.label}</span>
                </label>
              ))}
            </div>
          </FilterPopover>

          <FilterPopover
            variant={styles.popoverVariant}
            label={
              minPrice || maxPrice
                ? `${minPrice ? `$${Number(minPrice) / 1000}k` : "$0"} - ${maxPrice ? `$${Number(maxPrice) / 1000}k` : "Any"}`
                : "Price"
            }
            isActive={!!minPrice || !!maxPrice}
          >
            <div className="flex items-center gap-4 p-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wider text-charcoal/50">Minimum</label>
                <select
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-32 rounded-lg border border-charcoal/20 p-2 text-[14px] focus:border-charcoal focus:outline-none"
                >
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
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-32 rounded-lg border border-charcoal/20 p-2 text-[14px] focus:border-charcoal focus:outline-none"
                >
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

          <FilterPopover
            variant={styles.popoverVariant}
            label={
              minBeds || minBaths
                ? `${minBeds ? `${minBeds}+ Beds` : "Any Beds"}, ${minBaths ? `${minBaths}+ Baths` : "Any Baths"}`
                : "Beds & Baths"
            }
            isActive={!!minBeds || !!minBaths}
          >
            <div className="flex min-w-[300px] flex-col gap-6 p-2">
              <div>
                <p className="mb-3 text-[14px] font-medium text-charcoal">Bedrooms</p>
                <div className="flex overflow-hidden rounded-lg border border-charcoal/20">
                  {["", "1", "2", "3", "4", "5"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMinBeds(val)}
                      className={`flex-1 border-r border-charcoal/20 py-2 text-center text-[14px] transition last:border-r-0 ${
                        minBeds === val ? "bg-[#3daf3d]/10 font-bold text-[#3daf3d]" : "bg-white text-charcoal hover:bg-charcoal/5"
                      }`}
                    >
                      {val === "" ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-medium text-charcoal">Bathrooms</p>
                <div className="flex overflow-hidden rounded-lg border border-charcoal/20">
                  {["", "1", "2", "3", "4"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMinBaths(val)}
                      className={`flex-1 border-r border-charcoal/20 py-2 text-center text-[14px] transition last:border-r-0 ${
                        minBaths === val ? "bg-[#3daf3d]/10 font-bold text-[#3daf3d]" : "bg-white text-charcoal hover:bg-charcoal/5"
                      }`}
                    >
                      {val === "" ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FilterPopover>

          <FilterPopover
            variant={styles.popoverVariant}
            label={propertyType.length > 0 ? `${propertyType.length} Selected` : "Home Type"}
            isActive={propertyType.length > 0}
          >
            <div className="grid min-w-[320px] grid-cols-2 gap-3 p-2">
              {HOME_TYPE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition ${
                    propertyType.includes(opt.value)
                      ? "border-[#3daf3d] bg-[#3daf3d]/5 text-[#3daf3d]"
                      : "border-charcoal/10 bg-white text-charcoal hover:border-charcoal/30"
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
                  <span className="text-[14px] font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterPopover>

          <button
            type="button"
            onClick={() => setIsMoreFiltersOpen(true)}
            className={styles.allFiltersButton(isMoreFiltersOpen)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            All Filters
          </button>

          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className={styles.stateSelect}>
            <option value="" className="bg-white text-charcoal">
              All States
            </option>
            <option value="WA" className="bg-white text-charcoal">
              WA
            </option>
            <option value="OR" className="bg-white text-charcoal">
              OR
            </option>
            <option value="CA" className="bg-white text-charcoal">
              CA
            </option>
          </select>

          <button
            type="button"
            onClick={() => applyRegularFilters(false)}
            className="shrink-0 rounded-full bg-[#3daf3d] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3daf3d]/90"
          >
            Go
          </button>
        </div>
      </div>

      <Modal
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        title="All Filters"
        footer={
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="text-[14px] font-medium text-charcoal/60 underline underline-offset-4 hover:text-charcoal"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => applyRegularFilters(true)}
              className="rounded-full bg-[#3daf3d] px-8 py-3 text-[14px] font-bold text-white transition hover:bg-[#3daf3d]/90"
            >
              Apply Filters
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-10">
          <section>
            <h3 className="mb-5 text-[18px] font-bold text-charcoal">Home type</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HOME_TYPE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex min-h-[64px] cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-[14px] font-medium transition ${
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

          <section>
            <h3 className="mb-5 text-[18px] font-bold text-charcoal">Property details</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-charcoal">Square feet</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    placeholder="No min"
                    value={minSqft}
                    onChange={(e) => setMinSqft(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                  <span className="text-charcoal/30">-</span>
                  <input
                    type="number"
                    min={1}
                    placeholder="No max"
                    value={maxSqft}
                    onChange={(e) => setMaxSqft(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-charcoal">Lot size (sqft)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    placeholder="No min"
                    value={minLotSize}
                    onChange={(e) => setMinLotSize(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                  <span className="text-charcoal/30">-</span>
                  <input
                    type="number"
                    min={1}
                    placeholder="No max"
                    value={maxLotSize}
                    onChange={(e) => setMaxLotSize(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-charcoal">Year built</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1800}
                    max={2100}
                    placeholder="No min"
                    value={minYearBuilt}
                    onChange={(e) => setMinYearBuilt(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                  <span className="text-charcoal/30">-</span>
                  <input
                    type="number"
                    min={1800}
                    max={2100}
                    placeholder="No max"
                    value={maxYearBuilt}
                    onChange={(e) => setMaxYearBuilt(e.target.value)}
                    className="w-full rounded-lg border border-charcoal/20 p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-charcoal/10" />

          <section>
            <h3 className="mb-5 text-[18px] font-bold text-charcoal">Home features</h3>
            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-medium text-charcoal">Garage spots</label>
              <div className="inline-flex overflow-hidden rounded-lg border border-charcoal/20">
                {["Any", "1+", "2+", "3+", "4+", "5+"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setGarageSpots(val)}
                    className={`border-r border-charcoal/20 px-4 py-2 text-center text-[14px] transition last:border-r-0 ${
                      garageSpots === val ? "bg-[#3daf3d]/10 font-bold text-[#3daf3d]" : "bg-white text-charcoal hover:bg-charcoal/5"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Air conditioning",
                "Waterfront",
                "Has a view",
                "Fireplace",
                "Fixer / opportunity",
                "ADU / MIL / multigen",
                "Elevator",
                "Basement",
                "Washer/dryer hookup",
                "Pets allowed",
                "Primary on main",
                "RV parking / storage",
                "Green home",
                "Accessible home",
              ].map((feat) => (
                <label key={feat} className="group flex cursor-pointer items-center gap-3">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                      homeFeatures.includes(feat)
                        ? "border-[#3daf3d] bg-[#3daf3d] text-white"
                        : "border-charcoal/30 group-hover:border-[#3daf3d]"
                    }`}
                  >
                    {homeFeatures.includes(feat) && (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
                      else setHomeFeatures(homeFeatures.filter((f) => f !== feat));
                    }}
                  />
                  <span className="text-[15px] text-charcoal">{feat}</span>
                </label>
              ))}
            </div>
          </section>

          <hr className="border-charcoal/10" />

          <section>
            <h3 className="mb-5 text-[18px] font-bold text-charcoal">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-charcoal/20 bg-white p-2.5 text-[14px] focus:border-charcoal focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </section>
        </div>
      </Modal>
    </div>
  );
}
