import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "RSVP for Next Event | Tapps Business Connect",
  description:
    "RSVP for the next Tapps Business Connect meeting. Select your participation type — Current Member, Guest, or Affiliate.",
};

const options = [
  {
    num: "01",
    label: "Current Member",
    description:
      "Already an active TBC Member? Use this form to RSVP for the next Monthly Morning Members Meeting (M4) or Connections After Close.",
    href: "https://share-na2.hsforms.com/1yG-Wx_XAR7mmHNinYWD5Zg415kr0",
    cta: "Member RSVP",
  },
  {
    num: "02",
    label: "Guest / New to TBC",
    description:
      "Interested in attending as a Guest? This form is for professionals visiting for the first time or returning as a Guest in an open industry seat.",
    href: "https://www.go.onsiteregroup.com/tbc-get-connected",
    cta: "Guest RSVP",
  },
  {
    num: "03",
    label: "Affiliate",
    description:
      "An Affiliate who attended previously and wants to stay connected? Use this form to RSVP for Connections After Close and other extended events.",
    href: "https://share-na2.hsforms.com/1yG-Wx_XAR7mmHNinYWD5Zg415kr0",
    cta: "Affiliate RSVP",
  },
];

export default function RSVPPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-20 sm:pt-52 sm:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/50">
              <Link href="/business-connect" className="hover:text-white/80 transition-colors">
                Tapps Business Connect
              </Link>
              <span className="mx-2 text-white/20">/</span>
              RSVP
            </p>
            <h1 className="mb-6 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.05] text-white">
              RSVP for the<br />Next Event.
            </h1>
            <p className="max-w-2xl text-[16px] leading-8 text-white/60">
              Stronger Connections. Better Referrals. Select your participation type below to complete your RSVP.
            </p>
          </div>
        </section>

        {/* Participation type selector */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-16 text-center">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Select One</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                How Would You Like to Participate?
              </h2>
              <p className="mt-6 mx-auto max-w-2xl text-[16px] leading-8 text-charcoal/60">
                Tapps Business Connect is a high-integrity networking community for growth-minded professionals in Lake Tapps, Bonney Lake, Sumner, Puyallup, Buckley &amp; beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-3xl border border-charcoal/8 p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-charcoal/15"
                >
                  <div>
                    <p className="mb-5 font-serif text-[3rem] font-light leading-none text-charcoal/10">{opt.num}</p>
                    <h3 className="mb-4 font-serif text-[1.5rem] font-light leading-snug text-charcoal">
                      {opt.label}
                    </h3>
                    <p className="text-[14px] leading-7 text-charcoal/60">{opt.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                    {opt.cta}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-10 text-center text-[12px] text-charcoal/40">
              Not sure which applies to you?{" "}
              <Link href="/business-connect/about" className="underline hover:text-charcoal/70 transition-colors">
                Review the group structure
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className="underline hover:text-charcoal/70 transition-colors">
                contact us directly
              </Link>
              .
            </p>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
