// "Days Active" for NWMLS listings (replaces the old "Days on Market" /
// "Days Listed" labels).
//
// NWMLS IDX Guidance for Vendors (Feb 2026), item 3: Cumulative Days on Market
// (CDOM) is the standard calculation every member firm and vendor must use:
//
//   Today's Date - OriginatingSystemModificationTimestamp + CumulativeDaysOnMarket
//
// NWMLS renamed the field to "Days Active" (DA / CDA) in Sept 2026. We never
// publish a site-derived "days on website / site" number, so there is nothing
// else to define here. Source fields come from the Repliers raw MLS Grid record
// (`raw.CumulativeDaysOnMarket`, `raw.OriginatingSystemModificationTimestamp`);
// no extra API calls are made.
//
// First Look listings (NWMLS Rule 119, launched Sept 4 2026) must not show any
// days value (not even zero) or the listing date: days accrued in First Look are
// withheld from public display.

type RawLike = Record<string, unknown> | null | undefined;

export type DaysActiveInput = {
  status?: string | null;
  lastStatus?: string | null;
  standardStatus?: string | null;
  soldPrice?: number | null;
  raw?: RawLike;
};

const DAY_MS = 86_400_000;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "";
}

/** True when NWMLS reports the listing in the "First Look" pre-Active status. */
export function isFirstLookListing(listing: DaysActiveInput | null | undefined): boolean {
  if (!listing) return false;
  const candidates = [
    asString(listing.raw?.MlsStatus),
    asString(listing.raw?.StandardStatus),
    asString(listing.standardStatus),
    asString(listing.lastStatus),
  ];
  return candidates.some((c) => /first[\s_-]*look/i.test(c));
}

function isClosed(listing: DaysActiveInput): boolean {
  const std = asString(listing.standardStatus || listing.raw?.StandardStatus).toLowerCase();
  if (std === "closed") return true;
  if (listing.soldPrice) return true;
  return listing.status === "U" && listing.lastStatus === "Sld";
}

function parseCdom(raw: RawLike): number | null {
  const v = raw?.CumulativeDaysOnMarket;
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

/**
 * Days Active per the NWMLS CDOM formula. Returns `null` (render nothing) for
 * First Look listings and whenever the feed does not carry
 * `CumulativeDaysOnMarket` — we do not fall back to Repliers' own
 * `daysOnMarket`, which is not the NWMLS CDOM.
 *
 * Closed listings return the feed's CDOM as-is: the elapsed-time term would keep
 * growing after closing and overstate the days.
 */
export function computeDaysActive(
  listing: DaysActiveInput | null | undefined,
  nowMs: number = Date.now()
): number | null {
  if (!listing || isFirstLookListing(listing)) return null;
  const cdom = parseCdom(listing.raw);
  if (cdom === null) return null;
  if (isClosed(listing)) return cdom;

  const modified = Date.parse(asString(listing.raw?.OriginatingSystemModificationTimestamp));
  if (Number.isNaN(modified)) return cdom;
  const elapsed = Math.max(0, Math.floor((nowMs - modified) / DAY_MS));
  return cdom + elapsed;
}
