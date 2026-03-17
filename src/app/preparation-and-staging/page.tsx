import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import StagePriceListPath from "@/components/StagePriceListPath";

export const metadata: Metadata = {
  title: "Home Preparation & Staging | OnSite Real Estate Group",
  description:
    "Smart preparation and staging help attract buyers and maximize your sale price. We guide you through every step to make your home market-ready in East Pierce County.",
};

const CDN = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269";

const whyCards = [
  {
    icon: `${CDN}/67d625bda79f0c901c758eea_Money%20Circle.png`,
    title: "Maximizes Home's Value",
    description:
      "Well-prepared homes attract higher offers by showcasing their full potential, making buyers more willing to pay top dollar.",
  },
  {
    icon: `${CDN}/67d62608a76aa2b2af9463af_housee.png`,
    title: "Reduces Time on Market",
    description:
      "Homes that look move-in ready generate more interest, leading to quicker sales and fewer price reductions.",
  },
  {
    icon: `${CDN}/67d6265fc13128f252b658b1_Sold.png`,
    title: "Reduces Buyer Concerns",
    description:
      "A well-maintained home signals to buyers that it's been cared for, reducing hesitation and negotiations.",
  },
  {
    icon: `${CDN}/67d6269c178881123c58b4ee_Buyer.png`,
    title: "Gives You a Competitive Edge",
    description:
      "In a crowded market, a well-presented home stands out, attracting more serious buyers and multiple offers.",
  },
];

const impressionCards = [
  {
    icon: `${CDN}/67d626f2c13128f252b695ef_Love.png`,
    title: "Helps Buyers Visualize",
    description: "Create a clean, inviting space buyers can visualize as their own.",
  },
  {
    icon: `${CDN}/67d62608a76aa2b2af9463af_housee.png`,
    title: "Stronger First Impressions",
    description: "Professionally staged homes stand out and draw in serious buyers.",
  },
  {
    icon: `${CDN}/67d6265fc13128f252b658b1_Sold.png`,
    title: "Sell Faster",
    description: "Staged homes sell up to 88% faster than non-staged homes.",
  },
  {
    icon: `${CDN}/67d97779741011739ef22761_Costs.png`,
    title: "Higher Offers",
    description: "Buyers are willing to pay 5–10% more for a home that looks move-in ready.",
  },
];

export default function PreparationAndStagingPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={`${CDN}/67d58fbf39b868e7ca14f23b_Sell%20your%20home%20-%20Preparation%20%26%20Staging.webp`}
            alt="Prepare and stage your home to sell for more"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Preparation & Staging</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Prepare to sell your home for more.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              Smart preparation and staging help attract buyers and maximize your sale price.
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
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Preparation</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Market ready homes sell faster.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-8 text-charcoal/70 lg:col-span-7">
              <p>
                A well-prepared home stands out, attracts buyers, and sells for a higher price. We guide you through every step to make your home market-ready.
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

        {/* Why Staging Matters — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Why It Matters</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Why Staging & Preparation Matter.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Proper preparation sets the stage for a successful sale. A well-presented home not only attracts more buyers but also creates a lasting impression that drives higher offers. Thoughtful preparation gives you a competitive edge, helping your home stand out in a crowded market and sell for its true value.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyCards.map((card) => (
                <article key={card.title} className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                  <Image src={card.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-80" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-charcoal">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* First Impressions Sell Homes — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">First Impressions</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  First Impressions Sell Homes.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-white/70">
                Buyers make decisions fast, and the right presentation can lead to higher offers. We help you highlight your home&apos;s best features to attract the strongest buyers.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {impressionCards.map((card) => (
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
                Let&apos;s Talk Preparation
              </Link>
            </div>
          </div>
        </section>

        {/* Stage → Price → List infographic — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">The Process</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Stage, Price, List.
              </h2>
            </div>
            <StagePriceListPath />
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src={`${CDN}/67d58fbf39b868e7ca14f23b_Sell%20your%20home%20-%20Preparation%20%26%20Staging.webp`}
                alt="Ready to get started with staging your home"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/52" />
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
