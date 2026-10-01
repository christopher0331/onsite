"use client";

import type { RefObject } from "react";

type FormBotTrapProps = {
  idPrefix?: string;
  websiteRef: RefObject<HTMLInputElement | null>;
  faxRef: RefObject<HTMLInputElement | null>;
  loadedAt: number;
};

/**
 * Hidden fields that humans never see. Autofill bots often fill every input;
 * a non-empty value is treated as spam (fake success, no email).
 */
export function FormBotTrap({ idPrefix = "", websiteRef, faxRef, loadedAt }: FormBotTrapProps) {
  const websiteId = `${idPrefix}website`;
  const faxId = `${idPrefix}fax_number`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={websiteId}>Website</label>
      <input
        ref={websiteRef}
        id={websiteId}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label htmlFor={faxId}>Fax number</label>
      <input
        ref={faxRef}
        id={faxId}
        name="fax_number"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
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
