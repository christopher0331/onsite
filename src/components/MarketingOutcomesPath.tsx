const outcomes = [
  {
    label: "Buyer Interest",
    description: "Strong marketing attracts more serious & qualified buyers.",
  },
  {
    label: "Faster Sales",
    description: "Well-marketed homes sell quicker & with fewer delays.",
  },
  {
    label: "Higher Offers",
    description: "Increased demand leads to more competitive offers.",
  },
];

export default function MarketingOutcomesPath() {
  return (
    <div className="grid grid-cols-1 divide-y divide-charcoal/10 md:grid-cols-3 md:divide-x md:divide-y-0">
      {outcomes.map((item, i) => (
        <div
          key={item.label}
          className="relative flex flex-col gap-5 px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
        >
          {/* step number */}
          <p className="font-serif text-[clamp(3rem,5vw,4rem)] font-light leading-none text-charcoal">
            0{i + 1}
          </p>

          {/* label */}
          <h3 className="font-serif text-[1.6rem] font-light leading-tight text-charcoal">
            {item.label}
          </h3>

          {/* description */}
          <p className="text-[15px] leading-7 text-charcoal/70 not-italic">{item.description}</p>

          {/* arrow connector — desktop, between items only */}
          {i < outcomes.length - 1 && (
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
