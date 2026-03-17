import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import blogData from "@/lib/blog-data.json";

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

const posts = blogData as Record<string, BlogPost>;

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | OnSite Real Estate Group`,
    description: post.excerpt,
  };
}

// Split body text into paragraphs, preserving H2-style headings
function renderBody(body: string) {
  const paragraphs = body.split(/\n{1,}/);
  const elements: React.ReactNode[] = [];

  paragraphs.forEach((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return;

    // Detect heading lines — short, no terminal punctuation, followed by body text
    const isHeading =
      trimmed.length < 120 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(";") &&
      /^[A-Z0-9]/.test(trimmed) &&
      !trimmed.startsWith("•") &&
      !trimmed.startsWith("-");

    if (isHeading && i > 0) {
      elements.push(
        <h2 key={i} className="mb-5 mt-12 font-serif text-[1.6rem] font-light leading-snug text-charcoal first:mt-0">
          {trimmed}
        </h2>
      );
    } else if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      elements.push(
        <li key={i} className="flex items-start gap-3 text-[16px] leading-8 text-charcoal/70">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/30" />
          <span>{trimmed.replace(/^[•\-]\s*/, "")}</span>
        </li>
      );
    } else {
      elements.push(
        <p key={i} className="mb-6 text-[16px] leading-8 text-charcoal/70 not-italic">
          {trimmed}
        </p>
      );
    }
  });

  // Wrap consecutive li elements in a ul
  const wrapped: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  elements.forEach((el, i) => {
    const isLi = (el as React.ReactElement)?.type === "li";
    if (isLi) {
      listItems.push(el);
    } else {
      if (listItems.length) {
        wrapped.push(<ul key={`ul-${i}`} className="mb-6 space-y-2">{listItems}</ul>);
        listItems = [];
      }
      wrapped.push(el);
    }
  });
  if (listItems.length) {
    wrapped.push(<ul key="ul-last" className="mb-6 space-y-2">{listItems}</ul>);
  }
  return wrapped;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  // Related posts — same category, different slug
  const related = Object.values(posts)
    .filter((p) => p.catSlug === post.catSlug && p.slug !== post.slug)
    .slice(0, 3);

  const categoryLabel =
    post.category === "Market Trends" ? "Market Trends" :
    post.category === "Selling Tips" ? "Selling Tips" : "Insights";

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative min-h-[60vh] overflow-hidden bg-[#1a1a18]">
          {post.image && (
            <>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover opacity-40"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a18] via-[#1a1a18]/70 to-[#1a1a18]/30" />
            </>
          )}
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-48 lg:px-12">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <Link href="/trends-insights" className="hover:text-white transition-colors">Trends & Insights</Link>
              <span>/</span>
              <Link href={`/${post.catSlug}`} className="hover:text-white transition-colors">{categoryLabel}</Link>
            </div>
            <span className="mb-5 inline-block w-fit rounded-full border border-white/20 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/60">
              {categoryLabel}
            </span>
            <h1 className="mb-6 max-w-4xl font-serif text-[clamp(1.8rem,4.5vw,4rem)] font-light leading-[1.1] text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-[12px] text-white/50">
              {post.author && <span>{post.author}</span>}
              {post.author && post.date && <span className="h-px w-4 bg-white/20" />}
              {post.date && <span>{post.date}</span>}
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[860px] px-6 lg:px-12">
            {renderBody(post.body)}
          </div>
        </section>

        {/* Related articles — linen */}
        {related.length > 0 && (
          <section className="bg-[#f2ede6] py-16 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Keep Reading</p>
                  <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.4rem)] font-light text-charcoal">
                    More {categoryLabel}.
                  </h2>
                </div>
                <Link
                  href={`/${post.catSlug}`}
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                  >
                    {rel.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <h3 className="font-serif text-[1.05rem] font-light leading-snug text-charcoal line-clamp-3">
                        {rel.title}
                      </h3>
                      <div className="mt-5 flex items-center gap-2 border-t border-charcoal/8 pt-4 text-[11px] uppercase tracking-[0.2em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                        Read
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready to Take Action?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Talk About<br />Your Home.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Whether you&apos;re ready to sell, curious about your home&apos;s value, or just have questions — our team is here to help with honest, local expertise.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/free-home-evaluation"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Free Home Evaluation
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
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
