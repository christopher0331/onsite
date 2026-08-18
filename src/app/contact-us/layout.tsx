import type { Metadata } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const url = `${getCanonicalBaseUrl()}/contact-us`;

export const metadata: Metadata = {
  title: "Contact OnSite ReGroup | Pierce County Real Estate Agents",
  description:
    "Call or email André, Cindie, or Deisy at OnSite ReGroup. Pierce County real estate questions, selling, buying, and home evaluations.",
  alternates: { canonical: url },
  openGraph: {
    title: "Contact OnSite ReGroup | Pierce County Real Estate Agents",
    description:
      "Call or email André, Cindie, or Deisy at OnSite ReGroup. Pierce County real estate questions, selling, buying, and home evaluations.",
    url,
    siteName: "OnSite ReGroup",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
