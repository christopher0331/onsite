import { NextRequest, NextResponse } from "next/server";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import { tagOnsiteListings } from "@/lib/onsite-listings";
import { detectFeatures, matchFeaturesInText } from "@/lib/listing-search-terms";
import type { CardListing } from "@/components/ListingCard";

const MAX_PROMPT_LENGTH = 400;
const RESULTS_PER_PAGE = "24";
// When feature/remark matching is in play we pull a wider candidate pool, then
// rank + trim down to RESULTS_PER_PAGE after matching against the remarks.
const CANDIDATE_POOL = "100";

// Repliers' NLP reliably maps these structured filters. Anything else it emits
// (style, parkingType, waterfront, view, etc.) is dropped — those are handled
// by our remark-matching layer, and NLP gets them wrong often enough
// (e.g. style=Dock) to break otherwise-good searches.
const ALLOWED_NLP_PARAMS = new Set([
  "city", "area", "neighborhood", "state", "zip", "lat", "long", "radius",
  "minPrice", "maxPrice",
  "minBeds", "maxBeds", "minBaths", "maxBaths", "minBathrooms", "maxBathrooms",
  "minSqft", "maxSqft", "minLotSize", "maxLotSize",
  "minYearBuilt", "maxYearBuilt",
  "propertyType", "class", "type",
  "minGarageSpaces", "maxGarageSpaces", "minParkingSpaces",
  "basement",
  "status", "standardStatus", "lastStatus",
  "sortBy",
]);

// Geographic/price filters that already narrow the result set on their own.
const NARROWING_PARAMS = [
  "city", "area", "neighborhood", "zip", "lat", "long", "radius", "minPrice", "maxPrice",
];

type AiListing = ReturnType<typeof tagOnsiteListings>[number] & {
  matchedTerms?: string[];
};

function descriptionOf(listing: AiListing): string {
  const details = listing.details as { description?: string | null } | null | undefined;
  return details?.description ?? "";
}

// Lightweight per-IP throttle. Every prompt costs an OpenAI call (billed to the
// Repliers-linked key), so we cap bursts. Note: in-memory state only protects a
// single server instance — pair with edge/CDN rate limiting for heavy traffic.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

type NlpResponse = {
  request?: { url?: string; body?: unknown; summary?: string };
  nlpId?: string;
};

// NWMLS records "no basement" as the literal string "None" (not an empty/null
// value), so Repliers' NLP filter `basement=not:null` still lets those homes
// through. Treat a basement as real only when a non-"None" value is present.
function hasRealBasement(value: unknown): boolean {
  const arr = Array.isArray(value) ? value : value != null ? [value] : [];
  return arr.some((v) => {
    const s = String(v).trim().toLowerCase();
    return s !== "" && s !== "none";
  });
}

