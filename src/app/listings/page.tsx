import { queryPublicListingsPage } from "@/lib/listing-fetch";
import ListingsBrowseClient, { type Listing } from "./ListingsBrowseClient";

export const revalidate = 300;

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const city = firstParam(sp.q) || firstParam(sp.city);
  const statusRaw = firstParam(sp.status) || "A";
  const status = ["All", "A", "P", "U"].includes(statusRaw) ? statusRaw : "A";
  const view = firstParam(sp.view) === "map" ? "map" : "list";
  const state = firstParam(sp.state) || "WA";

  const data = await queryPublicListingsPage({
    city,
    status,
    state,
    page: 1,
    pageSize: 24,
    prependOurs: !city,
  });

  return (
    <ListingsBrowseClient
      initial={{
        listings: data.listings as Listing[],
        count: data.count,
        numPages: data.numPages,
        city,
        status,
        view,
        state,
      }}
    />
  );
}
