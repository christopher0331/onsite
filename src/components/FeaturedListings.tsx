"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const listings = [
  {
    title: "Dream Home with Pickleball Court",
    price: "$720,000",
    href: "/featured-homes/entertainers-dream-home-with-pickleball-court-on-1-2-acre",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe8304415e6b356d95497_1.jpg",
  },
  {
    title: "Luxury Rambler on 15 Acres with Rainier Views",
    price: "$1,495,000",
    href: "/featured-homes/luxury-rambler-on-15-acres-with-rainier-views",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fe409428a57e5320586a0_1.jpg",
  },
  {
    title: "Charming Downtown Puyallup Home",
    price: "$575,000",
    href: "/featured-homes/charming-downtown-puyallup-home",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/680fd1f96247b67248995d1d_1.png",
  },
];

export default function FeaturedListings() {
  return (
    <section className="relative py-20 sm:py-32 bg-warm-gray overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
            On the Market
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-tight">
            Featured Home <span className="italic">Listings</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:row-span-2"
          >
            <Link href={listings[0].href} className="group block h-full">
              <div className="relative h-full min-h-[400px] lg:min-h-0 overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                <Image
                  src={listings[0].image}
                  alt={listings[0].title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-12">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                    Featured
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mt-2 leading-snug">
                    {listings[0].title}
                  </h3>
                  <p className="text-lg text-white/90 font-light mt-3 font-serif">
                    {listings[0].price}
                  </p>
                  <div className="mt-4 w-0 group-hover:w-12 h-px bg-white transition-all duration-500" />
                </div>
              </div>
            </Link>
          </motion.div>

          {listings.slice(1).map((listing, i) => (
            <motion.div
              key={listing.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i + 1) * 0.12 }}
            >
              <Link href={listing.href} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                      Featured
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl text-white font-light mt-1 leading-snug">
                      {listing.title}
                    </h3>
                    <p className="text-base text-white/90 font-light mt-2 font-serif">
                      {listing.price}
                    </p>
                    <div className="mt-3 w-0 group-hover:w-10 h-px bg-white transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="https://www.onsiteregroup.net/search"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500"
          >
            Search All Properties
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
