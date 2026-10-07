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
 * Set from the live East Pierce + OnSite open-house set on 2026-10-07
 * (80 upcoming listings, one per MLS number). Prices split with nothing in
 * the gap: 40 homes at or below $659,950 and 40 at or above $694,950. The
 * median is $677,450, the midpoint of that gap. $675,000 sits in the gap, so
 * a listing at or above it is the entire top half (the cheapest home that
 * qualifies today is $694,950) and the bottom half stays off the homepage.
 * That bottom half is the manufactured homes at $118,750–$209,999 and the
 * smaller houses from about $415,000 through $659,950.
 */
export const HOMEPAGE_OPEN_HOUSE_MIN_PRICE = 675_000;

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

/**
 * Listings for the homepage row.
 *
 * Qualified homes come first, nicest first. Perpetual model homes stay capped
 * (`modelCap`, default 1) so a builder's daily opens cannot fill the row.
 * When fewer than `limit` qualify, the rest of the slots are filled from the
 * other listings in the same niceness order (still under the model cap) so
 * the section does not render short or empty.
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
