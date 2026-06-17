import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Listings | OnSite Real Estate Group",
  description:
    "Browse every active, pending, and sold listing from Timber Real Estate, André Bohall, and Cindie across Washington.",
};

export default function OurListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
