# Neighborhood-Level Service Area Page (Spoke) Template

## 1) Objective, Routing, and Canonical Rules
Hyper-local spoke page for long-tail neighborhood + ZIP intent.

- **Route:** `/service-areas/[city-slug]/[neighborhood-slug]/`
- **Rendering:** static params from `getAllNeighborhoodParams()`
- **Canonical host rule:** always non-`www`

## 2) Spoke Page Component Stack (Current Standard)

### A) Hyper-Local Hero + Breadcrumb
- `<NeighborhoodHero />` with neighborhood-specific intro copy.
- Breadcrumb chain:
  - Home → Service Areas → City → Neighborhood
- Must match `BreadcrumbList` schema.

### B) Community + Governance Layer
- `<NeighborhoodGovernance />` for housing character, styles, local org links.

### C) Local Dispatch/Logistics Layer
- `<DispatchLogistics />` with real thoroughfares/landmarks/transit references.

### D) Local Proof + Adjacent Mesh
- `<LocalReviews />` with neighborhood/ZIP-relevant quotes.
- `<AdjacentAreas />` links nearby service areas to tighten semantic cluster.

### E) Bidirectional Listing Link
- Include a direct link to filtered listings:
  - `/listings?city=[City]&state=WA`

### F) Back-to-City + Geo CTA
- Back-link to parent city service area hub.
- `<ServiceAreaCTA />` with neighborhood-aware query params:
  - `/free-home-evaluation?area=[Neighborhood], [City]`
  - `/contact-us?area=[Neighborhood], [City]&topic=selling`

## 3) Schema Payload (JSON-LD)

Neighborhood pages should emit:

- `OrganizationSchema` (`RealEstateAgent`)
- `WebPageSchema`
- `BreadcrumbList`
- `Service` (`areaServed` by ZIP/postal array)
- `Place` (neighborhood geo center)

## 4) Notes on Planned Neighborhood Stubs

Additional neighborhoods may be listed on `/service-areas` before full page rollout.

- Stub neighborhoods should be listed as "planned" only.
- Do not generate routes until copy, links, and schema are complete.
