"use client";

import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import { runAiSearch, AI_SEARCH_EXAMPLES, type AiSearchResult } from "@/lib/ai-search";

export default function AiSearchPanel() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiSearchResult | null>(null);
  const [refine, setRefine] = useState("");

  async function search(text: string, nlpId?: string | null) {
    const query = text.trim();
    if (!query || loading) return;
    setLoading(true);
    const res = await runAiSearch(query, nlpId);
    setResult(res);
    setLoading(false);
    if (typeof window !== "undefined" && (res.listings.length || res.error)) {
      // Keep the results in view after a refine.
      document
        .getElementById("ai-search-results")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRefine("");
    void search(prompt, null);
  }

  function handleRefine(e: React.FormEvent) {
    e.preventDefault();
    const text = refine.trim();
    if (!text) return;
    setRefine("");
    void search(text, result?.nlpId ?? null);
  }

  function clear() {
    setResult(null);
    setPrompt("");
    setRefine("");
  }

  const hasResults = (result?.listings.length ?? 0) > 0;

  return (
    <section className="border-b border-charcoal/10 bg-gradient-to-b from-white to-[#f7f3ed]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-charcoal/55">
            <SparkleIcon className="h-3.5 w-3.5" />
            AI-Powered Search
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-tight text-charcoal">
            Describe your dream home
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-charcoal/70">
            Skip the filters — just tell us what you want in plain words and we&apos;ll find
            matching homes across the MLS.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                maxLength={400}
                placeholder="e.g. modern 3-bed with a big yard in Bonney Lake under $750k"
                className="w-full rounded-full border border-charcoal/20 bg-white px-6 py-4 text-[15px] text-charcoal shadow-sm outline-none transition focus:border-charcoal/50"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="shrink-0 rounded-full bg-[#3daf3d] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#3daf3d]/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Searching…" : "Search"}
              </button>
            </div>
          </form>

          {!result && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {AI_SEARCH_EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setPrompt(example);
                    void search(example, null);
                  }}
                  className="rounded-full border border-charcoal/15 bg-white/60 px-4 py-2 text-[12px] text-charcoal/70 transition hover:border-charcoal/35 hover:text-charcoal"
                >
                  {example}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div id="ai-search-results" className="mt-12">
            {result.error ? (
              <div className="mx-auto max-w-2xl rounded-2xl border border-charcoal/10 bg-white px-6 py-8 text-center">
                <p className="text-[15px] text-charcoal/80">{result.error}</p>
                <button
                  onClick={clear}
                  className="mt-5 text-[11px] uppercase tracking-[0.2em] text-charcoal/60 underline-offset-4 hover:text-charcoal hover:underline"
                >
                  Clear AI search
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    {result.summary ? (
                      <p className="text-[14px] leading-relaxed text-charcoal/80">
                        <span className="text-charcoal/55">Showing matches for:</span>{" "}
                        {result.summary}
                      </p>
                    ) : (
                      <p className="text-[14px] text-charcoal/80">Here&apos;s what I found.</p>
                    )}
                    <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-charcoal/55">
                      {result.count} {result.count === 1 ? "home" : "homes"}
                    </p>
                    {result.features && result.features.length > 0 && (
                      <p className="mt-2 text-[12px] text-charcoal/60">
                        Checking listing remarks for: {result.features.join(", ")}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={clear}
                    className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60 underline-offset-4 hover:text-charcoal hover:underline"
                  >
                    Clear AI search
                  </button>
                </div>

                {result.message && !hasResults ? (
                  <div className="mx-auto max-w-2xl rounded-2xl border border-charcoal/10 bg-white px-6 py-8 text-center">
                    <p className="text-[15px] text-charcoal/80">{result.message}</p>
                  </div>
                ) : hasResults ? (
                  <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {result.listings.map((listing) => (
                        <div key={listing.mlsNumber} className="flex flex-col gap-2">
                          <ListingCard listing={listing} sourceLabel={listing.sourceLabel} />
                          {listing.matchedTerms && listing.matchedTerms.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 px-1">
                              {listing.matchedTerms.map((term) => (
                                <span
                                  key={term}
                                  className="inline-flex items-center gap-1 rounded-full bg-charcoal/5 px-2.5 py-1 text-[11px] text-charcoal/75"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  {term}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleRefine}
                      className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
                    >
                      <input
                        type="text"
                        value={refine}
                        onChange={(e) => setRefine(e.target.value)}
                        maxLength={400}
                        placeholder="Refine — e.g. only with a garage, or under $600k"
                        className="w-full rounded-full border border-charcoal/20 bg-white px-6 py-3.5 text-[14px] text-charcoal outline-none transition focus:border-charcoal/50"
                      />
                      <button
                        type="submit"
                        disabled={loading || !refine.trim()}
                        className="shrink-0 rounded-full border border-charcoal/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-charcoal transition hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {loading ? "Refining…" : "Refine"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="mx-auto max-w-2xl rounded-2xl border border-charcoal/10 bg-white px-6 py-8 text-center">
                    <p className="text-[15px] text-charcoal/80">
                      No homes matched that exactly. Try broadening your search.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
      <path d="M19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6L15.5 17.5l2.6-.9L19 14z" opacity="0.6" />
    </svg>
  );
}
