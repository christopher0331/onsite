# Neighborhood-Level Service Area Page (Spoke) Template

## 1. Page Objective & Routing
The hyper-local conversion engine targeting exact-match intent and long-tail zip code searches.
* **URL Structure:** `/service-areas/[city-slug]/[neighborhood-slug]/`

## 2. Component Architecture

### A. Hyper-Local Hero
* **H1:** `Dedicated [Service] for [Neighborhood] Residents`
* **Breadcrumbs:** `Home > Service Areas > [City] > [Neighborhood]` (Strict `BreadcrumbList` Schema implementation).

### B. The Community Authority Matrix `<NeighborhoodGovernance />`
* **Content:** Details on specific neighborhood characteristics (age of homes, common architectural styles).
* **Outbound Links:** Must link to local entities. 
    * *Example:* If the page is White Center, link to the White Center Community Development Association.

### C. Local Logistics & Proximity `<DispatchLogistics />`
* **Content:** Proves physical reality to Google's NLP.
* **Dynamic Injection:** Mentions local thoroughfares or transit.
    * *Example:* "Routinely dispatching crews via [Hwy 509 / I-5] or serving properties near the [King County Water Taxi / Local Landmark]."

### D. Sibling Cross-Linking `<AdjacentAreas />`
* **UI:** Links to 3-4 bordering neighborhoods to create a tight semantic cluster.
* *Example:* A White Center page cross-links to Burien, Delridge, and West Seattle.

### E. Micro-Local Proof of Work `<LocalReviews zipCodes={zipArray} />`
* **Functionality:** Filters the review/portfolio database to only show testimonials from the specific zip codes tied to this neighborhood.

## 3. Schema Payload (JSON-LD)
* **`Service` Schema:** Define `areaServed` explicitly using an array of the neighborhood's specific `postalCode`s.
* **`Place` Schema:** Embed coordinates (`geo`) for the exact center of the neighborhood.
