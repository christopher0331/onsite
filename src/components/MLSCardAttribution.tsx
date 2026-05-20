import Image from "next/image";

type Props = { state?: string | null };

export default function MLSCardAttribution({ state }: Props) {
  const isNwmls = state === "WA";
  return (
    <div className="flex items-center gap-2 border-t border-charcoal/8 pt-3 mt-3">
      {isNwmls && (
        <Image
          src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png"
          alt="NWMLS"
          width={14}
          height={14}
          className="h-3.5 w-auto shrink-0 opacity-50"
        />
      )}
      <p className="text-[10px] leading-tight text-charcoal/65">
        {isNwmls
          ? "Listing provided by NWMLS as distributed by MLS Grid"
          : "Listing data provided by MLS Grid"}
      </p>
    </div>
  );
}
