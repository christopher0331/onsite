import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "East Pierce County Homes for Sale | MLS Listings",
  description: "Browse East Pierce County homes for sale. Filter MLS listings in Lake Tapps, Bonney Lake, Sumner, Puyallup and nearby, plus OnSite agent inventory.",
  path: "/listings",
});

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
