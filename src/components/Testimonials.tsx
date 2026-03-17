"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const testimonials = [
  {
    name: "David R.",
    location: "Pierce County",
    quote:
      "Onsite did a great job with selling our house. Our house was on the market 4 times and felt like house wouldn't sell until Andre came and got the job done. Handled the stress of moving & selling with ease & was a pleasure to work with.",
  },
  {
    name: "Paul B.",
    location: "Pierce County",
    quote:
      "Andre did an outstanding job of selling our home in Eatonville Washington. He was very professional. I had to leave the area but he handled all the details very well and worked with the buyer to get all requirements completed.",
  },
  {
    name: "Jason P.",
    location: "Pierce County",
    quote:
      "I had the pleasure of working with Onsite for selling & closing on my house and couldn't be more impressed with their exceptional service. They are attentive & showed great care in every aspect of the transaction and made the sale for us!",
  },
  {
    name: "Laura R.",
    location: "Pierce County",
    quote:
      "Onsite and Andre have been so patient and willing to go above and beyond in getting my house sold! I interviewed a number of potential agents to represent me during this process and Andre stood out from the crowd.",
  },
  {
    name: "April J.",
    location: "Pierce County",
    quote:
      "Andre is a fantastic advocate and negotiator on behalf of his clients, his ability to find ways to reach their goals is outstanding and everyone would be fortunate to have him representing them in achieving their goals!",
  },
  {
    name: "Larry A.",
    location: "Pierce County",
    quote:
      "Onsite Real Estate did a fantastic job of selling our home! I would highly recommend them for your next real estate sale or purchase of a home. Highly motivated professionals who get the job done. Thank you Onsite!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">
              Success Stories
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal leading-[1.1]">
              Delivering Real
              <br />
              Results for Over
              <br />
              <span className="italic">a Decade</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-charcoal/60 max-w-sm">
              Selling a home is a big decision, and choosing the right real
              estate team makes all the difference.
            </p>
            <Link
              href="/success-stories"
              className="group inline-flex items-center gap-3 mt-8 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal hover:text-white transition-all duration-500"
            >
              View All Stories
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

          {/* Right: testimonial carousel */}
          <div className="lg:col-span-7 lg:col-start-6 relative min-h-[300px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 font-serif text-[120px] lg:text-[180px] text-charcoal/[0.04] leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <blockquote className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] text-charcoal font-light leading-relaxed italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-10 h-px bg-charcoal/30" />
                  <div>
                    <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal">
                      {testimonials[current].name}
                    </p>
                    <p className="text-[12px] text-mid-gray tracking-wide">
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="flex gap-2 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[2px] transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-charcoal"
                      : "w-5 bg-charcoal/15 hover:bg-charcoal/30"
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
