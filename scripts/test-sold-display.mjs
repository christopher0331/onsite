import assert from "node:assert/strict";
import {
  filterSoldDisplayAuthorized,
  getSoldBrokerage,
  isSoldDisplayAuthorized,
  STATIC_SOLD_BROKERAGE,
} from "../src/lib/sold-display.ts";

assert.equal(isSoldDisplayAuthorized({ raw: { InternetEntireListingDisplayYN: false } }), false);
assert.equal(isSoldDisplayAuthorized({ raw: { InternetEntireListingDisplayYN: "N" } }), false);
assert.equal(isSoldDisplayAuthorized({ raw: { InternetEntireListingDisplayYN: true } }), true);
assert.equal(isSoldDisplayAuthorized({ raw: {} }), true);
assert.equal(isSoldDisplayAuthorized({}), true);

const out = filterSoldDisplayAuthorized({
  count: 3,
  listings: [
    { raw: { InternetEntireListingDisplayYN: true } },
    { raw: { InternetEntireListingDisplayYN: false } },
    {},
  ],
});
assert.equal(out.listings.length, 2);
assert.equal(out.count, 3);

assert.deepEqual(
  getSoldBrokerage({ raw: { ListOfficeName: "Timber Real Estate", BuyerOfficeName: "Redfin" } }),
  { listingFirm: "Timber Real Estate", buyerFirm: "Redfin" }
);
assert.deepEqual(
  getSoldBrokerage({ office: { brokerageName: "Firm A" }, buyerAgents: [{ brokerage: { name: "Firm B" } }] }),
  { listingFirm: "Firm A", buyerFirm: "Firm B" }
);
assert.deepEqual(getSoldBrokerage({}), { listingFirm: "", buyerFirm: "" });
assert.equal(Object.keys(STATIC_SOLD_BROKERAGE).length, 6);
console.log("sold-display tests passed");
