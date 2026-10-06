"use client";

import type { CSSProperties, RefObject } from "react";

type FormBotTrapProps = {
  idPrefix?: string;
  websiteRef: RefObject<HTMLInputElement | null>;
  faxRef: RefObject<HTMLInputElement | null>;
  loadedAt: number;
};

// Clip hides the controls. visibility:hidden on the labels is what keeps
// "Website" + "Fax number" out of innerText (a 1px clip still leaks that
// string). Inputs stay type=text and visibility:visible so autofill bots
// can fill them; the bot gate reads those values.
const trapClip: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};

/**
 * Hidden fields that humans never see. Autofill bots often fill every input;
 * a non-empty value is treated as spam (fake success, no email).
 */
export function FormBotTrap({ idPrefix = "", websiteRef, faxRef, loadedAt }: FormBotTrapProps) {
  const websiteId = `${idPrefix}website`;
  const faxId = `${idPrefix}fax_number`;

  return (
    <div aria-hidden="true" style={trapClip}>
      <label htmlFor={websiteId} aria-hidden="true" style={{ ...trapClip, visibility: "hidden" }}>
        Website
      </label>
      <input
        ref={websiteRef}
        id={websiteId}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ ...trapClip, visibility: "visible" }}
      />
      <label htmlFor={faxId} aria-hidden="true" style={{ ...trapClip, visibility: "hidden" }}>
        Fax number
      </label>
      <input
        ref={faxRef}
        id={faxId}
        name="fax_number"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ ...trapClip, visibility: "visible" }}
      />
      <input
        type="hidden"
        name="form_loaded_at"
        value={String(loadedAt)}
        readOnly
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        suppressHydrationWarning
      />
    </div>
  );
}
