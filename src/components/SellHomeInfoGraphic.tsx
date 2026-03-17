"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { num: "01", title: "Define Your Goals",       summary: "Set your timeline, financial expectations & ideal outcome. We help you clarify objectives so every decision from here moves you forward." },
  { num: "02", title: "Choose an Expert",         summary: "Partner with a local East Pierce County specialist who's sold 300+ homes and $100M+ in real estate. The right agent changes everything." },
  { num: "03", title: "Get Market-Ready",         summary: "Strategic repairs, professional staging & curb appeal that make buyers stop scrolling and start calling." },
  { num: "04", title: "Price to Win",             summary: "Data-driven pricing anchored in real comps and current demand. Attract multiple offers without leaving money on the table." },
  { num: "05", title: "High-Impact Marketing",    summary: "Professional photography, cinematic video, 3D tours & targeted digital campaigns that put your home in front of serious buyers." },
  { num: "06", title: "Negotiate Like a Pro",     summary: "We review every offer, counter strategically, and secure the best price, terms & seller-friendly conditions." },
  { num: "07", title: "Close with Confidence",    summary: "Inspections, appraisals, final paperwork — we stay ahead of every deadline so you hand over the keys stress-free." },
];

export default function SellHomeInfoGraphic() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-0">
      {/* Left — step selector */}
      <div className="relative">
        {/* vertical progress line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-charcoal/10" />
        <motion.div
          className="absolute left-0 w-px bg-charcoal origin-top"
          initial={false}
          animate={{
            top: `${(active / steps.length) * 100}%`,
            height: `${(1 / steps.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 40 }}
        />

        {steps.map((step, i) => (
          <button
            key={step.num}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative flex w-full items-start gap-5 py-5 pl-8 text-left transition-all duration-500 ${
              active === i ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className={`font-serif text-[2.2rem] font-light leading-none transition-all duration-500 ${
                active === i ? "text-charcoal" : "text-charcoal/40"
              }`}
            >
              {step.num}
            </span>
            <span
              className={`pt-2 font-serif text-[1.15rem] font-light leading-snug transition-all duration-500 ${
                active === i ? "text-charcoal" : "text-charcoal/50"
              }`}
            >
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Right — active step detail */}
      <div className="relative flex items-center lg:border-l lg:border-charcoal/10 lg:pl-16">
        {/* giant background number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`bg-${active}`}
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 top-1/2 select-none font-serif text-[clamp(12rem,22vw,20rem)] font-light leading-none text-charcoal/[0.04]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: "-50%" }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {steps[active].num}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="relative z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-charcoal/35">
              Step {steps[active].num} of 07
            </p>
            <h3 className="mb-5 font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] text-charcoal">
              {steps[active].title}
            </h3>
            <p className="max-w-lg text-[16px] leading-8 text-charcoal/65 not-italic">
              {steps[active].summary}
            </p>

            {/* step navigation */}
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/50 transition-all duration-300 hover:border-charcoal/40 hover:text-charcoal disabled:opacity-20 disabled:hover:border-charcoal/15 disabled:hover:text-charcoal/50"
                aria-label="Previous step"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/50 transition-all duration-300 hover:border-charcoal/40 hover:text-charcoal disabled:opacity-20 disabled:hover:border-charcoal/15 disabled:hover:text-charcoal/50"
                aria-label="Next step"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* progress dots */}
              <div className="ml-2 flex gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === i
                        ? "w-6 bg-charcoal"
                        : "w-1.5 bg-charcoal/15 hover:bg-charcoal/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
