import type { ReactNode } from "react";
import type { ServiceAreaArticle as Article } from "@/lib/service-areas/articles";

type Props = {
  article: Article;
};

/** Split markdown body into paragraphs and inline links. No full MDX. */
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

export default function ServiceAreaArticle({ article }: Props) {
  const paragraphs = article.bodyMarkdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      className="py-20 sm:py-28 bg-warm-gray/40 border-t border-charcoal/8"
      aria-labelledby="service-area-article-heading"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-5">
          Local Guide
        </p>
        <h2
          id="service-area-article-heading"
          className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1] mb-6"
        >
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="text-[15.5px] leading-8 text-charcoal/70 mb-10 border-l-2 border-[#3daf3d]/50 pl-5">
            {article.excerpt}
          </p>
        ) : null}
        <div className="space-y-6 text-[16px] leading-8 text-charcoal">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{renderInlineMarkdown(paragraph)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
