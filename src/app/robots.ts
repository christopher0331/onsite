import type { MetadataRoute } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

/**
 * AI training and AI-search crawlers. A bot that matches one of these
 * user-agents ignores the `*` group, so these rules must not be looser
 * than `*`. The `*` group has no Disallow lines (only Allow: /), so there
 * is nothing to copy. Googlebot, Bingbot, and `*` are left unchanged.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Bytespider",
  "Applebot-Extended",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "cohere-ai",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "Timpibot",
];

/**
 * Prefixes that serve NWMLS / MLS Grid listing records.
 * `/listings` also covers detail pages at `/listings/[mlsNumber]`.
 * `/api/listings` covers search, suggest, map, ours, detail, and QR.
 */
const LISTING_DATA_PATHS = [
  "/listings",
  "/our-listings",
  "/open-houses",
  "/api/listings",
  "/api/statistics",
];

export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_CRAWLERS,
        disallow: LISTING_DATA_PATHS,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
