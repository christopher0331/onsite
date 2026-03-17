import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import PrepListSellPath from "@/components/PrepListSellPath";

export const metadata: Metadata = {
  title: "The Home Selling Process | OnSite Real Estate Group",
  description:
    "Our process ensures a smooth, profitable home sale with expert guidance. From home evaluation to negotiation and closing, we simplify every step.",
};

const processSteps = [
  {
    number: "1",
    title: "Home Evaluation",
    description:
      "Knowing your home's value is key to a successful sale. Our expert evaluation analyzes market trends, recent sales, and your home's unique features-so you can list with confidence.",
  },
  {
    number: "2",
    title: "Preparation & Staging",
    description:
      "We guide you through planning, strategic improvements, staging, and decluttering. Even small changes, like a fresh coat of paint, can boost appeal, attract buyers, and maximize your sale price.",
  },
  {
    number: "3",
    title: "Marketing Strategy",
    description:
      "Our marketing approach combines professional photography, targeted campaigns, and local outreach to attract buyers, create demand, and secure top-dollar offers.",
  },
  {
    number: "4",
    title: "Negotiation & Closing",
    description:
      "Negotiation is more than just price-it's about securing the best terms. We advocate for you, handle contingencies, and ensure a smooth closing for a successful sale.",
  },
];

const guidanceCards = [
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d5a2c39a3768e0b8fb3571_regulations.png",
    title: "Navigating Regulations",
    description:
      "Our agents understand requirements, ensuring your sale follows the right legal and inspection guidelines.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d5a221748485a56d0f0ee1_networks.png",
    title: "Trusted Network",
    description:
      "We can connect you with reputable inspectors, & contractors to help streamline the selling process.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d5a26d748485a56d0f388b_sales.png",
    title: "Expert Inspection Guidance",
    description:
      "We help you interpret inspection reports and provide insight on what matters most to buyers.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d5a34f87c0e5be3a24f6d1_CONTRACTS.png",
    title: "Smart Contract Strategies",
    description:
      "Our team guides you in structuring contracts with the right contingencies to protect your sale and minimize risk.",
  },
];

export default function SellingProcessPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d464755ef4e3bfca4663f1_Home%20Selling%20Process%20-%20Onsite%20Real%20Estate.webp"
            alt="The home selling process with OnSite Real Estate Group"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Selling Process</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Expert Guidance. Successful Sales.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              Our process ensures a smooth, profitable home sale with expert guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/sellers-guide"
                className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
              >
                Seller&apos;s Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Selling Process</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                A clear path to selling your home.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-8 text-charcoal/70 lg:col-span-7">
              <p>
                We know that selling a home is a big decision-we&apos;ve been there ourselves. That&apos;s why we&apos;ve created a streamlined process that simplifies every step.
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

        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">The Roadmap</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  A simple guide for the best results.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Selling a home is a big decision, but with the right guidance, it doesn&apos;t have to be overwhelming. Our step-by-step guide walks you through each step ensuring a smooth & successful sale.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.07)]"
                >
                  <p className="mb-4 font-serif text-4xl font-light text-charcoal/75">{step.number}</p>
                  <h3 className="mb-3 font-serif text-2xl font-light text-charcoal">{step.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Section header */}
            <div className="mb-14 max-w-3xl">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40">Onsite&apos;s Expert Guidance</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                We help you navigate regulations, connect you with trusted professionals & structure smart contracts — ensuring a seamless, stress-free selling experience.
              </h2>
            </div>

            {/* Prep → List → Sell infographic */}
            <div className="mb-14 overflow-hidden rounded-3xl border border-white/[0.08]">
              <PrepListSellPath />
            </div>

            {/* Guidance cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {guidanceCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <Image src={card.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-90" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-white">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-white/65">{card.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-charcoal"
              >
                Let&apos;s Talk
              </Link>
            </div>

          </div>
        </section>

        <TestimonialsScroll />

        <section className="bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d464755ef4e3bfca4663f1_Home%20Selling%20Process%20-%20Onsite%20Real%20Estate.webp"
                alt="Ready to get started with your home sale"
                fill
                className="object-cover"
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
