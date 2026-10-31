// Repliers hides NWMLS-specific fields unless `fields=raw` is on the request.
// See https://help.repliers.com/en/article/raw-mls-data-access-with-repliers-nhlg5o/

import { applyFeedDisplayFlags, isListingBlockedFromDisplay } from "@/lib/listing-feed-flags";
import { getLeadAgentDirectPhone } from "@/lib/onsite-listings";

export type RepliersRaw = Record<string, unknown>;

export type ListingAgent = {
  name: string;
  phones: string[];
  boardAgentId?: string;
  brokerage: { name: string };
};

// Search/list: `fields=raw` alone returns ONLY `{ raw }` per listing (no address,
// mlsNumber, etc.). Single-listing GET adds `raw` alongside the full record.
// See https://help.repliers.com/en/article/raw-mls-data-access-with-repliers-nhlg5o/
const REPLIERS_SEARCH_FIELDS = [
  "mlsNumber",
  "listPrice",
  "soldPrice",
  "status",
  "lastStatus",
  "standardStatus",
  "address",
  "details",
  "images",
  "map",
  "permissions",
  "office",
  "agents",
  "buyerAgents",
  "listDate",
  "soldDate",
  "daysOnMarket",
  "simpleDaysOnMarket",
  "raw.MlsStatus",
  "raw.BuyerOfficeName",
  "raw.BuyerAgentFullName",
  "raw.BuyerAgentName",
  "raw.BuyerAgentDirectPhone",
  "raw.BuyerAgentOfficePhone",
  "raw.BuyerOfficePhone",
  "raw.CoBuyerOfficeName",
  "raw.NWM_Bathrooms",
  "raw.BathroomsFull",
  "raw.BathroomsHalf",
  "raw.BathroomsThreeQuarter",
  // NWMLS display flags (listing-feed-flags.ts); same request, no extra API calls.
  "raw.StandardStatus",
  "raw.MlgCanView",
  "raw.InternetAddressDisplayYN",
  "raw.NWM_IDXMustRemovePhotosYN",
  "raw.NWM_IDXMustRemovePrimaryPhotoYN",
  "raw.NWM_IDXMustRemoveVirtualTourYN",
  "raw.NWM_ShowMapLink",
].join(",");

/** Build a Repliers listings URL with the correct `fields` for search vs detail. */
export function repliersListingsUrl(path: string): string {
  const u = path.startsWith("http")
    ? new URL(path)
    : new URL(
        path.startsWith("?")
          ? `https://api.repliers.io/listings${path}`
          : `https://api.repliers.io/listings${path.startsWith("/") ? path : `/${path}`}`
      );
  // Search queries pass `?pageSize=…`; detail passes `/NWM1234567`.
  u.searchParams.set("fields", path.startsWith("?") ? REPLIERS_SEARCH_FIELDS : "raw");
  return u.toString();
}

/** Display label from NWMLS `MlsStatus` (e.g. "pending - backup offer requested"). */
export function formatMlsStatusLabel(mlsStatus: string): string {
  const trimmed = mlsStatus.trim();
  if (!trimmed) return trimmed;
  // Prefer typographic en-dash between clauses (auditor wording).
  // NWMLS uses both "Pending - Backup" and "Pending-Inspection" (no spaces).
  const withDash = trimmed.replace(/\s*-\s*/g, " – ");
  return withDash
    .split(/\s+/)
    .map((word) => {
      if (word === "–") return word;
      const lower = word.toLowerCase();
      if (lower === "nwmls" || lower === "mls") return word.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function phoneFromRaw(raw: RepliersRaw, ...keys: string[]): string {
  for (const k of keys) {
    const p = str(raw[k]);
    if (p) return p;
  }
  return "";
}

/** Fill buyerAgents from raw NWMLS fields when Repliers' normalized array is empty. */
export function buyerAgentsFromRaw(raw: RepliersRaw | undefined | null): ListingAgent[] | null {
  if (!raw) return null;
  const name = str(raw.BuyerAgentFullName) || str(raw.BuyerAgentName);
  const brokerage = str(raw.BuyerOfficeName) || str(raw.CoBuyerOfficeName);
  const phone = phoneFromRaw(
    raw,
    "BuyerAgentDirectPhone",
    "BuyerAgentOfficePhone",
    "BuyerOfficePhone"
  );
  if (!name && !brokerage) return null;
  return [
    {
      name: name || "Buyer agent",
      phones: phone ? [phone] : [],
      brokerage: { name: brokerage },
    },
  ];
}

/** Merge raw-derived buyer agents and OnSite direct lines onto a Repliers listing. */
export function enrichListing<
  T extends {
    buyerAgents?: ListingAgent[] | null;
    agents?: ListingAgent[] | null;
    raw?: RepliersRaw;
  },
>(listing: T): T {
  let result: T = listing;

  const hasBuyer = (listing.buyerAgents?.length ?? 0) > 0;
  if (!hasBuyer) {
    const fromRaw = buyerAgentsFromRaw(listing.raw);
    if (fromRaw) result = { ...result, buyerAgents: fromRaw };
  }

  // NWMLS/Repliers often populate listing-agent phones with the office line
  // (e.g. Timber Real Estate) instead of the agent's direct number.
  if (listing.agents?.length) {
    result = {
      ...result,
      agents: listing.agents.map((agent) => {
        const direct = getLeadAgentDirectPhone(agent);
        return direct ? { ...agent, phones: [direct] } : agent;
      }),
    };
  }

  // NWMLS per-listing display flags: address / photos / virtual tour / map pin.
  return applyFeedDisplayFlags(
    result as unknown as Parameters<typeof applyFeedDisplayFlags>[0]
  ) as unknown as T;
}

export function enrichListingsResponse(data: {
  listings?: Array<{
    mlsNumber?: string;
    buyerAgents?: ListingAgent[] | null;
    agents?: ListingAgent[] | null;
    raw?: RepliersRaw;
  }>;
}) {
  if (!Array.isArray(data.listings)) return data;
  return {
    ...data,
    listings: data.listings
      .filter((l) => Boolean(l?.mlsNumber))
      // MlgCanView=false and Expired/Canceled/Temp Off Market/Sale-Fail rows are
      // prohibited from display (MLS Grid IDX Rule 27, NWMLS IDX Guidance #6).
      .filter((l) => !isListingBlockedFromDisplay(l as Parameters<typeof isListingBlockedFromDisplay>[0]))
      .map((l) => enrichListing(l)),
  };
}
