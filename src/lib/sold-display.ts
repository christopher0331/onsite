// Sold-listing display rules (MLS Grid IDX Rule 27 / NWMLS Data Use Policy):
//  - Sold properties may only be displayed when the seller authorized internet
//    display (`InternetEntireListingDisplayYN` is not false).
//  - Listing firm and buyer brokerage are shown next to the photo.
// Pure helpers over fields already on the record; no extra API calls.

type RawLike = Record<string, unknown> | null | undefined;

type SoldLike = {
  office?: { brokerageName?: string | null } | null;
  buyerAgents?: Array<{ brokerage?: { name?: string | null } | null }> | null;
  raw?: RawLike;
};

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isFalse(v: unknown): boolean {
  if (v === false) return true;
  if (typeof v === "string") return ["false", "n", "no", "0"].includes(v.trim().toLowerCase());
  return false;
}

/** False when the feed says the seller did not authorize internet display of this listing. */
export function isSoldDisplayAuthorized(l: { raw?: RawLike } | null | undefined): boolean {
  return !isFalse(l?.raw?.InternetEntireListingDisplayYN);
}

export function getSoldBrokerage(l: SoldLike): { listingFirm: string; buyerFirm: string } {
  const raw = l.raw ?? {};
  return {
    listingFirm: s(raw.ListOfficeName) || s(l.office?.brokerageName),
    buyerFirm:
      s(raw.BuyerOfficeName) || s(l.buyerAgents?.[0]?.brokerage?.name) || s(raw.CoBuyerOfficeName),
  };
}

/**
 * Brokerages for the six hand-written /sold-homes pages and the homepage sold strip,
 * keyed by page slug. Snapshot of the closed MLS records (ListOfficeName /
 * BuyerOfficeName; all six have MlgCanView=true and InternetEntireListingDisplayYN=true).
 * Closed records do not change, so no live lookup is needed.
 */
export const STATIC_SOLD_BROKERAGE: Record<string, { listingFirm: string; buyerFirm: string }> = {
  "luxury-mid-century-modern-in-marine-hills": { listingFirm: "Timber Real Estate", buyerFirm: "Skyline Properties, Inc." },
  "secluded-5-acre-dual-residence-in-graham": { listingFirm: "Timber Real Estate", buyerFirm: "Four-U Realty Inc" },
  "secluded-rambler-on-1-7-acres-in-buckley": { listingFirm: "Timber Real Estate", buyerFirm: "Timber Real Estate" },
  "modern-home-in-thriving-sumner-valley": { listingFirm: "Timber Real Estate", buyerFirm: "Better Properties N. Proctor" },
  "modern-home-in-sumner-valley": { listingFirm: "Timber Real Estate", buyerFirm: "Real Broker LLC" },
  "single-story-home-in-gem-heights-puyallup": { listingFirm: "Timber Real Estate", buyerFirm: "Redfin" },
};

/** Drop rows the seller did not authorize for internet display from a Repliers listings payload. */
export function filterSoldDisplayAuthorized<T extends { listings?: Array<{ raw?: RawLike }> }>(
  data: T
): T {
  if (!Array.isArray(data.listings)) return data;
  return { ...data, listings: data.listings.filter((l) => isSoldDisplayAuthorized(l)) };
}
