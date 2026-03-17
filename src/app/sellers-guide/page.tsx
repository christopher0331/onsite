import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import SellHomeInfoGraphic from "@/components/SellHomeInfoGraphic";
import SellerProofPath from "@/components/SellerProofPath";

export const metadata: Metadata = {
  title: "Home Seller's Guide | Step-by-Step Process to Sell with Confidence",
  description:
    "Your guide to a profitable sale. From pricing to closing, we provide expert insights, market strategies, and practical steps to get you the best results.",
};

const CDN = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269";


const whyCards = [
  {
    icon: `${CDN}/67d624c7a5537ecc3f1c598f_Local%20Market.png`,
    title: "Local Expertise",
    description:
      "We know the East Pierce County market inside and out, ensuring your home is priced and positioned to sell fast.",
  },
  {
    icon: `${CDN}/67d8567a0aa4f68bc6882ccd_new.png`,
    title: "High-Impact Marketing",
    description:
      "From professional photography to targeted advertising, we maximize exposure to attract serious buyers.",
  },
  {
    icon: `${CDN}/67d62440ae483e2d92b6f261_Value.png`,
    title: "Powerful Negotiation",
    description:
      "We fight for the best price, terms, and conditions, securing a deal that protects your bottom line.",
  },
  {
    icon: `${CDN}/67d6269c178881123c58b4ee_Buyer.png`,
    title: "Seamless Selling",
    description:
      "From listing to closing, we handle every detail — so you can focus on your next move with confidence.",
  },
];

export default function SellersGuidePage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={`${CDN}/67d998be8fb03b888543ffdb_Staging%20Home%20For%20Home%20Selling.webp`}
            alt="Your guide to a profitable home sale"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Seller&apos;s Guide</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Your Guide to a Profitable Sale.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              Guiding you to a smooth, successful sale. From pricing to closing, we cover it all.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/selling-process"
                className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
              >
                Our Selling Process
              </Link>
            </div>
          </div>
        </section>

        {/* Intro — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Seller&apos;s Guide</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                The roadmap to selling your home.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-8 text-charcoal/70 lg:col-span-7">
              <p>
                We do our best to provide expert insights, market strategies, and practical steps to get you the best results in your home selling journey.
              </p>
              <Link
                href="/contact-us"
                className="mt-2 inline-flex items-center gap-3 rounded-full border border-charcoal/20 px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </section>

        {/* Seller Proof — linen, standalone */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Our Track Record</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Proven results. Local expertise. Tailored strategy.
              </h2>
            </div>
            <SellerProofPath />
          </div>
        </section>

        {/* Sell Your Home Info Graphic — white, standalone */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">At a Glance</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Your selling journey, simplified.
              </h2>
            </div>
            <SellHomeInfoGraphic />
          </div>
        </section>

        {/* Why Onsite — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Why Onsite</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Why Onsite is the Right Choice.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-white/70">
                At Onsite, we combine deep local expertise, innovative marketing, and expert negotiation to ensure a smooth, profitable sale.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyCards.map((card) => (
                <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <Image src={card.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-90" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-white">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-white/75 not-italic">{card.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-white/25 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-charcoal"
              >
                Got Questions?
              </Link>
            </div>
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src={`${CDN}/67d998be8fb03b888543ffdb_Staging%20Home%20For%20Home%20Selling.webp`}
                alt="Ready to start your home selling journey"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/75">Ready to get started?</p>
                <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white">
                  Let&apos;s Talk Home Selling Solutions.
                </h2>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Let&apos;s Talk
                  </Link>
                  <Link
                    href="/sell-your-home"
                    className="inline-flex items-center justify-center rounded-full border border-white/35 px-10 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    Sell Your Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
