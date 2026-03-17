import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Pierce County Housing Market Trends | 2025–2026 Real Estate Updates",
  description:
    "Stay up to date on Pierce County's housing market. Get expert insights on home prices, mortgage rates, buyer demand, and what sellers need to know right now.",
};

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

type Post = { title: string; excerpt: string; slug: string; image: string; isNew: boolean };

const posts: Post[] = [
  {
    title: "Pierce County Housing Market: What Stability Really Looks Like After the Frenzy",
    excerpt: "The frenzied market of 2021–2022 is behind us — but what does a stable Pierce County market actually look like for sellers today? We break down what the data is really saying.",
    slug: "pierce-county-housing-market-what-stability-really-looks-like-after-the-frenzy",
    image: `${CDN2}/698b9a6e51771cf4ac693163_ChatGPT%20Image%20Feb%2010%2C%202026%2C%2012_51_46%20PM.png`,
    isNew: true,
  },
  {
    title: "Pierce County Homeowners: Don't Get Stuck by Incomplete Real Estate Info",
    excerpt: "Outdated or incomplete information can cost sellers thousands. Here's what Pierce County homeowners need to know before making any decisions about their property.",
    slug: "pierce-county-homeowners-dont-get-stuck",
    image: `${CDN2}/697960ca488d6d041ad954b8_18-Andre_Bohall1003.jpg`,
    isNew: true,
  },
  {
    title: "2026 Pierce County Housing Market Update: What Buyers and Sellers in Bonney Lake, Lake Tapps, and Sumner Should Expect",
    excerpt: "A comprehensive look at where the Pierce County market is headed in 2026 — what's driving demand, how prices are holding, and what it means for buyers and sellers in the area.",
    slug: "2026-pierce-county-housing-market-update-what-buyers-and-sellers-in-bonney-lake-lake-tapps-and-sumner-should-expect",
    image: `${CDN2}/6968244f093bbf91ef2af90b_Pierce%20County%20Pic%20(1).jpg`,
    isNew: true,
  },
  {
    title: "5.99% Mortgage Rate in Pierce County: Why Your Monthly Payment Might Not Drop",
    excerpt: "A rate drop sounds like good news — but taxes, insurance, and other costs mean your monthly payment may not change as much as you'd expect. Here's the real math.",
    slug: "5-99-mortgage-rate-in-pierce-county-why-your-monthly-payment-might-not-drop-taxes-insurance-math",
    image: `${CDN2}/696534f0118a1f7e3ed7e322_pexels-energepic-com-27411-159888.jpg`,
    isNew: true,
  },
  {
    title: "Pierce County Housing Market: What Sellers Should Know in 2025",
    excerpt: "Thinking about selling your home in 2025? The Pierce County market is showing some important shifts — making it more critical than ever to list strategically and price correctly.",
    slug: "pierce-county-housing-market-what-sellers-should-know-in-2025",
    image: `${CDN2}/67ed56509e07b9dd67e74302_2.jpg`,
    isNew: false,
  },
  {
    title: "Are Home Prices Rising or Falling in Pierce County in 2025?",
    excerpt: "If you're planning to sell or buy in 2025, one of your biggest questions is: what's happening with home prices? We break down the current data for Pierce County.",
    slug: "are-home-prices-rising-or-falling-in-pierce-county-in-2025",
    image: `${CDN2}/67ed751ddaa36de5a0e61b8d_1.jpg`,
    isNew: false,
  },
  {
    title: "Will Interest Rates Impact Home Sales in Pierce County This Year?",
    excerpt: "Interest rates have been top of mind for buyers and sellers alike. Here's how current rate trends are playing out in Pierce County's real estate market.",
    slug: "will-interest-rates-impact-home-sales-in-pierce-county-this-year",
    image: `${CDN2}/67eeb6a2d8fcd8a0a5cd220d_1.jpg`,
    isNew: false,
  },
  {
    title: "Are Homes Still Selling Over Asking Price in Pierce County?",
    excerpt: "The over-asking bidding wars of 2021 may be behind us, but competitive offers are still happening in the right conditions. Here's what the data shows for Pierce County today.",
    slug: "are-homes-still-selling-over-asking-price-in-pierce-county",
    image: `${CDN2}/67eeb85a7c06c82c3b7d1e52_1.jpg`,
    isNew: false,
  },
  {
    title: "Is It a Buyer's or Seller's Market in Pierce County Right Now?",
    excerpt: "Depending on price range and location, the answer might surprise you. We break down the current inventory levels and what they mean for buyers and sellers.",
    slug: "is-it-a-buyers-or-sellers-market-in-pierce-county-right-now",
    image: `${CDN2}/67eebaf871f652dc1c2de360_1.jpg`,
    isNew: false,
  },
  {
    title: "Will Home Prices Drop in Washington in 2025?",
    excerpt: "With national headlines painting a mixed picture, Washington homeowners want answers. Here's what the local data says about price direction in Pierce County.",
    slug: "will-home-prices-drop-in-washington-in-2025",
    image: `${CDN2}/682e4064a5069db8f4955562_1.jpg`,
    isNew: false,
  },
  {
    title: "How Interest Rates Are Affecting Home Sales in 2025",
    excerpt: "From buyer qualification to seller strategy, rising rates have reshaped how real estate transactions work. Here's what sellers and buyers in Pierce County need to understand.",
    slug: "how-interest-rates-are-affecting-home-sales-in-2025",
    image: `${CDN2}/682f4731b4438620dbcc51f3_1.jpg`,
    isNew: false,
  },
  {
    title: "Is the Housing Market Headed for a Crash in 2025?",
    excerpt: "Headlines can be alarming — but the data tells a different story. Here's what Pierce County homeowners need to know about market stability heading into 2025.",
    slug: "is-the-housing-market-headed-for-a-crash-in-2025",
    image: `${CDN2}/684dbdc35fe85b113c2e3928_2.jpg`,
    isNew: false,
  },
];

