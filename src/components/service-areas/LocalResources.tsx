import type { City } from "@/lib/service-areas/types";

// Schools + civic resources block. Rounds out the "Entity Salience" outbound
// link set (permitting + utilities live in their own sections) with the
// authorities buyers and sellers actually search for: the school district,
// the library system, and property/tax records.

type Props = {
  city: City;
};

export default function LocalResources({ city }: Props) {
  const { schoolDistricts, localResources, chamberOfCommerce } = city;
  const resourceLinks = [
    ...localResources,
    ...(chamberOfCommerce ? [chamberOfCommerce] : []),
  ];

  if (schoolDistricts.length === 0 && resourceLinks.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
              Schools &amp; Local Resources
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
              Everything a {city.name} buyer{" "}
              <span>looks up before they call.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-[16px] leading-8 text-charcoal">
            <p>
              School boundaries, library access, and property records shape
              how a {city.name} home shows and how it appraises. We link
              directly to the source so buyers and sellers can verify
              everything themselves — no secondhand summaries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {schoolDistricts.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 mb-5">
                School Districts
              </p>
              <div className="flex flex-col gap-3">
                {schoolDistricts.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-charcoal/[0.08] bg-warm-gray/40 p-5 transition-colors duration-500 hover:bg-charcoal hover:text-white"
                  >
                    <span className="flex items-center justify-between gap-3 text-[13px] uppercase tracking-[0.18em] font-medium">
                      {s.name}
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M5 5h6v2H7v10h10v-4h2v6H5V5z" />
                      </svg>
                    </span>
                    {s.context && (
                      <span className="mt-2 block text-[14px] leading-7 text-charcoal/80 group-hover:text-white/85">
                        {s.context}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {resourceLinks.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 mb-5">
                Local Resources
              </p>
              <div className="flex flex-col gap-3">
                {resourceLinks.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-charcoal/[0.08] bg-warm-gray/40 p-5 transition-colors duration-500 hover:bg-charcoal hover:text-white"
                  >
                    <span className="flex items-center justify-between gap-3 text-[13px] uppercase tracking-[0.18em] font-medium">
                      {r.name}
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M5 5h6v2H7v10h10v-4h2v6H5V5z" />
                      </svg>
                    </span>
                    {r.context && (
                      <span className="mt-2 block text-[14px] leading-7 text-charcoal/80 group-hover:text-white/85">
                        {r.context}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
