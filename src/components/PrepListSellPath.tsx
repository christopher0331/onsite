const steps = [
  {
    step: "Prep",
    label: "Preparation",
    description: "Get your home ready with staging, repairs, & strategic pricing.",
  },
  {
    step: "List",
    label: "List It",
    description: "Market your home, attract buyers, & schedule showings.",
  },
  {
    step: "Sell",
    label: "Close the Deal",
    description: "Negotiate offers, close the deal, & finalize the sale.",
  },
];

export default function PrepListSellPath() {
  return (
    <div className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
      {steps.map((item, i) => (
        <div
          key={item.step}
          className="relative flex flex-col gap-4 px-6 py-10 md:px-8 md:py-10"
        >
          {/* ghosted oversized step word */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 select-none font-serif text-[6.5rem] font-light leading-none text-white/[0.04] md:right-3 md:top-3"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* step badge */}
          <p className="w-fit rounded-full border border-white/15 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
            {item.step}
          </p>

          {/* label */}
          <h3 className="font-serif text-[1.75rem] font-light leading-tight text-white">
            {item.label}
          </h3>

          {/* description */}
          <p className="text-[14px] leading-7 text-white/55 not-italic">
            {item.description}
          </p>

          {/* arrow connector — only between items, desktop only */}
          {i < steps.length - 1 && (
            <div className="absolute -right-[11px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" fill="#1a1a18" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M8 7l5 4-5 4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
