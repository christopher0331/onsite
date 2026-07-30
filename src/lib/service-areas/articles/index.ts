import type { ServiceAreaArticle } from "./types";
import { lakeTappsArticle } from "./lake-tapps";
import { bonneyLakeArticle } from "./bonney-lake";

const ARTICLES: Record<string, ServiceAreaArticle> = {
  [lakeTappsArticle.slug]: lakeTappsArticle,
  [bonneyLakeArticle.slug]: bonneyLakeArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
