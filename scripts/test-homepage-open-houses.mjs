import assert from "node:assert/strict";
import {
  HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS,
  HOMEPAGE_OPEN_HOUSE_MIN_PRICE,
  homepageOpenHouseQualifies,
  selectHomepageOpenHouses,
} from "../src/lib/homepage-open-houses.ts";

function home(overrides = {}) {
  return {
    id: "NWM1",
    listPrice: 900_000,
    sqft: 2400,
    photoCount: 24,
    propertyType: "Single Family Residence",
    style: "House",
    isModelHome: false,
    ...overrides,
  };
}

assert.equal(HOMEPAGE_OPEN_HOUSE_MIN_PRICE, 675_000);
assert.equal(HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS, 5);

assert.equal(homepageOpenHouseQualifies(home()), true);
assert.equal(homepageOpenHouseQualifies(home({ listPrice: 675_000 })), true);
assert.equal(homepageOpenHouseQualifies(home({ listPrice: 674_999 })), false);
assert.equal(homepageOpenHouseQualifies(home({ listPrice: null })), false);
assert.equal(homepageOpenHouseQualifies(home({ photoCount: 5 })), true);
assert.equal(homepageOpenHouseQualifies(home({ photoCount: 4 })), false);
assert.equal(homepageOpenHouseQualifies(home({ photoCount: 0 })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: null, style: null })), true);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Condominium", style: "Townhouse" })), true);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Manufactured Home" })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Manufactured On Land" })), false);
assert.equal(homepageOpenHouseQualifies(home({ style: "Manufactured House" })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Land", sqft: null })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Mobile Home" })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Commercial Industrial" })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Multi Family" })), false);
assert.equal(homepageOpenHouseQualifies(home({ propertyType: "Boat Slip" })), false);
assert.equal(
  homepageOpenHouseQualifies(home({ propertyType: "Single Family Residence", style: "Island" })),
  true,
  "island must not match the land exclusion"
);

const curated = selectHomepageOpenHouses(
  [
    home({ id: "cheap", listPrice: 209_999, propertyType: "Manufactured Home" }),
    home({ id: "thin", listPrice: 1_200_000, photoCount: 1 }),
    home({ id: "land", listPrice: 1_500_000, propertyType: "Land", sqft: null }),
    home({ id: "mid", listPrice: 800_000, sqft: 3000, photoCount: 10 }),
    home({ id: "top", listPrice: 1_375_000, sqft: 4095, photoCount: 30 }),
    home({ id: "tie-small", listPrice: 900_000, sqft: 1800, photoCount: 40 }),
    home({ id: "tie-large", listPrice: 900_000, sqft: 3200, photoCount: 8 }),
    home({ id: "tie-photos", listPrice: 850_000, sqft: 2000, photoCount: 12 }),
    home({ id: "tie-photos-more", listPrice: 850_000, sqft: 2000, photoCount: 36 }),
  ],
  6
);
assert.deepEqual(
  curated.map((row) => row.id),
  ["top", "tie-large", "tie-small", "tie-photos-more", "tie-photos", "mid"],
  "nicest qualified homes first; price, then sqft, then photos"
);

const short = selectHomepageOpenHouses(
  [
    home({ id: "nice", listPrice: 980_000 }),
    home({ id: "also", listPrice: 720_000, sqft: 2100 }),
    home({ id: "next", listPrice: 650_000, photoCount: 40 }),
    home({ id: "uglier", listPrice: 129_900, propertyType: "Manufactured Home", photoCount: 2 }),
    home({ id: "sparse-expensive", listPrice: 1_100_000, photoCount: 3 }),
  ],
  4
);
assert.deepEqual(
  short.map((row) => row.id),
  ["nice", "also", "sparse-expensive", "next"],
  "when fewer than the limit qualify, fill with the next-best by the same ranking"
);

const models = selectHomepageOpenHouses(
  [
    home({ id: "model-a", listPrice: 2_000_000, isModelHome: true }),
    home({ id: "model-b", listPrice: 1_900_000, isModelHome: true }),
    home({ id: "house", listPrice: 1_000_000 }),
    home({ id: "house-b", listPrice: 900_000 }),
  ],
  4,
  1
);
assert.deepEqual(models.map((row) => row.id), ["model-a", "house", "house-b"]);
assert.equal(models.filter((row) => row.isModelHome).length, 1);

assert.deepEqual(selectHomepageOpenHouses([home()], 0), []);
assert.deepEqual(selectHomepageOpenHouses([], 6), []);

console.log("homepage open house curation: ok");
