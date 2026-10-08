// YouTube listing tours from @OnSiteRealEstateGroup, keyed by service-area slug.
// Only property tours that name the area in the title — no market-commentary
// shorts and no tours from a different city. Neighborhood pages fall back to
// their parent city when they do not have a dedicated clip.

export type ServiceAreaVideo = {
  // Must be a public @OnSiteRealEstateGroup upload. Private or deleted IDs
  // return oEmbed 401/403/404 and the player shows "Video unavailable".
  // Confirm with `npm run check:videos` before shipping.
  youtubeId: string;
  title: string;
  /** Optional ISO date from the channel RSS / upload metadata. */
  uploadDate?: string;
};

const CHANNEL_URL = "https://www.youtube.com/@OnSiteRealEstateGroup";

/**
 * Best matching listing tour per slug, from the OnSite Real Estate Group
 * channel (Lake Tapps & surrounding areas).
 */
const VIDEOS: Record<string, ServiceAreaVideo> = {
  puyallup: {
    youtubeId: "tdPBWJ-xlXY",
    title:
      "Spacious Daylight Rambler in Puyallup | Cul-de-Sac Lot, 3-Car Garage, Up to 7 Bedrooms",
    uploadDate: "2026-08-07",
  },
  "downtown-puyallup": {
    youtubeId: "hE30SZhhHnM",
    title: "For Sale: Fully Renovated 1907 Craftsman in Downtown Puyallup",
  },
  "south-hill": {
    youtubeId: "B4bUAzxtqpI",
    title:
      "South Hill Dream Home w/ Main Floor Primary Suite, Office & Loft | 7905 150th St E",
  },
  "gem-heights": {
    youtubeId: "iMgIdo3rh5U",
    title:
      "Charming Single-Story Home in Gem Heights, Puyallup | Prime Location & Community Amenities!",
  },
  sumner: {
    youtubeId: "ml3docdYzaQ",
    title:
      "Modern 2021-Built Home in Vibrant Sumner Neighborhood | 15615 Washington St, WA 98390",
  },
  "bonney-lake": {
    youtubeId: "6CSLkMPJn6c",
    title:
      "Stunning Bonney Lake Home with Mt. Rainier Views | 19807 106th St Ct E | No HOA!",
  },
  tehaleh: {
    youtubeId: "yXg1L4ol6FA",
    title:
      "12850 192nd Pl E, Bonney Lake, WA | Stunning Home in the Heart of Tehaleh in Bonney Lake!",
  },
  "lake-tapps": {
    youtubeId: "mxPAAMPpoCg",
    title: "Tapps Island Living, Fully Remodeled & Move-In Ready",
  },
  "tapps-island": {
    youtubeId: "mxPAAMPpoCg",
    title: "Tapps Island Living, Fully Remodeled & Move-In Ready",
  },
  auburn: {
    youtubeId: "Vy1CKvXaQW0",
    title:
      "Top-Floor Condo with Scenic Views | 4714 Mill Pond Dr SE #412, Auburn, WA",
  },
  buckley: {
    youtubeId: "RYmjSeU7Zkg",
    title:
      "Secluded Rambler on 1.7 Acres in Buckley | Large Shop & Endless Potential!",
  },
  graham: {
    youtubeId: "VPuGuukCOLQ",
    title:
      "Discover 24508 128th Ave E, Graham, WA 98338 | Your Graham Dream Home Awaits!",
  },
  "federal-way": {
    youtubeId: "9mXjZRceiSo",
    title:
      "Luxury Mid-Century Modern in Marine Hills | 29011 7th Pl S, Federal Way, WA | Stunning Sound Views!",
  },
};

export const ONSITE_YOUTUBE_CHANNEL_URL = CHANNEL_URL;

export function getServiceAreaVideo(
  slug: string,
  fallbackSlug?: string
): ServiceAreaVideo | undefined {
  return VIDEOS[slug] ?? (fallbackSlug ? VIDEOS[fallbackSlug] : undefined);
}
