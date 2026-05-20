import Link from "next/link";
import type { Neighborhood } from "@/lib/service-areas/types";

// Cross-links to sibling neighborhoods/cities. Tight semantic cluster per the
// neighborhood-spoke template.

type Props = {
  neighborhood: Neighborhood;
};

export default function AdjacentAreas({ neighborhood }: Props) {
  if (neighborhood.adjacent.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#1a1a18]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/80 mb-5">
            Adjacent Areas
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-white leading-[1.1] max-w-3xl">
            Bordering {neighborhood.name}.{" "}
            <span className="text-white/85">Same playbook.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhood.adjacent.map((adj) => {
            const href = adj.neighborhoodSlug
              ? `/service-areas/${adj.citySlug}/${adj.neighborhoodSlug}`
              : `/service-areas/${adj.citySlug}`;
            return (
              <Link
                key={`${adj.citySlug}-${adj.neighborhoodSlug ?? adj.name}`}
                href={href}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 hover:bg-white/[0.06] transition-all duration-500"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 mb-3">
                  {adj.neighborhoodSlug ? "Neighborhood" : "City Hub"}
                </p>
                <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                  {adj.name}
                </h3>
                <p className="text-[14px] leading-7 text-white/85">{adj.blurb}</p>
                <span className="inline-flex items-center gap-2 mt-5 text-[11px] uppercase tracking-[0.2em] text-white/85 group-hover:text-white transition-colors">
                  Explore
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
