"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CITIES } from "@/lib/service-areas/data";
import { useNavDisclosure } from "@/components/useNavDisclosure";

type Props = {
  solid: boolean;
  /** Called when a link is chosen (e.g. close mobile menu). */
  onNavigate?: () => void;
  /** Compact styling for the mobile drawer. */
  variant?: "desktop" | "mobile";
};

export default function ServiceAreasNav({
  solid,
  onNavigate,
  variant = "desktop",
}: Props) {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/service-areas");
  const {
    open,
    panelId,
    rootRef,
    triggerRef,
    toggle,
    close,
    onTriggerKeyDown,
    onPanelKeyDown,
    onBlur,
  } = useNavDisclosure(variant);

  const linkTone = solid ? "text-charcoal" : "text-white";
  const mutedTone = solid ? "text-charcoal/70" : "text-white/80";
  const focusRing = solid
    ? "focus-visible:outline-charcoal"
    : "focus-visible:outline-white";
  const panelBg = solid
    ? "bg-white border-charcoal/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
    : "bg-charcoal/95 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md";

  const choose = () => {
    close();
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div ref={rootRef} className="w-full max-w-sm text-center" onBlur={onBlur}>
        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          onKeyDown={onTriggerKeyDown}
          className={`inline-flex items-center gap-2 font-serif text-3xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
            isActive ? "text-white" : "text-white/90 hover:text-white"
          }`}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={panelId}
        >
          Service Areas
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
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
          <div
            id={panelId}
            role="menu"
            onKeyDown={onPanelKeyDown}
            className="mt-5 w-full space-y-4 text-left"
          >
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                role="menuitem"
                onClick={choose}
                className="block text-[13px] uppercase tracking-[0.2em] text-white hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {city.name}
              </Link>
            ))}
            <Link
              href="/service-areas"
              role="menuitem"
              onClick={choose}
              className="block pt-2 text-[11px] uppercase tracking-[0.25em] text-white/55 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              All service areas →
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`relative shrink-0 ${open ? "z-[110]" : ""}`}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 xl:text-[14px] xl:tracking-[0.09em] 2xl:text-[15px] 2xl:tracking-[0.1em] ${linkTone} ${focusRing}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
      >
        Areas
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
          onKeyDown={onPanelKeyDown}
          className={`fixed left-1/2 top-24 z-[120] mt-3 max-h-[min(70vh,40rem)] w-[min(92vw,64rem)] -translate-x-1/2 overflow-y-auto rounded-3xl border p-6 sm:p-7 ${panelBg}`}
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p
                className={`text-[10px] uppercase tracking-[0.28em] ${
                  solid ? "text-charcoal/50" : "text-white/50"
                }`}
              >
                Service Cities
              </p>
              <p className={`mt-2 text-[15px] ${mutedTone}`}>
                Choose a city hub for localized market coverage.
              </p>
            </div>
            <Link
              href="/service-areas"
              role="menuitem"
              onClick={choose}
              className={`hidden rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex ${
                solid
                  ? "border-charcoal/20 text-charcoal hover:bg-charcoal/5"
                  : "border-white/25 text-white hover:bg-white/10"
              } ${focusRing}`}
            >
              View all areas
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/service-areas/${city.slug}`}
                  role="menuitem"
                  onClick={choose}
                  className={`group flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    solid ? "hover:bg-charcoal/[0.04]" : "hover:bg-white/[0.06]"
                  } ${focusRing}`}
                >
                  <div>
                    <p className={`text-[14px] font-medium tracking-[0.02em] ${linkTone}`}>
                      {city.name}
                    </p>
                    <p className={`mt-0.5 text-[11px] uppercase tracking-[0.12em] ${mutedTone}`}>
                      {city.county}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] uppercase tracking-[0.16em] transition-transform group-hover:translate-x-0.5 ${mutedTone}`}
                  >
                    View
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-4 border-t pt-4 sm:hidden ${solid ? "border-charcoal/10" : "border-white/10"}`}
          >
            <Link
              href="/service-areas"
              role="menuitem"
              onClick={choose}
              className={`block rounded-lg px-2 py-1 text-[11px] uppercase tracking-[0.2em] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${mutedTone} ${focusRing}`}
            >
              View all areas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
