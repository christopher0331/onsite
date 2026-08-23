import { posthogSuperProperties } from "@/lib/posthogConfig";

function capturePosthog(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const props = { ...posthogSuperProperties(), ...properties };
  try {
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(event, props);
      return;
    }
  } catch {
    // fall through to the queue so a deferred snippet still gets the event
  }
  (window.__phEventQueue ??= []).push({ event, properties: props });
}

function pagePath(): string {
  return typeof window !== "undefined" ? window.location.pathname : "";
}

export function trackLeadSubmitted(formType: string, extra?: Record<string, unknown>): void {
  capturePosthog("lead_submitted", {
    form_type: formType,
    page_path: pagePath(),
    ...extra,
  });
}

export function trackPhoneCall(phoneNumber: string): void {
  const path = pagePath();
  capturePosthog("phone_call", { phone_number: phoneNumber, page_path: path });
  capturePosthog("lead_intent", { intent_type: "cta_phone", page_path: path });
}

export function trackLeadIntent(intentType: string, extra?: Record<string, unknown>): void {
  capturePosthog("lead_intent", {
    intent_type: intentType,
    page_path: pagePath(),
    ...extra,
  });
}
