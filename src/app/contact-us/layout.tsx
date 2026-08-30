import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Contact OnSite ReGroup | Pierce County Real Estate Agents",
  description:
    "Call or email André, Cindie, or Deisy at OnSite ReGroup. Pierce County real estate questions, selling, buying, and home evaluations.",
  path: "/contact-us",
});

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
