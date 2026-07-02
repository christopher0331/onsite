import Image from "next/image";
import Link from "next/link";
import type { City, Neighborhood } from "@/lib/service-areas/types";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  city: City;
  neighborhood: Neighborhood;
};

export default function NeighborhoodHero({ city, neighborhood }: Props) {
  return (
    <section className="bg-white">
      <div className="relative h-[68vh] min-h-[520px] max-h-[820px] overflow-hidden">
        <Image
          src={neighborhood.heroImage}
          alt={`Real estate in ${neighborhood.name}, ${city.name}, ${city.stateCode}`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="hero-overlay" aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
          <h1 className="font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] text-white font-light max-w-4xl mb-7">
            Dedicated Real Estate for{" "}
            <span>{neighborhood.name} Residents.</span>
          </h1>
          <p className="text-[16px] text-white/75 max-w-2xl leading-8 mb-10">
            {neighborhood.introCopy}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/free-home-evaluation"
              className="inline-flex items-center bg-white text-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
            >
              Free {neighborhood.name} Home Evaluation
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center border border-white/35 text-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-8 pb-2">
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Service Areas", href: "/service-areas" },
              { label: city.name, href: `/service-areas/${city.slug}` },
              { label: neighborhood.name },
            ]}
          />
          <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60">
            {neighborhood.heroEyebrow}
          </p>
        </div>
      </div>
    </section>
  );
}
