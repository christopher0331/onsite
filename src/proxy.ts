import { NextRequest, NextResponse } from "next/server";
import { getTbcRedirectUrl } from "@/lib/tbc-redirect";

export function proxy(request: NextRequest) {
  const destination = getTbcRedirectUrl(request.nextUrl.pathname);
  if (destination) {
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/business-connect",
    "/business-connect/:path*",
    "/business-connect-profiles",
    "/business-connect-profiles/:path*",
    "/home-services/:path*",
    "/home-services",
    "/finance-professional",
    "/finance-professional/:path*",
    "/health-wellness",
    "/health-wellness/:path*",
    "/lifestyle-personal-services",
    "/lifestyle-personal-services/:path*",
    "/food-hospitality",
    "/food-hospitality/:path*",
    "/trades-specialty",
    "/trades-specialty/:path*",
  ],
};
