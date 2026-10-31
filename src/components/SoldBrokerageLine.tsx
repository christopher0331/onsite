import { STATIC_SOLD_BROKERAGE } from "@/lib/sold-display";

/**
 * "Listing Brokerage: …  Buyer Brokerage: …" strip placed directly under a sold
 * property's photo (NWMLS Data Use Policy: firm adjacent to the photo).
 */
export default function SoldBrokerageLine({
  slug,
  listingFirm,
  buyerFirm,
  theme = "light",
  className = "",
}: {
  slug?: string;
  listingFirm?: string;
  buyerFirm?: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const fromSlug = slug ? STATIC_SOLD_BROKERAGE[slug] : undefined;
  const listing = listingFirm ?? fromSlug?.listingFirm ?? "";
  const buyer = buyerFirm ?? fromSlug?.buyerFirm ?? "";
  if (!listing && !buyer) return null;
  const tone =
    theme === "dark" ? "bg-white/10 text-white" : "bg-charcoal/[0.04] text-charcoal";
  return (
    <p
      data-sold-brokerage
      className={`px-4 py-2.5 text-[12px] font-medium leading-snug ${tone} ${className}`}
    >
      {listing ? (
        <span className="block sm:inline">
          <span className="font-bold">Listing Brokerage:</span> {listing}
        </span>
      ) : null}
      {listing && buyer ? <span className="hidden sm:inline"> · </span> : null}
      {buyer ? (
        <span className="block sm:inline">
          <span className="font-bold">Buyer Brokerage:</span> {buyer}
        </span>
      ) : null}
    </p>
  );
}
