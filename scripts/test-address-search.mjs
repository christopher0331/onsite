import assert from "node:assert/strict";
import {
  applyFreeTextLocation,
  includeAddressHistoryStatuses,
  isHouseNumberSearch,
  rankAddressMatch,
  resolveLocationQuery,
} from "../src/lib/address-search.ts";

const example = resolveLocationQuery(
  "11219 210th Avenue Ct E, Bonney Lake, WA 98391"
);
assert.equal(example.kind, "address");
if (example.kind === "address") {
  assert.equal(example.streetNumber, "11219");
  assert.equal(example.streetName, "210th");
  assert.equal(example.streetSearch, "11219 210th");
  assert.equal(example.city, "Bonney Lake");
  assert.equal(example.state, "WA");
  assert.equal(example.zip, "98391");
  assert.equal(example.direction, "E");
  assert.deepEqual(example.suffixes, ["avenue", "ct"]);
}

const spelled = resolveLocationQuery(
  "11219 210th Avenue Court East, Bonney Lake, Washington 98391"
);
assert.equal(spelled.kind, "address");
if (spelled.kind === "address") {
  assert.equal(spelled.streetSearch, "11219 210th");
  assert.equal(spelled.city, "Bonney Lake");
  assert.equal(spelled.state, "WA");
  assert.equal(spelled.direction, "E");
  assert.deepEqual(spelled.suffixes, ["avenue", "court"]);
}

const abbreviated = resolveLocationQuery("15709 210th Ave E");
assert.equal(abbreviated.kind, "address");
if (abbreviated.kind === "address") {
  assert.equal(abbreviated.streetSearch, "15709 210th");
  assert.equal(abbreviated.city, null);
  assert.equal(abbreviated.zip, null);
}

const partialNumber = resolveLocationQuery("12914 210th");
assert.equal(partialNumber.kind, "address");
if (partialNumber.kind === "address") assert.equal(partialNumber.streetSearch, "12914 210th");

const streetOnly = resolveLocationQuery("210th Avenue Ct E");
assert.equal(streetOnly.kind, "address");
if (streetOnly.kind === "address") {
  assert.equal(streetOnly.streetNumber, null);
  assert.equal(streetOnly.streetSearch, "210th");
}

const noCommaCity = resolveLocationQuery("15709 210th Avenue E Bonney Lake WA 98391");
assert.equal(noCommaCity.kind, "address");
if (noCommaCity.kind === "address") {
  assert.equal(noCommaCity.streetSearch, "15709 210th");
  assert.equal(noCommaCity.city, "Bonney Lake");
  assert.equal(noCommaCity.zip, "98391");
}

const unit = resolveLocationQuery("15217 210th Avenue E #990, Bonney Lake, WA");
assert.equal(unit.kind, "address");
if (unit.kind === "address") assert.equal(unit.streetSearch, "15217 210th");

const preDir = resolveLocationQuery("123 NE 210th Ave");
assert.equal(preDir.kind, "address");
if (preDir.kind === "address") assert.equal(preDir.streetSearch, "123 210th");

const northMain = resolveLocationQuery("123 North Main Street");
assert.equal(northMain.kind, "address");
if (northMain.kind === "address") assert.equal(northMain.streetSearch, "123 main");

const northStreet = resolveLocationQuery("500 North Street");
assert.equal(northStreet.kind, "address");
if (northStreet.kind === "address") assert.equal(northStreet.streetSearch, "500 north");

const vacant = resolveLocationQuery("0 Rhodes Lake Road E");
assert.equal(vacant.kind, "address");
if (vacant.kind === "address") assert.equal(vacant.streetSearch, "0 rhodes lake");

