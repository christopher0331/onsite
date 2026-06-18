// Feature/keyword dictionary for matching buyer-intent language against a
// listing's public remarks ("About this home" → details.description).
//
// Repliers' NLP is good at structured filters (city, price, beds/baths) but
// unreliable for lifestyle/feature words — it misfires (e.g. style=Dock) or
// pushes them into the paid AI Image Search add-on. So we detect these terms
// ourselves and match them against the remarks text, supporting partial (some
// features) and full (all features) matches.
//
// Each group is one canonical feature with a label and the synonyms/phrases
// that should count as a match. Add or extend groups freely — order doesn't
// matter. Derived from OnSite's IDX search-term framework.

export type FeatureGroup = {
  key: string;
  label: string;
  terms: string[];
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    key: "waterfront",
    label: "Waterfront",
    terms: ["waterfront", "lakefront", "lake front", "on the lake", "water's edge", "waterfront living", "shoreline"],
  },
  {
    key: "lakeAccess",
    label: "Lake access",
    terms: ["lake access", "deeded lake access", "community lake access", "private lake access", "boat access", "water access"],
  },
  {
    key: "dock",
    label: "Dock / moorage",
    terms: ["private dock", "shared dock", "community dock", "boat dock", "dock", "moorage", "boathouse", "boat house"],
  },
  {
    key: "boatLift",
    label: "Boat lift / launch",
    terms: ["boat lift", "covered boat lift", "jet ski lift", "boat launch"],
  },
  {
    key: "bankWaterfront",
    label: "Low/no-bank waterfront",
    terms: ["no bank", "low bank", "no-bank", "low-bank", "bulkhead"],
  },
  {
    key: "rainierView",
    label: "Mt Rainier view",
    terms: ["mt rainier view", "mount rainier view", "rainier view"],
  },
  {
    key: "view",
    label: "View",
    terms: ["lake view", "water view", "mountain view", "territorial view", "valley view", "city view", "sunset view", "sunrise view", "panoramic view", "olympic view", "cascade view", "peekaboo view", "sweeping views", "view deck"],
  },
  {
    key: "acreage",
    label: "Acreage / land",
    terms: ["acreage", "acre", "large lot", "oversized lot", "usable land", "level acreage", "mini farm", "hobby farm", "homestead"],
  },
  {
    key: "privacy",
    label: "Privacy / setting",
    terms: ["private setting", "secluded", "peaceful setting", "park like", "park-like", "private lot", "tucked away", "private driveway", "long driveway", "fully fenced", "cross fenced"],
  },
  {
    key: "gated",
    label: "Gated / cul-de-sac",
    terms: ["gated", "gated entry", "dead end", "dead-end", "cul de sac", "cul-de-sac", "quiet street", "quiet road"],
  },
  {
    key: "shop",
    label: "Shop / workshop",
    terms: ["detached shop", "heated shop", "insulated shop", "wired shop", "workshop", "shop"],
  },
  {
    key: "rvParking",
    label: "RV parking / storage",
    terms: ["rv parking", "rv garage", "rv bay", "boat storage", "toy storage", "room for rv", "room for boat"],
  },
  {
    key: "bigGarage",
    label: "3+ car garage",
    terms: ["3 car garage", "three car garage", "4 car garage", "four car garage", "5 car garage", "five car garage", "oversized garage", "tandem garage"],
  },
  {
    key: "primaryOnMain",
    label: "Primary on main",
    terms: ["primary on main", "primary on the main", "main floor primary", "main level primary", "main floor bedroom", "bedroom on the main", "primary bedroom on main", "primary suite on main", "main floor living", "main level living", "on the main floor"],
  },
  {
    key: "rambler",
    label: "Rambler / single story",
    terms: ["rambler", "single story", "single-story", "one story", "one level", "one-level", "no stairs"],
  },
  {
    key: "bonusRoom",
    label: "Bonus / rec room",
    terms: ["bonus room", "rec room", "game room", "media room", "theater room", "flex room", "loft"],
  },
  {
    key: "office",
    label: "Office / den",
    terms: ["home office", "main floor office", "office", "den"],
  },
  {
    key: "openConcept",
    label: "Open concept",
    terms: ["open concept", "great room", "open floor plan"],
  },
  {
    key: "chefKitchen",
    label: "Chef's kitchen",
    terms: ["chef kitchen", "chefs kitchen", "chef's kitchen", "gourmet kitchen", "large kitchen", "walk in pantry", "butler pantry", "oversized island"],
  },
  {
    key: "adu",
    label: "ADU / MIL / multigen",
    terms: ["adu", "dadu", "accessory dwelling", "mother in law", "mil suite", "multigenerational", "multi generational", "guest house", "guest suite", "second kitchen", "basement apartment", "separate living quarters", "separate entrance", "carriage house"],
  },
  {
    key: "basementFeature",
    label: "Daylight / finished basement",
    terms: ["daylight basement", "finished basement", "walk out basement", "walkout basement", "lower level living"],
  },
  {
    key: "updated",
    label: "Updated / remodeled",
    terms: ["updated", "remodeled", "renovated", "fully remodeled", "completely remodeled", "turnkey", "move in ready", "move-in ready", "tastefully updated", "newly remodeled"],
  },
  {
    key: "newConstruction",
    label: "New construction",
    terms: ["new construction", "new build", "presale", "pre-sale", "under construction", "newer home", "spec home", "custom build", "semi-custom", "builder warranty"],
  },
  {
    key: "fixer",
    label: "Fixer / opportunity",
    terms: ["fixer", "fixer upper", "cosmetic fixer", "needs tlc", "needs updating", "bring your vision", "bring your contractor", "investor special", "value add", "value-add", "sweat equity", "diamond in the rough", "as-is", "as is", "blank canvas", "deferred maintenance"],
  },
  {
    key: "estate",
    label: "Estate / transition",
    terms: ["estate sale", "original owner", "first time on market", "probate", "trust sale", "vacant", "quick close", "immediate possession"],
  },
  {
    key: "luxury",
    label: "Luxury / custom",
    terms: ["luxury", "custom home", "designer finishes", "high end finishes", "high-end", "executive home", "vaulted ceilings", "soaring ceilings", "coffered ceilings", "gated estate", "private estate"],
  },
  {
    key: "pool",
    label: "Pool",
    terms: ["swimming pool", "in ground pool", "in-ground pool", "pool"],
  },
  {
    key: "spa",
    label: "Hot tub / sauna",
    terms: ["hot tub", "sauna", "steam shower"],
  },
  {
    key: "outdoorLiving",
    label: "Outdoor living",
    terms: ["outdoor living", "covered patio", "covered deck", "outdoor kitchen", "fire pit", "entertaining deck", "sport court", "pickleball court", "basketball court"],
  },
  {
    key: "equestrian",
    label: "Equestrian / horse",
    terms: ["equestrian", "horse property", "barn", "stable", "paddock", "pasture", "chicken coop"],
  },
  {
    key: "noHoa",
    label: "No / low HOA",
    terms: ["no hoa", "low hoa"],
  },
  {
    key: "commuter",
    label: "Commuter access",
    terms: ["commuter", "easy commute", "close to 410", "hwy 410", "close to 167", "close to 512", "close to i-5", "park and ride", "sounder", "sumner station", "auburn station"],
  },
  {
    key: "airConditioning",
    label: "Air conditioning",
    terms: ["air conditioning", "central a/c", "central ac", "heat pump", "hvac", "mini split", "mini-split", "air conditioned", "a/c"],
  },
  {
    key: "fireplace",
    label: "Fireplace",
    terms: ["fireplace", "gas fireplace", "wood fireplace", "wood stove", "pellet stove", "fireplaces"],
  },
  {
    key: "elevator",
    label: "Elevator",
    terms: ["elevator", "private elevator", "building elevator"],
  },
  {
    key: "washerDryer",
    label: "Washer/dryer hookup",
    terms: ["washer/dryer hookup", "washer and dryer", "in unit laundry", "in-unit laundry", "laundry room", "utility room"],
  },
  {
    key: "pets",
    label: "Pets allowed",
    terms: ["pets allowed", "pet friendly", "dogs allowed", "cats allowed", "fenced yard", "fully fenced"],
  },
  {
    key: "greenHome",
    label: "Green home",
    terms: ["solar panels", "green home", "leed certified", "energy efficient", "energy star", "tankless water heater", "eco friendly"],
  },
  {
    key: "accessible",
    label: "Accessible home",
    terms: ["accessible", "ada compliant", "wheelchair accessible", "ramp", "wide hallways", "roll in shower", "roll-in shower", "grab bars", "zero step entry"],
  },
];

