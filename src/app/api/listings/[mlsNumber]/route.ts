import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mlsNumber: string }> }
) {
  const { mlsNumber } = await params;

  try {
    const res = await fetch(`https://api.repliers.io/listings/${mlsNumber}`, {
      headers: {
        "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Listing not found" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
