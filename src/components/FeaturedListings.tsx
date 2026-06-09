"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import type { OnsiteListing } from "@/lib/onsite-listings";

type ApiResponse = {
  listings?: OnsiteListing[];
};

export default function FeaturedListings() {
  const [listings, setListings] = useState<OnsiteListing[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(
        "/api/listings/ours?status=A&pageSize=6&page=1&sortBy=updatedOnDesc&state=WA"
      );
      if (!res.ok) return;
      const data = (await res.json()) as ApiResponse;
      const rows = data.listings ?? [];
      if (!cancelled) setListings(rows.slice(0, 3));
    }

    load().catch(() => {
      if (!cancelled) setListings([]);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (listings.length === 0) return null;

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
            Our Listings
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-tight">
            Timber Real Estate &amp; André Bohall
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-charcoal/75">
            Active homes listed by our team and André Bohall — each card is labeled by brokerage and agent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <motion.div
              key={listing.mlsNumber}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              <ListingCard listing={listing} sourceLabel={listing.sourceLabel} />
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
          <Link
            href="/our-listings"
            className="group inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500"
          >
            View All Our Listings
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
