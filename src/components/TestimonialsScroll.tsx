"use client";

import Link from "next/link";

const testimonials = [
  {
    name: "David R.",
    location: "Pierce County",
    quote: "Onsite did a great job with selling our house. Our house was on the market 4 times and felt like it wouldn't sell until Andre came and got the job done. Handled the stress of moving & selling with ease & was a pleasure to work with.",
  },
  {
    name: "Paul B.",
    location: "Pierce County",
    quote: "Andre did an outstanding job of selling our home in Eatonville Washington. He was very professional. I had to leave the area but he handled all the details very well and worked with the buyer to get all requirements completed.",
  },
  {
    name: "Jason P.",
    location: "Pierce County",
    quote: "I had the pleasure of working with Onsite for selling & closing on my house and couldn't be more impressed with their exceptional service. They are attentive & showed great care in every aspect of the transaction and made the sale for us!",
  },
  {
    name: "Laura R.",
    location: "Pierce County",
    quote: "Onsite and Andre have been so patient and willing to go above and beyond in getting my house sold! I interviewed a number of potential agents to represent me during this process and Andre stood out from the crowd.",
  },
  {
    name: "April J.",
    location: "Pierce County",
    quote: "Andre is a fantastic advocate and negotiator on behalf of his clients. His ability to find ways to reach their goals is outstanding and everyone would be fortunate to have him representing them in achieving their goals!",
  },
  {
    name: "Larry A.",
    location: "Pierce County",
    quote: "Onsite Real Estate did a fantastic job of selling our home! I would highly recommend them for your next real estate sale or purchase. Highly motivated professionals who get the job done. Thank you Onsite!",
  },
];

const track = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsScroll() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-12 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">Success Stories</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-charcoal leading-[1.08]">
            What our clients <span className="italic">are saying.</span>
          </h2>
        </div>
        <Link
          href="/success-stories"
          className="hidden sm:inline-flex shrink-0 items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
        >
          More Stories
        </Link>
      </div>

      <div className="relative flex gap-5">
        {[0, 1].map((copy) => (
          <div key={copy} className="animate-marquee-slow flex shrink-0 gap-5">
            {track.map((t, i) => (
              <div
                key={`${copy}-${i}`}
                className="w-[340px] sm:w-[400px] shrink-0 rounded-3xl border border-charcoal/[0.07] bg-warm-gray/40 p-7 shadow-[0_14px_40px_rgba(0,0,0,0.05)]"
              >
                <p className="font-serif text-[1.08rem] leading-8 text-charcoal not-italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-charcoal/25" />
                  <div>
                    <p className="text-[13px] font-semibold text-charcoal">{t.name}</p>
                    <p className="text-[11px] text-charcoal/60 uppercase tracking-[0.2em]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 sm:hidden px-6">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-3 border border-charcoal/20 text-charcoal px-8 py-3.5 text-[12px] uppercase tracking-[0.25em] rounded-full hover:bg-charcoal hover:text-white transition-all duration-500"
        >
          More Stories
        </Link>
      </div>
    </section>
  );
}
