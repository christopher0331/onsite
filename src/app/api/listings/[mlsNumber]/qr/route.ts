import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { getCanonicalBaseUrl } from "@/lib/site-url";

export const runtime = "nodejs";

// Generates a print-ready QR PNG that encodes the public listing URL, so
// agents can pull it straight off the listing page for flyers, yard-sign
// riders, or business cards without any separate tool or login.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ mlsNumber: string }> }
) {
  const { mlsNumber } = await params;
  const { searchParams } = new URL(req.url);

  const sizeParam = Number(searchParams.get("size"));
  const size = Number.isFinite(sizeParam) ? Math.min(Math.max(sizeParam, 128), 2000) : 1024;

  const listingUrl = `${getCanonicalBaseUrl()}/listings/${encodeURIComponent(mlsNumber)}`;

  try {
    const png = await QRCode.toBuffer(listingUrl, {
      type: "png",
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#1a1a18",
        light: "#ffffffff",
      },
    });

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="${mlsNumber}-qr.png"`,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}
