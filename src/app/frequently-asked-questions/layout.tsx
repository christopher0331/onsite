import type { Metadata } from "next";
import { allFaqItems } from "@/lib/faq-data";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Real Estate FAQ | Buying & Selling in Pierce County | OnSite ReGroup",
  description:
    "Answers to common questions about buying and selling a home in Pierce County — timelines, costs, escrow, inspections, appraisals, and how to get started with OnSite ReGroup.",
  path: "/frequently-asked-questions",
});

function FaqPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems().map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqPageSchema />
      {children}
    </>
  );
}
