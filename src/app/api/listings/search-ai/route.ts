import { NextRequest, NextResponse } from "next/server";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";
import { tagOnsiteListings } from "@/lib/onsite-listings";
import type { CardListing } from "@/components/ListingCard";

const MAX_PROMPT_LENGTH = 400;
const RESULTS_PER_PAGE = "24";

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

  // 2) Run the generated listings query through our standard enrich pipeline so
  //    cards render identically to the rest of the site.
  let params: URLSearchParams;
  try {
    params = new URL(requestUrl).searchParams;
  } catch {
    return NextResponse.json(
      { error: "Couldn't understand that search.", summary, nlpId },
      { status: 200 }
    );
  }
  params.set("resultsPerPage", RESULTS_PER_PAGE);
  params.set("pageNum", "1");
  if (!params.has("state")) params.set("state", "WA");

  // "Has a basement" filter (`basement=not:null`) needs server-side validation
  // because of the NWMLS "None" quirk — see hasRealBasement above.
  const wantsBasement = (params.get("basement") || "").toLowerCase() === "not:null";

  // NLP may return an `imageSearchItems` body for visual descriptors
  // ("modern", "white kitchen", etc.). That requires the paid AI Image Search
  // add-on; without it Repliers rejects the request. We intentionally ignore
  // the image body and run the structured filters (beds/baths/price/city/etc.),
  // which still return strong results. To enable visual search later, POST
  // `nlp.request.body` to this URL once the account is authorized.
  const listingsUrlObj = new URL(repliersListingsUrl(`?${params.toString()}`));
  if (wantsBasement) {
    // Make sure the raw basement value comes back so we can validate it.
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
  let listings = tagOnsiteListings(enriched.listings ?? []);
  let count = enriched.count ?? listings.length;

  if (wantsBasement) {
    listings = listings.filter((l) =>
      hasRealBasement((l.raw as Record<string, unknown> | null)?.Basement)
    );
    // Repliers' total counts the "None" homes too, so report the validated set.
    count = listings.length;
  }

  return NextResponse.json({
    summary,
    nlpId,
    count,
    listings,
  });
}
