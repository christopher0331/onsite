import type { Metadata } from "next";
import { SITE_BRAND } from "@/lib/nap";
import { getCanonicalBaseUrl } from "@/lib/site-url";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path beginning with `/`, or `/` for the homepage. */
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** Title, description, absolute canonical, and Open Graph for a route. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const base = getCanonicalBaseUrl();
  const url = path === "/" ? base : `${base}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_BRAND,
      locale: "en_US",
      type,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

/** Max title length we aim for in SERPs. */
export const MAX_TITLE_LENGTH = 60;

/** Appends " | OnSite Real Estate Group" only when the result stays ≤ 60 chars. */
export function titleWithBrand(base: string): string {
  const full = `${base} | ${SITE_BRAND}`;
  return full.length <= MAX_TITLE_LENGTH ? full : base;
}

/** First candidate (each tried with, then without, the brand suffix) that fits in 60 chars. */
export function fitTitle(...candidates: string[]): string {
  for (const c of candidates) {
    const t = titleWithBrand(c);
    if (t.length <= MAX_TITLE_LENGTH) return t;
  }
  return candidates[candidates.length - 1];
}
