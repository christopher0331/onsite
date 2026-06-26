"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";

const VIDEO_MP4 =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-transcode.mp4";
const VIDEO_WEBM =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-transcode.webm";
const POSTER =
  "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67b64a09871910cd858654e8_Onsite%20Regroup%20Video-poster-00001.jpg";

export default function Hero({ showIdxLink = true }: { showIdxLink?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mountVideo = () => setVideoReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mountVideo, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(mountVideo, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full max-w-full overflow-x-hidden lg:h-[72vh] lg:min-h-[560px] lg:max-h-[860px]"
    >
      <div className="absolute inset-0">
        {videoReady ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={POSTER}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_MP4} type="video/mp4" />
            <source src={VIDEO_WEBM} type="video/webm" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSTER}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="hero-overlay-video" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start gap-6 px-4 pb-10 pt-24 text-center sm:gap-8 sm:px-6 sm:pb-14 sm:pt-28 lg:h-full lg:min-h-0 lg:justify-center lg:gap-10 lg:px-6 lg:pb-12 lg:pt-32 xl:pt-36">
        <p className="animate-[fade-up_0.8s_ease-out_0.2s_both] text-[10px] uppercase tracking-[0.28em] text-white/80 sm:text-[13px] sm:tracking-[0.35em]">
          Pierce County&apos;s Premier Real Estate Team
        </p>

        <h1 className="animate-[fade-up_1s_ease-out_0.35s_both] max-w-5xl font-serif text-[clamp(2rem,8.5vw,6rem)] leading-[0.98] text-white sm:leading-[0.95]">
          Top Rated Real Estate
          <br />
          Agents in Pierce County
        </h1>

        <p className="animate-[fade-up_0.8s_ease-out_0.5s_both] max-w-xl text-[14px] leading-relaxed text-white/80 sm:text-base">
          Sell your home with confidence. Trusted Real Estate Agents serving
          Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & Beyond.
        </p>

        <div className="relative z-20 flex w-full max-w-2xl animate-[fade-up_0.8s_ease-out_0.65s_both] justify-center">
          <HeroSearch />
        </div>

        <div className="relative z-10 flex w-full max-w-md animate-[fade-up_0.8s_ease-out_0.8s_both] flex-col gap-3.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link
            href="/our-listings"
            className="group inline-flex w-full items-center justify-center gap-2.5 bg-white px-6 py-3.5 text-[12px] uppercase tracking-[0.22em] text-charcoal transition-all duration-500 hover:bg-white/90 sm:w-auto sm:gap-3 sm:px-10 sm:py-4 sm:text-[13px] sm:tracking-[0.25em]"
          >
            Our Listings
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
          {showIdxLink && (
            <Link
              href="/listings"
              className="group inline-flex w-full items-center justify-center gap-2.5 border border-white/50 px-6 py-3.5 text-[12px] uppercase tracking-[0.22em] text-white transition-all duration-500 hover:bg-white hover:text-charcoal sm:w-auto sm:gap-3 sm:px-10 sm:py-4 sm:text-[13px] sm:tracking-[0.25em]"
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
            </Link>
          )}
        </div>

        <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="h-16 w-px animate-[pulse-line_2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
