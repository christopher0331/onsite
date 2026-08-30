"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nap";

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/[0.08] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="font-serif text-[1.05rem] text-charcoal leading-snug group-hover:text-charcoal/80 transition-colors">
          {q}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full border border-charcoal/15 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <svg className="w-3 h-3 text-charcoal/65" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[15px] leading-8 text-charcoal/90 pr-10 font-[450]">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[52vh] min-h-[400px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eabcf64bec959a970ca1ae_faq.webp"
            alt="Frequently Asked Questions"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="hero-overlay" aria-hidden />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex items-end pb-16 sm:pb-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-4">FAQ</p>
              <h1 className="font-serif text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.02] text-white font-light max-w-3xl">
                Frequently Asked <span>Questions.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Intro + Tabular FAQ */}
        <section className="bg-[#f2ede6] pt-20 sm:pt-28 pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Intro row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <p className="text-[16px] leading-8 text-charcoal/85 max-w-xl">
                Buying or selling a home comes with questions — we have the answers. Explore our FAQs for expert insights and guidance on every step of the process.
              </p>
              <Link
                href="/contact-us"
                className="shrink-0 inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Let&apos;s Talk
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

              {/* Left — category tabs */}
              <div className="lg:col-span-3 lg:sticky lg:top-28">
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
                  {FAQ_CATEGORIES.map((cat, i) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(i)}
                      className={`shrink-0 text-left px-6 py-4 rounded-2xl transition-all duration-300 ${
                        activeCategory === i
                          ? "bg-charcoal text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                          : "bg-white/70 text-charcoal/75 hover:text-charcoal hover:bg-white"
                      }`}
                    >
                      <span className="block font-serif text-[1.3rem] font-light normal-case tracking-normal mb-0.5 leading-none">
                        {cat.label}
                      </span>
                      <span className="text-[10px] opacity-60">{cat.faqs.length} questions</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — accordion */}
              <div className="lg:col-span-9">
                <div className="rounded-3xl bg-white px-6 sm:px-8 py-2 shadow-[0_14px_50px_rgba(0,0,0,0.07)]">
                  {FAQ_CATEGORIES[activeCategory].faqs.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="relative h-[48vh] min-h-[340px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg"
                alt="Ready to get started"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="hero-overlay" aria-hidden />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-4">Ready to get started?</p>
                <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.05]">
                  Let&apos;s Talk <span>Home Selling Solutions</span>
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
                  >
                    Contact Us
                  </Link>
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
