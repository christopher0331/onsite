/**
 * CRM API follow-up: this repo has no OnSite CRM credentials and no documented
 * CRM endpoint. Do not invent keys. Lead routes format a Resend email so an
 * agent can paste it into OnSite as a Warm buy-side lead (MLS note included).
 * Wire create/update once credentials exist.
 *
 * Do not auto-send a follow-up to the visitor. Resend is agent-only.
 */

export function clipText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function openHouseLeadSubject(address: string, mls: string) {
  const place = address.trim() || "Address not provided";
  const id = mls.trim() || "no MLS";
  return `Open house lead — ${place} — ${id}`;
}

const OPEN_HOUSE_EMAIL_SOURCES = new Set([
  "open_house",
  "homepage_open_houses",
  "request_showing",
  "ask_question",
  "listing_tour",
  "listing_open_house",
  "open_houses_page",
  "oh_alerts",
]);

export function contactEmailSubject(input: {
  firstName: string;
  lastName: string;
  topic: string;
  source: string;
  address: string;
  mls: string;
}) {
  const name = `${input.firstName} ${input.lastName}`.trim();
  if (input.source === "oh_alerts") return "Open house lead — alerts signup — no MLS";
  if (input.source === "home_evaluation" || input.topic === "evaluation") {
    return `Home evaluation request: ${name}`;
  }
  if (input.source === "homepage_open_houses") {
    return openHouseLeadSubject(input.address || "Private tour request", input.mls);
  }
  if ((input.address || input.mls) && OPEN_HOUSE_EMAIL_SOURCES.has(input.source)) {
    return openHouseLeadSubject(input.address, input.mls);
  }
  if (input.address || input.mls) {
    return `New website contact: ${name} — ${input.address || "listing"} — ${input.mls || "no MLS"}`;
  }
  return `New website contact: ${name}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export type LeadEmailRow = { label: string; value: string };

export async function sendLeadEmail(input: {
  subject: string;
  replyTo: string;
  heading: string;
  rows: LeadEmailRow[];
}): Promise<Response> {
  const apiKey = process.env.ONSITE_REGROUP_RESEND_KEY;
  if (!apiKey) {
    return Response.json({ error: "Missing Resend API key." }, { status: 500 });
  }

  const rows = input.rows.filter((row) => row.value.trim().length > 0);
  const htmlRows = rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;width:160px;vertical-align:top">${escapeHtml(row.label)}</td><td style="padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(row.value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#1a1a18">${escapeHtml(input.heading)}</h2>
      <p style="color:#444;font-size:14px">Paste into OnSite as a Warm buy-side lead when this is a buyer inquiry. No visitor follow-up email was sent.</p>
      <table style="width:100%;border-collapse:collapse">${htmlRows}</table>
    </div>
  `;

  const text = [input.heading, "No visitor follow-up email was sent.", "", ...rows.map((row) => `${row.label}: ${row.value}`)].join("\n");

  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL ?? "contact@onsiteregroup.com";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: ["andre@onsiteregroup.com"],
      reply_to: input.replyTo,
      subject: input.subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", detail);
    return Response.json({ error: "Failed to send email.", detail }, { status: 502 });
  }

  return Response.json({ ok: true });
}
