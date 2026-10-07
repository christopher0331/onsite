import assert from "node:assert/strict";
import {
  HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS,
  HOMEPAGE_OPEN_HOUSE_MIN_PRICE,
  dedupeOpenHouseListings,
  homepageOpenHouseQualifies,
  normalizeOpenHouseAddress,
  selectHomepageOpenHouses,
} from "../src/lib/homepage-open-houses.ts";

const AUBURN_LIST_DATE = Date.parse("2026-10-02T00:00:00.000Z");

function home(overrides = {}) {
  return {
    id: "NWM1",
    mlsNumber: "NWM1",
    street: "10 Main Street",
    city: "Puyallup",
    zip: "98374",
    listDateMs: 1_000,
    nextOpenMs: 5_000,
    listPrice: 900_000,
    sqft: 2400,
    photoCount: 24,
    propertyType: "Single Family Residence",
    style: "House",
    isModelHome: false,
    ...overrides,
  };
}

assert.equal(HOMEPAGE_OPEN_HOUSE_MIN_PRICE, 650_000);
assert.equal(HOMEPAGE_OPEN_HOUSE_MIN_PHOTOS, 5);

assert.equal(homepageOpenHouseQualifies(home()), true);
assert.equal(homepageOpenHouseQualifies(home({ listPrice: 650_000 })), true);
assert.equal(homepageOpenHouseQualifies(home({ listPrice: 649_999 })), false);
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
    home({ id: "next", listPrice: 640_000, photoCount: 40 }),
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

assert.equal(
  normalizeOpenHouseAddress("18228 SE 394th Street", " Auburn ", "98092"),
  normalizeOpenHouseAddress("18228 SE 394th St", "auburn", "98092")
);
assert.equal(
  normalizeOpenHouseAddress("1517 176th Avenue Court E", "Lake Tapps", "98391"),
  normalizeOpenHouseAddress("1517 176th Ave Ct E", "lake tapps", "98391")
);
assert.notEqual(
  normalizeOpenHouseAddress("13915 178th Street E #36", "Puyallup", "98374"),
  normalizeOpenHouseAddress("13915 178th Street E #56", "Puyallup", "98374")
);

const auburnOld = home({
  id: "NWM2466887",
  mlsNumber: "NWM2466887",
  street: "18228 SE 394th Street",
  city: "Auburn",
  zip: "98092",
  listPrice: 1_298_000,
  sqft: 2572,
  listDateMs: AUBURN_LIST_DATE,
  nextOpenMs: 1_000,
});
const auburnNew = home({
  id: "NWM2590852",
  mlsNumber: "NWM2590852",
  street: "18228 SE 394th St",
  city: "auburn",
  zip: "98092",
  listPrice: 1_298_000,
  sqft: 2572,
  listDateMs: AUBURN_LIST_DATE,
  nextOpenMs: 9_000,
});
const auburn = dedupeOpenHouseListings([auburnOld, auburnNew]);
assert.equal(auburn.length, 1);
assert.equal(auburn[0].mlsNumber, "NWM2590852", "relist with the higher MLS number is kept");

const newerDateWins = dedupeOpenHouseListings([
  home({ mlsNumber: "NWM3000000", street: "5 Oak Street", listDateMs: 1, nextOpenMs: 1 }),
  home({ mlsNumber: "NWM1000000", street: "5 Oak St", listDateMs: 2, nextOpenMs: 9 }),
]);
assert.equal(newerDateWins[0].mlsNumber, "NWM1000000", "a later list date beats a higher MLS number");

const sessions = dedupeOpenHouseListings([
  home({
    id: "late",
    mlsNumber: "NWM111",
    street: "10 Main Street",
    listDateMs: 5,
    nextOpenMs: 9_000,
  }),
  home({
    id: "soon",
    mlsNumber: "NWM111",
    street: "10 Main St",
    listDateMs: 5,
    nextOpenMs: 1_000,
  }),
]);
assert.equal(sessions.length, 1);
assert.equal(sessions[0].id, "soon", "two sessions of one listing keep the sooner open house");

const units = dedupeOpenHouseListings([
  home({ mlsNumber: "NWM1", street: "13915 178th Street E #36", nextOpenMs: 1, listDateMs: 1 }),
  home({ mlsNumber: "NWM2", street: "13915 178th Street E #56", nextOpenMs: 1, listDateMs: 1 }),
]);
assert.equal(units.length, 2, "different unit numbers stay separate");

const homepage = selectHomepageOpenHouses(
  dedupeOpenHouseListings([
    auburnOld,
    auburnNew,
    home({ id: "enumclaw", mlsNumber: "NWM2510893", street: "120 Jester Lane", city: "Enumclaw", zip: "98022", listPrice: 650_000, photoCount: 29 }),
    home({ id: "under", mlsNumber: "NWM9", street: "8 Pine Street", listPrice: 649_000, photoCount: 30 }),
  ]),
  2
);
assert.deepEqual(
  homepage.map((row) => row.mlsNumber),
  ["NWM2590852", "NWM2510893"],
  "homepage shows the Auburn relist once, and the $650,000 home, not its under-floor neighbor"
);

console.log("homepage open house curation: ok");
