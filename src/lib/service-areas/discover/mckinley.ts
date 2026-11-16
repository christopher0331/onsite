import type { ServiceAreaDiscover } from "./types";

export const mckinleyDiscover: ServiceAreaDiscover = {
  slug: "mckinley",
  updatedAt: "2026-11-07",
  attractions: [
    {
      name: "McKinley Park",
      url: "https://www.parkstacoma.gov/place/mckinley-park/",
      description: "Parks Tacoma documents wooded pathways, playground equipment, four streams and four wetlands. Dogs must remain on leash."
    },
    {
      name: "Tacoma neighborhood guide",
      url: "/service-areas/tacoma",
      description: "Compare McKinley with the wider city before narrowing your property search."
    }
  ],
  localLivingMarkdown: [
    "McKinley Park is a starting point for exploring this Tacoma neighborhood, not a shortcut for judging a property. Check current access on the [official park page](https://www.parkstacoma.gov/place/mckinley-park/) and inspect the street, parking, and condition in person.",
    "Compare the [Tacoma guide](/service-areas/tacoma), [Lincoln District](/service-areas/tacoma/lincoln-district), and [Fern Hill](/service-areas/tacoma/fern-hill). Verify school assignment with [Tacoma Public Schools](https://www.tacomaschools.org/) by address. [Talk with OnSite](/contact-us?area=McKinley&topic=selling) about property-specific preparation and comparable sales."
  ]
};