assert.deepEqual(resolveLocationQuery("Bonney Lake"), {
  kind: "place",
  text: "Bonney Lake",
  state: null,
  zip: null,
});
assert.equal(resolveLocationQuery("bonney lake, wa").kind, "place");
if (resolveLocationQuery("bonney lake, wa").kind === "place") {
  const place = resolveLocationQuery("bonney lake, WA 98391");
  assert.equal(place.kind, "place");
  if (place.kind === "place") {
    assert.equal(place.text, "Bonney Lake");
    assert.equal(place.state, "WA");
    assert.equal(place.zip, "98391");
  }
}
assert.deepEqual(resolveLocationQuery("Federal Way"), {
  kind: "place",
  text: "Federal Way",
  state: null,
  zip: null,
});
assert.equal(resolveLocationQuery("University Place").kind, "place");
assert.equal(resolveLocationQuery("Tehaleh").kind, "place");
if (resolveLocationQuery("Tehaleh").kind === "place") {
  assert.equal(resolveLocationQuery("Tehaleh").kind === "place" && resolveLocationQuery("Tehaleh").text, "Tehaleh");
}
assert.equal(resolveLocationQuery("South Hill").kind, "place");
assert.deepEqual(resolveLocationQuery("98391"), { kind: "zip", zip: "98391" });
assert.equal(resolveLocationQuery("NWM2488411").kind, "place");
assert.equal(resolveLocationQuery("210th").kind, "place");

const params = new URLSearchParams();
const applied = applyFreeTextLocation(
  params,
  "11219 210th Avenue Ct E, Bonney Lake, WA 98391"
);
assert.equal(applied.kind, "address");
assert.equal(params.get("search"), "11219 210th");
assert.equal(params.get("searchFields"), "address.streetNumber,address.streetName");
assert.equal(params.get("city"), "Bonney Lake");
assert.equal(params.get("zip"), "98391");
assert.equal(params.get("state"), "WA");
assert.equal(params.get("search")?.includes("Avenue"), false);
assert.equal(params.get("search")?.includes(","), false);
assert.equal(isHouseNumberSearch(params), true);

const cityParams = new URLSearchParams();
applyFreeTextLocation(cityParams, "Bonney Lake");
assert.equal(cityParams.get("city"), "Bonney Lake");
assert.equal(cityParams.get("search"), null);
assert.equal(cityParams.get("searchFields"), null);

const zipParams = new URLSearchParams();
applyFreeTextLocation(zipParams, "98391");
assert.equal(zipParams.get("zip"), "98391");
assert.equal(zipParams.get("city"), null);

const status = new URLSearchParams();
status.append("standardStatus", "Active");
status.append("standardStatus", "Active Under Contract");
includeAddressHistoryStatuses(status);
assert.deepEqual(status.getAll("standardStatus"), [
  "Active",
  "Active Under Contract",
  "Pending",
  "Closed",
]);

const soldOnly = new URLSearchParams();
soldOnly.set("standardStatus", "Closed");
includeAddressHistoryStatuses(soldOnly);
assert.deepEqual(soldOnly.getAll("standardStatus"), ["Closed"]);

const ranked = rankAddressMatch(
  {
    standardStatus: "Active",
    address: {
      streetNumber: "11219",
      streetName: "210th",
      streetSuffix: "Avenue Ct",
      streetDirection: "E",
      city: "Bonney Lake",
      zip: "98391",
    },
  },
  example.kind === "address" ? example : { kind: "address", streetNumber: "11219", streetName: "210th", streetSearch: "11219 210th", city: "Bonney Lake", state: "WA", zip: "98391", direction: "E", suffixes: ["avenue", "ct"] }
);
assert.ok(ranked > 0);

const otherStreet = rankAddressMatch(
  {
    standardStatus: "Active",
    address: { streetNumber: "15709", streetName: "210th", city: "Bonney Lake", zip: "98391" },
  },
  example.kind === "address" ? example : { kind: "address", streetNumber: "11219", streetName: "210th", streetSearch: "11219 210th", city: null, state: null, zip: null, direction: null, suffixes: [] }
);
assert.equal(otherStreet, -1);

console.log("address-search tests passed");
