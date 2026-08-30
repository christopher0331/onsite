import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { pageMetadata } from "@/lib/page-meta";
import { getShowIdxContentForRequest } from "@/lib/site-visibility-server";

export const metadata: Metadata = pageMetadata({
  title: "Real Estate Agents Lake Tapps | Onsite ReGroup",
  description:
    "Top rated real estate agents in Pierce County. Sell your home with confidence. Trusted agents serving Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & Beyond.",
  path: "/",
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

export default async function Home() {
  const showIdxContent = await getShowIdxContentForRequest();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <TestimonialsScroll />
        <About />
        <Solutions />
        <Process />
        <FeaturedListings />
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
