# OnSite ReGroup Clone TODO

## 0) Project Setup and Data Plumbing
- [ ] Replace default `README.md` with project-specific setup + architecture notes.
- [ ] Create a typed content layer from `toClone/pages.json` (helpers + TypeScript types).
- [ ] Add utility functions to map URL -> page content, image links, and related links.
- [ ] Add a centralized route config so every destination is defined once.
- [ ] Add fallback handling for missing/partial crawl content.

## 1) Design System (New Theme, Non-Boxy)
- [ ] Finalize global tokens: color palette, spacing scale, radii, shadows, typography.
- [ ] Standardize reusable UI primitives (`Section`, `Button`, `Card`, `Heading`, `Badge`).
- [ ] Ensure "soft / local / premium" visual language across all sections.
- [ ] Tune responsive breakpoints for mobile/tablet/desktop.
- [ ] Add consistent hover and motion behavior (not over-animated).

## 2) Shared Site Shell
- [ ] Header: responsive nav, sticky behavior, mobile menu.
- [ ] Footer: links, legal, social, badges, contact info.
- [ ] Global metadata defaults (title/description/Open Graph).
- [ ] 404 and not-found experience aligned to theme.

## 3) Homepage (Already Started - Finish Pass)
- [ ] Final polish pass for hero/header/footer consistency.
- [ ] Verify copy fidelity against `toClone/pages.json`.
- [ ] Verify image choices for every homepage section.
- [ ] Accessibility pass (contrast, heading order, focus states, alt text).
- [ ] Performance pass (hero media loading strategy, image sizes, lazy loading).

## 4) Static Core Pages
- [x] `/about-us`
- [x] `/sell-your-home`
- [x] `/buy-home`
- [x] `/free-home-evaluation`
- [x] `/contact-us`
- [x] `/frequently-asked-questions`
- [ ] `/social-hub`
- [ ] `/dmca-notice`

## 5) Selling Journey Pages
- [x] `/selling-process`
- [x] `/preparation-and-staging`
- [x] `/real-estate-marketing`
- [x] `/negotiation-closing`
- [x] `/sellers-guide`
- [ ] `/success-stories`

## 6) Insights / Content Hub
- [ ] `/trends-insights`
- [ ] `/insights`
- [ ] `/market-trends`
- [ ] `/selling-tips`
- [ ] Dynamic blog route: `/blog/[slug]`
- [ ] Auto-generate blog index data from `pages.json`.
- [ ] Related articles module (from crawl links where possible).

## 7) Listings and Property Pages
- [ ] `/sold-homes` listing page.
- [ ] Dynamic sold home route: `/sold-homes/[slug]`.
- [ ] Dynamic featured home route: `/featured-homes/[slug]`.
- [ ] Standard property detail template (gallery, stats, price, CTA).
- [ ] Consistent card/grid styles for sold + featured pages.

## 8) Business Connect
- [ ] `/business-connect`
- [ ] Category pages:
  - [ ] `/finance-professional`
  - [ ] `/food-hospitality`
  - [ ] `/health-wellness`
  - [ ] `/home-services`
  - [ ] `/lifestyle-personal-services`
  - [ ] `/trades-specialty`
- [ ] Dynamic profile route: `/business-connect-profiles/[name]`.

## 9) Content QA and Fidelity
- [ ] Confirm each recreated page has matching headline + key body copy.
- [ ] Confirm major CTA destinations are mapped and intentional.
- [ ] Confirm image sets are correctly associated with each page.
- [ ] Remove duplicate/low-value content patterns where appropriate.
- [ ] Build a checklist to compare each route with source content snapshot.

## 10) Tech QA and Launch Readiness
- [ ] Run `npm run build` with zero errors/warnings.
- [ ] Add route-level metadata for all major pages.
- [ ] Add sitemap generation and robots config.
- [ ] Add canonical URL handling and trailing slash policy.
- [ ] Basic analytics hook + event tracking for key CTAs.
- [ ] Final mobile QA pass across all templates.

## 11) Post-Clone Improvements (After Fidelity Complete)
- [ ] Improve internal linking between related pages.
- [ ] Consolidate overlapping blog content to reduce cannibalization.
- [ ] Add trust-building local proof modules (areas served, sold map, testimonials).
- [ ] Add lightweight CMS/data workflow to avoid manual hand-entry pain.
- [ ] Prepare phase-2 SEO improvements plan.

## Immediate Next 5 Tasks
- [ ] Build typed parser/helpers for `toClone/pages.json`.
- [ ] Scaffold all missing routes (empty but styled shells) from `structure.json`.
- [ ] Implement dynamic `/blog/[slug]` with source-mapped content.
- [ ] Implement dynamic `/sold-homes/[slug]` and `/featured-homes/[slug]`.
- [ ] Complete homepage final polish and lock component style guide.
