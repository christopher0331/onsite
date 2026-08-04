import type { ServiceAreaMarketBrief } from "./types";
import { puyallupBrief } from "./puyallup";

const BRIEFS: Record<string, ServiceAreaMarketBrief> = {
  [puyallupBrief.slug]: puyallupBrief,
};

export function getServiceAreaMarketBrief(
  slug: string
): ServiceAreaMarketBrief | null {
  return BRIEFS[slug] ?? null;
}

export type { ServiceAreaMarketBrief } from "./types";
