import type { ReactNode } from "react";
import type {
  LocalAttraction,
  ServiceAreaDiscover,
} from "@/lib/service-areas/discover/types";

export type { LocalAttraction, ServiceAreaDiscover };

type Props = {
  cityName: string;
  discover: ServiceAreaDiscover;
  neighborhoodName?: string;
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//i.test(href);
    nodes.push(
      <a
        key={`d-link-${key++}`}
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-medium text-[#3daf3d] underline decoration-[#3daf3d]/40 underline-offset-4 hover:decoration-[#3daf3d] transition-colors"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function AboutTheArea({
  cityName,
  discover,
  neighborhoodName,
}: Props) {
  const areaName = neighborhoodName ?? cityName;

  return (
    <section
      className="py-20 sm:py-28 bg-white border-t border-charcoal/8"
      aria-labelledby="discover-area-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
            Local Context
          </p>
          <h2
            id="discover-area-heading"
            className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]"
          >
            Discover {areaName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="font-serif text-[clamp(1.4rem,2.5vw,1.85rem)] font-light text-charcoal leading-[1.15] mb-6">
              Explore {areaName}&apos;s top attractions &amp; local gems
            </h3>
            <ul className="space-y-5">
              {discover.attractions.map((attraction) => (
                <li key={attraction.name} className="leading-7">
                  <a
                    href={attraction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#3daf3d] hover:underline underline-offset-4"
                  >
                    {attraction.name}
                    <svg
                      className="w-3.5 h-3.5 shrink-0 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                  <span className="block mt-1.5 text-[15px] leading-7 text-charcoal/75">
                    {attraction.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[clamp(1.4rem,2.5vw,1.85rem)] font-light text-charcoal leading-[1.15] mb-6">
              Local living &amp; community
            </h3>
            <div className="space-y-5 text-[15.5px] leading-8 text-charcoal/80">
              {discover.localLivingMarkdown.map((paragraph, i) => (
                <p key={i}>{renderInlineMarkdown(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
