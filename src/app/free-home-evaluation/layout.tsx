import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Free Home Evaluation | Pierce County Real Estate | OnSite ReGroup",
  description:
    "Request a free home evaluation from OnSite ReGroup. Local pricing insight for Lake Tapps, Bonney Lake, Sumner, Puyallup, and nearby Pierce County.",
  path: "/free-home-evaluation",
});

export default function FreeHomeEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
