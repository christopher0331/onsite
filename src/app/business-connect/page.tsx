import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { BC_LOGO, categories } from "@/lib/business-connect-data";

export const metadata: Metadata = {
  title: "Tapps Business Connect | Local Businesses & Services in Lake Tapps, Bonney Lake & Puyallup",
  description:
    "Tapps Business Connect — high-standard businesses, real relationships, trusted referrals. A networking group for professionals in Lake Tapps, Bonney Lake, Sumner, Puyallup, Buckley & surrounding areas.",
};

const quickLinks = [
  { label: "Member Application", href: "/contact-us" },
  { label: "MTG Attendance Check-In", href: "/contact-us" },
  { label: "RSVP for Next Event", href: "/contact-us" },
  { label: "Group Structure & Guidelines", href: "/contact-us" },
];

export default function BusinessConnectPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-8">
                  <Image
                    src={BC_LOGO}
                    alt="Tapps Business Connect"
                    width={200}
                    height={100}
                    className="object-contain invert mix-blend-screen"
                  />
                </div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Lake Tapps · Bonney Lake · Puyallup</p>
                <h1 className="mb-8 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
                  Tapps Business<br />Connect.
                </h1>
                <p className="max-w-xl text-[16px] leading-8 text-white/70">
                  High-standard businesses. Real relationships. Trusted referrals. A networking group for professionals across Lake Tapps, Bonney Lake, Sumner, Puyallup, Buckley &amp; surrounding areas.
                </p>
              </div>
              {/* Quick links */}
              <div className="flex flex-col gap-3 lg:min-w-[260px]">
                {quickLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center justify-between rounded-full border border-white/20 px-6 py-3.5 text-[12px] uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white"
                  >
                    {l.label}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0 ml-4">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works — white */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">How It Works</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Three Ways to Connect.
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/70">
                We build meaningful connections through monthly breakfast meetings, educational speakers, and after-hours events — without the fees or pressure.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  label: "Guests",
                  description: "Attend a morning meeting to experience the group firsthand. No commitment required.",
                },
                {
                  label: "Members",
                  description: "Accepted professionals who hold exclusive seats and uphold our high standards. By application.",
                },
                {
                  label: "Affiliates",
                  description: "Professionals who've attended prior meetings and engage through our Connections After Close after-hours events.",
                },
              ].map((t, i) => (
                <div key={t.label} className="rounded-3xl border border-charcoal/8 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                  <p className="mb-4 font-serif text-[3rem] font-light leading-none text-charcoal/10">0{i + 1}</p>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-charcoal/40">{t.label}</p>
                  <p className="text-[15px] leading-7 text-charcoal/65">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-14">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Member Categories</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                Find a Business.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group flex flex-col justify-between rounded-3xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1"
                >
                  <div>
                    <p className="mb-4 text-2xl">{cat.icon}</p>
                    <h3 className="mb-3 font-serif text-[1.35rem] font-light leading-snug text-charcoal">
                      {cat.name}
                    </h3>
                    <p className="text-[14px] leading-7 text-charcoal/60">{cat.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                    Browse Members
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Apply CTA — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Join the Group</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Serious About Your<br />Business?
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  If you&apos;re ready to network with integrity, RSVP for our next meeting or submit a member application. Hosted by André Bohall (OnSite Real Estate Group) and Cindie Bohall (NW Senior Advisors). No fees. No fluff. Just great people doing great business.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Apply for Membership
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    RSVP for Next Event
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
