import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import MLSGridTimestamp from "@/components/MLSGridTimestamp";

const CDN2 = "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0";

const properties = {
  "luxury-mid-century-modern-in-marine-hills": {
    title: "Luxury Mid-Century Modern in Marine Hills",
    address: "29011 7th Place S",
    city: "Federal Way, WA 98003",
    price: "$1,625,000",
    closedOn: "Jan 31, 2025",
    daysListed: 10,
    mls: "2318108",
    clip: "2321901226",
    beds: 5,
    baths: 5,
    sqft: "4,330",
    county: "King",
    lotSize: "36,296 sqft",
    hoa: "$50 Annually",
    subdivision: "Marine Hills",
    description:
      "Luxury Mid-Century Modern in Marine Hills — a stunning single-story home with daylight basement, refinished hardwoods throughout the upper level, and breathtaking Sound views from a private greenbelt setting. Fully remodeled interiors feature Viking appliances, two full kitchens and laundry rooms, an expansive primary suite plus two Jr. suites, and dual tankless water heaters. A dramatic spiral staircase leads to the remodeled basement with great room, fireplace, covered hot tub, and custom wine cellar. The detached 930 sq-ft garage includes automotive hoists.",
    highlights: [
      "Single Story w/ Daylight Basement",
      "Refinished Hardwoods Throughout Upper Level",
      "Breathtaking Sound Views",
      "Private Greenbelt Setting",
      "Fully Remodeled — Viking Appliances",
      "Two Full Kitchens & Laundry Rooms",
      "Expansive Primary Suite + Two Jr. Suites",
      "Dual Tankless Water Heaters",
      "Spiral Staircase to Remodeled Basement",
      "Covered Hot Tub & Custom Wine Cellar",
      "Detached 930 sq-ft Garage w/ Hoists",
    ],
    images: [
      `${CDN2}/67da2921089c1860cb91ba0a_home%20for%20sale.jpg`,
      `${CDN2}/67da2eafc2b5bf6c0d113440_2.jpg`,
      `${CDN2}/67da3873faf4e704b6d95a55_3.jpg`,
      `${CDN2}/67da387599194f07c0eb6677_4.jpg`,
      `${CDN2}/67da387707b39ce6f15610e6_5.jpg`,
      `${CDN2}/67da3aa8e7299e4133644d79_6.jpg`,
      `${CDN2}/67da3aabfd2d6a94c4e63cc5_7.jpg`,
      `${CDN2}/67da3aad6ca5ee00adb98124_8.jpg`,
    ],
  },
  "secluded-5-acre-dual-residence-in-graham": {
    title: "Secluded 5-Acre Dual Residence in Graham",
    address: "24508 128th Avenue E",
    city: "Graham, WA 98338",
    price: "$1,025,000",
    closedOn: "Dec 5, 2024",
    daysListed: 117,
    mls: "2257145",
    clip: "2767726096",
    beds: 2,
    baths: 2,
    sqft: "2,584",
    county: "Pierce",
    lotSize: "218,236 sqft (5 acres)",
    hoa: "N/A",
    subdivision: "Graham",
    description:
      "A rare private, gated property off a dead-end road — 5 acres offering true seclusion while remaining close to local conveniences. The main home spans 2,584 sq ft with modern amenities and sweeping wildlife views, complemented by a 5-car attached pull-through garage/shop. A second cabin-style home (1,476 sq ft) provides an ideal guest house or income-generating rental. Both structures feature newer heat pumps and recent roofs. The sprawling grounds include fruit trees, open spaces, and frequent elk visits — a nature lover's paradise.",
    highlights: [
      "Private Gated Property off Dead-End Road",
      "Main Home: 2,584 sq ft w/ Modern Amenities",
      "Wildlife Views — Frequent Elk Visits",
      "5-Car Attached Pull-Through Garage/Shop",
      "Second Home: 1,476 sq ft Cabin-Style Guest/Rental",
      "Newer Heat Pumps & Recent Roofs on Both Homes",
      "Fruit Trees & Open Spaces",
      "5 Acres of Serene Rural Privacy",
    ],
    images: [
      `${CDN2}/67db23e057c6f0784b1f07c9_1.jpg`,
      `${CDN2}/67db23e5e5d7bbc0f36c1741_2.jpg`,
      `${CDN2}/67db23e7be236cba1eb02b0d_3.jpg`,
      `${CDN2}/67db23eb437dc9a1ec525495_4.jpg`,
      `${CDN2}/67db23fff40d1f61a0684c34_5.jpg`,
      `${CDN2}/67db24c35022f4b336114589_6.jpg`,
      `${CDN2}/67db24c7437dc9a1ec530ea9_7.jpg`,
      `${CDN2}/67db283bd8255cc4fadc7129_8.jpg`,
    ],
  },
  "secluded-rambler-on-1-7-acres-in-buckley": {
    title: "Secluded Rambler on 1.7 Acres in Buckley",
    address: "1186 Spiketon Road",
    city: "Buckley, WA 98321",
    price: "$775,000",
    closedOn: "Dec 27, 2024",
    daysListed: 6,
    mls: "2313590",
    clip: "2271162659",
    beds: 2,
    baths: 2,
    sqft: "2,019",
    county: "Pierce",
    lotSize: "74,052 sqft (1.7 acres)",
    hoa: "N/A",
    subdivision: "Buckley",
    description:
      "A secluded rambler on 1.7 acres, private yet within city limits — the best of both worlds. The spacious detached garage includes a large shop with heated multi-purpose space ideal as an office, mudroom, or rec room, with additional buildable acreage available nearby. Inside features heated floors in the primary bath, kitchen, and mudroom, two tankless water heaters, hardwood flooring, and a wood stove. Outside: sprinkler system, horseshoe pits, dog run, fruit trees, garden space, a front courtyard with stamped concrete, and back patio wired and ready for a hot tub.",
    highlights: [
      "Private Yet Within City Limits",
      "Spacious Detached Garage & Large Heated Shop",
      "Additional Buildable Acreage Available",
      "RV Parking",
      "Heated Floors — Primary Bath, Kitchen & Mudroom",
      "2 Tankless Water Heaters",
      "Hardwood Flooring & Wood Stove",
      "Horseshoe Pits, Dog Run & Fruit Trees",
      "Back Patio w/ Hot Tub Electrical Ready",
      "City Water & Maintained Roads",
    ],
    images: [
      `${CDN2}/67db1b78810920b05fe55d61_1.jpg`,
      `${CDN2}/67db1b7a0688dcbebdc76987_2.jpg`,
      `${CDN2}/67db1bcc21e521827fc8b082_33.jpg`,
      `${CDN2}/67db1d847539735bc1e8d58f_4.jpg`,
      `${CDN2}/67db1d8500074439291844df_5.jpg`,
      `${CDN2}/67db1d88c649d08e9ac669c6_6.jpg`,
      `${CDN2}/67db1dc9687200264c68dbb9_7.jpg`,
      `${CDN2}/67db1e0b8f84b6942b1713ae_8.jpg`,
    ],
  },
  "modern-home-in-thriving-sumner-valley": {
    title: "Modern Home in Thriving Sumner Valley",
    address: "5786 159th Avenue Court E",
    city: "Sumner, WA 98390",
    price: "$750,000",
    closedOn: "Nov 1, 2024",
    daysListed: 6,
    mls: "2287145",
    clip: "1022737953",
    beds: 3,
    baths: 3,
    sqft: "2,266",
    county: "Pierce",
    lotSize: "8,720 sqft",
    hoa: "$400 Annually",
    subdivision: "Sumner Valley",
    description:
      "A modern corner-lot home built in 2020, ideally located in thriving Sumner Valley — walk to Fred Meyer, the YMCA, parks, and dining. The spacious yard features a covered patio and sprinkler system, while the modern kitchen comes fully equipped with all appliances. Recently repainted with upgraded finishes throughout and an eco-friendly water heater. Situated in the sought-after Bonney Lake-Sumner School District — a rare find in a prime location.",
    highlights: [
      "Built 2020 — Modern Corner-Lot",
      "Walk to Fred Meyer, YMCA, Parks & Dining",
      "Spacious Yard with Covered Patio",
      "Sprinkler System",
      "Modern Kitchen with All Appliances",
      "Recently Repainted with Upgraded Finishes",
      "Eco-Friendly Water Heater",
      "Bonney Lake-Sumner School District",
    ],
    images: [
      `${CDN2}/67e5f1f692b6e8f42f5bf2a0_1.jpg`,
      `${CDN2}/67e5f1f829e4511094377bcc_2.jpg`,
      `${CDN2}/67e5f1fbec60f8c936121c56_3.jpg`,
      `${CDN2}/67e5f1fe51f6139b0a91046a_4.jpg`,
      `${CDN2}/67e5f200fc10cffceb1b977b_5.jpg`,
      `${CDN2}/67e5f2024fa2ffda85694009_6.jpg`,
      `${CDN2}/67e5f20629e451109437849d_8.jpg`,
      `${CDN2}/67e5f206cadfd08bb01ec676_7.jpg`,
    ],
  },
  "modern-home-in-sumner-valley": {
    title: "Modern Home in Sumner Valley",
    address: "15615 Washington Street",
    city: "Sumner, WA 98390",
    price: "$710,000",
    closedOn: "Nov 1, 2024",
    daysListed: 4,
    mls: "2295262",
    clip: "1002340808",
    beds: 3,
    baths: 3,
    sqft: "1,830",
    county: "Pierce",
    lotSize: "8,594 sqft",
    hoa: "$400 Annually",
    subdivision: "Sumner Valley",
    description:
      "A modern corner-lot home built in 2020 in the heart of Sumner Valley — steps from Fred Meyer, the YMCA, parks, and dining. The spacious yard includes a covered patio and sprinkler system. The modern kitchen comes fully stocked with all appliances, and the home features recently repainted interiors with upgraded finishes and an eco-friendly water heater. Zoned for the sought-after Bonney Lake-Sumner School District — a rare find in a prime location.",
    highlights: [
      "Built 2020 — Modern Corner-Lot",
      "Walk to Fred Meyer, YMCA, Parks & Dining",
      "Spacious Yard with Covered Patio & Sprinkler",
      "Modern Kitchen with All Appliances",
      "Recently Repainted with Upgraded Finishes",
      "Eco-Friendly Water Heater",
      "Bonney Lake-Sumner School District",
    ],
    images: [
      `${CDN2}/67e5f1f692b6e8f42f5bf2a0_1.jpg`,
      `${CDN2}/67e6a5a683921a019c3e4f3b_1.jpg`,
      `${CDN2}/67e6a5a8f0e44490be820bc8_2.jpg`,
      `${CDN2}/67e6a5abc821382942809e20_3.jpg`,
      `${CDN2}/67e6a5ad320c2d93ad6085bc_4.jpg`,
      `${CDN2}/67e6a5af54b317bbb8e76d15_5.jpg`,
      `${CDN2}/67e6a5b23982d0c32c26289d_6.jpg`,
      `${CDN2}/67e6a5b4afcb89a0b2fda2d1_7.jpg`,
    ],
  },
  "single-story-home-in-gem-heights-puyallup": {
    title: "Single-Story Home in Gem Heights, Puyallup",
    address: "16516 87th Avenue E",
    city: "Puyallup, WA 98375",
    price: "$591,000",
    closedOn: "Oct 28, 2024",
    daysListed: 7,
    mls: "2298137",
    clip: "1015490375",
    beds: 2,
    baths: 2,
    sqft: "1,995",
    county: "Pierce",
    lotSize: "9,582 sqft",
    hoa: "Included",
    subdivision: "Gem Heights",
    description:
      "Welcome to your single-story home in Gem Heights, Puyallup — located in a highly sought-after neighborhood known for its exceptional amenities including a clubhouse, swimming pool, tennis, pickleball, basketball, and volleyball courts. Gem Heights offers well-maintained subdivisions blending comfort, style, and community. The Puyallup School District ranks among the top in the state, ensuring excellent education. Pet-friendly with landscaped communal spaces, this neighborhood fosters a strong, connected community.",
    highlights: [
      "Highly Sought-After Gem Heights Neighborhood",
      "Clubhouse & Swimming Pool",
      "Tennis, Pickleball, Basketball & Volleyball Courts",
      "Puyallup School District — Top Ranked in WA",
      "Pet-Friendly with Landscaped Common Spaces",
      "Well-Maintained Community Subdivisions",
      "Single-Story for Easy Living",
    ],
    images: [
      `${CDN2}/67e6a96b499447cc30f637df_1.jpg`,
      `${CDN2}/67e6a96d025e7a93c067455a_2.jpg`,
      `${CDN2}/67e6a9706b0c2eff679954fe_3.jpg`,
      `${CDN2}/67e6a97114b6f2128d0dc343_4.jpg`,
      `${CDN2}/67e6a9743f0a32adcc3317f9_5.jpg`,
      `${CDN2}/67e6a976ccb40e94c153cf2d_6.jpg`,
      `${CDN2}/67e6a9795edd1845e642dd62_7.jpg`,
      `${CDN2}/67e6a97b00e62aefebae11b8_8.jpg`,
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
    title: `${prop.title} — Sold for ${prop.price} | OnSite Real Estate Group`,
    description: `${prop.title} at ${prop.address}, ${prop.city}. Sold for ${prop.price} in ${prop.daysListed} days. MLS #${prop.mls}.`,
  };
}

export default async function SoldHomeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prop = properties[slug as Slug];
  if (!prop) notFound();

  const [hero, ...gallery] = prop.images;
  const otherProps = Object.entries(properties).filter(([s]) => s !== slug).slice(0, 3);

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 sm:pb-24 lg:px-12">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-charcoal">
              Sold · {prop.closedOn}
            </span>
            <h1 className="mb-4 max-w-3xl font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white">
              {prop.title}
            </h1>
            <p className="mb-8 text-[15px] text-white/70">{prop.address}, {prop.city}</p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.price}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">Sale Price</p>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block self-center" />
              <div>
                <p className="font-serif text-[2.2rem] font-light leading-none text-white">{prop.daysListed}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">Days Listed</p>
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

                <div className="mb-10">
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

              {/* Property details sidebar */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#f2ede6] p-8">
                  <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-charcoal/50">Property Details</p>
                  <dl className="space-y-4">
                    {[
                      { label: "MLS #", value: prop.mls },
                      { label: "County", value: prop.county },
                      { label: "Subdivision", value: prop.subdivision },
                      { label: "Lot Size", value: prop.lotSize },
                      { label: "HOA Fee", value: prop.hoa },
                      { label: "Bedrooms", value: String(prop.beds) },
                      { label: "Bathrooms", value: String(prop.baths) },
                      { label: "Square Feet", value: prop.sqft },
                      { label: "Days Listed", value: String(prop.daysListed) },
                      { label: "Closed On", value: prop.closedOn },
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
                      Talk to Our Team
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

        {/* Other sold homes */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">More Sold Homes</p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-snug text-charcoal">
                  See More Results.
                </h2>
              </div>
              <Link
                href="/sold-homes"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
              >
                View All
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {otherProps.map(([s, p]) => (
                <Link
                  key={s}
                  href={`/sold-homes/${s}`}
                  className="group flex flex-col overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500 hover:shadow-[0_22px_70px_rgba(0,0,0,0.18)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-charcoal shadow">
                      Sold
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-charcoal/40">{p.city}</p>
                      <h3 className="font-serif text-[1.1rem] font-light leading-snug text-charcoal">{p.title}</h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-4">
                      <p className="font-serif text-[1.3rem] font-light text-charcoal">{p.price}</p>
                      <p className="text-[11px] text-charcoal/40">{p.daysListed} days</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1a1a18] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Ready to Sell?</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
                  Your Home Could Be<br />Next on This List.
                </h2>
              </div>
              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-[16px] leading-8 text-white/70 lg:text-right">
                  With 300+ homes sold across East Pierce County, we know how to position your property for maximum value and a fast close.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/free-home-evaluation"
                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                  >
                    Free Home Evaluation
                  </Link>
                  <Link
                    href="/sell-your-home"
                    className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                  >
                    Sell Your Home
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
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67c78bf7764f04b090341ec5_three-trees-icon.png"
                alt="NWMLS Three Trees Logo"
                width={48}
                height={48}
                className="h-10 w-auto shrink-0 opacity-50"
              />
              <div className="space-y-2">
                <p className="text-[12px] text-charcoal/50 font-medium">
                  Listing data provided by NWMLS as distributed by MLS Grid.
                  <MLSGridTimestamp />
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
