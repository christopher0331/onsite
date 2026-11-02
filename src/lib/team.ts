/**
 * Team roster (plain data). Shared by the About Us team cards and the
 * individual bio pages at /about-us/<slug>. Copy mirrors the existing About Us bios.
 */
export type TeamProfile = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  phone: string;
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  objectPosition?: string;
  socials: Partial<Record<"facebook" | "instagram" | "youtube" | "linkedin" | "tiktok" | "whatsapp", string>>;
  bioShort: string;
  bioParagraphs: readonly string[];
  knowsAbout: readonly string[];
};

export const TEAM_PROFILES: TeamProfile[] = [
  {
    slug: "andre-bohall",
    name: "André Bohall",
    role: "Founder",
    photo:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff6b4b276a0e00c3a04ef_thumbnail_20241213_132625.jpg",
    phone: "2534419764",
    phoneDisplay: "(253) 441-9764",
    phoneE164: "+1-253-441-9764",
    email: "andre@onsiteregroup.com",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=61570807923008&sk=followers",
      instagram: "https://www.instagram.com/onsiterealestategroup/",
      youtube: "https://www.youtube.com/@OnSiteRealEstateGroup",
      linkedin: "https://www.linkedin.com/in/onsiteregroup",
      tiktok: "https://www.tiktok.com/@onsiteregroup",
    },
    bioShort:
      "With over a decade of experience and hundreds of successful home sales, André brings deep expertise, tireless dedication, and a personal touch to every real estate journey.",
    bioParagraphs: [
      "With over a decade of experience and hundreds of successful home sales, André Bohall brings deep expertise, tireless dedication, and a personal touch to every real estate journey. As the founder of OnSite Real Estate Group, André leads with service and strategy — combining strong market knowledge with sharp negotiating skills and genuine care for his clients’ needs.",
      "André is a natural when it comes to sales. His background includes years of high-volume outbound prospecting, phone sales, and client conversion — skills that now translate into powerful results for his buyers and sellers. He understands how to create opportunities where others see roadblocks, and his team is known for going above and beyond to generate business through grit, consistency, and intentional action.",
      "Whether guiding first-time sellers, upsizing families, or downsizing retirees, André is known for his clear communication, no-pressure guidance, and ability to simplify even the most complex transactions. His clients trust him not just for his results — but for his integrity and straight answers.",
    ],
    knowsAbout: ["Real estate", "Home selling", "Home buying", "Real estate negotiation"],
  },
  {
    slug: "cindie-bohall",
    name: "Cindie Bohall",
    role: "Agent & Advisor",
    photo:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eff7c928cd6f5d561b2667_thumbnail_20241213_110755.jpg",
    phone: "2537990609",
    phoneDisplay: "(253) 799-0609",
    phoneE164: "+1-253-799-0609",
    email: "cindie@onsiteregroup.com",
    objectPosition: "object-top",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=61570807923008&sk=followers",
      instagram: "https://www.instagram.com/onsiterealestategroup/",
      youtube: "https://www.youtube.com/@OnSiteRealEstateGroup",
      tiktok: "https://www.tiktok.com/@onsiteregroup",
    },
    bioShort:
      "For over 20 years, Cindie Bohall has been a trusted guide for families navigating complex decisions, bringing compassion and deep care to every transaction.",
    bioParagraphs: [
      "For over 20 years, Cindie Bohall has been a trusted guide for families navigating complex decisions. As the founder of a successful senior housing referral company since 2013, she has helped hundreds of families find safe, supportive environments for their loved ones.",
      "Today, Cindie brings that same compassion, attention to detail, and advocacy to her work at OnSite Real Estate Group. Whether helping a family transition from their longtime home or supporting first-time buyers, she understands the emotional weight behind every move. Her clients love her calm, confident approach and her ability to make the complex feel manageable.",
      "Cindie’s passion lies in building trust and helping people feel cared for — especially during life’s major transitions. Her background in senior care gives her unique insight when working with older adults, retirees, or families coordinating multi-generational moves.",
    ],
    knowsAbout: ["Real estate", "Senior housing transitions", "Downsizing", "First-time home buying"],
  },
];

export function getTeamProfile(slug: string) {
  return TEAM_PROFILES.find((m) => m.slug === slug);
}
