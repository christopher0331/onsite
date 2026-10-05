"use client";

import { useState } from "react";
import { trackLeadIntent, trackLeadSubmitted } from "@/lib/analytics";
import { useFormBotGate } from "@/hooks/useFormBotGate";

type FormState = "idle" | "loading" | "success" | "error";
type Intent = "attend" | "private_tour";

type OpenHouseLeadFormProps = {
  theme?: "dark" | "light";
  mode: "listing" | "visit" | "alerts";
  source: string;
  surface: string;
  mls?: string;
  address?: string;
  city?: string;
  openHouseWhen?: string;
  brokerageName?: string;
  listPrice?: string;
  isLive?: boolean;
  heading?: string;
  subcopy?: string;
  id?: string;
};

function utmFields() {
  if (typeof window === "undefined") return { utmSource: "", utmMedium: "", utmCampaign: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

const inputClass =
  "w-full bg-white border border-charcoal/[0.12] rounded-full px-5 py-3 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40";

export default function OpenHouseLeadForm({
  theme = "light",
  mode,
  source,
  surface,
  mls = "",
  address = "",
  city = "",
  openHouseWhen = "",
  brokerageName = "",
  listPrice = "",
  isLive = false,
  heading,
  subcopy,
  id,
}: OpenHouseLeadFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [intent, setIntent] = useState<Intent | "">("");
  const [homeText, setHomeText] = useState("");
  const botGate = useFormBotGate(`${source}-`);
  const dark = theme === "dark";

  const title =
    heading ??
    (mode === "alerts"
      ? "Get open house alerts"
      : "Can't make it? Request a private tour");
  const detail =
    subcopy ??
    (mode === "alerts"
      ? "Leave your name, email, and phone. An OnSite agent will follow up about upcoming East Pierce open houses. This is not a booking."
      : "Tell us you're coming, or ask for another time. An OnSite agent will reach out — we don't book a slot online.");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (botGate.shouldFakeSuccess()) {
      setFormState("success");
      return;
    }

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const note = (form.elements.namedItem("note") as HTMLTextAreaElement | null)?.value.trim() ?? "";

    if (mode !== "alerts" && !intent) {
      setErrorMsg("Choose whether you're coming to this open house or want another time.");
      setFormState("error");
      return;
    }

    setFormState("loading");

    const visitAddress = mode === "visit" ? homeText.trim() || address : address;
    const body = {
      name,
      email,
      phone,
      note,
      intent: mode === "alerts" ? "alerts" : intent,
      mls: mode === "visit" && !mls ? "" : mls,
      address: visitAddress,
      city,
      openHouseWhen,
      brokerageName,
      listPrice,
      source,
      surface,
      isLive,
      ...utmFields(),
      ...botGate.getFields(),
    };

    try {
      const res = await fetch("/api/open-house-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }
      trackLeadIntent("oh_form_submit", {
        mls: mls || undefined,
        surface,
        is_live: isLive,
        intent: body.intent,
        source,
      });
      trackLeadSubmitted(source, { mls: mls || undefined, surface, intent: body.intent });
      setFormState("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div id={id} className={dark ? "text-white" : "text-charcoal"}>
        <p className="font-serif text-[1.35rem] font-light">Thanks — we have it.</p>
        <p className={`mt-2 text-[14px] leading-relaxed ${dark ? "text-white/75" : "text-charcoal/80"}`}>
          An OnSite agent will reach out. Nothing is booked online, and we don&apos;t send an automatic follow-up email.
        </p>
      </div>
    );
  }

  const labelClass = `text-[11px] uppercase tracking-[0.18em] ${dark ? "text-white/70" : "text-charcoal/75"}`;
  const radioClass = `flex items-start gap-2.5 rounded-2xl border px-3.5 py-3 text-[13px] leading-snug ${
    dark ? "border-white/20 text-white" : "border-charcoal/15 bg-white text-charcoal"
  }`;

  return (
    <form id={id} onSubmit={handleSubmit} className="relative space-y-3">
      {botGate.trap}
      <div>
        <p className={`font-serif text-[1.25rem] font-light leading-snug ${dark ? "text-white" : "text-charcoal"}`}>
          {title}
        </p>
        <p className={`mt-1.5 text-[13px] leading-relaxed ${dark ? "text-white/70" : "text-charcoal/75"}`}>
          {detail}
        </p>
      </div>

      {mode !== "alerts" && (
        <fieldset className="space-y-2">
          <legend className="sr-only">How should OnSite follow up?</legend>
          <label className={radioClass}>
            <input
              type="radio"
              name="oh-intent"
              value="attend"
              checked={intent === "attend"}
              onChange={() => setIntent("attend")}
              className="mt-0.5"
            />
            <span>
              I&apos;m planning to attend
              {openHouseWhen ? ` ${openHouseWhen}` : " the posted open house"}
            </span>
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="oh-intent"
              value="private_tour"
              checked={intent === "private_tour"}
              onChange={() => {
                setIntent("private_tour");
                trackLeadIntent("oh_tour_request", {
                  mls: mls || undefined,
                  surface,
                  is_live: isLive,
                });
              }}
              className="mt-0.5"
            />
            <span>Request another time / private tour</span>
          </label>
        </fieldset>
      )}

      {mode === "visit" && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${source}-home`}>
            Which home? (optional)
          </label>
          <input
            id={`${source}-home`}
            value={homeText}
            onChange={(e) => setHomeText(e.target.value)}
            className={inputClass}
            placeholder="Address or MLS#, if you have one"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${source}-name`}>
          Name
        </label>
        <input id={`${source}-name`} name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${source}-phone`}>
            Phone
          </label>
          <input id={`${source}-phone`} name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="Phone number" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${source}-email`}>
            Email
          </label>
          <input id={`${source}-email`} name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@email.com" />
        </div>
      </div>
      {mode !== "alerts" && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${source}-note`}>
            Note (optional)
          </label>
          <textarea
            id={`${source}-note`}
            name="note"
            rows={3}
            className="w-full resize-none rounded-2xl border border-charcoal/[0.12] bg-white px-5 py-3 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:border-charcoal/40 focus:outline-none"
            placeholder="Anything we should know before we call?"
          />
        </div>
      )}

      {formState === "error" && (
        <p className={`text-[13px] ${dark ? "text-red-200" : "text-red-600"}`}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className={`w-full rounded-full px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-50 ${
          dark ? "bg-white text-charcoal hover:bg-white/90" : "bg-charcoal text-white hover:bg-charcoal/80"
        }`}
      >
        {formState === "loading" ? "Sending..." : mode === "alerts" ? "Get alerts" : "Send to OnSite"}
      </button>
    </form>
  );
}
