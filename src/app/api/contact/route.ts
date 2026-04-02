type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  topic: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.ONSITE_REGROUP_RESEND_KEY;

  if (!apiKey) {
    return Response.json({ error: "Missing Resend API key." }, { status: 500 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, topic, message } = payload;

  if (!firstName || !lastName || !email || !topic) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1a1a18">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;width:120px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(phone ?? "Not provided")}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Topic</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(topic)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(message ?? "No message provided")}</td></tr>
      </table>
    </div>
  `;

  const text = [
    "New Contact Form Submission",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone ?? "Not provided"}`,
    `Topic: ${topic}`,
    `Message: ${message ?? "No message provided"}`,
  ].join("\n");

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
      reply_to: email,
      subject: `New website contact: ${firstName} ${lastName}`,
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
