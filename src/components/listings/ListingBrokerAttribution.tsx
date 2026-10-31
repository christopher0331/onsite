import { formatListingBrokerParts, getListingBrokerInfo, type BrokerListingLike } from "@/lib/listing-broker";

/**
 * "Listing Broker: firm; broker; phone; email" (+ "Buyer Brokerage: firm" on sold
 * listings). Rendered directly under the listing page contact buttons on every
 * breakpoint, in readable full-contrast text at least as large as the button
 * labels (MLS Grid IDX Rule 22: not tiny, not gray-on-gray).
 */
export default function ListingBrokerAttribution({
  listing,
  isSold,
  theme = "dark",
  compact = false,
  className = "",
}: {
  listing: BrokerListingLike;
  isSold: boolean;
  theme?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  const info = getListingBrokerInfo(listing);
  const parts = formatListingBrokerParts(info);
  if (parts.length === 0 && !(isSold && info.buyerFirm)) return null;

  const text = theme === "dark" ? "text-white" : "text-charcoal";
  const box =
    theme === "dark" ? "border-white/30 bg-white/5" : "border-charcoal/25 bg-charcoal/5";
  const size = compact ? "text-[12px]" : "text-[13px]";

  return (
    <div
      data-listing-broker
      className={`rounded-2xl border ${box} px-4 py-3 ${size} font-medium leading-snug ${text} ${className}`}
    >
      {parts.length > 0 && (
        <p className="break-words">
          <span className="font-bold">Listing Broker:</span> {parts.join("; ")}
        </p>
      )}
      {isSold && (
        <p className="mt-1 break-words">
          <span className="font-bold">Buyer Brokerage:</span>{" "}
          {info.buyerFirm || "Not provided"}
        </p>
      )}
    </div>
  );
}
