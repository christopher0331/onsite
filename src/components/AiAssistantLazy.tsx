"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AiAssistant = dynamic(() => import("@/components/AiAssistant"), {
  ssr: false,
  loading: () => null,
});

export default function AiAssistantLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = setTimeout(mount, 2500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;
  return <AiAssistant />;
}
