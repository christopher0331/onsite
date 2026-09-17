import { NextRequest, NextResponse } from "next/server";
import { fetchListingByMlsNumber } from "@/lib/listing-fetch";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mlsNumber: string }> }
) {
  const { mlsNumber } = await params;

  try {
    const listing = await fetchListingByMlsNumber(mlsNumber);
    if (listing) return NextResponse.json(listing);
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
