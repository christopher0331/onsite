import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HashAnchorFix from "@/components/HashAnchorFix";
import PendingActivity from "@/components/PendingActivity";
import UpcomingOpenHouses from "@/components/UpcomingOpenHouses";
import { SITE_BRAND } from "@/lib/nap";
import { pageMetadata } from "@/lib/page-meta";
import { getShowIdxContentForRequest } from "@/lib/site-visibility-server";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_BRAND} | Pierce County Real Estate Agents`,
  description:
    "Top rated real estate agents in Pierce County. Sell your home with confidence. Serving Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & beyond.",
  path: "/",
  image:
    "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-poster-00001.jpg",
});

const Stats = dynamic(() => import("@/components/Stats"));
const TestimonialsScroll = dynamic(() => import("@/components/TestimonialsScroll"));
const About = dynamic(() => import("@/components/About"));
const Solutions = dynamic(() => import("@/components/Solutions"));
const Process = dynamic(() => import("@/components/Process"));
const FeaturedListings = dynamic(() => import("@/components/FeaturedListings"));
const SoldProperties = dynamic(() => import("@/components/SoldProperties"));
const PropertyVideos = dynamic(() => import("@/components/PropertyVideos"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const CTA = dynamic(() => import("@/components/CTA"));
const Insights = dynamic(() => import("@/components/Insights"));
const Marquee = dynamic(() => import("@/components/Marquee"));
const Footer = dynamic(() => import("@/components/Footer"));

const PENDING_IDS = ["pending"];

export default async function Home() {
  const showIdxContent = await getShowIdxContentForRequest();

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Rendered inline (not streamed) so it is in the first HTML and does not
            push the sections below it down after paint (CLS). Data is cached 5 min.
            Renders nothing when no open houses are upcoming. */}
        <UpcomingOpenHouses />
        <Stats />
        <TestimonialsScroll />
        <About />
        <Solutions />
        <Process />
        <FeaturedListings />
        <PendingActivity />
        <HashAnchorFix ids={PENDING_IDS} />
        {showIdxContent && (
          <>
            <SoldProperties />
            <PropertyVideos />
          </>
        )}
        <Testimonials />
        <CTA />
        <Insights />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
