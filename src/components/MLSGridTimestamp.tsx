"use client";

import { useEffect, useState } from "react";

export default function MLSGridTimestamp() {
  const [ts, setTs] = useState<string | null>(null);

  useEffect(() => {
    setTs(
      new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    );
  }, []);

  if (!ts) return null;
  return <> Data last refreshed: {ts}.</>;
}
