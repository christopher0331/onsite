import type { OnsiteListing } from "@/lib/onsite-listings";

export type AiSearchResult = {
  summary: string;
  nlpId: string | null;
  count: number;
  listings: OnsiteListing[];
  /** Soft, in-band message (e.g. off-topic prompt) — not a hard error. */
  message?: string;
  /** Hard error to surface to the user. */
  error?: string;
  /** Machine-readable error code, e.g. "nlp_disabled". */
  code?: string;
};

/** Call the server-side AI search route. Pass `nlpId` to refine conversationally. */
export async function runAiSearch(
  prompt: string,
  nlpId?: string | null
): Promise<AiSearchResult> {
  let res: Response;
  try {
    res = await fetch("/api/listings/search-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, nlpId: nlpId ?? undefined }),
    });
  } catch {
    return {
      summary: "",
      nlpId: nlpId ?? null,
      count: 0,
      listings: [],
      error: "Search is temporarily unavailable. Please try again.",
    };
  }

  let data: Partial<AiSearchResult> = {};
  try {
    data = (await res.json()) as Partial<AiSearchResult>;
  } catch {
    /* fall through to error handling */
  }

  if (!res.ok) {
    return {
      summary: "",
      nlpId: nlpId ?? null,
      count: 0,
      listings: [],
      error: data?.error || "Search is temporarily unavailable. Please try again.",
      code: data?.code,
    };
  }

  return {
    summary: data.summary || "",
    nlpId: data.nlpId ?? null,
    count: data.count || 0,
    listings: data.listings || [],
    message: data.message,
  };
}

export const AI_SEARCH_EXAMPLES = [
  "Modern 3-bed with a big yard in Bonney Lake under $750k",
  "Waterfront home on Lake Tapps with a dock",
  "Move-in ready rambler in Puyallup with a 3-car garage",
  "New construction in Tehaleh with 4 bedrooms",
];
