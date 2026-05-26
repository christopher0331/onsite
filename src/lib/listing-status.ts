// Centralised status mapping for any surface that renders an NWMLS / MLS
// Grid listing (cards, detail page hero, map popups). Auditor requires the
// full sub-status to be visible everywhere — e.g. "Pending – Backup Offer
// Requested" rather than a flat "Pending".
//
// Prefer Repliers `raw.MlsStatus` when present (requires `fields=raw` on the
// API request). Fall back to RESO standardStatus + NWMLS lastStatus codes.

import { formatMlsStatusLabel, type RepliersRaw } from "@/lib/repliers-enrich";

export type StatusTone = "active" | "pending" | "sold";

export type ListingStatusBadge = {
  label: string;
  tone: StatusTone;
};

// NWMLS pending sub-status codes via normalized `lastStatus` (legacy).
const PENDING_SUBSTATUS_LABELS: Record<string, string> = {
  Pen: "Pending",
  Pi: "Pending Inspection",
  Ps: "Pending Short Sale",
  Pf: "Pending Feasibility",
  Pba: "Pending – Backup Offer Requested",
};

const CONTINGENT_SUBSTATUS_LABELS: Record<string, string> = {
  Sc: "Contingent",
  Ctg: "Contingent",
};

type StatusInput = {
  status?: string | null;
  lastStatus?: string | null;
  standardStatus?: string | null;
  raw?: RepliersRaw | null;
};

function toneFromMlsStatus(mlsStatus: string): StatusTone {
  const lc = mlsStatus.toLowerCase();
  if (lc === "sold" || lc.includes("closed") || lc.includes("cancel") || lc.includes("expir")) {
    return "sold";
  }
  if (
    lc.includes("pending") ||
    lc.includes("contingent") ||
    lc.includes("backup") ||
    lc.includes("inspection") ||
    lc.includes("feasibility") ||
    lc.includes("short sale") ||
    lc.includes("active under contract")
  ) {
    return "pending";
  }
  if (lc === "active" || lc.includes("new")) return "active";
  return "sold";
}

function toneFromStandard(standard: string): StatusTone {
  const lc = standard.toLowerCase();
  if (lc === "active") return "active";
  if (lc === "closed") return "sold";
  if (lc === "active under contract" || lc === "pending") return "pending";
  return "sold";
}

export function getListingStatusBadge(l: StatusInput): ListingStatusBadge {
  const rawStatus = l.raw?.MlsStatus;
  const mlsStatus =
    typeof rawStatus === "string"
      ? rawStatus.trim()
      : typeof rawStatus === "number"
        ? String(rawStatus)
        : "";
  if (mlsStatus) {
    return {
      label: formatMlsStatusLabel(mlsStatus),
      tone: toneFromMlsStatus(mlsStatus),
    };
  }

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
    return { label: standard, tone: toneFromStandard(standard) };
  }

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
