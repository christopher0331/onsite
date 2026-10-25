import assert from "node:assert/strict";
import { formatListingBrokerParts, getListingBrokerInfo } from "../src/lib/listing-broker.ts";

const info = getListingBrokerInfo({
  raw: {
    ListOfficeName: "Timber Real Estate",
    ListAgentFullName: "Andre Bohall",
    ListAgentEmail: "agent@example.com",
    ListOfficePhone: "253-000-0000",
    BuyerOfficeName: "Buyer Realty",
  },
  agents: [{ name: "Fallback Agent", phones: ["(253) 441-9764"] }],
});
assert.deepEqual(formatListingBrokerParts(info), [
  "Timber Real Estate",
  "Andre Bohall",
  "(253) 441-9764",
  "agent@example.com",
]);
assert.equal(info.buyerFirm, "Buyer Realty");

// Falls back to normalized fields; skips missing parts.
const fb = getListingBrokerInfo({
  office: { brokerageName: "Firm B" },
  agents: [{ name: "Agent B", phones: [] }],
  raw: { ListOfficePhone: "206-111-2222" },
});
assert.deepEqual(formatListingBrokerParts(fb), ["Firm B", "Agent B", "206-111-2222"]);
assert.equal(fb.buyerFirm, "");
assert.deepEqual(formatListingBrokerParts(getListingBrokerInfo({})), []);
console.log("listing-broker tests passed");
