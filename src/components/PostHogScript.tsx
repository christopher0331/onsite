"use client";

import { useEffect } from "react";
import { POSTHOG_HOST, POSTHOG_KEY, posthogSuperProperties, shouldSkipPosthogCapture } from "@/lib/posthogConfig";

/**
 * Loads PostHog (session replay + heatmaps) on first interaction or after 8s.
 */
export default function PostHogScript() {
  useEffect(() => {
    if (!POSTHOG_KEY || shouldSkipPosthogCapture()) return;

    let loaded = false;
    const events = ["pointerdown", "scroll", "keydown", "touchstart"] as const;

    const load = () => {
      if (loaded) return;
      loaded = true;
      events.forEach((e) => window.removeEventListener(e, load));

      const w = window as Window & { posthog?: { __SV?: number } };
      if (w.posthog && w.posthog.__SV) return;

      const snippet = document.createElement("script");
      snippet.id = "posthog-init";
      snippet.text = `
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        window.posthog.init(${JSON.stringify(POSTHOG_KEY)}, {
          api_host: ${JSON.stringify(POSTHOG_HOST)},
          ui_host: "https://us.posthog.com",
          defaults: "2025-05-24",
          person_profiles: "identified_only",
          session_recording: { maskAllInputs: true },
          loaded: function (ph) {
            ph.register(${JSON.stringify(posthogSuperProperties())});
            var q = window.__phEventQueue || [];
            window.__phEventQueue = [];
            for (var i = 0; i < q.length; i++) {
              ph.capture(q[i].event, q[i].properties);
            }
          }
        });
      `;
      document.head.appendChild(snippet);
    };

    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const fallback = setTimeout(load, 8000);

    return () => {
      clearTimeout(fallback);
      events.forEach((e) => window.removeEventListener(e, load));
    };
  }, []);

  return null;
}
