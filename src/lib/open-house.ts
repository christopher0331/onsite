// Shared open house time helpers (client + server safe — no Node/Next imports).
// Used by the listing detail page's open house card and the homepage
// "Upcoming Open Houses" section so both apply identical past/now/upcoming rules.

export const LISTING_TZ = "America/Los_Angeles";

/** Open house entry as returned by Repliers (`listing.openHouse[]`). */
export type OpenHouseEntry = {
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  type?: string | null;
  status?: string | null;
};

// Offset (ms) of America/Los_Angeles from UTC at a given instant.
function laOffsetMs(at: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LISTING_TZ,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(new Date(at));
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second")) - at;
}

// Parses an open house timestamp. Repliers sends UTC ISO strings
// ("2026-10-03T21:00:00.000-00:00"); zone-less values are treated as
// Pacific wall-clock time. Returns epoch ms or NaN.
export function parseOpenHouseTime(value: string | null | undefined) {
  if (!value) return NaN;
  const v = value.trim().replace(" ", "T");
  if (/(Z|[+-]\d{2}:?\d{2})$/i.test(v)) return Date.parse(v);
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m) return NaN;
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0));
  return wall - laOffsetMs(wall);
}

export type UpcomingOpenHouse<T extends OpenHouseEntry = OpenHouseEntry> = T & {
  start: number;
  end: number;
  hasEnd: boolean;
};

// Open houses that have not ended yet as of `now`, soonest first, de-duplicated.
// If an end time is missing, the open house counts until the end of its day (Pacific).
// Entries the MLS marks as cancelled are dropped.
export function getUpcomingOpenHouses<T extends OpenHouseEntry>(
  openHouses: T[] | null | undefined,
  now: number
): UpcomingOpenHouse<T>[] {
  const seen = new Set<string>();
  return (openHouses ?? [])
    .filter((oh) => oh && !/cancel/i.test(oh.status ?? ""))
    .map((oh) => {
      let start = parseOpenHouseTime(oh.startTime);
      // Some NWMLS entries carry a placeholder start (e.g. 11:00 PM the night
      // before) — when the start falls on a different Pacific day than the
      // open house's own date, treat the start time as unknown.
      const date = /^\d{4}-\d{2}-\d{2}$/.test(oh.date ?? "") ? oh.date : null;
      if (date && !Number.isNaN(start) && pacificDateString(start) !== date) start = NaN;
      let end = parseOpenHouseTime(oh.endTime);
      const hasEnd = !Number.isNaN(end);
      if (!hasEnd) {
        const day = (oh.date || oh.startTime || "").slice(0, 10);
        end = parseOpenHouseTime(day ? `${day}T23:59:59` : null);
      }
      return { ...oh, start, end, hasEnd };
    })
    .filter((oh) => {
      if (Number.isNaN(oh.end) || oh.end <= now) return false;
      const key = `${oh.start}|${oh.end}|${oh.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => openHouseSortKey(a) - openHouseSortKey(b));
}

/** Start time (or end when no start is known) — the instant an open house sorts by. */
export function openHouseSortKey(oh: { start: number; end: number }) {
  return Number.isNaN(oh.start) ? oh.end : oh.start;
}

/** True while the open house is in progress at `now`. */
export function isOpenHouseLive(oh: { start: number; end: number }, now: number) {
  return !Number.isNaN(oh.start) && oh.start <= now && now < oh.end;
}

// Current time, re-checked every minute so a finished open house drops off
// without a reload. Use with useSyncExternalStore; the server render (and
// hydration) should use the page's fetch time as the server snapshot.
export function subscribeMinute(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}
export function currentMinute() {
  return Math.floor(Date.now() / 60_000) * 60_000;
}

function laParts(ms: number, opts: Intl.DateTimeFormatOptions) {
  // Normalize the narrow no-break space some ICU builds put before AM/PM.
  return new Date(ms).toLocaleString("en-US", { timeZone: LISTING_TZ, ...opts }).replace(/\u202f/g, " ");
}

/** Today's date in Pacific time as YYYY-MM-DD. */
export function pacificDateString(ms: number) {
  return new Date(ms).toLocaleDateString("en-CA", { timeZone: LISTING_TZ });
}

// "Sunday, Oct 4" / "Sun, Oct 4"
export function formatOpenHouseDay(oh: { start: number; end: number }, weekday: "long" | "short" = "long") {
  return laParts(openHouseSortKey(oh), { weekday, month: "short", day: "numeric" });
}

// "2:00 – 4:00 PM", "11:00 AM – 1:00 PM", just the start time if no end is
// known, or "Until 12:30 PM" if only the end is known.
export function formatOpenHouseTimeRange(oh: { start: number; end: number; hasEnd: boolean }) {
  const opts = { hour: "numeric", minute: "2-digit" } as const;
  if (Number.isNaN(oh.start)) return oh.hasEnd ? `Until ${laParts(oh.end, opts)}` : "";
  const start = laParts(oh.start, opts);
  if (!oh.hasEnd) return start;
  const end = laParts(oh.end, opts);
  const sameMeridiem = start.slice(-2) === end.slice(-2);
  return `${sameMeridiem ? start.replace(/\s*[AP]M$/, "") : start} – ${end}`;
}
