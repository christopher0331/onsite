/** Query-string contract for /contact-us prefill. */
export const CONTACT_TOPICS = ["buying", "selling", "evaluation", "general"] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Sources that mean the visitor is asking about buying / touring a home. */
export const CONTACT_BUYING_SOURCES = new Set([
  "open_house",
  "homepage_open_houses",
  "request_showing",
  "ask_question",
  "listing_tour",
  "listing_open_house",
  "open_houses_page",
]);

type ParamReader = { get(name: string): string | null };

export function contactHref(input: {
  mls?: string;
  address?: string;
  src?: string;
  topic?: ContactTopic;
}) {
  const q = new URLSearchParams();
  if (input.mls) q.set("mls", input.mls);
  if (input.address) q.set("address", input.address);
  if (input.src) q.set("src", input.src);
  if (input.topic) q.set("topic", input.topic);
  const s = q.toString();
  return s ? `/contact-us?${s}` : "/contact-us";
}

export function topicFromContactParams(params: ParamReader): string {
  const topic = (params.get("topic") ?? "").trim();
  if ((CONTACT_TOPICS as readonly string[]).includes(topic)) return topic;
  const src = (params.get("src") ?? "").trim();
  if (CONTACT_BUYING_SOURCES.has(src) || params.get("mls") || params.get("address")) return "buying";
  return "";
}
