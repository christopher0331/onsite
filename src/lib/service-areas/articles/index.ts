import type { ServiceAreaArticle } from "./types";
import { lakeTappsArticle } from "./lake-tapps";
import { bonneyLakeArticle } from "./bonney-lake";
import { sumnerArticle } from "./sumner";
import { puyallupArticle } from "./puyallup";
import { edgewoodArticle } from "./edgewood";
import { miltonArticle } from "./milton";
import { auburnArticle } from "./auburn";
import { downtownPuyallupArticle } from "./downtown-puyallup";
import { clarksCreekArticle } from "./clarks-creek";
import { rodescoArticle } from "./rodesco";
import { shawneeRidgeArticle } from "./shawnee-ridge";
import { gemHeightsArticle } from "./gem-heights";
import { summitArticle } from "./summit";

const ARTICLES: Record<string, ServiceAreaArticle> = {
  [lakeTappsArticle.slug]: lakeTappsArticle,
  [bonneyLakeArticle.slug]: bonneyLakeArticle,
  [sumnerArticle.slug]: sumnerArticle,
  [puyallupArticle.slug]: puyallupArticle,
  [edgewoodArticle.slug]: edgewoodArticle,
  [miltonArticle.slug]: miltonArticle,
  [auburnArticle.slug]: auburnArticle,
  [downtownPuyallupArticle.slug]: downtownPuyallupArticle,
  [clarksCreekArticle.slug]: clarksCreekArticle,
  [rodescoArticle.slug]: rodescoArticle,
  [shawneeRidgeArticle.slug]: shawneeRidgeArticle,
  [gemHeightsArticle.slug]: gemHeightsArticle,
  [summitArticle.slug]: summitArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
