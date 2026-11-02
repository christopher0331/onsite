import type { Metadata } from "next";
import { SITE_BRAND } from "@/lib/nap";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Free Home Evaluation in Pierce County, WA",
  description: `Request a free home evaluation from ${SITE_BRAND}. Local pricing insight for Lake Tapps, Bonney Lake, Sumner, Puyallup and nearby Pierce County.`,
  path: "/free-home-evaluation",
});

export default function FreeHomeEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
