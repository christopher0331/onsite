import type { MetadataRoute } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
