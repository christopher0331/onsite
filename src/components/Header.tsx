"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavDropdown from "@/components/NavDropdown";
import ServiceAreasNav from "@/components/ServiceAreasNav";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 xl:px-12">
          <div className="flex h-16 w-full items-center overflow-hidden sm:h-20 lg:h-24">
            <Link href="/" className="relative z-10 shrink-0">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/68dc8d33f60130dc306e6c8e_Timber.png"
                alt="OnSite ReGroup"
                width={320}
                height={80}
                priority
                className={`h-10 w-auto sm:h-14 lg:h-28 transition-all duration-500 ${
                  solid ? "brightness-0" : "brightness-0 invert"
                }`}
              />
            </Link>

            <nav className="hidden lg:flex flex-1 flex-nowrap items-center justify-evenly ml-6">
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
                href="tel:253-441-9764"
                className={`shrink-0 whitespace-nowrap text-[15px] font-medium tracking-[0.06em] transition-colors duration-300 hover:opacity-60 ${
                  solid ? "text-charcoal" : "text-white"
                }`}
              >
                (253) 441-9764
              </a>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative z-10 ml-auto w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                mobileOpen
                  ? "text-white"
                  : solid
                    ? "text-charcoal"
                    : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-[1.5px] bg-current origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[1.5px] bg-current"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-[1.5px] bg-current origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-charcoal sm:top-20"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-start gap-6 overflow-y-auto px-6 pb-10 pt-8"
            >
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
                  href="tel:253-441-9764"
                  className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white/80 transition-colors"
                >
                  (253) 441-9764
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
