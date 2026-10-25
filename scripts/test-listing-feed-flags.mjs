import assert from "node:assert/strict";
import {
  applyFeedDisplayFlags,
  feedBool,
  isListingBlockedFromDisplay,
  isOffMarketStatus,
} from "../src/lib/listing-feed-flags.ts";

assert.equal(feedBool(false), false);
assert.equal(feedBool("false"), false);
assert.equal(feedBool("N"), false);
assert.equal(feedBool("Y"), true);
assert.equal(feedBool(undefined), null);

// Status blocking
for (const MlsStatus of ["Expired", "Canceled", "Cancelled", "Temporarily Off Market", "Sale-Fail Release", "Withdrawn"]) {
  assert.equal(isOffMarketStatus({ raw: { MlsStatus } }), true, MlsStatus);
}
for (const MlsStatus of ["Active", "Pending", "Pending - Backup Offer Requested", "Contingent", "Closed", "Sold", "Coming Soon", "First Look"]) {
  assert.equal(isOffMarketStatus({ raw: { MlsStatus } }), false, MlsStatus);
}
assert.equal(isOffMarketStatus({ standardStatus: "Canceled" }), true);
assert.equal(isOffMarketStatus({ status: "U", lastStatus: "Exp" }), true);
assert.equal(isOffMarketStatus({ status: "U", lastStatus: "Sld", standardStatus: "Closed" }), false);
assert.equal(isListingBlockedFromDisplay({ raw: { MlgCanView: false, MlsStatus: "Active" } }), true);
assert.equal(isListingBlockedFromDisplay({ raw: { MlgCanView: true, MlsStatus: "Active" } }), false);
assert.equal(isListingBlockedFromDisplay({}), false);

// Display flags
const base = {
  raw: {},
  images: ["a.jpg", "b.jpg", "c.jpg"],
  address: { streetNumber: "123", streetName: "Main", city: "Puyallup", zip: "98371" },
  map: { latitude: 47.1, longitude: -122.3 },
  permissions: { displayAddressOnInternet: "Y" },
  details: { virtualTourUrl: "https://t", alternateURLVideoLink: "https://v" },
};
const noop = applyFeedDisplayFlags({ ...base, raw: { InternetAddressDisplayYN: true } });
assert.equal(noop.address.streetName, "Main");

const hidden = applyFeedDisplayFlags({ ...base, raw: { InternetAddressDisplayYN: false } });
assert.equal(hidden.address.streetNumber, "");
assert.equal(hidden.address.streetName, "");
assert.equal(hidden.address.city, "Puyallup");
assert.equal(hidden.permissions.displayAddressOnInternet, "N");
assert.equal(hidden.map.latitude, null);
assert.equal(hidden.images.length, 3);

const noPin = applyFeedDisplayFlags({ ...base, raw: { NWM_ShowMapLink: false } });
assert.equal(noPin.map.longitude, null);
assert.equal(noPin.address.streetName, "Main");

assert.deepEqual(applyFeedDisplayFlags({ ...base, raw: { NWM_IDXMustRemovePhotosYN: true } }).images, ["a.jpg"]);
assert.deepEqual(applyFeedDisplayFlags({ ...base, raw: { NWM_IDXMustRemovePhotosYN: true, NWM_IDXMustRemovePrimaryPhotoYN: true } }).images, []);
const tour = applyFeedDisplayFlags({ ...base, raw: { NWM_IDXMustRemoveVirtualTourYN: "true" } });
assert.equal(tour.details.virtualTourUrl, null);
assert.equal(applyFeedDisplayFlags({ raw: null, images: ["a"] }).images.length, 1);
console.log("listing-feed-flags tests passed");
