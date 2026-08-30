import type { NextConfig } from "next";
import { legacy301Redirects } from "./src/lib/legacy-301-redirects";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "recharts",
      "@vis.gl/react-google-maps",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.repliers.io",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      ...legacy301Redirects,
      {
        source:
          "/blog/2026-pierce-county-housing-market-update-what-buyers-and-sellers-in-bonney-lake-lake-tapps-and-sumner-should-expect",
        destination:
          "/blog/pierce-county-real-estate-forecast-2026-trends-predictions-tips-for-sellers",
        permanent: true,
      },
      {
        source: "/blog/are-homes-still-selling-over-asking-price-in-pierce-county",
        destination: "/blog/is-it-a-buyers-or-sellers-market-in-pierce-county-right-now",
        permanent: true,
      },
      {
        source: "/blog/do-i-need-to-disclose-everything-when-selling-my-home",
        destination: "/blog/why-pre-listing-inspections-give-sellers-the-upper-hand",
        permanent: true,
      },
      {
        source: "/blog/hoa-document-requirements-what-sellers-need-to-know",
        destination: "/blog/the-ultimate-pre-sale-home-prep-checklist",
        permanent: true,
      },
      {
        source: "/blog/how-interest-rates-are-affecting-home-sales-in-2025",
        destination: "/blog/will-interest-rates-impact-home-sales-in-pierce-county-this-year",
        permanent: true,
      },
      {
        source: "/blog/how-listing-descriptions-influence-buyer-behavior",
        destination: "/blog/the-power-of-first-impressions-in-real-estate",
        permanent: true,
      },
      {
        source: "/blog/how-the-right-agent-makes-all-the-difference-when-selling",
        destination: "/blog/how-you-get-the-most-money-when-selling-your-home",
        permanent: true,
      },
      {
        source: "/blog/how-to-attract-more-buyers-with-virtual-tours-and-online-marketing",
        destination: "/real-estate-marketing",
        permanent: true,
      },
      {
        source: "/blog/how-to-prepare-your-home-for-a-faster-more-profitable-sale",
        destination: "/blog/prep-your-pierce-county-home-for-a-successful-sale",
        permanent: true,
      },
      {
        source: "/blog/is-staging-your-home-worth-it-heres-what-sellers-should-know",
        destination: "/preparation-and-staging",
        permanent: true,
      },
      {
        source: "/blog/is-the-housing-market-headed-for-a-crash-in-2025",
        destination:
          "/blog/pierce-county-housing-market-what-stability-really-looks-like-after-the-frenzy",
        permanent: true,
      },
      {
        source: "/blog/should-you-sell-your-home-as-is-or-make-repairs-first",
        destination: "/blog/should-i-sell-my-house-as-is-or-make-repairs",
        permanent: true,
      },
      {
        source: "/blog/should-you-sell-your-home-as-is-or-make-repairs-first-2",
        destination: "/blog/should-i-sell-my-house-as-is-or-make-repairs",
        permanent: true,
      },
      {
        source: "/blog/top-5-mistakes-sellers-make-and-how-to-avoid-them",
        destination: "/blog/top-mistakes-sellers-make-that-delay-closings",
        permanent: true,
      },
      {
        source: "/blog/whats-worth-upgrading-before-you-sell-and-whats-not",
        destination: "/blog/5-simple-improvements-that-can-help-your-home-sell-faster",
        permanent: true,
      },
      {
        source: "/blog/why-professional-photography-still-sells-homes-in-2025",
        destination: "/real-estate-marketing",
        permanent: true,
      },
      {
        source: "/blog/will-home-prices-drop-in-washington-in-2025",
        destination: "/blog/are-home-prices-rising-or-falling-in-pierce-county-in-2025",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
