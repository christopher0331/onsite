import Link from "next/link";
import type { City, Neighborhood } from "@/lib/service-areas/types";

type Props = {
  city: City;
  neighborhoods: Neighborhood[];
};

export default function NeighborhoodDirectory({ city, neighborhoods }: Props) {
  const liveByName = new Map(
    neighborhoods.map((n) => [n.name.toLowerCase(), n] as const)
  );
  const directory = city.neighborhoodDirectory ?? neighborhoods.map((n) => n.name);
  if (directory.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#1a1a18]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/80 mb-5">
              Neighborhood Directory
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08]">
              Inside <span>{city.name}.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-8 text-white/85">
              Every {city.name} neighborhood has its own pricing band, buyer
              profile, and prep playbook. We treat them that way.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {directory.map((name) => {
            const live = liveByName.get(name.toLowerCase());
            const card = (
              <>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/75 mb-3">
                  {live ? live.zipCodes.join(" · ") : city.zipCodes.join(" · ")}
                </p>
                <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                  {name}
                </h3>
                <p className="text-[14px] leading-7 text-white/85 line-clamp-3">
                  {live
                    ? live.introCopy
                    : `${name} is part of our ${city.name} service footprint with neighborhood-specific pricing and prep strategy.`}
                </p>
                {live && (
                  <span className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-[0.2em] text-white/85 group-hover:text-white transition-colors">
                    Explore {name}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                )}
              </>
            );

            if (live) {
              return (
                <Link
                  key={name}
                  href={`/service-areas/${city.slug}/${live.slug}`}
                  className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 hover:bg-white/[0.06] transition-all duration-500"
                >
                  {card}
                </Link>
              );
            }
            return (
              <div
                key={name}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7"
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
