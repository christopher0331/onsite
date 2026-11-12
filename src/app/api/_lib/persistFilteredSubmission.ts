import { createHash, randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";
import type { BotGateReason } from "../../../lib/formBotGate";
import { clientIpFromHeaders } from "../../../lib/formBotGate";

/**
 * Persist bot-gate-suppressed lead submissions to the site-wide Netlify Blobs
 * store named `filtered-submissions`.
 *
 * How to view (no public UI — ops only):
 * 1. Netlify UI → site `onsite-regroup` (onsiteregroup.com)
 * 2. Project configuration → Blobs (or Storage → Blobs, depending on UI)
 * 3. Open the store named exactly `filtered-submissions`
 * 4. Each key is one suppressed POST; JSON has reason, timestamp, page,
 *    user_agent, ip_hash (salted SHA-256), and fields (full form body)
 *
 * Writes are fail-soft: a missing Blobs context (local tests, cold misconfig)
 * or a network error must never change the fake-success response or throw
 * into the lead route. Filtered leads are never emailed.
 */

export type FilteredSubmissionRecord = {
  reason: BotGateReason;
  timestamp: string;
  page: string;
  user_agent: string;
  ip_hash: string;
  fields: Record<string, unknown>;
};

function ipSalt(): string {
  return (
    process.env.FILTERED_SUBMISSIONS_IP_SALT ||
    process.env.NETLIFY_SITE_ID ||
    "onsite-filtered-submissions"
  );
}

export function hashClientIp(ip: string): string {
  return createHash("sha256").update(`${ipSalt()}:${ip}`).digest("hex");
}

function pageFromRequest(req: Request, body: Record<string, unknown>): string {
  const fromBody = [body.page, body.pathname, body.path, body.source]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .find(Boolean);
  if (fromBody) return fromBody;

  const referer = req.headers.get("referer") || req.headers.get("referrer");
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.pathname}${url.search}` || referer;
    } catch {
      return referer;
    }
  }

  try {
    return new URL(req.url).pathname;
  } catch {
    return "unknown";
  }
}

/**
 * Fail-soft write of one suppressed submission. Never throws to the caller.
 */
export async function persistFilteredSubmission(
  req: Request,
  body: Record<string, unknown>,
  reason: BotGateReason,
): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    const ip = clientIpFromHeaders(req.headers);
    const record: FilteredSubmissionRecord = {
      reason,
      timestamp,
      page: pageFromRequest(req, body),
      user_agent: req.headers.get("user-agent") || "",
      ip_hash: hashClientIp(ip),
      fields: { ...body },
    };

    const store = getStore("filtered-submissions");
    const key = `${timestamp.replace(/[:.]/g, "-")}-${randomUUID()}`;
    await store.setJSON(key, record);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.warn(`[bot-gate] filtered-submissions blob write failed: ${detail}`);
  }
}
