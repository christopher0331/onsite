"use client";

export default function Marquee() {
  const text = "Expert Negotiation \u2022 Maximize Value \u2022 Sell Your Home Today";
  const repeated = Array(8).fill(text).join(" \u2022 ") + " \u2022 ";

  return (
    <section className="marquee-section w-full max-w-full overflow-hidden bg-charcoal py-10">
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          <span className="font-serif text-[clamp(1rem,2vw,1.5rem)] tracking-wide text-white/70">
            {repeated}
          </span>
          <span
            className="font-serif text-[clamp(1rem,2vw,1.5rem)] tracking-wide text-white/70"
            aria-hidden
          >
            {repeated}
          </span>
        </div>
      </div>
    </section>
  );
}
