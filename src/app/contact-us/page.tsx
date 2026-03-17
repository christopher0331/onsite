"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const contactMethods = [
  {
    label: "André Bohall",
    phone: "253-441-9764",
    phoneHref: "tel:253-441-9764",
    email: "andre@onsiteregroup.com",
    emailHref: "mailto:andre@onsiteregroup.com",
  },
  {
    label: "Cindie Bohall",
    phone: "253-799-0609",
    phoneHref: "tel:253-799-0609",
    email: "cindie@onsiteregroup.com",
    emailHref: "mailto:cindie@onsiteregroup.com",
  },
];

type FormState = "idle" | "success" | "error";

export default function ContactUsPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [topic, setTopic] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder — wire to real endpoint when ready
    setFormState("success");
  }

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative h-[52vh] min-h-[400px] overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e5857f0b4e310919f9eda8_contact.webp"
            alt="Contact OnSite Real Estate Group"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/52" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-12 flex items-end pb-16 sm:pb-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-4">Get In Touch</p>
              <h1 className="font-serif text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.02] text-white font-light max-w-3xl">
                Let&apos;s Talk <span className="italic">Solutions.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Contact block */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Left — info */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-mid-gray mb-4">Contact Us</p>
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-light text-charcoal leading-[1.08] mb-5">
                  Have questions or ready <br className="hidden sm:block" />
                  to get <span className="italic">started?</span>
                </h2>
                <p className="text-[16px] leading-8 text-charcoal/70">
                  Reach out to our team for expert guidance and personalized support — let&apos;s make your real estate goals a reality.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                {contactMethods.map((person) => (
                  <div
                    key={person.label}
                    className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/50 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-mid-gray mb-3">{person.label}</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={person.phoneHref}
                        className="flex items-center gap-3 text-[15px] text-charcoal hover:text-charcoal/60 transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        {person.phone}
                      </a>
                      <a
                        href={person.emailHref}
                        className="flex items-center gap-3 text-[15px] text-charcoal hover:text-charcoal/60 transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        {person.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office / Map */}
              <div className="rounded-3xl border border-charcoal/[0.08] bg-warm-gray/50 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.3em] text-mid-gray mb-3">Find Us</p>
                <a
                  href="https://www.google.com/maps/dir//3920+W+Tapps+Dr+E,+Lake+Tapps,+WA+98391"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[15px] text-charcoal hover:text-charcoal/60 transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  3920 W Tapps Dr E, Lake Tapps, WA 98391
                </a>
              </div>
            </div>

            {/* Right — form */}
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
                      We&apos;ve received your information and will be reaching out to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-mid-gray mb-2">Let us know how we can help</p>

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
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">I&apos;m interested in</label>
                      <div className="relative">
                        <select
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          required
                          className="w-full appearance-none bg-white border border-charcoal/[0.12] rounded-full px-5 py-3.5 text-[15px] text-charcoal focus:outline-none focus:border-charcoal/40 transition-colors"
                        >
                          <option value="" disabled>Select Option...</option>
                          <option value="buying">Buying a Home</option>
                          <option value="selling">Selling a Home</option>
                          <option value="evaluation">Home Evaluation</option>
                          <option value="general">General Questions</option>
                        </select>
                        <svg className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] uppercase tracking-[0.2em] text-charcoal/50">Message</label>
                      <textarea
                        rows={4}
                        className="bg-white border border-charcoal/[0.12] rounded-2xl px-5 py-3.5 text-[15px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors resize-none"
                        placeholder="Tell us a little about what you're looking for..."
                      />
                    </div>

                    {formState === "error" && (
                      <p className="text-[13px] text-red-500">Something went wrong. Please try again.</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-charcoal text-white py-4 rounded-full text-[12px] uppercase tracking-[0.25em] hover:bg-charcoal/80 transition-all duration-500"
                    >
                      Send Message
                    </button>
                  </form>
                )}
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
