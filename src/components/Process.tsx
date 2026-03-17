"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Marketing & Strategy",
    description:
      "We personally craft a marketing plan for your home — professional photography, digital campaigns, and targeted outreach to the right buyers.",
    href: "/real-estate-marketing",
  },
  {
    number: "02",
    title: "Staging & Preparation",
    description:
      "We walk through your home with fresh eyes, handle staging, and take care of the details so buyers fall in love the moment they walk in.",
    href: "/preparation-and-staging",
  },
  {
    number: "03",
    title: "Negotiation & Closing",
    description:
      "André goes to bat for you at the table — leveraging data and experience to get you the best price and smoothest close possible.",
    href: "/negotiation-closing",
  },
];

export default function Process() {
  return (
    <section className="relative py-20 sm:py-32 bg-charcoal overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-4">
            Our Process
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white leading-[1.1]">
              Sell <span className="italic">Fast</span> &middot; Sell{" "}
              <span className="italic">Smart</span> &middot; Sell{" "}
              <span className="italic">Confidently</span>
            </h2>
            <Link
              href="/selling-process"
              className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-white hover:text-charcoal transition-all duration-500 self-start lg:self-auto shrink-0"
            >
              View Process
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
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <Link href={step.href} className="group block">
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] px-7 py-10 lg:px-8 lg:py-12 shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:bg-white/[0.05]">
                  <span className="block font-serif text-4xl lg:text-5xl font-light text-white/25 mb-5">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-[1.75rem] text-white font-light mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/65 max-w-sm">
                    {step.description}
                  </p>
                  <div className="mt-6 w-0 group-hover:w-10 h-px bg-white/60 transition-all duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
