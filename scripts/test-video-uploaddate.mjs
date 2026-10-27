// Guard: every service-area video must carry a valid ISO 8601 uploadDate, or
// Google Search Console flags the VideoObject as invalid ("Missing field
// uploadDate"). Offline and fast — run with `npm run test:videos`.
import assert from "node:assert/strict";
import {
  getAllServiceAreaVideos,
  isValidVideoUploadDate,
} from "../src/lib/service-areas/videos.ts";

assert.equal(isValidVideoUploadDate("2025-03-14"), true);
assert.equal(isValidVideoUploadDate("2025-03-14T10:30:31-07:00"), true);
assert.equal(isValidVideoUploadDate("2025-03-14T10:30:31Z"), true);
assert.equal(isValidVideoUploadDate(""), false);
assert.equal(isValidVideoUploadDate(undefined), false);
assert.equal(isValidVideoUploadDate("March 14, 2025"), false);
assert.equal(isValidVideoUploadDate("2025-13-45"), false);

const videos = getAllServiceAreaVideos();
assert.ok(videos.length > 0, "no service-area videos registered");

const bad = videos.filter(([, v]) => !isValidVideoUploadDate(v.uploadDate));
assert.deepEqual(
  bad.map(([slug, v]) => `${slug} (${v.youtubeId})`),
  [],
  "videos missing a valid uploadDate",
);

// Same YouTube ID reused for several slugs must carry the same date.
const byId = new Map();
for (const [slug, v] of videos) {
  const prev = byId.get(v.youtubeId);
  if (prev) assert.equal(prev, v.uploadDate, `${slug}: inconsistent uploadDate for ${v.youtubeId}`);
  byId.set(v.youtubeId, v.uploadDate);
}

console.log(`test:videos: ${videos.length} videos, all have a valid uploadDate`);
