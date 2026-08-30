import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Our Listings | OnSite Real Estate Group",
  description:
    "Browse every active, pending, and sold listing from Timber Real Estate, André Bohall, and Cindie across Washington.",
  path: "/our-listings",
});

export default function OurListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
