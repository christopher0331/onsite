import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import blogData from "@/lib/blog-data.json";

export const metadata: Metadata = {
  title: "Blog | Real Estate Tips, Market Trends & Insights | OnSite Real Estate Group",
  description:
    "Expert real estate articles for Pierce County homeowners — market trends, selling tips, and local insights from OnSite Real Estate Group.",
};

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  catSlug: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  body: string;
};

const allPosts = Object.values(blogData as Record<string, BlogPost>);
const featured = allPosts[0];
const rest = allPosts.slice(1);

const categories = [
  { label: "All", href: "/blog" },
  { label: "Market Trends", href: "/market-trends" },
  { label: "Selling Tips", href: "/selling-tips" },
  { label: "Insights", href: "/insights" },
];

export default function BlogIndexPage() {
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
                  The Blog.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  Market trends, selling advice, and real estate insights for Pierce County homeowners — written by the OnSite team.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 text-[13px] text-white/50">
                <p><span className="text-white">{allPosts.length}</span> articles</p>
              </div>
            </div>
            {/* Category filters */}
            <div className="mt-12 flex flex-wrap gap-3">
              {categories.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    c.label === "All"
                      ? "border-white bg-white text-charcoal"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
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
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative z-10 mt-auto p-10 lg:max-w-3xl">
                <span className="mb-5 inline-block rounded-full border border-white/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/70">
                  {featured.category}
                </span>
                <h2 className="mb-4 font-serif text-[clamp(1.6rem,3.5vw,3rem)] font-light leading-snug text-white">
                  {featured.title}
                </h2>
                <p className="mb-6 text-[15px] leading-7 text-white/70 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {featured.date && <span>{featured.date}</span>}
                  <span className="h-px w-4 bg-white/20" />
                  <span className="text-white/60 transition-colors duration-300 group-hover:text-white">Read Article →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* All articles */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-10 text-[11px] uppercase tracking-[0.35em] text-mid-gray">All Articles</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                >
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal/40">{post.category}</p>
                      <h3 className="font-serif text-[1.05rem] font-light leading-snug text-charcoal line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-charcoal/8 pt-4">
                      <span className="text-[11px] text-charcoal/35">{post.date}</span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready to Act?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Talk About<br />Your Home.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Knowledge is the first step. When you&apos;re ready to sell or buy in Pierce County, our team brings the strategy and expertise to get you the best result.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/free-home-evaluation" className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90">
                    Free Home Evaluation
                  </Link>
                  <Link href="/contact-us" className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10">
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
