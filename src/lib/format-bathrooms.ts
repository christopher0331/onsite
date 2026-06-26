import type { RepliersRaw } from "@/lib/repliers-enrich";

export type BathroomDetails = {
  numBathrooms?: number | null;
  numBathroomsHalf?: number | null;
};

function parseNum(v: unknown): number | null {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = parseFloat(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

function totalFromResoRaw(raw: RepliersRaw): number | null {
  const full = parseNum(raw.BathroomsFull) ?? 0;
  const threeQ = parseNum(raw.BathroomsThreeQuarter) ?? 0;
  const half = parseNum(raw.BathroomsHalf) ?? 0;
  if (full <= 0 && threeQ <= 0 && half <= 0) return null;
  return full + threeQ * 0.75 + half * 0.5;
}

/** MLS-accurate bathroom total (full + ¾ + ½) when raw fields are available. */
export function getBathroomCount(
  details?: BathroomDetails | null,
  raw?: RepliersRaw | null
): number | null {
  const nwm = raw ? parseNum(raw.NWM_Bathrooms) : null;
  if (nwm != null && nwm >= 0) return nwm;

  if (raw) {
    const fromReso = totalFromResoRaw(raw);
    if (fromReso != null) return fromReso;
  }

  const full = details?.numBathrooms;
  const half = details?.numBathroomsHalf;
  if (full != null && full > 0) {
    if (half != null && half > 0) return full + half * 0.5;
    return full;
  }

  return null;
}

export function formatBathroomCount(
  details?: BathroomDetails | null,
  raw?: RepliersRaw | null
): string | null {
  const n = getBathroomCount(details, raw);
  if (n == null || n <= 0) return null;
  return formatBathDisplay(n);
}

/** Detail table: total plus RESO breakdown when available. */
export function formatBathroomDetail(
  details?: BathroomDetails | null,
  raw?: RepliersRaw | null
): string | null {
  const total = getBathroomCount(details, raw);
  if (total == null || total <= 0) return null;

  if (raw) {
    const full = parseNum(raw.BathroomsFull) ?? 0;
    const threeQ = parseNum(raw.BathroomsThreeQuarter) ?? 0;
    const half = parseNum(raw.BathroomsHalf) ?? 0;
    const parts: string[] = [];
    if (full > 0) parts.push(`${full} full`);
    if (threeQ > 0) parts.push(`${threeQ} three-quarter`);
    if (half > 0) parts.push(`${half} half`);
    if (parts.length > 1) {
      return `${formatBathDisplay(total)} (${parts.join(", ")})`;
    }
  }

  return formatBathDisplay(total);
}

function formatBathDisplay(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}
