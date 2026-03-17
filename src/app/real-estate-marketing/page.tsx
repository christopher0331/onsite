import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import MarketingOutcomesPath from "@/components/MarketingOutcomesPath";

export const metadata: Metadata = {
  title: "Real Estate Marketing & Strategy | OnSite Real Estate Group",
  description:
    "Smart marketing puts your home in front of serious buyers, driving stronger offers. We use high-impact photography, digital advertising, and exclusive buyer networks.",
};

const CDN = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269";

const tactics = [
  {
    icon: `${CDN}/67d855608c351cc10abbbb2c_photo%20and%20video.png`,
    title: "High-Impact Photo & Video",
    description:
      "First impressions matter. We use professional photography, virtual tours, and video walkthroughs to showcase your home in the best light.",
  },
  {
    icon: `${CDN}/67d8567a0aa4f68bc6882ccd_new.png`,
    title: "Targeted Digital Advertising",
    description:
      "Your listing gets in front of serious buyers through strategic social media, Google Ads, and real estate platforms, maximizing exposure.",
  },
  {
    icon: `${CDN}/67d5a26d748485a56d0f388b_sales.png`,
    title: "Optimized Listing Strategy",
    description:
      "We craft compelling property descriptions and highlight key features to attract the right buyers.",
  },
  {
    icon: `${CDN}/67d856f88547e5a68be5a34d_print.png`,
    title: "Local & Print Marketing",
    description:
      "Eye-catching flyers, direct mail, and high-visibility signage ensure your home stands out in the local market.",
  },
  {
    icon: `${CDN}/67d6269c178881123c58b4ee_Buyer.png`,
    title: "Exclusive Buyer Networks",
    description:
      "We connect your listing with our network of pre-qualified buyers and top real estate professionals for faster, stronger offers.",
  },
];

const whyCards = [
  {
    icon: `${CDN}/67d62440ae483e2d92b6f261_Value.png`,
    title: "Strong First Impressions",
    description: "Professional photos & staging make your home stand out.",
  },
  {
    icon: `${CDN}/67d624c7a5537ecc3f1c598f_Local%20Market.png`,
    title: "Targeted Exposure",
    description: "We market your home directly to serious, high-intent buyers.",
  },
  {
    icon: `${CDN}/67d6249bc74039c2da644501_Comparable%20Sales.png`,
    title: "Competitive Edge",
    description: "A strong strategy helps your home sell faster & for more.",
  },
  {
    icon: `${CDN}/67d5a26d748485a56d0f388b_sales.png`,
    title: "Smoother Negotiations",
    description: "More interest means better offers & stronger contract terms.",
  },
];

// Marketing channels infographic data — replaces the Marketing Info Graphic image
const channels = [
  { num: "01", label: "Photography & Video", detail: "Professional visuals that stop buyers mid-scroll." },
  { num: "02", label: "Social & Digital Ads", detail: "Targeted reach across Facebook, Instagram & Google." },
  { num: "03", label: "MLS & Listing Platforms", detail: "Maximum visibility on Zillow, Realtor.com & more." },
  { num: "04", label: "Print & Local Outreach", detail: "Flyers, mailers & signage in your target neighbourhood." },
  { num: "05", label: "Buyer Network", detail: "Direct access to pre-qualified buyers ready to act." },
];

export default function RealEstateMarketingPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={`${CDN}/67d852185ef9446fcb38c607_We%20walk%20you%20through%20Selling%20Your%20Home.webp`}
            alt="Real estate marketing strategy with OnSite Real Estate Group"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Marketing Strategy</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Don&apos;t just list it.<br />Get it sold.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              Smart marketing puts your home in front of serious buyers, driving stronger offers.
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
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Marketing</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Marketing that moves homes.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-8 text-charcoal/70 lg:col-span-7">
              <p>
                The right strategy gets your home seen by the right buyers. We use high-impact marketing to attract interest, drive competition, & secure the best offers.
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

        {/* 5 Tactics — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Maximum Impact</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Marketing For Maximum Impact.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Our comprehensive approach blends cutting-edge digital strategies with traditional marketing tactics to maximize exposure and drive real results. We ensure your home gets noticed by serious buyers who are ready to act.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {tactics.map((t) => (
                <article key={t.title} className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                  <Image src={t.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-80" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-charcoal">{t.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{t.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Outcomes — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">The Result</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                What great marketing delivers.
              </h2>
            </div>
            <MarketingOutcomesPath />
          </div>
        </section>

        {/* Why Marketing Matters — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Header */}
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Why It Matters</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Why Marketing Matters.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-white/70">
                The right marketing strategy gets your home in front of the right buyers. Our approach blends local market knowledge, professional presentation & high-impact campaigns to generate strong offers.
              </p>
            </div>

            {/* 4 reason cards */}
            <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyCards.map((card) => (
                <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <Image src={card.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-90" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-white">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-white/75 not-italic">{card.description}</p>
                </article>
              ))}
            </div>

            {/* Marketing channels infographic — replaces Marketing Info Graphic.png */}
            <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
              <div className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-5 md:divide-x md:divide-y-0">
                {channels.map((ch, i) => (
                  <div key={ch.num} className="relative flex flex-col gap-3 px-6 py-8 md:px-5">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-3 select-none font-serif text-[4.5rem] font-light leading-none text-white/[0.05]"
                    >
                      {ch.num}
                    </span>
                    <p className="font-serif text-[2rem] font-light leading-none text-white">{ch.num}</p>
                    <h3 className="font-serif text-[1.1rem] font-light leading-snug text-white">{ch.label}</h3>
                    <p className="text-[13px] leading-6 text-white/70 not-italic">{ch.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-white/25 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-charcoal"
              >
                Let&apos;s Talk Marketing
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
                src={`${CDN}/67d855a90aa4f68bc6877b74_Marketing%20Homes%20For%20Sell.png`}
                alt="Ready to market your home"
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
