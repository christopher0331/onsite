import type { ServiceAreaDiscover } from "./types";
import { lakeTappsDiscover } from "./lake-tapps";
import { bonneyLakeDiscover } from "./bonney-lake";
import { sumnerDiscover } from "./sumner";
import { puyallupDiscover } from "./puyallup";
import { edgewoodDiscover } from "./edgewood";
import { miltonDiscover } from "./milton";
import { auburnDiscover } from "./auburn";
import { buckleyDiscover } from "./buckley";
import { grahamDiscover } from "./graham";
import { tacomaDiscover } from "./tacoma";
import { federalWayDiscover } from "./federal-way";
import { kentDiscover } from "./kent";
import { seattleDiscover } from "./seattle";
import { downtownPuyallupDiscover } from "./downtown-puyallup";
import { clarksCreekDiscover } from "./clarks-creek";
import { rodescoDiscover } from "./rodesco";
import { shawneeRidgeDiscover } from "./shawnee-ridge";
import { gemHeightsDiscover } from "./gem-heights";
import { summitDiscover } from "./summit";
import { southHillDiscover } from "./south-hill";
import { tehalehDiscover } from "./tehaleh";
import { bridgeHillDiscover } from "./bridge-hill";
import { northEndDiscover } from "./north-end";

const DISCOVER: Record<string, ServiceAreaDiscover> = {
  [lakeTappsDiscover.slug]: lakeTappsDiscover,
  [bonneyLakeDiscover.slug]: bonneyLakeDiscover,
  [sumnerDiscover.slug]: sumnerDiscover,
  [puyallupDiscover.slug]: puyallupDiscover,
  [edgewoodDiscover.slug]: edgewoodDiscover,
  [miltonDiscover.slug]: miltonDiscover,
  [auburnDiscover.slug]: auburnDiscover,
  [buckleyDiscover.slug]: buckleyDiscover,
  [grahamDiscover.slug]: grahamDiscover,
  [tacomaDiscover.slug]: tacomaDiscover,
  [federalWayDiscover.slug]: federalWayDiscover,
  [kentDiscover.slug]: kentDiscover,
  [seattleDiscover.slug]: seattleDiscover,
  [downtownPuyallupDiscover.slug]: downtownPuyallupDiscover,
  [clarksCreekDiscover.slug]: clarksCreekDiscover,
  [rodescoDiscover.slug]: rodescoDiscover,
  [shawneeRidgeDiscover.slug]: shawneeRidgeDiscover,
  [gemHeightsDiscover.slug]: gemHeightsDiscover,
  [summitDiscover.slug]: summitDiscover,
  [southHillDiscover.slug]: southHillDiscover,
  [tehalehDiscover.slug]: tehalehDiscover,
  [bridgeHillDiscover.slug]: bridgeHillDiscover,
  [northEndDiscover.slug]: northEndDiscover,
};

export function getServiceAreaDiscover(
  slug: string
): ServiceAreaDiscover | null {
  return DISCOVER[slug] ?? null;
}

export type { ServiceAreaDiscover, LocalAttraction } from "./types";
