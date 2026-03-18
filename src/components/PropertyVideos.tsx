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
      return raw;
    }

    // Vimeo standard
    if (url.hostname === "vimeo.com") {
      const id = url.pathname.replace("/", "").split("/")[0];
      const h = url.pathname.split("/")[2] || "";
      return h
        ? `https://player.vimeo.com/video/${id}?h=${h}`
        : `https://player.vimeo.com/video/${id}`;
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
    const res = await fetch(
      "https://api.repliers.io/listings?area=Pierce&state=WA&pageSize=50&status=A",
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

    // Keep only listings that have a parseable video URL
    return listings
      .filter((l) => {
        const url = l.details?.virtualTourUrl || l.details?.alternateURLVideoLink;
        if (!url) return false;
        return getEmbedUrl(url) !== null;
      })
      .slice(0, 10);
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
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Video Tours
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] text-white">
              Tour Homes Online.
            </h2>
          </div>
          <Link
            href="/listings"
            className="shrink-0 self-start rounded-full border border-white/25 px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-white/60 transition-all duration-300 hover:border-white/50 hover:text-white sm:self-auto"
          >
            View All Listings →
          </Link>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition-all duration-500 hover:bg-white/8 hover:ring-white/20"
              >
                {/* Iframe */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={embedUrl}
                    title={street}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <p className="truncate font-serif text-[1rem] font-light leading-snug text-white">
                      {street}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/45">
                      {listing.address.city}, {listing.address.state}
                    </p>
                    {(det.numBedrooms || det.numBathrooms || det.sqft) && (
                      <div className="mt-2 flex gap-3 text-[11px] text-white/35">
                        {det.numBedrooms && <span>{det.numBedrooms} bd</span>}
                        {det.numBathrooms && <span>{det.numBathrooms} ba</span>}
                        {det.sqft && <span>{Number(det.sqft).toLocaleString()} sqft</span>}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-serif text-[1.1rem] font-light text-white">
                      ${listing.listPrice.toLocaleString()}
                    </p>
                    <Link
                      href={`/listings/${listing.mlsNumber}`}
                      className="mt-1 inline-block text-[10px] uppercase tracking-[0.2em] text-white/35 transition-colors duration-300 group-hover:text-white/60"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
