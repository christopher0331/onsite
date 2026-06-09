import type { CardListing } from "@/components/ListingCard";
import { getListingStatusBadge, type StatusTone } from "@/lib/listing-status";

export const ONSITE_BROKERAGE_NAME =
  process.env.ONSITE_BROKERAGE_NAME || "Timber Real Estate";

export const ONSITE_LEAD_AGENT_NAME =
  process.env.ONSITE_LEAD_AGENT_NAME || "Andre Bohall";

export type OnsiteListingSource = "timber" | "andre" | "both";
export type OnsiteListingScope = "all" | "andre" | "timber";

export type OnsiteListing = CardListing & {
  agents?: Array<{ name?: string }> | null;
  onsiteSource: OnsiteListingSource;
  sourceLabel: string;
};

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

export function listingHasLeadAgent(
  listing: CardListing & { agents?: Array<{ name?: string }> | null },
  agentName = ONSITE_LEAD_AGENT_NAME
) {
  const target = normalizeName(agentName);
  return (listing.agents ?? []).some((agent) => {
    const name = typeof agent?.name === "string" ? agent.name : "";
    return normalizeName(name).includes(target);
  });
}

export function listingHasBrokerage(
  listing: CardListing,
  brokerageName = ONSITE_BROKERAGE_NAME
) {
  const office = listing.office?.brokerageName?.trim() ?? "";
  return office.toLowerCase() === brokerageName.trim().toLowerCase();
}

export function getSourceLabel(source: OnsiteListingSource) {
  switch (source) {
    case "both":
      return `André Bohall · ${ONSITE_BROKERAGE_NAME}`;
    case "andre":
      return "Listed by André Bohall";
    case "timber":
      return `${ONSITE_BROKERAGE_NAME} Team`;
  }
}

export function classifyOnsiteSource(
  listing: CardListing & { agents?: Array<{ name?: string }> | null }
): OnsiteListingSource {
  const isAndre = listingHasLeadAgent(listing);
  const isTimber = listingHasBrokerage(listing);
  if (isAndre && isTimber) return "both";
  if (isAndre) return "andre";
  return "timber";
}

export function tagOnsiteListing(
  listing: CardListing & { agents?: Array<{ name?: string }> | null }
): OnsiteListing {
  const onsiteSource = classifyOnsiteSource(listing);
  return {
    ...listing,
    onsiteSource,
    sourceLabel: getSourceLabel(onsiteSource),
  };
}

export function isAndreListing(listing: OnsiteListing) {
  return listing.onsiteSource === "andre" || listing.onsiteSource === "both";
}

const ANDRE_STATUS_ORDER: Record<StatusTone, number> = {
  active: 0,
  pending: 1,
  sold: 2,
};

function statusSortKey(listing: OnsiteListing) {
  return ANDRE_STATUS_ORDER[getListingStatusBadge(listing).tone] ?? 2;
}

function sortByStatusThenDate(
  a: OnsiteListing,
  b: OnsiteListing,
  sortBy: string
) {
  const statusDiff = statusSortKey(a) - statusSortKey(b);
  if (statusDiff !== 0) return statusDiff;
  return compareOnsiteListings(a, b, sortBy);
}

function compareOnsiteListings(a: OnsiteListing, b: OnsiteListing, sortBy: string) {
  switch (sortBy) {
    case "listPriceAsc":
      return (a.listPrice ?? 0) - (b.listPrice ?? 0);
    case "listPriceDesc":
      return (b.listPrice ?? 0) - (a.listPrice ?? 0);
    case "soldDateDesc":
      return (b.soldPrice ?? 0) - (a.soldPrice ?? 0);
    case "createdOnAsc":
    case "updatedOnAsc":
      return String(a.listDate ?? "").localeCompare(String(b.listDate ?? ""));
    case "updatedOnDesc":
    case "createdOnDesc":
    default:
      return String(b.listDate ?? "").localeCompare(String(a.listDate ?? ""));
  }
}

export function parseOnsiteListingScope(value: string | null): OnsiteListingScope {
  if (value === "andre" || value === "timber") return value;
  return "all";
}

/**
 * `all`: André first, then team-only; within André → Active → Pending → Sold.
 * `andre` / `timber`: Active → Pending → Sold, then the requested sort.
 */
export function sortOnsiteListings(
  listings: OnsiteListing[],
  sortBy = "updatedOnDesc",
  scope: OnsiteListingScope = "all"
) {
  return [...listings].sort((a, b) => {
    if (scope === "andre" || scope === "timber") {
      return sortByStatusThenDate(a, b, sortBy);
    }

    const aAndre = isAndreListing(a);
    const bAndre = isAndreListing(b);
    if (aAndre !== bAndre) return aAndre ? -1 : 1;

    if (aAndre && bAndre) {
      const statusDiff = statusSortKey(a) - statusSortKey(b);
      if (statusDiff !== 0) return statusDiff;
    }

    return compareOnsiteListings(a, b, sortBy);
  });
}

export function tagOnsiteListings(
  listings: Array<CardListing & { agents?: Array<{ name?: string }> | null }>
) {
  return listings.map(tagOnsiteListing);
}

export function mergeOnsiteListings(
  timber: Array<CardListing & { agents?: Array<{ name?: string }> | null }>,
  andre: Array<CardListing & { agents?: Array<{ name?: string }> | null }>
) {
  const byMls = new Map<string, CardListing & { agents?: Array<{ name?: string }> | null }>();

  for (const listing of timber) {
    if (listing?.mlsNumber) byMls.set(listing.mlsNumber, listing);
  }
  for (const listing of andre) {
    if (!listing?.mlsNumber) continue;
    const existing = byMls.get(listing.mlsNumber);
    byMls.set(
      listing.mlsNumber,
      existing
        ? {
            ...existing,
            ...listing,
            agents: listing.agents?.length ? listing.agents : existing.agents,
            office: listing.office ?? existing.office,
          }
        : listing
    );
  }

  return Array.from(byMls.values()).map(tagOnsiteListing);
}
