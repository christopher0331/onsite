import { CITIES, NEIGHBORHOODS } from "./data";
import type { City, Neighborhood } from "./types";

/**
 * Unique SERP descriptions for city hubs and neighborhood spokes.
 * Google typically shows ~150–160 characters. Never mention "active
 * projects" or a generic brokerage / zip-code pitch.
 *
 * Adding a city or neighborhood without an entry here fails the build.
 */
export const SERVICE_AREA_META_UPDATED_AT = "2026-09-10";

const HUB_META: Record<string, string> = {
  auburn:
    "Auburn homes for sale across Sounder downtown, West Hill, and Lea Hill. Green and White River floodplain checks, Auburn School District, live NWMLS listings.",
  "lake-tapps":
    "Lake Tapps waterfront and island homes — docks, reservoir drawdown, Tapps Island and Driftwood Point. Dieringer and Sumner-Bonney Lake schools, live listings.",
  puyallup:
    "Puyallup homes for sale from historic downtown to South Hill. Street-by-street pricing, Puyallup School District, and live NWMLS listings across 98371–98375.",
  "bonney-lake":
    "Bonney Lake plateau homes along SR-410, Tehaleh, and near Lake Tapps. Local comps, not county averages. Sumner-Bonney Lake schools, live NWMLS listings.",
  sumner:
    "Sumner homes near Sounder, historic Main Street, and Bridge Hill. Floodplain diligence on the White and Stuck Rivers in 98390, live NWMLS listings.",
  edgewood:
    "Edgewood large-lot and equestrian homes minutes from the valley. Lot utility, wells and septic where they apply, Puyallup and Fife schools, live listings.",
  milton:
    "Milton homes on the Pierce–King line with I-5 access. Cross-shop Fife, Edgewood, and Federal Way comps. Fife Public Schools, live NWMLS listings.",
  buckley:
    "Buckley foothills homes — downtown blocks, Elk Run, Elk Heights, and acreage with Rainier views. White River School District, live NWMLS listings.",
  graham:
    "Graham acreage and unincorporated Pierce County homes. Lot size, outbuildings, well and septic standing — parcel-first pricing, live NWMLS listings.",
  tacoma:
    "Tacoma homes by neighborhood: North End, Proctor, Stadium, and West Slope. Micro-location pricing, not a citywide average, live NWMLS listings.",
  "federal-way":
    "Federal Way homes in Twin Lakes, West Campus, and Lakota. Separate price bands and buyer pools across 98003 and 98023, live NWMLS listings.",
  kent:
    "Kent homes from East Hill to Panther Lake and the valley floor. Submarket-specific pricing, not a city average, live NWMLS listings in 98030–98032 and 98042.",
  seattle:
    "Seattle neighborhood homes — Ballard, Green Lake, West Seattle, and more. School catchments, transit, and lot quality first, never a city-wide average.",
};

