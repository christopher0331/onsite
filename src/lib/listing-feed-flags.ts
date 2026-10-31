// NWMLS / MLS Grid feed display flags (NWMLS IDX Guidance v2, Feb 2026, items 6-12;
// MLS Grid IDX Rule 27). Pure helpers: they only read fields already present on the
// Repliers record (`raw.*` + normalized status), so they add no API calls.
//
//  - MlgCanView = false                    -> listing must not be displayed at all
//  - Expired / Canceled / Temporarily Off Market / Sale-Fail -> must not be displayed
//  - InternetAddressDisplayYN = false      -> street address must not be displayed
//  - NWM_IDXMustRemovePhotosYN = true      -> only the primary photo may remain
//  - NWM_IDXMustRemovePrimaryPhotoYN = true-> no photos at all
//  - NWM_IDXMustRemoveVirtualTourYN = true -> no virtual tour
//  - NWM_ShowMapLink = false               -> listing may not be pinned on a map

type Bool = boolean | null;

export function feedBool(v: unknown): Bool {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const t = v.trim().toLowerCase();
    if (t === "true" || t === "y" || t === "yes" || t === "1") return true;
    if (t === "false" || t === "n" || t === "no" || t === "0") return false;
  }
  if (typeof v === "number") return v === 1 ? true : v === 0 ? false : null;
  return null;
}

type FlagListing = {
  status?: string | null;
  lastStatus?: string | null;
  standardStatus?: string | null;
  raw?: Record<string, unknown> | null;
};

const OFF_MARKET_TEXT =
  /expired|cancel+ed|withdrawn|temp(orarily)?[\s-]*off|off[\s-]*market|sale[\s-]*fail/i;
// RESO StandardStatus values for removed listings.
const OFF_MARKET_STANDARD = new Set(["expired", "canceled", "cancelled", "withdrawn", "hold", "delete"]);
// Repliers/NWMLS lastStatus codes: Exp expired, Ter terminated (canceled),
// Sus suspended (temporarily off market), Dft deleted.
const OFF_MARKET_LAST_STATUS = new Set(["Exp", "Ter", "Sus", "Dft"]);

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Expired / Canceled / Temporarily Off Market / Sale-Fail (+ withdrawn/deleted) listings. */
export function isOffMarketStatus(l: FlagListing | null | undefined): boolean {
  if (!l) return false;
  const texts = [s(l.raw?.MlsStatus), s(l.raw?.StandardStatus), s(l.standardStatus)];
  if (texts.some((t) => t && (OFF_MARKET_TEXT.test(t) || OFF_MARKET_STANDARD.has(t.toLowerCase())))) {
    return true;
  }
  return l.status === "U" && OFF_MARKET_LAST_STATUS.has(s(l.lastStatus));
}

/** True when the feed forbids displaying this listing (MlgCanView=false or an off-market status). */
export function isListingBlockedFromDisplay(l: FlagListing | null | undefined): boolean {
  if (!l) return false;
  if (feedBool(l.raw?.MlgCanView) === false) return true;
  return isOffMarketStatus(l);
}

export function isAddressHiddenByFeed(l: FlagListing | null | undefined): boolean {
  return feedBool(l?.raw?.InternetAddressDisplayYN) === false;
}

type MutableListing = FlagListing & {
  images?: string[] | null;
  address?: Record<string, unknown> | null;
  map?: { latitude?: number | null; longitude?: number | null } | null;
  permissions?: Record<string, unknown> | null;
  details?: Record<string, unknown> | null;
};

const STREET_KEYS = [
  "streetNumber",
  "streetNumberText",
  "streetDirectionPrefix",
  "streetDirection",
  "streetName",
  "streetSuffix",
  "unitNumber",
  "zip",
];

/**
 * Apply per-listing feed display flags to a normalized Repliers listing. Returns the
 * same object when no flag applies. Never touches image content (the NWMLS
 * watermark is part of the image URL Repliers returns), only which images exist.
 */
export function applyFeedDisplayFlags<T extends MutableListing>(listing: T): T {
  const raw = listing.raw;
  if (!raw) return listing;
  let out: T = listing;

  if (isAddressHiddenByFeed(listing)) {
    const address = { ...(listing.address ?? {}) };
    for (const k of STREET_KEYS) if (k in address) address[k] = "";
    out = {
      ...out,
      address,
      permissions: { ...(listing.permissions ?? {}), displayAddressOnInternet: "N" },
    };
  }

  if (feedBool(raw.NWM_ShowMapLink) === false || isAddressHiddenByFeed(listing)) {
    out = { ...out, map: { latitude: null, longitude: null } };
  }

  if (feedBool(raw.NWM_IDXMustRemovePrimaryPhotoYN) === true) {
    out = { ...out, images: [] };
  } else if (feedBool(raw.NWM_IDXMustRemovePhotosYN) === true && (listing.images?.length ?? 0) > 1) {
    out = { ...out, images: (listing.images ?? []).slice(0, 1) };
  }

  if (feedBool(raw.NWM_IDXMustRemoveVirtualTourYN) === true && listing.details) {
    out = {
      ...out,
      details: { ...listing.details, virtualTourUrl: null, alternateURLVideoLink: null },
    };
  }

  return out;
}
