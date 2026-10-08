import type { MetadataRoute } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

/**
 * A bot that matches a specific group ignores the `*` group. The `*` group
 * has no Disallow lines (only Allow: /), so there is nothing to copy.
 * Googlebot, Bingbot, and `*` are left unchanged.
 */

/** Training and other AI crawlers. Also blocked from service-area pages. */
const AI_TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
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

/** AI search and citation agents. Service-area pages stay allowed. */
const AI_SEARCH_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Perplexity-User",
  "PerplexityBot",
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
        userAgent: AI_TRAINING_CRAWLERS,
        disallow: [...LISTING_DATA_PATHS, "/service-areas/"],
      },
      {
        userAgent: AI_SEARCH_CRAWLERS,
        disallow: LISTING_DATA_PATHS,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
