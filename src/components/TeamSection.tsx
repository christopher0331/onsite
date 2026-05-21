"use client";

import { useState } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  bioShort: string;
  bioFull: React.ReactNode;
  objectPosition?: string;
};

const TEAM: TeamMember[] = [
  {
    name: "André Bohall",
    role: "Founder",
    photo:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff6b4b276a0e00c3a04ef_thumbnail_20241213_132625.jpg",
    phone: "2534419764",
    phoneDisplay: "(253) 441-9764",
    email: "andre@onsiteregroup.com",
    bioShort:
      "With over a decade of experience and hundreds of successful home sales, André brings deep expertise, tireless dedication, and a personal touch to every real estate journey.",
    bioFull: (
      <div className="space-y-4 text-[15.5px] leading-8 text-charcoal/80">
        <p>
          With over a decade of experience and hundreds of successful home sales,
          André Bohall brings deep expertise, tireless dedication, and a personal
          touch to every real estate journey. As the founder of OnSite Real Estate
          Group, André leads with service and strategy — combining strong market
          knowledge with sharp negotiating skills and genuine care for his
          clients&apos; needs.
        </p>
        <p>
          André is a natural when it comes to sales. His background includes years
          of high-volume outbound prospecting, phone sales, and client conversion —
          skills that now translate into powerful results for his buyers and sellers.
          He understands how to create opportunities where others see roadblocks, and
          his team is known for going above and beyond to generate business through
          grit, consistency, and intentional action.
        </p>
        <p>
          Whether guiding first-time sellers, upsizing families, or downsizing
          retirees, André is known for his clear communication, no-pressure guidance,
          and ability to simplify even the most complex transactions. His clients
          trust him not just for his results — but for his integrity and straight
          answers.
        </p>
      </div>
    ),
  },
  {
    name: "Cindie Bohall",
    role: "Agent & Advisor",
    photo:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff7c928cd6f5d561b2667_thumbnail_20241213_110755.jpg",
    phone: "2537990609",
    phoneDisplay: "(253) 799-0609",
    email: "cindie@onsiteregroup.com",
    objectPosition: "object-top",
    bioShort:
      "For over 20 years, Cindie Bohall has been a trusted guide for families navigating complex decisions, bringing compassion and deep care to every transaction.",
    bioFull: (
      <div className="space-y-4 text-[15.5px] leading-8 text-charcoal/80">
        <p>
          For over 20 years, Cindie Bohall has been a trusted guide for families
          navigating complex decisions. As the founder of a successful senior housing
          referral company since 2013, she has helped hundreds of families find safe,
          supportive environments for their loved ones.
        </p>
        <p>
          Today, Cindie brings that same compassion, attention to detail, and
          advocacy to her work at OnSite Real Estate Group. Whether helping a family
          transition from their longtime home or supporting first-time buyers, she
          understands the emotional weight behind every move. Her clients love her
          calm, confident approach and her ability to make the complex feel
          manageable.
        </p>
        <p>
          Cindie&apos;s passion lies in building trust and helping people feel cared
          for — especially during life&apos;s major transitions. Her background in
          senior care gives her unique insight when working with older adults,
          retirees, or families coordinating multi-generational moves.
        </p>
      </div>
    ),
  },
  {
    name: "Deisy Duran Ruiz",
    role: "Agent",
    photo: "/team/deisy-headshot.jpg",
    phone: "2539871289",
    phoneDisplay: "(253) 987-1289",
    email: "deisy@onsiteregroup.com",
    bioShort:
      "More than a real estate agent, Deisy genuinely cares about helping people build a better future through homeownership. As a proud Latina entrepreneur, she's passionate about serving her community.",
    bioFull: <DeisyBio />,
  },
];

