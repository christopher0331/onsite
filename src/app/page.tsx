import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import SoldProperties from "@/components/SoldProperties";
import FeaturedListings from "@/components/FeaturedListings";
import PropertyVideos from "@/components/PropertyVideos";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Insights from "@/components/Insights";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { getShowIdxContentForRequest } from "@/lib/site-visibility-server";

export default async function Home() {
  const showIdxContent = await getShowIdxContentForRequest();

  return (
    <>
      <Header />
      <main>
        <Hero showIdxLink={showIdxContent} />
        <Stats />
        <TestimonialsScroll />
        <About />
        <Solutions />
        <Process />
        {showIdxContent && (
          <>
            <SoldProperties />
            <FeaturedListings />
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
