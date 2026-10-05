/**
 * Public listing URL encoded by the open-house QR and the share card.
 * utm_campaign is the MLS number so a scan can be tied back to the home.
 */
export function listingShareUrl(origin: string, mlsNumber: string) {
  const base = origin.replace(/\/$/, "") || "https://onsiteregroup.com";
  const url = new URL(`/listings/${encodeURIComponent(mlsNumber)}`, `${base}/`);
  url.searchParams.set("utm_source", "qr");
  url.searchParams.set("utm_medium", "open_house");
  url.searchParams.set("utm_campaign", mlsNumber);
  return url.toString();
}
