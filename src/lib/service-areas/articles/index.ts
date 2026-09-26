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
import { stadiumDistrictArticle } from "./stadium-district";
import { southTacomaArticle } from "./south-tacoma";
import { westSlopeArticle } from "./west-slope";
import { tappsIslandArticle } from "./tapps-island";
import { driftwoodPointArticle } from "./driftwood-point";
import { tacomaPointArticle } from "./tacoma-point";
import { snagIslandArticle } from "./snag-island";
import { inletIslandArticle } from "./inlet-island";
import { churchLakeWaterfrontArticle } from "./church-lake-waterfront";
import { westCampusArticle } from "./west-campus";
import { lakotaArticle } from "./lakota";
import { dashPointArticle } from "./dash-point";
import { downtownKentArticle } from "./downtown-kent";
import { eastHillArticle } from "./east-hill";
import { pantherLakeArticle } from "./panther-lake";
import { westHillArticle } from "./west-hill";
import { lakeMeridianArticle } from "./lake-meridian";
import { redondoArticle } from "./redondo";
import { twinLakesArticle } from "./twin-lakes";
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
  [stadiumDistrictArticle.slug]: stadiumDistrictArticle,
  [southTacomaArticle.slug]: southTacomaArticle,
  [westSlopeArticle.slug]: westSlopeArticle,
  [tappsIslandArticle.slug]: tappsIslandArticle,
  [driftwoodPointArticle.slug]: driftwoodPointArticle,
  [tacomaPointArticle.slug]: tacomaPointArticle,
  [snagIslandArticle.slug]: snagIslandArticle,
  [inletIslandArticle.slug]: inletIslandArticle,
  [churchLakeWaterfrontArticle.slug]: churchLakeWaterfrontArticle,
  [westCampusArticle.slug]: westCampusArticle,
  [lakotaArticle.slug]: lakotaArticle,
  [dashPointArticle.slug]: dashPointArticle,
  [downtownKentArticle.slug]: downtownKentArticle,
  [eastHillArticle.slug]: eastHillArticle,
  [pantherLakeArticle.slug]: pantherLakeArticle,
  [westHillArticle.slug]: westHillArticle,
  [lakeMeridianArticle.slug]: lakeMeridianArticle,
  [redondoArticle.slug]: redondoArticle,
  [twinLakesArticle.slug]: twinLakesArticle,
  [proctorDistrictArticle.slug]: proctorDistrictArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
