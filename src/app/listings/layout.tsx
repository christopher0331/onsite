import type { Metadata } from "next";
import { SITE_BRAND } from "@/lib/nap";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: `Homes for Sale | East Pierce County Listings | ${SITE_BRAND}`,
  description: `Browse East Pierce County homes for sale with ${SITE_BRAND}. Filter Lake Tapps, Bonney Lake, Sumner, Puyallup, and nearby MLS listings — plus OnSite agent inventory.`,
  path: "/listings",
});

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
