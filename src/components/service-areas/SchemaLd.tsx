// JSON-LD helpers for Tier-1 Service Area pages.
//
// These render <script type="application/ld+json"> blocks consumed by Google
// for entity recognition. Keeping them in their own component module means
// the page-level files stay focused on layout, and there's a single place to
// audit schema changes.

import type { CardListing } from "@/components/ListingCard";
import type { City, EntityLink, Neighborhood } from "@/lib/service-areas/types";
import { localBusinessNode, SITE_BRAND } from "@/lib/nap";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const ORG_URL = getCanonicalBaseUrl();
const ORG_AGENT = localBusinessNode(ORG_URL);

type BreadcrumbEntry = { name: string; url: string };

type MentionCategory =
  | "government"
  | "school"
  | "library"
  | "utility"
  | "organization";

const MENTION_TYPE: Record<MentionCategory, string> = {
  government: "GovernmentOrganization",
  school: "EducationalOrganization",
  library: "Library",
  utility: "Organization",
  organization: "Organization",
};

/**
 * Builds `mentions` nodes (schema.org CreativeWork.mentions) from a City's
 * authority links — permitting office, utilities, school districts, and
 * local resources. This is what tells Google "this page is topically about
 * these real-world entities" beyond just linking out to them in the DOM.
 */
export function buildCityMentions(city: City): Array<{
  "@type": string;
  name: string;
  url: string;
}> {
  const push = (
    list: Array<{ "@type": string; name: string; url: string }>,
    link: EntityLink | undefined,
    category: MentionCategory
  ) => {
    if (!link) return;
    list.push({ "@type": MENTION_TYPE[category], name: link.name, url: link.url });
  };

  const mentions: Array<{ "@type": string; name: string; url: string }> = [];
  push(mentions, city.permittingOffice, "government");
  city.utilities.forEach((u) => push(mentions, u, "utility"));
  city.schoolDistricts.forEach((s) => push(mentions, s, "school"));
  city.localResources.forEach((r) =>
    push(mentions, r, r.name.toLowerCase().includes("librar") ? "library" : "organization")
  );
  push(mentions, city.chamberOfCommerce, "organization");
  return mentions;
}

/** Same idea as `buildCityMentions`, sourced from a neighborhood's community orgs. */
export function buildNeighborhoodMentions(neighborhood: Neighborhood): Array<{
  "@type": string;
  name: string;
  url: string;
}> {
  return neighborhood.communityOrgs.map((org) => ({
    "@type": org.name.toLowerCase().includes("school")
      ? MENTION_TYPE.school
      : MENTION_TYPE.organization,
    name: org.name,
    url: org.url,
  }));
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    ...localBusinessNode(ORG_URL),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebPageSchema({
  pageUrl,
  title,
  description,
  mentions,
}: {
  pageUrl: string;
  title: string;
  description: string;
  /** Real-world entities this page is topically about (schools, utilities, gov't offices). */
  mentions?: Array<{ "@type": string; name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_BRAND,
      url: ORG_URL,
    },
    about: ORG_AGENT,
    ...(mentions && mentions.length > 0 ? { mentions } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbEntry[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** ItemList of currently-listed homes shown in an area's listings section. */
export function AreaListingsItemListSchema({
  listings,
  pageUrl,
}: {
  listings: CardListing[];
  pageUrl: string;
}) {
  if (listings.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    itemListElement: listings.map((listing, idx) => {
      const addr = listing.address;
      const street = [addr?.streetNumber, addr?.streetDirection, addr?.streetName, addr?.streetSuffix]
        .filter(Boolean)
        .join(" ");
      const name =
        listing.permissions?.displayAddressOnInternet !== "N" && street
          ? `${street}, ${addr?.city ?? ""}`.trim()
          : `MLS# ${listing.mlsNumber}`;
      return {
        "@type": "ListItem",
        position: idx + 1,
        url: `${ORG_URL}/listings/${listing.mlsNumber}`,
        name,
      };
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
