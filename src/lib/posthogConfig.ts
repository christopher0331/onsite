/**
 * Onsite Real Estate Group lives in the billed Reactiv Labs / MyFence.com
 * PostHog organization as its own project. Do not use the MyFence token.
 */
export const SITE_ID = String(process.env.NEXT_PUBLIC_SITE_ID ?? "onsiteregroup").trim() || "onsiteregroup";

const ONSITE_PROJECT_KEY = "phc_yrHTBNqqJpa5wPtFxf7KpwjpLpWq5XVXE9ogVysPGpjZ";

export const POSTHOG_KEY =
  String(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").trim() || ONSITE_PROJECT_KEY;

export const POSTHOG_HOST = String(process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com").trim();

export function posthogSuperProperties(): Record<string, string> {
  return {
    client: SITE_ID,
    site: SITE_ID,
  };
}

export type PosthogQueueItem = { event: string; properties?: Record<string, unknown> };

declare global {
  interface Window {
    __phEventQueue?: PosthogQueueItem[];
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      register?: (properties: Record<string, unknown>) => void;
    };
  }
}
