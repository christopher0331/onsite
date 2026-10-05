import { LISTING_TZ, type UpcomingOpenHouse } from "@/lib/open-house";

type IcsOpenHouse = UpcomingOpenHouse<{ type?: string | null }>;

/** Builds and downloads an .ics file for one open house. Client-only. */
export function downloadOpenHouseIcs(
  oh: IcsOpenHouse,
  opts: { title: string; location: string; url: string; mlsNumber: string }
) {
  const esc = (v: string) => v.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
  const utc = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const hasStart = !Number.isNaN(oh.start);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OnSite Real Estate Group//Open House//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:open-house-${opts.mlsNumber}-${hasStart ? oh.start : oh.end}@onsiteregroup.com`,
    `DTSTAMP:${utc(Date.now())}`,
  ];
  if (hasStart) {
    lines.push(`DTSTART:${utc(oh.start)}`, `DTEND:${utc(oh.hasEnd ? oh.end : oh.start + 2 * 60 * 60 * 1000)}`);
  } else {
    const day = new Date(oh.end).toLocaleDateString("en-CA", { timeZone: LISTING_TZ }).replace(/-/g, "");
    lines.push(`DTSTART;VALUE=DATE:${day}`);
  }
  lines.push(
    `SUMMARY:${esc(opts.title)}`,
    `LOCATION:${esc(opts.location)}`,
    `DESCRIPTION:${esc(`${oh.type ? `${oh.type} open house` : "Open house"} — MLS# ${opts.mlsNumber}\n${opts.url}`)}`,
    `URL:${opts.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  );
  const fold = (line: string) => line.match(/.{1,60}/g)?.join("\r\n ") ?? line;
  const blob = new Blob([lines.map(fold).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = `open-house-${opts.mlsNumber}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
