import type { City } from "@/lib/service-areas/types";

type Props = {
  city: City;
};

export default function CityRegulations({ city }: Props) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
              Municipal Compliance
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
              Selling in {city.name} means{" "}
              <span>knowing the city.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-[16px] leading-8 text-charcoal">
            <p>
              {city.name}&apos;s building code, overlay districts, and review
              processes shape what we can — and can&apos;t — promise on a
              listing&apos;s timeline. We do that homework before the For-Sale
              sign goes up, not after the inspection report drops.
            </p>
            <a
              href={city.permittingOffice.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-2 border border-charcoal/20 text-charcoal px-6 py-3 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
            >
              {city.permittingOffice.name}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M5 5h6v2H7v10h10v-4h2v6H5V5z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {city.regulations.map((reg) => (
            <article
              key={reg.title}
              className="rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-7 shadow-[0_14px_40px_rgba(0,0,0,0.05)]"
            >
              <h3 className="font-serif text-2xl font-light text-charcoal mb-3 leading-snug">
                {reg.title}
              </h3>
              <p className="text-[14.5px] leading-7 text-charcoal/90">
                {reg.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
