"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BC_LOGO, categories } from "@/lib/business-connect-data";

export default function BusinessConnect() {
  return (
    <section className="bg-[#1a1a18] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <Image
                src={BC_LOGO}
                alt="Tapps Business Connect"
                width={160}
                height={80}
                className="object-contain invert mix-blend-screen"
              />
            </div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Lake Tapps · Bonney Lake · Puyallup
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] text-white">
              Local Businesses.<br />Real Relationships.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6 lg:items-end"
          >
            <p className="text-[16px] leading-8 text-white/60 lg:text-right">
              Tapps Business Connect is a high-standard professional networking group serving East Pierce County — trusted referrals, no fees, no fluff.
            </p>
            <Link
              href="/business-connect"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10 hover:border-white/50"
            >
              Learn More
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <Link
                href={`/${cat.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
              >
                <div>
                  <p className="mb-4 text-2xl">{cat.icon}</p>
                  <h3 className="mb-3 font-serif text-[1.2rem] font-light leading-snug text-white">
                    {cat.name}
                  </h3>
                  <p className="text-[14px] leading-7 text-white/45">{cat.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 group-hover:text-white/70">
                  Browse Members
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
