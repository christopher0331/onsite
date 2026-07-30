import type { ServiceAreaArticle } from "./types";
import { lakeTappsArticle } from "./lake-tapps";

const ARTICLES: Record<string, ServiceAreaArticle> = {
  [lakeTappsArticle.slug]: lakeTappsArticle,
};

export function getServiceAreaArticle(
  slug: string
): ServiceAreaArticle | null {
  return ARTICLES[slug] ?? null;
}

export type { ServiceAreaArticle } from "./types";
