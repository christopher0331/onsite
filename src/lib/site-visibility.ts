const MAIN_WEBSITE_HOSTS = new Set(["onsiteregroup.com", "www.onsiteregroup.com"]);

export function isMainWebsiteHost(hostname: string) {
  return MAIN_WEBSITE_HOSTS.has(hostname.toLowerCase());
}

export function getConfiguredSiteHost() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) return null;

  try {
    return new URL(siteUrl).hostname;
  } catch {
    return null;
  }
}

export const showIdxContent = !isMainWebsiteHost(getConfiguredSiteHost() ?? "");
