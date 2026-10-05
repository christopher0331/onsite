import { fakeLeadSuccess, guardLeadRequest } from "../_lib/guardLeadRequest";
import {
  clipText,
  isPlausibleEmail,
  openHouseLeadSubject,
  sendLeadEmail,
} from "../_lib/sendLeadEmail";

/**
 * Open-house capture (inline listing form, /open-houses, alerts).
 *
 * CRM API follow-up: no OnSite CRM credentials live in this repo. This route
 * only emails André via Resend, with a subject and CRM paste rows an agent
 * can drop into OnSite as a Warm buy-side lead. Do not invent API keys, and
 * do not email the visitor from here.
 */
const LISTING_SOURCES = new Set(["listing_open_house", "open_houses_page", "open_house"]);

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const gate = guardLeadRequest(request, payload);
  if (gate.blocked) {
    return fakeLeadSuccess();
  }

  const name = clipText(payload.name, 120);
  const email = clipText(payload.email, 160);
  const phone = clipText(payload.phone, 40);
  const note = clipText(payload.note, 4000);
  const intent = clipText(payload.intent, 40);
  const mls = clipText(payload.mls, 32);
  const address = clipText(payload.address, 240);
  const city = clipText(payload.city, 80);
  const openHouseWhen = clipText(payload.openHouseWhen, 160);
  const brokerageName = clipText(payload.brokerageName, 160);
  const listPrice = clipText(payload.listPrice, 40);
  const source = clipText(payload.source, 80);
  const surface = clipText(payload.surface, 80);
  const isLive = payload.isLive === true || payload.isLive === "true";
  const utmSource = clipText(payload.utmSource, 80);
  const utmMedium = clipText(payload.utmMedium, 80);
  const utmCampaign = clipText(payload.utmCampaign, 80);

  if (!name || !email || !phone) {
    return Response.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }
  if (!isPlausibleEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return Response.json({ error: "Enter a phone number we can call." }, { status: 400 });
  }

  const alerts = source === "oh_alerts" || intent === "alerts";
  if (!alerts && !LISTING_SOURCES.has(source) && source !== "open_houses_page") {
    return Response.json({ error: "Unknown lead source." }, { status: 400 });
  }
  if (!alerts && source !== "open_houses_page" && !mls && !address) {
    return Response.json({ error: "Missing listing context." }, { status: 400 });
  }

  const intentLabel =
    intent === "attend"
      ? `Planning to attend${openHouseWhen ? ` ${openHouseWhen}` : ""}`
      : intent === "private_tour"
        ? "Request another time / private tour"
        : intent === "alerts"
          ? "Open house alerts"
          : intent || "Not specified";

  const subject = alerts
    ? "Open house lead — alerts signup — no MLS"
    : openHouseLeadSubject(address, mls);

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  return sendLeadEmail({
    subject,
    replyTo: email,
    heading: alerts ? "Open house alerts signup" : "Open house lead",
    rows: [
      { label: "CRM stage", value: "Warm" },
      { label: "CRM side", value: "Buyers" },
      {
        label: "CRM note",
        value: alerts
          ? "Open house alerts signup"
          : `Open house — ${address || "address not provided"} — MLS# ${mls || "n/a"}`,
      },
      { label: "Name", value: name },
      { label: "First name", value: firstName },
      { label: "Last name", value: lastName },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Intent", value: intentLabel },
      { label: "Open house", value: openHouseWhen },
      { label: "Address", value: address },
      { label: "City", value: city },
      { label: "MLS", value: mls },
      { label: "List price", value: listPrice },
      { label: "Listed by", value: brokerageName },
      { label: "Source", value: source },
      { label: "Surface", value: surface },
      { label: "Live now", value: isLive ? "yes" : "no" },
      { label: "Visitor note", value: note },
      { label: "UTM source", value: utmSource },
      { label: "UTM medium", value: utmMedium },
      { label: "UTM campaign", value: utmCampaign },
    ],
  });
}
