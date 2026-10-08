"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavDropdown from "@/components/NavDropdown";
import ServiceAreasNav from "@/components/ServiceAreasNav";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_TEL, SITE_BRAND } from "@/lib/nap";
import { trackPhoneCall } from "@/lib/analytics";

// Routes that display NWMLS / IDX listing data — header must stay solid so
// the brokerage logo remains visible over white listing cards & photos.
const SOLID_HEADER_ROUTES = [
  "/listings",
  "/our-listings",
  "/featured-homes",
  "/sold-homes",
];

const ourListingsHref = "/our-listings";
const evaluationHref = "/free-home-evaluation";
const TBC_URL = "https://tappsbusinessconnect.com";

const buySellNav = [
  { label: "Buy Home", href: "/buy-home" },
  { label: "Sell Home", href: "/sell-your-home" },
  { label: "Free Home Evaluation", href: evaluationHref },
  { label: "Online Valuation Tool", href: "/home-evaluation-tool" },
];

const listingsNav = [
  { label: "Our Listings", href: ourListingsHref },
  { label: "Open Houses", href: "/open-houses" },
];

const moreNav = [
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
  { label: "Tapps Business Connect", href: TBC_URL, external: true },
];

const sellingProcessLinks = [
  { label: "Our Selling Process", href: "/selling-process" },
  { label: "Preparation & Staging", href: "/preparation-and-staging" },
  { label: "Marketing Strategy", href: "/real-estate-marketing" },
  { label: "Negotiation & Closing", href: "/negotiation-closing" },
];

const buySellActive = (path: string) =>
  path.startsWith("/buy-home") ||
  path.startsWith("/sell-your-home") ||
  path.startsWith(evaluationHref) ||
  path.startsWith("/home-evaluation-tool");

const listingsActive = (path: string) =>
  path.startsWith(ourListingsHref) || path.startsWith("/open-houses");

const moreActive = (path: string) =>
  path.startsWith("/about-us") || path.startsWith("/contact-us");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const tone = solid ? "text-charcoal" : "text-white";
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] w-full max-w-full overflow-visible transition-all duration-500 ${
          mobileOpen
            ? "bg-charcoal"
            : solid
              ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-visible sm:h-20 lg:flex lg:h-24 lg:gap-5">
            <Link href="/" className="relative z-10 block min-w-0 shrink">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/68dc8d33f60130dc306e6c8e_Timber.png"
                alt={SITE_BRAND}
                width={496}
                height={251}
                sizes="(min-width: 1536px) 220px, (min-width: 1280px) 168px, 144px"
                priority={isHome}
                className={`h-9 w-auto max-w-full object-contain object-left transition-all duration-500 sm:h-11 lg:h-20 2xl:h-[5.25rem] ${
                  mobileOpen || !solid ? "brightness-0 invert" : "brightness-0"
                }`}
              />
            </Link>

            <nav
              className="ml-auto hidden shrink-0 flex-nowrap items-center justify-end gap-x-3 overflow-visible lg:flex xl:gap-x-5 2xl:gap-x-7"
              aria-label="Primary"
            >
              <NavDropdown
                label="Buy & Sell"
                items={buySellNav}
                solid={solid}
                isActive={buySellActive}
              />
              <NavDropdown
                label="Our Listings"
                items={listingsNav}
                solid={solid}
                isActive={listingsActive}
              />
              <ServiceAreasNav solid={solid} />
              <NavDropdown
                label="More"
                items={moreNav}
                solid={solid}
                align="end"
                isActive={moreActive}
              />
              <Link
                href={evaluationHref}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 xl:px-4 xl:text-[12px] xl:tracking-[0.14em] 2xl:px-5 2xl:text-[13px] ${
                  solid
                    ? "bg-charcoal text-white hover:bg-charcoal/90 focus-visible:outline-charcoal"
                    : "bg-white text-charcoal hover:bg-white/90 focus-visible:outline-white"
                }`}
              >
                Free Home Evaluation
              </Link>
              <a
                href={PHONE_HREF}
                onClick={() => trackPhoneCall(PHONE_TEL)}
                className={`shrink-0 whitespace-nowrap text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 xl:text-[14px] 2xl:text-[15px] ${tone} ${
                  solid ? "focus-visible:outline-charcoal" : "focus-visible:outline-white"
                }`}
              >
                {PHONE_DISPLAY}
              </a>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className={`relative z-10 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 justify-self-end transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden ${
                mobileOpen
                  ? "text-white focus-visible:outline-white"
                  : solid
                    ? "text-charcoal focus-visible:outline-charcoal"
                    : "text-white focus-visible:outline-white"
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
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="flex h-full flex-col items-center justify-start gap-6 overflow-y-auto px-6 pb-10 pt-8 animate-[slide-up_0.35s_ease-out]"
          >
            <NavDropdown
              label="Buy & Sell"
              items={buySellNav}
              solid={solid}
              variant="mobile"
              isActive={buySellActive}
              onNavigate={closeMobile}
            />
            <NavDropdown
              label="Our Listings"
              items={listingsNav}
              solid={solid}
              variant="mobile"
              isActive={listingsActive}
              onNavigate={closeMobile}
            />
            <ServiceAreasNav solid={solid} variant="mobile" onNavigate={closeMobile} />
            <NavDropdown
              label="More"
              items={moreNav}
              solid={solid}
              variant="mobile"
              isActive={moreActive}
              onNavigate={closeMobile}
            />
            <div className="my-2 h-px w-12 bg-white/20" />
            {sellingProcessLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={evaluationHref}
              onClick={closeMobile}
              className="mt-2 rounded-full bg-white px-8 py-3 font-serif text-2xl text-charcoal transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Free Home Evaluation
            </Link>
            <a
              href={PHONE_HREF}
              onClick={() => trackPhoneCall(PHONE_TEL)}
              className="text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
