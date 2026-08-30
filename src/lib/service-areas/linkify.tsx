import Link from "next/link";
import { CITIES, NEIGHBORHOODS } from "@/lib/service-areas/data";

export type ServiceAreaMention = {
  name: string;
  href: string;
};

/** Neighborhood names that are too generic to auto-link in prose. */
const SKIP_NEIGHBORHOOD_SLUGS = new Set(["summit"]);

const NAME_ALIASES: { name: string; href: string }[] = [
  { name: "Clarks Creek", href: "/service-areas/puyallup/clarks-creek" },
];

function buildMentions(): ServiceAreaMention[] {
  const mentions: ServiceAreaMention[] = [
    ...CITIES.map((city) => ({
      name: city.name,
      href: `/service-areas/${city.slug}`,
    })),
    ...NEIGHBORHOODS.filter((n) => !SKIP_NEIGHBORHOOD_SLUGS.has(n.slug)).map(
      (n) => ({
        name: n.name,
        href: `/service-areas/${n.citySlug}/${n.slug}`,
      })
    ),
    ...NAME_ALIASES,
  ];

  return mentions.sort((a, b) => b.name.length - a.name.length);
}

let cachedMentions: ServiceAreaMention[] | null = null;

export function getServiceAreaMentions(): ServiceAreaMention[] {
  if (!cachedMentions) cachedMentions = buildMentions();
  return cachedMentions;
}

export type ServiceAreaToken = string | { text: string; href: string };

export function tokenizeServiceAreaMentions(
  text: string,
  options?: { oncePerHref?: boolean; usedHrefs?: Set<string> }
): ServiceAreaToken[] {
  const oncePerHref = options?.oncePerHref ?? true;
  const usedHrefs = options?.usedHrefs ?? new Set<string>();
  const mentions = getServiceAreaMentions();
  const pattern = mentions
    .map((m) => m.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const re = new RegExp(`\\b(?:${pattern})\\b(?!['’]s\\b)`, "gi");

  const tokens: ServiceAreaToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const matched = match[0];
    const target = mentions.find(
      (m) => m.name.toLowerCase() === matched.toLowerCase()
    );
    if (!target) continue;
    if (oncePerHref && usedHrefs.has(target.href)) continue;

    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    tokens.push({ text: matched, href: target.href });
    usedHrefs.add(target.href);
    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length ? tokens : [text];
}

const BLOG_LINK_CLASS =
  "underline decoration-charcoal/25 underline-offset-[0.22em] transition-colors hover:decoration-charcoal/70";

export function ServiceAreaLinkedText({
  text,
  usedHrefs,
  className = BLOG_LINK_CLASS,
}: {
  text: string;
  usedHrefs?: Set<string>;
  className?: string;
}) {
  const tokens = tokenizeServiceAreaMentions(text, { usedHrefs });

  return (
    <>
      {tokens.map((token, i) =>
        typeof token === "string" ? (
          token
        ) : (
          <Link key={`${token.href}-${i}`} href={token.href} className={className}>
            {token.text}
          </Link>
        )
      )}
    </>
  );
}
