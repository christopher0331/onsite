import type { ServiceAreaArticle } from "./types";
import { lakeTappsArticle } from "./lake-tapps";
import { bonneyLakeArticle } from "./bonney-lake";
import { sumnerArticle } from "./sumner";
import { puyallupArticle } from "./puyallup";
import { edgewoodArticle } from "./edgewood";
import { miltonArticle } from "./milton";
import { auburnArticle } from "./auburn";

const ARTICLES: Record<string, ServiceAreaArticle> = {
  [lakeTappsArticle.slug]: lakeTappsArticle,
  [bonneyLakeArticle.slug]: bonneyLakeArticle,
  [sumnerArticle.slug]: sumnerArticle,
  [puyallupArticle.slug]: puyallupArticle,
  [edgewoodArticle.slug]: edgewoodArticle,
  [miltonArticle.slug]: miltonArticle,
  [auburnArticle.slug]: auburnArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
