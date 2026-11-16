import assert from "node:assert/strict";
import {
  displayDaysOnMarket,
  displaySaleDate,
  formatFeedDate,
  pacificDateISO,
} from "../src/lib/listing-market.ts";

const now = new Date("2026-11-16T20:00:00Z");

// Feed daysOnMarket wins over simpleDaysOnMarket and over a calendar recount.
assert.equal(
  displayDaysOnMarket(
    {
      daysOnMarket: 109,
      simpleDaysOnMarket: 172,
      raw: {
        CumulativeDaysOnMarket: 999,
        OnMarketDate: "2026-05-29",
        PurchaseContractDate: "2026-09-15",
        CloseDate: "2026-10-26",
      },
    },
    now
  ),
  109
);

// Zero is a real feed value.
assert.equal(displayDaysOnMarket({ daysOnMarket: 0, simpleDaysOnMarket: 12 }, now), 0);

// Missing daysOnMarket uses CumulativeDaysOnMarket, including a numeric string.
assert.equal(
  displayDaysOnMarket({ daysOnMarket: null, raw: { CumulativeDaysOnMarket: "63" } }, now),
  63
);

// Both feed values missing: OnMarketDate → earliest of contract / close / off-market / today, no +1.
// Kent NWM2532071 dates: May 29 → Sep 15 (pending) = 109, not through close or today.
assert.equal(
  displayDaysOnMarket(
    {
      daysOnMarket: null,
      simpleDaysOnMarket: 172,
      raw: {
        OnMarketDate: "2026-05-29",
        PurchaseContractDate: "2026-09-15",
        CloseDate: "2026-10-26",
        OffMarketDate: "2026-10-26",
      },
    },
    now
  ),
  109
);

// Active, no stop date: Feb 12 → Nov 16 = 277, not simpleDaysOnMarket's +1 (278).
assert.equal(
  displayDaysOnMarket(
    {
      simpleDaysOnMarket: 278,
      raw: { OnMarketDate: "2026-02-12" },
    },
    now
  ),
  277
);

// Off-market earlier than today is the end date.
assert.equal(
  displayDaysOnMarket(
    {
      raw: { OnMarketDate: "2026-08-01", OffMarketDate: "2026-09-01", CloseDate: "2026-10-26" },
    },
    now
  ),
  31
);

// "Today" is the Pacific calendar date (2026-11-17 02:00Z is still Nov 16 in Washington).
assert.equal(pacificDateISO(new Date("2026-11-17T02:00:00Z")), "2026-11-16");
assert.equal(
  displayDaysOnMarket(
    { raw: { OnMarketDate: "2026-11-16" } },
    new Date("2026-11-17T02:00:00Z")
  ),
  0
);

assert.equal(displayDaysOnMarket(null, now), null);
assert.equal(displayDaysOnMarket({ raw: {} }, now), null);
assert.equal(
  displayDaysOnMarket({ raw: { OnMarketDate: "2026-12-01", CloseDate: "2026-11-01" } }, now),
  null
);

assert.equal(
  displaySaleDate({
    soldDate: "2026-09-15T00:00:00.000-00:00",
    raw: { CloseDate: "2026-10-26", PurchaseContractDate: "2026-09-15" },
  }),
  "2026-10-26"
);
assert.equal(
  displaySaleDate({ soldDate: "2026-09-15T00:00:00.000-00:00", raw: {} }),
  "2026-09-15T00:00:00.000-00:00"
);
assert.equal(displaySaleDate(null), null);
assert.equal(formatFeedDate("2026-10-26"), "Oct 26, 2026");
assert.equal(formatFeedDate("2026-09-15T00:00:00.000-00:00"), "Sep 15, 2026");
assert.equal(formatFeedDate(null), null);

console.log("listing-market tests passed");
