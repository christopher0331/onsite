import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/page-meta";
import { AREA_SERVED_PLACES, localBusinessRef, SITE_BRAND } from "@/lib/nap";
import { getCanonicalBaseUrl } from "@/lib/site-url";
import { getTeamProfile, TEAM_PROFILES } from "@/lib/team";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAM_PROFILES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getTeamProfile(slug);
  if (!m) return {};
  return pageMetadata({
    title: `${m.name} | ${m.role} at ${SITE_BRAND}`,
    description: m.bioShort.slice(0, 155),
    path: `/about-us/${m.slug}`,
  });
}

export default async function TeamBioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getTeamProfile(slug);
  if (!m) notFound();
  const base = getCanonicalBaseUrl();
  const url = `${base}/about-us/${m.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: m.name,
    jobTitle: m.role,
    url,
    image: m.photo,
    telephone: m.phoneE164,
    email: `mailto:${m.email}`,
    worksFor: localBusinessRef(base),
    sameAs: Object.values(m.socials).filter(Boolean),
    knowsAbout: [...m.knowsAbout],
    areaServed: AREA_SERVED_PLACES.map((a) => ({
      "@type": a.type,
      name: a.name,
      sameAs: `https://www.wikidata.org/wiki/${a.wikidata}`,
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white pt-32 pb-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-warm-gray">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                priority
                className={`object-cover ${m.objectPosition ?? ""}`}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-3">
              {m.role} · {SITE_BRAND}
            </p>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-light text-charcoal leading-tight mb-6">
              {m.name}
            </h1>
            <div className="space-y-4 text-[15.5px] leading-8 text-charcoal/80">
              {m.bioParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 space-y-2 text-[14px] text-charcoal/75">
              <p>
                <a href={`tel:${m.phone}`} className="hover:text-charcoal">{m.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${m.email}`} className="hover:text-charcoal">{m.email}</a>
              </p>
            </div>
            <p className="mt-10">
              <Link href="/about-us" className="text-[12px] uppercase tracking-[0.25em] text-charcoal/60 hover:text-charcoal">
                ← Meet the whole team
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
