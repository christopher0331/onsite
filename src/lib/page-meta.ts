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
