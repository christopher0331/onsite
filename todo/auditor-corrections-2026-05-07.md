# Auditor Corrections — 2026-05-07

Source: NWMLS / MLS Grid auditor feedback received 5/7/26.
All work targets `staging.onsiteregroup.com` first; main inherits via fast-forward.

---

## 1. Watermark cropped on large images

**Auditor:** "Watermark not visible on all large images. The watermark is required to be visible on all property displays. The only exception is the summary results thumbnail display."

**Before:**
- `src/app/listings/[mlsNumber]/page.tsx` line 465 — main gallery image renders as `aspect-[16/8]` (a wide 2:1 box) with `object-cover`. NWMLS bakes the watermark into a corner of the original photo; `object-cover` crops the image to fill the container, removing the corner that holds the watermark.
- Search-result cards and the thumbnail strip also use `object-cover` but those are summary thumbnails (auditor says exempt).

**After (planned):**
- Switch the main hero image to `object-contain` over a neutral letterbox background so the full original frame (and watermark) is always visible. Maintain aspect ratio; pad as needed.
- Audit detail-page comparable mini-photos and any other "large" surface; keep summary thumbs as-is.

---

## 2. Contingent listings mislabeled as "Active" on search results

**Auditor:** "While Contingent listings are being displayed alongside Active listings, the status is incorrectly labeled on the search results (summary) display as 'Active'. The status should be clearly labeled on all displays."

**Before:**
- `src/app/listings/page.tsx` line 121-126 — card status pill logic is `listing.status === "A" ? "Active" : listing.lastStatus || "Sold"`. Repliers' binary `status` field is `A` for any on-market listing including contingent/active-under-contract. The contingent state lives in `lastStatus` and `standardStatus`. Result: every contingent listing reads "Active" on the card.
- The detail page already does this right at line 352 — `listing.standardStatus || (isActive ? "Active" : listing.lastStatus)`. We need parity on the card.
- The card's `Listing` type (lines 13-46) doesn't include `standardStatus`, so we'll add it.

**After (planned):**
- Add `standardStatus` to the card's `Listing` type.
- Replace the pill text with `listing.standardStatus || (status === "A" ? "Active" : (listing.lastStatus || "Sold"))`.
- Visually distinguish contingent from active (e.g., amber pill for "Active Under Contract" / "Pending" vs white for "Active") so a glance still tells them apart.

---

## 3. Cannot search Pending listings (Kent / Burien)

**Auditor:** "All demo data does not appear to be included on the site since I cannot search for Pending listings in Kent or Burien... If Repliers has not provided you with all the demo data, you will need to reach out to them to have them to get a demo data refresh."

**Before — two compounding bugs:**
1. The "Pending" filter button at `src/app/listings/page.tsx` line 78 sends `status=P` to `/api/listings`, which forwards it to Repliers. Repliers only recognizes `status=A` or `status=U` — it has no concept of `P`. So Repliers returns zero records, and the UI says "No listings found" regardless of city.
2. NWMLS expresses pending via `lastStatus` codes (`Pen`, `Pi`, `Ps`, `Pf`, `Pba`, etc.) on `status=A` records. Our API never queries by `lastStatus` for the Pending button.

**After (planned):**
- When the user picks "Pending", the API call becomes `status=A&lastStatus=Pen&lastStatus=Pi&lastStatus=Ps&lastStatus=Pf&lastStatus=Pba` (Repliers supports OR via repeated params).
- Remove the `if (status === "U") params.set("lastStatus", "Sld")` quirk and centralize all status→Repliers mapping in the API route so the client just sends a friendly label.
- After deploy, retest Kent and Burien Pending. If still empty, the Repliers demo dataset is missing those records and the user will need to ask Repliers for a refresh (this part is on Repliers, not us).

---

## 4. Cannot locate MLS #2310987

**Auditor:** "Unable to locate MLS #2310987, which is one of the listings we look for to ensure that an NWMLS specific fields are being displayed accordingly."

**Before:**
- Search UI has no MLS# input. The auditor cannot enter `2310987` into any field. The only path to that listing is to type the URL `/listings/2310987` directly, which a non-developer auditor would not know to do.
- Detail route exists (`src/app/listings/[mlsNumber]/page.tsx`), so once at the URL it would render — assuming the demo data contains it.

**After (planned):**
- Add an "MLS#" search input next to the city filter on `/listings`.
- When the user enters a value:
  - If it's a numeric MLS#, take them directly to `/listings/{mlsNumber}` (skip the grid).
  - Optionally: if Repliers returns a 404 for that MLS#, show a clear "MLS #X not found in current dataset" message instead of a blank page.
- Document that if `2310987` returns 404 after this change, the demo data itself is missing it (Repliers refresh needed).

---

## 5. Sold listings missing buyer brokerage

**Auditor:** "Sold data must include the buyer brokerage alongside the listing brokerage on the property detail pages."

**Before:**
- `src/app/listings/[mlsNumber]/page.tsx` already renders both "Listed By" and "Bought With" sections at lines 528-565 and lines 799-852 — but they're conditionally hidden when `listing.buyerAgents` is null/empty. On Repliers demo sold listings the `buyerAgents` array often comes back null, so the buyer brokerage row never renders.
- We may also need to make sure the API isn't filtering out the `buyerAgents` field. Need to verify what comes back from Repliers for a sold listing.

**After (planned):**
- Inspect the raw Repliers response for a sold listing in the demo data to confirm the field shape (could be `buyerAgents`, could be `coopAgents`, could be in `office.coopBrokerageName`, etc.).
- Update the detail page to always render the "Bought With" / "Buyer Brokerage" row whenever the listing is sold, falling back to "Buyer brokerage information not provided" if the field is missing — this signals to the auditor that the placeholder exists and the data is being requested.
- If Repliers returns the brokerage in a different field on sold records, map it explicitly in the API route.

---

## 6. Map view (Q) and result sorting (Q)

**Auditor Q1:** "Will the site have a map view?"
**Auditor Q2:** "Will the site be able to sort the results by, for example, newest listings, Price (high to low) or (low to high) etc.?"

**Before:**
- No map view component exists anywhere. The detail page has lat/long in `listing.map` but renders no map.
- Search page has no sort UI; results come back in Repliers' default order (effectively undefined).

**After (planned):**
- **Sort:** Add a sort dropdown to `/listings` with: Newest first (`createdOnDesc`, default), Recently updated (`updatedOnDesc`), Price High → Low (`listPriceDesc`), Price Low → High (`listPriceAsc`). Pipe through `/api/listings` to Repliers' `sortBy` param.
- **Map:** Add a "List | Map" view toggle on `/listings` using Leaflet + OpenStreetMap (free, no API key). Each listing pin clicks through to its detail page. Pin position uses `listing.map.latitude` / `listing.map.longitude` already returned by Repliers.

---

## Verification before deploy

- [ ] Lint + build passes (`npm run build`).
- [ ] Manually verify on staging:
  - Pending button returns Kent / Burien results (or document Repliers data gap).
  - Contingent listings show "Active Under Contract" or similar on the card pill.
  - Detail page hero shows the full NWMLS watermark.
  - MLS# input lands directly on `/listings/2310987` (or shows a clean "not found" message).
  - Sold listing detail page shows a Buyer Brokerage row even when null.
  - Sort dropdown reorders results correctly.
  - Map view toggle renders pins (if shipped this round).
