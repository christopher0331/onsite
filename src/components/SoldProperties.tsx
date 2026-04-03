"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MLSCardAttribution from "@/components/MLSCardAttribution";

const properties = [
  {
    title: "Single-Story Home in Gem Heights, Puyallup",
    price: "$591,000",
    href: "/sold-homes/single-story-home-in-gem-heights-puyallup",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a96b499447cc30f637df_1.jpg",
  },
  {
    title: "Modern Home in Sumner Valley",
    price: "$710,000",
    href: "/sold-homes/modern-home-in-sumner-valley",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e6a5a683921a019c3e4f3b_1.jpg",
  },
  {
    title: "Modern Home in Thriving Sumner Valley",
    price: "$750,000",
    href: "/sold-homes/modern-home-in-thriving-sumner-valley",
    image:
      "https://cdn.prod.website-files.com/67d9e1a205bd4e3c72c4cae0/67e5f1f692b6e8f42f5bf2a0_1.jpg",
  },
];

export default function SoldProperties() {
  return (
    <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
              Past Transactions
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-tight">
              Over 300+ <span className="italic">Sold</span>
            </h2>
          </div>
          <Link
            href="/sold-homes"
            className="group inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500 self-start shrink-0"
          >
            View All
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={property.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className={i === 1 ? "md:-mt-8" : ""}
            >
              <div className="overflow-hidden rounded-3xl shadow-[0_22px_70px_rgba(0,0,0,0.18)]">
                <Link href={property.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-charcoal/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 font-medium rounded-full">
                        Sold
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 px-1">
                    <h3 className="font-serif text-xl lg:text-[1.35rem] text-charcoal font-normal leading-snug group-hover:translate-x-1 transition-transform duration-300">
                      {property.title}
                    </h3>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.15em] text-mid-gray font-medium">
                      {property.price}
                    </p>
                  </div>
                </Link>
                <div className="px-1 pb-2 pt-3">
                  <MLSCardAttribution />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
