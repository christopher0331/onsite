import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Open Houses This Weekend in East Pierce County",
  description: "Upcoming open houses in Lake Tapps, Bonney Lake, Sumner, Puyallup and East Pierce County. RSVP or request a private tour. Times are subject to change.",
  path: "/open-houses",
});

export default function OpenHousesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
