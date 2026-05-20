import type { City } from "@/lib/service-areas/types";

// Conditional component — renders only when city.features.suburbanRegulations
// is true. Discusses acreage/lots, septic, and HOA realities relevant to
// suburban Pierce-County submarkets.

type Props = {
  city: City;
};

export default function SuburbanRegulations({ city }: Props) {
  const suburban = city.suburban;
  if (!suburban) return null;

  return (
    <section className="py-20 sm:py-28 bg-warm-gray/60">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
            Suburban Realities
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
            Larger lots. <span>Real constraints.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-charcoal/85">
            Suburban {city.name} listings carry their own underwriting reality
            — septic, well, HOA, and lot-line dynamics that show up at
            inspection if they aren&apos;t addressed first.
          </p>
        </div>

        <div className="lg:col-span-7 divide-y divide-charcoal/10">
          <div className="grid grid-cols-[8rem_1fr] gap-6 py-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
              Lot Sizes
            </p>
            <p className="text-[15.5px] leading-8 text-charcoal">
              {suburban.typicalLotSize}
            </p>
          </div>
          {suburban.septicNotes && (
            <div className="grid grid-cols-[8rem_1fr] gap-6 py-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
                Septic & Well
              </p>
              <p className="text-[15.5px] leading-8 text-charcoal">
                {suburban.septicNotes}
              </p>
            </div>
          )}
          {suburban.hoaNotes && (
            <div className="grid grid-cols-[8rem_1fr] gap-6 py-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
                HOA / CC&Rs
              </p>
              <p className="text-[15.5px] leading-8 text-charcoal">
                {suburban.hoaNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
