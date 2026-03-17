const stats = [
  {
    step: "Advantage",
    stat: "10–13%",
    label: "More at Closing",
    description: "Homes with skilled negotiators sell for 10–13% more than those without professional representation.",
  },
  {
    step: "Reliability",
    stat: "1 in 4",
    label: "Deals Fall Through",
    description: "1 in 4 deals collapse due to poor negotiation. Expert guidance keeps your sale on track.",
  },
  {
    step: "Protection",
    stat: "90%",
    label: "Face Buyer Demands",
    description: "90% of sellers face buyer negotiation demands. We make sure every response protects your interests.",
  },
];

export default function NegotiationReliabilityPath() {
  return (
    <div className="grid grid-cols-1 divide-y divide-charcoal/10 md:grid-cols-3 md:divide-x md:divide-y-0">
      {stats.map((item, i) => (
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

          {/* arrow connector — desktop, between items */}
          {i < stats.length - 1 && (
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
