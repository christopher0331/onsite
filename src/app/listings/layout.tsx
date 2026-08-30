import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Homes for Sale | Pierce County Listings | OnSite ReGroup",
  description:
    "Browse Pierce County homes for sale with OnSite ReGroup. Filter by city, status, and map to find active listings across Lake Tapps, Bonney Lake, Sumner, and Puyallup.",
  path: "/listings",
});

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
