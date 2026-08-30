type Permanent301 = {
  source: string;
  destination: string;
  statusCode: 301;
};

function to301(
  source: string,
  destination: string
): Permanent301 {
  return { source, destination, statusCode: 301 };
}

/**
 * High-impression Webflow ghosts still in Google's index.
 * Map each 404 to the nearest live OnSite page so crawl budget and
 * brand queries stop landing on dead URLs.
 */
export const legacy301Redirects: Permanent301[] = [
  // ── Advanced listings (old Webflow listing template) ──────────────────
  to301("/advanced-listings/spiketon-rd-dream-home", "/listings/2387430"),
  to301(
    "/advanced-listings/stewart-crossing-stunner-1003-31st-st-nw-puy-98371",
    "/listings?city=Puyallup&state=WA"
  ),
  to301("/advanced-listings", "/listings"),
  to301("/advanced-listings/:slug*", "/listings"),

  // ── Deleted / never-migrated blog slugs still indexed ─────────────────
  to301(
    "/blog/when-should-you-lower-your-listing-price",
    "/blog/how-to-choose-the-right-listing-price-without-leaving-money-on-the-table"
  ),
  to301(
    "/blog/6-month-price-per-square-foot-trends-for-bonney-lake-lake-tapps-and-pierce-county-sellers",
    "/blog/6-month-housing-market-deep-dive-for-east-bonney-lake-lake-tapps-and-pierce-county"
  ),
  to301(
    "/blog/acreage-serenity-meets-northwest-style-discover-12323-193rd-ave-e-in-bonney-lake",
    "/listings?city=Bonney%20Lake&state=WA"
  ),
  to301(
    "/blog/august-2025-housing-market-update-pierce-county-at-a-turning-point",
    "/blog/september-2025-market-snapshot-pierce-county-holds-steady-while-king-and-thurston-shift-toward-balance"
  ),
  to301(
    "/blog/can-i-stay-in-my-home-while-its-listed-for-sale",
    "/blog/prep-your-pierce-county-home-for-a-successful-sale"
  ),
  to301("/blog/discover-bonney-lake-guide", "/service-areas/bonney-lake"),
  to301(
    "/blog/hoa-and-condo-reality-check-for-2026-what-pierce-county-buyers-need-to-know-before-they-fall-in-love-with-the-home",
    "/blog/6-essential-things-every-first-time-homebuyer-should-know"
  ),
  to301(
    "/blog/how-migration-patterns-are-impacting-pierce-county-real-estate",
    "/blog/how-remote-work-continues-to-shape-buyer-patterns-in-pierce-county"
  ),
  to301(
    "/blog/how-to-handle-multiple-offers-like-a-pro-seller",
    "/blog/when-to-walk-away-from-a-buyer-offer"
  ),
  to301(
    "/blog/how-to-navigate-multiple-offers-without-stress",
    "/blog/when-to-walk-away-from-a-buyer-offer"
  ),
  to301(
    "/blog/maximizing-your-1031-like-kind-exchange-9-unique-strategies-most-people-dont-know-about",
    "/blog/the-powerful-tool-every-landlord-should-know-about"
  ),
  to301(
    "/blog/mortgage-rates-hit-year-lows----what-that-means-for-buyers-sellers-in-pierce-county",
    "/blog/pierce-county-mortgage-rates-2025-the-fed-the-10-year-treasury-and-what-it-means-for-bonney-lake-lake-tapps-sumner-beyond"
  ),
  to301(
    "/blog/photography-tips-that-help-homes-sell-faster-in-washington",
    "/real-estate-marketing"
  ),
  to301(
    "/blog/should-i-accept-a-cash-offer-on-my-home",
    "/blog/when-to-walk-away-from-a-buyer-offer"
  ),
  to301(
    "/blog/should-i-sell-my-house-in-2025-or-wait-until-2026",
    "/blog/pierce-county-real-estate-forecast-2026-trends-predictions-tips-for-sellers"
  ),
  to301(
    "/blog/staging-on-a-budget-washington-home-selling-tips-onsite-real-estate",
    "/preparation-and-staging"
  ),
  to301(
    "/blog/tapps-business-connect-how-a-lake-tapps-bonney-lake-business-network-is-strengthening-community--and-your-real-estate-results",
    "https://tappsbusinessconnect.com/"
  ),
  to301(
    "/blog/the-augusta-rule-14-days-of-tax-free-rental-income----a-bonney-lake-real-estate-guide-2025",
    "/blog/the-powerful-tool-every-landlord-should-know-about"
  ),
  to301(
    "/blog/the-rise-of-fha-and-va-buyers-what-sellers-should-know",
    "/blog/6-essential-things-every-first-time-homebuyer-should-know"
  ),
  to301(
    "/blog/washingtons-housing-market-in-2025-what-sellers-buyers-should-expect",
    "/blog/pierce-county-housing-market-what-sellers-should-know-in-2025"
  ),
  to301(
    "/blog/what-buyers-really-notice-first-during-a-showing-its-not-what-you-think",
    "/blog/the-power-of-first-impressions-in-real-estate"
  ),
  to301(
    "/blog/where-are-buyers-coming-from-in-pierce-county-in-2025",
    "/blog/how-remote-work-continues-to-shape-buyer-patterns-in-pierce-county"
  ),
];
