import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { membersBySlug, allMembers, categories } from "@/lib/business-connect-data";

export async function generateStaticParams() {
  return Object.keys(membersBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = membersBySlug[slug];
  if (!m) return {};
  return {
    title: `${m.name} — ${m.company} | Tapps Business Connect`,
    description: `${m.name} of ${m.company}. ${m.specialty}. Part of the Tapps Business Connect network in Lake Tapps, Bonney Lake & Puyallup.`,
  };
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    website: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <circle cx="10" cy="10" r="8" />
        <path d="M2 10h16M10 2c-2 2-3 5-3 8s1 6 3 8M10 2c2 2 3 5 3 8s-1 6-3 8" strokeLinecap="round" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M2.5 4.5C2.5 3.4 3.4 2.5 4.5 2.5h2l2 4-1.5 1.5a11 11 0 0 0 5 5L13.5 12l4 2v2c0 1.1-.9 2-2 2C7.2 18 2 12.8 2 6.5c0-1.1.9-2 2-2h-.5z" strokeLinecap="round" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M18 10a8 8 0 1 0-9.25 7.903V12.75H6.75v-2.5h2V8.5A2.75 2.75 0 0 1 11.5 5.75h1.75v2.5H11.5a.25.25 0 0 0-.25.25v1.75h2.25l-.375 2.5H11.25v5.153A8.002 8.002 0 0 0 18 10z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2.5" y="2.5" width="15" height="15" rx="4" />
        <circle cx="10" cy="10" r="3.5" />
        <circle cx="14.5" cy="5.5" r=".5" fill="currentColor" stroke="none" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M4.5 3A1.5 1.5 0 1 1 3 4.5 1.5 1.5 0 0 1 4.5 3zM3 7h3v10H3zM8 7h2.9v1.4h.1A3.2 3.2 0 0 1 14 7c3 0 3.5 2 3.5 4.5V17H14.5v-5c0-1.2 0-2.8-1.7-2.8S11 10.7 11 11.9V17H8z" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M14.5 3c.3 1.4 1.1 2.5 2.5 3v2.5c-1.5 0-2.8-.6-3.5-1.4V13a5 5 0 1 1-5-5c.2 0 .3 0 .5.02V10.5A2.5 2.5 0 1 0 12 13V3h2.5z" />
      </svg>
    ),
  };
  return <>{icons[type]}</> ?? null;
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = membersBySlug[slug];
  if (!m) notFound();

  const cat = categories.find((c) => c.slug === m.categorySlug);
  const relatedMembers = allMembers
    .filter((x) => x.categorySlug === m.categorySlug && x.slug !== m.slug)
    .slice(0, 3);

  const [heroPhoto, ...galleryPhotos] = m.photos;

  const socialLinks = [
    m.website && { type: "website", href: m.website, label: "Website" },
    m.phone && { type: "phone", href: `tel:${m.phone}`, label: m.phone },
    m.facebook && { type: "facebook", href: m.facebook, label: "Facebook" },
    m.instagram && { type: "instagram", href: m.instagram, label: "Instagram" },
    m.linkedin && { type: "linkedin", href: m.linkedin, label: "LinkedIn" },
    m.tiktok && { type: "tiktok", href: m.tiktok, label: "TikTok" },
  ].filter(Boolean) as { type: string; href: string; label: string }[];

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <Link href="/business-connect" className="hover:text-white transition-colors">Business Connect</Link>
              <span>/</span>
              {cat && <Link href={`/${m.categorySlug}`} className="hover:text-white transition-colors">{cat.name}</Link>}
              <span>/</span>
              <span className="text-white/60">{m.name}</span>
            </div>

            <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
              {/* Portrait */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[3/4] max-w-[360px] overflow-hidden rounded-3xl">
                  <Image
                    src={heroPhoto}
                    alt={m.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-8">
                <span className="mb-5 inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/60">
                  {m.category}
                </span>
                <h1 className="mb-2 font-serif text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.0] text-white">
                  {m.name}.
                </h1>
                <p className="mb-2 font-serif text-[1.2rem] font-light text-white/50">{m.company}</p>
                <p className="mb-10 text-[13px] uppercase tracking-[0.25em] text-white/40">{m.specialty}</p>

                {/* Social / contact links */}
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.type}
                      href={link.href}
                      target={link.type !== "phone" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white"
                    >
                      <SocialIcon type={link.type} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio + gallery */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

              {/* Bio */}
              <div className="lg:col-span-7">
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">About</p>
                <h2 className="mb-8 font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  {m.company}.
                </h2>
                <p className="text-[16px] leading-8 text-charcoal/70 not-italic">
                  {m.bio}
                </p>

                {/* Contact CTA */}
                <div className="mt-12 flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full bg-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-charcoal/85"
                  >
                    Let&apos;s Talk Business
                  </Link>
                  <Link
                    href="/business-connect"
                    className="inline-flex items-center rounded-full border border-charcoal/20 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
                  >
                    Join the Network
                  </Link>
                </div>
              </div>

              {/* Gallery + details */}
              <div className="lg:col-span-5 space-y-5">
                {galleryPhotos.map((img, i) => (
                  <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={img}
                      alt={`${m.company} — photo ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ))}

                {/* Details card */}
                <div className="rounded-3xl bg-[#f2ede6] p-7">
                  <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-charcoal/50">Contact</p>
                  <dl className="space-y-4">
                    {[
                      { label: "Company", value: m.company },
                      { label: "Specialty", value: m.specialty },
                      { label: "Category", value: m.category },
                      ...(m.phone ? [{ label: "Phone", value: m.phone }] : []),
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-baseline justify-between border-b border-charcoal/8 pb-4 last:border-0 last:pb-0">
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-charcoal/45">{label}</dt>
                        <dd className="font-serif text-[0.95rem] font-light text-charcoal text-right max-w-[60%]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {m.website && (
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-charcoal/85"
                    >
                      Visit Website
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other members in category — linen */}
        {relatedMembers.length > 0 && (
          <section className="bg-[#f2ede6] py-16 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">More in {cat?.name}</p>
                  <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                    Also in this Category.
                  </h2>
                </div>
                {cat && (
                  <Link
                    href={`/${m.categorySlug}`}
                    className="hidden sm:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
                  >
                    View All
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedMembers.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/business-connect-profiles/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={rel.photo}
                        alt={rel.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div>
                        <h3 className="font-serif text-[1.1rem] font-light leading-snug text-charcoal">{rel.name}</h3>
                        <p className="mt-1 text-[12px] uppercase tracking-[0.15em] text-charcoal/45">{rel.company}</p>
                      </div>
                      <p className="mt-4 border-t border-charcoal/8 pt-4 text-[13px] leading-6 text-charcoal/60">
                        {rel.specialty}
                      </p>
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
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Tapps Business Connect</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Ready to Grow<br />Your Business?
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Join a network of high-standard professionals across Lake Tapps, Bonney Lake, and Puyallup. No fees. No fluff. Just great people doing great business.
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
                    Browse All Members
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
