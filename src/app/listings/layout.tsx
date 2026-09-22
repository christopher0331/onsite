import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Homes for Sale | East Pierce County Listings | OnSite Real Estate Group",
  description:
    "Browse East Pierce County homes for sale with OnSite ReGroup. Filter Lake Tapps, Bonney Lake, Sumner, Puyallup, and nearby MLS listings — plus OnSite agent inventory.",
  path: "/listings",
});

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
