import type { Neighborhood } from "@/lib/service-areas/types";

// Micro-local proof of work — review/testimonial cards filtered to the zip
// codes attached to this neighborhood spoke.

type Props = {
  neighborhood: Neighborhood;
};

export default function LocalReviews({ neighborhood }: Props) {
  if (neighborhood.reviews.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
            Local Proof of Work
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
            Reviews from{" "}
            <span>
              {neighborhood.zipCodes.join(", ")}.
            </span>
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-charcoal/85">
            Filtered to clients inside the {neighborhood.name} zip set —
            same submarket, same comp pool, same prep playbook you&apos;ll be
            operating in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {neighborhood.reviews.map((r, idx) => (
            <figure
              key={`${r.author}-${idx}`}
              className="rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-8 shadow-[0_14px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-1 mb-5 text-charcoal">
                {Array.from({ length: r.rating ?? 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-serif text-[1.35rem] font-light leading-[1.55] text-charcoal/90 mb-6">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                {r.author} · {r.zip}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
