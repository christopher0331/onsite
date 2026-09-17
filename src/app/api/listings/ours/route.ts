import { NextRequest, NextResponse } from "next/server";
import { queryOnsiteListings } from "@/lib/listing-fetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  try {
    const data = await queryOnsiteListings({
      status: searchParams.get("status") || "All",
      page: Number(searchParams.get("page") || "1"),
      pageSize: Number(searchParams.get("pageSize") || "24"),
      city: searchParams.get("city"),
      state: searchParams.get("state") || "WA",
      sortBy: searchParams.get("sortBy") || "updatedOnDesc",
      scope: searchParams.get("scope"),
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
