import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import NegotiationReliabilityPath from "@/components/NegotiationReliabilityPath";

export const metadata: Metadata = {
  title: "Expert Real Estate Negotiation & Closing | OnSite Real Estate Group",
  description:
    "We leverage negotiation to maximize your profit & ensure a seamless closing process. Our agents secure the best terms, protect your interests, and close without delays.",
};

const CDN = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269";

const strengthCards = [
  {
    icon: `${CDN}/67d62440ae483e2d92b6f261_Value.png`,
    title: "Maximize Sale Price",
    description:
      "We strategically position your home to create competition among buyers, driving multiple offers & securing the highest possible sale price.",
  },
  {
    icon: `${CDN}/67d624c7a5537ecc3f1c598f_Local%20Market.png`,
    title: "Stronger Contract Terms",
    description:
      "Favorable terms can save you thousands. We negotiate contingencies, closing timelines, and buyer conditions to protect your best interests.",
  },
  {
    icon: `${CDN}/67d97779741011739ef22761_Costs.png`,
    title: "Reduce Seller Costs",
    description:
      "From inspections to closing fees, we minimize unnecessary expenses, ensuring you keep more money in your pocket at the closing table.",
  },
  {
    icon: `${CDN}/67d977e1827076cdd2f529d0_Smoother%20Close.png`,
    title: "Smoother Closing Process",
    description:
      "We stay ahead of every deadline, contingency, and document requirement, streamlining the closing process and avoiding costly delays.",
  },
];


export default function NegotiationClosingPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={`${CDN}/67d8a053774a91c6a64dfd86_Secure%20The%20Best%20Terms.webp`}
            alt="Expert negotiation and closing with OnSite Real Estate Group"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Negotiation & Closing</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Expert Negotiation.<br />Seamless Closing.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              We leverage negotiation to maximize profit & ensure a seamless closing process.
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
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Negotiation & Closing</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                We secure the best terms for you.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-8 text-charcoal/70 lg:col-span-7">
              <p>
                Our experienced real estate agents give you the advantage of securing the right terms, avoiding pitfalls, and ensuring a smooth, successful sale.
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

        {/* The Power of Strong Negotiation — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Our Approach</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  The Power of Strong Negotiation.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Securing the best deal is about more than price — it&apos;s about terms, contingencies, and a smooth closing process. We negotiate with confidence & expertise to protect your goals, interests, and maximize your home sale.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {strengthCards.map((card) => (
                <article key={card.title} className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                  <Image src={card.icon} alt="" width={44} height={44} className="mb-4 h-11 w-11 object-contain opacity-80" />
                  <h3 className="mb-3 font-serif text-2xl font-light text-charcoal">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reliability infographic — white, standalone */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Why It Matters</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Why Negotiation Matters.
              </h2>
            </div>
            <NegotiationReliabilityPath />
          </div>
        </section>

        {/* Why Negotiation Matters — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Why It Matters</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Why Negotiation Matters.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-white/70">
                Our skilled negotiation and closing tactics help protect your bottom line, prevent costly surprises, and turn buyer offers into successful home sales.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                {
                  icon: `${CDN}/67d97718a4735b93ae946044_Money.png`,
                  title: "Reduce Risk & Liability",
                  description: "Poorly negotiated contracts lead to unexpected costs, delays, or legal issues. We make sure every contract is airtight and in your favor.",
                },
                {
                  icon: `${CDN}/67d6269c178881123c58b4ee_Buyer.png`,
                  title: "Buyer Push Back",
                  description: "Without expert representation, buyers will try to lower the price, demand repairs, or delay closing. We make sure the deal works for your goals.",
                },
                {
                  icon: `${CDN}/67d97779741011739ef22761_Costs.png`,
                  title: "Close Without Delays",
                  description: "From inspections to contingencies, we handle every detail to keep your sale moving smoothly and on schedule.",
                },
                {
                  icon: `${CDN}/67d97752c468dfa812d2c0ac_Termss.png`,
                  title: "Secure the Best Terms",
                  description: "Strong negotiation ensures closing timelines, contingencies, and contract details work in your favor.",
                },
              ].map((card) => (
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
                Let&apos;s Talk Solutions
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
                src={`${CDN}/67d8a053774a91c6a64dfd86_Secure%20The%20Best%20Terms.webp`}
                alt="Ready to secure the best terms on your home sale"
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
