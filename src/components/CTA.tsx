"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="relative h-[62vh] min-h-[460px] max-h-[760px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
          <motion.div style={{ y }} className="absolute inset-[-10%]">
            <Image
              src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg"
              alt="Pierce County homes"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/52" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-6"
        >
          Ready to Get Started?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-white leading-[1.05]"
        >
          Let&apos;s <span className="italic">Talk</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-[15px] text-white/75 max-w-md leading-relaxed"
        >
          Your home selling journey starts with a conversation. Let us show you
          what&apos;s possible.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact-us"
            className="group inline-flex items-center justify-center gap-3 bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
          >
            Home Selling Solutions
          </Link>
          <a
            href="tel:253-441-9764"
            className="group inline-flex items-center justify-center gap-3 border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
          >
            Call (253) 441-9764
          </a>
        </motion.div>
      </div>
        </div>
      </div>
    </section>
  );
}
