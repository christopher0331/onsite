const items = [
  {
    step: "Stage",
    stat: "3×",
    label: "Faster Sale",
    description: "Homes that are staged sell 3x faster than non-staged homes.",
  },
  {
    step: "Price",
    stat: "5–10%",
    label: "More Value",
    description: "Staged homes can sell for 5–10% more than their unstaged counterparts.",
  },
  {
    step: "List",
    stat: "82%",
    label: "Buyer Clarity",
    description: "82% of buyers find it easier to visualize a staged home as their future home.",
  },
];

export default function StagePriceListPath() {
  return (
    <div className="grid grid-cols-1 divide-y divide-charcoal/10 md:grid-cols-3 md:divide-x md:divide-y-0">
      {items.map((item, i) => (
        <div
          key={item.step}
          className="relative flex flex-col gap-5 px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
        >
          {/* step pill */}
          <p className="w-fit rounded-full border border-charcoal/20 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
            {item.step}
          </p>

          {/* stat */}
          <p className="font-serif text-[clamp(3rem,6vw,4.5rem)] font-light leading-none text-charcoal">
            {item.stat}
          </p>

          {/* label + description */}
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-charcoal/50">{item.label}</p>
            <p className="text-[15px] leading-7 text-charcoal/70 not-italic">{item.description}</p>
          </div>

          {/* arrow connector — desktop only, between items */}
          {i < items.length - 1 && (
            <div className="absolute -right-[11px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" fill="#f2ede6" stroke="rgba(26,26,24,0.12)" strokeWidth="1" />
                <path d="M8 7l5 4-5 4" stroke="rgba(26,26,24,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
