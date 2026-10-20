import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PendingActivity from "@/components/PendingActivity";
import { SITE_BRAND } from "@/lib/nap";
import { pageMetadata } from "@/lib/page-meta";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: `Pending Listings | ${SITE_BRAND}`,
  description:
    "OnSite Real Estate Group listings by André and Cindie Bohall currently pending in Pierce County, updated automatically from NWMLS.",
  path: "/pending",
});

export default function PendingPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <PendingActivity limit={24} showViewAll={false} headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