export async function POST(req: NextRequest) {
  const key = process.env.REPLIERS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Search is not configured." }, { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You're searching quickly — give it a few seconds and try again." },
      { status: 429 }
    );
  }

  let payload: { prompt?: string; nlpId?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const prompt = (payload.prompt || "").trim().slice(0, MAX_PROMPT_LENGTH);
  if (!prompt) {
    return NextResponse.json(
      { error: "Tell me what kind of home you're looking for." },
      { status: 400 }
    );
  }

  const headers = {
    "repliers-api-key": key,
    "Content-Type": "application/json",
  };

  // 1) Translate the natural-language prompt into a structured listings request.
  let nlpRes: Response;
  try {
    nlpRes = await fetch("https://api.repliers.io/nlp", {
      method: "POST",
      headers,
      body: JSON.stringify(
        payload.nlpId ? { prompt, nlpId: payload.nlpId } : { prompt }
      ),
    });
  } catch {
    return NextResponse.json(
      { error: "Search is temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }

  if (nlpRes.status === 406) {
    return NextResponse.json({
      summary: "",
      nlpId: payload.nlpId ?? null,
      listings: [],
      count: 0,
      message:
        "That doesn't look like a home search. Try describing the home you want — location, beds, budget, or style.",
    });
  }
  if (nlpRes.status === 403) {
    // A 403 here covers two very different cases:
    //   1. NLP not enabled on the Repliers key (feature access), or
    //   2. The linked OpenAI key erroring (rate limit / insufficient quota),
    //      which Repliers surfaces as a 403 with an OpenAI error body.
    const detail = await nlpRes.text();
    const isOpenAiError = /openai|rate.?limit|quota/i.test(detail);
    if (isOpenAiError) {
      return NextResponse.json(
        {
          error:
            "AI search is busy right now — please try again in a few seconds.",
          code: "nlp_busy",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        error:
          "AI search isn't switched on for this site yet. Please use the filters below in the meantime.",
        code: "nlp_disabled",
      },
      { status: 503 }
    );
  }
  if (!nlpRes.ok) {
    return NextResponse.json(
      { error: "Search is temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }

  const nlp = (await nlpRes.json()) as NlpResponse;
  const requestUrl = nlp.request?.url;
  const summary = nlp.request?.summary || "";
  const nlpId = nlp.nlpId ?? null;

  if (!requestUrl) {
    return NextResponse.json({
      summary,
      nlpId,
      listings: [],
      count: 0,
      message: "I couldn't turn that into a search. Try rephrasing it.",
    });
  }

  // 2) Build the listings query. Keep only the structured filters NLP gets
  //    right (geography, price, beds/baths, type); drop its unreliable
  //    feature guesses. We re-add features ourselves via remark matching.
  let rawParams: URLSearchParams;
  try {
    rawParams = new URL(requestUrl).searchParams;
  } catch {
    return NextResponse.json(
      { error: "Couldn't understand that search.", summary, nlpId },
      { status: 200 }
    );
  }

  const params = new URLSearchParams();
  for (const [k, v] of rawParams.entries()) {
    if (ALLOWED_NLP_PARAMS.has(k)) params.append(k, v);
  }

  // Detect lifestyle/feature terms straight from the visitor's words.
  const features = detectFeatures(prompt);
  const featureLabels = features.map((f) => f.label);
  const hasNarrowing = NARROWING_PARAMS.some((p) => params.has(p));

  params.set("pageNum", "1");
  if (!params.has("state")) params.set("state", "WA");
  // With features we pull a wider pool to rank against the remarks; otherwise
  // the structured filters alone are the result set.
  params.set("resultsPerPage", features.length ? CANDIDATE_POOL : RESULTS_PER_PAGE);

  // If features were requested but nothing geographic/price narrows the search,
  // anchor the API query on the first feature's primary term so we don't scan
  // all of WA. (Repliers description search is token-AND with no OR, so we only
  // anchor on one term; full synonym matching happens in the post-filter.)
  if (features.length && !hasNarrowing) {
    // Prefer a single-word anchor (Repliers search is token-AND), e.g. "shop"
    // over "detached shop", so we don't over-restrict the candidate pool.
    const anchorTerm =
      features[0].terms.find((t) => !/[\s-]/.test(t)) ?? features[0].terms[0];
    params.set("searchFields", "details.description");
    params.set("search", anchorTerm);
  }

  // "Has a basement" filter (`basement=not:null`) needs server-side validation
  // because of the NWMLS "None" quirk — see hasRealBasement above.
  const wantsBasement = (params.get("basement") || "").toLowerCase() === "not:null";

  const listingsUrlObj = new URL(repliersListingsUrl(`?${params.toString()}`));
  if (wantsBasement) {
    const fields = listingsUrlObj.searchParams.get("fields") || "";
    if (!fields.includes("raw.Basement")) {
      listingsUrlObj.searchParams.set("fields", `${fields},raw.Basement`);
    }
  }
  const listingsUrl = listingsUrlObj.toString();

  let listingsRes: Response;
  try {
    listingsRes = await fetch(listingsUrl, {
      method: "GET",
      headers,
      next: { revalidate: 120 },
    });
  } catch {
    return NextResponse.json(
      { error: "Couldn't load matching homes.", summary, nlpId },
      { status: 502 }
    );
  }
  if (!listingsRes.ok) {
    return NextResponse.json(
      { error: "Couldn't load matching homes.", summary, nlpId },
      { status: 502 }
    );
  }

  const enriched = enrichListingsResponse(await listingsRes.json()) as {
    count?: number;
    listings?: Array<CardListing & { agents?: Array<{ name?: string; boardAgentId?: string }> | null }>;
  };
  let listings: AiListing[] = tagOnsiteListings(enriched.listings ?? []);
  let count = enriched.count ?? listings.length;

  if (wantsBasement) {
    listings = listings.filter((l) =>
      hasRealBasement((l.raw as Record<string, unknown> | null)?.Basement)
    );
    count = listings.length;
  }

  // 3) Match the requested features against each listing's remarks. Listings
  //    that hit the most features rank first; partial matches still surface.
  if (features.length) {
    const scored = listings.map((listing) => {
      const matchedTerms = matchFeaturesInText(descriptionOf(listing), features);
      return { listing: { ...listing, matchedTerms }, score: matchedTerms.length };
    });
    const withMatch = scored.filter((s) => s.score > 0);
    const ranked = (withMatch.length ? withMatch : scored).sort(
      (a, b) => b.score - a.score
    );
    listings = ranked.map((s) => s.listing).slice(0, Number(RESULTS_PER_PAGE));
    count = withMatch.length ? withMatch.length : listings.length;
  }

  return NextResponse.json({
    summary,
    nlpId,
    count,
    features: featureLabels,
    listings,
  });
}
