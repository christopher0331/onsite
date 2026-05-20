import type { City } from "@/lib/service-areas/types";

type Props = {
  city: City;
};

export default function LocalUtilities({ city }: Props) {
  return (
    <section className="py-20 sm:py-28 bg-[#f2ede6]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
            Local Infrastructure
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
            We coordinate directly with{" "}
            <span>
              {city.utilities.map((u) => u.name).join(" & ")}
            </span>{" "}
            so listings move on schedule.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {city.utilityNotes.map((u) => (
            <div
              key={u.name}
              className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.07)]"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/55 mb-3">
                {u.name}
              </p>
              <p className="text-[16px] leading-8 text-charcoal/90">{u.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {city.utilities.map((u) => (
            <a
              key={u.url}
              href={u.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-charcoal/15 text-charcoal/80 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
            >
              {u.name}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
