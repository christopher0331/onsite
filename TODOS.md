# OnSite Regroup — Dev Todos
> Sourced from recording: Christopher Hancock & Patrick Arlia — Apr 3 2026

---

## 🔴 MLS Compliance (Required)

- [x] **Address privacy** — Check `permissions.displayAddressOnInternet` on each listing. If `false`, display "Undisclosed" in place of street address on cards AND detail pages.
- [x] **"Bought With" attribution** — On sold listings, show buyer agent(s) alongside "Listed By". Both present below photos and in sidebar.
- [x] **Open house disclosure** — Open house section added to listing detail page left column.
- [x] **Derivative data attribution** — Estimate card now says "Estimated value provided by Repliers.io — not sourced from NWMLS or MLS Grid."
- [x] **Data refresh timestamp** — Verified present on all 5 pages that display listing data (`/listings`, `/listings/[mlsNumber]`, `/featured-homes/[slug]`, `/sold-homes/[slug]`, `MLSGridTimestamp` component).

---

## 🟠 UI / Visibility Fixes

- [x] **Card text contrast** — Darkened all secondary text on listing cards (city/state, bed/bath labels, property type, MLS#).
- [x] **MLS footer disclaimer legibility** — Header line now `text-charcoal` (full black), body disclaimer now `text-charcoal/70`. Fixed in both `/listings` and `/listings/[mlsNumber]`.
- [x] **Consistent listing template** — Active, sold, and "Our Listings" tab all use the same `ListingCard` component and same detail page template.

---

## 🟡 Listing Detail Page

- [x] **Add `buyerAgents` type + display** — Added to type definition, renders "Bought With" in sidebar and below-photo attribution line.
- [x] **Estimate source label** — Shows "Estimated value provided by Repliers.io — not sourced from NWMLS or MLS Grid."

---

## � Market Insights & Charts

- [x] **Statistics API** — `/api/statistics` supports `county`, `city`, `neighborhood` params + `chart=true` for 2-year monthly data.
- [x] **Listings page stat cards** — 6-card grid (Active Listings, Median Sold Price, Sales Volume, New Listings, Residential Sold, DOM) on Market Search tab, updates per county.
- [x] **Listing detail page insights** — Full "{City} Residential Insights" section with stat cards scoped to the listing's city.
- [x] **Sold Price & DOM line chart** — `MarketChart.tsx` using recharts, 2yr monthly dual-axis (price left, DOM right).
- [x] **Inventory gauge** — `InventoryGauge.tsx` SVG gauge showing months of inventory with seller/balanced/buyer labels.
- [x] **Derivative data disclaimer** — "Market statistics and visualizations are provided by Repliers.com and are based on NWMLS data as Distributed by MLS Grid" on both pages.
- [x] **Full MLS Grid disclaimer** — Expanded footer text matching reference site (open house info, verification, etc.).

---

## �🟢 General / Future

- [ ] Send Patrick the finished template for a final MLS Grid compliance scan before go-live.
- [x] Confirm query cost model with Repliers (confirmed: 1M requests/month on subscription — refreshing per page visit is fine).
