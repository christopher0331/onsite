const items = [
  {
    step: "Proven Results",
    stat: "300+",
    sub: "$100M+",
    description: "300+ homes sold and $100M+ in sales prove we deliver success.",
  },
  {
    step: "Market Expertise",
    stat: null,
    sub: null,
    description: "We ensure your home is priced & marketed for the best results.",
  },
  {
    step: "Tailored Strategy",
    stat: null,
    sub: null,
    description: "We design a custom strategy to attract buyers and maximize offers.",
  },
];

export default function SellerProofPath() {
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

          {/* stat or label */}
          {item.stat ? (
            <div className="flex items-end gap-4">
              <p className="font-serif text-[clamp(3rem,6vw,4.5rem)] font-light leading-none text-charcoal">
                {item.stat}
              </p>
              <p className="mb-1.5 font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-none text-charcoal/50">
                {item.sub}
              </p>
            </div>
          ) : (
            <p className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-light leading-tight text-charcoal">
              {item.step}
            </p>
          )}

          {/* description */}
          <p className="text-[15px] leading-7 text-charcoal/70 not-italic">{item.description}</p>

          {/* arrow connector — desktop, between items */}
          {i < items.length - 1 && (
            <div className="absolute -right-[11px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" fill="#fff" stroke="rgba(26,26,24,0.12)" strokeWidth="1" />
                <path d="M8 7l5 4-5 4" stroke="rgba(26,26,24,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
