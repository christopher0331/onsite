const TBC_ORIGIN = "https://tappsbusinessconnect.com";

const CATEGORY_ROOTS = [
  "/home-services",
  "/finance-professional",
  "/health-wellness",
  "/lifestyle-personal-services",
  "/food-hospitality",
  "/trades-specialty",
] as const;

const BUSINESS_CONNECT_PAGES: Record<string, string> = {
  "/business-connect": "/",
  "/business-connect/apply": "/apply",
  "/business-connect/rsvp": "/rsvp",
  "/business-connect/about": "/about",
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** Permanent off-site destination for old OnSite TBC URLs. */
export function getTbcRedirectUrl(pathname: string): string | null {
  const path = normalizePath(pathname);

  const mappedPage = BUSINESS_CONNECT_PAGES[path];
  if (mappedPage) {
    return mappedPage === "/" ? `${TBC_ORIGIN}/` : `${TBC_ORIGIN}${mappedPage}`;
  }

  if (path === "/business-connect-profiles") {
    return `${TBC_ORIGIN}/directory`;
  }

  const profileMatch = path.match(/^\/business-connect-profiles\/([^/]+)$/);
  if (profileMatch) {
    return `${TBC_ORIGIN}/profiles/${profileMatch[1]}`;
  }

  for (const root of CATEGORY_ROOTS) {
    if (path === root) {
      return `${TBC_ORIGIN}${root}`;
    }
    if (path.startsWith(`${root}/`)) {
      return `${TBC_ORIGIN}${root}`;
    }
  }

  if (path.startsWith("/business-connect")) {
    return `${TBC_ORIGIN}/`;
  }

  return null;
}
