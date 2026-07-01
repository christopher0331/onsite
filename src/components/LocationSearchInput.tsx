"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

type Rect = { top: number; left: number; width: number; bottom: number };

const MIN_CHARS = 2;
const GAP = 8;
const MIN_DROPDOWN_HEIGHT = 180;
const MAX_DROPDOWN_HEIGHT = 560;

function formatPrice(n: number | null): string {
  if (!n || Number.isNaN(n)) return "";
  return "$" + n.toLocaleString("en-US");
}

/**
 * Live address/city autocomplete backed by `/api/listings/suggest` — the same
 * MLS-powered dropdown used on the homepage hero. Drop this in anywhere a
 * plain "city / neighborhood / ZIP" text input previously lived so typing a
 * street address (not just a city name) actually finds the listing.
 *
 * The suggestion panel is rendered in a portal at `document.body` and
 * positioned with `fixed` coordinates measured from the input. This is
 * deliberate: no ancestor's `overflow`, `transform`, or stacking context can
 * clip it, shrink it, or bury it under later sections — and because it lives
 * outside the input's own DOM subtree, it can never stretch that subtree's
 * layout height the way an `absolute` child inside a clipped/flex ancestor
 * sometimes does.
 */
export default function LocationSearchInput({
  value,
  onValueChange,
  onSelectAddress,
  onSelectCity,
  onEnterNoSelection,
  state,
  placeholder = "Address, city, or ZIP",
  inputClassName = "",
  wrapperClassName = "relative w-full",
  dropdownMinWidthPx,
  listboxId,
}: {
  value: string;
  onValueChange: (v: string) => void;
  onSelectAddress: (mlsNumber: string) => void;
  onSelectCity: (city: string, state: string) => void;
  onEnterNoSelection?: () => void;
  state?: string;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  /** Floors the dropdown's width in px — use when the input itself is
   * narrower than a usable suggestion list should be. */
  dropdownMinWidthPx?: number;
  listboxId: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const q = value.trim();
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
          const params = new URLSearchParams({ q });
          if (state) params.set("state", state);
          const res = await fetch(`/api/listings/suggest?${params}`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state]);

  // Measure the input's on-screen position whenever the dropdown is open, and
  // keep it pinned to the input across scroll/resize (capture phase so it
  // also reacts to scrolling inside any nested scroll container, not just
  // the window).
  const measure = () => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, bottom: r.bottom });
  };

  useLayoutEffect(() => {
    if (!open) return;
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => measure();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      const insideInput = containerRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideInput && !insideDropdown) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function pick(s: Suggestion) {
    setOpen(false);
    setSuggestions([]);
    if (s.type === "address") {
      onSelectAddress(s.mlsNumber);
    } else {
      onSelectCity(s.city, s.state);
    }
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
      if (highlight >= 0 && suggestions[highlight]) {
        e.preventDefault();
        pick(suggestions[highlight]);
      } else if (onEnterNoSelection) {
        e.preventDefault();
        setOpen(false);
        onEnterNoSelection();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  }

  const showDropdown = open && value.trim().length >= MIN_CHARS;

  let dropdownStyle: React.CSSProperties | null = null;
  if (rect) {
    const width = dropdownMinWidthPx ? Math.max(rect.width, dropdownMinWidthPx) : rect.width;
    // Prefer opening below the input; if there isn't enough room left in the
    // viewport, flip above it instead so it's never forced to overflow the
    // screen (which is what made users have to scroll the page to see it).
    const spaceBelow = window.innerHeight - rect.bottom - GAP - 16;
    const spaceAbove = rect.top - GAP - 16;
    const openAbove = spaceBelow < MIN_DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    const available = openAbove ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(MIN_DROPDOWN_HEIGHT, Math.min(MAX_DROPDOWN_HEIGHT, available));

    dropdownStyle = {
      position: "fixed",
      left: rect.left,
      width,
      maxHeight,
      ...(openAbove
        ? { bottom: window.innerHeight - rect.top + GAP }
        : { top: rect.bottom + GAP }),
    };
  }

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length) setOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-autocomplete="list"
        autoComplete="off"
        className={inputClassName}
      />

      {mounted && showDropdown && dropdownStyle
        ? createPortal(
            <div
              ref={dropdownRef}
              id={listboxId}
              role="listbox"
              style={dropdownStyle}
              className="z-[2147483000] overflow-auto rounded-2xl bg-white py-2 text-charcoal shadow-[0_24px_70px_rgba(0,0,0,0.30)] ring-1 ring-black/10"
            >
              {loading && suggestions.length === 0 ? (
                <p className="px-4 py-3 text-[13px] text-charcoal/55">Searching the MLS…</p>
              ) : suggestions.length === 0 ? (
                <p className="px-4 py-3 text-[13px] text-charcoal/55">
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
                      onClick={() => pick(s)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${
                        active ? "bg-[#3daf3d]/10" : "hover:bg-charcoal/[0.04]"
                      }`}
                    >
                      {s.type === "address" ? (
                        <Thumbnail image={s.image} alt={s.label} />
                      ) : (
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#3daf3d]/10 text-[#3daf3d]">
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
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

function Thumbnail({ image, alt }: { image: string | null; alt: string }) {
  if (!image) {
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-charcoal/5 text-charcoal/30">
        <HomeIcon className="h-5 w-5" />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={alt}
      className="h-11 w-11 shrink-0 rounded-lg object-cover"
      loading="lazy"
    />
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
