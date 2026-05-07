import { NextRequest, NextResponse } from "next/server";
import { isMainWebsiteHost } from "@/lib/site-visibility";

const IDX_ROUTES = ["/listings", "/featured-homes", "/sold-homes"];

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const isMainWebsite = isMainWebsiteHost(hostname);
  const isIdxRoute = IDX_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isMainWebsite && isIdxRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/listings/:path*", "/featured-homes/:path*", "/sold-homes/:path*"],
};
