# NWMLS Compliance Todos

> Audit run: March 24, 2026 — Result: **14 passed / 6 failed**
> Source: [Repliers Compliance Audit](https://onsite-regroup.netlify.app/)

---

## [x] 1. Add IDX/MLS GRID disclaimer to every page
*3 pages failed this check (Home, Single Listing, DMCA Notice)*

The following exact text must appear on **every page** — best placed in the site footer:

> "IDX information is provided exclusively for consumers' personal noncommercial use, that it may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing, that the data is deemed reliable but is not guaranteed by MLS GRID, and that the use of the MLS GRID Data may be subject to an end user license agreement prescribed by the Member Participant's applicable MLS if any and as amended from time to time."

---

## [x] 2. Create a Terms of Service page
*Page does not exist — failed outright*

- Create a new page at `/terms-of-service`
- Add a link to it from the footer or nav

---

## [x] 3. Add MLS Grid data refresh timestamp to single listing pages
*Failed on: `/featured-homes/entertainers-dream-home-with-pickleball-court-on-1-2-acre`*

- Each listing detail page must display an MLS Grid disclaimer that includes the **date/time the data was last refreshed**
- This timestamp must never be more than **12 hours old**

---

## [x] 4. Add NWMLS logo and attribution on all listing display pages
*Failed on: Single Listing Page*

- Any page displaying IDX listings must include the **NWMLS logo (three trees)**
- Must note that data is "provided by NWMLS as distributed by MLS Grid"
- Currently missing on single listing pages (and any other pages showing listings)
