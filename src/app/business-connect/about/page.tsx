"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const accordions = [
  {
    title: "Monthly Morning Members Meetings (M4)",
    body: (
      <>
        <p>M4 meetings take place once per month and are designed for <strong>Members</strong>, plus <strong>Guests in industries where we do not currently have a Member</strong>.</p>
        <p className="mt-4">Each M4 includes:<br />• An educational segment led by a presenter<br />• Structured networking and introductions<br />• Member-to-member conversation focused on best business practices<br />• Opportunity for Guests to introduce themselves<br />• Accountability updates and community involvement planning</p>
        <p className="mt-4">These meetings are intentionally small, structured, and high-engagement. Seating is limited by design, which is why accurate RSVPs and dependable attendance matter.</p>
        <p className="mt-4">To see our current Members, please review our website&apos;s Member Directory.</p>
      </>
    ),
  },
  {
    title: "Connections After Close (CAC)",
    body: (
      <>
        <p>Connections After Close is held once per month and sponsored by a TBC Member. This meeting is <strong>open to Members, Guests, and Affiliates</strong>.</p>
        <p className="mt-4">The focus is simple:<br />• Build new professional relationships<br />• Share referrals and cross-industry opportunities<br />• Strengthen community presence<br />• Expand your network in a relaxed environment</p>
        <p className="mt-4">Unlike M4, CAC does not have industry seat restrictions — however, accountability, professionalism, and RSVP standards still apply.</p>
      </>
    ),
  },
  {
    title: "Membership",
    body: (
      <>
        <p>A Member is a business owner who has:</p>
        <ol className="mt-3 list-decimal list-inside space-y-1">
          <li>Attended an M4 meeting</li>
          <li>Submitted an application for an open industry seat</li>
          <li>Been selected by a panel of existing Members</li>
        </ol>
        <p className="mt-4">Membership is granted for a <strong>6-month term</strong>. Your membership automatically renews if you remain in good standing.</p>
        <h3 className="mt-5 font-medium text-charcoal">Good Standing Requirements</h3>
        <p className="mt-2">• Attend <strong>5 of 6 M4 meetings</strong> in each 6-month cycle<br />• Attend <strong>5 of 6 Connections After Close meetings</strong><br />• Uphold our group&apos;s standards for communication, follow-through, and professionalism<br />• Contribute to group discussions, referrals, participation, and the community project</p>
        <h3 className="mt-5 font-medium text-charcoal">Community Give-Back</h3>
        <p className="mt-2">At the end of each 6-month term, Members collaborate on a community give-back project — something meaningful, local, and aligned with our shared values.</p>
      </>
    ),
  },
  {
    title: "Guests",
    body: (
      <>
        <p>A Guest is a visitor who is invited to attend when their industry seat is <strong>not currently filled by a Member.</strong></p>
        <p className="mt-4">Guest structure:<br />• May attend <strong>up to 2 M4 meetings</strong><br />• A 3rd M4 visit requires submitting an application<br />• Guests may attend <strong>Connections After Close</strong> when invited<br />• Guests must follow all accountability and RSVP expectations<br />• Guests may attend <strong>only 3 M4 meetings per year</strong> in total<br />• Guests are evaluated for cultural fit, professionalism, and consistency<br />• Businesses that do not align with our culture or expectations will not be invited back</p>
      </>
    ),
  },
  {
    title: "Affiliates",
    body: (
      <>
        <p>Affiliates are businesses that:<br />• Have attended as a Guest<br />• May or may not have applied for membership<br />• Are not selected as Members<br />• Still wish to stay connected to the network</p>
        <p className="mt-4">Affiliates enjoy:<br />• Invitations to Connections After Close<br />• Additional events when extended by the group<br />• Continued relationship-building with other high-performing businesses</p>
        <p className="mt-4">Affiliates must maintain professional conduct and accountability to remain in good standing.</p>
      </>
    ),
  },
  {
    title: "RSVP & Attendance Expectations",
    body: (
      <>
        <p>We run a precise, intentional system. Our structure only works when people communicate and follow through.</p>
        <h3 className="mt-5 font-medium text-charcoal">RSVP No-Show Rule</h3>
        <p className="mt-2">• If you RSVP and do <strong>not</strong> give more than <strong>24 hours&apos; notice</strong>, you will receive <strong>one reminder</strong> of our attendance expectations.<br />• If you RSVP again and no-show without proper notice, you may be:<br />&nbsp;&nbsp;– immediately removed from participation<br />&nbsp;&nbsp;– or reviewed by a panel of Members<br />• This applies to <strong>both M4 and Connections After Close</strong></p>
        <h3 className="mt-5 font-medium text-charcoal">Why These Rules Exist</h3>
        <p className="mt-2">A seat at TBC is a commitment — not a casual drop-in.<br />• Members prepare presentations<br />• Hosts prepare space, food, and seating<br />• Meetings rely on full participation to be valuable<br />• Industry seats are limited and held intentionally<br />• No-shows waste opportunities for businesses who reliably show up</p>
        <p className="mt-4 font-medium text-charcoal/80">Every person in the room matters. Every seat matters. Every commitment matters.</p>
      </>
    ),
  },
  {
    title: "Membership Applications",
    body: (
      <>
        <p>Membership at Tapps Business Connect is intentionally selective. We&apos;re looking for businesses that deliver exceptional service, communicate clearly, and consistently follow through — professionals who elevate the room rather than simply participate in it. To ensure that alignment, we use a thorough application process that helps our Members make informed decisions about who joins the table.</p>
        <p className="mt-4">Applications typically take around <strong>90 minutes</strong> to complete. The form does <strong>not</strong> save progress, so we encourage you to set aside uninterrupted time to work through it in one sitting. The questions are detailed by design — they help us understand your business, your professionalism, how you serve clients, and how you contribute to the broader community.</p>
        <p className="mt-4">Our Members review each application carefully. This isn&apos;t a first-come, first-served intake. Decisions are based on culture fit, communication style, reputation, dependability, and your ability to contribute to a high-standard, high-accountability environment.</p>
        <p className="mt-4">If you apply and are not selected, you&apos;re welcome to reapply after <strong>six months</strong> if you are selected to be an affiliate and, as long as your industry seat is still open.</p>
        <p className="mt-4">Membership is earned — and for the right businesses, it becomes a powerful community of support, referrals, and shared growth.</p>
        <div className="mt-6">
          <Link
            href="/contact-us"
            className="inline-flex items-center rounded-full bg-charcoal px-7 py-3.5 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-charcoal/85"
          >
            Start Your Application
          </Link>
        </div>
      </>
    ),
  },
  {
    title: "Connect With Us",
    body: (
      <>
        <p className="font-medium">Facebook</p>
        <a href="https://www.facebook.com/groups/tappsbusinesspublic" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 underline hover:text-charcoal transition-colors">
          facebook.com/groups/tappsbusinesspublic
        </a>
        <p className="mt-4 font-medium">Instagram</p>
        <a href="https://www.instagram.com/tappsbusinessconnect/" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 underline hover:text-charcoal transition-colors">
          instagram.com/tappsbusinessconnect
        </a>
        <p className="mt-4 font-medium">YouTube</p>
        <a href="https://www.youtube.com/playlist?list=PLYHpaJehkXfudU9HV_vkDGzfJMu2F098L" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 underline hover:text-charcoal transition-colors">
          TBC Meeting Recordings Playlist
        </a>
      </>
    ),
  },
  {
    title: "Social Media Posting Policies",
    body: (
      <>
        <p className="font-medium text-charcoal">Tapps Business Connect: Social Media Posting Policies</p>
        <p className="mt-2 text-charcoal/60 italic">A high-standard community for trusted local businesses in Lake Tapps, Bonney Lake, Sumner, Puyallup, Buckley, and surrounding areas.</p>
        <p className="mt-4">This public group connects residents and business owners with <strong>trusted, vetted professionals</strong> across our region. It is moderated by André Bohall (OnSite Real Estate Group) and Cindie Bohall (Senior Advisor), founders of Tapps Business Connect.</p>

        <h3 className="mt-6 font-medium text-charcoal">Referral Requests</h3>
        <p className="mt-2">When someone asks for a specific TBC Member, <strong>only tag that Member</strong>. This is not the place to flood the comments with unrelated businesses.</p>
        <p className="mt-2">If someone requests a referral for an industry (general request):<br />• You may tag a verified Tapps Business Connect Member.<br />• You may also tag another business <strong>only after personally verifying</strong> they hold proper licensing and insurance (if required).<br />• Recommending a business without verifying them puts the group at risk; repeated violations may result in removal.</p>

        <h3 className="mt-6 font-medium text-charcoal">Self-Promotion</h3>
        <p className="mt-2">This group is <strong>not</strong> a place to advertise your business, events, specials, offers, or promotions. No promo posts, no unsolicited service pitches, no marketing disguised as &quot;recommendations&quot;. The only exception: if someone specifically requests your industry, you may respond with your business info.</p>

        <h3 className="mt-6 font-medium text-charcoal">Professional Conduct</h3>
        <p className="mt-2">Everyone is expected to act professionally, keep conversations positive and business-focused, provide accurate verified information, and engage respectfully in all discussions.</p>

        <h3 className="mt-6 font-medium text-charcoal">What You <em>Can</em> Post</h3>
        <p className="mt-2">• Requests for trusted local business referrals<br />• Celebrating local business wins (non-promotional)<br />• Business-related questions<br />• Shoutouts to businesses you&apos;ve met with, referred clients to, or received excellent service from</p>
      </>
    ),
  },
];

