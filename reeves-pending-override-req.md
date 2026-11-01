# Req: Reeves NWM2577818 – show "Pending" on onsiteregroup.com

Status as of Sun Oct 18, 2026 6:50 PM CT: **ALREADY SATISFIED BY THE FEED. No override needed. No PR opened.**

## Request
OnSite Real Estate Group (director@onsiteregroup.com) asked that listing Reeves, NWM2577818
(8703 342nd St S, Roy; $1,295,000) show **Pending** on https://onsiteregroup.com/listings/NWM2577818.
If NWMLS/IDX lagged, they wanted a manual status override that changes only the displayed status
(price and everything else unchanged), removed once NWMLS shows Pending. They asked for a reply when it's live.

## Source emails (thread "onsiteregroup.com: add IDX-fed "Pending / Recent Activity" section (OnSite listings only)", to admin@reactivlabs.com)
1. **Thu Oct 15, 7:36 PM CT**: André approved a new homepage "Pending / Recent Activity" section, IDX-fed,
   showing only OnSite/Timber listings (André or Cindie Bohall) in Pending. Each card links to /listings/NWM<MLS#>,
   with no price-change, buyer, or close-date details. Cards drop off automatically. Keep the /listings feed and broker
   attribution as they are. Place it below the active listings, with an anchor, same schema and NAP. Reeves should be the first one picked up. They asked for a timeline and a staging link.
2. **Fri Oct 16, 10:23 AM CT**: Tighter timeline. Reeves should show Pending by end of day; it was still Active at $1,295,000. A manual
   override is OK, and the full section can follow later. They asked for an ETA.
3. **Fri Oct 16, 10:40 AM CT**: NWMLS itself still showed Active, and the MLS entry was being corrected that day. They asked for a manual Pending override
   now, changing ONLY the status. Remove it once NWMLS shows Pending. Reply when it's live.

Sent mail (admin@): **no reply to any of the three** (searched in:sent to director@onsiteregroup.com / Reeves / NWM2577818 / Pending, and onsiteregroup since Oct 15).

## Current state (verified with curl, Oct 18 ~6:48 PM CT)
- The live page shows the badge **"Pending Inspection"**. Feed data: `StandardStatus: "Pending"`, `MlsStatus: "Pending Inspection"`.
- Price is unchanged at **$1,295,000** (`ListPrice: 1295000`).
- The MLS record's `ModificationTimestamp` is 2026-10-16T15:49Z, which is **Fri Oct 16, 10:49 AM CT**, 9 minutes after email 3. NWMLS corrected it the same morning.
- The repo (christopher0331/onsite) has no override code and no Pending-section PR (latest merged is #64; #58 is held and was not touched).

## Acceptance criteria (override variant, kept for reference)
- AC1: /listings/NWM2577818 badge reads Pending (or the NWMLS Pending sub-status). **MET via feed.**
- AC2: Price, photos, details, and broker attribution are unchanged. **MET.**
- AC3: Listing cards, the map, and the Pending filter (status=P) agree with the detail page. Met by the feed, because all of them read the same status.
- AC4: JSON-LD is consistent. See the gap below.
- AC5: The override is a single map keyed by MLS# (e.g. `src/lib/status-overrides.ts`, applied in `src/lib/listing-status.ts`
  and `listing-seo.ts`), so removing it later is a one-line delete.

## Removal condition
Remove the override once NWMLS/IDX shows Pending. **This condition is already met**, so an override would be removed as soon as it was added. Not building it.

## Gaps / follow-ups (not done)
- **JSON-LD:** `src/lib/listing-seo.ts` sets `availability = SoldOut` when `standardStatus==="Closed" || status==="U"`.
  Repliers marks Pending listings as `status "U"`, so Reeves currently emits `https://schema.org/SoldOut`. A Pending listing should probably
  not say SoldOut (options: omit availability, or use LimitedAvailability). This is a small site-wide fix; it needs his go before a PR.
- **Pending / Recent Activity homepage section** (email 1): not built and still open. It needs its own PR.
- **Client reply owed:** they asked for a reply when it's live. Draft below; not sent.

## Out of scope
Price changes, buyer or close-date details, MLS Grid feed and rate settings, the AI-crawler block, held PR #58, secrets/env/webhooks, and the full Pending section (separate req).

## Draft reply (NOT sent; needs Christopher's go)
To: director@onsiteregroup.com (reply on the thread above)
Subject: Re: Re: onsiteregroup.com: add IDX-fed "Pending / Recent Activity" section (OnSite listings only)

Hi,

Reeves (NWM2577818) is showing Pending on the site now: https://onsiteregroup.com/listings/NWM2577818. It reads "Pending Inspection" at $1,295,000, and nothing else changed. NWMLS corrected the entry on Friday morning and the feed picked it up, so we didn't need a manual override.

The Pending / Recent Activity section for the homepage is next. I'll send a timeline and a preview link once it's ready.

Thanks,
Chris
