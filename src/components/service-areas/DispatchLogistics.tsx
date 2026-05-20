import type { Neighborhood } from "@/lib/service-areas/types";

// "Local Logistics & Proximity" component — proves physical presence to
// Google's NLP layer by namedropping local thoroughfares and landmarks.

type Props = {
  neighborhood: Neighborhood;
};

export default function DispatchLogistics({ neighborhood }: Props) {
  return (
    <section className="py-20 sm:py-28 bg-[#f2ede6]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-10">
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
              Dispatch & Proximity
            </p>
            <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
              On the ground in{" "}
              <span>{neighborhood.name}.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[15.5px] leading-8 text-charcoal/90">
              {neighborhood.dispatchCopy}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 mb-4">
              Primary Thoroughfares
            </p>
            <ul className="space-y-3">
              {neighborhood.thoroughfares.map((t) => (
                <li
                  key={t}
                  className="text-[15px] leading-7 text-charcoal border-b border-charcoal/10 pb-3 last:border-0 last:pb-0"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 mb-4">
              Landmarks & Anchors
            </p>
            <ul className="space-y-3">
              {neighborhood.landmarks.map((l) => (
                <li
                  key={l}
                  className="text-[15px] leading-7 text-charcoal border-b border-charcoal/10 pb-3 last:border-0 last:pb-0"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
