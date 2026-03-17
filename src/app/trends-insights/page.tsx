import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Pierce County Real Estate Blog | Tips, Market Trends & Local Insights",
  description:
    "Expert real estate insights, market trends, and selling tips for Pierce County homeowners — written by the OnSite Real Estate Group team.",
};

const insightsPosts = [
  {
    title: "Pierce County Septic Systems: What Homebuyers and Sellers Must Know in Today's Market",
    excerpt:
      "Septic systems are one of the most overlooked factors in a real estate transaction — and one of the most expensive to get wrong. Here's what every buyer and seller in Pierce County needs to know.",
    slug: "pierce-county-septic-systems-what-homebuyers-and-sellers-must-know-in-todays-market",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/69276010a017b9c15aeee4a8_pexels-hafidz-alifuddin-18111-88808.jpg",
    isNew: true,
  },
  {
    title: "How Much Is My Home Worth? 5 Factors That Affect Your Home's Value",
    excerpt:
      "When it comes to selling your home, one of the first things you need to know is what it's worth. In a competitive market like Pierce County, understanding these five factors is critical.",
    slug: "how-much-is-my-home-worth-5-factors-that-affect-your-homes-value",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ec45ae21ed6ebbeb9e20c5_1%5C.jpg",
    isNew: false,
  },
  {
    title: "What's the Best Time of Year to Sell a Home in Pierce County?",
    excerpt:
      "Timing matters in real estate. If you're planning to sell your home in Pierce County, choosing the right time of year could help you attract more buyers and maximize your sale price.",
    slug: "whats-the-best-time-of-year-to-sell-a-home-in-pierce-county",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ed538e0cd8e9e4d813d006_1.jpg",
    isNew: false,
  },
];

const marketTrendsPosts = [
  {
    title: "Pierce County Housing Market: What Stability Really Looks Like After the Frenzy",
    excerpt:
      "The frenzied market of 2021–2022 is behind us — but what does a stable Pierce County market actually look like for sellers today? We break down what the data is really saying.",
    slug: "pierce-county-housing-market-what-stability-really-looks-like-after-the-frenzy",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/698b9a6e51771cf4ac693163_ChatGPT%20Image%20Feb%2010%2C%202026%2C%2012_51_46%20PM.png",
    isNew: true,
  },
  {
    title: "Pierce County Housing Market: What Sellers Should Know in 2025",
    excerpt:
      "Thinking about selling your home in 2025? The Pierce County market is showing some important shifts — making it more critical than ever to list strategically and price correctly.",
    slug: "pierce-county-housing-market-what-sellers-should-know-in-2025",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ed56509e07b9dd67e74302_2.jpg",
    isNew: false,
  },
  {
    title: "Are Home Prices Rising or Falling in Pierce County in 2025?",
    excerpt:
      "If you're planning to sell or buy in 2025, one of your biggest questions is: what's happening with home prices? We break down the current data for Pierce County.",
    slug: "are-home-prices-rising-or-falling-in-pierce-county-in-2025",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ed751ddaa36de5a0e61b8d_1.jpg",
    isNew: false,
  },
];

const sellingTipsPosts = [
  {
    title: "What Home Inspectors Really Look For in Western Washington (Before You List)",
    excerpt:
      "Before you put your home on the market, knowing what a home inspector will flag can save you thousands. Here's what they actually focus on in Western Washington.",
    slug: "what-home-inspectors-really-look-for-in-western-washington-before-you-list",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/698b81074c1a8db00bf0ef53_ChatGPT%20Image%20Feb%2010%2C%202026%2C%2010_58_56%20AM.png",
    isNew: true,
  },
  {
    title: "Should You Sell Your Home Before You Buy a New One?",
    excerpt:
      "If you're planning to move, one of the biggest decisions you'll face is whether to sell your current home before buying the next. For Pierce County homeowners, here's how to think through it.",
    slug: "should-you-sell-your-home-before-you-buy-a-new-one",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ec3d04c02934af15c0d101_67eacb74491984e4a61650f6_success%20stories.jpg",
    isNew: false,
  },
  {
    title: "5 Simple Improvements That Can Help Your Home Sell Faster",
    excerpt:
      "Selling your home doesn't always mean spending big on renovations. A few affordable upgrades can make a major difference in how quickly your home sells and how much you get.",
    slug: "5-simple-improvements-that-can-help-your-home-sell-faster",
    image: "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67ed5b3e15edfb93fc91fc00_1.jpg",
    isNew: false,
  },
];

