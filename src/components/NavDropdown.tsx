"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavDisclosure } from "@/components/useNavDisclosure";

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
  /** Anchor the desktop panel to the trigger's right edge so it stays on screen. */
  align?: "center" | "end";
};

const chevron = (open: boolean, size: string) => (
  <svg
    className={`${size} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function NavDropdown({
  label,
  items,
  solid,
  isActive,
  onNavigate,
  variant = "desktop",
  align = "center",
}: Props) {
  const pathname = usePathname() ?? "";
  const active = isActive?.(pathname) ?? items.some((item) => pathname.startsWith(item.href));
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
  const mutedTone = solid ? "text-charcoal/75" : "text-white/85";
  const focusRing = solid
    ? "focus-visible:outline-charcoal"
    : "focus-visible:outline-white";
  const panelBg = solid
    ? "bg-white border-charcoal/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
    : "bg-charcoal/95 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md";

  const closeAndGo = () => {
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
            active ? "text-white" : "text-white/90 hover:text-white"
          }`}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={panelId}
        >
          {label}
          {chevron(open, "h-4 w-4")}
        </button>
        {open && (
          <div id={panelId} role="menu" className="mt-4 space-y-3" onKeyDown={onPanelKeyDown}>
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={closeAndGo}
                  className="block text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={closeAndGo}
                  className="block text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        {label}
        {chevron(open, "h-3.5 w-3.5")}
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          onKeyDown={onPanelKeyDown}
          className={`absolute top-full z-[110] mt-3 min-w-[14rem] rounded-2xl border py-2 ${panelBg} ${
            align === "end" ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          {items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={closeAndGo}
                className={`block whitespace-nowrap px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${mutedTone} ${focusRing}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={closeAndGo}
                className={`block whitespace-nowrap px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${mutedTone} ${focusRing}`}
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
