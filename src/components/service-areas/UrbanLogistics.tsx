import type { City } from "@/lib/service-areas/types";

// Conditional component — renders only when city.features.urbanLogistics is
// true. Discusses parking, design-overlay constraints, and noise ordinances
// relevant to dense / historic-core submarkets.

type Props = {
  city: City;
};

export default function UrbanLogistics({ city }: Props) {
  const urban = city.urban;
  if (!urban) return null;

  return (
    <section className="py-20 sm:py-28 bg-charcoal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/80 mb-5">
              Urban Logistics · {city.name}
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08]">
              Dense cores demand a{" "}
              <span>different prep playbook.</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15.5px] leading-8 text-white/85">
              Selling inside {city.name}&apos;s walkable downtown isn&apos;t the
              same as selling on the bench. Tight parking, design-review
              overlays, and ordinance windows all reshape our prep, photo, and
              showing schedule.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-3">
              Parking
            </p>
            <p className="text-[15px] leading-8 text-white/90">{urban.parking}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-3">
              Design Overlay
            </p>
            <p className="text-[15px] leading-8 text-white/90">{urban.permitOverlay}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-3">
              Noise Ordinance
            </p>
            <p className="text-[15px] leading-8 text-white/90">{urban.noiseOrdinance}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
