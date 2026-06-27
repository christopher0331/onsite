import type { CardListing } from "@/components/ListingCard";
import { getListingStatusBadge, type StatusTone } from "@/lib/listing-status";

export const ONSITE_BROKERAGE_NAME =
  process.env.ONSITE_BROKERAGE_NAME || "Timber Real Estate";

export const ONSITE_LEAD_AGENT_NAME =
  process.env.ONSITE_LEAD_AGENT_NAME || "Andre Bohall";

/**
 * A "lead agent" is one of OnSite's own agents whose listings get top
 * priority across the site (their own tab on /our-listings, prepended on the
 * default /listings browse, etc.). Add a new agent by appending to
 * `ONSITE_LEAD_AGENTS` — array order is the display/priority order.
 *
 * Each agent is matched against a listing either by NWMLS board agent id
 * (precise) or by a name substring (the Repliers `agents.name` search term).
 */
export type LeadAgentConfig = {
  /** Stable key used as the scope value and tab id. */
  key: string;
  /** Full display name shown in copy. */
  name: string;
  /** Short label for the filter tab + count badge. */
  tabLabel: string;
  /** "Listed by …" label rendered on the card. */
  cardLabel: string;
  /** Repliers `agents.name` search term used to fetch this agent's listings. */
  searchName?: string;
  /** NWMLS board agent ids (e.g. "NWM155267") that identify this agent. */
  boardAgentIds?: string[];
  /** Direct contact line shown on listing pages (MLS often returns the office phone). */
  directPhone?: string;
};

export const ONSITE_LEAD_AGENTS: LeadAgentConfig[] = [
  {
    key: "andre",
    name: "André Bohall",
    tabLabel: "André Bohall",
    cardLabel: "Listed by André Bohall",
    searchName: ONSITE_LEAD_AGENT_NAME,
    boardAgentIds: ["NWM109253"],
    directPhone: "(253) 441-9764",
  },
  {
    key: "cindie",
    name: "Cindie",
    tabLabel: "Cindie",
    cardLabel: "Listed by Cindie",
    // MLS agent #155267. Repliers filters/returns this as the NWMLS boardAgentId.
    boardAgentIds: ["NWM155267"],
    directPhone: "(253) 799-0609",
  },
];

export const ONSITE_LEAD_AGENT_KEYS = ONSITE_LEAD_AGENTS.map((a) => a.key);

export function getLeadAgentConfig(key: string): LeadAgentConfig | undefined {
  return ONSITE_LEAD_AGENTS.find((a) => a.key === key);
}

export type OnsiteListingScope = "all" | "timber" | (string & {});

type RawAgent = { name?: string; boardAgentId?: string };
type TaggableListing = CardListing & { agents?: RawAgent[] | null };

export type OnsiteListing = CardListing & {
  agents?: RawAgent[] | null;
  /** Lead-agent keys present on this listing, in config priority order. */
  leadAgentKeys: string[];
  isTimber: boolean;
  sourceLabel: string;
};

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function listingMatchesAgent(
  listing: TaggableListing,
  agent: LeadAgentConfig
): boolean {
  const agents = listing.agents ?? [];
  return agents.some((a) => agentRecordMatchesLead(a, agent));
}

/** Match a single MLS/Repliers agent row to a lead-agent config. */
export function agentRecordMatchesLead(
  agent: RawAgent,
  config: LeadAgentConfig
): boolean {
  const wantedIds = (config.boardAgentIds ?? []).map(digits).filter(Boolean);
  const wantedName = config.searchName ? normalizeName(config.searchName) : "";

  if (wantedIds.length) {
    const id = typeof agent?.boardAgentId === "string" ? digits(agent.boardAgentId) : "";
    if (id && wantedIds.includes(id)) return true;
  }
  if (wantedName) {
    const name = typeof agent?.name === "string" ? agent.name : "";
    if (normalizeName(name).includes(wantedName)) return true;
  }
  return false;
}

/** Direct line for OnSite lead agents; null when this row is not a configured lead agent. */
export function getLeadAgentDirectPhone(agent: RawAgent): string | null {
  for (const config of ONSITE_LEAD_AGENTS) {
    if (agentRecordMatchesLead(agent, config) && config.directPhone) {
      return config.directPhone;
    }
  }
  return null;
}

