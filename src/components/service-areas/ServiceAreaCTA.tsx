import Image from "next/image";
import Link from "next/link";

type Props = {
  headline: string;
  italicSuffix: string;
  image: string;
  areaLabel?: string;
  areaQuery?: string;
};

export default function ServiceAreaCTA({
  headline,
  italicSuffix,
  image,
  areaLabel,
  areaQuery,
}: Props) {
  const label = areaLabel ? areaLabel.trim() : "your area";
  const evaluationHref = areaQuery
    ? `/free-home-evaluation?area=${encodeURIComponent(areaQuery)}`
    : "/free-home-evaluation";
  const contactHref = areaQuery
    ? `/contact-us?area=${encodeURIComponent(areaQuery)}&topic=selling`
    : "/contact-us";
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="relative h-[52vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
          <Image
            src={image}
            alt="Ready to get started"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="hero-overlay" aria-hidden />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-4">
              Ready to list?
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.05]">
              {headline} <span>{italicSuffix}</span>
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={evaluationHref}
                className="inline-flex items-center justify-center bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
              >
                Get {label} Home Value
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
              >
                Talk to Local Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
