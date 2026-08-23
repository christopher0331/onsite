"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavDropdown from "@/components/NavDropdown";
import ServiceAreasNav from "@/components/ServiceAreasNav";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_TEL } from "@/lib/nap";
import { trackPhoneCall } from "@/lib/analytics";

// Routes that display NWMLS / IDX listing data — header must stay solid so
// the brokerage logo remains visible over white listing cards & photos.
const SOLID_HEADER_ROUTES = [
  "/listings",
  "/our-listings",
  "/featured-homes",
  "/sold-homes",
];

const mainNav = [
  { label: "Sell Home", href: "/sell-your-home" },
  { label: "Buy Home", href: "/buy-home" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const ourListingsHref = "/our-listings";

const valuationNav = [
  { label: "Free Home Evaluation", href: "/free-home-evaluation" },
  { label: "Online Valuation Tool", href: "/home-evaluation-tool" },
];

const TBC_URL = "https://tappsbusinessconnect.com";

const sellingProcessLinks = [
  { label: "Our Selling Process", href: "/selling-process" },
  { label: "Preparation & Staging", href: "/preparation-and-staging" },
  { label: "Marketing Strategy", href: "/real-estate-marketing" },
  { label: "Negotiation & Closing", href: "/negotiation-closing" },
  { label: "Trends & Insights", href: "/trends-insights" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Sellers Guide", href: "/sellers-guide" },
  { label: "Business Connect", href: TBC_URL },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const forceSolid = SOLID_HEADER_ROUTES.some((p) => pathname?.startsWith(p));
  const solid = forceSolid || scrolled;
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] w-full max-w-full overflow-visible transition-all duration-500 ${
          solid
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-visible sm:h-20 lg:flex lg:h-24">
            <Link href="/" className="relative z-10 block min-w-0">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/68dc8d33f60130dc306e6c8e_Timber.png"
                alt="OnSite ReGroup"
                width={320}
                height={80}
                priority={isHome}
                className={`h-9 w-auto max-w-full object-contain object-left sm:h-11 lg:h-28 transition-all duration-500 ${
                  solid ? "brightness-0" : "brightness-0 invert"
                }`}
              />
            </Link>

            <nav className="hidden lg:flex flex-1 flex-nowrap items-center justify-evenly ml-6 min-w-0 overflow-visible">
              {mainNav.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 whitespace-nowrap text-[15px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 hover:opacity-60 ${
                    solid ? "text-charcoal" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={ourListingsHref}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-[13px] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                  pathname?.startsWith(ourListingsHref)
                    ? solid
                      ? "bg-charcoal text-white"
                      : "bg-white text-charcoal"
                    : solid
                      ? "bg-charcoal text-white hover:bg-charcoal/90"
                      : "bg-white text-charcoal hover:bg-white/90"
                }`}
              >
                Our Listings
              </Link>
              <NavDropdown
                label="Valuation"
                items={valuationNav}
                solid={solid}
                isActive={(p) =>
                  p.startsWith("/free-home-evaluation") ||
                  p.startsWith("/home-evaluation-tool")
                }
              />
              <ServiceAreasNav solid={solid} />
              {mainNav.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 whitespace-nowrap text-[15px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 hover:opacity-60 ${
                    solid ? "text-charcoal" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={TBC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[13px] uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:opacity-80 ${
                  solid
                    ? "border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                TBC
              </a>
              <a
                href={PHONE_HREF}
                onClick={() => trackPhoneCall(PHONE_TEL)}
                className={`shrink-0 whitespace-nowrap text-[15px] font-medium tracking-[0.06em] transition-colors duration-300 hover:opacity-60 ${
                  solid ? "text-charcoal" : "text-white"
                }`}
              >
                {PHONE_DISPLAY}
              </a>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              className={`relative z-10 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 justify-self-end transition-colors lg:hidden ${
                mobileOpen
                  ? "text-white"
                  : solid
                    ? "text-charcoal"
                    : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[1.5px] w-6 origin-center bg-current transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[7.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-6 bg-current transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[1.5px] w-6 origin-center bg-current transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[7.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[90] animate-[fade-in_0.35s_ease-out] bg-charcoal sm:top-20">
          <nav className="flex h-full flex-col items-center justify-start gap-6 overflow-y-auto px-6 pb-10 pt-8 animate-[slide-up_0.35s_ease-out]">
            {mainNav.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ourListingsHref}
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white/50 bg-white px-8 py-3 font-serif text-2xl text-charcoal transition-colors hover:bg-white/90"
            >
              Our Listings
            </Link>
            <NavDropdown
              label="Valuation"
              items={valuationNav}
              solid={solid}
              variant="mobile"
              isActive={(p) =>
                p.startsWith("/free-home-evaluation") ||
                p.startsWith("/home-evaluation-tool")
              }
              onNavigate={() => setMobileOpen(false)}
            />
            <ServiceAreasNav
              solid={solid}
              variant="mobile"
              onNavigate={() => setMobileOpen(false)}
            />
            {mainNav.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={TBC_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-[12px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/70 transition-colors"
            >
              Tapps Business Connect
            </a>
            <div className="w-12 h-px bg-white/20 my-2" />
            {sellingProcessLinks.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4">
              <a
                href={PHONE_HREF}
                onClick={() => trackPhoneCall(PHONE_TEL)}
                className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white/80 transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
