import Image from "next/image";
import Link from "next/link";
import type { City } from "@/lib/service-areas/types";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  city: City;
};

export default function CityHero({ city }: Props) {
  return (
    <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
      <Image
        src={city.heroImage}
        alt={`Real estate in ${city.name}, ${city.stateCode}`}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="hero-overlay" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-end pb-20 sm:pb-28">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: city.name },
          ]}
        />

        <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">
          {city.heroEyebrow}
        </p>
        <h1 className="font-serif text-[clamp(2.4rem,6.5vw,5.4rem)] leading-[1.0] text-white font-light max-w-4xl mb-7">
          Expert Real Estate for{" "}
          <span>
            {city.name}, {city.stateCode}.
          </span>
        </h1>
        <p className="text-[16px] text-white/75 max-w-2xl leading-8 mb-4">
          {city.heroIntro}
        </p>
        <p className="text-[12px] uppercase tracking-[0.25em] text-white/85 mb-10">
          Currently serving {city.activeProjects} active projects in the {city.name} metro area.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact-us"
            className="inline-flex items-center bg-white text-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
          >
            Let&apos;s Talk
          </Link>
          <Link
            href="/free-home-evaluation"
            className="inline-flex items-center border border-white/35 text-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
          >
            Free Home Evaluation
          </Link>
        </div>
      </div>
    </section>
  );
}