function DeisyBio() {
  const [lang, setLang] = useState<"en" | "es">("en");
  return (
    <div>
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setLang("en")}
          className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
            lang === "en"
              ? "bg-charcoal text-white"
              : "border border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("es")}
          className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
            lang === "es"
              ? "bg-charcoal text-white"
              : "border border-charcoal/20 text-charcoal/60 hover:border-charcoal/40"
          }`}
        >
          Español
        </button>
      </div>

      {lang === "en" ? (
        <div className="space-y-4 text-[15.5px] leading-8 text-charcoal/80">
          <p>
            More than a real estate agent, I genuinely care about helping people
            build a better future through homeownership and real estate
            opportunities. As a proud Latina entrepreneur, I&apos;m passionate
            about serving my community and helping families find a place they can
            truly call home.
          </p>
          <p>
            With a background in business and entrepreneurship, I value hard work,
            clear communication, and building strong relationships with my clients.
            I&apos;m committed to understanding each client&apos;s unique goals and
            providing guidance throughout every step of the buying or selling
            process.
          </p>
          <p>
            I believe buying or selling a home is one of the most important
            decisions a person can make, and my goal is to make the experience feel
            exciting, smooth, and empowering. I focus on building trust, providing
            honest support, and creating lasting relationships that go beyond the
            transaction.
          </p>
          <p>
            I&apos;m also passionate about supporting and connecting with the Latino
            community through real estate, education, and opportunities that help
            families grow and invest in their future. For me, real estate is more
            than just properties — it&apos;s about helping people achieve their
            dreams and create a place to call home.
          </p>
        </div>
      ) : (
        <div className="space-y-4 text-[15.5px] leading-8 text-charcoal/80">
          <p>
            Más que una agente de bienes raíces, realmente me importa ayudar a las
            personas a construir un mejor futuro a través de la compra de vivienda y
            las oportunidades en bienes raíces. Como orgullosa emprendedora Latina,
            me apasiona servir a mi comunidad y ayudar a las familias a encontrar un
            lugar que realmente puedan llamar hogar.
          </p>
          <p>
            Con experiencia en negocios y emprendimiento, valoro el trabajo duro, la
            comunicación clara y la construcción de relaciones sólidas con mis
            clientes. Estoy comprometida en entender las metas únicas de cada
            persona y brindar orientación durante cada paso del proceso de compra o
            venta.
          </p>
          <p>
            Creo que comprar o vender una casa es una de las decisiones más
            importantes que una persona puede tomar, y mi meta es hacer que la
            experiencia sea emocionante, sencilla y empoderadora. Me enfoco en
            construir confianza, brindar apoyo honesto y crear relaciones duraderas
            que van más allá de una transacción.
          </p>
          <p>
            También me apasiona apoyar y conectar con la comunidad Latina a través
            de bienes raíces, educación y oportunidades que ayuden a las familias a
            crecer e invertir en su futuro. Para mí, bienes raíces es mucho más que
            propiedades; se trata de ayudar a las personas a alcanzar sus sueños y
            crear un lugar al que puedan llamar hogar.
          </p>
        </div>
      )}
    </div>
  );
}

function MemberCard({
  member,
  onOpen,
}: {
  member: TeamMember;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col rounded-3xl overflow-hidden bg-white border border-charcoal/[0.07] shadow-[0_14px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_24px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className={`object-cover ${member.objectPosition ?? ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/5">
            <span className="font-serif text-[3rem] font-light text-charcoal/30">
              {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-7">
        <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-2">
          {member.role}
        </p>
        <h3 className="font-serif text-[1.6rem] font-light text-charcoal leading-tight mb-4">
          {member.name}
        </h3>

        {/* Truncated bio */}
        <p className="text-[14.5px] leading-7 text-charcoal/70 line-clamp-3 mb-5">
          {member.bioShort}
        </p>

        {/* Contact */}
        <div className="mt-auto space-y-2 mb-5">
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-2 text-[13px] text-charcoal/70 hover:text-charcoal transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {member.phoneDisplay}
          </a>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-[13px] text-charcoal/70 hover:text-charcoal transition-colors truncate"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {member.email}
          </a>
        </div>

        <button
          onClick={onOpen}
          className="w-full rounded-full border border-charcoal/20 py-2.5 text-[11px] uppercase tracking-[0.25em] text-charcoal/70 transition-all duration-300 hover:bg-charcoal hover:text-white hover:border-charcoal"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

function Modal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_120px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/8 text-charcoal/60 hover:bg-charcoal hover:text-white transition-all duration-300"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
            <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-[320px_1fr] gap-0">
          {/* Photo column */}
          <div className="relative sm:rounded-l-3xl overflow-hidden bg-warm-gray" style={{ minHeight: 420 }}>
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className={`object-cover object-top`}
                sizes="320px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/5">
                <span className="font-serif text-[3rem] font-light text-charcoal/30">
                  {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
            )}
          </div>

          {/* Content column */}
          <div className="p-7 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-1">
              {member.role}
            </p>
            <h2 className="font-serif text-[1.9rem] font-light text-charcoal leading-tight mb-1">
              {member.name}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-6">
              <a href={`tel:${member.phone}`} className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors">
                {member.phoneDisplay}
              </a>
              <a href={`mailto:${member.email}`} className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors">
                {member.email}
              </a>
            </div>

            <div className="border-t border-charcoal/8 pt-6">
              {member.bioFull}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [open, setOpen] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="py-20 sm:py-28 bg-warm-gray">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/50 mb-4">
              Our People
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
              Meet the Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <MemberCard
                key={member.name}
                member={member}
                onOpen={() => setOpen(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {open && <Modal member={open} onClose={() => setOpen(null)} />}
    </>
  );
}
