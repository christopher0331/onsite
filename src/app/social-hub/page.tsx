import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

export const metadata: Metadata = {
  title: "Follow Onsite Real Estate on Social Media | Facebook, Instagram & YouTube",
  description:
    "Follow OnSite Real Estate Group on social for real-time updates, property highlights, and marketing tips — Facebook, Instagram, YouTube & TikTok.",
};

const platforms = [
  {
    name: "Facebook",
    handle: "@OnSiteREGroup",
    href: "https://www.facebook.com/OnSiteREGroup",
    description: "Property updates, market news, business networking events, and community highlights.",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@watchmeasirealestate",
    href: "https://www.instagram.com/watchmeasirealestate",
    description: "Behind-the-scenes, listing showcases, client wins, and local East Pierce County content.",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@OnSiteRealEstateGroup",
    href: "https://www.youtube.com/@OnSiteRealEstateGroup",
    description: "In-depth market walkthroughs, property tours, and real estate education videos.",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@onsiteregroup",
    href: "https://www.tiktok.com/@onsiteregroup",
    description: "Short-form real estate tips, market breakdowns, and property highlights for East Pierce County.",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const posts = [
  {
    id: "1341820774078248",
    date: "October 15, 2025",
    hashtags: ["#teamwork", "#leadership", "#clarity", "#roles", "#efficiency"],
    title: "Org Chart: Define Leadership Roles for Business Clarity & Success!",
    body: "Having a clear organizational chart helps team members understand roles and responsibilities. When everyone knows who to contact for specific support, efficiency increases. Clarity on who does what avoids confusion and streamlines workflows.",
    videoHref: "https://www.facebook.com/OnSiteREGroup/videos/1341820774078248",
  },
  {
    id: "2211216749370742",
    date: "October 14, 2025",
    hashtags: ["#LakeTapps", "#BonneyLake", "#Networking", "#TappsBusinessConnect", "#LocalBusiness"],
    title: "High-Standard Businesses. Real Relationships. Trusted Referrals.",
    body: "Tapps Business Connect continues to grow as the go-to networking group for professionals in Lake Tapps, Bonney Lake, Sumner, Puyallup, Buckley & surrounding areas. We're building meaningful connections through monthly breakfast meetings, educational speakers, and after-hours events — without the fees or pressure.",
    videoHref: "https://www.facebook.com/OnSiteREGroup/videos/2211216749370742",
  },
  {
    id: "668185126363678",
    date: "October 14, 2025",
    hashtags: ["#LakeTapps", "#BonneyLake", "#PierceCounty", "#TappsBusinessConnect", "#ChiropracticCare"],
    title: "Tapps Business Connect: Impact on Local Chiropractic Practice",
    body: "Discover how Tapps Business Connect is transforming a local chiropractic practice. From implementing seminar tools to using AI like ChatGPT, see how it's cutting down documentation time from hours to minutes. Networking and resources are helping businesses thrive in Lake Tapps.",
    videoHref: "https://www.facebook.com/OnSiteREGroup/videos/668185126363678",
  },
  {
    id: "795522670027133",
    date: "October 14, 2025",
    hashtags: ["#BusinessSystems", "#BusinessGrowth", "#Networking", "#TappsBusinessConnect", "#Entrepreneurship"],
    title: "Avoid Business Burnout With Intentional Systems",
    body: "Joshua Meeks shares real-world lessons on balancing time, scope, and cost with intentional systems. Discover how to create consistency, margin, and sustainable growth for your business.",
    videoHref: "https://www.facebook.com/OnSiteREGroup/videos/795522670027133",
  },
];

export default function SocialHubPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero + YouTube — dark */}
        <section className="bg-[#1a1a18] pt-40 pb-20 sm:pt-52 sm:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {/* Hero copy */}
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Social Hub</p>
            <h1 className="mb-8 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
              Let&apos;s Get Social.<br />Stay Connected.
            </h1>
            <p className="mb-12 max-w-xl text-[16px] leading-8 text-white/70">
              Follow us on social for real-time updates, property highlights, and marketing tips.
            </p>
            <div className="mb-16 flex flex-wrap gap-3">
              {platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                >
                  {p.icon}
                  {p.name}
                </Link>
              ))}
            </div>

            {/* YouTube videos — directly below hero */}
            <div className="mb-10 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Latest on YouTube</p>
              <Link
                href="https://www.youtube.com/@OnSiteRealEstateGroup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#FF0000]">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[
                { id: "aFH1aV6tJSI", title: "Peaceful Acreage Retreat in Bonney Lake | Country Living Minutes from Town" },
                { id: "q691_kYumVo", title: "Snohomish WA Home for Sale | Private Greenbelt Lot + Covered Outdoor Living" },
                { id: "oUZDZyG2b1s", title: "Two Side-By-Side Hood Canal Acreage Parcels – Tidelands Included" },
                { id: "MqCCkiu9W3k", title: "A Private Gated Retreat in a Beach-Access Community" },
                { id: "d8_NFkStLeI", title: "Riverview Area in Kent WA Condo for Sale | Private, Updated, Near Shopping & Transit" },
                { id: "XYrhiwkwxUc", title: "Avoid Business Burnout With Intentional Systems — Tapps Business Connect" },
              ].map((vid) => (
                <div key={vid.id} className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04]">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}?rel=0&modestbranding=1`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[13px] leading-6 text-white/65">{vid.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform cards — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Follow Along</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Find Us Everywhere.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/70">
                From property tours to market insights to local business networking — we show up where it matters, sharing what you need to make smarter real estate decisions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-6 rounded-3xl border border-charcoal/8 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-serif text-xl font-light text-charcoal">{p.name}</p>
                    <p className="mb-4 text-[12px] text-charcoal/40">{p.handle}</p>
                    <p className="text-[14px] leading-7 text-charcoal/65">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                    Follow
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured posts — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Latest from Facebook</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Recent Posts.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col rounded-3xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-charcoal">OnSite Real Estate Group</p>
                      <p className="text-[11px] text-charcoal/45">{post.date}</p>
                    </div>
                  </div>

                  <h3 className="mb-3 font-serif text-[1.2rem] font-light leading-snug text-charcoal">
                    {post.title}
                  </h3>
                  <p className="mb-5 flex-1 text-[14px] leading-7 text-charcoal/65 not-italic">
                    {post.body}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#f2ede6] px-3 py-1 text-[11px] text-charcoal/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-charcoal/8 pt-5">
                    <Link
                      href={post.videoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-charcoal/50 transition-colors duration-300 hover:text-charcoal"
                    >
                      View on Facebook
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsScroll />

        {/* CTA — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Got Questions?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Talk Home Selling Solutions.
                </h2>
              </div>
              <div className="flex flex-col gap-8 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Ready to make your next move? Our team is here to guide you through every step of the buying or selling process.
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
