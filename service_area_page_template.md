# City-Level Service Area Page (Hub) Template

## 1) Objective, Routing, and Canonical Rules
Tier-1 authority page for each active service city.

- **Route:** `/service-areas/[city-slug]/`
- **Rendering:** static params from `getAllCitySlugs()`
- **Canonical host rule:** always non-`www` (single canonical origin used by metadata + sitemap)
- **Metadata baseline:** title, description, canonical, OpenGraph image

## 2) Hub Page Component Stack (Current Standard)

### A) Hero + Breadcrumb
- `<CityHero />` with city-specific intro + active project count.
- Breadcrumb trail visible and mirrored in `BreadcrumbList` JSON-LD.

### B) Municipal + Infrastructure Blocks
- `<CityRegulations />` with city-specific permitting/regulatory notes and outbound authority links.
- `<LocalUtilities />` with utility/provider links and local operational notes.
- Optional conditional sections by city feature flags:
  - `<SuburbanRegulations />`
  - `<UrbanLogistics />`
  - `<MicroClimate />`

### C) Neighborhood Spoke Directory
- `<NeighborhoodDirectory />` links all live neighborhood pages for this city.
- This remains the primary link-equity distributor for the neighborhood cluster.

### D) Cross-Cluster Internal Links
- "Other Service Areas" chips linking to peer city hubs.
- New bidirectional links to listings:
  - `/listings?city=[City]&state=WA`
  - `/listings?status=U&city=[City]&state=WA`

### E) Geo-Aware Conversion CTA
- `<ServiceAreaCTA />` now routes with area context:
  - `/free-home-evaluation?area=[City]`
  - `/contact-us?area=[City]&topic=selling`

## 3) Service Areas Index Enhancements (Hub-of-Hubs)

The `/service-areas` index now includes:

- Existing live city hubs + live neighborhood spokes
- Planned metro corridor stubs (listed only, no routes yet):
  - 5 larger cities from Puyallup to Seattle
  - 3 neighborhood stubs per city
- Coverage map section:
  - Google map embed for Pierce/King corridor context
  - ZIP chips for quick map lookup links

## 4) Schema Depth (Required)

City pages should emit:

- `OrganizationSchema` (`RealEstateAgent`)
- `WebPageSchema`
- `BreadcrumbList`
- `Service` (city `areaServed`)
- `Place` (city geo)

## 5) Case Study Status

`<CityCaseStudies />` remains intentionally disabled until MLS approval and production (non-test) data is live.

Do not re-enable with test data.