/** Build a case-insensitive, boundary-aware matcher with flexible spacing/hyphens
 *  and an optional trailing plural. */
function termToRegex(term: string): RegExp {
  const escaped = term
    .trim()
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/[\s-]+/g, "[\\s-]+");
  return new RegExp(`\\b${escaped}s?\\b`, "i");
}

// Precompiled matchers per group (built once at module load).
const GROUP_MATCHERS = FEATURE_GROUPS.map((group) => ({
  group,
  regexes: group.terms.map(termToRegex),
}));

/** Which feature groups are referenced by the user's prompt. */
export function detectFeatures(prompt: string): FeatureGroup[] {
  const text = ` ${prompt.toLowerCase()} `;
  return GROUP_MATCHERS.filter(({ regexes }) =>
    regexes.some((re) => re.test(text))
  ).map(({ group }) => group);
}

/** Of the requested feature groups, which ones the remarks text actually
 *  mentions — returned as their human labels (deduped, input order). */
export function matchFeaturesInText(
  text: string | null | undefined,
  requested: FeatureGroup[]
): string[] {
  if (!text) return [];
  const haystack = ` ${text.toLowerCase()} `;
  const labels: string[] = [];
  for (const group of requested) {
    const matcher = GROUP_MATCHERS.find((m) => m.group.key === group.key);
    if (matcher && matcher.regexes.some((re) => re.test(haystack))) {
      if (!labels.includes(group.label)) labels.push(group.label);
    }
  }
  return labels;
}
