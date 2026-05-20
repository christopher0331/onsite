import type { Neighborhood } from "@/lib/service-areas/types";

// The "Community Authority Matrix" — details on neighborhood characteristics
// (age of homes, architectural styles, lot dynamics) plus authoritative
// outbound entity links per the neighborhood-spoke template.

type Props = {
  neighborhood: Neighborhood;
};

export default function NeighborhoodGovernance({ neighborhood }: Props) {
  const { characteristics, communityOrgs } = neighborhood;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
            Community Authority
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1] mb-6">
            {neighborhood.name} <span>on its own terms.</span>
          </h2>
          {characteristics.notes && (
            <p className="text-[15.5px] leading-8 text-charcoal/85 mb-8">
              {characteristics.notes}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {communityOrgs.map((org) => (
              <a
                key={org.url}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-charcoal/15 text-charcoal/80 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
              >
                {org.name}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <dl className="lg:col-span-7 divide-y divide-charcoal/10">
          <div className="grid grid-cols-[10rem_1fr] gap-6 py-7">
            <dt className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
              Median Build Year
            </dt>
            <dd className="text-[15.5px] leading-8 text-charcoal">
              {characteristics.medianHomeYear}
            </dd>
          </div>
          <div className="grid grid-cols-[10rem_1fr] gap-6 py-7">
            <dt className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
              Architectural Styles
            </dt>
            <dd className="text-[15.5px] leading-8 text-charcoal">
              {characteristics.architecturalStyles.join(" · ")}
            </dd>
          </div>
          <div className="grid grid-cols-[10rem_1fr] gap-6 py-7">
            <dt className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
              Typical Lot
            </dt>
            <dd className="text-[15.5px] leading-8 text-charcoal">
              {characteristics.typicalLotSize}
            </dd>
          </div>
          {neighborhood.communityOrgs.length > 0 && (
            <div className="grid grid-cols-[10rem_1fr] gap-6 py-7">
              <dt className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 pt-1">
                Local Authorities
              </dt>
              <dd className="text-[15.5px] leading-8 text-charcoal">
                {neighborhood.communityOrgs
                  .map((o) => o.context ?? o.name)
                  .join(" — ")}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
