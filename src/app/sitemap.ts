import type { MetadataRoute } from "next";
import { allMembers } from "@/lib/business-connect-data";
import blogData from "@/lib/blog-data.json";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://onsiteregroup.com";

// ─── FEATURED HOMES ──────────────────────────────────────────────────────────
// When you add or remove a listing in featured-homes/[slug]/page.tsx,
// add or remove the slug here too.
const featuredHomeSlugs = [
  "charming-downtown-puyallup-home",
  "entertainers-dream-home-with-pickleball-court-on-1-2-acre",
  "luxury-rambler-on-15-acres-with-rainier-views",
];

// ─── SOLD HOMES ───────────────────────────────────────────────────────────────
// Same rule: keep in sync with sold-homes/[slug]/page.tsx.
const soldHomeSlugs = [
  "luxury-mid-century-modern-in-marine-hills",
  "secluded-5-acre-dual-residence-in-graham",
  "secluded-rambler-on-1-7-acres-in-buckley",
  "modern-home-in-thriving-sumner-valley",
  "modern-home-in-sumner-valley",
  "single-story-home-in-gem-heights-puyallup",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── STATIC CORE PAGES ───────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/about-us`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact-us`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/buy-home`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/sell-your-home`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/free-home-evaluation`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/listings`, priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE_URL}/sold-homes`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE_URL}/frequently-asked-questions`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/dmca-notice`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/social-hub`, priority: 0.5, changeFrequency: "weekly" },
  ];

  // ─── SELLING PROCESS PAGES ───────────────────────────────────────────────
  const sellingPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/selling-process`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/sellers-guide`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/preparation-and-staging`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/real-estate-marketing`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/negotiation-closing`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/success-stories`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/selling-tips`, priority: 0.6, changeFrequency: "monthly" },
  ];

  // ─── INSIGHTS / BLOG PAGES ───────────────────────────────────────────────
  const insightsPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/trends-insights`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE_URL}/insights`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE_URL}/market-trends`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];

  // ─── BUSINESS CONNECT PAGES ──────────────────────────────────────────────
  const tbcPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/business-connect`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/business-connect/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/business-connect/apply`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/business-connect/rsvp`, priority: 0.8, changeFrequency: "weekly" },
  ];

  // ─── TBC CATEGORY PAGES ──────────────────────────────────────────────────
  const tbcCategoryPages: MetadataRoute.Sitemap = [
    "home-services",
    "finance-professional",
    "health-wellness",
    "lifestyle-personal-services",
    "food-hospitality",
    "trades-specialty",
  ].map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  // ─── TBC MEMBER PROFILES — auto-synced from business-connect-data.ts ─────
  const memberProfiles: MetadataRoute.Sitemap = allMembers.map((m) => ({
    url: `${BASE_URL}/business-connect-profiles/${m.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  // ─── BLOG POSTS — auto-synced from blog-data.json ────────────────────────
  const blogPosts: MetadataRoute.Sitemap = Object.values(
    blogData as Record<string, { slug: string }>
  ).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  // ─── FEATURED HOME DETAIL PAGES ──────────────────────────────────────────
  const featuredHomes: MetadataRoute.Sitemap = featuredHomeSlugs.map((slug) => ({
    url: `${BASE_URL}/featured-homes/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  // ─── SOLD HOME DETAIL PAGES ──────────────────────────────────────────────
  const soldHomes: MetadataRoute.Sitemap = soldHomeSlugs.map((slug) => ({
    url: `${BASE_URL}/sold-homes/${slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  return [
    ...staticPages,
    ...sellingPages,
    ...insightsPages,
    ...tbcPages,
    ...tbcCategoryPages,
    ...memberProfiles,
    ...blogPosts,
    ...featuredHomes,
    ...soldHomes,
  ].map((entry) => ({ ...entry, lastModified: now }));
}
