import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Sell Your Home in East Pierce County | Free Home Valuation & Expert Realtors",
  description:
    "Knowledgeable realtors dedicated to helping homeowners sell with confidence. Expert guidance, proven marketing strategies, and local market knowledge across Pierce County.",
};

const pricingTools = [
  {
    title: "Home Value Analysis",
    description: "Receive the most accurate estimate, powered by the same technology used by lenders.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d62440ae483e2d92b6f261_Value.png",
  },
  {
    title: "Price History",
    description: "Review sales dates and prices from years past to produce an accurate pricing structure.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d6240580fc1961825146d3_price%20history.png",
  },
  {
    title: "Comparable Sales",
    description: "Compare the latest home sale prices in your neighborhood and across East Pierce County.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d6249bc74039c2da644501_Comparable%20Sales.png",
  },
  {
    title: "Local Market Insights",
    description: "Get the inside scoop on recent home sales and pricing trends in your ZIP code and county.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d624c7a5537ecc3f1c598f_Local%20Market.png",
  },
];

const steps = [
  {
    number: "01",
    title: "Home Evaluation",
    description: "We start with a comprehensive analysis of your home's value using real-time market data, comparable sales, and local expertise to set the right price from day one.",
    href: "/free-home-evaluation",
  },
  {
    number: "02",
    title: "Staging & Preparation",
    description: "We guide you through exactly what to fix, update, and stage to maximize your home's appeal and drive stronger offers from qualified buyers.",
    href: "/preparation-and-staging",
  },
  {
    number: "03",
    title: "Closing & Negotiation",
    description: "André goes to bat for you at every turn — from fielding offers to navigating inspection responses and protecting your bottom line all the way to closing day.",
    href: "/negotiation-closing",
  },
];

const soldProperties = [
  {
    title: "Single-Story Home in Gem Heights, Puyallup",
    badge: "Sold",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
    href: "/sold-homes/single-story-home-in-gem-heights-puyallup",
  },
  {
    title: "Modern Home in Sumner Valley",
    badge: "Sold",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
    href: "/sold-homes/modern-home-in-sumner-valley",
  },
  {
    title: "Modern Home in Thriving Sumner Valley",
    badge: "Sold",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
    href: "/sold-homes/modern-home-in-thriving-sumner-valley",
  },
];


export default function SellYourHomePage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg"
            alt="Sell Your Home in Pierce County"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-end pb-20 sm:pb-28">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">Sell Your Home</p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.0] text-white font-light max-w-4xl mb-8">
              Get the Most Out of <span className="italic">Your Home.</span>
            </h1>
            <p className="text-[16px] text-white/70 max-w-xl leading-8 mb-10">
              Knowledgeable realtors dedicated to helping homeowners sell with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center bg-white text-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/free-home-evaluation"
                className="inline-flex items-center border border-white/35 text-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
              >
                Free Home Evaluation
              </Link>
            </div>
          </div>
        </section>

        {/* Expertise split */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Expertise</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                Sell smarter with a <span className="italic">tailored strategy.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[16px] leading-8 text-charcoal/70">
              <p>
                From the very first consultation, Onsite provides a clear, strategic plan to get your home sold. We set expectations, define goals, and create a personalized selling experience tailored to Pierce County&apos;s competitive market.
              </p>
              <p>
                With expert guidance, proven marketing strategies, and local market knowledge, we ensure a smooth, successful sale while maximizing your home&apos;s value.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 mt-2 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </section>

        {/* Experience + Pricing tools */}
        <section className="py-20 sm:py-28 bg-[#f2ede6]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Experience That Gets Results</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                  We understand what it takes to <span className="italic">get your home sold.</span>
                </h2>
                <p className="text-[16px] leading-8 text-charcoal/65">
                  Selling your home takes more than just listing it — it requires the right strategy, market knowledge, and expert execution. With a proven track record, deep local expertise, and a customized approach, we position your home for a fast, successful sale.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {pricingTools.map((tool) => (
                <div
                  key={tool.title}
                  className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.07)]"
                >
                  <Image
                    src={tool.icon}
                    alt=""
                    width={46}
                    height={46}
                    className="w-11 h-11 object-contain mb-4 opacity-80"
                  />
                  <h3 className="font-serif text-xl text-charcoal mb-2">{tool.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing */}
        <section className="py-20 sm:py-28 bg-[#1a1a18]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left — copy */}
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-5">Marketing</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08] mb-7">
                Don&apos;t just get it on the market. <span className="italic">Get it sold.</span>
              </h2>
              <p className="text-[16px] leading-8 text-white/55 mb-8">
                Attracting the right buyers and driving action is what we do. Our strategic marketing combines high-impact visuals, targeted digital campaigns, and expert local outreach to ensure your home gets maximum exposure and sells at the right price.
              </p>
              <Link
                href="/real-estate-marketing"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white hover:text-charcoal transition-all duration-500"
              >
                Marketing &amp; Strategy
              </Link>
            </div>

            {/* Right — editorial pictograph */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.07]">

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">300<span className="text-[2rem]">+</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">Homes Sold</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Proven Results</p>
                  <p className="text-[14px] leading-7 text-white/45">300+ homes sold and $100M+ in sales prove we consistently deliver success for our clients across Pierce County.</p>
                </div>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">10<span className="text-[2rem]">yr</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">Experience</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Market Expertise</p>
                  <p className="text-[14px] leading-7 text-white/45">A decade of deep local knowledge means your home is priced right and positioned for the best possible outcome.</p>
                </div>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">1<span className="text-[2rem]">:1</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">Personalized</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Tailored Strategy</p>
                  <p className="text-[14px] leading-7 text-white/45">We design a fully custom plan for your specific home, neighborhood, and timeline — built to attract the right buyers and maximize offers.</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Selling Steps */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Selling Process</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                Selling made <span className="italic">easy.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((step) => (
                <Link
                  key={step.number}
                  href={step.href}
                  className="group rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-7 shadow-[0_14px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  <span className="block font-serif text-5xl font-light text-charcoal/30 mb-5">{step.number}</span>
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-3 group-hover:text-charcoal/70 transition-colors">{step.title}</h3>
                  <p className="text-[14.5px] leading-7 text-charcoal/60">{step.description}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-[0.2em] text-charcoal/40 group-hover:text-charcoal transition-colors">
                    Learn More
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sold Properties */}
        <section className="py-20 sm:py-28 bg-[#f2ede6]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">Sold Properties</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                  Over 300+ <span className="italic">Sold Properties.</span>
                </h2>
              </div>
              <Link
                href="/sold-homes"
                className="hidden sm:inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {soldProperties.map((prop) => (
                <Link key={prop.title} href={prop.href} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
                      {prop.badge}
                    </span>
                    <p className="absolute bottom-5 left-5 right-5 font-serif text-lg font-light text-white leading-snug">
                      {prop.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link
                href="/sold-homes"
                className="inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                View All
              </Link>
            </div>
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg"
                alt="Ready to get started"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/52" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-4">Ready to get started?</p>
                <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.05]">
                  Let&apos;s Talk <span className="italic">Home Selling Solutions</span>
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="tel:253-441-9764"
                    className="inline-flex items-center justify-center border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
                  >
                    (253) 441-9764
                  </a>
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
