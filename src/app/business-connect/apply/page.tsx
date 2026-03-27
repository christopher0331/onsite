import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Member Application | Tapps Business Connect",
  description:
    "Apply for membership in Tapps Business Connect — a high-accountability networking group for serious business professionals in Lake Tapps, Bonney Lake, Puyallup & surrounding areas.",
};

const requirements = [
  {
    num: "01",
    title: "Business Legitimacy & Professional Standards",
    items: [
      "Must be a registered and active business with the Washington Secretary of State.",
      "If in the trades or other regulated industries, must carry active commercial insurance and/or bonding as required by law.",
      "Must operate with high ethical and professional standards, aligning with the group's mission of trust and accountability.",
    ],
  },
  {
    num: "02",
    title: "Commitment to Group Participation",
    items: [
      "Must attend monthly morning meetings (5 of 6 over each 6-month cycle; subs welcome). Absences or tardiness reduce group cohesion and accountability.",
      "Must participate in Connections After Close (5 of 6 over each 6-month cycle; subs welcome) and other scheduled networking events.",
      "Engage actively — give referrals, collaborate, and support other members.",
      "Must be willing to participate in technology requests. The group will help; there will be technological requirements to promote businesses online and in person.",
    ],
  },
  {
    num: "03",
    title: "Give-First Mentality",
    items: [
      "Members are expected to create value before asking for it — by offering introductions, referrals, or expertise in areas that others don't have.",
      "Success is measured not just by business gained, but by contribution to others' growth.",
    ],
  },
  {
    num: "04",
    title: "Growth-Mindedness",
    items: [
      "Members must show a commitment to continuous learning and improvement — professionally, personally, and technologically.",
      "Show up prepared to share insights, learn from others, and contribute to the education of the group.",
    ],
  },
  {
    num: "05",
    title: "Accountability to Higher Standards",
    items: [
      "Maintain integrity in all business dealings and referrals.",
      "Track and follow up on referrals given and received.",
      "Be transparent and consistent in communication and results.",
    ],
  },
  {
    num: "06",
    title: "Tech-Forward Engagement",
    items: [
      "Use social media, AI, and digital tools to amplify both personal and group visibility.",
      "Participate in group technology initiatives (e.g., referral tracking, QR forms, online profiles).",
    ],
  },
  {
    num: "07",
    title: "Real Relationship Building",
    items: [
      "Prioritize long-term trust over short-term transactions.",
      "Cultivate meaningful relationships that reflect positively on the TBC brand.",
    ],
  },
];

export default function MemberApplicationPage() {
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
              Member Application
            </p>
            <h1 className="mb-6 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.05] text-white">
              Exclusive Membership<br />Application.
            </h1>
            <p className="mb-10 max-w-2xl text-[16px] leading-8 text-white/60">
              Membership at Tapps Business Connect is intentionally selective. Please review all requirements carefully before beginning. The application takes approximately <strong className="text-white/80 font-normal">90 minutes</strong> and does not save progress — set aside uninterrupted time.
            </p>
            <a
              href="#application"
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
            >
              Begin Application
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M8 3v10M3 8h10" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </section>

        {/* Membership Requirements */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Before You Apply</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal">
                  Membership Requirements.
                </h2>
              </div>
              <p className="text-[18px] leading-9 text-charcoal/70">
                Every applicant must meet and commit to these standards. Our Members review each application carefully — decisions are based on culture fit, communication style, reputation, and dependability.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {requirements.map((req) => (
                <div
                  key={req.num}
                  className="rounded-3xl bg-[#1a1a18] p-8"
                >
                  <div className="mb-5 flex items-start gap-5">
                    <span className="font-serif text-[2.8rem] font-light leading-none text-white/25 shrink-0">{req.num}</span>
                    <h3 className="font-serif text-[1.35rem] font-light leading-snug text-white pt-2">{req.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {req.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-[16px] leading-8 text-white/75">
                        <span className="mt-2.5 h-1 w-1 rounded-full bg-white/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application CTA */}
        <section id="application" className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/50">Ready to Apply</p>
                <h2 className="mb-6 font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Begin Your Application.
                </h2>
                <p className="text-[16px] leading-8 text-white/60">
                  The application takes approximately <strong className="text-white/80 font-normal">90 minutes</strong> and does not save progress — set aside uninterrupted time before starting. Our Members review every submission carefully.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href="https://www.go.onsiteregroup.com/business-connect-about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                >
                  Start Application
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-[12px] text-white/35 lg:text-right">
                  Questions first?{" "}
                  <Link href="/contact-us" className="underline hover:text-white/60 transition-colors">
                    Contact us directly
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
