import type { ReactNode } from "react";
import type { ServiceAreaArticle as Article } from "@/lib/service-areas/articles";
import {
  articleToc,
  buildArticleSections,
  type ArticleBlock,
  type ArticleSection,
} from "@/lib/service-areas/article-layout";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nap";

type Props = {
  article: Article;
  /** Short place name for the sidebar card, e.g. "Sumner" or "North Sumner". */
  areaName?: string;
  /** Query value for the free home evaluation link. */
  areaQuery?: string;
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";
const focusRingOnDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Split inline markdown links. Wording and hrefs are unchanged. */
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
        key={`link-${key++}`}
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`font-medium text-[#0e6a30] underline decoration-[#0e6a30]/35 underline-offset-4 hover:decoration-[#0e6a30] ${focusRing} rounded-sm`}
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

function formatUpdated(iso: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function BlockView({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") return null;

  if (block.type === "h3") {
    return (
      <h3 className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] font-light leading-snug text-charcoal">
        {renderInlineMarkdown(block.text)}
      </h3>
    );
  }

  if (block.type === "h4") {
    return (
      <h4 className="font-serif text-[1.15rem] font-light leading-snug text-charcoal">
        {renderInlineMarkdown(block.text)}
      </h4>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-charcoal/70">
        {block.items.map((item, i) => (
          <li key={i} className="pl-1">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "ol") {
    return (
      <ol className="list-decimal space-y-2 pl-5 marker:text-charcoal/70">
        {block.items.map((item, i) => (
          <li key={i} className="pl-1">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-l-2 border-[#0e6a30] bg-[#f7f4ef] px-5 py-4 text-charcoal">
        {renderInlineMarkdown(block.text)}
      </blockquote>
    );
  }

  return <p>{renderInlineMarkdown(block.text)}</p>;
}

function TocLinks({ items }: { items: { id: string; label: string }[] }) {
  return (
    <ol className="space-y-0.5">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`flex gap-3 rounded-xl px-2 py-2 text-[14.5px] leading-6 text-charcoal hover:bg-charcoal/[0.04] ${focusRing}`}
          >
            <span
              className="w-6 shrink-0 pt-0.5 text-[11px] tabular-nums tracking-[0.14em] text-mid-gray"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function GuideCard({
  section,
  index,
}: {
  section: ArticleSection;
  index: number;
}) {
  const accent = index % 2 === 1;
  return (
    <div
      id={section.id}
      tabIndex={-1}
      className={`scroll-mt-24 rounded-3xl border border-charcoal/[0.08] bg-white px-6 py-7 shadow-[0_14px_40px_rgba(0,0,0,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal sm:px-8 sm:py-8 lg:scroll-mt-32 ${
        accent ? "border-l-[3px] border-l-[#0e6a30]" : ""
      }`}
    >
      <div className="flex gap-4 sm:gap-6">
        <p
          className="hidden w-8 shrink-0 pt-1 font-serif text-[13px] tracking-[0.16em] text-mid-gray sm:block"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <div className="min-w-0 max-w-[72ch] space-y-4 text-[16.5px] leading-8 text-charcoal">
          {section.heading ? (
            <h2 className="font-serif text-[clamp(1.35rem,2vw,1.75rem)] font-light leading-tight text-charcoal">
              {renderInlineMarkdown(section.heading)}
            </h2>
          ) : null}
          {section.blocks.map((block, blockIndex) => (
            <BlockView key={blockIndex} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GuideAside({
  toc,
  areaName,
  evaluationHref,
  updated,
}: {
  toc: { id: string; label: string }[];
  areaName?: string;
  evaluationHref: string;
  updated: string | null;
}) {
  return (
    <aside className="mt-10 lg:sticky lg:top-28 lg:mt-0 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
      <div className="flex flex-col gap-4">
        {toc.length >= 2 ? (
          <nav
            aria-labelledby="service-area-toc-desktop"
            className="hidden rounded-3xl border border-charcoal/[0.08] bg-white p-5 shadow-[0_14px_40px_rgba(0,0,0,0.06)] lg:block"
          >
            <p
              id="service-area-toc-desktop"
              className="mb-3 px-2 text-[11px] uppercase tracking-[0.28em] text-mid-gray"
            >
              On this page
            </p>
            <TocLinks items={toc} />
          </nav>
        ) : null}

        <div className="rounded-3xl bg-charcoal p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
            Key facts
          </p>
          <p className="mt-3 font-serif text-[1.65rem] font-light leading-[1.15]">
            {areaName ? `Next step in ${areaName}` : "Next step"}
          </p>
          {updated ? (
            <p className="mt-3 text-[13px] leading-6 text-white/70">
              Guide updated {updated}
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={evaluationHref}
              className={`inline-flex items-center justify-center rounded-full bg-white px-5 py-3.5 text-center text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-white/90 ${focusRingOnDark}`}
            >
              Free Home Evaluation
            </a>
            <a
              href="/open-houses"
              className={`inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3.5 text-center text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 ${focusRingOnDark}`}
            >
              Open Houses
            </a>
            <a
              href={PHONE_HREF}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center text-[16px] font-medium tracking-wide text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${focusRingOnDark}`}
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function ServiceAreaArticle({
  article,
  areaName,
  areaQuery,
}: Props) {
  const sections = buildArticleSections(article.bodyMarkdown);
  const toc = articleToc(sections);
  const updated = formatUpdated(article.updatedAt);
  const evaluationHref = areaQuery
    ? `/free-home-evaluation?area=${encodeURIComponent(areaQuery)}`
    : "/free-home-evaluation";

  return (
    <section
      className="border-t border-charcoal/10 bg-[#f2ede6] py-16 sm:py-24"
      aria-labelledby="service-area-article-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21.5rem] lg:gap-x-14 xl:gap-x-16">
          <header className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray">
                Local Guide
              </p>
              {updated ? (
                <p className="text-[12px] tracking-wide text-mid-gray">
                  Updated {updated}
                </p>
              ) : null}
            </div>
            <h2
              id="service-area-article-heading"
              className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-charcoal"
            >
              {article.title}
            </h2>
            {article.excerpt ? (
              <p className="mt-6 max-w-[68ch] border-l-2 border-[#0e6a30] pl-5 text-[17px] leading-8 text-charcoal/80">
                {article.excerpt}
              </p>
            ) : null}
          </header>

          <div className="mt-8 min-w-0 lg:col-start-1 lg:mt-10">
            {toc.length >= 2 ? (
              <details className="group mb-6 rounded-3xl border border-charcoal/[0.08] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.05)] lg:hidden">
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[12px] uppercase tracking-[0.22em] text-charcoal [&::-webkit-details-marker]:hidden ${focusRing}`}
                >
                  <span id="service-area-toc-mobile">On this page</span>
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div
                  className="border-t border-charcoal/[0.08] px-3 py-3"
                  role="navigation"
                  aria-labelledby="service-area-toc-mobile"
                >
                  <TocLinks items={toc} />
                </div>
              </details>
            ) : null}

            <div className="space-y-4 sm:space-y-5">
              {sections.map((section, index) => (
                <GuideCard key={section.id} section={section} index={index} />
              ))}
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <GuideAside
              toc={toc}
              areaName={areaName}
              evaluationHref={evaluationHref}
              updated={updated}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
