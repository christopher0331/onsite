/**
 * First-party bot gate for public lead forms.
 *
 * Ported from MyFence (`src/lib/formBotGate.ts`), which is the gate Seattle
 * Fence posts through. No third-party CAPTCHA. Checks are cheap and invisible
 * to humans.
 *
 * Field names are intentionally mundane so they look like real inputs to
 * autofill bots, but they are visually hidden and autocomplete=off so browsers
 * and password managers should leave them alone.
 */

export const BOT_GATE_HONEYPOT_FIELDS = ["website", "fax_number"] as const;
export const BOT_GATE_LOADED_AT_FIELD = "form_loaded_at";

/** Reject submits faster than a human filling a real contact form. */
export const MIN_SUBMIT_MS = 3000;

/** Reject timestamps that are impossibly old or clearly tampered (clock skew). */
export const MAX_SUBMIT_MS = 48 * 60 * 60 * 1000;

export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
/** 8 / 10 min. Leaves room for a retry without letting a burst through. */
export const RATE_LIMIT_MAX = 8;

export type BotGateReason =
  | "honeypot"
  | "too_fast"
  | "stale_or_tampered"
  | "missing_timestamp"
  | "gibberish_name"
  | "rate_limit";

export type BotGateVerdict =
  | { allow: true }
  | { allow: false; reason: BotGateReason };

/**
 * Read the block reason without relying on `!verdict.allow` narrowing.
 */
export function botGateBlockReason(verdict: BotGateVerdict): BotGateReason | undefined {
  return "reason" in verdict ? verdict.reason : undefined;
}

export type BotGateFields = {
  website?: string;
  fax_number?: string;
  form_loaded_at?: number | string;
};

export type BotGateOptions = {
  now?: number;
  requireTimestamp?: boolean;
  checkNames?: boolean;
};

const PAGE_LOADED_AT_KEY = "__osBotGateLoadedAt";

export function getPageLoadedAt(): number {
  if (typeof window === "undefined") {
    return Date.now();
  }
  const w = window as Window & { [PAGE_LOADED_AT_KEY]?: number };
  if (typeof w[PAGE_LOADED_AT_KEY] !== "number") {
    w[PAGE_LOADED_AT_KEY] = Date.now();
  }
  return w[PAGE_LOADED_AT_KEY];
}

export function attachBotGateFields<T extends Record<string, unknown>>(
  body: T,
): T & Required<BotGateFields> {
  const website = typeof body.website === "string" ? body.website : "";
  const fax = typeof body.fax_number === "string" ? body.fax_number : "";
  const loadedRaw = body[BOT_GATE_LOADED_AT_FIELD];
  const loadedAt =
    typeof loadedRaw === "number" && Number.isFinite(loadedRaw)
      ? loadedRaw
      : typeof loadedRaw === "string" && loadedRaw.trim() && Number.isFinite(Number(loadedRaw))
        ? Number(loadedRaw)
        : getPageLoadedAt();

  return {
    ...body,
    website,
    fax_number: fax,
    form_loaded_at: loadedAt,
  };
}

function toTrimmedString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value == null) return "";
  return String(value).trim();
}

export function honeypotFilled(body: Record<string, unknown>): boolean {
  return BOT_GATE_HONEYPOT_FIELDS.some((field) => toTrimmedString(body[field]).length > 0);
}

function parseLoadedAt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

/**
 * High-confidence nonsense-name detector for the spam wave
 * (Jpkwuws, Hqvaal Soktme, Augblzr Tbnwu) plus URL-shaped and very long
 * tokens. Conservative to avoid real names like Schwartz, Nguyen, Christopher.
 */
