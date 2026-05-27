export function toCanonicalHost(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  try {
    const parsed = new URL(trimmed);
    parsed.hostname = parsed.hostname.replace(/^www\./i, "");
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return trimmed.replace(/^https:\/\/www\./i, "https://");
  }
}

export function getCanonicalBaseUrl() {
  return toCanonicalHost(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://onsiteregroup.com"
  );
}
