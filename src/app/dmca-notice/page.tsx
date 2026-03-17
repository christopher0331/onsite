import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "DMCA Notice | OnSite Real Estate Group",
  description:
    "Digital Millennium Copyright Act (DMCA) notice and copyright infringement reporting information for OnSite Real Estate Group.",
};

const requirements = [
  "A physical or electronic signature of the copyright owner or person authorized to act on their behalf",
  "Identification of the copyrighted work claimed to have been infringed",
  "Identification of the material that is claimed to be infringing and where it is located on the website",
  "Your contact information, including your address, telephone number, and email",
  "A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law",
  "A statement that the information in the notification is accurate and, under penalty of perjury, you are authorized to act on behalf of the copyright owner",
];

export default function DmcaNoticePage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Legal</p>
            <h1 className="mb-6 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5rem)] font-light leading-[1.0] text-white">
              DMCA Notice.
            </h1>
            <p className="max-w-xl text-[15px] leading-7 text-white/60">
              Digital Millennium Copyright Act — Copyright Infringement Notification Policy
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">

            {/* Intro */}
            <div className="mb-16">
              <p className="text-[16px] leading-8 text-charcoal/70 not-italic">
                Onsite Real Estate respects the intellectual property rights of others and expects you to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;), Onsite Real Estate will respond expeditiously to claims of copyright infringement committed using this website if such claims are reported to our Designated Copyright Agent.
              </p>
              <p className="mt-5 text-[16px] leading-8 text-charcoal/70 not-italic">
                If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our Copyright Agent as set forth in the DMCA.
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-16 rounded-3xl bg-[#f2ede6] p-10">
              <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Required Information</p>
              <h2 className="mb-8 font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light text-charcoal">
                For your complaint to be valid under the DMCA, it must include the following information:
              </h2>
              <ol className="space-y-5">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1a18] font-serif text-[0.8rem] font-light text-white">
                      {i + 1}
                    </span>
                    <p className="text-[15px] leading-7 text-charcoal/70 not-italic">{req}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact */}
            <div className="mb-16">
              <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Send Your Notice To</p>
              <h2 className="mb-8 font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light text-charcoal">
                Designated Copyright Agent
              </h2>
              <div className="rounded-3xl border border-charcoal/8 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                <dl className="space-y-5">
                  {[
                    { label: "Agent", value: "Copyright Agent — Onsite Real Estate" },
                    { label: "Address", value: "3920 W Tapps Dr E, Lake Tapps, WA 98391" },
                    { label: "Email", value: "Andre@OnsiteRegroup.com" },
                    { label: "Phone", value: "253-441-9764" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1 border-b border-charcoal/8 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8">
                      <dt className="w-20 shrink-0 text-[11px] uppercase tracking-[0.2em] text-charcoal/45">{label}</dt>
                      <dd className="font-serif text-[1rem] font-light text-charcoal">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-3xl bg-[#1a1a18] p-8">
              <p className="text-[14px] leading-7 text-white/70 not-italic">
                Please note that you may be liable for damages (including costs and attorney&apos;s fees) if you materially misrepresent that content on the website is infringing your copyrights. Accordingly, if you are not sure whether certain material infringes your copyrights, we suggest that you first contact an attorney.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f2ede6] py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Questions?</p>
                <h2 className="font-serif text-[1.6rem] font-light text-charcoal">Get in Touch.</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-charcoal px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-charcoal/85"
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-charcoal/20 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white"
                >
                  Return Home
                </Link>
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
