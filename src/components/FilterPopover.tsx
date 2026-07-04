"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

export default function FilterPopover({
  label,
  isActive,
  children,
  variant = "hero",
}: {
  label: ReactNode;
  isActive: boolean;
  children: ReactNode;
  variant?: "hero" | "light";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-wide whitespace-nowrap transition-all ${
          isOpen
            ? variant === "light"
              ? "border-charcoal bg-white text-charcoal shadow-sm"
              : "border-white bg-white text-charcoal"
            : isActive
              ? variant === "light"
                ? "border-[#3daf3d] bg-[#3daf3d]/10 text-[#3daf3d]"
                : "border-[#3daf3d] bg-[#3daf3d]/20 text-[#3daf3d]"
              : variant === "light"
                ? "border-charcoal/20 bg-white text-charcoal hover:border-charcoal/35 hover:bg-charcoal/5"
                : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
        }`}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-[120] mt-2 w-[min(360px,92vw)] max-w-[92vw] rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:w-max sm:min-w-[280px] sm:max-w-none sm:p-5">
          {children}
        </div>
      )}
    </div>
  );
}