import type { Metadata } from "next";
import { SITE_BRAND } from "@/lib/nap";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: `Open Houses This Weekend | East Pierce County | ${SITE_BRAND}`,
  description: `Upcoming open houses in Lake Tapps, Bonney Lake, Sumner, Puyallup, and East Pierce County. Tell ${SITE_BRAND} you're coming or request a private tour. Times are subject to change.`,
  path: "/open-houses",
});

export default function OpenHousesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
