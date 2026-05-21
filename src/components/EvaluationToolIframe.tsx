"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Fallback until the embedded app reports its height (see public/evaluation-iframe-resize.js). */
const FALLBACK_HEIGHT = 3400;
const MIN_HEIGHT = 480;
const HEIGHT_BUFFER = 24;

type Props = {
  src: string;
  title?: string;
};

function parseHeight(data: unknown): number | undefined {
  if (typeof data === "number" && Number.isFinite(data)) return data;
  if (typeof data === "string") {
    const n = parseInt(data, 10);
    if (Number.isFinite(n)) return n;
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (obj.type === "onsite-iframe-resize" && typeof obj.height === "number") {
      return obj.height;
    }
    const h = obj.height ?? obj.frameHeight ?? obj.iframeHeight;
    if (typeof h === "number" && Number.isFinite(h)) return h;
  }
  return undefined;
}

export default function EvaluationToolIframe({
  src,
  title = "Home Evaluation Tool",
}: Props) {
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const toolOrigin = useRef("");

  useEffect(() => {
    try {
      toolOrigin.current = new URL(src).origin;
    } catch {
      toolOrigin.current = "";
    }
  }, [src]);

  const applyHeight = useCallback((raw: number) => {
    setHeight(Math.max(MIN_HEIGHT, Math.ceil(raw) + HEIGHT_BUFFER));
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (toolOrigin.current && event.origin !== toolOrigin.current) return;
      const next = parseHeight(event.data);
      if (next) applyHeight(next);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyHeight]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0 block"
      style={{ height: `${height}px` }}
      scrolling="no"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="clipboard-write; geolocation"
    />
  );
}
