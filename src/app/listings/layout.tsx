import type { Metadata } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const url = `${getCanonicalBaseUrl()}/listings`;

export const metadata: Metadata = {
  title: "Homes for Sale | Pierce County Listings | OnSite ReGroup",
  description:
    "Browse Pierce County homes for sale with OnSite ReGroup. Filter by city, status, and map to find active listings across Lake Tapps, Bonney Lake, Sumner, and Puyallup.",
  alternates: { canonical: url },
  openGraph: {
    title: "Homes for Sale | Pierce County Listings | OnSite ReGroup",
    description:
      "Browse Pierce County homes for sale with OnSite ReGroup. Filter by city, status, and map to find active listings across Lake Tapps, Bonney Lake, Sumner, and Puyallup.",
    url,
    siteName: "OnSite ReGroup",
    locale: "en_US",
    type: "website",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
