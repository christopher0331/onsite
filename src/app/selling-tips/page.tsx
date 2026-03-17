import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Home Selling Tips & Advice | Pierce County Real Estate Guidance",
  description:
    "Practical, expert-backed advice for Pierce County home sellers. From pricing and prep to inspections and closing — get the guidance you need to sell with confidence.",
};

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

type Post = { title: string; excerpt: string; slug: string; image: string; isNew: boolean };

const posts: Post[] = [
  {
    title: "What Home Inspectors Really Look For in Western Washington (Before You List)",
    excerpt: "Before you put your home on the market, knowing what a home inspector will flag can save you thousands. Here's what they actually focus on in Western Washington.",
    slug: "what-home-inspectors-really-look-for-in-western-washington-before-you-list",
    image: `${CDN2}/698b81074c1a8db00bf0ef53_ChatGPT%20Image%20Feb%2010%2C%202026%2C%2010_58_56%20AM.png`,
    isNew: true,
  },
  {
    title: "Prep Your Pierce County Home for a Successful Sale: Local Insights and Actionable Tips",
    excerpt: "Local market knowledge meets practical preparation advice. Here's exactly how to get your Pierce County home ready to attract buyers and maximize your sale price.",
    slug: "prep-your-pierce-county-home-for-a-successful-sale",
    image: `${CDN2}/69729b9c707b3f1527b84124_unsplash_main_compressed.jpg`,
    isNew: true,
  },
  {
    title: "How You Get The Most Money When Selling Your Home",
    excerpt: "Maximizing your sale price isn't just about luck — it's about strategy, timing, and presentation. Here's the approach that consistently gets sellers top dollar.",
    slug: "how-you-get-the-most-money-when-selling-your-home",
    image: `${CDN2}/68f29e6d3bc5c87cfbac68eb_Gemini_Generated_Image_8u8ix18u8ix18u8i.png`,
    isNew: true,
  },
  {
    title: "Should You Sell Your Home As-Is or Make Repairs First?",
    excerpt: "It's one of the most common questions sellers ask. The answer depends on your timeline, budget, and the current market conditions in Pierce County.",
    slug: "should-you-sell-your-home-as-is-or-make-repairs-first-2",
    image: `${CDN2}/68c9944b662f7c0cb20f4cc3_1.jpg`,
    isNew: true,
  },
  {
    title: "How to Attract More Buyers With Virtual Tours and Online Marketing",
    excerpt: "In today's market, your home's online presence is its first showing. Here's how to use virtual tours and digital marketing to put your listing in front of more buyers.",
    slug: "how-to-attract-more-buyers-with-virtual-tours-and-online-marketing",
    image: `${CDN2}/68c992d28c8c859baa98fbfc_1.jpg`,
    isNew: true,
  },
  {
    title: "Should You Sell Your Home Before You Buy a New One?",
    excerpt: "If you're planning to move, one of the biggest decisions you'll face is whether to sell your current home before buying the next. For Pierce County homeowners, here's how to think through it.",
    slug: "should-you-sell-your-home-before-you-buy-a-new-one",
    image: `${CDN2}/67ec3d04c02934af15c0d101_67eacb74491984e4a61650f6_success%20stories.jpg`,
    isNew: false,
  },
  {
    title: "5 Simple Improvements That Can Help Your Home Sell Faster",
    excerpt: "Selling your home doesn't always mean spending big on renovations. A few affordable upgrades can make a major difference in how quickly your home sells and how much you get.",
    slug: "5-simple-improvements-that-can-help-your-home-sell-faster",
    image: `${CDN2}/67ed5b3e15edfb93fc91fc00_1.jpg`,
    isNew: false,
  },
  {
    title: "Should You Sell Your Home As-Is or Make Repairs First?",
    excerpt: "Weighing the cost of repairs against what buyers will pay is one of the most important decisions a seller makes. Here's a framework for making the right call.",
    slug: "should-you-sell-your-home-as-is-or-make-repairs-first",
    image: `${CDN2}/67eebdb2a68b3a0991575e2c_1.jpg`,
    isNew: false,
  },
  {
    title: "How to Price Your Home to Sell in Today's Market",
    excerpt: "Pricing is everything. Too high and your home sits. Too low and you leave money on the table. Here's how to find the number that attracts offers and maximizes your return.",
    slug: "how-to-price-your-home-to-sell-in-todays-market",
    image: `${CDN2}/67eebf47863c395d27b6f096_1.jpg`,
    isNew: false,
  },
  {
    title: "How to Prepare Your Home for a Faster, More Profitable Sale",
    excerpt: "From decluttering to deep cleaning to minor repairs, the right prep work can dramatically reduce days on market and improve your final sale price.",
    slug: "how-to-prepare-your-home-for-a-faster-more-profitable-sale",
    image: `${CDN2}/67eec0afe4f179dad08054b0_1.jpg`,
    isNew: false,
  },
  {
    title: "The Powerful Tool Every Landlord Should Know About",
    excerpt: "If you own investment property in Pierce County, there's a strategy most landlords don't know about that can significantly impact your sale outcome.",
    slug: "the-powerful-tool-every-landlord-should-know-about",
    image: `${CDN2}/6824d8ec7673e09afbe56228_1.jpg`,
    isNew: false,
  },
  {
    title: "The Ultimate Pre-Sale Home Prep Checklist",
    excerpt: "A comprehensive, room-by-room checklist to get your home show-ready. Use this guide to make sure nothing is overlooked before your first showing.",
    slug: "the-ultimate-pre-sale-home-prep-checklist",
    image: `${CDN2}/68269039b09fa529fe781ad7_1.jpg`,
    isNew: false,
  },
  {
    title: "HOA Document Requirements: What Sellers Need to Know",
    excerpt: "Selling in a community with an HOA? There are specific documents you're required to disclose — and missing them can delay or kill your closing.",
    slug: "hoa-document-requirements-what-sellers-need-to-know",
    image: `${CDN2}/682692566155098e418322d8_1.jpg`,
    isNew: false,
  },
  {
    title: "Should I Sell My House As-Is or Make Repairs?",
    excerpt: "There's no one-size-fits-all answer. Learn how to evaluate your specific situation and make the decision that protects your bottom line.",
    slug: "should-i-sell-my-house-as-is-or-make-repairs",
    image: `${CDN2}/682e3cb12ef5680c98456bd4_1.jpg`,
    isNew: false,
  },
  {
    title: "Do I Need to Disclose Everything When Selling My Home?",
    excerpt: "Washington State disclosure requirements can be confusing. Here's what sellers are legally required to disclose — and why transparency actually protects you.",
    slug: "do-i-need-to-disclose-everything-when-selling-my-home",
    image: `${CDN2}/682e3ec377324444342f651b_1.jpg`,
    isNew: false,
  },
];

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
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal/40">Selling Tips</p>
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

export default function SellingTipsPage() {
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
                  Selling Tips.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Practical, expert-backed advice to help Pierce County homeowners sell faster, smarter, and for more money. From prep to closing, we cover it all.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 text-[13px] text-white/50">
                <p><span className="text-white">{posts.length}</span> articles</p>
                <p><span className="text-white">{newPosts.length}</span> new this season</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
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
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/50">Selling Tips</p>
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

        {/* New — linen */}
        {newPosts.length > 1 && (
          <section className="bg-[#f2ede6] py-20 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <p className="mb-10 text-[11px] uppercase tracking-[0.35em] text-mid-gray">New This Season</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {newPosts.slice(1).map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All articles */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">All Articles</p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                Seller Strategy & Guidance.
              </h2>
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
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready to Sell?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Put Your<br />Home on the Market.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Knowledge is power — but results come from execution. When you&apos;re ready, our team will bring the strategy, marketing, and negotiation skills to get you top dollar.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/sell-your-home" className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90">
                    Sell Your Home
                  </Link>
                  <Link href="/free-home-evaluation" className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10">
                    Free Evaluation
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
