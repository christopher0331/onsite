import type { ServiceAreaDiscover } from "./types";
import { lakeTappsDiscover } from "./lake-tapps";
import { bonneyLakeDiscover } from "./bonney-lake";
import { sumnerDiscover } from "./sumner";
import { puyallupDiscover } from "./puyallup";
import { edgewoodDiscover } from "./edgewood";
import { miltonDiscover } from "./milton";
import { auburnDiscover } from "./auburn";

const DISCOVER: Record<string, ServiceAreaDiscover> = {
  [lakeTappsDiscover.slug]: lakeTappsDiscover,
  [bonneyLakeDiscover.slug]: bonneyLakeDiscover,
  [sumnerDiscover.slug]: sumnerDiscover,
  [puyallupDiscover.slug]: puyallupDiscover,
  [edgewoodDiscover.slug]: edgewoodDiscover,
  [miltonDiscover.slug]: miltonDiscover,
  [auburnDiscover.slug]: auburnDiscover,
};

export function getServiceAreaDiscover(
  slug: string
): ServiceAreaDiscover | null {
  return DISCOVER[slug] ?? null;
}

export type { ServiceAreaDiscover, LocalAttraction } from "./types";
