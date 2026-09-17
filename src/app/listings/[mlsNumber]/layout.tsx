import type { Metadata } from "next";
import { getListingByMlsNumber } from "@/lib/listing-fetch";
import { listingDetailMetadata } from "@/lib/listing-seo";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mlsNumber: string }>;
}): Promise<Metadata> {
  const { mlsNumber } = await params;
  const listing = await getListingByMlsNumber(mlsNumber);
  return listingDetailMetadata(mlsNumber, listing);
}

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
