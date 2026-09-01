import type { ServiceAreaArticle } from "./types";
import { lakeTappsArticle } from "./lake-tapps";
import { bonneyLakeArticle } from "./bonney-lake";
import { sumnerArticle } from "./sumner";
import { puyallupArticle } from "./puyallup";
import { edgewoodArticle } from "./edgewood";
import { miltonArticle } from "./milton";
import { auburnArticle } from "./auburn";
import { buckleyArticle } from "./buckley";
import { grahamArticle } from "./graham";
import { tacomaArticle } from "./tacoma";
import { federalWayArticle } from "./federal-way";
import { kentArticle } from "./kent";
import { seattleArticle } from "./seattle";
import { downtownPuyallupArticle } from "./downtown-puyallup";
import { clarksCreekArticle } from "./clarks-creek";
import { rodescoArticle } from "./rodesco";
import { shawneeRidgeArticle } from "./shawnee-ridge";
import { gemHeightsArticle } from "./gem-heights";
import { summitArticle } from "./summit";
import { southHillArticle } from "./south-hill";
import { tehalehArticle } from "./tehaleh";
import { bridgeHillArticle } from "./bridge-hill";
import { northEndArticle } from "./north-end";
import { proctorDistrictArticle } from "./proctor-district";

const ARTICLES: Record<string, ServiceAreaArticle> = {
  [lakeTappsArticle.slug]: lakeTappsArticle,
  [bonneyLakeArticle.slug]: bonneyLakeArticle,
  [sumnerArticle.slug]: sumnerArticle,
  [puyallupArticle.slug]: puyallupArticle,
  [edgewoodArticle.slug]: edgewoodArticle,
  [miltonArticle.slug]: miltonArticle,
  [auburnArticle.slug]: auburnArticle,
  [buckleyArticle.slug]: buckleyArticle,
  [grahamArticle.slug]: grahamArticle,
  [tacomaArticle.slug]: tacomaArticle,
  [federalWayArticle.slug]: federalWayArticle,
  [kentArticle.slug]: kentArticle,
  [seattleArticle.slug]: seattleArticle,
  [downtownPuyallupArticle.slug]: downtownPuyallupArticle,
  [clarksCreekArticle.slug]: clarksCreekArticle,
  [rodescoArticle.slug]: rodescoArticle,
  [shawneeRidgeArticle.slug]: shawneeRidgeArticle,
  [gemHeightsArticle.slug]: gemHeightsArticle,
  [summitArticle.slug]: summitArticle,
  [southHillArticle.slug]: southHillArticle,
  [tehalehArticle.slug]: tehalehArticle,
  [bridgeHillArticle.slug]: bridgeHillArticle,
  [northEndArticle.slug]: northEndArticle,
  [proctorDistrictArticle.slug]: proctorDistrictArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