export default function MarketTrendsPage() {
  const [featured, ...rest] = posts;
  const newPosts = posts.filter((p) => p.isNew);
  const olderPosts = posts.filter((p) => !p.isNew);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Trends & Insights</p>
                <h1 className="mb-8 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
                  Market Trends.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Stay ahead of the Pierce County housing market with expert analysis on prices, rates, inventory, and what it all means for buyers and sellers right now.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 text-[13px] text-white/50">
                <p><span className="text-white">{posts.length}</span> articles</p>
                <p><span className="text-white">{newPosts.length}</span> new this season</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured article */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Featured</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative flex min-h-[520px] overflow-hidden rounded-3xl shadow-[0_14px_50px_rgba(0,0,0,0.14)] transition-all duration-500 hover:shadow-[0_28px_80px_rgba(0,0,0,0.22)] hover:-translate-y-1"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative z-10 mt-auto p-10 lg:max-w-3xl">
                {featured.isNew && (
                  <span className="mb-5 inline-block rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-charcoal">New</span>
                )}
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/50">Market Trends</p>
                <h2 className="mb-4 font-serif text-[clamp(1.6rem,3.5vw,3rem)] font-light leading-snug text-white">
                  {featured.title}
                </h2>
                <p className="mb-6 text-[15px] leading-7 text-white/70 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  Read Article
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* New articles — linen */}
        {newPosts.length > 1 && (
          <section className="bg-[#f2ede6] py-20 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <p className="mb-10 text-[11px] uppercase tracking-[0.35em] text-mid-gray">New This Season</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {newPosts.slice(1).map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All articles — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">All Articles</p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  Pierce County Market Coverage.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {olderPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
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
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Know Your Market</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Ready to Make<br />Your Move?
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Understanding the market is just the first step. When you&apos;re ready to sell or buy in Pierce County, our team brings the strategy and expertise to get you the best result.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/free-home-evaluation" className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90">
                    Free Home Evaluation
                  </Link>
                  <Link href="/sell-your-home" className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10">
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

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {post.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal shadow-sm">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal/40">Market Trends</p>
          <h3 className="font-serif text-[1.05rem] font-light leading-snug text-charcoal line-clamp-3">{post.title}</h3>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-charcoal/8 pt-4 text-[11px] uppercase tracking-[0.2em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
          Read Article
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
