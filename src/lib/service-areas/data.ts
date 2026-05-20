// Service Area Data Lake — Curated Seed
//
// In the production architecture (see overall_seo_strategy_guide.md), this
// file is replaced by a JSON payload emitted by the municipal/zoning crawlers
// + Headless CMS. For this initial Tier-1 launch we ship a hand-curated set
// covering 3 city hubs + 1 spoke each.
//
// NOTE on uniqueness: each city deliberately enables a *different* subset of
// the conditional component flags so the rendered DOM is structurally unique
// across pages, satisfying the Anti-Doorway Framework.

import type { City, Neighborhood } from "./types";

export const CITIES: City[] = [
  {
    slug: "puyallup",
    name: "Puyallup",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 42_973,
    zipCodes: ["98371", "98372", "98373", "98374", "98375"],
    geo: { lat: 47.1854, lng: -122.2929 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    heroEyebrow: "Service Area · Pierce County",
    heroIntro:
      "From the historic downtown core to the South Hill bench, our team operates as a dedicated Puyallup real-estate desk — pricing strategy, prep, and negotiation calibrated to this exact submarket.",
    activeProjects: 14,
    permittingOffice: {
      name: "City of Puyallup Development & Permitting Services",
      url: "https://www.cityofpuyallup.org/313/Development-Services",
      context:
        "Single-family permits, ADU review, and SEPA threshold determinations are issued here.",
    },
    utilities: [
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service across Puyallup.",
      },
      {
        name: "Puyallup Public Works — Water & Sewer",
        url: "https://www.cityofpuyallup.org/153/Public-Works",
        context: "Municipal water, side-sewer connections, and stormwater.",
      },
    ],
    chamberOfCommerce: {
      name: "Puyallup Sumner Chamber of Commerce",
      url: "https://www.puyallupsumnerchamber.com/",
    },
    regulations: [
      {
        title: "Historic District Overlay (Downtown)",
        description:
          "Properties inside the downtown overlay are subject to design-review for exterior alterations and signage. We coordinate with Puyallup's Development & Permitting Services so listings disclose overlay status upfront.",
      },
      {
        title: "Critical Areas — Clarks Creek & Aquifer Recharge",
        description:
          "Lots within the Clarks Creek riparian buffer or designated aquifer-recharge zones trigger additional review. Our pre-list checklist flags these on the title commitment before photos are scheduled.",
      },
      {
        title: "Accessory Dwelling Units",
        description:
          "Puyallup permits both attached and detached ADUs on most R-1/R-2 parcels. We routinely position ADU-eligible lots in marketing to widen the qualified-buyer pool.",
      },
    ],
    utilityNotes: [
      {
        name: "Puget Sound Energy",
        description:
          "We coordinate directly with PSE for natural-gas locates and meter relocations before any pre-list grading or staging is scheduled.",
      },
      {
        name: "Puyallup Public Works",
        description:
          "Side-sewer side-card pulls and water-meter sizing are confirmed before list price is set on properties with additions or ADUs.",
      },
    ],
    caseStudies: [
      {
        title: "Single-Story Home in Gem Heights, Puyallup",
        image:
          "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
        href: "/sold-homes/single-story-home-in-gem-heights-puyallup",
        badge: "Sold · Puyallup",
      },
      {
        title: "Charming Downtown Puyallup Home",
        image:
          "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
        href: "/featured-homes/charming-downtown-puyallup-home",
        badge: "Featured · Puyallup",
      },
    ],
    features: {
      suburbanRegulations: true,
      microClimate: true,
    },
    microClimate: {
      annualRainfallInches: 42,
      avgWinterLowF: 34,
      avgSummerHighF: 81,
      serviceImpact:
        "The Puyallup Valley's fall rainfall pattern compresses the exterior-prep window — we schedule paint, pressure-wash, and roof inspections in late August so listings hit the market dry and photo-ready.",
    },
    suburban: {
      typicalLotSize: "0.18 – 0.35 acres in established neighborhoods; up to 1 acre on the bench.",
      hoaNotes:
        "Newer developments on South Hill carry HOAs with paint, fence, and rental restrictions we vet before listing.",
    },
  },
  {
    slug: "bonney-lake",
    name: "Bonney Lake",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 23_133,
    zipCodes: ["98391"],
    geo: { lat: 47.1762, lng: -122.1865 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg",
    heroEyebrow: "Service Area · Plateau",
    heroIntro:
      "We've made the Bonney Lake plateau our home base. From lakefront craftsman properties on Lake Tapps to the master-planned communities along SR-410, our pricing models are built on the local comp set — not a county-wide average.",
    activeProjects: 9,
    permittingOffice: {
      name: "City of Bonney Lake — Community Development",
      url: "https://www.cityofbonneylake.org/",
      context: "Building permits, short-plat review, and shoreline determinations.",
    },
    utilities: [
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
      {
        name: "Bonney Lake Public Works",
        url: "https://www.cityofbonneylake.org/",
        context: "Municipal water; many plateau properties remain on septic systems.",
      },
    ],
    regulations: [
      {
        title: "Shoreline Master Program (Lake Tapps)",
        description:
          "Lake Tapps frontage is regulated under the Shoreline Management Act. Bulkhead repair, dock work, and within-buffer landscaping all require permits we sequence ahead of listing date.",
      },
      {
        title: "Septic & Drain-Field Verification",
        description:
          "A meaningful share of plateau homes are on Tacoma–Pierce County Health Department septic permits. We require a current Operation & Maintenance inspection on file before going active.",
      },
      {
        title: "Tehaleh Master Plan / Plateau Communities",
        description:
          "Homes inside Tehaleh, Falling Water, and similar master-planned communities have CC&Rs governing exterior color, fencing, and rental status. We pull the resale certificate during the disclosure window.",
      },
    ],
    utilityNotes: [
      {
        name: "Puget Sound Energy",
        description:
          "We coordinate with PSE on transformer load checks before any heated-pool or EV-charger upgrade is photographed for the listing.",
      },
      {
        name: "Tacoma–Pierce County Health Department",
        description:
          "Septic Operation & Maintenance reports and drain-field tags are sourced and pre-cleared before inspection contingencies open.",
      },
    ],
    caseStudies: [
      {
        title: "Entertainer's Dream Home with Pickleball Court on 1.2 Acres",
        image:
          "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
        href: "/featured-homes/entertainers-dream-home-with-pickleball-court-on-1-2-acre",
        badge: "Featured · Bonney Lake",
      },
    ],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.25 – 1.5 acres; lakefront and acreage parcels are common.",
      septicNotes:
        "Most plateau properties outside the city core operate on septic, with O&M cycles every 1–3 years depending on system type.",
      hoaNotes:
        "Tehaleh, Falling Water, and Eastown communities carry active HOAs with transfer fees and design-review boards.",
    },
  },
  {
    slug: "sumner",
    name: "Sumner",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 10_621,
    zipCodes: ["98390"],
    geo: { lat: 47.2032, lng: -122.2407 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
    heroEyebrow: "Service Area · Sumner Valley",
    heroIntro:
      "Sumner is a small town with downtown DNA — historic homes, Main Street character, and farmland on the edge. Our positioning here leans into Sumner's walkable identity and Sounder commuter access, two attributes the broader Pierce comp set tends to undervalue.",
    activeProjects: 6,
    permittingOffice: {
      name: "City of Sumner — Community Development",
      url: "https://sumnerwa.gov/",
      context: "Building permits, historic-design review, and SEPA review.",
    },
    utilities: [
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
      {
        name: "City of Sumner Water & Sewer",
        url: "https://sumnerwa.gov/",
        context: "Municipal water and side-sewer connections.",
      },
    ],
    regulations: [
      {
        title: "Downtown Historic District",
        description:
          "Main Street and several blocks of cross-streets fall inside Sumner's historic district. Exterior changes — window replacement, paint color, porch modifications — go through design review before list-ready photos are produced.",
      },
      {
        title: "Floodplain Awareness (White & Stuck Rivers)",
        description:
          "Portions of Sumner sit inside FEMA-mapped flood zones. We pull the elevation certificate (or flag its absence) before pricing — buyers' lenders will require it and we'd rather solve it on day one.",
      },
    ],
    utilityNotes: [
      {
        name: "Puget Sound Energy",
        description:
          "Historic-district properties frequently need PSE coordination for service-drop upgrades before modern kitchen or HVAC scopes are signed off.",
      },
      {
        name: "Sound Transit / Sounder",
        description:
          "Proximity to the Sumner Sounder station is a real pricing input. We model commute-to-Seattle on the listing comp set rather than treating it as a soft selling point.",
      },
    ],
    caseStudies: [
      {
        title: "Modern Home in Thriving Sumner Valley",
        image:
          "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
        href: "/sold-homes/modern-home-in-thriving-sumner-valley",
        badge: "Sold · Sumner",
      },
      {
        title: "Modern Home in Sumner Valley",
        image:
          "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
        href: "/sold-homes/modern-home-in-sumner-valley",
        badge: "Sold · Sumner",
      },
    ],
    features: {
      urbanLogistics: true,
    },
    urban: {
      parking:
        "Main Street parking is metered and constrained; we stage open houses with a documented parking plan and overflow lot.",
      permitOverlay:
        "Historic Design Review is required for any exterior modification visible from the right-of-way.",
      noiseOrdinance:
        "Construction and contractor noise inside the downtown core is restricted to 7:00 a.m. – 7:00 p.m. on weekdays — we sequence prep accordingly.",
    },
  },
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "south-hill",
    citySlug: "puyallup",
    name: "South Hill",
    zipCodes: ["98373", "98374", "98375"],
    geo: { lat: 47.1432, lng: -122.2929 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    heroEyebrow: "Puyallup · South Hill",
    introCopy:
      "South Hill is Puyallup's growth engine — the bench above the valley where 1990s–2010s subdivisions sit next to early-1980s ramblers on a half acre. The pricing band is wide, which means comp selection is everything.",
    characteristics: {
      medianHomeYear: "1988 – 2008",
      architecturalStyles: ["Single-story rambler", "Two-story Craftsman", "PNW Contemporary"],
      typicalLotSize: "0.18 – 0.45 acres",
      notes:
        "Most neighborhoods are platted with sidewalks and city water; older pockets near 128th Street still operate on private wells.",
    },
    communityOrgs: [
      {
        name: "Puyallup-Sumner Chamber of Commerce",
        url: "https://www.puyallupsumnerchamber.com/",
        context: "Active business community covering the South Hill corridor.",
      },
      {
        name: "Puyallup School District",
        url: "https://www.puyallup.k12.wa.us/",
        context: "South Hill draws on Rogers HS, Emerald Ridge HS, and Edgemont/Glacier View Junior Highs.",
      },
    ],
    thoroughfares: ["Meridian Ave E (SR-161)", "112th Street E", "94th Avenue E"],
    landmarks: ["South Hill Mall", "Bradley Lake Park", "Pioneer Park"],
    dispatchCopy:
      "Our crews dispatch from Lake Tapps and routinely cross the plateau via SR-410 → SR-161, putting most South Hill listings inside a 15-minute response window for showings and inspection follow-up.",
    adjacent: [
      {
        name: "Downtown Puyallup",
        citySlug: "puyallup",
        blurb: "Historic downtown core — smaller lots, Craftsman & bungalow inventory.",
      },
      {
        name: "Bonney Lake",
        citySlug: "bonney-lake",
        blurb: "Plateau sibling community to the east via SR-410.",
      },
      {
        name: "Sumner",
        citySlug: "sumner",
        blurb: "Sumner Valley to the north — Sounder commuter access.",
      },
    ],
    reviews: [
      {
        author: "Marissa K.",
        zip: "98374",
        rating: 5,
        quote:
          "We were nervous about pricing a 1990s rambler that hadn't been updated in years. The team showed us exactly which prep dollars would return and which wouldn't. Sold above list in nine days.",
      },
      {
        author: "James & Theresa B.",
        zip: "98373",
        rating: 5,
        quote:
          "The South Hill comp set is dense and we'd been burned before with agents who priced off the wider Puyallup MLS pull. These folks priced our home on the right four streets — exactly the call.",
      },
    ],
  },
  {
    slug: "tehaleh",
    citySlug: "bonney-lake",
    name: "Tehaleh",
    zipCodes: ["98391"],
    geo: { lat: 47.1242, lng: -122.1175 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg",
    heroEyebrow: "Bonney Lake · Tehaleh",
    introCopy:
      "Tehaleh is a planned community of more than 4,000 acres above Bonney Lake — newer construction, mature trail systems, and an active HOA. Selling here is as much about resale-certificate timing as it is about listing photos.",
    characteristics: {
      medianHomeYear: "2014 – 2022",
      architecturalStyles: ["Modern Farmhouse", "Northwest Craftsman", "Two-story Traditional"],
      typicalLotSize: "0.10 – 0.25 acres (most lots); 0.5+ on premium sections",
      notes:
        "Builder warranties from the original Newland-era construction may still be active on homes under 10 years old — we verify and disclose during the pre-list audit.",
    },
    communityOrgs: [
      {
        name: "Tehaleh",
        url: "https://www.tehaleh.com/",
        context: "Master-plan developer and primary community resource for residents.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Tehaleh-area students attend Donald Eismann Elementary and feed into Bonney Lake HS.",
      },
    ],
    thoroughfares: ["214th Avenue E", "SR-410", "South Prairie Road E"],
    landmarks: ["The Post (Tehaleh community center)", "Discovery Park", "Tehaleh Trails System"],
    dispatchCopy:
      "From our Lake Tapps base our crews reach Tehaleh in under 12 minutes via 214th Avenue E. We schedule photo and twilight shoots around the community's traffic-calming patterns and HOA quiet hours.",
    adjacent: [
      {
        name: "Bonney Lake (City)",
        citySlug: "bonney-lake",
        blurb: "Parent city — lakefront and commercial corridor on SR-410.",
      },
      {
        name: "Sumner",
        citySlug: "sumner",
        blurb: "Sumner Valley to the northwest — Sounder commuter access.",
      },
    ],
    reviews: [
      {
        author: "Anika R.",
        zip: "98391",
        rating: 5,
        quote:
          "Tehaleh has its own pricing logic — builder spec vs. resale, HOA timing, school cutoff dates. They knew all of it. We listed Thursday, had multiple offers Sunday, signed Monday.",
      },
      {
        author: "Jordan M.",
        zip: "98391",
        rating: 5,
        quote:
          "They walked the resale certificate request through with the HOA office for us. Closing happened on schedule because of that single piece of legwork.",
      },
    ],
  },
  {
    slug: "bridge-hill",
    citySlug: "sumner",
    name: "Bridge Hill",
    zipCodes: ["98390"],
    geo: { lat: 47.1995, lng: -122.2407 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
    heroEyebrow: "Sumner · Bridge Hill",
    introCopy:
      "Bridge Hill sits on the bluff overlooking Sumner's downtown — established trees, view lots, and a tight inventory cycle. Most owners have been in their homes 10+ years, which means staging, photography, and emotional positioning all matter more than usual.",
    characteristics: {
      medianHomeYear: "1965 – 1995",
      architecturalStyles: ["Mid-Century Ranch", "Northwest Contemporary", "Tudor Revival"],
      typicalLotSize: "0.20 – 0.40 acres",
      notes:
        "Many homes feature original-era plumbing or electrical that we audit pre-list to head off inspection-stage renegotiations.",
    },
    communityOrgs: [
      {
        name: "Sumner Main Street Association",
        url: "https://www.sumnermainstreet.org/",
        context: "Downtown advocacy organization; Bridge Hill drains directly into downtown Sumner.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Bridge Hill residents attend Sumner Elementary and Sumner High School.",
      },
    ],
    thoroughfares: ["Bridge Street", "Valley Avenue", "SR-410 connector"],
    landmarks: ["Sumner Sounder Station", "Loyalty Park", "Historic Sumner Cemetery"],
    dispatchCopy:
      "We dispatch via SR-410 → Valley Avenue, with most Bridge Hill listings inside a 14-minute window from our Lake Tapps base. Sounder Sumner Station sits at the bottom of the hill — a real driver of buyer demand from Seattle commuters.",
    adjacent: [
      {
        name: "Downtown Sumner",
        citySlug: "sumner",
        blurb: "Historic Main Street core — older inventory, walkable.",
      },
      {
        name: "Puyallup",
        citySlug: "puyallup",
        blurb: "Western neighbor — larger comp set for cross-shopping buyers.",
      },
      {
        name: "Bonney Lake",
        citySlug: "bonney-lake",
        blurb: "Plateau neighbor to the east via SR-410.",
      },
    ],
    reviews: [
      {
        author: "Helen D.",
        zip: "98390",
        rating: 5,
        quote:
          "I'd owned my Bridge Hill home for 27 years. They handled the prep, the emotional transition, and the pricing with equal care. I closed at the top of my comp range.",
      },
      {
        author: "Sam P.",
        zip: "98390",
        rating: 5,
        quote:
          "The Sounder-station proximity was sold to buyers as a real numbers story, not a buzzword. Three offers in five days.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers (kept in this file so call sites import from one place).
// ---------------------------------------------------------------------------

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getNeighborhoodBySlug(
  citySlug: string,
  neighborhoodSlug: string
): Neighborhood | undefined {
  return NEIGHBORHOODS.find(
    (n) => n.citySlug === citySlug && n.slug === neighborhoodSlug
  );
}

export function getNeighborhoodsByCity(citySlug: string): Neighborhood[] {
  return NEIGHBORHOODS.filter((n) => n.citySlug === citySlug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

export function getAllNeighborhoodParams(): { city: string; neighborhood: string }[] {
  return NEIGHBORHOODS.map((n) => ({ city: n.citySlug, neighborhood: n.slug }));
}
