import { NextRequest, NextResponse } from "next/server";
import { isMainWebsiteHost } from "@/lib/site-visibility";

const IDX_ROUTES = ["/listings", "/featured-homes", "/sold-homes"];

const TBC_URL = "https://tappsbusinessconnect.com";
const TBC_ROUTES = [
  "/business-connect",
  "/business-connect-profiles",
  "/home-services",
  "/finance-professional",
  "/health-wellness",
  "/lifestyle-personal-services",
  "/food-hospitality",
  "/trades-specialty",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  const isMainWebsite = isMainWebsiteHost(hostname);

  // Tapps Business Connect content lives on tappsbusinessconnect.com now —
  // permanently redirect every internal TBC URL there, regardless of host.
  const isTbcRoute = TBC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (isTbcRoute) {
    return NextResponse.redirect(TBC_URL, 308);
  }

  const isIdxRoute = IDX_ROUTES.some((route) => pathname.startsWith(route));
  if (isMainWebsite && isIdxRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/listings/:path*",
    "/featured-homes/:path*",
    "/sold-homes/:path*",
    "/business-connect",
    "/business-connect/:path*",
    "/business-connect-profiles/:path*",
    "/home-services/:path*",
    "/finance-professional/:path*",
    "/health-wellness/:path*",
    "/lifestyle-personal-services/:path*",
    "/food-hospitality/:path*",
    "/trades-specialty/:path*",
  ],
};
