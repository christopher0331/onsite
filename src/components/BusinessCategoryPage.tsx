import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { categories, members, type Member } from "@/lib/business-connect-data";

function MemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/business-connect-profiles/${member.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
    >
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      </div>
      {/* Info */}
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div>
          <span className="mb-2 inline-block rounded-full border border-charcoal/12 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal/40">
            {member.category}
          </span>
          <h3 className="font-serif text-[1.15rem] font-light leading-snug text-charcoal">{member.name}</h3>
          <p className="mt-1 text-[12px] uppercase tracking-[0.15em] text-charcoal/45">{member.company}</p>
        </div>
        <p className="mt-4 border-t border-charcoal/8 pt-4 text-[13px] leading-6 text-charcoal/60">
          {member.specialty}
        </p>
      </div>
    </Link>
  );
}

interface Props {
  categorySlug: string;
  title: string;
  description: string;
  metaTitle: string;
}

export default function BusinessCategoryPage({ categorySlug, title, description, metaTitle }: Props) {
  const categoryMembers = members[categorySlug] ?? [];
  const otherCategories = categories.filter((c) => c.slug !== categorySlug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <Link
              href="/business-connect"
              className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-white"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 rotate-180">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tapps Business Connect
            </Link>
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Business Connect</p>
            <h1 className="mb-8 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5.2rem)] font-light leading-[1.0] text-white">
              {title}.
            </h1>
            <p className="max-w-xl text-[16px] leading-8 text-white/70">{description}</p>
          </div>
        </section>

        {/* Member listing */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {categoryMembers.length > 0 ? (
              <>
                <div className="mb-12 flex items-end justify-between">
                  <div>
                    <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Members</p>
                    <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] text-charcoal">
                      {categoryMembers.length} Member{categoryMembers.length !== 1 ? "s" : ""} in {title}.
                    </h2>
                  </div>
                  <Link
                    href="/contact-us"
                    className="hidden sm:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
                  >
                    Apply to Join
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
                  {categoryMembers.map((m) => (
                    <MemberCard key={`${m.name}-${m.company}`} member={m} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="mb-4 font-serif text-[3rem] font-light text-charcoal/10">—</p>
                <h2 className="mb-4 font-serif text-[1.8rem] font-light text-charcoal">
                  No Members Listed Yet.
                </h2>
                <p className="mb-8 max-w-md text-[15px] leading-7 text-charcoal/55">
                  This category is open for new members. If you operate a business in {title.toLowerCase()}, we&apos;d love to have you.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-charcoal/85"
                >
                  Apply for Membership
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other categories — linen */}
        <section className="bg-[#f2ede6] py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">More Categories</p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  Explore the Network.
                </h2>
              </div>
              <Link
                href="/business-connect"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group flex flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1"
                >
                  <div>
                    <p className="mb-3 text-xl">{cat.icon}</p>
                    <h3 className="mb-2 font-serif text-[1.15rem] font-light text-charcoal">{cat.name}</h3>
                    <p className="text-[13px] leading-6 text-charcoal/55 line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/40 transition-colors duration-300 group-hover:text-charcoal">
                    View Members
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Join the Group</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Ready to Grow<br />Your Business?
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  No fees. No fluff. Just great people doing great business. Apply for membership or RSVP for our next morning meeting.
                </p>
                <div className="flex flex-wrap gap-4">
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
                    View All Categories
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
