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
    // NLP not enabled on the Repliers key yet.
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

  const imageBody = nlp.request?.body;
  const listingsUrl = repliersListingsUrl(`?${params.toString()}`);

  let listingsRes: Response;
  try {
    listingsRes = await fetch(listingsUrl, {
      method: imageBody ? "POST" : "GET",
      headers,
      ...(imageBody ? { body: JSON.stringify(imageBody) } : {}),
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
  const listings = tagOnsiteListings(enriched.listings ?? []);

  return NextResponse.json({
    summary,
    nlpId,
    count: enriched.count ?? listings.length,
    listings,
  });
}
