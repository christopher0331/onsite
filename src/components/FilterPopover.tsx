"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

export default function FilterPopover({
  label,
  isActive,
  children,
}: {
  label: ReactNode;
  isActive: boolean;
  children: ReactNode;
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
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-wide transition-all ${
          isOpen
            ? "border-charcoal bg-charcoal/5 text-charcoal"
            : isActive
            ? "border-charcoal bg-white text-charcoal hover:bg-charcoal/5"
            : "border-charcoal/20 bg-white text-charcoal hover:border-charcoal hover:bg-charcoal/5"
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
        <div className="absolute left-0 top-full z-50 mt-2 w-max min-w-[280px] rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          {children}
        </div>
      )}
    </div>
  );
}