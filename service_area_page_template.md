# City-Level Service Area Page (Hub) Template

## 1. Page Objective & Routing
Acts as the Tier 1 authoritative entity for a major municipality.
* **URL Structure:** `/service-areas/[city-slug]/`
* **Next.js Implementation:** `generateStaticParams` / `getStaticPaths` fetching a list of active cities from the database.

## 2. Component Architecture

### A. Hero Section
* **H1:** `Expert [Service] for [City], Washington`
* **Dynamic Data:** "Currently serving [Number] active projects in the [City] metro area."

### B. The Municipal Compliance Component `<CityRegulations />`
* **Content:** Specific, crawler-fetched data regarding building codes or regulations for this specific city.
* **Outbound Links:** 
    * `href="https://www.seattle.gov/sdci"` (If Seattle)
    * `href="https://www.cityoftacoma.org/government/city_departments/planning_and_development_services"` (If Tacoma)

### C. Live Infrastructure & Utility Integration `<LocalUtilities />`
* **Content:** Discuss coordination with local infrastructure. 
* **Dynamic Injection:** "We coordinate directly with [Puget Sound Energy / Seattle City Light / Tacoma Public Utilities] to ensure compliance."

### D. Neighborhood Spoke Directory (The Routing Matrix)
* **UI:** A robust, categorised grid linking to child pages.
* **Link Equity:** This section is the primary distributor of PageRank to the long-tail neighborhood pages.

### E. Dynamic Proof of Work `<CaseStudyGrid cityId={id} />`
* **Functionality:** Queries the database for completed jobs tagged with this specific city.
* **Assets:** Next.js `<Image />` component serving EXIF-scrubbed, WEBP-optimized photos of local projects.
