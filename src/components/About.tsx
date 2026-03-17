"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-32 bg-warm-gray overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          {/* André & Cindie together */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_24px_90px_rgba(0,0,0,0.16)]">
                <Image
                  src="/cindieandandre.png"
                  alt="André and Cindie Bohall — OnSite Real Estate Group"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-charcoal/10 -z-10 hidden lg:block" />
            </motion.div>
          </motion.div>

          {/* Their story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 lg:col-start-7 relative"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-6">
              Meet André & Cindie Bohall
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-[1.1] mb-8">
              Rooted in the Northwest,
              <br />
              Built on Family,{" "}
              <span className="italic">Fueled by Service.</span>
            </h2>
            <div className="space-y-5 text-[15px] leading-relaxed text-charcoal/70">
              <p>
                We&apos;re a husband-and-wife team with a passion for people and
                a heart for home. Both born and raised in the Pacific Northwest,
                our paths came together at the end of 2020 — bringing together a
                beautifully blended family of five energetic kids and a shared
                drive to help families navigate one of life&apos;s biggest
                decisions.
              </p>
              <p>
                André brings over a decade of hands-on experience, sharp
                negotiation skills, and a technical edge that gets results. His
                clients trust him for his clear communication, no-pressure
                guidance, and ability to create opportunities where others see
                roadblocks. He thrives in high-stakes situations and always keeps
                the end goal in sight: a win for his client.
              </p>
              <p>
                Cindie brings 20+ years of guiding families through complex
                decisions. Her background in senior housing gives her a unique
                compassion and patience — whether helping a family transition
                from their longtime home or supporting first-time buyers through
                the emotional weight of every move. Her clients love her calm,
                confident approach.
              </p>
            </div>

            {/* Contact details */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div>
                <p className="text-[13px] font-medium text-charcoal">
                  André Bohall
                </p>
                <a
                  href="tel:253-441-9764"
                  className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors mt-1 block"
                >
                  (253) 441-9764
                </a>
              </div>
              <div>
                <p className="text-[13px] font-medium text-charcoal">
                  Cindie Bohall
                </p>
                <a
                  href="tel:253-799-0609"
                  className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors mt-1 block"
                >
                  (253) 799-0609
                </a>
              </div>
            </div>

            <Link
              href="/about-us"
              className="group inline-flex items-center gap-3 mt-10 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500"
            >
              Our Full Story
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
      </div>
    </section>
  );
}
