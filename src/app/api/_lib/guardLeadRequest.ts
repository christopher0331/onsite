import {
  botGateBlockReason,
  clientIpFromHeaders,
  consumeRateLimit,
  evaluateFormBotGate,
  type BotGateReason,
} from "../../../lib/formBotGate";
import { persistFilteredSubmission } from "./persistFilteredSubmission";

export type GuardResult =
  | { blocked: false }
  | { blocked: true; reason: BotGateReason };

/**
 * Shared server gate for routes that accept lead / contact submissions.
 * Blocked requests should return a fake 200 success so bots do not learn,
 * and nothing is forwarded to email, CRM, or webhooks.
 *
 * Suppressed submissions are fail-soft logged to the Netlify Blobs store
 * `filtered-submissions` (see persistFilteredSubmission.ts). Blob failures
 * never change the filter outcome or fake-success response.
 */
export async function guardLeadRequest(
  req: Request,
  body: Record<string, unknown>,
): Promise<GuardResult> {
  const verdict = evaluateFormBotGate(body);
  if (!verdict.allow) {
    const reason = botGateBlockReason(verdict) ?? "honeypot";
    console.warn(`[bot-gate] suppressed submission (${reason})`);
    await persistFilteredSubmission(req, body, reason);
    return { blocked: true, reason };
  }

  const ip = clientIpFromHeaders(req.headers);
  if (!consumeRateLimit(`lead:${ip}`)) {
    console.warn(`[bot-gate] rate-limited ${ip}`);
    await persistFilteredSubmission(req, body, "rate_limit");
    return { blocked: true, reason: "rate_limit" };
  }

  return { blocked: false };
}

/** Same JSON shape as a real contact success (`{ ok: true }`). */
export function fakeLeadSuccess() {
  return Response.json({ ok: true });
}
