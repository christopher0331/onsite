import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  botGateBlockReason,
  consumeRateLimit,
  evaluateClientBotGate,
  evaluateFormBotGate,
  looksLikeGibberishName,
  MIN_SUBMIT_MS,
  resetRateLimitForTests,
  tokenLooksRandom,
} from "../src/lib/formBotGate.ts";
import { POST } from "../src/app/api/contact/route.ts";

const now = 1_700_000_000_000;

function allowedBody(overrides = {}) {
  return {
    firstName: "Christopher",
    lastName: "Hancock",
    email: "chris@example.com",
    phone: "2535550100",
    topic: "buying",
    message: "Looking in Bonney Lake",
    website: "",
    fax_number: "",
    form_loaded_at: now - 8_000,
    ...overrides,
  };
}

assert.equal(evaluateFormBotGate(allowedBody(), { now }).allow, true, "real lead must pass");
assert.equal(botGateBlockReason(evaluateFormBotGate(allowedBody(), { now })), undefined);
assert.equal(
  botGateBlockReason(evaluateFormBotGate(allowedBody({ website: "https://spam.test" }), { now })),
  "honeypot",
);

assert.deepEqual(
  evaluateFormBotGate(allowedBody({ website: "https://spam.test" }), { now }),
  { allow: false, reason: "honeypot" },
);
assert.deepEqual(
  evaluateFormBotGate(allowedBody({ fax_number: "555-0100" }), { now }),
  { allow: false, reason: "honeypot" },
);

assert.deepEqual(
  evaluateFormBotGate(allowedBody({ form_loaded_at: now - 400 }), { now }),
  { allow: false, reason: "too_fast" },
);
assert.ok(MIN_SUBMIT_MS >= 3000);

assert.deepEqual(
  evaluateFormBotGate(allowedBody({ form_loaded_at: now - 49 * 60 * 60 * 1000 }), { now }),
  { allow: false, reason: "stale_or_tampered" },
);
assert.deepEqual(
  evaluateFormBotGate(allowedBody({ form_loaded_at: now + 30_000 }), { now }),
  { allow: false, reason: "stale_or_tampered" },
);

assert.deepEqual(
  evaluateFormBotGate(allowedBody({ form_loaded_at: undefined }), { now }),
  { allow: false, reason: "missing_timestamp" },
);

assert.equal(looksLikeGibberishName("Jpkwuws"), true);
assert.equal(looksLikeGibberishName("Hqvaal", "Soktme"), true);
assert.equal(looksLikeGibberishName("Augblzr Tbnwu"), true);
assert.equal(looksLikeGibberishName("Buy now https://spam.test"), true);
assert.equal(tokenLooksRandom("Hqvaal"), true);
assert.equal(tokenLooksRandom("x".repeat(40)), true);

for (const name of [
  "Christopher Hancock",
  "Nguyen",
  "Schmidt",
  "Schwartz",
  "Mary-Anne",
  "Jose",
  "Li",
]) {
  assert.equal(looksLikeGibberishName(name), false, `false positive on ${name}`);
}

assert.deepEqual(
  evaluateFormBotGate(allowedBody({ firstName: "Jpkwuws", lastName: "Tbnwu" }), { now }),
  { allow: false, reason: "gibberish_name" },
);

const clientNow = Date.now();
assert.equal(
  evaluateClientBotGate({ website: "x", form_loaded_at: clientNow - 8_000 }).allow,
  false,
);
assert.equal(
  evaluateClientBotGate({
    firstName: "Jpkwuws",
    website: "",
    form_loaded_at: clientNow - 8_000,
  }).allow,
  true,
  "client gate must not apply the name heuristic",
);

resetRateLimitForTests();
assert.equal(consumeRateLimit("t", 3, 60_000, now), true);
assert.equal(consumeRateLimit("t", 3, 60_000, now + 10), true);
assert.equal(consumeRateLimit("t", 3, 60_000, now + 20), true);
assert.equal(consumeRateLimit("t", 3, 60_000, now + 30), false);
assert.equal(consumeRateLimit("t", 3, 60_000, now + 60_000), true, "window reset");

const contactPage = readFileSync(new URL("../src/app/contact-us/page.tsx", import.meta.url), "utf8");
const homeEvalPage = readFileSync(
  new URL("../src/app/free-home-evaluation/page.tsx", import.meta.url),
  "utf8",
);
const contactRoute = readFileSync(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8");
assert.match(contactPage, /useFormBotGate/, "contact form must mount the bot trap");
assert.match(contactPage, /\/api\/contact/, "contact form must post through the gated route");
assert.match(homeEvalPage, /useFormBotGate/, "home evaluation form must mount the bot trap");
assert.match(contactRoute, /guardLeadRequest/, "contact route must run the server gate");
assert.match(contactRoute, /fakeLeadSuccess/, "contact route must fake-succeed spam");

const forwarded = [];
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  forwarded.push({ url: String(url), body: init?.body ? JSON.parse(String(init.body)) : null });
  return new Response(JSON.stringify({ id: "email_test" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

process.env.ONSITE_REGROUP_RESEND_KEY = "test-key";
resetRateLimitForTests();

function leadRequest(body, ip) {
  return new Request("https://onsiteregroup.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

function humanBody(ageMs = 5_000) {
  return {
    firstName: "André",
    lastName: "Bohall",
    email: "andre.reader@example.com",
    phone: "2535550100",
    topic: "selling",
    message: "We would like a valuation on our Bonney Lake home.",
    website: "",
    fax_number: "",
    form_loaded_at: Date.now() - ageMs,
  };
}

async function expectFake(body, ip, label) {
  const before = forwarded.length;
  const res = await POST(leadRequest(body, ip));
  const json = await res.json();
  assert.equal(res.status, 200, label);
  assert.deepEqual(json, { ok: true }, label);
  assert.equal(forwarded.length, before, `${label} must not forward`);
}

await expectFake(
  { ...humanBody(), website: "https://spam.test" },
  "203.0.113.10",
  "honeypot",
);
await expectFake(
  { ...humanBody(), fax_number: "555-0199" },
  "203.0.113.11",
  "fax honeypot",
);
await expectFake(humanBody(500), "203.0.113.12", "under 3 seconds");
await expectFake(
  { ...humanBody(), firstName: "Jpkwuws", lastName: "Tbnwu" },
  "203.0.113.13",
  "bad name",
);
await expectFake(
  { ...humanBody(), firstName: "Visit https://spam.test" },
  "203.0.113.14",
  "url name",
);

const rateIp = "203.0.113.20";
for (let i = 1; i <= 8; i += 1) {
  const res = await POST(leadRequest(humanBody(), rateIp));
  const json = await res.json();
  assert.equal(res.status, 200, `request ${i}`);
  assert.deepEqual(json, { ok: true }, `request ${i}`);
}
assert.equal(forwarded.length, 8, "first 8 human submits from one IP are forwarded");
await expectFake(humanBody(), rateIp, "9th request in 10 minutes");

const valid = await POST(leadRequest(humanBody(5_000), "203.0.113.30"));
const validJson = await valid.json();
assert.equal(valid.status, 200);
assert.deepEqual(validJson, { ok: true });
assert.equal(forwarded.length, 9, "valid human payload is forwarded");
const last = forwarded.at(-1);
assert.match(String(last.url), /api\.resend\.com\/emails/);
assert.match(JSON.stringify(last.body), /André/);
assert.match(JSON.stringify(last.body), /andre\.reader@example.com/);

globalThis.fetch = originalFetch;
console.log("formBotGate: all assertions passed");
