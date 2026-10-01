"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FormBotTrap } from "@/components/forms/FormBotTrap";
import {
  evaluateClientBotGate,
  getPageLoadedAt,
  type BotGateFields,
} from "@/lib/formBotGate";

export function useFormBotGate(idPrefix = "") {
  const loadedAtRef = useRef(0);
  const websiteRef = useRef<HTMLInputElement>(null);
  const faxRef = useRef<HTMLInputElement>(null);
  const [loadedAt, setLoadedAt] = useState(0);

  useEffect(() => {
    const ts = getPageLoadedAt();
    loadedAtRef.current = ts;
    setLoadedAt(ts);
  }, []);

  const getFields = useCallback((): Required<BotGateFields> => {
    return {
      website: websiteRef.current?.value ?? "",
      fax_number: faxRef.current?.value ?? "",
      form_loaded_at: loadedAtRef.current || getPageLoadedAt(),
    };
  }, []);

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
