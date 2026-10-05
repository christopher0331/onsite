import { fakeLeadSuccess, guardLeadRequest } from "../_lib/guardLeadRequest";
import {
  clipText,
  contactEmailSubject,
  isPlausibleEmail,
  sendLeadEmail,
} from "../_lib/sendLeadEmail";

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

  const firstName = clipText(payload.firstName, 80);
  const lastName = clipText(payload.lastName, 80);
  const email = clipText(payload.email, 160);
  const phone = clipText(payload.phone, 40);
  const topic = clipText(payload.topic, 40);
  const message = clipText(payload.message, 4000);
  const mls = clipText(payload.mls, 32);
  const address = clipText(payload.address, 240);
  const source = clipText(payload.source, 80);

  if (!firstName || !lastName || !email || !topic) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!isPlausibleEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const topicLabel: Record<string, string> = {
    buying: "Buying a Home",
    selling: "Selling a Home",
    evaluation: "Home Evaluation",
    general: "General Questions",
  };

  return sendLeadEmail({
    subject: contactEmailSubject({ firstName, lastName, topic, source, address, mls }),
    replyTo: email,
    heading: topic === "evaluation" ? "Home evaluation request" : "New website contact",
    rows: [
      { label: "Name", value: `${firstName} ${lastName}` },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "Not provided" },
      { label: "Topic", value: topicLabel[topic] ?? topic },
      { label: "Source", value: source || "contact" },
      { label: "Address", value: address },
      { label: "MLS", value: mls },
      { label: "CRM stage", value: source || mls || address ? "Warm" : "" },
      { label: "CRM side", value: topic === "selling" || topic === "evaluation" ? "Sellers" : "Buyers" },
      {
        label: "CRM note",
        value: [address && `About ${address}`, mls && `MLS# ${mls}`, source && `source=${source}`]
          .filter(Boolean)
          .join(" — "),
      },
      { label: "Message", value: message || "No message provided" },
    ],
  });
}
