import assert from "node:assert/strict";
import { computeDaysActive, isFirstLookListing } from "../src/lib/listing-days.ts";

const DAY = 86_400_000;
const now = Date.parse("2026-10-25T20:00:00Z");
const daysAgo = (n) => new Date(now - n * DAY - 3_600_000).toISOString();

// Active: CDOM + whole days since OriginatingSystemModificationTimestamp.
assert.equal(
  computeDaysActive(
    {
      standardStatus: "Active",
      raw: { CumulativeDaysOnMarket: 4, OriginatingSystemModificationTimestamp: daysAgo(3) },
    },
    now
  ),
  7
);

// Modified today: just CDOM; zero is a valid value outside First Look.
assert.equal(
  computeDaysActive(
    {
      standardStatus: "Active",
      raw: { CumulativeDaysOnMarket: 0, OriginatingSystemModificationTimestamp: new Date(now).toISOString() },
    },
    now
  ),
  0
);

// String CDOM from the feed is accepted.
assert.equal(
  computeDaysActive({ standardStatus: "Active", raw: { CumulativeDaysOnMarket: "12" } }, now),
  12
);

// Closed: frozen at the feed CDOM (no elapsed-time term).
assert.equal(
  computeDaysActive(
    {
      standardStatus: "Closed",
      soldPrice: 500000,
      raw: { CumulativeDaysOnMarket: 10, OriginatingSystemModificationTimestamp: daysAgo(300) },
    },
    now
  ),
  10
);

// No CDOM in the feed: hide (never fall back to non-NWMLS numbers).
assert.equal(computeDaysActive({ standardStatus: "Active", raw: {} }, now), null);
assert.equal(computeDaysActive({ standardStatus: "Active" }, now), null);
assert.equal(computeDaysActive(null, now), null);

// First Look: always hidden, even a zero.
for (const first of [
  { raw: { MlsStatus: "First Look", CumulativeDaysOnMarket: 0 } },
  { standardStatus: "First Look", raw: { CumulativeDaysOnMarket: 5 } },
  { lastStatus: "FirstLook", raw: { CumulativeDaysOnMarket: 5 } },
]) {
  assert.equal(isFirstLookListing(first), true);
  assert.equal(computeDaysActive(first, now), null);
}
assert.equal(isFirstLookListing({ raw: { MlsStatus: "Active" }, standardStatus: "Active" }), false);

console.log("listing-days: ok");