type Post = { title: string; excerpt: string; slug: string; image: string; isNew: boolean };

function ArticleGrid({ posts, viewAllHref }: { posts: Post[]; viewAllHref: string }) {
  const [featured, ...rest] = posts;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Featured — large */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-3xl shadow-[0_14px_50px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_28px_80px_rgba(0,0,0,0.2)] hover:-translate-y-1 lg:col-span-7 min-h-[420px]"
      >
        <div className="relative flex-1">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          {featured.isNew && (
            <span className="mb-4 inline-block w-fit rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal">
              New
            </span>
          )}
          <h3 className="mb-3 font-serif text-[1.55rem] font-light leading-snug text-white">
            {featured.title}
          </h3>
          <p className="mb-5 text-[13px] leading-6 text-white/70 not-italic line-clamp-2">{featured.excerpt}</p>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 group-hover:text-white">
            Read Article
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Secondary articles + View All */}
      <div className="flex flex-col gap-5 lg:col-span-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative flex overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 flex-1 min-h-[160px]"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center p-7">
              {post.isNew && (
                <span className="mb-3 inline-block w-fit rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80">
                  New
                </span>
              )}
              <h3 className="mb-2 font-serif text-[1.1rem] font-light leading-snug text-white">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-white">
                Read
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href={viewAllHref}
          className="flex items-center justify-center gap-2 rounded-3xl border border-dashed border-charcoal/20 py-5 text-[12px] uppercase tracking-[0.25em] text-charcoal/45 transition-all duration-300 hover:border-charcoal/40 hover:text-charcoal"
        >
          View All
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function DarkArticleGrid({ posts, viewAllHref }: { posts: Post[]; viewAllHref: string }) {
  const [featured, ...rest] = posts;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <Link
        href={`/blog/${featured.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-3xl shadow-[0_14px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 lg:col-span-7 min-h-[420px]"
      >
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          {featured.isNew && (
            <span className="mb-4 inline-block w-fit rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80">
              New
            </span>
          )}
          <h3 className="mb-3 font-serif text-[1.55rem] font-light leading-snug text-white">
            {featured.title}
          </h3>
          <p className="mb-5 text-[13px] leading-6 text-white/70 not-italic line-clamp-2">{featured.excerpt}</p>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-white">
            Read Article
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-5 lg:col-span-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative flex overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-0.5 flex-1 min-h-[160px]"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center p-7">
              {post.isNew && (
                <span className="mb-3 inline-block w-fit rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80">
                  New
                </span>
              )}
              <h3 className="mb-2 font-serif text-[1.1rem] font-light leading-snug text-white">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-white">
                Read
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href={viewAllHref}
          className="flex items-center justify-center gap-2 rounded-3xl border border-dashed border-white/20 py-5 text-[12px] uppercase tracking-[0.25em] text-white/40 transition-all duration-300 hover:border-white/40 hover:text-white"
        >
          View All
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function TrendsInsightsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">News & Insights</p>
            <h1 className="mb-8 max-w-4xl font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
              Insights, Trends &amp;<br />Selling Tips.
            </h1>
            <p className="max-w-xl text-[16px] leading-8 text-white/70">
              Local expertise, market data, and actionable guidance for Pierce County buyers and sellers.
            </p>
          </div>
        </section>

        {/* Insights — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-12">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Insights</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Local Knowledge &amp; Expertise.
              </h2>
            </div>
            <ArticleGrid posts={insightsPosts} viewAllHref="/insights" />
          </div>
        </section>

        {/* Market Trends — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-12">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Market Trends</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                What the Market Is Doing.
              </h2>
            </div>
            <ArticleGrid posts={marketTrendsPosts} viewAllHref="/market-trends" />
          </div>
        </section>

        {/* Selling Tips — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-12">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Selling Tips</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                Sell Smarter, Not Harder.
              </h2>
            </div>
            <DarkArticleGrid posts={sellingTipsPosts} viewAllHref="/selling-tips" />
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA */}
        <section className="bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] bg-[#1a1a18] p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Talk Home Selling Solutions.
                </h2>
              </div>
              <div className="flex flex-col gap-8 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Expert negotiation. Maximum value. Our team is ready to help you sell your home and achieve your real estate goals.
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
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