const features = [
  {
    title: "A Network Built for Serious Professionals",
    body: "Tapps Business Connect is a high-accountability networking group for growth-minded business owners in the Lake Tapps region. We're built for professionals who show up, follow through, and raise the standard of how local businesses support one another.",
  },
  {
    title: "Founded With Purpose",
    body: "Created by André and Cindie Bohall, TBC was built on a simple belief: strong communities come from strong businesses — led by people who operate with integrity, consistency, and excellence. After years of watching traditional networking fall short, they designed a space for high-performing professionals who want more than surface-level connections.",
  },
  {
    title: "Designed for Real Connection, Not Casual Drop-Ins",
    body: "TBC is intentional by design. This isn't a pass-through meeting or a business-card swap. It's a place where relationships are earned, referrals are trusted, and presence matters. Members meet monthly for education, strategy, and meaningful collaboration.",
  },
  {
    title: "Built on Accountability, Growth & Community Impact",
    body: "Our group is made for professionals who combine real-world expertise with modern tools, exceptional service, and a commitment to giving back. We value accountability, give-first behavior, and collaboration that leads to measurable business growth.",
  },
];

function Accordion({ title, body }: { title: string; body: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-[1.05rem] font-light leading-snug text-charcoal pr-6">{title}</span>
        <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/20 text-charcoal/50 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-6 text-[14px] leading-7 text-charcoal/65">
          {body}
        </div>
      )}
    </div>
  );
}

