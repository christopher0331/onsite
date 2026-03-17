import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Real Estate Insights for Home Sellers | Pierce County Real Estate Advice",
  description:
    "Expert real estate insights for Pierce County homeowners — from home valuations and staging to agent strategy and timing. Everything you need to sell with confidence.",
};

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

type Post = { title: string; excerpt: string; slug: string; image: string; isNew: boolean };

const posts: Post[] = [
  {
    title: "Pierce County Septic Systems: What Homebuyers and Sellers Must Know in Today's Market",
    excerpt: "Septic systems are one of the most overlooked factors in a real estate transaction — and one of the most expensive to get wrong. Here's what every buyer and seller in Pierce County needs to know.",
    slug: "pierce-county-septic-systems-what-homebuyers-and-sellers-must-know-in-todays-market",
    image: `${CDN2}/69276010a017b9c15aeee4a8_pexels-hafidz-alifuddin-18111-88808.jpg`,
    isNew: true,
  },
  {
    title: "How Buyer Expectations Have Changed Since 2020",
    excerpt: "Today's buyers are more informed, more selective, and more demanding than ever before. Understanding how expectations have evolved helps sellers prepare their homes to compete.",
    slug: "how-buyer-expectations-have-changed-since-2020",
    image: `${CDN2}/688aad14aedd394c7f000843_1.jpg`,
    isNew: true,
  },
  {
    title: "What's Worth Upgrading Before You Sell (And What's Not)",
    excerpt: "Not every upgrade pays off. Some improvements deliver strong returns — others are money pits. Here's a strategic breakdown for Pierce County sellers.",
    slug: "whats-worth-upgrading-before-you-sell-and-whats-not",
    image: `${CDN2}/688aac1129bfc217e9127842_1.jpg`,
    isNew: true,
  },
  {
    title: "Why Professional Photography Still Sells Homes in 2025",
    excerpt: "In a world of AI-generated content, authentic professional photography continues to be one of the highest-ROI investments a seller can make. Here's why.",
    slug: "why-professional-photography-still-sells-homes-in-2025",
    image: `${CDN2}/688aaa7508fca618e9e799a5_1.jpg`,
    isNew: true,
  },
  {
    title: "How Listing Descriptions Influence Buyer Behavior",
    excerpt: "The words in your listing description shape how buyers perceive your home before they ever walk through the door. Learn what works — and what turns buyers off.",
    slug: "how-listing-descriptions-influence-buyer-behavior",
    image: `${CDN2}/688aa7f4c24322a6a6fdba4f_1212.jpg`,
    isNew: true,
  },
  {
    title: "How Much Is My Home Worth? 5 Factors That Affect Your Home's Value",
    excerpt: "When it comes to selling your home, one of the first things you need to know is what it's worth. In a competitive market like Pierce County, understanding these five factors is critical.",
    slug: "how-much-is-my-home-worth-5-factors-that-affect-your-homes-value",
    image: `${CDN2}/67ec45ae21ed6ebbeb9e20c5_1%5C.jpg`,
    isNew: false,
  },
  {
    title: "What's the Best Time of Year to Sell a Home in Pierce County?",
    excerpt: "Timing matters in real estate. If you're planning to sell your home in Pierce County, choosing the right time of year could help you attract more buyers and maximize your sale price.",
    slug: "whats-the-best-time-of-year-to-sell-a-home-in-pierce-county",
    image: `${CDN2}/67ed538e0cd8e9e4d813d006_1.jpg`,
    isNew: false,
  },
  {
    title: "How Long Does It Take to Sell a Home in Pierce County?",
    excerpt: "Every seller wants to know: how long will my home sit on the market? The answer depends on several factors — here's a realistic look at timelines in Pierce County.",
    slug: "how-long-does-it-take-to-sell-a-home-in-pierce-county",
    image: `${CDN2}/67edb8a85fbebf614dfe04e0_1.jpg`,
    isNew: false,
  },
  {
    title: "Is Staging Your Home Worth It? Here's What Sellers Should Know",
    excerpt: "Home staging can make a significant difference in how quickly your home sells and at what price. But is it always worth the investment? Here's an honest breakdown.",
    slug: "is-staging-your-home-worth-it-heres-what-sellers-should-know",
    image: `${CDN2}/67edbc002d0ae67cee18437e_1.jpg`,
    isNew: false,
  },
  {
    title: "What all is Included in a Free Home Evaluation?",
    excerpt: "A free home evaluation is more than just a number — it's a strategic consultation. Here's what you can expect and how to use the insights to your advantage.",
    slug: "whats-included-in-a-home-evaluation",
    image: `${CDN2}/67edbe23ec789166a66f0ceb_1.jpg`,
    isNew: false,
  },
  {
    title: "The Power of First Impressions in Real Estate",
    excerpt: "Buyers form opinions within seconds of arriving at a property. Curb appeal, entry, and the first room they see all carry enormous weight. Here's how to make every impression count.",
    slug: "the-power-of-first-impressions-in-real-estate",
    image: `${CDN2}/681e10d708e6dabd1d32e226_1.jpg`,
    isNew: false,
  },
  {
    title: "How the Right Agent Makes All the Difference When Selling",
    excerpt: "The agent you choose can be the difference between a fast, profitable sale and months of frustration. Here's what separates great agents from the rest in today's market.",
    slug: "how-the-right-agent-makes-all-the-difference-when-selling",
    image: `${CDN2}/681e15dbfbdd125c126a274d_1.jpg`,
    isNew: false,
  },
  {
    title: "Septic Pumping and County Inspection: What Sellers Need to Know",
    excerpt: "In Pierce County, septic inspections are a common part of the transaction process. Here's what sellers need to do before listing to avoid delays at closing.",
    slug: "septic-pumping-and-county-inspection-what-sellers-need-to-know",
    image: `${CDN2}/6824d2360cd3918b23d57277_1.jpg`,
    isNew: false,
  },
  {
    title: "Understanding Your Home's Market Value: What Affects It and Why It Matters",
    excerpt: "Market value isn't just square footage and location — it's a complex equation influenced by dozens of variables. Here's how to understand what your home is truly worth.",
    slug: "understanding-your-homes-market-value-what-affects-it-and-why-it-matters",
    image: `${CDN2}/6826888dc360e9461d1460e6_1.jpg`,
    isNew: false,
  },
  {
    title: "Top 5 Mistakes Sellers Make (And How to Avoid Them)",
    excerpt: "Even well-intentioned sellers make costly mistakes. These five missteps consistently derail transactions, reduce final sale prices, and extend time on market.",
    slug: "top-5-mistakes-sellers-make-and-how-to-avoid-them",
    image: `${CDN2}/68268af3f6c80ae7736abe37_1.jpg`,
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
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal/40">Insights</p>
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

export default function InsightsPage() {
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
                  News & Insights.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Expert perspective for Pierce County homeowners — from understanding your home&apos;s value to staging strategy, timing, and everything in between.
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
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/50">Insights</p>
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
                Seller Intelligence.
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
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Take the Next Step</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Know the Market.<br />Own the Outcome.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Information gives you confidence. Our team gives you results. When you&apos;re ready to sell in Pierce County, let&apos;s put a strategy together that gets you what your home is worth.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/free-home-evaluation" className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90">
                    Free Home Evaluation
                  </Link>
                  <Link href="/contact-us" className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10">
                    Talk to Our Team
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
