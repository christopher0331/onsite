import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

import NeighborhoodHero from "@/components/service-areas/NeighborhoodHero";
import NeighborhoodGovernance from "@/components/service-areas/NeighborhoodGovernance";
import DispatchLogistics from "@/components/service-areas/DispatchLogistics";
import AdjacentAreas from "@/components/service-areas/AdjacentAreas";
import LocalReviews from "@/components/service-areas/LocalReviews";
import AreaListings from "@/components/service-areas/AreaListings";
import ServiceAreaCTA from "@/components/service-areas/ServiceAreaCTA";
import ServiceAreaArticle from "@/components/service-areas/ServiceAreaArticle";
import AboutTheArea from "@/components/service-areas/AboutTheArea";
import {
  AreaListingsItemListSchema,
  BreadcrumbSchema,
  buildNeighborhoodMentions,
  NeighborhoodServiceSchema,
  WebPageSchema,
} from "@/components/service-areas/SchemaLd";

import {
  getAllNeighborhoodParams,
  getCityBySlug,
  getNeighborhoodBySlug,
} from "@/lib/service-areas/data";
import { getServiceAreaArticle } from "@/lib/service-areas/articles";
import { getServiceAreaDiscover } from "@/lib/service-areas/discover";
import { filterListingsByZip, getServiceAreaListings } from "@/lib/service-area-listings";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const SITE_URL = getCanonicalBaseUrl();

export function generateStaticParams() {
  return getAllNeighborhoodParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; neighborhood: string }>;
}): Promise<Metadata> {
  const { city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);
  if (!city || !neighborhood) return {};

  const url = `${SITE_URL}/service-areas/${city.slug}/${neighborhood.slug}`;
  const title = `${neighborhood.name}, ${city.name} ${city.stateCode} Real Estate | OnSite ReGroup`;
  const description = `Dedicated ${neighborhood.name} real estate. We serve zip codes ${neighborhood.zipCodes.join(", ")} with pricing, prep, and negotiation calibrated to this exact submarket.`;
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
      images: [{ url: neighborhood.heroImage }],
    },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ city: string; neighborhood: string }>;
}) {
  const { city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const city = getCityBySlug(citySlug);
  const neighborhood = getNeighborhoodBySlug(citySlug, neighborhoodSlug);
  if (!city || !neighborhood) notFound();

  const pageUrl = `${SITE_URL}/service-areas/${city.slug}/${neighborhood.slug}`;
  const { listings: cityListings } = await getServiceAreaListings(city.name, 24);
  const listings = filterListingsByZip(cityListings, neighborhood.zipCodes, 6);
  const article = getServiceAreaArticle(neighborhood.slug);
  const discover = getServiceAreaDiscover(neighborhood.slug);
  const scopeNote = cityListings.some(
    (l) => l.address?.zip && neighborhood.zipCodes.includes(l.address.zip)
  )
    ? undefined
    : `No active ${neighborhood.name}-specific listings right now — showing current ${city.name} inventory instead.`;

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Service Areas", url: `${SITE_URL}/service-areas` },
          { name: city.name, url: `${SITE_URL}/service-areas/${city.slug}` },
          { name: neighborhood.name, url: pageUrl },
        ]}
      />
      <NeighborhoodServiceSchema
        neighborhood={neighborhood}
        cityName={city.name}
        cityStateCode={city.stateCode}
        pageUrl={pageUrl}
      />
      <WebPageSchema
        pageUrl={pageUrl}
        title={`${neighborhood.name}, ${city.name} ${city.stateCode} Real Estate`}
        description={neighborhood.introCopy}
        mentions={buildNeighborhoodMentions(neighborhood)}
      />
      <AreaListingsItemListSchema listings={listings} pageUrl={pageUrl} />

      <main className="bg-white">
        <NeighborhoodHero city={city} neighborhood={neighborhood} />
        <NeighborhoodGovernance neighborhood={neighborhood} />
        <DispatchLogistics neighborhood={neighborhood} />
        <LocalReviews neighborhood={neighborhood} />
        <AdjacentAreas neighborhood={neighborhood} />

        <AreaListings
          areaLabel={neighborhood.name}
          listings={listings}
          viewAllHref={`/listings?city=${encodeURIComponent(city.name)}&state=WA`}
          scopeNote={scopeNote}
        />

        <section className="py-10 bg-white border-t border-charcoal/8">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <Link
              href={`/listings?city=${encodeURIComponent(city.name)}&state=WA`}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-500"
            >
              View Listings in {city.name}
            </Link>
          </div>
        </section>

        {/* Back-to-city link */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <Link
              href={`/service-areas/${city.slug}`}
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-charcoal/85 hover:text-charcoal transition-colors"
            >
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              Back to {city.name} Service Area
            </Link>
          </div>
        </section>

        <ServiceAreaCTA
          headline={`Selling in ${neighborhood.name}?`}
          italicSuffix="Let's price it right."
          image={neighborhood.heroImage}
          areaLabel={neighborhood.name}
          areaQuery={`${neighborhood.name}, ${city.name}`}
        />

        {discover ? (
          <AboutTheArea
            cityName={city.name}
            neighborhoodName={neighborhood.name}
            discover={discover}
          />
        ) : null}

        {article ? <ServiceAreaArticle article={article} /> : null}

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
