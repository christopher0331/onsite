"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TestimonialsScroll from "@/components/TestimonialsScroll";

const valuationBenefits = [
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d62440ae483e2d92b6f261_Value.png",
    title: "Maximize Your Profit",
    description: "Understanding your home's value helps you set a price that attracts buyers while maximizing your return.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d6265fc13128f252b658b1_Sold.png",
    title: "Negotiate With Confidence",
    description: "Armed with data, you can confidently counter offers and justify your asking price.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d5a34f87c0e5be3a24f6d1_CONTRACTS.png",
    title: "Meet Lender & Appraisal Requirements",
    description: "Buyers' lenders rely on home valuations — knowing your number helps avoid surprises during closing.",
  },
  {
    icon: "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d626f2c13128f252b695ef_Love.png",
    title: "Plan Your Next Move",
    description: "Whether you're upgrading, downsizing, or relocating, knowing your home's value helps you plan ahead.",
  },
];

const pricingSteps = [
  {
    number: "01",
    title: "Market Insight",
    description: "We analyze current market trends to provide an accurate property value.",
  },
  {
    number: "02",
    title: "Neighborhood Analysis",
    description: "Local comps help determine your home's competitive price.",
  },
  {
    number: "03",
    title: "Property Assessment",
    description: "We inspect key home features to ensure every detail adds value.",
  },
  {
    number: "04",
    title: "Accurate Pricing",
    description: "Our evaluation helps you price your home for maximum return.",
  },
];

type FormState = "idle" | "success" | "error";

export default function FreeHomeEvaluationPage() {
  const [formState, setFormState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("success");
  }

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[72vh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e2e97d42118bdb98ba970f_Home%20Evaluation%20-%20Sell%20Your%20Home%20Today.webp"
            alt="Free Home Evaluation"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex flex-col justify-end pb-20 sm:pb-28">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">Home Evaluation</p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.0] text-white font-light max-w-4xl mb-6">
              Unlock Your Home&apos;s <span className="italic">Potential.</span>
            </h1>
            <p className="text-[16px] text-white/70 max-w-xl leading-8 mb-10">
              We uncover your property&apos;s true value and help you maximize your sale.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#evaluation-form"
                className="inline-flex items-center bg-white text-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
              >
                Get Free Evaluation
              </a>
              <a
                href="https://www.onsiteregroup.net/home_value"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-white/35 text-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
              >
                Check Home Value Online
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Home Evaluation</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                Proper evaluation <span className="italic">maximizes your sale.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[16px] leading-8 text-charcoal/70">
              <p>
                Get a precise home valuation backed by local market expertise and real-time data — so you can price with confidence and sell smarter.
              </p>
              <a
                href="#evaluation-form"
                className="inline-flex items-center gap-3 mt-2 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
              >
                Free Home Evaluation
              </a>
            </div>
          </div>
        </section>

        {/* Data-Driven Valuation — benefits */}
        <section className="py-20 sm:py-28 bg-[#f2ede6]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-5">Data-Driven Valuation</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
                  Get a valuation you can <span className="italic">actually act on.</span>
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Our expert valuation considers market trends, neighborhood data, and unique home features to give you a clear, competitive price estimate — helping you make informed decisions with confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {valuationBenefits.map((item) => (
                <div key={item.title} className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                  <Image
                    src={item.icon}
                    alt=""
                    width={46}
                    height={46}
                    className="w-11 h-11 object-contain mb-4 opacity-80"
                  />
                  <h3 className="font-serif text-xl text-charcoal mb-2">{item.title}</h3>
                  <p className="text-[14px] leading-7 text-charcoal/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Price — dark editorial */}
        <section className="py-20 sm:py-28 bg-[#1a1a18]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-5">Our Process</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08] mb-7">
                We help you set <span className="italic">the right price.</span>
              </h2>
              <p className="text-[16px] leading-8 text-white/55 mb-8">
                With our in-depth market analysis and expert insights, we provide an accurate home valuation tailored to your property. Know your home&apos;s worth before you sell or refinance for a competitive edge.
              </p>
              <a
                href="#evaluation-form"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white hover:text-charcoal transition-all duration-500"
              >
                Check Your Home Value
              </a>
            </div>
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.07]">
              {pricingSteps.map((step) => (
                <div key={step.number} className="grid grid-cols-[4rem_1fr] gap-6 py-8 group">
                  <span className="font-serif text-[2.8rem] leading-none font-light text-white/30 group-hover:text-white/50 transition-colors duration-500">
                    {step.number}
                  </span>
                  <div className="pt-1">
                    <p className="font-serif text-[1.3rem] font-light text-white/85 leading-snug mb-2">{step.title}</p>
                    <p className="text-[14px] leading-7 text-white/45">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evaluation Form */}
        <section id="evaluation-form" className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">Free Evaluation</p>
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-light text-charcoal leading-[1.08]">
                  Start Your Free <span className="italic">Home Evaluation.</span>
                </h2>
              </div>
              <p className="text-[16px] leading-8 text-charcoal/65">
                Fill out the form and our team will reach out with a comprehensive, data-backed valuation of your home — no obligation, no pressure.
              </p>
              <div className="rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-6 space-y-3 shadow-[0_14px_40px_rgba(0,0,0,0.05)]">
                <p className="text-[11px] uppercase tracking-[0.3em] text-mid-gray">Prefer to talk?</p>
                <a href="tel:253-441-9764" className="flex items-center gap-3 text-[15px] text-charcoal hover:text-charcoal/60 transition-colors">
                  <svg className="w-4 h-4 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  (253) 441-9764
                </a>
                <a href="mailto:andre@onsiteregroup.com" className="flex items-center gap-3 text-[15px] text-charcoal hover:text-charcoal/60 transition-colors">
                  <svg className="w-4 h-4 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  andre@onsiteregroup.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/40 p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-charcoal/[0.07] flex items-center justify-center">
                      <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-charcoal">Thank You!</h3>
                    <p className="text-[15px] text-charcoal/65 max-w-sm leading-7">
                      We&apos;ve received your information and will be reaching out shortly with your home valuation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-mid-gray mb-2">Your property details</p>

                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Property Address</label>
                      <input
                        type="text"
                        required
                        className="bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                        placeholder="123 Main St, Puyallup, WA"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">First Name</label>
                        <input
                          type="text"
                          required
                          className="bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                          placeholder="First"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Last Name</label>
                        <input
                          type="text"
                          required
                          className="bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                          placeholder="Last"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Email</label>
                      <input
                        type="email"
                        required
                        className="bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Phone</label>
                      <input
                        type="tel"
                        className="bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                        placeholder="(253) 000-0000"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Additional Notes</label>
                      <textarea
                        rows={3}
                        className="bg-white border border-charcoal/[0.12] rounded-2xl px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors resize-none"
                        placeholder="Bedrooms, bathrooms, recent updates, reason for selling..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-charcoal text-white py-4 rounded-full text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal/80 transition-all duration-500"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <TestimonialsScroll />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
