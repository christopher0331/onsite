/**
 * Homepage-only curation for the Upcoming Open Houses row.
 *
 * The directory (`/open-houses`) and every other list keep their own sort.
 * This module never fetches. It filters and ranks rows the open-house loader
 * has already loaded.
 */

/**
 * List-price floor for the homepage row.
 *
 * Lowered from $675,000 to $650,000 at the owner's request. The original
 * floor sat in the 2026-10-07 gap between homes at or below $659,950 and
 * homes at or above $694,950 (median $677,450). $650,000 still leaves out
 * the manufactured homes around $119k–$210k and the smaller houses under
 * $650,000. It adds the two single-family homes that were just under the
 * old floor: $650,000 in Enumclaw (29 photos) and $659,950 in Puyallup
 * (24 photos).
 */
export const HOMEPAGE_OPEN_HOUSE_MIN_PRICE = 650_000;

/**
 * A gallery under this many photos is treated as no photo or a very thin
 * gallery. On the same 2026-10-07 set, finished listings commonly have 20–40
 * photos; the sparse ones had 1 or 4.
 */
export const HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS = 5;

/**
 * Property types (and styles) that are not houses. Matched against Repliers
 * `details.propertyType` and `details.style`. Condos and townhouses stay;
 * they are still homes, and the price floor drops the cheap ones. Blank type
 * and style are kept — the feed did not distinguish them.
 */
const NON_HOUSE_TYPE =
  /\b(land|manufactured|mobile|commercial|industrial|boat slip|timeshare|business opportunity|multi[-\s]?family|rental)\b/i;

export type HomepageOpenHouseCandidate = {
  listPrice: number | null;
  sqft: number | null;
  photoCount: number;
  propertyType?: string | null;
  style?: string | null;
  isModelHome?: boolean;
};

function kindText(entry: HomepageOpenHouseCandidate) {
  return `${entry.propertyType ?? ""} ${entry.style ?? ""}`.trim();
}

/** True when a listing is allowed into the curated homepage set. */
export function homepageOpenHouseQualifies(entry: HomepageOpenHouseCandidate) {
  const price = entry.listPrice ?? 0;
  if (price < HOMEPAGE_OPEN_HOUSE_MIN_PRICE) return false;
  if (entry.photoCount < HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS) return false;
  const kind = kindText(entry);
  if (kind && NON_HOUSE_TYPE.test(kind)) return false;
  return true;
}

/**
 * Niceness, higher first.
 *
 * Price is the signal: the homes the homepage should lead with are the
 * higher-priced ones in this market, not a cheaper house that happens to be
 * large. Square footage, then photo count, only break ties, so two listings
 * at the same price prefer the larger, better-photographed one. Missing
 * price or sqft counts as 0. Photo count is capped so it cannot overtake sqft.
 */
function niceness(entry: HomepageOpenHouseCandidate) {
  const price = entry.listPrice ?? 0;
  const sqft = entry.sqft ?? 0;
  const photos = Math.min(Math.max(entry.photoCount, 0), 999);
  return price * 1_000_000 + sqft * 1_000 + photos;
}

function byNicenessDesc(a: HomepageOpenHouseCandidate, b: HomepageOpenHouseCandidate) {
  return niceness(b) - niceness(a);
}

const STREET_SUFFIXES: Record<string, string> = {
  street: "st",
  st: "st",
  avenue: "ave",
  ave: "ave",
  court: "ct",
  ct: "ct",
  drive: "dr",
  dr: "dr",
  lane: "ln",
  ln: "ln",
  boulevard: "blvd",
  blvd: "blvd",
  place: "pl",
  pl: "pl",
  road: "rd",
  rd: "rd",
  circle: "cir",
  cir: "cir",
  terrace: "ter",
  ter: "ter",
  trail: "trl",
  trl: "trl",
  parkway: "pkwy",
  pkwy: "pkwy",
  highway: "hwy",
  hwy: "hwy",
};

