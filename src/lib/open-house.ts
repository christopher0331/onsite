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
      } else if (!Number.isNaN(start)) {
        end = correctOpenHouseEnd(start, end, date);
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

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** 0 = Sunday … 6 = Saturday in Pacific time. */
export function pacificWeekdayIndex(ms: number) {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: LISTING_TZ,
    weekday: "short",
  }).format(new Date(ms));
  return WEEKDAY_INDEX[label] ?? 0;
}

function shiftCalendarDate(yyyyMmDd: string, days: number) {
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** Saturday and Sunday of the weekend that contains `now`, or the next one if it is a weekday. */
export function thisWeekendDateStrings(now: number) {
  const today = pacificDateString(now);
  const wd = pacificWeekdayIndex(now);
  if (wd === 0) return { saturday: shiftCalendarDate(today, -1), sunday: today };
  if (wd === 6) return { saturday: today, sunday: shiftCalendarDate(today, 1) };
  const saturday = shiftCalendarDate(today, 6 - wd);
  return { saturday, sunday: shiftCalendarDate(saturday, 1) };
}

export function isThisWeekendOpen(oh: { start: number; end: number }, now: number) {
  const key = openHouseSortKey(oh);
  if (Number.isNaN(key)) return false;
  const day = pacificDateString(key);
  const { saturday, sunday } = thisWeekendDateStrings(now);
  return day === saturday || day === sunday;
}

// "Sunday, Oct 4" / "Sun, Oct 4"
export function formatOpenHouseDay(oh: { start: number; end: number }, weekday: "long" | "short" = "long") {
  return laParts(openHouseSortKey(oh), { weekday, month: "short", day: "numeric" });
}

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

/**
 * Some NWMLS ends are stored 12 hours late, so a same-day 1:00 PM close
 * arrives as 1:00 AM the next morning (MLS# NWM2586592: 11:00–1:00).
 * When shifting the end back 12 hours lands on the open house's Pacific day
 * and still after the start, use that. A real overnight range such as
 * 11:00 PM – 1:00 AM is left alone — shifting it would put the end before
 * the start.
 */
export function correctOpenHouseEnd(start: number, end: number, date?: string | null) {
  if (Number.isNaN(start) || Number.isNaN(end)) return end;
  const day = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : pacificDateString(start);
  if (pacificDateString(end) === day) return end;
  const adjusted = end - TWELVE_HOURS_MS;
  if (pacificDateString(adjusted) !== day || adjusted <= start) return end;
  return adjusted;
}

type WallTime = { clock: string; meridiem: "AM" | "PM" | "" };

function wallTime(ms: number): WallTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LISTING_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(ms));
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  const dayPeriod = value("dayPeriod").replace(/\./g, "").toUpperCase();
  const meridiem = dayPeriod === "AM" || dayPeriod === "PM" ? dayPeriod : "";
  return { clock: `${value("hour")}:${value("minute")}`, meridiem };
}

function formatWallTime(time: WallTime) {
  return time.meridiem ? `${time.clock} ${time.meridiem}` : time.clock;
}

// "2:00 – 4:00 PM", "11:00 AM – 1:00 PM", just the start time if no end is
// known, or "Until 12:30 PM" if only the end is known. Start and end each
// keep their own AM/PM when the range crosses noon or midnight.
export function formatOpenHouseTimeRange(oh: { start: number; end: number; hasEnd: boolean }) {
  const endMs = oh.hasEnd ? correctOpenHouseEnd(oh.start, oh.end) : oh.end;
  if (Number.isNaN(oh.start)) return oh.hasEnd ? `Until ${formatWallTime(wallTime(endMs))}` : "";
  const start = wallTime(oh.start);
  if (!oh.hasEnd) return formatWallTime(start);
  const end = wallTime(endMs);
  if (start.meridiem && start.meridiem === end.meridiem) return `${start.clock} – ${end.clock} ${end.meridiem}`;
  return `${formatWallTime(start)} – ${formatWallTime(end)}`;
}
