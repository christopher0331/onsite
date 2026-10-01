"use client";

import { useCallback, useRef, useState } from "react";
import { FormBotTrap } from "@/components/forms/FormBotTrap";
import {
  evaluateClientBotGate,
  getPageLoadedAt,
  type BotGateFields,
} from "@/lib/formBotGate";

export function useFormBotGate(idPrefix = "") {
  const websiteRef = useRef<HTMLInputElement>(null);
  const faxRef = useRef<HTMLInputElement>(null);
  // Captured when the form mounts. Server and client clocks differ by a few
  // milliseconds; the hidden input opts out of the hydration warning.
  const [loadedAt] = useState(getPageLoadedAt);

  const getFields = useCallback((): Required<BotGateFields> => {
    return {
      website: websiteRef.current?.value ?? "",
      fax_number: faxRef.current?.value ?? "",
      form_loaded_at: loadedAt,
    };
  }, [loadedAt]);

  const shouldFakeSuccess = useCallback(() => {
    return !evaluateClientBotGate(getFields()).allow;
  }, [getFields]);

  const trap = (
    <FormBotTrap
      idPrefix={idPrefix}
      websiteRef={websiteRef}
      faxRef={faxRef}
      loadedAt={loadedAt}
    />
  );

  return { getFields, shouldFakeSuccess, trap };
}