export function tokenLooksRandom(token: string): boolean {
  const raw = token.trim();
  if (/https?:\/\/|www\./i.test(raw)) return true;

  const s = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (s.length < 5) return false;

  // A single token this long is not a personal name (pasted gibberish).
  if (s.length >= 40) return true;

  // q not followed by u is vanishingly rare in given names (Hqvaal).
  if (/q(?!u)/.test(s)) return true;

  // Five+ consonants in a row (Augblzr). Four is too tight (Schmidt, Schwartz).
  if (/[bcdfghjklmnpqrstvwxz]{5,}/.test(s)) return true;

  const vowelCount = (s.match(/[aeiouy]/g) || []).length;
  const vowelRatio = vowelCount / s.length;
  // Jpkwuws: long, almost no vowels, and no a/e/i/o. Schmidt has an "i" and must pass.
  if (s.length >= 6 && vowelRatio < 0.22 && !/[aeio]/.test(s)) return true;

  return false;
}

export function looksLikeGibberishName(...parts: Array<string | undefined>): boolean {
  const joined = parts.filter((part) => part && part.trim()).join(" ");
  if (/https?:\/\/|www\./i.test(joined)) return true;

  const tokens = parts
    .flatMap((part) => (part ?? "").trim().split(/\s+/))
    .map((t) => t.trim())
    .filter((t) => t.replace(/[^a-zA-Z]/g, "").length >= 5 || /https?:\/\/|www\./i.test(t));

  if (tokens.length === 0) return false;

  const flagged = tokens.filter(tokenLooksRandom);
  // Single given-name field (Jpkwuws) or both halves of "Augblzr Tbnwu".
  if (tokens.length === 1) return flagged.length === 1;
  return flagged.length >= 1 && tokenLooksRandom(tokens[0]);
}

export function namesFromLeadBody(body: Record<string, unknown>): string[] {
  return [
    toTrimmedString(body.firstName ?? body.first_name),
    toTrimmedString(body.lastName ?? body.last_name),
    toTrimmedString(body.fullName ?? body.full_name ?? body.name),
    toTrimmedString(body.referrerFirstName),
    toTrimmedString(body.referrerLastName),
    toTrimmedString(body.referredName),
  ].filter(Boolean);
}

export function evaluateFormBotGate(
  body: Record<string, unknown>,
  options: BotGateOptions = {},
): BotGateVerdict {
  const now = options.now ?? Date.now();
  const requireTimestamp = options.requireTimestamp !== false;
  const checkNames = options.checkNames !== false;

  if (honeypotFilled(body)) {
    return { allow: false, reason: "honeypot" };
  }

  const loadedAt = parseLoadedAt(body[BOT_GATE_LOADED_AT_FIELD]);
  if (loadedAt == null) {
    if (requireTimestamp) {
      return { allow: false, reason: "missing_timestamp" };
    }
  } else {
    const elapsed = now - loadedAt;
    if (elapsed < 0 || elapsed > MAX_SUBMIT_MS) {
      return { allow: false, reason: "stale_or_tampered" };
    }
    if (elapsed < MIN_SUBMIT_MS) {
      return { allow: false, reason: "too_fast" };
    }
  }

  if (checkNames && looksLikeGibberishName(...namesFromLeadBody(body))) {
    return { allow: false, reason: "gibberish_name" };
  }

  return { allow: true };
}

/** Browser-only: honeypot + timing. Name/timestamp-required stay on the server. */
export function evaluateClientBotGate(body: Record<string, unknown>): BotGateVerdict {
  return evaluateFormBotGate(body, { requireTimestamp: false, checkNames: false });
}

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

/**
 * In-memory sliding window. On Netlify/serverless this is per-instance and
 * resets when the isolate goes cold — it still blunts a rapid-fire burst on
 * a warm instance. Not a global quota.
 */
export function consumeRateLimit(
  key: string,
  limit = RATE_LIMIT_MAX,
  windowMs = RATE_LIMIT_WINDOW_MS,
  now = Date.now(),
): boolean {
  if (rateBuckets.size > 2000) {
    rateBuckets.forEach((bucket, k) => {
      if (now >= bucket.resetAt) rateBuckets.delete(k);
    });
  }

  const existing = rateBuckets.get(key);
  if (!existing || now >= existing.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

/** Test helper — do not use in production request paths. */
export function resetRateLimitForTests(): void {
  rateBuckets.clear();
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
