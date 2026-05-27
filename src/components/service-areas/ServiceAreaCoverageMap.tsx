import type { PlannedServiceArea } from "@/lib/service-areas/types";

type Props = {
  areas: PlannedServiceArea[];
};

export default function ServiceAreaCoverageMap({ areas }: Props) {
  const zipCodes = Array.from(new Set(areas.flatMap((a) => a.zipCodes))).sort();

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-charcoal/8">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
            Service Area Coverage Map
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.08]">
            County corridor from <span>Puyallup to Seattle.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-charcoal/80">
            Google Maps boundary view for our Pierce + King County service corridor, plus
            the ZIP codes we actively target for valuation, listing prep, and negotiation.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_14px_50px_rgba(0,0,0,0.1)]">
          <iframe
            title="OnSite service area county coverage map"
            src="https://www.google.com/maps?q=Pierce%20County%20WA%20to%20King%20County%20WA&output=embed"
            className="h-[460px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {zipCodes.map((zip) => (
            <a
              key={zip}
              href={`https://www.google.com/maps/search/${zip}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/80 hover:border-charcoal/35 hover:text-charcoal transition-colors"
            >
              ZIP {zip}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
