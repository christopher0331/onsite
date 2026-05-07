import { headers } from "next/headers";
import { isMainWebsiteHost, showIdxContent } from "@/lib/site-visibility";

export async function getShowIdxContentForRequest() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "";
  const hostname = host.split(":")[0];

  if (!hostname) return showIdxContent;

  return !isMainWebsiteHost(hostname);
}