const NEIGHBORHOOD_META: Record<string, string> = {
  "puyallup/south-hill":
    "South Hill Puyallup homes from 1980s ramblers to 2010s plats. Street-level comps on 98373–98375, Puyallup School District, live NWMLS listings.",
  "puyallup/downtown-puyallup":
    "Downtown Puyallup Craftsman and bungalow homes near Pioneer Park and Sounder. Historic overlay and small-lot diligence in 98371, live NWMLS listings.",
  "puyallup/clarks-creek":
    "Clark's Creek homes west of downtown Puyallup. Creek buffers, critical-area diligence, and established lots toward Summit in 98371, live NWMLS listings.",
  "puyallup/rodesco":
    "Rodesco homes on large, tree-covered lots off Shaw Road in east Puyallup. Acreage logic over subdivision averages in 98374, live NWMLS listings.",
  "puyallup/shawnee-ridge":
    "Shawnee Ridge custom homes and Rainier-view lots above the Orting Valley. HOA timing and view orientation drive value in 98374, live NWMLS listings.",
  "puyallup/gem-heights":
    "Gem Heights homes near 176th and Sunrise on South Hill. HOA plats, Gem Heights Elementary, and Emerald Ridge in 98375, live NWMLS listings.",
  "puyallup/summit":
    "Summit homes between Puyallup and Tacoma. Puyallup vs Franklin Pierce schools, sewer vs septic by street in 98373 and 98371, live NWMLS listings.",
  "bonney-lake/tehaleh":
    "Tehaleh homes in the 4,000-acre Bonney Lake planned community. Newer construction, trails, and HOA resale certificates in 98391, live NWMLS listings.",
  "sumner/bridge-hill":
    "Bridge Hill homes on the bluff above downtown Sumner. View lots, established trees, and Sounder access with tight inventory in 98390, live NWMLS listings.",
  "tacoma/north-end":
    "Tacoma North End homes near Point Defiance, Ruston Way, and Proctor. Historic and mid-century stock in 98403, 98406, and 98407, live NWMLS listings.",
  "tacoma/stadium-district":
    "Stadium District Tacoma homes around Stadium High and Wright Park. Period houses, downtown-edge density, and school-pathway demand in 98403, live listings.",
  "lake-tapps/tapps-island":
    "Tapps Island homes on Lake Tapps. Waterfront access, dock condition, and HOA standing priced off island comps, not a reservoir average.",
  "lake-tapps/driftwood-point":
    "Driftwood Point Lake Tapps homes. Shoreline rules, community waterfront, and launch-from-home living priced off local comps, live NWMLS listings.",
  "lake-tapps/tacoma-point":
    "Tacoma Point Lake Tapps homes with dock-friendly waterfront and plateau access. Shoreline comps near Allan Yorke Park, live NWMLS listings.",
  "lake-tapps/snag-island":
    "Snag Island Lake Tapps homes on quieter coves near Church Lake. Shoreline planning, HOA expectations, and calm-water comps, live NWMLS listings.",
  "lake-tapps/inlet-island":
    "Inlet Island homes on Lake Tapps where waterfront lifestyle and shoreline planning set the price. Island comps, not a reservoir average, live listings.",
  "lake-tapps/church-lake-waterfront":
    "Church Lake waterfront homes on Lake Tapps. Dock access, shoreline condition, and quieter-pocket comps near Snag Island, live NWMLS listings.",
  "federal-way/west-campus":
    "West Campus Federal Way homes near Celebration Park and the trail system. Greenbelt plats west of I-5 in 98003 and 98023, live NWMLS listings.",
  "federal-way/lakota":
    "Lakota Federal Way homes in 98023 near Lakota Park, Adelaide, and Dash Point. Mid-century stock and street-level comps, live NWMLS listings.",
};

function neighborhoodKey(citySlug: string, neighborhoodSlug: string): string {
  return `${citySlug}/${neighborhoodSlug}`;
}

function assertCoverage(): void {
  const missingHubs = CITIES.filter((city) => !HUB_META[city.slug]).map(
    (city) => city.slug
  );
  const missingSpokes = NEIGHBORHOODS.filter(
    (n) => !NEIGHBORHOOD_META[neighborhoodKey(n.citySlug, n.slug)]
  ).map((n) => neighborhoodKey(n.citySlug, n.slug));

  if (missingHubs.length || missingSpokes.length) {
    throw new Error(
      `Missing unique service-area meta descriptions: hubs=${missingHubs.join(", ") || "none"} spokes=${missingSpokes.join(", ") || "none"}`
    );
  }
}

assertCoverage();

export function hubMetaDescription(city: Pick<City, "slug">): string {
  const description = HUB_META[city.slug];
  if (!description) {
    throw new Error(`Missing unique hub meta description for ${city.slug}`);
  }
  return description;
}

export function neighborhoodMetaDescription(
  city: Pick<City, "slug">,
  neighborhood: Pick<Neighborhood, "slug">
): string {
  const key = neighborhoodKey(city.slug, neighborhood.slug);
  const description = NEIGHBORHOOD_META[key];
  if (!description) {
    throw new Error(`Missing unique neighborhood meta description for ${key}`);
  }
  return description;
}
