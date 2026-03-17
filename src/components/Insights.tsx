"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    category: "Insights",
    title:
      "Pierce County Septic Systems: What Homebuyers and Sellers Must Know",
    href: "/blog/pierce-county-septic-systems-what-homebuyers-and-sellers-must-know-in-todays-market",
    isNew: true,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d464755ef4e3bfca4663f1_Home%20Selling%20Process%20-%20Onsite%20Real%20Estate.webp",
  },
  {
    category: "Selling Tips",
    title:
      "What Home Inspectors Really Look For in Western Washington Before You List",
    href: "/blog/what-home-inspectors-really-look-for-in-western-washington-before-you-list",
    isNew: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d58fbf39b868e7ca14f23b_Sell%20your%20home%20-%20Preparation%20%26%20Staging.webp",
  },
  {
    category: "Selling Tips",
    title: "Prep Your Pierce County Home for a Successful Sale",
    href: "/blog/prep-your-pierce-county-home-for-a-successful-sale",
    isNew: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d998be8fb03b888543ffdb_Staging%20Home%20For%20Home%20Selling.webp",
  },
  {
    category: "Market Trends",
    title:
      "Pierce County Housing Market: What Stability Really Looks Like After the Frenzy",
    href: "/blog/pierce-county-housing-market-what-stability-really-looks-like-after-the-frenzy",
    isNew: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d852185ef9446fcb38c607_We%20walk%20you%20through%20Selling%20Your%20Home.webp",
  },
  {
    category: "Market Trends",
    title:
      "Pierce County Homeowners: Don't Get Stuck by Incomplete Real Estate Info",
    href: "/blog/pierce-county-homeowners-dont-get-stuck",
    isNew: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d8a053774a91c6a64dfd86_Secure%20The%20Best%20Terms.webp",
  },
];

export default function Insights() {
  return (
    <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
              Insights
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-tight">
              Market Trends & <span className="italic">Insights</span>
            </h2>
          </div>
          <Link
            href="/trends-insights"
            className="group inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500 self-start shrink-0"
          >
            View All
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <Link
              href={articles[0].href}
              className="group block rounded-3xl bg-warm-gray/55 p-4 lg:p-5 shadow-[0_22px_70px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 rounded-2xl">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-mid-gray font-medium">
                  {articles[0].category}
                </span>
                {articles[0].isNew && (
                  <span className="text-[9px] uppercase tracking-[0.2em] bg-charcoal text-white px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-charcoal font-light leading-snug group-hover:translate-x-1 transition-transform duration-300">
                {articles[0].title}
              </h3>
            </Link>
          </motion.div>

          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i + 1) * 0.1 }}
              className={i % 2 === 1 ? "lg:-mt-4" : ""}
            >
              <Link
                href={article.href}
                className="group block rounded-3xl bg-warm-gray/45 p-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-4 rounded-2xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-mid-gray font-medium">
                  {article.category}
                </span>
                <h3 className="mt-2 font-serif text-lg text-charcoal font-normal leading-snug group-hover:translate-x-1 transition-transform duration-300">
                  {article.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
