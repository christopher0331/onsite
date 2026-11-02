// Listing Broker attribution (MLS Grid IDX Rule 22 / NWMLS Data Use Policy E.2, E.6).
// Built only from data the listing record already carries (Repliers normalized
// `agents` / `office` / `buyerAgents` + `raw` MLS Grid fields); no extra API calls.

type RawLike = Record<string, unknown> | null | undefined;

type AgentLike = {
  name?: string | null;
  phones?: string[] | null;
  brokerage?: { name?: string | null } | null;
};

export type BrokerListingLike = {
  office?: { brokerageName?: string | null } | null;
  agents?: AgentLike[] | null;
  buyerAgents?: AgentLike[] | null;
  raw?: RawLike;
};

export type ListingBrokerInfo = {
  firm: string;
  broker: string;
  phone: string;
  email: string;
  /** Buyer brokerage firm (shown on sold listings). */
  buyerFirm: string;
};

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function firstNonEmpty(...vals: unknown[]): string {
  for (const v of vals) {
    const t = s(v);
    if (t) return t;
  }
  return "";
}

export function getListingBrokerInfo(listing: BrokerListingLike): ListingBrokerInfo {
  const raw = listing.raw ?? {};
  const agent = listing.agents?.[0];
  const buyer = listing.buyerAgents?.[0];
  return {
    firm: firstNonEmpty(raw.ListOfficeName, listing.office?.brokerageName, agent?.brokerage?.name),
    broker: firstNonEmpty(raw.ListAgentFullName, agent?.name),
    phone: firstNonEmpty(
      agent?.phones?.[0],
      raw.ListAgentPreferredPhone,
      raw.ListAgentDirectPhone,
      raw.ListOfficePhone
    ),
    email: firstNonEmpty(raw.ListAgentEmail, raw.ListOfficeEmail),
    buyerFirm: firstNonEmpty(raw.BuyerOfficeName, buyer?.brokerage?.name, raw.CoBuyerOfficeName),
  };
}

/** "Firm; Broker; Phone; Email" with any missing parts skipped. */
export function formatListingBrokerParts(info: ListingBrokerInfo): string[] {
  return [info.firm, info.broker, info.phone, info.email].filter(Boolean);
}
