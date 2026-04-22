import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.repliers.io/";

type Listing = {
  mlsNumber: string;
  listPrice: number;
  status: string;
  address: {
    streetNumber: string;
    streetName: string;
    streetSuffix: string;
    streetDirection: string;
    city: string;
    state: string;
    zip: string;
  };
  details: {
    virtualTourUrl: string | null;
    alternateURLVideoLink: string | null;
    numBedrooms: number | null;
    numBathrooms: number | null;
    sqft: number | null;
    propertyType: string | null;
  };
  images: string[];
  office?: { brokerageName?: string } | null;
};

function getEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);

    // YouTube full
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&autoplay=0`;
    }

    // YouTube short
    if (url.hostname === "youtu.be") {
      const v = url.pathname.replace("/", "");
      if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&autoplay=0`;
    }

    // Vimeo player (already embed-ready)
    if (url.hostname === "player.vimeo.com") {
      const sep = raw.includes("?") ? "&" : "?";
      return `${raw}${sep}autoplay=0`;
    }

    // Vimeo standard
    if (url.hostname === "vimeo.com") {
      const id = url.pathname.replace("/", "").split("/")[0];
      const h = url.pathname.split("/")[2] || "";
      return h
        ? `https://player.vimeo.com/video/${id}?h=${h}&autoplay=0`
        : `https://player.vimeo.com/video/${id}?autoplay=0`;
    }

    // Matterport
    if (url.hostname.includes("matterport.com")) {
      return raw; // already embeddable
    }

    // TourFactory, Aryeo, and other virtual tour platforms
    // Most support iframe embed
    return raw;
  } catch {
    return null;
  }
}

function formatAddress(a: Listing["address"]) {
  return [a.streetNumber, a.streetDirection, a.streetName, a.streetSuffix]
    .filter(Boolean)
    .join(" ");
}

async function fetchVideoListings(): Promise<Listing[]> {
  try {
    // Objective criteria: active NWMLS listings in Pierce County, WA, ordered
    // by most recently updated, filtered client-side for ones that expose a
    // public video tour URL.
    const res = await fetch(
      "https://api.repliers.io/listings?area=Pierce&state=WA&pageSize=50&status=A&sortBy=updatedOnDesc",
      {
        headers: {
          "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        },
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const listings: Listing[] = data.listings || [];

    return listings
      .filter((l) => {
        const url = l.details?.virtualTourUrl || l.details?.alternateURLVideoLink;
        if (!url) return false;
        return getEmbedUrl(url) !== null;
      })
      .slice(0, 6);
  } catch {
    return [];
  }
}

export default async function PropertyVideos() {
  const listings = await fetchVideoListings();

  if (listings.length === 0) return null;

  return (
    <section className="bg-[#1a1a18] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Pierce County, WA · Video Tours · Preset Search
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] text-white">
              Tour Homes Online.
            </h2>
          </div>
          <Link
            href="/listings"
            className="shrink-0 self-start rounded-full border border-white/25 px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-white/60 transition-all duration-300 hover:border-white/50 hover:text-white sm:self-auto"
          >
            Search All Listings →
          </Link>
        </div>

        {/* Preset-search disclosure */}
        <p className="mb-10 max-w-3xl text-[13px] leading-relaxed text-white/55">
          The six homes below are a preset objective search: the most recently-updated active NWMLS
          listings in Pierce County, WA that include a public video tour. Listings may be represented
          by brokerages other than OnSite Real Estate Group — attribution is shown on each tile and
          on the full listing page.
        </p>

        {/* Video grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => {
            const rawUrl =
              listing.details.virtualTourUrl ||
              listing.details.alternateURLVideoLink ||
              "";
            const embedUrl = getEmbedUrl(rawUrl)!;
            const street = formatAddress(listing.address);
            const det = listing.details;

            return (
              <div
                key={listing.mlsNumber}
                className="group relative aspect-video overflow-hidden rounded-2xl bg-black"
              >
                {/* Iframe — always visible */}
                <iframe
                  src={embedUrl}
                  title={street}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />

                {/* Info overlay — hidden until hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="pointer-events-auto flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-serif text-[0.95rem] font-light leading-snug text-white">
                        {street}
                      </p>
                      <p className="text-[11px] text-white/55">
                        {listing.address.city}, {listing.address.state}
                        {(det.numBedrooms || det.numBathrooms) && (
                          <span className="ml-2 text-white/35">
                            {[
                              det.numBedrooms && `${det.numBedrooms} bd`,
                              det.numBathrooms && `${det.numBathrooms} ba`,
                            ].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </p>
                      {listing.office?.brokerageName && (
                        <p className="mt-1 truncate text-[10px] text-white/40">
                          Listed by {listing.office.brokerageName}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <p className="font-serif text-[1rem] font-light text-white">
                        ${listing.listPrice.toLocaleString()}
                      </p>
                      <Link
                        href={`/listings/${listing.mlsNumber}`}
                        className="rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white hover:text-white"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* NWMLS attribution */}
        <div className="mt-14 flex items-start gap-4 border-t border-white/10 pt-8">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png"
            alt="NWMLS Three Trees Logo"
            width={36}
            height={36}
            className="h-8 w-auto shrink-0 opacity-60 brightness-0 invert"
          />
          <p className="max-w-3xl text-[11px] leading-[1.8] text-white/45">
            Listing data provided by NWMLS as distributed by MLS Grid. Listings may be represented by
            brokerages other than OnSite Real Estate Group; see each listing page for the listing
            brokerage and agent. Data is deemed reliable but is not guaranteed by MLS GRID.
          </p>
        </div>
      </div>
    </section>
  );
}
