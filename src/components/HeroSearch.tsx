"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type AddressSuggestion = {
  type: "address";
  mlsNumber: string;
  label: string;
  sublabel: string;
  price: number | null;
  beds: number | null;
  baths: number | null;
  image: string | null;
};

type CitySuggestion = {
  type: "city";
  city: string;
  state: string;
  label: string;
  sublabel: string;
};

type Suggestion = AddressSuggestion | CitySuggestion;

const MIN_CHARS = 2;
const LISTBOX_ID = "hero-search-listbox";

function formatPrice(n: number | null): string {
  if (!n || Number.isNaN(n)) return "";
  return "$" + n.toLocaleString("en-US");
}

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced autocomplete fetch against the live MLS feed.
  useEffect(() => {
    const q = query.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (q.length < MIN_CHARS) {
      abortRef.current?.abort();
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      void (async () => {
        try {
          const res = await fetch(`/api/listings/suggest?q=${encodeURIComponent(q)}`, {
            signal: controller.signal,
          });
          if (!res.ok) {
            setSuggestions([]);
            return;
          }
          const data = (await res.json()) as { suggestions?: Suggestion[] };
          setSuggestions(data.suggestions ?? []);
          setHighlight(-1);
          setOpen(true);
        } catch (err) {
          if ((err as Error).name !== "AbortError") setSuggestions([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close the dropdown when clicking outside the search.
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function goToSuggestion(s: Suggestion) {
    setOpen(false);
    if (s.type === "address") {
      router.push(`/listings/${encodeURIComponent(s.mlsNumber)}`);
    } else {
      const params = new URLSearchParams({ city: s.city, state: s.state || "WA" });
      router.push(`/listings?${params.toString()}`);
    }
  }

  function submit() {
    const q = query.trim();
    if (!q) return;

    const isZip = /^\d{5}$/.test(q);
    const looksLikeStreetAddress = /^\d+\s+\S/.test(q);

    if (highlight >= 0 && suggestions[highlight]) {
      goToSuggestion(suggestions[highlight]);
      return;
    }

    // ZIP codes always filter the listings page — don't deep-link to one address
    // just because it appeared first in autocomplete.
    if (isZip) {
      const params = new URLSearchParams({ city: q, state: "WA" });
      router.push(`/listings?${params.toString()}`);
      return;
    }

    if (suggestions.length > 0) {
      const pick =
        looksLikeStreetAddress
          ? suggestions.find((s) => s.type === "address") ?? suggestions[0]
          : suggestions[0];
      goToSuggestion(pick);
      return;
    }

    // No suggestion matched. A place name filters the list directly; anything
    // that reads like a street address goes to the map, which geocodes it and
    // recenters so nearby for-sale homes still show.
    const params =
      !isZip && looksLikeStreetAddress
        ? new URLSearchParams({ q, view: "map" })
        : new URLSearchParams({ city: q, state: "WA" });
    router.push(`/listings?${params.toString()}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open && suggestions.length) setOpen(true);
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  }

  const showDropdown = open && query.trim().length >= MIN_CHARS;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl text-left">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        role="search"
      >
        <div className="flex items-center gap-1.5 rounded-full bg-white/95 p-1.5 pl-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur transition focus-within:bg-white sm:gap-2 sm:p-2 sm:pl-5">
          <SearchIcon className="h-4 w-4 shrink-0 text-charcoal/40 sm:h-5 sm:w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length) setOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder="Address, city, or ZIP"
            aria-label="Search homes by address, city, or ZIP"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={LISTBOX_ID}
            aria-autocomplete="list"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-charcoal placeholder:text-charcoal/50 focus:outline-none sm:text-[15px]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#3daf3d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#3daf3d]/90 sm:px-7 sm:py-3 sm:text-[12px] sm:tracking-[0.18em]"
          >
            Search
          </button>
        </div>
      </form>

      {showDropdown && (
        <div
          id={LISTBOX_ID}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 max-h-[380px] overflow-auto rounded-2xl bg-white py-2 text-charcoal shadow-[0_24px_70px_rgba(0,0,0,0.30)] ring-1 ring-black/5"
        >
          {loading && suggestions.length === 0 ? (
            <p className="px-5 py-4 text-[13px] text-charcoal/55">Searching the MLS…</p>
          ) : suggestions.length === 0 ? (
            <p className="px-5 py-4 text-[13px] text-charcoal/55">
              No matches yet — try a street name, city, or ZIP.
            </p>
          ) : (
            suggestions.map((s, i) => {
              const active = i === highlight;
              const key = s.type === "address" ? `a-${s.mlsNumber}` : `c-${s.city}`;
              return (
                <button
                  key={key}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => goToSuggestion(s)}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${
                    active ? "bg-[#3daf3d]/10" : "hover:bg-charcoal/[0.04]"
                  }`}
                >
                  {s.type === "address" ? (
                    <Thumbnail image={s.image} alt={s.label} />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#3daf3d]/10 text-[#3daf3d]">
                      <PinIcon className="h-5 w-5" />
                    </span>
                  )}

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium text-charcoal">
                      {s.label}
                    </span>
                    <span className="block truncate text-[12px] text-charcoal/55">
                      {s.sublabel}
                    </span>
                    {s.type === "address" && (s.beds || s.baths) ? (
                      <span className="mt-0.5 block text-[11px] text-charcoal/45">
                        {[
                          s.beds ? `${s.beds} bd` : null,
                          s.baths ? `${s.baths} ba` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    ) : null}
                  </span>

                  {s.type === "address" ? (
                    s.price ? (
                      <span className="shrink-0 text-[13px] font-semibold text-charcoal">
                        {formatPrice(s.price)}
                      </span>
                    ) : null
                  ) : (
                    <span className="shrink-0 rounded-full bg-charcoal/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-charcoal/55">
                      City
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function Thumbnail({ image, alt }: { image: string | null; alt: string }) {
  if (!image) {
    return (
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-charcoal/5 text-charcoal/30">
        <HomeIcon className="h-5 w-5" />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={alt}
      className="h-12 w-12 shrink-0 rounded-lg object-cover"
      loading="lazy"
    />
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
    </svg>
  );
}
