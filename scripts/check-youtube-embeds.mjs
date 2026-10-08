// Collects YouTube IDs shipped in src/ and checks each with YouTube oEmbed.
// 200 = playable. 401, 403, and 404 = private, deleted, or otherwise dead.
// Not part of `npm run build` — that build must not depend on this network call.
// A network failure (after retries) fails open with exit 0 so a YouTube outage
// does not look like a dead embed. A confirmed dead ID exits 1.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SCAN_DIR = path.join(ROOT, "src");
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md", ".html"]);
const ID = "[A-Za-z0-9_-]{11}";
const DEAD_STATUSES = new Set([401, 403, 404]);

const URL_ID = new RegExp(
  `(?:youtube\\.com/(?:embed|shorts)/|youtu\\.be/|(?:youtube\\.com/watch\\?v=))(${ID})`,
  "g",
);
const FIELD_ID = new RegExp(`(?:youtubeId|videoId)\\s*[:=]\\s*["'](${ID})["']`, "g");
const DYNAMIC_ID = new RegExp(`\\bid\\s*:\\s*["'](${ID})["']`, "g");
const DYNAMIC_EMBED = /youtube\.com\/embed\/\$\{[^}]*\.id/;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      files.push(...(await walk(full)));
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function collectFromText(text) {
  const ids = new Set();
  for (const pattern of [URL_ID, FIELD_ID]) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) ids.add(match[1]);
  }
  if (DYNAMIC_EMBED.test(text)) {
    DYNAMIC_ID.lastIndex = 0;
    for (const match of text.matchAll(DYNAMIC_ID)) ids.add(match[1]);
  }
  return ids;
}

function retryableStatus(status) {
  return status === 429 || status >= 500;
}

async function oembedStatus(id) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "onsite-check-youtube-embeds" },
        signal: AbortSignal.timeout(20_000),
      });
      if (retryableStatus(response.status) && attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
        continue;
      }
      let title = "";
      if (response.status === 200) {
        try {
          const body = await response.json();
          title = typeof body.title === "string" ? body.title : "";
        } catch {
          title = "";
        }
      }
      return { status: response.status, title, networkError: retryableStatus(response.status) };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  return {
    status: 0,
    title: "",
    networkError: true,
    message: lastError instanceof Error ? lastError.message : String(lastError),
  };
}

const files = await walk(SCAN_DIR);
/** @type {Map<string, string[]>} */
const found = new Map();
for (const file of files) {
  const text = await readFile(file, "utf8");
  const rel = path.relative(ROOT, file);
  for (const id of collectFromText(text)) {
    const where = found.get(id) ?? [];
    where.push(rel);
    found.set(id, where);
  }
}

if (found.size === 0) {
  console.error("check:videos: no YouTube IDs found under src/");
  process.exit(1);
}

const ids = [...found.keys()].sort();
const results = [];
for (const id of ids) {
  results.push({ id, ...(await oembedStatus(id)) });
}

let dead = 0;
let network = 0;
for (const result of results) {
  const where = found.get(result.id).join(", ");
  if (result.networkError) {
    network += 1;
    console.log(`NETWORK\t${result.id}\t${result.status || result.message}\t${where}`);
  } else if (DEAD_STATUSES.has(result.status) || result.status !== 200) {
    dead += 1;
    console.log(`DEAD\t${result.id}\t${result.status}\t${where}`);
  } else {
    console.log(`ok\t${result.id}\t200\t${result.title}`);
  }
}

if (dead > 0) {
  console.error(`check:videos: ${dead} dead YouTube embed${dead === 1 ? "" : "s"}`);
  process.exit(1);
}

if (network > 0) {
  console.warn(
    `check:videos: ${network} oEmbed request${network === 1 ? "" : "s"} failed open (network). No confirmed dead IDs.`,
  );
}

console.log(`check:videos: ${ids.length} public YouTube embed${ids.length === 1 ? "" : "s"}`);