export function listingHasBrokerage(
  listing: CardListing,
  brokerageName = ONSITE_BROKERAGE_NAME
) {
  const office = listing.office?.brokerageName?.trim() ?? "";
  return office.toLowerCase() === brokerageName.trim().toLowerCase();
}

function leadAgentKeysFor(listing: TaggableListing): string[] {
  return ONSITE_LEAD_AGENTS.filter((a) => listingMatchesAgent(listing, a)).map(
    (a) => a.key
  );
}

function buildSourceLabel(leadAgentKeys: string[], isTimber: boolean): string {
  const names = leadAgentKeys
    .map((k) => getLeadAgentConfig(k)?.name)
    .filter((n): n is string => Boolean(n));

  if (names.length) {
    const base = `Listed by ${names.join(" & ")}`;
    return isTimber ? `${base} · ${ONSITE_BROKERAGE_NAME}` : base;
  }
  return `${ONSITE_BROKERAGE_NAME} Team`;
}

export function tagOnsiteListing(listing: TaggableListing): OnsiteListing {
  const leadAgentKeys = leadAgentKeysFor(listing);
  const isTimber = listingHasBrokerage(listing);
  return {
    ...listing,
    leadAgentKeys,
    isTimber,
    sourceLabel: buildSourceLabel(leadAgentKeys, isTimber),
  };
}

export function tagOnsiteListings(listings: TaggableListing[]) {
  return listings.map(tagOnsiteListing);
}

export function isLeadAgentListing(listing: OnsiteListing) {
  return listing.leadAgentKeys.length > 0;
}

/** Lowest index in `ONSITE_LEAD_AGENTS` among this listing's agents. */
function leadAgentRank(listing: OnsiteListing): number {
  let best = ONSITE_LEAD_AGENTS.length; // timber-only / unaffiliated
  for (const key of listing.leadAgentKeys) {
    const idx = ONSITE_LEAD_AGENT_KEYS.indexOf(key);
    if (idx >= 0 && idx < best) best = idx;
  }
  return best;
}

const STATUS_ORDER: Record<StatusTone, number> = {
  active: 0,
  pending: 1,
  sold: 2,
};

function statusSortKey(listing: OnsiteListing) {
  return STATUS_ORDER[getListingStatusBadge(listing).tone] ?? 2;
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

function sortByStatusThenDate(a: OnsiteListing, b: OnsiteListing, sortBy: string) {
  const statusDiff = statusSortKey(a) - statusSortKey(b);
  if (statusDiff !== 0) return statusDiff;
  return compareOnsiteListings(a, b, sortBy);
}

export function parseOnsiteListingScope(value: string | null): OnsiteListingScope {
  if (value === "timber") return "timber";
  if (value && ONSITE_LEAD_AGENT_KEYS.includes(value)) return value;
  return "all";
}

/**
 * `all`: lead agents first (in config order — André, then Cindie, …), then
 * team-only; within a lead-agent group → Active → Pending → Sold.
 * A single-agent or `timber` scope: Active → Pending → Sold, then the sort.
 */
export function sortOnsiteListings(
  listings: OnsiteListing[],
  sortBy = "updatedOnDesc",
  scope: OnsiteListingScope = "all"
) {
  return [...listings].sort((a, b) => {
    if (scope !== "all") {
      return sortByStatusThenDate(a, b, sortBy);
    }

    const rankA = leadAgentRank(a);
    const rankB = leadAgentRank(b);
    if (rankA !== rankB) return rankA - rankB;

    // Same group: order lead-agent groups by status before date.
    if (rankA < ONSITE_LEAD_AGENTS.length) {
      const statusDiff = statusSortKey(a) - statusSortKey(b);
      if (statusDiff !== 0) return statusDiff;
    }

    return compareOnsiteListings(a, b, sortBy);
  });
}

/**
 * Merge one or more listing groups (timber + each lead agent), de-duplicating
 * by MLS#. Later groups fill in agents/office when the earlier entry lacks them.
 */
export function mergeOnsiteListings(...groups: TaggableListing[][]) {
  const byMls = new Map<string, TaggableListing>();

  for (const group of groups) {
    for (const listing of group) {
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
  }

  return Array.from(byMls.values()).map(tagOnsiteListing);
}
