// Centralised status mapping for any surface that renders an NWMLS / MLS
// Grid listing (cards, detail page hero, map popups). Auditor requires the
// full sub-status to be visible everywhere — i.e. "Pending – Backup Offer
// Requested" rather than a flat "Pending" — so all displays read from this
// helper.
//
// Inputs come from Repliers (RESO standardStatus + NWMLS lastStatus codes).

export type StatusTone = "active" | "pending" | "sold";

export type ListingStatusBadge = {
  label: string;
  tone: StatusTone;
};

// NWMLS pending sub-status codes that Repliers exposes via `lastStatus`
// for listings whose RESO `standardStatus` is "Pending".
const PENDING_SUBSTATUS_LABELS: Record<string, string> = {
  Pen: "Pending",
  Pi: "Pending Inspection",
  Ps: "Pending Short Sale",
  Pf: "Pending Feasibility",
  Pba: "Pending – Backup Offer Requested",
};

// NWMLS contingent sub-status codes that Repliers exposes via `lastStatus`
// for listings whose RESO `standardStatus` is "Active Under Contract".
const CONTINGENT_SUBSTATUS_LABELS: Record<string, string> = {
  Sc: "Contingent",
  Ctg: "Contingent",
};

type StatusInput = {
  status?: string | null;
  lastStatus?: string | null;
  standardStatus?: string | null;
};

export function getListingStatusBadge(l: StatusInput): ListingStatusBadge {
  const standard = (l.standardStatus || "").trim();
  const last = (l.lastStatus || "").trim();

  if (standard) {
    const lc = standard.toLowerCase();
    if (lc === "active") return { label: "Active", tone: "active" };
    if (lc === "closed") return { label: "Sold", tone: "sold" };
    if (lc === "active under contract") {
      return {
        label: CONTINGENT_SUBSTATUS_LABELS[last] || "Contingent",
        tone: "pending",
      };
    }
    if (lc === "pending") {
      return {
        label: PENDING_SUBSTATUS_LABELS[last] || "Pending",
        tone: "pending",
      };
    }
    // Canceled / Expired / Hold / Withdrawn / Coming Soon — surface verbatim.
    return { label: standard, tone: "sold" };
  }

  // Fallback for older / partial Repliers payloads that only ship lastStatus.
  if (PENDING_SUBSTATUS_LABELS[last]) {
    return { label: PENDING_SUBSTATUS_LABELS[last], tone: "pending" };
  }
  if (CONTINGENT_SUBSTATUS_LABELS[last]) {
    return { label: CONTINGENT_SUBSTATUS_LABELS[last], tone: "pending" };
  }
  if (l.status === "U") {
    if (last === "Sld") return { label: "Sold", tone: "sold" };
    return { label: last || "Off-Market", tone: "sold" };
  }
  return { label: "Active", tone: "active" };
}
