import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const NWMLS_LOGO = "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png";

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

const properties = {
  "charming-downtown-puyallup-home": {
    title: "Charming Downtown Puyallup Home",
    address: "703 3rd St SW",
    city: "Puyallup, WA 98371",
    price: "$575,000",
    status: "Active",
    beds: 2,
    baths: "2.5",
    sqft: "1,328",
    county: "Pierce",
    lotSize: "0.14 acres",
    yearBuilt: "1908",
    hoa: "N/A",
    neighborhood: "Meeker",
    schoolDistrict: "Puyallup",
    description:
      "A charming home steps from the Washington State Fairgrounds and the beloved Puyallup Farmer's Market — walking distance to dining, shopping, and entertainment in the heart of downtown Puyallup. The property sits on a corner lot with seasonal parking income potential and features a detached 1,579 sq/ft garage/shop with a ¾ bath and gas heat — ideal for a workshop, studio, or additional income. Covered storage, a welcoming front porch, and move-in ready condition round out this rare downtown find. Pre-inspected for your peace of mind.",
    highlights: [
      "Steps from Washington State Fairgrounds & Farmer's Market",
      "Walk to Dining, Shopping & Entertainment",
      "Detached 1,579 sq/ft Garage/Shop with ¾ Bath & Gas Heat",
      "Corner Lot with Seasonal Parking Income Potential",
      "Covered Storage & Front Porch",
      "Pre-Inspected & Move-In Ready",
      "Year Built: 1908 — Historic Character",
    ],
    images: [
      `${CDN2}/680fd1f96247b67248995d1d_1.png`,
      `${CDN2}/680fd1fb019d5b5f45067283_11.jpg`,
      `${CDN2}/680fd23abc202eff2c44d1d4_2.jpg`,
      `${CDN2}/680fd23fac5825d748ec74b4_4.jpg`,
      `${CDN2}/680fd2a66d90faf5feb6985d_5.jpg`,
      `${CDN2}/680fd2a846dd18313c41b5a7_6.jpg`,
      `${CDN2}/680fd2ab2edd8375a2980edb_7.jpg`,
      `${CDN2}/680fd2ad518436969ab21f43_8.jpg`,
    ],
  },
  "entertainers-dream-home-with-pickleball-court-on-1-2-acre": {
    title: "Entertainer's Dream Home with Pickleball Court",
    address: "2734 Thornhill Rd SE",
    city: "Puyallup, WA 98374",
    price: "$720,000",
    status: "Active",
    beds: 3,
    baths: "2.5",
    sqft: "2,054",
    county: "Pierce",
    lotSize: "0.48 acres",
    yearBuilt: "1996",
    hoa: "N/A",
    neighborhood: "South Hill",
    schoolDistrict: "Puyallup",
    description:
      "A stunning entertainer's dream on nearly ½ acre — featuring an open-concept main level that flows to an oversized deck overlooking garden beds, a full pickleball court, and a basketball court. The private primary suite boasts a fireplace, walk-in closet, and spa bath. A bonus room easily converts to a 4th bedroom or dedicated office, and all bedrooms include walk-in closets. Central A/C, newer water tank, and move-in ready condition make this South Hill gem truly turn-key.",
    highlights: [
      "Nearly ½ Acre — Pickleball & Basketball Courts",
      "Open-Concept Main Level & Oversized Deck",
      "Garden Beds & Outdoor Entertainment Space",
      "Private Primary Suite with Fireplace & Spa Bath",
      "Walk-In Closets in All Bedrooms",
      "Bonus Room — 4th Bedroom or Office",
      "Central A/C & Newer Water Tank",
      "Move-In Ready",
    ],
    images: [
      `${CDN2}/680fe8304415e6b356d95497_1.jpg`,
      `${CDN2}/680fe8330986d3efe4a5d489_3.jpg`,
      `${CDN2}/680fe836485c1315853d9ac9_4.jpg`,
      `${CDN2}/680fe83b703a2d2e2694ad0c_6.jpg`,
      `${CDN2}/680fe83eee4e62f0b154b0c9_2.jpg`,
      `${CDN2}/680fe840ea0b9bbb8d2887b5_7.jpg`,
      `${CDN2}/680fe843c9c21d899df9f24c_8.jpg`,
      `${CDN2}/680fe846246ba02bd5dda99a_9.jpg`,
    ],
  },
  "luxury-rambler-on-15-acres-with-rainier-views": {
    title: "Luxury Rambler on 15 Acres with Rainier Views",
    address: "15701 264th St E",
    city: "Graham, WA 98338",
    price: "$1,495,000",
    status: "Active",
    beds: 4,
    baths: "2.5",
    sqft: "3,353",
    county: "Pierce",
    lotSize: "15.76 acres",
    yearBuilt: "2023",
    hoa: "N/A",
    neighborhood: "Kapowsin",
    schoolDistrict: "Bethel",
    description:
      "A brand-new luxury rambler on 15 sweeping acres with breathtaking Rainier views — offering rural privacy with endless opportunity. The gourmet kitchen features Wolf appliances, a butler's pantry, and a Pentel Quartz island. Soaring 10-foot ceilings and expansive windows flood the home with natural light. The spa-like primary ensuite is an absolute retreat. The property also includes a 1,600 sq ft shop, detached garage, and barn — ideal as an income property, hobby farm, or multi-generational estate.",
    highlights: [
      "Brand-New 2023 Construction",
      "15 Acres with Breathtaking Rainier Views",
      "Gourmet Kitchen — Wolf Appliances & Butler's Pantry",
      "Pentel Quartz Island",
      "10 ft Ceilings & Expansive Windows",
      "Spa-Like Primary Ensuite",
      "1,600 sq ft Shop + Detached Garage & Barn",
      "Income Property Potential",
      "Rural Privacy — Kapowsin / Graham Area",
    ],
    images: [
      `${CDN2}/680fe409428a57e5320586a0_1.jpg`,
      `${CDN2}/680fe40c43dd213bae94c132_2.jpg`,
      `${CDN2}/680fe40f485c1315853aac8e_3.jpg`,
      `${CDN2}/680fe412d93f53fb55f86aae_4.jpg`,
      `${CDN2}/680fe415b178a80cfeb2f283_5.jpg`,
      `${CDN2}/680fe4172b2016529e773e02_6.jpg`,
      `${CDN2}/680fe41a8b41b92e0e5f9a6e_7.jpg`,
      `${CDN2}/680fe41ca8647db3ae6f9c6a_8.jpg`,
    ],
  },
};

