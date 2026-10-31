// Measures <title>/meta description/og/twitter lengths in prerendered build output.
// Usage: node scripts/measure-meta.mjs [--json out.json]
import fs from "node:fs";
import path from "node:path";
const root = ".next/server/app";
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith(".html")) files.push(p); } })(root);
const dec = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const grab = (h, re) => { const m = h.match(re); return m ? dec(m[1]) : null; };
const group = (u) => u.startsWith("/blog/") ? "blog" : u.startsWith("/service-areas/") ? "service-areas" : /^\/(featured-homes|sold-homes)\//.test(u) ? "featured-sold" : "pages";
const rows = [];
for (const f of files) {
  const url = "/" + path.relative(root, f).replace(/\.html$/, "").replace(/^index$/, "");
  if (/^\/(_|404|500)/.test(url)) continue;
  const h = fs.readFileSync(f, "utf8");
  const r = { url, group: group(url),
    title: grab(h, /<title>([^<]*)<\/title>/), desc: grab(h, /<meta name="description" content="([^"]*)"/),
    ogTitle: grab(h, /<meta property="og:title" content="([^"]*)"/), ogDesc: grab(h, /<meta property="og:description" content="([^"]*)"/),
    twTitle: grab(h, /<meta name="twitter:title" content="([^"]*)"/), twDesc: grab(h, /<meta name="twitter:description" content="([^"]*)"/) };
  r.tl = r.title?.length ?? 0; r.dl = r.desc?.length ?? 0;
  r.sync = (!r.ogTitle || r.ogTitle === r.title) && (!r.twTitle || r.twTitle === r.title) && (!r.ogDesc || r.ogDesc === r.desc) && (!r.twDesc || r.twDesc === r.desc);
  rows.push(r);
}
const out = process.argv.indexOf("--json"); if (out > 0) fs.writeFileSync(process.argv[out + 1], JSON.stringify(rows, null, 1));
const g = {};
for (const r of rows) { const s = (g[r.group] ??= { pages: 0, titleOver60: 0, descOver160: 0, descUnder120: 0, desc140to160: 0, outOfSync: 0 });
  s.pages++; if (r.tl > 60) s.titleOver60++; if (r.dl > 160) s.descOver160++; if (r.dl < 120) s.descUnder120++; if (r.dl >= 140 && r.dl <= 160) s.desc140to160++; if (!r.sync) s.outOfSync++; }
console.table(g);
