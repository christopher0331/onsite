# Puyallup SERP Gap — Close the Lead

**Goal:** Own winnable Puyallup queries (`Puyallup real estate agent`, sell/buy long-tails, ZIP + neighborhood) by beating indie SEO (esp. Mike Rudnev) on data freshness + spoke depth, while leaning into OnSite’s AI + IDX moat.

**Money page:** `/service-areas/puyallup`  
**Live spoke today:** `/service-areas/puyallup/south-hill` only (1 of 7 directory pockets)  
**Canvas:** `puyallup-competitive-gap.canvas.tsx`  
**Last updated:** 2026-08-04

---

## Status legend

- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `[!]` blocked

---

## Already in place (baseline)

- [x] City hub `/service-areas/puyallup` (regs, utilities, resources, schema)
- [x] South Hill spoke page
- [x] Discover / AboutTheArea block (attractions + local living)
- [x] Long-form SEO article on hub
- [x] Live AreaListings + `/listings?city=Puyallup&state=WA`
- [x] AI listing search (sitewide + surfaced on Puyallup hub)
- [x] Sitemap includes city + South Hill

---

## Phase 1 — Hub data weapons (beat Rudnev on the money page)

### 1.1 Puyallup Market Pulse

- [x] Define stats contract: median sold, DOM, months supply, active count — citywide + per ZIP `98371–98375` (list-to-sale % deferred)
- [x] Wire data source (`getServiceAreaMarketPulse` via Repliers statistics)
- [x] Build `<MarketPulse>` component for service-area hub
- [x] Mount on `/service-areas/puyallup` above AreaListings
- [x] Add “as of {date}” + methodology footnote (no invented numbers)
- [ ] Schedule refresh (monthly minimum; weekly preferred) — Next `revalidate: 3600` for now

### 1.2 Recently sold table on hub

- [x] Pull recent closed Puyallup listings (address, price, $/sqft, DOM, sold date)
- [x] Render table on hub with deep links to listing detail
- [x] Link “View all recently sold” → `/listings?status=U&city=Puyallup&state=WA`
- [x] Re-enable `CityCaseStudies` when seed cards exist (Gem Heights sold + downtown featured)

### 1.3 AI market brief on hub

- [x] Seeded weekly brief grounded in live Repliers numbers (`briefs/puyallup.ts`)
- [x] Store as typed JSON keyed to `puyallup`
- [x] Render “What changed in Puyallup this week” section on hub
- [ ] Archive prior briefs for internal link / freshness signals (next refresh cycle)
- [ ] Automate Perplexity/Sonar weekly regen (optional polish)

### 1.4 Surface AI search on Puyallup hub

- [x] Embed `AiSearchPanel` with Puyallup-prefilled prompt + local examples on the hub
- [x] Copy that makes the AI search the differentiator vs portal/agent sites

---

## Phase 2 — Spoke cluster (close neighborhood gap)

Directory pockets still missing live pages:

- [ ] Downtown Puyallup — data + route + Discover + article
- [ ] Clark's Creek — data + route + Discover + article
- [ ] Rodesco — data + route + Discover + article
- [ ] Shawnee Ridge — data + route + Discover + article
- [ ] Gem Heights — data + route + Discover + article
- [ ] Summit — data + route + Discover + article

Per spoke checklist (repeat for each):

- [ ] Add full `NEIGHBORHOODS` entry in `src/lib/service-areas/data.ts`
- [ ] Generate Perplexity article → `src/lib/service-areas/articles/`
- [ ] Generate Discover → `src/lib/service-areas/discover/`
- [ ] Wire `NeighborhoodDirectory` so cards link (not placeholders)
- [ ] Adjacent/peer links from hub + South Hill
- [ ] Sitemap picks up via `getAllNeighborhoodParams()`
- [ ] Push + request indexing (GSC / searchConsoleRL IndexStatus)

**Suggested order:** Downtown → Gem Heights → Clark's Creek → Summit → Shawnee Ridge → Rodesco

Optional later (Rudnev vocabulary — only if real MLS/geo coverage exists):

- [ ] Firgrove / Karshner / East–West Puyallup naming pass (directory + content, not thin doorway pages)

---

## Phase 3 — Intent capture + trust

### 3.1 Buyer programs strip (DPA / VA / JBLM)

- [ ] Add hub section: first-time / DPA / VA / JBLM-adjacent
- [ ] Outbound links to WSHFC / Pierce County / approved education resources
- [ ] Soft CTA to OnSite contact with `?area=Puyallup&topic=buying`

### 3.2 Proof layer

- [ ] Collect Puyallup-specific testimonials (André & Cindie)
- [ ] Show on hub (not only global TestimonialsScroll)
- [ ] Add Review / AggregateRating JSON-LD where compliant
- [ ] Audit Zillow + Google Business profiles for Puyallup geo signals

### 3.3 Internal link pass

- [ ] Blog posts that mention Puyallup → link `/service-areas/puyallup` (and South Hill where relevant)
- [ ] Featured/sold home pages in Puyallup → hub + matching spoke
- [ ] Footer: Service Areas links (at least Puyallup + key hubs)
- [ ] Homepage copy: make Puyallup mention a real hub link where natural

---

## Phase 4 — Measure & index

- [ ] Confirm `/service-areas/puyallup` + new spokes in Search Console
- [ ] Request indexing for hub + each new spoke after ship
- [ ] Track target queries weekly (GSC): agent, sell, South Hill, ZIP, market
- [ ] Snapshot Rudnev / Clif pages quarterly (what they add next)

---

## Out of scope (don’t waste cycles)

- Trying to outrank Zillow/Redfin for bare `homes for sale Puyallup`
- Thin Mad-Libs neighborhood pages without unique Discover + entity links
- Invented market statistics

---

## Next up (pick one to start)

1. **Market Pulse + sold table on hub** (highest leverage vs Rudnev)
2. **Downtown Puyallup spoke** (article + Discover)
3. **Internal link pass** (fastest win, low build)

Default recommendation: **#1**, then Downtown + Gem Heights spokes.