type Slug = keyof typeof properties;

export async function generateStaticParams() {
  return Object.keys(properties).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prop = properties[slug as Slug];
  if (!prop) return {};
  return {
    title: `${prop.title} — ${prop.price} | OnSite Real Estate Group`,
    description: `${prop.title} at ${prop.address}, ${prop.city}. Listed at ${prop.price}. ${prop.beds} bed, ${prop.baths} bath, ${prop.sqft} sqft.`,
  };
}

export default async function FeaturedHomeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prop = properties[slug as Slug];
  if (!prop) notFound();

  const [hero, ...gallery] = prop.images;
  const otherProps = Object.entries(properties).filter(([s]) => s !== slug);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[520px] max-h-[860px] overflow-hidden">
          <Image
            src={hero}
            alt={prop.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 sm:pb-24 lg:px-12">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-charcoal">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Active Listing
              </span>
              <span className="inline-flex items-center rounded-full border border-white/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/80">
                Listed by Timber Real Estate
              </span>
            </div>
            <h1 className="mb-4 max-w-3xl font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white">
              {prop.title}
            </h1>
            <p className="mb-8 text-[15px] text-white/70">{prop.address}, {prop.city}</p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.price}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">List Price</p>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block self-center" />
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.sqft}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">Square Feet</p>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block self-center" />
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.beds} / {prop.baths}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">Bed / Bath</p>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block self-center" />
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.lotSize}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">Lot Size</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

              {/* Description + highlights */}
              <div className="lg:col-span-7">
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Property Overview</p>
                <h2 className="mb-6 font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  {prop.title}
                </h2>
                <p className="mb-10 text-[16px] leading-8 text-charcoal/70 not-italic">
                  {prop.description}
                </p>

                <div>
                  <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-charcoal/40">Property Highlights</p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {prop.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[14px] leading-6 text-charcoal/70">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-4 w-4 shrink-0 text-charcoal/30">
                          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#f2ede6] p-8">
                  <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-charcoal/50">Property Details</p>
                  <dl className="space-y-4">
                    {[
                      { label: "List Price", value: prop.price },
                      { label: "Status", value: prop.status },
                      { label: "County", value: prop.county },
                      { label: "Neighborhood", value: prop.neighborhood },
                      { label: "School District", value: prop.schoolDistrict },
                      { label: "Lot Size", value: prop.lotSize },
                      { label: "Year Built", value: prop.yearBuilt },
                      { label: "HOA Fee", value: prop.hoa },
                      { label: "Bedrooms", value: String(prop.beds) },
                      { label: "Bathrooms", value: prop.baths },
                      { label: "Square Feet", value: prop.sqft },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-baseline justify-between border-b border-charcoal/8 pb-4 last:border-0 last:pb-0">
                        <dt className="text-[12px] uppercase tracking-[0.2em] text-charcoal/45">{label}</dt>
                        <dd className="font-serif text-[1rem] font-light text-charcoal">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 space-y-3">
                    <Link
                      href="/contact-us"
                      className="flex w-full items-center justify-center rounded-full bg-charcoal px-6 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-charcoal/85"
                    >
                      Schedule a Showing
                    </Link>
                    <Link
                      href="/free-home-evaluation"
                      className="flex w-full items-center justify-center rounded-full border border-charcoal/20 px-6 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
                    >
                      Free Home Evaluation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo gallery — linen */}
        {gallery.length > 0 && (
          <section className="bg-[#f2ede6] py-16 sm:py-20">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Photo Gallery</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {gallery.map((img, i) => (
                  <div
                    key={img}
                    className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
                  >
                    <Image
                      src={img}
                      alt={`${prop.title} — photo ${i + 2}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other featured homes */}
        {otherProps.length > 0 && (
          <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
              <div className="mb-10">
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Also Featured</p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  More Featured Homes.
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {otherProps.map(([s, p]) => (
                  <Link
                    key={s}
                    href={`/featured-homes/${s}`}
                    className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal shadow">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div>
                        <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-charcoal/40">{p.city}</p>
                        <h3 className="font-serif text-[1.15rem] font-light leading-snug text-charcoal">{p.title}</h3>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-4">
                        <p className="font-serif text-[1.35rem] font-light text-charcoal">{p.price}</p>
                        <p className="text-[11px] text-charcoal/40">{p.beds} bd · {p.baths} ba · {p.sqft} sqft</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA — dark */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Interested?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Let&apos;s Talk About<br />This Property.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  Ready to schedule a showing or ask questions? Our team is here to walk you through every detail of this home.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Schedule a Showing
                  </Link>
                  <Link
                    href="/buy-home"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    Buy a Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MLS Grid / NWMLS compliance */}
        <section className="bg-white border-t border-charcoal/8 py-10">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
              <Image
                src={NWMLS_LOGO}
                alt="NWMLS Three Trees Logo"
                width={48}
                height={48}
                className="h-10 w-auto shrink-0 opacity-50"
              />
              <div className="space-y-2">
                <p className="text-[12px] text-charcoal/50 font-medium">
                  Listing data provided by NWMLS as distributed by MLS Grid.
                </p>
                <p className="text-[11px] leading-[1.8] text-charcoal/35 max-w-4xl">
                  IDX information is provided exclusively for consumers&apos; personal noncommercial use, that it may not be
                  used for any purpose other than to identify prospective properties consumers may be interested in
                  purchasing, that the data is deemed reliable but is not guaranteed by MLS GRID, and that the use of
                  the MLS GRID Data may be subject to an end user license agreement prescribed by the Member
                  Participant&apos;s applicable MLS if any and as amended from time to time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
