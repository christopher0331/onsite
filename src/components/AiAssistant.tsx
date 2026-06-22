"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { runAiSearch, AI_SEARCH_EXAMPLES, type AiSearchListing } from "@/lib/ai-search";

const CDN = "https://cdn.repliers.io/";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  listings?: AiSearchListing[];
  isError?: boolean;
};

const GREETING: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Hi! Tell me what you're looking for — like \"3-bed with a yard in Bonney Lake under $700k\" — and I'll pull matching homes.",
};

function imageUrl(images?: string[] | null) {
  if (!images?.length) return null;
  const path = images[0];
  return path.startsWith("http") ? path : CDN + path;
}

function priceLabel(listing: AiSearchListing) {
  const value = listing.soldPrice || listing.listPrice;
  if (!value || Number.isNaN(value)) return "Price on request";
  return "$" + value.toLocaleString("en-US");
}

function specLine(listing: AiSearchListing) {
  const d = listing.details ?? {};
  const parts: string[] = [];
  if (d.numBedrooms) parts.push(`${d.numBedrooms} bd`);
  if (d.numBathrooms) parts.push(`${d.numBathrooms} ba`);
  if (d.sqft) parts.push(`${Number(d.sqft).toLocaleString("en-US")} sqft`);
  return parts.join(" · ");
}

function addressLine(listing: AiSearchListing) {
  const a = listing.address;
  if (!a) return "Address unavailable";
  if (listing.permissions?.displayAddressOnInternet === "N") {
    return [a.city, a.state].filter(Boolean).join(", ") || "Undisclosed";
  }
  const street = [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
  return street || [a.city, a.state].filter(Boolean).join(", ") || "Address unavailable";
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nlpId, setNlpId] = useState<string | null>(null);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = { id: idRef.current++, role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await runAiSearch(query, nlpId);
    if (res.nlpId) setNlpId(res.nlpId);

    let text2 = "";
    let isError = false;
    if (res.error) {
      text2 = res.error;
      isError = true;
    } else if (res.message && !res.listings.length) {
      text2 = res.message;
    } else if (!res.listings.length) {
      text2 = "I couldn't find homes matching that. Try broadening it or changing the area.";
    } else {
      const summary = res.summary ? ` (${res.summary})` : "";
      text2 = `Found ${res.count} ${res.count === 1 ? "home" : "homes"}${summary}. Here are a few:`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        role: "assistant",
        text: text2,
        listings: res.listings.slice(0, 4),
        isError,
      },
    ]);
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function resetChat() {
    setMessages([GREETING]);
    setNlpId(null);
    setInput("");
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close home search assistant" : "Open home search assistant"}
        className="fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-white shadow-[0_10px_30px_rgba(0,0,0,0.30)] transition hover:scale-105 hover:bg-charcoal/90 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.6 4.6L18 8l-4.4 1.4L12 14l-1.6-4.6L6 8l4.4-1.4L12 2z" />
            <path d="M18.5 13l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" opacity="0.65" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 left-4 right-4 z-[120] ml-auto flex h-[min(620px,calc(100vh-7rem))] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:left-auto sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-charcoal/10 bg-charcoal px-5 py-4 text-white">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                OnSite ReGroup
              </p>
              <p className="font-serif text-[18px] font-light leading-tight">Home Search Assistant</p>
            </div>
            <button
              type="button"
              onClick={resetChat}
              className="text-[10px] uppercase tracking-[0.18em] text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              New chat
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={
                    msg.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-charcoal text-white"
                        : msg.isError
                          ? "bg-amber-50 text-charcoal"
                          : "bg-charcoal/5 text-charcoal"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.listings && msg.listings.length > 0 && (
                  <div className="mt-3 space-y-2.5">
                    {msg.listings.map((listing) => {
                      const img = imageUrl(listing.images);
                      return (
                        <Link
                          key={listing.mlsNumber}
                          href={`/listings/${listing.mlsNumber}`}
                          onClick={() => setOpen(false)}
                          className="flex gap-3 overflow-hidden rounded-2xl border border-charcoal/10 bg-white transition hover:border-charcoal/30 hover:shadow-md"
                        >
                          <div className="relative h-[78px] w-[88px] shrink-0 bg-charcoal/5">
                            {img && (
                              <Image
                                src={img}
                                alt={addressLine(listing)}
                                fill
                                className="object-cover"
                                sizes="88px"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 py-2 pr-3">
                            <p className="font-serif text-[15px] font-light text-charcoal">
                              {priceLabel(listing)}
                            </p>
                            <p className="truncate text-[12px] text-charcoal/70">
                              {specLine(listing) || listing.details?.propertyType || ""}
                            </p>
                            <p className="truncate text-[12px] text-charcoal/55">
                              {addressLine(listing)}
                            </p>
                            {listing.matchedTerms && listing.matchedTerms.length > 0 && (
                              <p className="mt-0.5 truncate text-[11px] text-emerald-700">
                                ✓ {listing.matchedTerms.join(", ")}
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-charcoal/5 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal/40 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal/40 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal/40" />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {AI_SEARCH_EXAMPLES.slice(0, 3).map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => void send(example)}
                    className="rounded-full border border-charcoal/15 px-3 py-1.5 text-left text-[12px] text-charcoal/70 transition hover:border-charcoal/35 hover:text-charcoal"
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-charcoal/10 bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={400}
              placeholder="Describe the home you want…"
              className="min-w-0 flex-1 rounded-full border border-charcoal/15 bg-warm-gray/40 px-4 py-2.5 text-[13.5px] text-charcoal outline-none transition focus:border-charcoal/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-white transition hover:bg-charcoal/85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
