import type { ServiceAreaMarketBrief } from "@/lib/service-areas/briefs/types";

type Props = {
  brief: ServiceAreaMarketBrief;
};

export default function MarketBrief({ brief }: Props) {
  return (
    <section className="py-16 sm:py-20 bg-charcoal text-white border-t border-charcoal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/55 mb-4">
            AI Market Brief · Week of {brief.weekOf}
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.1] mb-6">
            {brief.title}
          </h2>
          <div className="space-y-5 text-[15.5px] leading-8 text-white/85">
            {brief.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {brief.bullets.length > 0 ? (
            <ul className="mt-8 space-y-3 border-t border-white/15 pt-8">
              {brief.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-[14px] leading-7 text-white/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3daf3d]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-8 text-[12px] leading-6 text-white/45">
            Narrative generated with AI from live Repliers/NWMLS statistics for{" "}
            {brief.cityName}. Not a formal appraisal. Verify numbers on the
            Market Pulse section above.
          </p>
        </div>
      </div>
    </section>
  );
}
