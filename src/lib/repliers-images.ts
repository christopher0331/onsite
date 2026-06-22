const CDN = "https://cdn.repliers.io/";

export type RepliersImageSize = "small" | "medium" | "large";

/** Repliers CDN image sizes: small=400px, medium=800px, large=1600px */
export function repliersImageUrl(
  path: string | null | undefined,
  size: RepliersImageSize = "medium"
): string | null {
  if (!path) return null;

  const base = path.startsWith("http") ? path : `${CDN}${path.replace(/^\//, "")}`;
  const url = new URL(base);
  url.searchParams.set("class", size);
  return url.toString();
}
