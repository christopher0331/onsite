import type { City } from "@/lib/service-areas/types";

// Conditional component — renders only when city.features.microClimate is on.
// Frames how the local rainfall / temperature pattern reshapes prep windows.
// In production this is hydrated from a weather API at build time.

type Props = {
  city: City;
};

export default function MicroClimate({ city }: Props) {
  const climate = city.microClimate;
  if (!climate) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/40 p-6 text-center">
              <p className="font-serif text-4xl font-light text-charcoal mb-1">
                {climate.annualRainfallInches}
                <span className="text-base align-top text-charcoal/65">″</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                Annual Rain
              </p>
            </div>
            <div className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/40 p-6 text-center">
              <p className="font-serif text-4xl font-light text-charcoal mb-1">
                {climate.avgWinterLowF}
                <span className="text-base align-top text-charcoal/60">°F</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                Winter Low
              </p>
            </div>
            <div className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/40 p-6 text-center">
              <p className="font-serif text-4xl font-light text-charcoal mb-1">
                {climate.avgSummerHighF}
                <span className="text-base align-top text-charcoal/60">°F</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                Summer High
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
            Local Microclimate
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1] mb-6">
            {city.name}&apos;s weather <span>drives our prep calendar.</span>
          </h2>
          <p className="text-[15.5px] leading-8 text-charcoal/85">
            {climate.serviceImpact}
          </p>
        </div>
      </div>
    </section>
  );
}
