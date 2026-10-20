"use client";

import { useEffect } from "react";

/**
 * The browser jumps to a URL hash (e.g. /#pending) before lazy homepage
 * sections, images and animations above it have laid out, so the target
 * moves ~2,500px down and the viewport lands mid-page (iOS Safari showed a
 * blank area). Re-scroll to the hash target once layout has settled.
 */
export default function HashAnchorFix({ ids }: { ids: string[] }) {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !ids.includes(id)) return;
    let userScrolled = false;
    const stop = () => {
      userScrolled = true;
    };
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("wheel", stop, { passive: true, once: true });
    const jump = () => {
      if (userScrolled) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const timers = [0, 300, 800, 1500, 2500].map((ms) => window.setTimeout(jump, ms));
    window.addEventListener("load", jump, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", jump);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("wheel", stop);
    };
  }, [ids]);
  return null;
}
