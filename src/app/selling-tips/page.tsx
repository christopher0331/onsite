import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";
import { getCategoryCards, type BlogCard as Post } from "@/lib/blog";

export const metadata: Metadata = pageMetadata({
  title: "Home Selling Tips & Advice | Pierce County Real Estate Guidance",
  description:
    "Practical, expert-backed advice for Pierce County home sellers. From pricing and prep to inspections and closing — get the guidance you need to sell with confidence.",
  path: "/selling-tips",
});

const posts = getCategoryCards("selling-tips");

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
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal/65">Selling Tips</p>
          <h3 className="font-serif text-[1.05rem] font-light leading-snug text-charcoal line-clamp-3">{post.title}</h3>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-charcoal/8 pt-4 text-[11px] uppercase tracking-[0.2em] text-charcoal/65 transition-colors duration-300 group-hover:text-charcoal">
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
              <div className="flex shrink-0 flex-col gap-3 text-[13px] text-white/80">
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
              <div className="hero-overlay" aria-hidden />
              <div className="relative z-10 mt-auto p-10 lg:max-w-3xl">
                {featured.isNew && (
                  <span className="mb-5 inline-block rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-charcoal">New</span>
                )}
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/80">Selling Tips</p>
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
