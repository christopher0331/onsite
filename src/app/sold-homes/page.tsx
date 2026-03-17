import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Recently Sold Homes | OnSite Real Estate Group",
  description:
    "Browse recently sold homes by OnSite Real Estate Group across Pierce County, Federal Way, Sumner, Graham, Buckley, and Puyallup, WA.",
};

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

const properties = [
  {
    slug: "luxury-mid-century-modern-in-marine-hills",
    title: "Luxury Mid-Century Modern in Marine Hills",
    address: "29011 7th Place S",
    city: "Federal Way, WA 98003",
    price: "$1,625,000",
    closedOn: "Jan 31, 2025",
    daysListed: 10,
    mls: "2318108",
    highlights: [
      "Single Story w/ Daylight Basement",
      "Breathtaking Sound Views",
      "Viking Appliances",
      "Two Full Kitchens & Laundry Rooms",
      "Private Greenbelt Setting",
    ],
    image: `${CDN2}/67da2921089c1860cb91ba0a_home%20for%20sale.jpg`,
    featured: true,
  },
  {
    slug: "secluded-5-acre-dual-residence-in-graham",
    title: "Secluded 5-Acre Dual Residence in Graham",
    address: "24508 128th Avenue E",
    city: "Graham, WA 98338",
    price: "$1,025,000",
    closedOn: "Dec 5, 2024",
    daysListed: 117,
    mls: "2257145",
    highlights: [
      "Private Gated Property",
      "Main Home 2,584 sq ft + Guest Cabin 1,476 sq ft",
      "5-Car Attached Pull-Through Garage/Shop",
      "Fruit Trees & Wildlife Views",
    ],
    image: `${CDN2}/67db23e057c6f0784b1f07c9_1.jpg`,
    featured: false,
  },
  {
    slug: "secluded-rambler-on-1-7-acres-in-buckley",
    title: "Secluded Rambler on 1.7 Acres in Buckley",
    address: "1186 Spiketon Road",
    city: "Buckley, WA 98321",
    price: "$775,000",
    closedOn: "Dec 27, 2024",
    daysListed: 6,
    mls: "2313590",
    highlights: [
      "Private Yet Within City Limits",
      "Detached Garage & Large Heated Shop",
      "RV Parking",
      "Heated Floors — Primary Bath, Kitchen & Mudroom",
    ],
    image: `${CDN2}/67db1b78810920b05fe55d61_1.jpg`,
    featured: false,
  },
  {
    slug: "modern-home-in-thriving-sumner-valley",
    title: "Modern Home in Thriving Sumner Valley",
    address: "5786 159th Avenue Court E",
    city: "Sumner, WA 98390",
    price: "$750,000",
    closedOn: "Nov 1, 2024",
    daysListed: 6,
    mls: "2287145",
    highlights: [
      "Built 2020 — Modern Corner-Lot",
      "Walk to Fred Meyer, YMCA & Parks",
      "Covered Patio & Sprinkler System",
      "Bonney Lake-Sumner School District",
    ],
    image: `${CDN2}/67e6a5a683921a019c3e4f3b_1.jpg`,
    featured: false,
  },
  {
    slug: "modern-home-in-sumner-valley",
    title: "Modern Home in Sumner Valley",
    address: "15615 Washington Street",
    city: "Sumner, WA 98390",
    price: "$710,000",
    closedOn: "Nov 1, 2024",
    daysListed: 4,
    mls: "2295262",
    highlights: [
      "Built 2020 — Modern Corner-Lot",
      "Modern Kitchen with All Appliances",
      "Recently Repainted with Upgraded Finishes",
      "Eco-Friendly Water Heater",
    ],
    image: `${CDN2}/67e5f1f692b6e8f42f5bf2a0_1.jpg`,
    featured: false,
  },
  {
    slug: "single-story-home-in-gem-heights-puyallup",
    title: "Single-Story Home in Gem Heights, Puyallup",
    address: "16516 87th Avenue E",
    city: "Puyallup, WA 98375",
    price: "$591,000",
    closedOn: "Oct 28, 2024",
    daysListed: 7,
    mls: "2298137",
    highlights: [
      "Gem Heights — Highly Sought-After Neighborhood",
      "Clubhouse, Pool, Tennis & Pickleball Courts",
      "Basketball & Volleyball Courts",
      "Well-Maintained Community",
    ],
    image: `${CDN2}/67e6a96b499447cc30f637df_1.jpg`,
    featured: false,
  },
];

export default function SoldHomesPage() {
  const [featured, ...rest] = properties;

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-20 sm:pt-52 sm:pb-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Sold Properties</p>
            <h1 className="mb-8 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
              Recently<br />Sold Properties.
            </h1>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <div>
                <p className="font-serif text-[2.5rem] font-light leading-none text-white">300+</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/50">Homes Sold</p>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" />
              <div>
                <p className="font-serif text-[2.5rem] font-light leading-none text-white">$100M+</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/50">in Sales</p>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" />
              <div>
                <p className="font-serif text-[2.5rem] font-light leading-none text-white">10+</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/50">Years of Expertise</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured + grid — white */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Featured property — full width */}
            <Link
              href={`/sold-homes/${featured.slug}`}
              className="group mb-5 block overflow-hidden rounded-3xl shadow-[0_22px_80px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-charcoal shadow-lg">
                    Sold
                  </span>
                </div>
                {/* Info */}
                <div className="flex flex-col justify-center bg-[#1a1a18] p-10 lg:p-14">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/50">{featured.city}</p>
                  <h2 className="mb-2 font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-snug text-white">
                    {featured.title}
                  </h2>
                  <p className="mb-6 text-[14px] text-white/50">{featured.address}</p>

                  <div className="mb-8 flex flex-wrap gap-6">
                    <div>
                      <p className="font-serif text-[2rem] font-light leading-none text-white">{featured.price}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">Sale Price</p>
                    </div>
                    <div>
                      <p className="font-serif text-[2rem] font-light leading-none text-white">{featured.daysListed}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">Days Listed</p>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-2.5">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] leading-5 text-white/70">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-white">
                    View Property
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Remaining 5 properties grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {rest.map((prop) => (
                <Link
                  key={prop.slug}
                  href={`/sold-homes/${prop.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal shadow">
                      Sold
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-charcoal/40">{prop.city}</p>
                      <h3 className="mb-4 font-serif text-[1.15rem] font-light leading-snug text-charcoal group-hover:text-charcoal/75 transition-colors duration-300">
                        {prop.title}
                      </h3>
                      <ul className="mb-5 space-y-1.5">
                        {prop.highlights.slice(0, 2).map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[12px] leading-5 text-charcoal/55">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-charcoal/30" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between border-t border-charcoal/8 pt-4">
                      <div>
                        <p className="font-serif text-[1.4rem] font-light leading-none text-charcoal">{prop.price}</p>
                        <p className="mt-0.5 text-[11px] text-charcoal/40">{prop.daysListed} days listed · Closed {prop.closedOn}</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/40 transition-all duration-300 group-hover:border-charcoal group-hover:text-charcoal">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready to Sell?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Your Home Could Be<br />Next on This List.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  With 300+ homes sold and $100M+ in closed deals, our team knows how to maximize your home&apos;s value and get it sold fast.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/free-home-evaluation"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Free Home Evaluation
                  </Link>
                  <Link
                    href="/sell-your-home"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
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
