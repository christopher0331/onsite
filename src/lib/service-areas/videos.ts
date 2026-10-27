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
  /**
   * REQUIRED. The video's real YouTube publish date (ISO 8601 with timezone),
   * read from the watch page's `uploadDate` meta tag. Google's VideoObject
   * rich result is invalid without it. Never guess — look it up:
   *   curl -s -A "Mozilla/5.0" "https://www.youtube.com/watch?v=<id>" | grep -o 'itemprop="uploadDate" content="[^"]*"'
   */
  uploadDate: string;
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
    uploadDate: "2026-08-07T15:30:02-07:00",
  },
  "downtown-puyallup": {
    youtubeId: "hE30SZhhHnM",
    title: "For Sale: Fully Renovated 1907 Craftsman in Downtown Puyallup",
    uploadDate: "2025-06-26T14:15:42-07:00",
  },
  "south-hill": {
    youtubeId: "B4bUAzxtqpI",
    title:
      "South Hill Dream Home w/ Main Floor Primary Suite, Office & Loft | 7905 150th St E",
    uploadDate: "2025-06-24T18:03:44-07:00",
  },
  "gem-heights": {
    youtubeId: "iMgIdo3rh5U",
    title:
      "Charming Single-Story Home in Gem Heights, Puyallup | Prime Location & Community Amenities!",
    uploadDate: "2024-12-31T09:30:07-08:00",
  },
  sumner: {
    youtubeId: "ml3docdYzaQ",
    title:
      "Modern 2021-Built Home in Vibrant Sumner Neighborhood | 15615 Washington St, WA 98390",
    uploadDate: "2024-12-31T11:00:28-08:00",
  },
  "bonney-lake": {
    youtubeId: "6CSLkMPJn6c",
    title:
      "Stunning Bonney Lake Home with Mt. Rainier Views | 19807 106th St Ct E | No HOA!",
    uploadDate: "2024-07-18T15:23:27-07:00",
  },
  tehaleh: {
    youtubeId: "yXg1L4ol6FA",
    title:
      "12850 192nd Pl E, Bonney Lake, WA | Stunning Home in the Heart of Tehaleh in Bonney Lake!",
    uploadDate: "2024-07-11T15:23:36-07:00",
  },
  "lake-tapps": {
    youtubeId: "mxPAAMPpoCg",
    title: "Tapps Island Living, Fully Remodeled & Move-In Ready",
    uploadDate: "2026-07-21T12:24:19-07:00",
  },
  "tapps-island": {
    youtubeId: "mxPAAMPpoCg",
    title: "Tapps Island Living, Fully Remodeled & Move-In Ready",
    uploadDate: "2026-07-21T12:24:19-07:00",
  },
  auburn: {
    youtubeId: "Vy1CKvXaQW0",
    title:
      "Top-Floor Condo with Scenic Views | 4714 Mill Pond Dr SE #412, Auburn, WA",
    uploadDate: "2024-07-11T15:10:50-07:00",
  },
  buckley: {
    youtubeId: "RYmjSeU7Zkg",
    title:
      "Secluded Rambler on 1.7 Acres in Buckley | Large Shop & Endless Potential!",
    uploadDate: "2025-01-02T10:30:31-08:00",
  },
  graham: {
    youtubeId: "VPuGuukCOLQ",
    title:
      "Discover 24508 128th Ave E, Graham, WA 98338 | Your Graham Dream Home Awaits!",
    uploadDate: "2024-08-26T12:01:27-07:00",
  },
  "federal-way": {
    youtubeId: "9mXjZRceiSo",
    title:
      "Luxury Mid-Century Modern in Marine Hills | 29011 7th Pl S, Federal Way, WA | Stunning Sound Views!",
    uploadDate: "2024-12-31T10:01:10-08:00",
  },
};

export const ONSITE_YOUTUBE_CHANNEL_URL = CHANNEL_URL;

/** Every registered video, for build-time guards and tests. */
export function getAllServiceAreaVideos(): Array<[string, ServiceAreaVideo]> {
  return Object.entries(VIDEOS);
}

/** ISO 8601 date or datetime, as accepted by schema.org / Google. */
const ISO_DATE =
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;

export function isValidVideoUploadDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    ISO_DATE.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

export function getServiceAreaVideo(
  slug: string,
  fallbackSlug?: string
): ServiceAreaVideo | undefined {
  return VIDEOS[slug] ?? (fallbackSlug ? VIDEOS[fallbackSlug] : undefined);
}