export default function BusinessConnectAboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-20 sm:pt-52 sm:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/50">
              <Link href="/business-connect" className="hover:text-white/80 transition-colors">Tapps Business Connect</Link>
              <span className="mx-2 text-white/20">/</span>
              Group Structure &amp; Guidelines
            </p>
            <h1 className="mb-6 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.05] text-white">
              Group Structure &amp;<br />Guidelines.
            </h1>
            <p className="max-w-2xl text-[16px] leading-8 text-white/60">
              A comprehensive outline of the systems, attendance requirements, and accountability practices that define our culture and ensure every participant contributes to the group&apos;s success.
            </p>
          </div>
        </section>

        {/* Accordion + photos */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

              {/* Accordion — left */}
              <div className="lg:col-span-7">
                {accordions.map((a) => (
                  <Accordion key={a.title} title={a.title} body={a.body} />
                ))}
              </div>

              {/* Photos — right */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="aspect-square overflow-hidden rounded-3xl bg-[#e8e0d5] flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/30">Monthly Meeting</span>
                </div>
                <div className="aspect-[4/1] overflow-hidden rounded-2xl bg-[#ddd5c8] flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/30">Connections After Close</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* About TBC — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Wide event banner */}
            <div className="mb-16 aspect-[4/1] min-h-[180px] overflow-hidden rounded-3xl bg-[#242420] flex flex-col items-center justify-center text-center px-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-4">Tapps Business Connect</p>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-white">Stronger Business. Trusted Referrals.</h2>
            </div>

            {/* Photos + feature list */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">

              {/* Photo collage */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="col-span-2 aspect-video overflow-hidden rounded-2xl bg-[#2a2a27] flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/20">TBC Members</span>
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#242420] flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/20">Networking</span>
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#2e2e2a] flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/20">After Close</span>
                </div>
              </div>

              {/* Feature list */}
              <div className="lg:col-span-7 space-y-10">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="mt-0.5 font-serif text-[2rem] font-light leading-none text-white/15 shrink-0 w-10 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-2 font-serif text-[1.1rem] font-light leading-snug text-white">{f.title}</h3>
                      <p className="text-[14px] leading-7 text-white/55">{f.body}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Apply for Membership
                  </Link>
                  <Link
                    href="/business-connect"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    View Member Directory
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
