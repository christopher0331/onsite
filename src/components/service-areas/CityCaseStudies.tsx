import Image from "next/image";
import Link from "next/link";
import type { City } from "@/lib/service-areas/types";

type Props = {
  city: City;
};

export default function CityCaseStudies({ city }: Props) {
  if (city.caseStudies.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12 gap-8 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
              Proof of Work · {city.name}
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
              Recent results in <span>{city.name}.</span>
            </h2>
          </div>
          <Link
            href="/sold-homes"
            className="inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
          >
            View All Sold Homes
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {city.caseStudies.map((prop) => (
            <Link key={prop.href} href={prop.href} className="group block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                {prop.badge && (
                  <span className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
                    {prop.badge}
                  </span>
                )}
                <p className="absolute bottom-5 left-5 right-5 font-serif text-lg font-light text-white leading-snug">
                  {prop.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
