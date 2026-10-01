import { NextResponse } from "next/server";
import {
  botGateBlockReason,
  clientIpFromHeaders,
  consumeRateLimit,
  evaluateFormBotGate,
  type BotGateReason,
} from "../../../lib/formBotGate";

export type GuardResult =
  | { blocked: false }
  | { blocked: true; reason: BotGateReason };

/**
 * Shared server gate for routes that accept lead / contact submissions.
 * Blocked requests should return a fake 200 success so bots do not learn,
 * and nothing is forwarded to email, CRM, or webhooks.
 */
export function guardLeadRequest(req: Request, body: Record<string, unknown>): GuardResult {
  const verdict = evaluateFormBotGate(body);
  if (!verdict.allow) {
    const reason = botGateBlockReason(verdict) ?? "honeypot";
    console.warn(`[bot-gate] suppressed submission (${reason})`);
    return { blocked: true, reason };
  }

  const ip = clientIpFromHeaders(req.headers);
  if (!consumeRateLimit(`lead:${ip}`)) {
    console.warn(`[bot-gate] rate-limited ${ip}`);
    return { blocked: true, reason: "rate_limit" };
  }

  return { blocked: false };
}

/** Same JSON shape as a real contact success (`{ ok: true }`). */
export function fakeLeadSuccess() {
  return NextResponse.json({ ok: true });
}
