// Service Area Data Lake — Type Contracts
//
// These types describe the shape of the structured data ingested at build
// time per `overall_seo_strategy_guide.md`. In production, this is what the
// custom municipal/zoning crawlers + Headless CMS produce. For now we keep a
// hand-curated `data.ts` while the ingestion pipeline is stood up.

export type AreaTaxonomy = "urban" | "suburban" | "rural";

export type EntityLink = {
  name: string;
  url: string;
  // Optional short description so the outbound link reads naturally in copy.
  context?: string;
};

export type Geo = {
  lat: number;
  lng: number;
};

export type RegulationNote = {
  title: string;
  description: string;
};

export type UtilityNote = {
  name: string;
  description: string;
};

export type ProjectCard = {
  title: string;
  image: string;
  href: string;
  badge?: string;
};

// Drives <Component /> variation. Anything unset/false must NOT render — the
// whole point is structurally unique DOM trees per area.
export type CityFeatureFlags = {
  urbanLogistics?: boolean;
  suburbanRegulations?: boolean;
  microClimate?: boolean;
};

export type City = {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  county: string;
  taxonomy: AreaTaxonomy;
  population: number;
  zipCodes: string[];
  geo: Geo;
  heroImage: string;
  heroEyebrow: string;
  heroIntro: string;
  // "Currently serving N active projects in the [City] metro area."
  activeProjects: number;
  // Display-only neighborhood names for the city hub directory.
  // Not every entry has a routed neighborhood page yet.
  neighborhoodDirectory: string[];

  // Tier-1 authority links per "Entity Salience & The Local Knowledge Graph".
  permittingOffice: EntityLink;
  utilities: EntityLink[];
  chamberOfCommerce?: EntityLink;
  // School district(s) serving the area — some cities split across two
  // districts, so this is always an array even when it has one entry.
  schoolDistricts: EntityLink[];
  // Grab-bag of additional authoritative local links (library system,
  // county assessor/property records, parks & rec, etc.) surfaced in the
  // "Local Resources" section and cited in the page's JSON-LD `mentions`.
  localResources: EntityLink[];

  // Structured payloads consumed by the city components.
  regulations: RegulationNote[];
  utilityNotes: UtilityNote[];
  caseStudies: ProjectCard[];

  features: CityFeatureFlags;

  // Optional rich payload for the climate widget; only consumed if the
  // microClimate feature flag is on.
  microClimate?: {
    annualRainfallInches: number;
    avgWinterLowF: number;
    avgSummerHighF: number;
    serviceImpact: string;
  };

  // Optional payload for the urban-logistics block.
  urban?: {
    parking: string;
    permitOverlay: string;
    noiseOrdinance: string;
  };

  // Optional payload for the suburban-regulations block.
  suburban?: {
    typicalLotSize: string;
    septicNotes?: string;
    hoaNotes?: string;
  };
};

export type NeighborhoodCharacteristics = {
  medianHomeYear: string;
  architecturalStyles: string[];
  typicalLotSize: string;
  notes?: string;
};

export type AdjacentArea = {
  name: string;
  citySlug: string;
  neighborhoodSlug?: string; // omit if linking to a sibling city hub instead
  blurb: string;
};

export type LocalReview = {
  author: string;
  zip: string;
  quote: string;
  rating?: number; // 1–5
};

export type Neighborhood = {
  slug: string;
  citySlug: string;
  name: string;
  zipCodes: string[];
  geo: Geo;
  heroImage: string;
  heroEyebrow: string;
  introCopy: string;

  characteristics: NeighborhoodCharacteristics;
  communityOrgs: EntityLink[];
  thoroughfares: string[];
  landmarks: string[];
  dispatchCopy: string;

  adjacent: AdjacentArea[];
  reviews: LocalReview[];
};

export type PlannedServiceArea = {
  city: string;
  stateCode: string;
  county: string;
  zipCodes: string[];
  neighborhoods: string[];
};
