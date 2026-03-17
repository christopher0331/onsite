"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VIDEO_MP4 =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-transcode.mp4";
const VIDEO_WEBM =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-transcode.webm";
const POSTER =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-poster-00001.jpg";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_MP4} type="video/mp4" />
          <source src={VIDEO_WEBM} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] sm:text-[13px] uppercase tracking-[0.35em] text-white/80 mb-6"
        >
          Pierce County&apos;s Premier Real Estate Team
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-white font-light max-w-5xl"
        >
          Top Rated Real Estate
          <br />
          <span className="italic font-light">Agents</span> in Pierce County
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-[15px] sm:text-base text-white/80 max-w-xl leading-relaxed"
        >
          Sell your home with confidence. Trusted Real Estate Agents serving
          Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & Beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12"
        >
          <a
            href="https://onsiteregroup.idxbroker.com/idx/map/mapsearch"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-white/50 text-white px-10 py-4 text-[13px] uppercase tracking-[0.25em] hover:bg-white hover:text-charcoal transition-all duration-500"
          >
            Search Homes
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
