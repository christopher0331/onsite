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

import type { City, Neighborhood, PlannedServiceArea } from "./types";

export const CITIES: City[] = [
  {
    slug: "lake-tapps",
    name: "Lake Tapps",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 12_159,
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2349, lng: -122.1685 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Service Area · Home Base",
    heroIntro:
      "Lake Tapps is our home base. From the island communities to the open-water waterfront, we price reservoir frontage, dock condition, and HOA standing off the most local comp set in our portfolio — because we live on it.",
    activeProjects: 12,
    neighborhoodDirectory: [
      "Tapps Island",
      "Driftwood Point",
      "Tacoma Point",
      "Snag Island",
      "Inlet Island",
      "Church Lake Waterfront",
    ],
    permittingOffice: {
      name: "Pierce County Planning & Public Works",
      url: "https://www.piercecountywa.gov/91/Planning-Public-Works",
      context:
        "Lake Tapps is unincorporated Pierce County — building permits, shoreline review, and site development run through the county, not a city hall.",
    },
    utilities: [
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context:
          "Owns and operates the Lake Tapps reservoir, including the annual fall drawdown and spring refill schedule.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service across the plateau.",
      },
    ],
    schoolDistricts: [
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "Headquartered in Lake Tapps; serves Lake Tapps Elementary and North Tapps Middle School.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Covers the southern Lake Tapps shoreline, feeding into Bonney Lake High School.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System",
        url: "https://mypcls.org/",
        context: "Bonney Lake and Sumner branches are the closest full-service locations.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records for every Lake Tapps address.",
      },
    ],
    regulations: [
      {
        title: "Shoreline & Dock Permitting",
        description:
          "Bulkhead repair, dock replacement, and boat-lift work on Lake Tapps run through county shoreline review. We sequence permits before list date so waterfront buyers aren't underwriting an open question.",
      },
      {
        title: "Reservoir Drawdown Calendar",
        description:
          "Cascade Water Alliance draws the lake down each fall. Waterfront photography, dock inspections, and bulkhead work are scheduled around the refill calendar — a full-pool listing photo is worth real money here.",
      },
      {
        title: "Island HOAs & CC&Rs",
        description:
          "Tapps Island and Snag Island carry active HOAs with architectural review, bridge/access rules, and transfer fees. We pull the resale certificate during the disclosure window, not after mutual acceptance.",
      },
    ],
    utilityNotes: [
      {
        name: "Cascade Water Alliance",
        description:
          "Lake-level timing drives our waterfront marketing calendar — twilight and drone shoots are booked against the refill schedule.",
      },
      {
        name: "Tacoma–Pierce County Health Department",
        description:
          "Most Lake Tapps homes operate on septic. Current Operation & Maintenance reports are sourced and pre-cleared before inspection contingencies open.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
      microClimate: true,
    },
    microClimate: {
      annualRainfallInches: 41,
      avgWinterLowF: 33,
      avgSummerHighF: 79,
      serviceImpact:
        "The fall drawdown and wet season arrive together — we front-load exterior prep, dock work, and waterfront photography into late summer so listings carry full-pool imagery through the winter market.",
    },
    suburban: {
      typicalLotSize: "0.25 – 1+ acres; waterfront and island parcels vary widely by frontage.",
      septicNotes:
        "The majority of Lake Tapps properties are on septic with O&M cycles every 1–3 years depending on system type.",
      hoaNotes:
        "Tapps Island and Snag Island HOAs include architectural review and access rules we verify before going active.",
    },
  },
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
    neighborhoodDirectory: [
      "South Hill",
      "Downtown Puyallup",
      "Clark's Creek",
      "Rodesco",
      "Shawnee Ridge",
      "Gem Heights",
      "Summit",
    ],
    permittingOffice: {
      name: "City of Puyallup Development & Permitting Services",
      url: "https://www.puyallupwa.gov/2438/Development-Permitting-Services",
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
        url: "https://www.puyallupwa.gov/149/Public-Works",
        context: "Municipal water, side-sewer connections, and stormwater.",
      },
    ],
    chamberOfCommerce: {
      name: "Puyallup Sumner Chamber of Commerce",
      url: "https://www.puyallupsumnerchamber.com/",
    },
    schoolDistricts: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Washington's 6th-largest district — Rogers HS, Emerald Ridge HS, and Puyallup HS attendance areas.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System — Puyallup Branch",
        url: "https://mypcls.org/",
        context: "Public library branches serving downtown and South Hill.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
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
    neighborhoodDirectory: [
      "Tehaleh",
      "Sky Island",
      "Quiet Water",
      "Panorama West",
      "Panorama Heights",
    ],
    permittingOffice: {
      name: "City of Bonney Lake — Community Development",
      url: "https://www.bonneylake.gov/260/Permit-Center",
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
        url: "https://www.bonneylake.gov/258/Public-Works",
        context: "Municipal water; many plateau properties remain on septic systems.",
      },
    ],
    schoolDistricts: [
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Bonney Lake HS, Mountain View Middle School, and eight plateau elementary schools.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System — Bonney Lake Branch",
        url: "https://mypcls.org/",
        context: "Public library branch on the plateau.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
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
    neighborhoodDirectory: [
      "Bridge Hill",
      "Downtown Sumner",
      "North Sumner",
      "Valley Corridor",
      "East Valley Edge",
    ],
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
    schoolDistricts: [
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Sumner HS and Sumner Middle School serve most in-city addresses.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System — Sumner Branch",
        url: "https://mypcls.org/",
        context: "Public library branch in downtown Sumner.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
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
  {
    slug: "edgewood",
    name: "Edgewood",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 12_327,
    zipCodes: ["98372", "98371"],
    geo: { lat: 47.2495, lng: -122.2937 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg",
    heroEyebrow: "Service Area · Edgewood Plateau",
    heroIntro:
      "Edgewood is large-lot living minutes from the valley floor — acreage parcels, equestrian properties, and newer plats sharing the same hilltop. Comp selection here is about lot utility as much as the house itself.",
    activeProjects: 5,
    neighborhoodDirectory: [],
    permittingOffice: {
      name: "City of Edgewood — Community Development",
      url: "https://www.cityofedgewood.org/",
      context: "Building permits, short-plat review, and critical-areas determinations.",
    },
    utilities: [
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
      {
        name: "City of Edgewood Public Works",
        url: "https://www.cityofedgewood.org/",
        context: "Stormwater; water and sewer service vary by parcel and provider.",
      },
    ],
    schoolDistricts: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Primary district for most Edgewood addresses.",
      },
      {
        name: "Fife Public Schools",
        url: "https://www.fifeschools.com/",
        context: "Serves a portion of Edgewood — Hedden Elementary sits inside city limits.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System",
        url: "https://mypcls.org/",
        context: "Nearest branches are in Puyallup and Milton.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Septic-to-Sewer Transitions",
        description:
          "Sewer availability varies street by street as Edgewood builds out its system. We confirm connection status and any latecomer or assessment obligations before pricing — buyers' lenders will ask.",
      },
      {
        title: "Critical Areas & Wetland Buffers",
        description:
          "Wetland and stream buffers cross many of Edgewood's larger parcels. We flag buffer status on the title commitment so usable-acreage claims in marketing hold up at inspection.",
      },
    ],
    utilityNotes: [
      {
        name: "Parcel-by-Parcel Utility Verification",
        description:
          "Water purveyor, sewer vs. septic, and gas availability genuinely differ across Edgewood — we document all three before the listing goes active.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.5 – 2.5 acres on established parcels; smaller lots in newer plats.",
      septicNotes:
        "Many established properties remain on septic while sewer expands — connection status materially affects value.",
      hoaNotes: "Newer subdivisions carry HOAs; acreage parcels typically do not.",
    },
  },
  {
    slug: "milton",
    name: "Milton",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "suburban",
    population: 8_697,
    zipCodes: ["98354"],
    geo: { lat: 47.2481, lng: -122.3129 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
    heroEyebrow: "Service Area · Milton",
    heroIntro:
      "Milton straddles the Pierce–King county line with quick I-5 access and a tight, established housing stock. Listings here cross-shop against Fife, Edgewood, and Federal Way — we position against all three comp pools at once.",
    activeProjects: 4,
    neighborhoodDirectory: [],
    permittingOffice: {
      name: "City of Milton — Community Development",
      url: "https://www.cityofmilton.net/",
      context: "Building permits, planning, and code review.",
    },
    utilities: [
      {
        name: "City of Milton Public Works",
        url: "https://www.cityofmilton.net/",
        context: "Municipal water and sewer service.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
    ],
    schoolDistricts: [
      {
        name: "Fife Public Schools",
        url: "https://www.fifeschools.com/",
        context: "District office is in Milton; serves Discovery Primary and Surprise Lake Middle School.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System",
        url: "https://mypcls.org/",
        context: "Nearest branches are in Edgewood and Fife.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records for the Pierce County portion of Milton.",
      },
    ],
    regulations: [
      {
        title: "County-Line Considerations",
        description:
          "Milton parcels sit in both Pierce and King counties — tax rates, school assignments, and recording all follow the parcel's county. We verify county standing on day one so disclosures and buyer underwriting are clean.",
      },
      {
        title: "Critical Areas Near Hylebos Creek",
        description:
          "Properties near the Hylebos corridor can carry stream-buffer and drainage considerations we surface in the pre-list audit rather than at inspection.",
      },
    ],
    utilityNotes: [
      {
        name: "City of Milton Utilities",
        description:
          "Side-sewer documentation and water-meter records are pulled early — small-city records requests can take longer than buyers' timelines allow.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.15 – 0.35 acres across most of the city.",
      hoaNotes: "Most of Milton's housing stock predates HOAs; newer infill plats are the exception.",
    },
  },
  {
    slug: "auburn",
    name: "Auburn",
    state: "Washington",
    stateCode: "WA",
    county: "King County",
    taxonomy: "suburban",
    population: 87_256,
    zipCodes: ["98001", "98002", "98092"],
    geo: { lat: 47.3073, lng: -122.2285 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg",
    heroEyebrow: "Service Area · Auburn Valley to Lea Hill",
    heroIntro:
      "Auburn prices in distinct bands — valley-floor neighborhoods near the Sounder station, established West Hill pockets, and the newer Lea Hill bench above Green River College. We underwrite each band against its own comp pool.",
    activeProjects: 8,
    neighborhoodDirectory: ["Lea Hill"],
    permittingOffice: {
      name: "City of Auburn — Community Development",
      url: "https://www.auburnwa.gov/",
      context: "Permit center, planning review, and rental housing policy.",
    },
    utilities: [
      {
        name: "City of Auburn Utilities",
        url: "https://www.auburnwa.gov/",
        context: "Municipal water, sewer, and storm drainage.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
    ],
    schoolDistricts: [
      {
        name: "Auburn School District",
        url: "https://www.auburn.wednet.edu/",
        context: "Serves Auburn, Lea Hill, and the Lake Tapps corner of King County.",
      },
    ],
    localResources: [
      {
        name: "King County Library System — Auburn Branch",
        url: "https://kcls.org/",
        context: "Public library branches in downtown Auburn and Lea Hill.",
      },
      {
        name: "King County Assessor",
        url: "https://kingcounty.gov/en/dept/assessor",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Floodplain Mapping (Green & White Rivers)",
        description:
          "Valley-floor parcels can fall inside FEMA-mapped zones. We pull flood determinations before pricing so lender requirements never surprise the transaction.",
      },
      {
        title: "Rental Housing & Occupancy Rules",
        description:
          "Auburn's rental-housing policies matter in investor-heavy pockets — we review compliance standing pre-list on tenant-occupied properties.",
      },
      {
        title: "Lea Hill Annexation Pockets",
        description:
          "Parts of Lea Hill carry county-era infrastructure and easements from pre-annexation plats. Title review happens before photos, not during escrow.",
      },
    ],
    utilityNotes: [
      {
        name: "City of Auburn Utilities",
        description:
          "Side-sewer cards and latecomer-agreement checks are completed before list date on older valley parcels.",
      },
    ],
    caseStudies: [],
    features: {
      urbanLogistics: true,
    },
    urban: {
      parking:
        "Sounder-station and downtown-core parking shapes both showing logistics and the commuter-buyer story — we market transit access with numbers, not adjectives.",
      permitOverlay:
        "Downtown urban-center design standards apply to selected corridors; most residential neighborhoods sit outside the overlay.",
      noiseOrdinance:
        "Standard construction-hour limits apply citywide; we schedule prep crews inside them.",
    },
  },
  {
    slug: "buckley",
    name: "Buckley",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "rural",
    population: 5_114,
    zipCodes: ["98321"],
    geo: { lat: 47.1632, lng: -122.0268 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe409428a57e5320586a0_1.jpg",
    heroEyebrow: "Service Area · Foothills",
    heroIntro:
      "Buckley is the gateway to the foothills — small-town blocks near downtown, newer plats like Elk Run and Elk Heights, and acreage at the edges. Buyers come for the pace and the Rainier views; we price both honestly.",
    activeProjects: 3,
    neighborhoodDirectory: ["Elk Run", "Elk Heights"],
    permittingOffice: {
      name: "City of Buckley — Planning & Building",
      url: "https://www.cityofbuckley.com/",
      context: "Building permits, planning review, and public-works coordination.",
    },
    utilities: [
      {
        name: "City of Buckley Public Works",
        url: "https://www.cityofbuckley.com/",
        context: "Municipal water and sewer inside city limits.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric and natural-gas service.",
      },
    ],
    schoolDistricts: [
      {
        name: "White River School District",
        url: "https://www.whiteriver.wednet.edu/",
        context: "District office is in downtown Buckley; serves the foothills communities.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System — Buckley Branch",
        url: "https://mypcls.org/",
        context: "Public library branch in downtown Buckley.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "White River Corridor & Slope Setbacks",
        description:
          "Parcels along the White River bench carry slope and erosion-hazard considerations. We document setback status upfront so acreage marketing claims survive inspection.",
      },
      {
        title: "Septic & Well Verification (Edge Parcels)",
        description:
          "Properties outside the municipal service area run on septic and private wells — current O&M reports and well-flow tests are sourced before going active.",
      },
    ],
    utilityNotes: [
      {
        name: "City of Buckley Public Works",
        description:
          "In-city water/sewer records are confirmed pre-list; edge parcels get health-department septic and well documentation instead.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.15 – 0.30 acres in town and newer plats; 1 – 5 acres at the edges.",
      septicNotes:
        "Septic and private wells are standard outside city utility boundaries, with O&M cycles every 1–3 years.",
      hoaNotes: "Elk Run and Elk Heights carry HOAs with design review; older in-town blocks do not.",
    },
  },
  {
    slug: "graham",
    name: "Graham",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "rural",
    population: 32_981,
    zipCodes: ["98338"],
    geo: { lat: 47.0529, lng: -122.294 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe8304415e6b356d95497_1.jpg",
    heroEyebrow: "Service Area · Graham & The Foothills",
    heroIntro:
      "Graham is acreage country — unincorporated Pierce County where lot size, outbuildings, and well/septic standing drive value as much as finished square footage. Our comp models here are parcel-first, not house-first.",
    activeProjects: 6,
    neighborhoodDirectory: ["The Country"],
    permittingOffice: {
      name: "Pierce County Planning & Public Works",
      url: "https://www.piercecountywa.gov/91/Planning-Public-Works",
      context:
        "Graham is unincorporated — permits, site development, and zoning all run through Pierce County.",
    },
    utilities: [
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Electric service; natural-gas availability varies by road.",
      },
      {
        name: "Tacoma–Pierce County Health Department",
        url: "https://www.tpchd.org/",
        context: "Septic permitting and private-well programs for unincorporated parcels.",
      },
    ],
    schoolDistricts: [
      {
        name: "Bethel School District",
        url: "https://bethelsd.org/",
        context: "Serves Graham, Kapowsin, and Spanaway — Graham Elementary and Graham-Kapowsin HS sit in-area.",
      },
    ],
    localResources: [
      {
        name: "Pierce County Library System",
        url: "https://mypcls.org/",
        context: "Nearest branch is in South Hill / Puyallup.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Well & Septic Documentation",
        description:
          "Most Graham parcels run on private wells and septic. We source well logs, flow tests, and septic O&M reports before list date — the single biggest escrow-delay risk in this submarket.",
      },
      {
        title: "Agricultural & Rural Zoning",
        description:
          "Rural-zoned parcels carry use allowances (and limits) that materially affect buyer pools — horse setups, shops, and ADU potential are verified against county zoning before we market them.",
      },
    ],
    utilityNotes: [
      {
        name: "Pierce County Records",
        description:
          "Parcel research — easements, access agreements, and outbuilding permits — happens during the pre-list audit, not during the inspection contingency.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
      microClimate: true,
    },
    microClimate: {
      annualRainfallInches: 48,
      avgWinterLowF: 32,
      avgSummerHighF: 78,
      serviceImpact:
        "Graham sits higher and wetter than the valley floor — gravel drives, pasture, and roof moss all read differently in photos by November, so exterior prep and photography are front-loaded into late summer.",
    },
    suburban: {
      typicalLotSize: "1 – 5+ acres on most parcels; smaller lots in platted communities like The Country.",
      septicNotes:
        "Private wells and septic systems are the norm; documentation drives both pricing confidence and escrow speed.",
      hoaNotes: "The Country and similar platted communities carry HOAs; open acreage typically does not.",
    },
  },
  {
    slug: "tacoma",
    name: "Tacoma",
    state: "Washington",
    stateCode: "WA",
    county: "Pierce County",
    taxonomy: "urban",
    population: 223_536,
    zipCodes: ["98402", "98403", "98405", "98406", "98407", "98409", "98422"],
    geo: { lat: 47.2529, lng: -122.4443 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg",
    heroEyebrow: "Service Area · Tacoma Core",
    heroIntro:
      "Tacoma is a block-by-block market with unique pricing behavior between the North End, Proctor, Stadium, and West Slope corridors. We underwrite by micro-location, not city average.",
    activeProjects: 11,
    neighborhoodDirectory: [
      "North End",
      "Proctor District",
      "Stadium District",
      "West Slope",
      "South Tacoma",
    ],
    permittingOffice: {
      name: "City of Tacoma Planning & Development Services",
      url: "https://www.cityoftacoma.org/government/city_departments/planning_and_development_services",
      context: "Permits, design review, and code compliance.",
    },
    utilities: [
      {
        name: "Tacoma Public Utilities",
        url: "https://www.mytpu.org/",
        context: "Power, water, and rail service.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Natural-gas service in many Tacoma neighborhoods.",
      },
    ],
    chamberOfCommerce: {
      name: "Tacoma-Pierce County Chamber",
      url: "https://www.tacomachamber.org/",
    },
    schoolDistricts: [
      {
        name: "Tacoma Public Schools",
        url: "https://www.tacomaschools.org/",
        context: "Washington's third-largest district, covering all Tacoma neighborhoods.",
      },
    ],
    localResources: [
      {
        name: "Tacoma Public Library",
        url: "https://www.tacomalibrary.org/",
        context: "City library system with branches in the North End, Proctor, and South Tacoma.",
      },
      {
        name: "Pierce County Assessor-Treasurer",
        url: "https://www.piercecountywa.gov/91/Assessor---Treasurer",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Historic Conservation Districts",
        description:
          "Neighborhood conservation overlays and historic controls affect exterior modifications in selected Tacoma districts.",
      },
      {
        title: "Infill / ADU Code",
        description:
          "Tacoma infill standards and ADU allowances influence lot utility and highest-and-best-use pricing.",
      },
    ],
    utilityNotes: [
      {
        name: "Tacoma Public Utilities",
        description:
          "Service upgrades and meter notes are checked before exterior-prep scopes are finalized.",
      },
    ],
    caseStudies: [],
    features: {
      urbanLogistics: true,
    },
    urban: {
      parking: "Street parking restrictions vary materially by district and event calendar.",
      permitOverlay: "Historic and mixed-use corridors may require additional design review.",
      noiseOrdinance: "Urban contractor windows and neighborhood notice rules are reviewed before prep.",
    },
  },
  {
    slug: "federal-way",
    name: "Federal Way",
    state: "Washington",
    stateCode: "WA",
    county: "King County",
    taxonomy: "suburban",
    population: 99_037,
    zipCodes: ["98003", "98023"],
    geo: { lat: 47.3223, lng: -122.3126 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e5857f0b4e310919f9eda8_contact.webp",
    heroEyebrow: "Service Area · South King",
    heroIntro:
      "Federal Way buyers and sellers move between Twin Lakes, West Campus, and Lakota with sharply different price bands and buyer profiles. We model each cluster independently.",
    activeProjects: 7,
    neighborhoodDirectory: [
      "Twin Lakes",
      "West Campus",
      "Lakota",
      "Dash Point",
      "Redondo",
    ],
    permittingOffice: {
      name: "City of Federal Way Community Development",
      url: "https://www.cityoffederalway.com/page/community-development",
      context: "Permits, inspections, and planning review.",
    },
    utilities: [
      {
        name: "Lakehaven Water & Sewer District",
        url: "https://www.lakehaven.org/",
        context: "Primary water and sewer utility in Federal Way.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Regional electric/natural-gas service.",
      },
    ],
    schoolDistricts: [
      {
        name: "Federal Way Public Schools",
        url: "https://www.fwps.org/",
        context: "Covers Twin Lakes, West Campus, and the Dash Point/Redondo waterfront.",
      },
    ],
    localResources: [
      {
        name: "King County Library System — Federal Way Branch",
        url: "https://kcls.org/",
        context: "Public library branches across Federal Way.",
      },
      {
        name: "King County Assessor",
        url: "https://kingcounty.gov/en/dept/assessor",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Critical Areas / Wetlands",
        description:
          "Select properties near marine bluffs and wetland buffers require additional due diligence in disclosures.",
      },
      {
        title: "Short-Term Rental & Rental Compliance",
        description:
          "Rental-use and occupancy rules are reviewed pre-list in investor-heavy pockets.",
      },
    ],
    utilityNotes: [
      {
        name: "Lakehaven Utility Coordination",
        description:
          "Utility-side notes and side-sewer documentation are pulled early to avoid escrow delays.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.14 – 0.30 acres across most single-family neighborhoods.",
      hoaNotes: "HOA resale packages are common in planned communities and must be timed carefully.",
    },
  },
  {
    slug: "kent",
    name: "Kent",
    state: "Washington",
    stateCode: "WA",
    county: "King County",
    taxonomy: "suburban",
    population: 139_700,
    zipCodes: ["98030", "98031", "98032", "98042"],
    geo: { lat: 47.3809, lng: -122.2348 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Service Area · Kent Valley to East Hill",
    heroIntro:
      "Kent demand splits between East Hill residential neighborhoods, Panther Lake corridors, and valley access pockets. We position listings against the exact competing submarket.",
    activeProjects: 8,
    neighborhoodDirectory: [
      "East Hill",
      "Downtown Kent",
      "Panther Lake",
      "West Hill",
      "Lake Meridian",
    ],
    permittingOffice: {
      name: "City of Kent Planning & Development",
      url: "https://www.kentwa.gov/",
      context: "Permit intake, code, and zoning review.",
    },
    utilities: [
      {
        name: "City of Kent Utilities",
        url: "https://www.kentwa.gov/",
        context: "Water, sewer, and stormwater services.",
      },
      {
        name: "Puget Sound Energy",
        url: "https://www.pse.com/",
        context: "Regional utility service.",
      },
    ],
    schoolDistricts: [
      {
        name: "Kent School District",
        url: "https://www.kent.k12.wa.us/",
        context: "One of Washington's largest districts, covering East Hill, West Hill, and the valley core.",
      },
    ],
    localResources: [
      {
        name: "King County Library System — Kent Branch",
        url: "https://kcls.org/",
        context: "Public library branches in downtown Kent and on East Hill.",
      },
      {
        name: "King County Assessor",
        url: "https://kingcounty.gov/en/dept/assessor",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Floodplain Overlay (Valley areas)",
        description:
          "Portions of Kent Valley are flood-sensitive; flood-zone diligence and lender requirements are handled upfront.",
      },
      {
        title: "Accessory Housing Rules",
        description:
          "ADU feasibility and lot-coverage limits can materially impact buyer demand in East Hill submarkets.",
      },
    ],
    utilityNotes: [
      {
        name: "Permit + Utility Synchronization",
        description:
          "We align repair scopes with city permit expectations to avoid post-inspection surprises.",
      },
    ],
    caseStudies: [],
    features: {
      suburbanRegulations: true,
    },
    suburban: {
      typicalLotSize: "0.12 – 0.25 acres with larger lots in select hillside pockets.",
    },
  },
  {
    slug: "seattle",
    name: "Seattle",
    state: "Washington",
    stateCode: "WA",
    county: "King County",
    taxonomy: "urban",
    population: 755_078,
    zipCodes: ["98101", "98103", "98105", "98107", "98109", "98115", "98117", "98125"],
    geo: { lat: 47.6062, lng: -122.3321 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg",
    heroEyebrow: "Service Area · Seattle Corridor",
    heroIntro:
      "Seattle neighborhoods price on hyper-local fundamentals: school catchments, transit walkability, lot characteristics, and renovation quality. Our strategy is neighborhood-comp first, city-average never.",
    activeProjects: 10,
    neighborhoodDirectory: [
      "Ballard",
      "Green Lake",
      "West Seattle",
      "Capitol Hill",
      "Queen Anne",
    ],
    permittingOffice: {
      name: "Seattle Department of Construction & Inspections",
      url: "https://www.seattle.gov/sdci",
      context: "Permits, inspections, and zoning interpretation.",
    },
    utilities: [
      {
        name: "Seattle City Light",
        url: "https://www.seattle.gov/city-light",
        context: "Municipal electric utility.",
      },
      {
        name: "Seattle Public Utilities",
        url: "https://www.seattle.gov/utilities",
        context: "Water, drainage, and solid waste.",
      },
    ],
    schoolDistricts: [
      {
        name: "Seattle Public Schools",
        url: "https://www.seattleschools.org/",
        context: "Washington's largest district — attendance areas vary block by block in Ballard, Green Lake, and Queen Anne.",
      },
    ],
    localResources: [
      {
        name: "Seattle Public Library",
        url: "https://www.spl.org/",
        context: "Branches in every neighborhood we cover, from Ballard to Green Lake.",
      },
      {
        name: "King County Assessor",
        url: "https://kingcounty.gov/en/dept/assessor",
        context: "Parcel data, assessed value, and property-tax records.",
      },
    ],
    regulations: [
      {
        title: "Tree Protection / Lot Coverage Rules",
        description:
          "Tree and lot-coverage overlays affect project scope, valuation assumptions, and buyer underwriting confidence.",
      },
      {
        title: "Historic District / Design Review Considerations",
        description:
          "Selected neighborhoods include historic/design constraints that impact exterior work and timelines.",
      },
    ],
    utilityNotes: [
      {
        name: "Urban Permit Sequencing",
        description:
          "We validate permit close-outs and utility notes before list date to reduce contract-risk in inspection periods.",
      },
    ],
    caseStudies: [],
    features: {
      urbanLogistics: true,
    },
    urban: {
      parking: "Permit zones and limited street parking alter showing logistics and buyer perception.",
      permitOverlay: "Many neighborhoods carry specialized zoning or design overlays.",
      noiseOrdinance: "Urban prep vendors are scheduled around neighborhood noise windows and access rules.",
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
        url: "https://www.puyallupsd.org/",
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
        neighborhoodSlug: "downtown-puyallup",
        blurb: "Historic downtown core — smaller lots, Craftsman & bungalow inventory.",
      },
      {
        name: "Gem Heights",
        citySlug: "puyallup",
        neighborhoodSlug: "gem-heights",
        blurb: "South Hill pocket near 176th — HOA amenities and Emerald Ridge attendance.",
      },
      {
        name: "Clark's Creek",
        citySlug: "puyallup",
        neighborhoodSlug: "clarks-creek",
        blurb: "West-side creek corridor — parks, buffers, and established lots.",
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
    slug: "downtown-puyallup",
    citySlug: "puyallup",
    name: "Downtown Puyallup",
    zipCodes: ["98371"],
    geo: { lat: 47.1925, lng: -122.2937 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
    heroEyebrow: "Puyallup · Downtown",
    introCopy:
      "Downtown Puyallup is the historic valley-floor core — Craftsman and bungalow streets, Pioneer Park, Sounder access, and a design-review overlay that changes how you prep, price, and disclose a listing.",
    characteristics: {
      medianHomeYear: "1910 – 1955",
      architecturalStyles: ["Craftsman bungalow", "Victorian / early 20th-century", "Small-lot infill"],
      typicalLotSize: "0.08 – 0.20 acres",
      notes:
        "Parcels inside the downtown historic overlay need design review for exterior changes and signage — confirm overlay status before listing photos and contractor work.",
    },
    communityOrgs: [
      {
        name: "Puyallup Sumner Chamber of Commerce",
        url: "https://www.puyallupsumnerchamber.com/",
        context: "Downtown business district and event calendar that shape showing logistics.",
      },
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Downtown addresses typically feed Puyallup High School attendance areas — verify by parcel.",
      },
    ],
    thoroughfares: ["Meridian Ave (SR-161)", "Main Ave", "3rd Street SW"],
    landmarks: ["Pioneer Park", "Puyallup Sounder Station", "Washington State Fair Events Center"],
    dispatchCopy:
      "Downtown sits on the valley floor a short hop from our Lake Tapps base via SR-410 → Meridian. Fair-week traffic and Sounder parking change showing windows — we schedule around both.",
    adjacent: [
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "The bench above the valley — newer plats, wider lots, Meridian retail.",
      },
      {
        name: "Clark's Creek",
        citySlug: "puyallup",
        neighborhoodSlug: "clarks-creek",
        blurb: "West of the core — parks, creek buffers, and established lots.",
      },
      {
        name: "Sumner",
        citySlug: "sumner",
        blurb: "Next valley town east — Sounder twin and Main Street comparison set.",
      },
    ],
    reviews: [
      {
        author: "Elena P.",
        zip: "98371",
        rating: 5,
        quote:
          "The historic overlay was the whole listing. They pulled permit history, flagged what buyers would ask, and priced the bungalow against downtown streets — not South Hill averages.",
      },
      {
        author: "Marcus T.",
        zip: "98371",
        rating: 5,
        quote:
          "Sounder access was sold with actual commute numbers, not adjectives. We had serious Seattle-commuter traffic from the first weekend.",
      },
    ],
  },
  {
    slug: "clarks-creek",
    citySlug: "puyallup",
    name: "Clark's Creek",
    zipCodes: ["98371"],
    geo: { lat: 47.1762, lng: -122.3184 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    heroEyebrow: "Puyallup · Clark's Creek",
    introCopy:
      "Clark's Creek is the west-side corridor where parks, riparian buffers, and established lots sit between downtown and Summit. Pricing here is about creek proximity and critical-area diligence, not a citywide median.",
    characteristics: {
      medianHomeYear: "1965 – 1995",
      architecturalStyles: ["Rambler", "Split-level", "Northwest Contemporary"],
      typicalLotSize: "0.20 – 0.50 acres",
      notes:
        "Lots in the Clarks Creek riparian buffer or aquifer-recharge zones can trigger extra review — flag that on title before photos and inspections are booked.",
    },
    communityOrgs: [
      {
        name: "City of Puyallup Parks — Clarks Creek Park",
        url: "https://www.cityofpuyallup.org/Facilities/Facility/Details/Clarks-Creek-Park-21",
        context: "Primary neighborhood park and trail access along the creek corridor.",
      },
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Clark's Creek Elementary and related attendance areas — confirm by address.",
      },
    ],
    thoroughfares: ["Pioneer Ave W", "7th Avenue SW", "39th Avenue SW"],
    landmarks: ["Clarks Creek Park", "Clarks Creek Elementary", "Pioneer Park (downtown)"],
    dispatchCopy:
      "From Lake Tapps we reach Clark's Creek via SR-410 into west Puyallup. Park events and school pickup on Pioneer change curb availability — we pad showing times accordingly.",
    adjacent: [
      {
        name: "Downtown Puyallup",
        citySlug: "puyallup",
        neighborhoodSlug: "downtown-puyallup",
        blurb: "Walkable historic core and Sounder access a few minutes east.",
      },
      {
        name: "Summit",
        citySlug: "puyallup",
        neighborhoodSlug: "summit",
        blurb: "West/south bench — mixed city and unincorporated Pierce County streets.",
      },
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "Plateau inventory and Meridian retail above the valley floor.",
      },
    ],
    reviews: [
      {
        author: "Dana & Chris L.",
        zip: "98371",
        rating: 5,
        quote:
          "They caught the critical-area note on our creek-side lot before we listed. That one checklist item saved us a delayed closing.",
      },
      {
        author: "Priya S.",
        zip: "98371",
        rating: 5,
        quote:
          "Buyers kept comparing us to South Hill. The team priced Clark's Creek as Clark's Creek — park access, lot size, and all.",
      },
    ],
  },
  {
    slug: "rodesco",
    citySlug: "puyallup",
    name: "Rodesco",
    zipCodes: ["98374"],
    geo: { lat: 47.1694, lng: -122.2436 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Puyallup · Rodesco",
    introCopy:
      "Rodesco is an east-Puyallup pocket of large, tree-covered lots off Shaw Road — late-1970s plats where setbacks, privacy, and acreage logic beat a South Hill subdivision average.",
    characteristics: {
      medianHomeYear: "1978 – 1995",
      architecturalStyles: ["Northwest rambler", "Two-story traditional", "Custom acreage"],
      typicalLotSize: "0.50 – 1.0+ acres",
      notes:
        "Larger lots and mature vegetation are the product. Comp against other Shaw Road acreage, not 0.18-acre South Hill plats.",
    },
    communityOrgs: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Rodesco streets typically sit in Puyallup SD — verify the exact elementary/high school map.",
      },
      {
        name: "Puyallup Sumner Chamber of Commerce",
        url: "https://www.puyallupsumnerchamber.com/",
        context: "East-side business corridor along Shaw Road and downtown Puyallup.",
      },
    ],
    thoroughfares: ["Shaw Road E", "27th Avenue SE", "39th Avenue SE"],
    landmarks: ["Shaw Road corridor", "Wildwood Park", "Downtown Puyallup"],
    dispatchCopy:
      "Rodesco sits east of downtown via Shaw Road. From Lake Tapps we come in on SR-410 → Shaw, typically inside a 15-minute window for inspections and twilight photography.",
    adjacent: [
      {
        name: "Shawnee Ridge",
        citySlug: "puyallup",
        neighborhoodSlug: "shawnee-ridge",
        blurb: "View lots above the Orting Valley along Shawnee Road E.",
      },
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "Denser plats and retail along Meridian — the comparison set buyers often start with.",
      },
      {
        name: "Downtown Puyallup",
        citySlug: "puyallup",
        neighborhoodSlug: "downtown-puyallup",
        blurb: "Valley-floor core west of Shaw Road.",
      },
    ],
    reviews: [
      {
        author: "Greg H.",
        zip: "98374",
        rating: 5,
        quote:
          "Every other agent wanted to price us like a South Hill tract home. They used Shaw Road acreage comps. We sold without sitting.",
      },
      {
        author: "Nina W.",
        zip: "98374",
        rating: 5,
        quote:
          "The lot and the trees were the story. They photographed it that way and the offers followed.",
      },
    ],
  },
  {
    slug: "shawnee-ridge",
    citySlug: "puyallup",
    name: "Shawnee Ridge",
    zipCodes: ["98374"],
    geo: { lat: 47.1458, lng: -122.2412 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    heroEyebrow: "Puyallup · Shawnee Ridge",
    introCopy:
      "Shawnee Ridge sits on Shawnee Road E above the Orting Valley — custom homes, Rainier views, and larger lots where HOA timing and view orientation drive value more than bedroom count.",
    characteristics: {
      medianHomeYear: "1995 – 2015",
      architecturalStyles: ["Custom Northwest", "View rambler", "Daylight basement"],
      typicalLotSize: "0.35 – 1.2 acres",
      notes:
        "View corridors and unfinished daylight/ADU space show up in this pocket. Pull HOA resale docs early when a homeowners association applies.",
    },
    communityOrgs: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Shawnee-area addresses sit in Puyallup SD — confirm elementary and high-school lines.",
      },
      {
        name: "Puyallup Sumner Chamber of Commerce",
        url: "https://www.puyallupsumnerchamber.com/",
        context: "East Pierce business community covering Shawnee Road and downtown.",
      },
    ],
    thoroughfares: ["Shawnee Road E", "Shaw Road E", "128th Street E"],
    landmarks: ["Shawnee Road view corridor", "Orting Valley overlook", "South Hill retail"],
    dispatchCopy:
      "Shawnee Ridge is a short run from Lake Tapps via SR-410 and Shawnee Road E. We time twilight shoots for the Rainier view window and pad for the hill climb on showing days.",
    adjacent: [
      {
        name: "Rodesco",
        citySlug: "puyallup",
        neighborhoodSlug: "rodesco",
        blurb: "Large-lot east Puyallup pocket off Shaw Road.",
      },
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "Broader bench inventory and Meridian amenities.",
      },
      {
        name: "Sumner",
        citySlug: "sumner",
        blurb: "Valley floor and Sounder access north of the ridge.",
      },
    ],
    reviews: [
      {
        author: "Lauren & Ben C.",
        zip: "98374",
        rating: 5,
        quote:
          "The view was the asset. They priced orientation and lot, not just square footage, and the right buyers showed up.",
      },
      {
        author: "Alicia M.",
        zip: "98374",
        rating: 5,
        quote:
          "HOA paperwork was in the file before the first showing. Closing did not stall on a resale certificate.",
      },
    ],
  },
  {
    slug: "gem-heights",
    citySlug: "puyallup",
    name: "Gem Heights",
    zipCodes: ["98375"],
    geo: { lat: 47.1254, lng: -122.2896 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    heroEyebrow: "Puyallup · Gem Heights",
    introCopy:
      "Gem Heights is a South Hill pocket near 176th and Sunrise — 1980s–1990s plats with HOA amenities, Gem Heights Elementary nearby, and a pricing band that should not be blended with downtown 98371.",
    characteristics: {
      medianHomeYear: "1985 – 2000",
      architecturalStyles: ["Two-story traditional", "Rambler", "PNW Craftsman update"],
      typicalLotSize: "0.15 – 0.28 acres",
      notes:
        "Community club amenities (pool/courts where the HOA still operates them) belong in the listing story. Pull the resale packet before going live.",
    },
    communityOrgs: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Gem Heights Elementary and Emerald Ridge High School corridors — verify by address.",
      },
      {
        name: "City of Puyallup",
        url: "https://www.puyallupwa.gov/",
        context: "Permits and utilities for city-limit parcels on the south bench.",
      },
    ],
    thoroughfares: ["176th Street E", "Sunrise Boulevard", "Gem Heights Drive E"],
    landmarks: ["Gem Heights Elementary", "Emerald Ridge High School", "South Hill retail"],
    dispatchCopy:
      "Gem Heights is the south end of the South Hill bench. From Lake Tapps we run SR-410 → SR-161 / 176th, typically a 20-minute window for inspections and twilight shoots.",
    adjacent: [
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "Parent bench — mall, Meridian, and the wider 98373–98374 comp set.",
      },
      {
        name: "Summit",
        citySlug: "puyallup",
        neighborhoodSlug: "summit",
        blurb: "West-side CDP streets with mixed school-district lines.",
      },
      {
        name: "Shawnee Ridge",
        citySlug: "puyallup",
        neighborhoodSlug: "shawnee-ridge",
        blurb: "Larger view lots to the northeast along Shawnee Road E.",
      },
    ],
    reviews: [
      {
        author: "K. Nguyen",
        zip: "98375",
        rating: 5,
        quote:
          "They treated Gem Heights as its own market — HOA, elementary, and 176th access — instead of dumping us into a generic South Hill CMA.",
      },
      {
        author: "Stephanie R.",
        zip: "98375",
        rating: 5,
        quote:
          "Single-story buyers found us because the listing was honest about layout and the HOA amenities. We were under contract in the first stretch.",
      },
    ],
  },
  {
    slug: "summit",
    citySlug: "puyallup",
    name: "Summit",
    zipCodes: ["98373", "98371"],
    geo: { lat: 47.1694, lng: -122.3756 },
    heroImage:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
    heroEyebrow: "Puyallup · Summit",
    introCopy:
      "Summit is the west-side CDP between Puyallup and Tacoma — mixed city and unincorporated streets where school district (Puyallup vs Franklin Pierce) and sewer vs septic can change a sale more than paint color.",
    characteristics: {
      medianHomeYear: "1960 – 1990",
      architecturalStyles: ["Rambler", "Split-level", "Updated mid-century"],
      typicalLotSize: "0.20 – 0.50 acres",
      notes:
        "Confirm city vs unincorporated Pierce County, then school district and septic/sewer, before setting list price. Those three facts are the Summit underwriting.",
    },
    communityOrgs: [
      {
        name: "Puyallup School District",
        url: "https://www.puyallupsd.org/",
        context: "Part of Summit sits in Puyallup SD — never assume from the postal city.",
      },
      {
        name: "Franklin Pierce Schools",
        url: "https://www.fpschools.org/",
        context: "Much of the Summit CDP feeds Franklin Pierce — verify elementary and high school by parcel.",
      },
    ],
    thoroughfares: ["Canyon Road E", "112th Street E", "66th Avenue E"],
    landmarks: ["Summit-Waller corridor", "Clarks Creek Park (east)", "South Hill / Meridian retail"],
    dispatchCopy:
      "Summit sits west of the South Hill bench toward Tacoma. We dispatch via SR-410 / Canyon Road; unincorporated addresses can mean different permit desks, so we confirm jurisdiction on the first walkthrough.",
    adjacent: [
      {
        name: "Clark's Creek",
        citySlug: "puyallup",
        neighborhoodSlug: "clarks-creek",
        blurb: "Creek parks and established Puyallup city lots just east.",
      },
      {
        name: "South Hill",
        citySlug: "puyallup",
        neighborhoodSlug: "south-hill",
        blurb: "Plateau retail and denser plats east of Canyon Road.",
      },
      {
        name: "Tacoma",
        citySlug: "tacoma",
        blurb: "Western neighbor — different permit desk and buyer pool.",
      },
      {
        name: "North End",
        citySlug: "tacoma",
        neighborhoodSlug: "north-end",
        blurb: "Tacoma's Point Defiance / Proctor corridor — denser urban stock and park-oriented living.",
      },
    ],
    reviews: [
      {
        author: "Heather J.",
        zip: "98373",
        rating: 5,
        quote:
          "They mapped school district and septic before we priced. That is the whole Summit conversation, and they had it on day one.",
      },
      {
        author: "Omar F.",
        zip: "98371",
        rating: 5,
        quote:
          "We sit on the Puyallup–Tacoma line. They marketed the commute and the jurisdiction accurately. No surprises in escrow.",
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
        url: "https://www.sumnermainstreet.com/",
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
  {
    slug: "north-end",
    citySlug: "tacoma",
    name: "North End",
    zipCodes: ["98403", "98406", "98407"],
    geo: { lat: 47.2735, lng: -122.4889 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg",
    heroEyebrow: "Tacoma · North End",
    introCopy:
      "Tacoma's North End is established urban-residential living near Point Defiance, Ruston Way, and the Proctor village core — historic and mid-century stock where micro-location, parking, and school lines matter more than a citywide median.",
    characteristics: {
      medianHomeYear: "1920 – 1965",
      architecturalStyles: ["Craftsman bungalow", "Tudor / period revival", "Mid-century ranch"],
      typicalLotSize: "0.10 – 0.25 acres",
      notes:
        "Selected streets sit near historic or conservation overlays — confirm exterior-work rules before pricing a renovation story into list price. Street-parking patterns and permit zones vary block by block.",
    },
    communityOrgs: [
      {
        name: "Proctor District",
        url: "https://www.proctordistrict.com/",
        context: "Walkable North End village hub for shops, dining, and the seasonal farmers market.",
      },
      {
        name: "Tacoma Public Schools",
        url: "https://www.tacomaschools.org/",
        context: "North End addresses commonly feed Stadium or Silas pathways — verify elementary and high school by parcel.",
      },
    ],
    thoroughfares: ["N Proctor St", "N Pearl St", "N 21st St", "Ruston Way"],
    landmarks: ["Point Defiance Park", "Proctor District", "Ruston Way Waterfront", "University of Puget Sound"],
    dispatchCopy:
      "From our Lake Tapps base we reach Tacoma's North End via SR-410 → I-5 / Pearl Street corridors, typically inside a 30–40 minute window for inspections and twilight photography. Point Defiance weekend traffic and Proctor event days change curb availability — we pad showing times accordingly.",
    adjacent: [
      {
        name: "Stadium District",
        citySlug: "tacoma",
        neighborhoodSlug: "stadium-district",
        blurb: "Historic downtown-edge pocket around Stadium High and Wright Park — denser urban patterns and event logistics.",
      },
      {
        name: "Tacoma (City)",
        citySlug: "tacoma",
        blurb: "Parent hub — Stadium, West Slope, and South Tacoma micro-markets on the same urban desk.",
      },
      {
        name: "Summit",
        citySlug: "puyallup",
        neighborhoodSlug: "summit",
        blurb: "East Pierce CDP toward Canyon Road — a common cross-shop for buyers wanting more lot size.",
      },
      {
        name: "Federal Way",
        citySlug: "federal-way",
        blurb: "South King neighbor — Twin Lakes and West Campus comparison set for commute shoppers.",
      },
      {
        name: "Puyallup",
        citySlug: "puyallup",
        blurb: "Valley and South Hill inventory when North End pricing stretches the budget.",
      },
    ],
    reviews: [
      {
        author: "Claire & Nate R.",
        zip: "98406",
        rating: 5,
        quote:
          "They priced our Craftsman against North End streets — not a Tacoma average — and flagged the parking story buyers would ask about. We were under contract in the first stretch.",
      },
      {
        author: "Diego M.",
        zip: "98407",
        rating: 5,
        quote:
          "Point Defiance and Proctor were sold with real lifestyle detail, and school boundaries were confirmed before we listed. No surprises in escrow.",
      },
    ],
  },
  {
    slug: "stadium-district",
    citySlug: "tacoma",
    name: "Stadium District",
    zipCodes: ["98403"],
    geo: { lat: 47.2638, lng: -122.4506 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg",
    heroEyebrow: "Tacoma · Stadium District",
    introCopy:
      "Tacoma's Stadium District is the historic pocket around Stadium High School and Wright Park — period homes, downtown-edge density, and school-pathway demand where micro-location comps beat any citywide average.",
    characteristics: {
      medianHomeYear: "1910 – 1955",
      architecturalStyles: ["Craftsman bungalow", "Period revival", "Early multifamily / duplex"],
      typicalLotSize: "0.08 – 0.20 acres",
      notes:
        "Selected streets sit near historic or conservation overlays — confirm exterior-work rules before pricing a renovation story into list price. Stadium High event days and downtown festivals change curb availability on showing days.",
    },
    communityOrgs: [
      {
        name: "Metro Parks Tacoma — Wright Park",
        url: "https://www.metroparkstacoma.org/place/wright-park/",
        context: "Everyday open-space anchor with the W.W. Seymour Botanical Conservatory.",
      },
      {
        name: "Tacoma Public Schools",
        url: "https://www.tacomaschools.org/",
        context: "Stadium High School is the neighborhood namesake — verify elementary and middle pathways by parcel.",
      },
    ],
    thoroughfares: ["Stadium Way", "Division Ave", "N 1st St", "Yakima Ave"],
    landmarks: [
      "Stadium High School",
      "Wright Park",
      "W.W. Seymour Botanical Conservatory",
      "Annie Wright Schools",
      "Downtown Tacoma",
    ],
    dispatchCopy:
      "From our Lake Tapps base we reach Tacoma's Stadium District via SR-410 → I-5 / downtown arterials, typically inside a 30–40 minute window for inspections and twilight photography. Stadium High event days and downtown festival weekends tighten curb space near Division Avenue and Stadium Way — we pad showing times accordingly.",
    adjacent: [
      {
        name: "North End",
        citySlug: "tacoma",
        neighborhoodSlug: "north-end",
        blurb: "Northern residential corridor — Point Defiance, Proctor village, and broader 98406 / 98407 fabric.",
      },
      {
        name: "Tacoma (City)",
        citySlug: "tacoma",
        blurb: "Parent hub — Proctor, West Slope, and South Tacoma micro-markets on the same urban desk.",
      },
      {
        name: "Summit",
        citySlug: "puyallup",
        neighborhoodSlug: "summit",
        blurb: "East Pierce CDP toward Canyon Road — a common cross-shop for buyers wanting more lot size.",
      },
      {
        name: "Federal Way",
        citySlug: "federal-way",
        blurb: "South King neighbor — Twin Lakes and West Campus comparison set for commute shoppers.",
      },
    ],
    reviews: [
      {
        author: "Priya & Evan L.",
        zip: "98403",
        rating: 5,
        quote:
          "They priced us against Stadium streets — not a Tacoma average — and explained how event-day parking would show up in buyer feedback. We were under contract without chasing the market down.",
      },
      {
        author: "Marcus W.",
        zip: "98403",
        rating: 5,
        quote:
          "Wright Park and Stadium High were sold as real daily life, not fluff. Overlay and school details were confirmed before we listed, and escrow stayed clean.",
      },
    ],
  },
  {
    slug: "tapps-island",
    citySlug: "lake-tapps",
    name: "Tapps Island",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2401, lng: -122.1626 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Tapps Island",
    introCopy:
      "Tapps Island is Lake Tapps’ signature island neighborhood—where buying and selling often come down to waterfront access, dock reality, and HOA expectations alongside the usual home-prep checklist.",
    characteristics: {
      medianHomeYear: "1980 – 2005",
      architecturalStyles: [
        "Waterfront craftsman",
        "Northwest contemporary",
        "Custom remodels",
      ],
      typicalLotSize: "0.25 – 1+ acres; waterfront/island lots vary by frontage",
      notes:
        "Waterfront underwriting (view lines, shoreline condition, dock usability) is usually the decision driver—not a citywide lot-size average.",
    },
    communityOrgs: [
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context:
          "Lake Tapps-area education anchor; confirm attendance boundaries by address.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context:
          "Often relevant for southern shoreline access points; verify school splits by parcel.",
      },
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context:
          "Lake operations and reservoir timing—important context for waterfront prep and seasonal expectations.",
      },
    ],
    thoroughfares: ["W Tapps Dr E", "Tapps Dr E", "214th Ave E"],
    landmarks: ["Tapps Island Golf Course", "Lake Tapps County Park", "Allan Yorke Park"],
    dispatchCopy:
      "Our team’s dispatch starts on Lake Tapps and stays neighborhood-close—so when you’re evaluating waterfront availability, dock timing, or shoreline-protection needs, we can sequence inspections and showings around what actually matters on the island.",
    adjacent: [
      {
        name: "Driftwood Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "driftwood-point",
        blurb:
          "More “community beach + active waterfront” energy with near-shore lifestyle appeal.",
      },
      {
        name: "Snag Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "snag-island",
        blurb:
          "Quieter coves and filtered/open-water views—often chosen for privacy and long-term calm.",
      },
      {
        name: "Church Lake Waterfront",
        citySlug: "lake-tapps",
        neighborhoodSlug: "church-lake-waterfront",
        blurb:
          "Church Lake frontage and dock access considerations—paired with island-style living expectations.",
      },
    ],
    reviews: [
      {
        author: "Andre P.",
        zip: "98391",
        rating: 5,
        quote:
          "They didn’t just show us pictures—they helped us understand dock reality and shoreline prep. We priced with confidence and moved quickly.",
      },
      {
        author: "Jordan & Sam R.",
        zip: "98092",
        rating: 5,
        quote:
          "The process felt neighborhood-specific. The team organized waterfront due diligence so we weren’t reacting late in escrow.",
      },
    ],
  },
  {
    slug: "driftwood-point",
    citySlug: "lake-tapps",
    name: "Driftwood Point",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2296, lng: -122.1730 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Driftwood Point",
    introCopy:
      "Driftwood Point is an active Lake Tapps pocket where waterfront access, shoreline rules, and everyday “launch-from-home” routines influence both pricing and buyer fit.",
    characteristics: {
      medianHomeYear: "1975 – 2003",
      architecturalStyles: [
        "Ranch & waterfront ranch",
        "Northwest craftsman",
        "Waterfront remodels",
      ],
      typicalLotSize: "0.20 – 1+ acres; near-shore lots vary by view corridor",
      notes:
        "Dock and shoreline planning tends to be the underwriting starting point, especially for buyers comparing active-water lifestyles.",
    },
    communityOrgs: [
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "Lake Tapps-area school anchor; confirm boundaries by address.",
      },
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context: "Reservoir timing context for waterfront photography and planning.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Often relevant near southern shoreline access points; verify by parcel.",
      },
    ],
    thoroughfares: ["Tapps Dr E", "214th Ave E", "W Tapps Dr E"],
    landmarks: ["Driftwood Point Community Waterfront Area", "Lake Tapps County Park", "Allan Yorke Park"],
    dispatchCopy:
      "We keep Driftwood Point showings logistics-tight so buyers can evaluate how the neighborhood fits real routines—dock access, seasonal expectations, and convenient access to nearby everyday services.",
    adjacent: [
      {
        name: "Tapps Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tapps-island",
        blurb: "Island lifestyle anchor—often chosen for golf-course access and calm waterfront living.",
      },
      {
        name: "Tacoma Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tacoma-point",
        blurb: "North/shipping-lifestyle feel—buyers who want waterfront charm with practical access compare here.",
      },
      {
        name: "Church Lake Waterfront",
        citySlug: "lake-tapps",
        neighborhoodSlug: "church-lake-waterfront",
        blurb: "Frontage and dock considerations that support the broader Church Lake live/work playbook.",
      },
    ],
    reviews: [
      {
        author: "Maya S.",
        zip: "98391",
        rating: 5,
        quote:
          "They helped us understand what to ask about shoreline and dock plans before we got attached. That saved us later.",
      },
      {
        author: "Chris & Alina T.",
        zip: "98092",
        rating: 5,
        quote:
          "Driftwood Point felt “walk-in” to lake life, and the team matched us with the right neighborhoods and comps—no generic advice.",
      },
    ],
  },
  {
    slug: "tacoma-point",
    citySlug: "lake-tapps",
    name: "Tacoma Point",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2260, lng: -122.1552 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Tacoma Point",
    introCopy:
      "Tacoma Point blends Lake Tapps waterfront life with practical access rhythms—so buyers often choose it when they want dock-friendly living without sacrificing daily convenience.",
    characteristics: {
      medianHomeYear: "1970 – 2000",
      architecturalStyles: ["Craftsman", "Northwest ranch", "Lake-home additions"],
      typicalLotSize: "0.20 – 0.90 acres; shoreline lots vary by frontage and views",
      notes:
        "For Tacoma Point, the “fit” conversation is usually about access timing and shoreline usability—not just aesthetics.",
    },
    communityOrgs: [
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "Lake Tapps-area school anchor; verify by address.",
      },
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context: "Lake operations context for planning waterfront prep around seasonal changes.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Relevant near the southern shoreline; verify splits by parcel.",
      },
    ],
    thoroughfares: ["Tapps Dr E", "211th Ave E", "214th Ave E"],
    landmarks: ["Allan Yorke Park", "Lake Tapps County Park", "Cascade Water Alliance (Lake Operations Info)"],
    dispatchCopy:
      "From the Lake Tapps base, our showing logistics stay neighborhood-tight so buyers can evaluate “daily life” and waterfront usability together—especially for families balancing lake weekends with weekday access.",
    adjacent: [
      {
        name: "Driftwood Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "driftwood-point",
        blurb: "Active-water pocket—buyers compare for community beach energy and near-shore routines.",
      },
      {
        name: "Tapps Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tapps-island",
        blurb: "Island lifestyle anchor—often chosen for golf-course adjacency and calm views.",
      },
      {
        name: "Inlet Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "inlet-island",
        blurb: "Another island-style pocket where waterfront planning and seasonal expectations drive the buyer story.",
      },
    ],
    reviews: [
      {
        author: "Taylor B.",
        zip: "98391",
        rating: 5,
        quote:
          "They priced our Tacoma Point home as its own micro-market. The dock/shoreline diligence made the sale feel clean and fast.",
      },
      {
        author: "Renee K.",
        zip: "98092",
        rating: 5,
        quote:
          "We wanted practical access to lake life. Their neighborhood-first approach made it easy to compare what actually fit our routine.",
      },
    ],
  },
  {
    slug: "snag-island",
    citySlug: "lake-tapps",
    name: "Snag Island",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2477, lng: -122.1724 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Snag Island",
    introCopy:
      "Snag Island is chosen for its quieter coves and calm waterfront feel—where shoreline planning, HOA expectations, and access timing often matter as much as the view.",
    characteristics: {
      medianHomeYear: "1978 – 2004",
      architecturalStyles: ["Lake cottage", "Northwest contemporary", "Island remodels"],
      typicalLotSize: "0.25 – 1+ acres; island frontage drives variation",
      notes:
        "The neighborhood story is usually about privacy and waterfront usability—so we start due diligence with shoreline + dock questions.",
    },
    communityOrgs: [
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "School boundaries should be verified by address.",
      },
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context: "Reservoir timing and operations context for waterfront expectations.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Relevant near the southern shoreline; confirm splits by parcel.",
      },
    ],
    thoroughfares: ["Tapps Dr E", "Pierce County Road Corridors", "214th Ave E"],
    landmarks: ["Snag Island and Church Lake Area", "Lake Tapps County Park", "Cascade Water Alliance"],
    dispatchCopy:
      "We keep Snag Island showing and listing preparation tuned to what buyers ask about: shoreline condition, dock usability, and neighborhood privacy expectations—so you don’t discover problems late.",
    adjacent: [
      {
        name: "Tapps Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tapps-island",
        blurb: "Island comparison pocket—buyers weigh calm waterfront vs. other lake-access styles.",
      },
      {
        name: "Inlet Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "inlet-island",
        blurb: "Another island-style pocket where shoreline planning and seasonal expectations drive fit.",
      },
      {
        name: "Church Lake Waterfront",
        citySlug: "lake-tapps",
        neighborhoodSlug: "church-lake-waterfront",
        blurb: "Adjacent frontage/shoreline considerations with similar quiet-living appeal.",
      },
    ],
    reviews: [
      {
        author: "Olivia & Ben W.",
        zip: "98391",
        rating: 5,
        quote:
          "They handled the HOA/shoreline questions with real confidence. We felt like our offer was based on facts, not guesswork.",
      },
      {
        author: "Sam R.",
        zip: "98092",
        rating: 5,
        quote:
          "The Snag Island comparison set helped us understand why the view matters differently here. Super helpful.",
      },
    ],
  },
  {
    slug: "inlet-island",
    citySlug: "lake-tapps",
    name: "Inlet Island",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2249, lng: -122.1830 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Inlet Island",
    introCopy:
      "Inlet Island is a Lake Tapps island pocket where waterfront lifestyle and shoreline planning go together—so buyers often want a neighborhood-first underwriting approach.",
    characteristics: {
      medianHomeYear: "1970 – 2002",
      architecturalStyles: ["Lake home", "Northwest contemporary", "Custom dockside remodels"],
      typicalLotSize: "0.25 – 1+ acres; island frontage varies by access and view corridor",
      notes:
        "Water operations and seasonal dock usability are part of the buying story for Inlet Island.",
    },
    communityOrgs: [
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context: "Reservoir operations context for seasonal waterfront expectations.",
      },
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "Verify school boundaries by address.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Often relevant for southern access points; confirm by parcel.",
      },
    ],
    thoroughfares: ["Tapps Dr E", "214th Ave E", "SR-410 (Route Context)"],
    landmarks: ["Lake Tapps County Park", "Allan Yorke Park", "Cascade Water Alliance"],
    dispatchCopy:
      "Because Inlet Island living is seasonal by nature, we schedule showings and inspections around the timing buyers care about: dock usability, shoreline prep windows, and real everyday access from the Lake Tapps base.",
    adjacent: [
      {
        name: "Tacoma Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tacoma-point",
        blurb: "Practical access comparison for buyers balancing lifestyle + convenience.",
      },
      {
        name: "Snag Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "snag-island",
        blurb: "Quiet cove contrast for shoppers choosing privacy and calm waterfront living.",
      },
      {
        name: "Driftwood Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "driftwood-point",
        blurb: "Active waterfront contrast—buyers compare energy level and near-shore routine fit.",
      },
    ],
    reviews: [
      {
        author: "Morgan L.",
        zip: "98391",
        rating: 5,
        quote:
          "The team explained seasonal timing in a way that made sense. We didn’t overpay or rush—we chose based on real waterfront context.",
      },
      {
        author: "Casey & Pat T.",
        zip: "98092",
        rating: 5,
        quote:
          "We loved the neighborhood-first guidance. It felt like our offer respected the island’s unique shoreline rules.",
      },
    ],
  },
  {
    slug: "church-lake-waterfront",
    citySlug: "lake-tapps",
    name: "Church Lake Waterfront",
    zipCodes: ["98391", "98092"],
    geo: { lat: 47.2160, lng: -122.1688 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
    heroEyebrow: "Lake Tapps · Church Lake Waterfront",
    introCopy:
      "Church Lake Waterfront is Lake Tapps’ shoreline-forward pocket where buyers weigh dock access, shoreline condition, and neighborhood calm—then price accordingly.",
    characteristics: {
      medianHomeYear: "1965 – 2001",
      architecturalStyles: ["Waterfront craftsman", "Lake ranch", "Island-adjacent remodels"],
      typicalLotSize: "0.20 – 1+ acres; frontage and shoreline condition drive value",
      notes:
        "Shoreline projects and dock usability are often the most practical underwriting questions for Church Lake buyers.",
    },
    communityOrgs: [
      {
        name: "Cascade Water Alliance",
        url: "https://cascadewater.org/",
        context: "Lake operations context that influences seasonal dock experience.",
      },
      {
        name: "Dieringer School District",
        url: "https://www.dieringer.wednet.edu/",
        context: "Confirm school boundaries by address before committing.",
      },
      {
        name: "Sumner-Bonney Lake School District",
        url: "https://www.sumnersd.org/",
        context: "Relevant for certain southern shoreline parcels; verify by parcel.",
      },
    ],
    thoroughfares: ["Tapps Dr E", "214th Ave E", "Allan Yorke Park Access Routes"],
    landmarks: ["Snag Island and Church Lake Area", "Lake Tapps County Park", "Church Lake Waterfront (Shoreline Area)"],
    dispatchCopy:
      "Church Lake Waterfront living is about blending shoreline access with quiet daily routines. We help clients evaluate dock planning, shoreline rules, and seasonal usability early—so there are no surprises when you go to escrow.",
    adjacent: [
      {
        name: "Snag Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "snag-island",
        blurb: "Quiet cove comparison with similar shoreline planning considerations.",
      },
      {
        name: "Tapps Island",
        citySlug: "lake-tapps",
        neighborhoodSlug: "tapps-island",
        blurb: "Island anchor comparison—buyers weigh calmer frontage vs. golf-course adjacency.",
      },
      {
        name: "Driftwood Point",
        citySlug: "lake-tapps",
        neighborhoodSlug: "driftwood-point",
        blurb: "Active waterfront contrast—buyers compare energy level and near-shore routine fit.",
      },
    ],
    reviews: [
      {
        author: "Derek H.",
        zip: "98391",
        rating: 5,
        quote:
          "We were impressed by how much real shoreline diligence they organized before closing. It made the whole process calmer.",
      },
      {
        author: "Amy K.",
        zip: "98092",
        rating: 5,
        quote:
          "They helped us compare Church Lake frontage like a real neighborhood market—dock condition, view lines, and timing were front and center.",
      },
    ],
  },
  {
    slug: "twin-lakes",
    citySlug: "federal-way",
    name: "Twin Lakes",
    zipCodes: ["98023"],
    geo: { lat: 47.3078, lng: -122.3836 },
    heroImage:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e5857f0b4e310919f9eda8_contact.webp",
    heroEyebrow: "Federal Way · Twin Lakes",
    introCopy:
      "Federal Way's Twin Lakes is the established golf-and-lake pocket in ZIP 98023 — Lake Lorene, Lake Jeane, Twin Lakes Golf & Country Club, and HOA-timed resales where micro-neighborhood comps beat any citywide average.",
    characteristics: {
      medianHomeYear: "1968 – 1988",
      architecturalStyles: ["Split-level", "Ranch", "Remodeled contemporary"],
      typicalLotSize: "0.18 – 0.35 acres",
      notes:
        "Twin Lakes HOA membership is typical — pull resale certificates, dues, and aesthetics / CC&R rules before pricing exterior work into list price. Lake-adjacent parcels need their own micro-comp set versus inland Twin Lakes streets.",
    },
    communityOrgs: [
      {
        name: "Twin Lakes Homeowners Association",
        url: "https://www.twinlakeshoa.com/",
        context: "Community standards, aesthetics reviews, and shared amenity administration for Twin Lakes divisions.",
      },
      {
        name: "Federal Way Public Schools",
        url: "https://www.fwps.org/",
        context: "Twin Lakes Elementary / Lakota Middle / Decatur High are common pathway references — verify by parcel.",
      },
    ],
    thoroughfares: ["SW 320th St", "SW 336th St", "Dash Point Rd", "21st Ave SW"],
    landmarks: [
      "Twin Lakes Golf & Country Club",
      "Lake Lorene",
      "Lake Jeane",
      "Ponce De Leon Lake",
      "Dash Point State Park",
    ],
    dispatchCopy:
      "From our Lake Tapps base we reach Federal Way's Twin Lakes via SR-410 → SR-167 / I-5 → SW 320th corridors, typically inside a 25–35 minute window for inspections and twilight photography. Internal Twin Lakes streets and HOA aesthetics timing can change showing curb availability — we pad schedules accordingly.",
    adjacent: [
      {
        name: "Federal Way (City)",
        citySlug: "federal-way",
        blurb: "Parent hub — West Campus, Lakota, Dash Point, and Redondo micro-markets on the same south King desk.",
      },
      {
        name: "North End",
        citySlug: "tacoma",
        neighborhoodSlug: "north-end",
        blurb: "Tacoma urban-residential alternative — Point Defiance / Proctor fabric for buyers comparing Pierce vs King.",
      },
      {
        name: "Stadium District",
        citySlug: "tacoma",
        neighborhoodSlug: "stadium-district",
        blurb: "Historic Tacoma downtown-edge pocket — denser urban patterns when Twin Lakes suburban stock feels too HOA-heavy.",
      },
      {
        name: "Milton",
        citySlug: "milton",
        blurb: "Pierce County neighbor toward the Tacoma–Federal Way seam — a common cross-shop for commute shoppers.",
      },
      {
        name: "Auburn",
        citySlug: "auburn",
        blurb: "Valley and Lea Hill inventory when Twin Lakes pricing or HOA expectations stretch the budget.",
      },
      {
        name: "Kent",
        citySlug: "kent",
        blurb: "East Hill and valley alternatives for buyers weighing south King school and commute tradeoffs.",
      },
    ],
    reviews: [
      {
        author: "Elena & Craig H.",
        zip: "98023",
        rating: 5,
        quote:
          "They priced us against Twin Lakes streets — not a Federal Way average — and had the HOA resale package timed before showings started. We were under contract without chasing the market down.",
      },
      {
        author: "Omar J.",
        zip: "98023",
        rating: 5,
        quote:
          "Lake Lorene and the golf-course setting were sold as real daily life, not fluff. School boundaries were confirmed before we listed, and escrow stayed clean.",
      },
    ],
  },
];

// Expansion corridor requested for the Seattle commute band.
// These are listing-only stubs on /service-areas (no dedicated pages yet).
export const PLANNED_SERVICE_AREAS: PlannedServiceArea[] = [
  {
    city: "Puyallup",
    stateCode: "WA",
    county: "Pierce County",
    zipCodes: ["98371", "98372", "98373", "98374", "98375"],
    neighborhoods: ["South Hill", "Downtown Puyallup", "Sunrise"],
  },
  {
    city: "Tacoma",
    stateCode: "WA",
    county: "Pierce County",
    zipCodes: ["98402", "98405", "98406", "98407", "98409", "98422"],
    neighborhoods: ["North End", "Proctor District", "Stadium District"],
  },
  {
    city: "Federal Way",
    stateCode: "WA",
    county: "King County",
    zipCodes: ["98003", "98023"],
    neighborhoods: ["Twin Lakes", "West Campus", "Lakota"],
  },
  {
    city: "Kent",
    stateCode: "WA",
    county: "King County",
    zipCodes: ["98030", "98031", "98032", "98042"],
    neighborhoods: ["East Hill", "Downtown Kent", "Panther Lake"],
  },
  {
    city: "Seattle",
    stateCode: "WA",
    county: "King County",
    zipCodes: ["98101", "98103", "98105", "98107", "98109", "98115", "98117", "98125"],
    neighborhoods: ["Ballard", "Green Lake", "West Seattle"],
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

export function getCitySlugByName(name: string): string | null {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;
  const city = CITIES.find((c) => c.name.toLowerCase() === normalized);
  return city?.slug ?? null;
}
