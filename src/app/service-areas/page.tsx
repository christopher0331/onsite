import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Breadcrumbs from "@/components/service-areas/Breadcrumbs";
import ServiceAreaCTA from "@/components/service-areas/ServiceAreaCTA";
import ServiceAreaCoverageMap from "@/components/service-areas/ServiceAreaCoverageMap";
import { WebPageSchema } from "@/components/service-areas/SchemaLd";
import {
  CITIES,
  NEIGHBORHOODS,
} from "@/lib/service-areas/data";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const SITE_URL = getCanonicalBaseUrl();

export const metadata: Metadata = {
  title: "Service Areas | Pierce County Real Estate | OnSite ReGroup",
  description:
    "OnSite ReGroup serves Pierce County, WA from Lake Tapps. Explore our city hubs and neighborhood pages for Puyallup, Bonney Lake, Sumner and beyond.",
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
};

export default function ServiceAreasIndex() {
  const metroCoverageSlugs = new Set([
    "puyallup",
    "tacoma",
    "federal-way",
    "kent",
    "seattle",
  ]);
  const metroCoverageAreas = CITIES.filter((c) => metroCoverageSlugs.has(c.slug)).map((city) => ({
    city: city.name,
    stateCode: city.stateCode,
    county: city.county,
    zipCodes: city.zipCodes,
    neighborhoods: city.neighborhoodDirectory,
  }));

  return (
    <>
      <Header />
      <WebPageSchema
        pageUrl={`${SITE_URL}/service-areas`}
        title="Service Areas | Pierce County Real Estate"
        description="Explore OnSite service coverage across the Puyallup-to-Seattle corridor with city hubs, neighborhood spokes, and targeted ZIP coverage."
      />
      <main className="bg-white">
        <section className="relative h-[58vh] min-h-[440px] max-h-[680px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg"
            alt="Pierce County service areas"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="hero-overlay" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Service Areas" },
              ]}
            />
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">
              Service Areas · Pierce County
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[1.0] text-white font-light max-w-4xl mb-7">
              Where we <span>work.</span>
            </h1>
            <p className="text-[16px] text-white/75 max-w-2xl leading-8">
              We operate a tight Pierce County footprint by design — Lake
              Tapps based, with city-by-city pricing models, comp pools, and
              prep playbooks for the submarkets we list in every week.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
                City Hubs
              </p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                City hubs across our <span>active service footprint.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CITIES.map((city) => {
                const childCount = NEIGHBORHOODS.filter(
                  (n) => n.citySlug === city.slug
                ).length;
                return (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="group rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-7 hover:shadow-[0_22px_70px_rgba(0,0,0,0.1)] transition-all duration-500"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/65 mb-3">
                      {city.county} · {city.stateCode}
                    </p>
                    <h3 className="font-serif text-3xl font-light text-charcoal mb-3 group-hover:text-charcoal/90 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-[14.5px] leading-7 text-charcoal/85 line-clamp-3 mb-5">
                      {city.heroIntro}
                    </p>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-charcoal/70">
                      <span>
                        {childCount} Neighborhood{childCount === 1 ? "" : "s"}
                      </span>
                      <span className="inline-flex items-center gap-2 group-hover:text-charcoal transition-colors">
                        Explore
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-[#f2ede6]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-12 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">
                Neighborhood Spokes
              </p>
              <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
                Deeper than a <span>city map.</span>
              </h2>
              <p className="mt-5 text-[15.5px] leading-8 text-charcoal/85">
                Each spoke page focuses on a single submarket — its housing
                stock, comp set, school feeder, and adjacent neighborhoods.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NEIGHBORHOODS.map((n) => {
                const city = CITIES.find((c) => c.slug === n.citySlug);
                if (!city) return null;
                return (
                  <Link
                    key={`${n.citySlug}-${n.slug}`}
                    href={`/service-areas/${n.citySlug}/${n.slug}`}
                    className="group rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.1)] transition-all duration-500"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/65 mb-3">
                      {city.name} · {n.zipCodes.join(" / ")}
                    </p>
                    <h3 className="font-serif text-2xl font-light text-charcoal mb-3 group-hover:text-charcoal/90 transition-colors">
                      {n.name}
                    </h3>
                    <p className="text-[14px] leading-7 text-charcoal/85 line-clamp-3">
                      {n.introCopy}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <ServiceAreaCoverageMap areas={metroCoverageAreas} />

        <ServiceAreaCTA
          headline="Get a city-specific valuation"
          italicSuffix="for your exact zip code."
          image="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg"
          areaLabel="your service area"
        />

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
