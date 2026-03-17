import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Success Stories | Real Estate Client Experiences | OnSite Real Estate Group",
  description:
    "Real stories with real success. See how OnSite Real Estate Group has helped buyers and sellers across East Pierce County achieve their goals.",
};

const CDN = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269";
const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

const testimonials = [
  {
    name: "Tandra S.",
    location: "Pierce County",
    review:
      "Andre was thorough & informed, & very kind. I was able to prep my place to sell quickly thanks to the wraparound support I received from the team. A very smooth and not-so-scary experience for me as a first time seller. Would buy/sell from him again.",
  },
  {
    name: "Nadeem S.",
    location: "Pierce County",
    review:
      "Andre and his team are incredible and I do not say that lightly. They helped our family purchase our first home in 2019. It sold WAY over asking. He then helped us buy our second home and got us a great find on a Lake. He's the best in the business. I've personally met and worked with hundreds of realtors and no one will take care of you quite like Andre and his team will.",
  },
  {
    name: "Leanna K.",
    location: "Pierce County",
    review:
      "Andre was so helpful to us when buying our first home. He welcomed us with open arms and made this process easy, especially considering the market. We felt like he really went to bat for us to get us the best possible deal. We will go to him again when we need to sell/buy a new home.",
  },
  {
    name: "Linda M.",
    location: "Pierce County",
    review:
      "Excellent service in selling my home. Andre's preparation in making the home ready for sale and staging it helped for selling. When challenges came up they were taken care of promptly. Thank you for a positive experience.",
  },
  {
    name: "Cindy W.",
    location: "Pierce County",
    review:
      "Andre understands the market, current trends & what is needed to sell a house. We received quick responses to our questions & they provided wonderful resources to help us, including an emergency handyman to repair a falling shelf. Will use them again.",
  },
  {
    name: "Arianna Y.",
    location: "Pierce County",
    review:
      "Andre is a fantastic realtor who knows his stuff. He made selling our home and buying our new home a breeze. He is very knowledgeable and helped us out every step of the way! 10/10 Would highly recommend him for your sell or purchase of a home.",
  },
];

const stats = [
  {
    num: "10+",
    label: "Years of Expertise",
    description: "A decade of market knowledge and trusted service, ensuring smooth and successful transactions.",
  },
  {
    num: "300+",
    label: "Homes Sold",
    description: "Hundreds of families and investors have trusted Onsite to help them buy and sell their homes.",
  },
  {
    num: "$100M",
    label: "in Sales",
    description: "Proven results with millions in closed deals, maximizing value for our clients every step of the way.",
  },
  {
    num: "100+",
    label: "Five-Star Reviews",
    description: "A reputation built on trust, excellence, and client satisfaction — backed by real Google reviews.",
  },
];

const soldPreviews = [
  {
    title: "Single-Story Home in Gem Heights, Puyallup",
    image: `${CDN2}/67e6a96b499447cc30f637df_1.jpg`,
    href: "/sold-homes/single-story-home-in-gem-heights-puyallup",
  },
  {
    title: "Modern Home in Sumner Valley",
    image: `${CDN2}/67e5f1f692b6e8f42f5bf2a0_1.jpg`,
    href: "/sold-homes/modern-home-in-sumner-valley",
  },
  {
    title: "Modern Home in Thriving Sumner Valley",
    image: `${CDN2}/67e6a5a683921a019c3e4f3b_1.jpg`,
    href: "/sold-homes/modern-home-in-thriving-sumner-valley",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={`${CDN}/67eac6e8fa81e2c2d72de275_HOME.webp`}
            alt="OnSite Real Estate Group success stories"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:pb-28 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/70">Success Stories</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.0] text-white">
              Expert Guidance.<br />Successful Stories.
            </h1>
            <p className="mb-10 max-w-xl text-[16px] leading-8 text-white/70">
              We help our clients achieve their real estate goals with successful outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
              >
                Let&apos;s Talk
              </Link>
              <Link
                href="/sell-your-home"
                className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
              >
                Sell Your Home
              </Link>
            </div>
          </div>
        </section>

        {/* Intro — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Success Stories</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Real Stories With Real Success.
              </h2>
            </div>
            <div className="lg:col-span-7 text-[16px] leading-8 text-charcoal/70">
              <p>
                Here are a few of the stories that showcase how our commitment, expertise, and passion have helped buyers and sellers achieve their goals.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-[0_14px_40px_rgba(0,0,0,0.07)]"
                >
                  {/* stars */}
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#1a1a18" className="opacity-70">
                        <path d="M7 1l1.545 3.13 3.455.503-2.5 2.435.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.633l3.455-.503L7 1z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mb-6 flex-1 text-[15px] leading-8 text-charcoal/75 not-italic">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  <div className="border-t border-charcoal/8 pt-5">
                    <p className="font-serif text-[1.05rem] font-light text-charcoal">{t.name}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.25em] text-charcoal/40">{t.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proven Track Record — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-16 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Track Record</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Our Proven Track Record.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-white/70">
                With over 10 years of experience, 300+ homes sold, $100 million in sales, and more than 100 five-star Google reviews — our results speak for themselves.
              </p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4 xl:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-4 px-0 py-10 sm:px-8 sm:first:pl-0 xl:last:pr-0">
                  <p className="font-serif text-[clamp(3rem,5vw,4.5rem)] font-light leading-none text-white">
                    {s.num}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{s.label}</p>
                  <p className="text-[14px] leading-7 text-white/75 not-italic">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sold Properties preview — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Sold Properties</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Over 300+ Sold Properties.
                </h2>
              </div>
              <Link
                href="/sold-homes"
                className="hidden sm:inline-flex items-center gap-3 rounded-full border border-charcoal/20 px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {soldPreviews.map((prop) => (
                <Link key={prop.title} href={prop.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                        Sold
                      </span>
                      <p className="font-serif text-lg font-light leading-snug text-white">{prop.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 sm:hidden">
              <Link
                href="/sold-homes"
                className="inline-flex items-center gap-3 rounded-full border border-charcoal/20 px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
              >
                View All
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
                src={`${CDN}/67eac6e8fa81e2c2d72de275_HOME.webp`}
                alt="Ready to start your success story"
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
