import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

import CityHero from "@/components/service-areas/CityHero";
import CityRegulations from "@/components/service-areas/CityRegulations";
import LocalUtilities from "@/components/service-areas/LocalUtilities";
import LocalResources from "@/components/service-areas/LocalResources";
import NeighborhoodDirectory from "@/components/service-areas/NeighborhoodDirectory";
import AreaListings from "@/components/service-areas/AreaListings";
// import CityCaseStudies from "@/components/service-areas/CityCaseStudies";
// ^ Re-enable once the per-city sold/featured listing data is sourced from
//   the real CRM/MLS pull instead of the curated seed set.
import SuburbanRegulations from "@/components/service-areas/SuburbanRegulations";
import UrbanLogistics from "@/components/service-areas/UrbanLogistics";
import MicroClimate from "@/components/service-areas/MicroClimate";
import ServiceAreaCTA from "@/components/service-areas/ServiceAreaCTA";
import ServiceAreaArticle from "@/components/service-areas/ServiceAreaArticle";
import AboutTheArea from "@/components/service-areas/AboutTheArea";
import {
  AreaListingsItemListSchema,
  BreadcrumbSchema,
  buildCityMentions,
  CityPlaceSchema,
  CityServiceSchema,
  OrganizationSchema,
  WebPageSchema,
} from "@/components/service-areas/SchemaLd";

import {
  CITIES,
  getAllCitySlugs,
  getCityBySlug,
  getNeighborhoodsByCity,
} from "@/lib/service-areas/data";
import { getServiceAreaArticle } from "@/lib/service-areas/articles";
import { getServiceAreaDiscover } from "@/lib/service-areas/discover";
import { getServiceAreaListings } from "@/lib/service-area-listings";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const SITE_URL = getCanonicalBaseUrl();

export function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const url = `${SITE_URL}/service-areas/${city.slug}`;
  const title = `${city.name}, ${city.stateCode} Real Estate Agents | OnSite ReGroup`;
  const description = `Local ${city.name} real estate brokerage. Pricing, prep, and negotiation services across ${city.zipCodes.join(", ")}. ${city.activeProjects} active projects this cycle.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "OnSite ReGroup",
      locale: "en_US",
      type: "website",
      images: [{ url: city.heroImage }],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const neighborhoods = getNeighborhoodsByCity(city.slug);
  const pageUrl = `${SITE_URL}/service-areas/${city.slug}`;
  const { listings } = await getServiceAreaListings(city.name, 6);
  const article = getServiceAreaArticle(city.slug);
  const discover = getServiceAreaDiscover(city.slug);

  // Other cities for cross-linking at the bottom.
  const peers = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Service Areas", url: `${SITE_URL}/service-areas` },
          { name: city.name, url: pageUrl },
        ]}
      />
      <CityServiceSchema city={city} pageUrl={pageUrl} />
      <CityPlaceSchema city={city} />
      <OrganizationSchema />
      <WebPageSchema
        pageUrl={pageUrl}
        title={`${city.name}, ${city.stateCode} Real Estate Agents`}
        description={city.heroIntro}
        mentions={buildCityMentions(city)}
      />
      <AreaListingsItemListSchema listings={listings} pageUrl={pageUrl} />

      <main className="bg-white">
        <CityHero city={city} />
        <CityRegulations city={city} />
        {city.features.suburbanRegulations && (
          <SuburbanRegulations city={city} />
        )}
        {city.features.urbanLogistics && <UrbanLogistics city={city} />}
        <LocalUtilities city={city} />
        {city.features.microClimate && <MicroClimate city={city} />}
        <LocalResources city={city} />
        <NeighborhoodDirectory city={city} neighborhoods={neighborhoods} />
        {/* <CityCaseStudies city={city} /> — disabled until real per-city listings are wired in */}

        <AreaListings
          areaLabel={city.name}
          listings={listings}
          viewAllHref={`/listings?city=${encodeURIComponent(city.name)}&state=WA`}
        />

        <section className="py-12 bg-white border-t border-charcoal/8">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-wrap gap-3">
            <a
              href={`/listings?city=${encodeURIComponent(city.name)}&state=WA`}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
            >
              Browse {city.name} Listings
            </a>
            <a
              href={`/listings?status=U&city=${encodeURIComponent(city.name)}&state=WA`}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
            >
              Recently Sold in {city.name}
            </a>
          </div>
        </section>

        {/* Peer city cross-linking */}
        {peers.length > 0 && (
          <section className="py-16 sm:py-20 bg-warm-gray/60">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-6">
                Other Service Areas
              </p>
              <div className="flex flex-wrap gap-3">
                {peers.map((p) => (
                  <a
                    key={p.slug}
                    href={`/service-areas/${p.slug}`}
                    className="inline-flex items-center gap-2 border border-charcoal/15 text-charcoal/80 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
                  >
                    {p.name}, {p.stateCode}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <TestimonialsScroll />

        <ServiceAreaCTA
          headline={`Let's talk ${city.name}`}
          italicSuffix="home selling."
          image={city.heroImage}
          areaLabel={city.name}
          areaQuery={city.name}
        />

        {discover ? (
          <AboutTheArea cityName={city.name} discover={discover} />
        ) : null}

        {article ? <ServiceAreaArticle article={article} /> : null}

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