function collapseWhitespace(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Address key for one physical property: street + city + zip.
 * Lowercase, trimmed, whitespace collapsed, and common street suffixes
 * folded (Street/St, Avenue/Ave, Court/Ct, and the other usual abbreviations).
 * Unit numbers stay in the street, so two units in one building do not merge.
 */
export function normalizeOpenHouseAddress(street: string, city: string, zip: string) {
  const streetNorm = collapseWhitespace(street)
    .replace(/[.,]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => STREET_SUFFIXES[word] ?? word)
    .join(" ");
  return `${streetNorm}|${collapseWhitespace(city)}|${collapseWhitespace(zip)}`;
}

export type OpenHouseIdentity = {
  mlsNumber: string;
  street: string;
  city: string;
  zip: string;
  /** Epoch ms from the listing's list date, when the feed included one. */
  listDateMs: number | null;
  /** Epoch ms of this row's soonest upcoming open-house session. */
  nextOpenMs: number;
};

/** Numeric MLS id, so NWM2590852 outranks the older NWM2466887. */
export function mlsNumberRank(mlsNumber: string) {
  const digits = mlsNumber.replace(/\D/g, "");
  if (!digits) return 0;
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Which of two rows for the same property to keep.
 * A later list date wins. When the dates match or are missing, the higher
 * MLS number wins (a relist gets a new number). When that is also a tie,
 * the sooner open-house session wins, so one listing with two sessions
 * becomes one card.
 */
function preferSameProperty<T extends OpenHouseIdentity>(a: T, b: T): T {
  const aDate = a.listDateMs;
  const bDate = b.listDateMs;
  if (aDate != null && bDate != null && aDate !== bDate) return aDate > bDate ? a : b;
  const aMls = mlsNumberRank(a.mlsNumber);
  const bMls = mlsNumberRank(b.mlsNumber);
  if (aMls !== bMls) return aMls > bMls ? a : b;
  return a.nextOpenMs <= b.nextOpenMs ? a : b;
}

/**
 * One card per property. Rows that share a normalized street + city + zip
 * collapse to the newer listing. A blank street is not merged with anything
 * else. Callers already store every session for one MLS on a single row;
 * if two rows are still the same listing, the sooner session is the one kept.
 */
function addressGroupKey(entry: OpenHouseIdentity) {
  const streetNorm = normalizeOpenHouseAddress(entry.street, "", "").replace(/\|/g, "");
  if (!streetNorm) return `mls:${entry.mlsNumber}`;
  return normalizeOpenHouseAddress(entry.street, entry.city, entry.zip);
}

export function dedupeOpenHouseListings<T extends OpenHouseIdentity>(entries: readonly T[]): T[] {
  const groups = new Map<string, T[]>();
  const order: string[] = [];
  for (const entry of entries) {
    const key = addressGroupKey(entry);
    const group = groups.get(key);
    if (!group) {
      groups.set(key, [entry]);
      order.push(key);
    } else {
      group.push(entry);
    }
  }
  return order.map((key) => {
    const group = groups.get(key)!;
    return group.reduce((kept, entry) => preferSameProperty(kept, entry));
  });
}

/**
 * Listings for the homepage row.
 *
 * Qualified homes come first, nicest first. Perpetual model homes stay capped
 * (`modelCap`, default 1) so a builder's daily opens cannot fill the row.
 * When fewer than `limit` qualify, the rest of the slots are filled from the
 * other listings in the same niceness order (still under the model cap) so
 * the section does not render short or empty. Address dedupe happens before
 * this runs, so a relist cannot take two of these slots.
 */
export function selectHomepageOpenHouses<T extends HomepageOpenHouseCandidate>(
  entries: readonly T[],
  limit: number,
  modelCap = 1
): T[] {
  if (limit <= 0) return [];
  const eligible = entries.filter((entry) => homepageOpenHouseQualifies(entry)).sort(byNicenessDesc);
  const fallback = entries.filter((entry) => !homepageOpenHouseQualifies(entry)).sort(byNicenessDesc);
  const picked: T[] = [];
  let models = 0;
  for (const entry of [...eligible, ...fallback]) {
    if (entry.isModelHome) {
      if (models >= modelCap) continue;
      models += 1;
    }
    picked.push(entry);
    if (picked.length >= limit) break;
  }
  return picked;
}
