import type { Metadata } from "next";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const url = `${getCanonicalBaseUrl()}/free-home-evaluation`;

export const metadata: Metadata = {
  title: "Free Home Evaluation | Pierce County Real Estate | OnSite ReGroup",
  description:
    "Request a free home evaluation from OnSite ReGroup. Local pricing insight for Lake Tapps, Bonney Lake, Sumner, Puyallup, and nearby Pierce County.",
  alternates: { canonical: url },
  openGraph: {
    title: "Free Home Evaluation | Pierce County Real Estate | OnSite ReGroup",
    description:
      "Request a free home evaluation from OnSite ReGroup. Local pricing insight for Lake Tapps, Bonney Lake, Sumner, Puyallup, and nearby Pierce County.",
    url,
    siteName: "OnSite ReGroup",
    locale: "en_US",
    type: "website",
  },
};

export default function FreeHomeEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
