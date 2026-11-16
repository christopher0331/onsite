// Per-listing Days on Market and sale date for display.
//
// Repliers `daysOnMarket` is the NWMLS feed value and matches
// `raw.CumulativeDaysOnMarket`. `simpleDaysOnMarket` is
// (today − OnMarketDate) + 1 and keeps increasing after pending and close,
// so it is never used for display.
//
// When both feed values are missing, fall back to whole calendar days from
// OnMarketDate through the earliest of PurchaseContractDate, CloseDate,
// OffMarketDate, and today (Pacific). No +1.
//
// Sale date is CloseDate. soldDate (PurchaseContractDate on this feed) is
// used only when CloseDate is missing.

const PACIFIC = "America/Los_Angeles";
const DAY_MS = 86_400_000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type RawLike = Record<string, unknown> | null | undefined;

export type MarketListing = {
  daysOnMarket?: number | string | null;
  soldDate?: string | null;
  raw?: RawLike;
};

function rawText(raw: RawLike, key: string): string | null {
  const v = raw?.[key];
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed ? trimmed : null;
}

function asDayCount(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v) && v >= 0) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

/** Calendar date YYYY-MM-DD in America/Los_Angeles. */
export function pacificDateISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PACIFIC,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function utcMidnight(iso: string): number | null {
  const m = iso.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return Date.UTC(year, month - 1, day);
}

function wholeDays(startIso: string, endIso: string): number | null {
  const start = utcMidnight(startIso);
  const end = utcMidnight(endIso);
  if (start == null || end == null || end < start) return null;
  return Math.round((end - start) / DAY_MS);
}

function fallbackDays(listing: MarketListing, now: Date): number | null {
  const onMarket = rawText(listing.raw, "OnMarketDate");
  if (!onMarket) return null;

  const ends = [
    rawText(listing.raw, "PurchaseContractDate"),
    rawText(listing.raw, "CloseDate"),
    rawText(listing.raw, "OffMarketDate"),
    pacificDateISO(now),
  ];

  let earliestMs: number | null = null;
  let earliestIso: string | null = null;
  for (const iso of ends) {
    if (!iso) continue;
    const ms = utcMidnight(iso);
    if (ms == null) continue;
    if (earliestMs == null || ms < earliestMs) {
      earliestMs = ms;
      earliestIso = iso;
    }
  }
  if (!earliestIso) return null;
  return wholeDays(onMarket, earliestIso);
}

/**
 * Days on Market to print. Feed value first (`daysOnMarket`, then
 * `raw.CumulativeDaysOnMarket`). Date fallback only when both are missing.
 */
export function displayDaysOnMarket(
  listing: MarketListing | null | undefined,
  now: Date = new Date()
): number | null {
  if (!listing) return null;
  const feed = asDayCount(listing.daysOnMarket);
  if (feed != null) return feed;
  const cumulative = asDayCount(listing.raw?.CumulativeDaysOnMarket);
  if (cumulative != null) return cumulative;
  return fallbackDays(listing, now);
}

/** CloseDate, or soldDate when CloseDate is missing. */
export function displaySaleDate(listing: MarketListing | null | undefined): string | null {
  if (!listing) return null;
  return rawText(listing.raw, "CloseDate") || (listing.soldDate?.trim() ? listing.soldDate.trim() : null);
}

/** "Oct 26, 2026" from a feed date, using the calendar day and not the viewer timezone. */
export function formatFeedDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = value.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const month = MONTHS[Number(m[2]) - 1];
  const day = Number(m[3]);
  if (!month || day < 1 || day > 31) return null;
  return `${month} ${day}, ${m[1]}`;
}
