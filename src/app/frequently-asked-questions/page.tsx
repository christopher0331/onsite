"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const categories = [
  {
    label: "Selling",
    faqs: [
      {
        q: "How Long Does It Take to Sell My Home?",
        a: "The time it takes to sell your home varies, but on average, you can expect the process to take about two months. This includes 14–21 days on the market before receiving an offer and an additional 30 days for the buyer's financing to finalize.",
      },
      {
        q: "How Did My Friend's Home Sell in 2 Weeks?",
        a: "While it's possible for a home to sell quickly, it's not the norm. Quick sales often occur when buyers pay in cash or use specialty financing. For most transactions, the process takes longer, but proper pricing and preparation will still get you a successful sale.",
      },
      {
        q: "How Much Does It Cost to Sell My Home?",
        a: "Typically, you can expect to pay 8–10% of the sales price in closing costs, which includes agent commissions, state excise tax, and title & escrow fees. Some additional costs may arise from repairs, upgrades, or seller concessions.",
      },
      {
        q: "Who Is Involved in the Sale of My Home?",
        a: "Seller's Agent / Brokerage, Buyer's Agent / Brokerage, Escrow Office, Title Office, Lender, Appraiser, Inspector, and County Government.",
      },
      {
        q: "How Do I Get My Home Ready to Sell?",
        a: "To make your home appealing to buyers, remove personal items, clear clutter, and clean key areas like the kitchen and bathrooms. We'll guide you on the most impactful updates, such as neutral paint or landscaping, and advise on eliminating any odors that might deter buyers.",
      },
      {
        q: "What Are the Benefits of Selling and Buying Simultaneously?",
        a: "Selling your current home while searching for a new one can offer flexibility in timing, help you negotiate better purchase terms, and reduce the stress of a rushed home search. You may even be able to negotiate a \u201crent-back\u201d agreement to stay in your home longer while completing your new home purchase.",
      },
      {
        q: "Should I Fix Up My Home or Sell As-Is?",
        a: "We offer personalized advice to help you decide whether to make repairs or sell your home in its current condition. Key improvements like fresh paint or updated flooring often yield the best return on investment, but we'll provide an estimate based on your home's specific needs.",
      },
      {
        q: "How Do I Know If My Home Is Priced Correctly?",
        a: "Your home's pricing should be based on market conditions, comparable sales, and current demand. Our team will provide you with a comprehensive market analysis to ensure you list at the optimal price.",
      },
      {
        q: "Do I Need to Be Out of My Home by Closing Day?",
        a: "Technically, you have until 9:00 PM on closing day to move out. However, if you can move out earlier, it's appreciated. In some cases, you may negotiate a rent-back agreement with the buyer.",
      },
      {
        q: "When Do I Get Paid From My Sale?",
        a: "After closing, you'll receive your proceeds within one business day via wire transfer, or the funds will be available for pickup at the escrow office or sent by overnight mail.",
      },
    ],
  },
  {
    label: "Buying",
    faqs: [
      {
        q: "What Are the Common Costs When Buying a Home?",
        a: "In addition to your down payment, buyers can expect costs such as earnest money, home inspections, appraisals, and closing costs, which typically amount to around 3% of the purchase price.",
      },
      {
        q: "What Is Earnest Money?",
        a: "Earnest money is a deposit made to the seller to show your commitment to buying the property. This money is held in escrow and applied to your down payment or closing costs upon closing.",
      },
      {
        q: "What Are Contingencies?",
        a: "Contingencies are conditions that must be met for a real estate transaction to proceed. They are in place to protect either the buyer or seller's interests throughout the transaction.",
      },
      {
        q: "What Is Escrow?",
        a: "Escrow is a neutral third party that holds funds and documents related to the sale, ensuring all conditions of the contract are met before the transaction is finalized.",
      },
      {
        q: "What Is Title Insurance?",
        a: "Title insurance protects you from potential property issues like liens or ownership disputes. It ensures your right to occupy, sell, or use the property without interference from past claims.",
      },
      {
        q: "What Happens During the Inspection Process?",
        a: "The inspection generally takes a few hours, and you're not required to be present. The buyer's agent will be there, and if any issues arise, the buyer may ask for repairs. You and the buyer will negotiate and agree on how to handle any repairs.",
      },
      {
        q: "What Is an Appraisal?",
        a: "An appraisal is an assessment conducted by a third-party appraiser to ensure the property's purchase price aligns with its market value for the lender's investment purposes.",
      },
      {
        q: "When Do I Sign the Paperwork to Transfer Ownership?",
        a: "Once your loan documents are sent to escrow, they will schedule a time for you to sign the closing documents, typically at the escrow office or with a mobile notary.",
      },
      {
        q: "What Are Closing Costs?",
        a: "Closing costs usually amount to 8–10% of the sale price, including agent commissions, taxes, title fees, and other associated costs. We'll provide a detailed breakdown based on your specific transaction.",
      },
      {
        q: "How Do I Get Started With Buying or Selling a Home?",
        a: "Getting started is easy! The first step is to schedule a consultation with our team. We'll take the time to understand your goals, preferences, and timeline — whether you're buying or selling, we'll walk you through every step. Contact us today to begin your real estate journey.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/[0.08] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="font-serif text-[1.05rem] text-charcoal leading-snug group-hover:text-charcoal/60 transition-colors">
          {q}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full border border-charcoal/15 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <svg className="w-3 h-3 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[15px] leading-8 text-charcoal/70 pr-10 font-[450]">
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
          <div className="absolute inset-0 bg-black/52" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex items-end pb-16 sm:pb-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-4">FAQ</p>
              <h1 className="font-serif text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.02] text-white font-light max-w-3xl">
                Frequently Asked <span className="italic">Questions.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Intro + Tabular FAQ */}
        <section className="bg-[#f2ede6] pt-20 sm:pt-28 pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

            {/* Intro row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <p className="text-[16px] leading-8 text-charcoal/65 max-w-xl">
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
                  {categories.map((cat, i) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(i)}
                      className={`shrink-0 text-left px-6 py-4 rounded-2xl transition-all duration-300 ${
                        activeCategory === i
                          ? "bg-charcoal text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                          : "bg-white/70 text-charcoal/50 hover:text-charcoal hover:bg-white"
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
                  {categories[activeCategory].faqs.map((item) => (
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
              <div className="absolute inset-0 bg-black/52" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/75 mb-4">Ready to get started?</p>
                <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.05]">
                  Let&apos;s Talk <span className="italic">Home Selling Solutions</span>
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-white text-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/90 transition-all duration-500"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="tel:253-441-9764"
                    className="inline-flex items-center justify-center border border-white/35 text-white px-10 py-4 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-white/10 transition-all duration-500"
                  >
                    (253) 441-9764
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
