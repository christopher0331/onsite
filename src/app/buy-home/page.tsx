import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import MLSCardAttribution from "@/components/MLSCardAttribution";

export const metadata: Metadata = {
  title: "Find Your Perfect Home | Onsite Real Estate",
  description:
    "We give you the guidance, market insight, and negotiation power every step of the way. Search homes across Pierce County with OnSite Real Estate Group.",
};

const advantages = [
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d624c7a5537ecc3f1c598f_Local%20Market.png",
    title: "Expert Market Insight",
    description: "From finding the perfect property to finalizing the deal, our team provides expert advice and clear guidance throughout the entire buying process.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d62608a76aa2b2af9463af_housee.png",
    title: "Tailored Home Search",
    description: "We utilize advanced tools and strategies to help you quickly find homes that match your needs and preferences, saving you time and effort.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d97779741011739ef22761_Costs.png",
    title: "Guidance Through Financing",
    description: "We work closely with trusted lenders to ensure you have access to the best financing options, tailored to your financial situation.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d6269c178881123c58b4ee_Buyer.png",
    title: "Transparent Closing Process",
    description: "We believe in full transparency throughout the home-buying process, ensuring you're well-informed at every step and never left in the dark.",
  },
];


const featuredListings = [
  {
    title: "Dream Home with Pickleball Court",
    price: "$720,000",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe8304415e6b356d95497_1.jpg",
    href: "/featured-homes/entertainers-dream-home-with-pickleball-court-on-1-2-acre",
  },
  {
    title: "Luxury Rambler on 15 Acres with Rainier Views",
    price: "$1,495,000",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe409428a57e5320586a0_1.jpg",
    href: "/featured-homes/luxury-rambler-on-15-acres-with-rainier-views",
  },
  {
    title: "Charming Downtown Puyallup Home",
    price: "$575,000",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fd23abc202eff2c44d1d4_2.jpg",
    href: "/featured-homes/charming-downtown-puyallup-home",
  },
];

export default function BuyHomePage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg"
            alt="Buy a Home with OnSite Real Estate"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-end pb-20 sm:pb-28">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">Buy a Home</p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.0] text-white font-light max-w-4xl mb-8">
              Buy Your Home, <span className="italic">the Right Way.</span>
            </h1>
            <p className="text-[16px] text-white/70 max-w-xl leading-8 mb-10">
              We give you the guidance, market insight, and negotiation power every step of the way.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://onsiteregroup.idxbroker.com/idx/map/mapsearch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
              >
                Search All Properties
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center border border-white/35 text-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </section>

        {/* Intro split */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Buy a Home</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                We make buying homes <span className="italic">easier.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[16px] leading-8 text-charcoal/70">
              <p>
                Your dream home is closer than you think. With our expert guidance and in-depth knowledge of the local market, we&apos;ll help you navigate the process and find the home that perfectly suits your needs.
              </p>
              <a
                href="https://onsiteregroup.idxbroker.com/idx/map/mapsearch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-2 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Search All Properties
              </a>
            </div>
          </div>
        </section>

        {/* Clear Path — advantages */}
        <section className="py-20 sm:py-28 bg-[#f2ede6]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">A Clear Path to Homeownership</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                  Navigate the market with <span className="italic">confidence.</span>
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Whether you&apos;re a first-time homebuyer or a seasoned investor, we streamline the process to help you navigate the complexities of the market. With our team by your side, you&apos;ll make informed decisions, find the right home faster, and secure the best deal possible.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {advantages.map((item) => (
                <div key={item.title} className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                  <Image
                    src={item.icon}
                    alt=""
                    width={46}
                    height={46}
                    className="w-11 h-11 object-contain mb-4 opacity-80"
                  />
                  <h3 className="font-serif text-xl text-charcoal mb-2">{item.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buying Journey — dark editorial */}
        <section className="py-20 sm:py-28 bg-[#1a1a18]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-5">Buying Journey</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08] mb-7">
                Buying made <span className="italic">simple.</span>
              </h2>
              <p className="text-[16px] leading-8 text-white/55 mb-8">
                From finding the perfect home to closing the deal, we streamline every step of the process — providing expert guidance and support to ensure your home purchase is seamless and successful.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white hover:text-charcoal transition-all duration-500"
              >
                Get Started Today
              </Link>
            </div>
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.07]">

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">32<span className="text-[2rem]">%</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">Faster Close</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Efficiency</p>
                  <p className="text-[14px] leading-7 text-white/45">Homes bought with an agent close 32% faster than those without — less time in limbo, more time in your new home.</p>
                </div>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">5<span className="text-[2rem]">%</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">Avg Savings</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Savings</p>
                  <p className="text-[14px] leading-7 text-white/45">Buyers save an average of 1–5% through skilled agent negotiations — that's tens of thousands on a typical purchase.</p>
                </div>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-6 py-10 group">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-[3.8rem] leading-none font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">30<span className="text-[2rem]">%</span></span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">More Options</span>
                </div>
                <div className="pt-2">
                  <p className="font-serif text-[1.4rem] font-light text-white/85 leading-snug mb-2">Exclusivity</p>
                  <p className="text-[14px] leading-7 text-white/45">30% more opportunities through exclusive off-market listings you won't find scrolling on your own.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">Featured Listings</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                  Featured Home <span className="italic">Listings.</span>
                </h2>
              </div>
              <a
                href="https://onsiteregroup.idxbroker.com/idx/map/mapsearch"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Search All
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredListings.map((listing) => (
                <div key={listing.title} className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
                  <Link href={listing.href} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-serif text-lg font-light text-white leading-snug mb-1">{listing.title}</p>
                        <p className="text-[13px] text-white/70 font-medium">{listing.price}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="bg-white px-5 pb-3">
                    <MLSCardAttribution />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe409428a57e5320586a0_1.jpg"
                alt="Ready to find your home"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/52" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-4">Ready to get started?</p>
                <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.05]">
                  Find Your <span className="italic">Perfect Home Today</span>
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://onsiteregroup.idxbroker.com/idx/map/mapsearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
                  >
                    Search Properties
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
                  >
                    Contact Us
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
