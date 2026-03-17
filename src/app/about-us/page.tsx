import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "About Onsite Real Estate Agents | Local Expertise, Proven Results",
  description:
    "Meet André and Cindie Bohall of OnSite Real Estate Group — delivering tailored real estate solutions with local expertise across Pierce County.",
};

const values = [
  {
    title: "Local Expertise",
    description:
      "With over 10 years in business, 300+ properties sold, and $100M+ in sales, we bring local market knowledge to help you make informed decisions with confidence.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d624c7a5537ecc3f1c598f_Local%20Market.png",
  },
  {
    title: "High-Impact Marketing",
    description:
      "We maximize your home's visibility with professional photography, digital campaigns, and targeted outreach to the right audience.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d62440ae483e2d92b6f261_Value.png",
  },
  {
    title: "Powerful Negotiation",
    description:
      "Our skilled negotiators leverage data-driven strategies to secure the best price and terms while protecting your interests.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d6269c178881123c58b4ee_Buyer.png",
  },
  {
    title: "Seamless Selling",
    description:
      "From listing to closing, we manage every step with precision, ensuring a smooth, stress-free process from start to finish.",
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d97779741011739ef22761_Costs.png",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[58vh] min-h-[460px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67bbb6534d332fe104fc09fb_modern-house-with-designed-driveway-at-sunset-2025-02-10-06-40-21-utc.jpg"
            alt="OnSite Real Estate Group"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/52" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex items-end pb-16 sm:pb-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-4">About OnSite</p>
              <h1 className="font-serif text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.02] text-white font-light max-w-4xl">
                Partners in Real Estate.
                <br />
                <span className="italic">Delivering Tailored Solutions.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* André Bohall */}
        <section className="py-20 sm:py-28 bg-warm-gray">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.16)]">
                <Image
                  src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff6b4b276a0e00c3a04ef_thumbnail_20241213_132625.jpg"
                  alt="André Bohall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Founder</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light text-charcoal leading-[1.08] mb-7">
                André Bohall
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-charcoal/75">
                <p>
                  With over a decade of experience and hundreds of successful home sales, André Bohall brings deep expertise, tireless dedication, and a personal touch to every real estate journey. As the founder of OnSite Real Estate Group, André leads with service and strategy — combining strong market knowledge with sharp negotiating skills and genuine care for his clients' needs.
                </p>
                <p>
                  André is a natural when it comes to sales. His background includes years of high-volume outbound prospecting, phone sales, and client conversion — skills that now translate into powerful results for his buyers and sellers. He understands how to create opportunities where others see roadblocks, and his team is known for going above and beyond to generate business through grit, consistency, and intentional action.
                </p>
                <p>
                  Whether guiding first-time sellers, upsizing families, or downsizing retirees, André is known for his clear communication, no-pressure guidance, and ability to simplify even the most complex transactions. His clients trust him not just for his results — but for his integrity and straight answers. Highly technical, detail-oriented, and hands-on, André thrives in high-stakes situations and always keeps the end goal in sight: a smooth transaction and a win for his client.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:253-441-9764"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-6 py-3 text-[13px] rounded-full hover:bg-charcoal hover:text-white transition-all duration-400"
                >
                  (253) 441-9764
                </a>
                <a
                  href="mailto:andre@onsiteregroup.com"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-6 py-3 text-[13px] rounded-full hover:bg-charcoal hover:text-white transition-all duration-400"
                >
                  andre@onsiteregroup.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cindie Bohall */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 lg:col-start-1 lg:pt-4 order-2 lg:order-1">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Agent & Advisor</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light text-charcoal leading-[1.08] mb-7">
                Cindie Bohall
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-charcoal/75">
                <p>
                  For over 20 years, Cindie Bohall has been a trusted guide for families navigating complex decisions. As the founder of a successful senior housing referral company since 2013, she has helped hundreds of families find safe, supportive environments for their loved ones.
                </p>
                <p>
                  Today, Cindie brings that same compassion, attention to detail, and advocacy to her work at OnSite Real Estate Group. Whether helping a family transition from their longtime home or supporting first-time buyers, she understands the emotional weight behind every move. Her clients love her calm, confident approach and her ability to make the complex feel manageable.
                </p>
                <p>
                  Cindie's passion lies in building trust and helping people feel cared for — especially during life's major transitions. Her background in senior care gives her unique insight when working with older adults, retirees, or families coordinating multi-generational moves.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:253-799-0609"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-6 py-3 text-[13px] rounded-full hover:bg-charcoal hover:text-white transition-all duration-400"
                >
                  (253) 799-0609
                </a>
                <a
                  href="mailto:cindie@onsiteregroup.com"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-6 py-3 text-[13px] rounded-full hover:bg-charcoal hover:text-white transition-all duration-400"
                >
                  cindie@onsiteregroup.com
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.16)]">
                <Image
                  src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff7c928cd6f5d561b2667_thumbnail_20241213_110755.jpg"
                  alt="Cindie Bohall"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Together section */}
        <section className="py-20 sm:py-28 bg-warm-gray">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.16)]">
                <Image
                  src="/cindieandandre.png"
                  alt="André and Cindie Bohall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Together</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-light text-charcoal leading-[1.08] mb-7">
                Rooted in the Northwest,
                <br />
                Built on Family,{" "}
                <span className="italic">Fueled by Service.</span>
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-charcoal/75">
                <p>
                  André and Cindie Bohall are a husband-and-wife team with a passion for people and a heart for home. Both born and raised in the Pacific Northwest, their paths came together at the end of 2020, bringing together a beautifully blended family of five energetic kids.
                </p>
                <p>
                  With deep roots in real estate and senior housing, they understand firsthand how emotional and complex buying or selling a home can be. Their unique backgrounds — André's technical and negotiation expertise, paired with Cindie's compassionate, service-driven care — create a powerful team built to support families through every season of life.
                </p>
                <p>
                  When they're not showing homes or making calls, you'll find them on the sidelines cheering at a game, organizing a family outing, or sharing a laugh at the dinner table. Together, they believe in working hard, loving well, and helping others move forward with confidence.
                </p>
              </div>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 mt-10 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
              <div className="lg:col-span-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">About Us</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] text-charcoal font-light leading-[1.08]">
                  Experience You Can <span className="italic">Trust</span>
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[16px] leading-8 text-charcoal/70">
                  Buying or selling a home should be an exciting and rewarding experience. With our expert team, cutting-edge technology, and in-depth market knowledge, we help clients navigate the real estate journey with confidence — whether you're a first-time buyer, a seasoned investor, or looking to sell for top dollar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-3xl border border-charcoal/[0.07] bg-warm-gray/45 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
                >
                  <Image
                    src={value.icon}
                    alt=""
                    width={46}
                    height={46}
                    className="w-11 h-11 object-contain mb-4 opacity-80"
                  />
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-3">{value.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Approach / Commitment */}
        <section className="py-20 sm:py-28 bg-warm-gray">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="text-center mb-14">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">How We Work</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] text-charcoal font-light">
                Mission, Approach &<span className="italic"> Commitment</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Mission",
                  text: "Our mission is to provide expert guidance, unparalleled service, and data-driven strategies to help you make the best real estate decisions. We are committed to delivering results that exceed expectations, ensuring that every transaction is handled with integrity and care.",
                },
                {
                  title: "Approach",
                  text: "We believe in a client-first approach, ensuring every decision aligns with your best interests. Our market expertise keeps you ahead, leveraging data-driven insights to maximize opportunities and valuing clear and honest communication, fostering trust through transparency at every step.",
                },
                {
                  title: "Commitment",
                  text: "Dedicated to making your real estate journey a success from the first conversation to closing day, we provide expert advice, honest communication, and unwavering support to help you achieve your real estate goals.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="font-serif text-3xl font-light text-charcoal mb-4">{item.title}</h3>
                  <p className="text-[15px] leading-8 text-charcoal/70">{item.text}</p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 mt-6 text-[12px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors"
                  >
                    Let&apos;s Talk
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg"
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
