"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavDropdownItem = {
  label: string;
  href: string;
  external?: boolean;
};

type Props = {
  label: string;
  items: NavDropdownItem[];
  solid: boolean;
  isActive?: (pathname: string) => boolean;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export default function NavDropdown({
  label,
  items,
  solid,
  isActive,
  onNavigate,
  variant = "desktop",
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "";
  const active = isActive?.(pathname) ?? items.some((i) => pathname.startsWith(i.href));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open || variant === "mobile") return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  const linkTone = solid ? "text-charcoal" : "text-white";
  const mutedTone = solid ? "text-charcoal/75" : "text-white/85";
  const panelBg = solid
    ? "bg-white border-charcoal/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
    : "bg-charcoal/95 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md";

  if (variant === "mobile") {
    return (
      <div className="w-full max-w-sm text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-2 font-serif text-3xl transition-colors ${
            active ? "text-white" : "text-white/90 hover:text-white"
          }`}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {label}
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {open && (
          <div id={panelId} className="mt-4 space-y-3">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className="block text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="block text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative shrink-0 ${open ? "z-[110]" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 hover:opacity-60 ${linkTone}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          className={`absolute left-1/2 top-full z-[110] mt-4 min-w-[12rem] -translate-x-1/2 rounded-2xl border py-2 ${panelBg}`}
        >
          {items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`block px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80 ${mutedTone}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`block px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80 ${mutedTone}`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
