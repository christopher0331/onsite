import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Terms of Service | OnSite Real Estate Group",
  description:
    "Terms of Service for OnSite Real Estate Group. Please read these terms carefully before using our website.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the OnSite Real Estate Group website (the \"Site\"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the Site.",
  },
  {
    title: "IDX Listing Data",
    body: "Listing data displayed on this Site is provided by the Northwest Multiple Listing Service (NWMLS) as distributed by MLS Grid. IDX information is provided exclusively for consumers' personal, noncommercial use. It may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. The data is deemed reliable but is not guaranteed by MLS GRID, and the use of the MLS GRID Data may be subject to an end user license agreement prescribed by the Member Participant's applicable MLS, if any, and as amended from time to time.",
  },
  {
    title: "No Unlawful or Prohibited Use",
    body: "As a condition of your use of the Site, you warrant that you will not use the Site for any purpose that is unlawful or prohibited by these Terms of Service. You may not use the Site in any manner that could damage, disable, overburden, or impair the Site or interfere with any other party's use of the Site.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this Site — including text, graphics, logos, photographs, and software — is the property of OnSite Real Estate Group or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this Site without express written permission.",
  },
  {
    title: "Accuracy of Information",
    body: "While we strive to keep the information on this Site accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Any reliance you place on such information is strictly at your own risk.",
  },
  {
    title: "Third-Party Links",
    body: "This Site may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
  },
  {
    title: "Privacy",
    body: "Your use of the Site is also governed by our Privacy Policy. By using the Site, you consent to the collection and use of information as described in our Privacy Policy.",
  },
  {
    title: "Disclaimer of Warranties",
    body: "The Site is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
  },
  {
    title: "Limitation of Liability",
    body: "In no event shall OnSite Real Estate Group, its agents, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or the information contained herein.",
  },
  {
    title: "Governing Law",
    body: "These Terms of Service shall be governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Pierce County, Washington.",
  },
  {
    title: "Changes to These Terms",
    body: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site following the posting of changes constitutes your acceptance of the revised terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#1a1a18] pt-40 pb-24 sm:pt-52 sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">Legal</p>
            <h1 className="mb-6 max-w-3xl font-serif text-[clamp(2.8rem,7vw,5rem)] font-light leading-[1.0] text-white">
              Terms of Service.
            </h1>
            <p className="max-w-xl text-[15px] leading-7 text-white/60">
              Please read these terms carefully before using our website.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">

            <p className="mb-16 text-[15px] leading-8 text-charcoal/55">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <div className="space-y-12">
              {sections.map((section, i) => (
                <div key={section.title} className="border-b border-charcoal/8 pb-12 last:border-0">
                  <div className="flex items-start gap-6">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1a18] font-serif text-[0.75rem] font-light text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="mb-4 font-serif text-[1.3rem] font-light text-charcoal">
                        {section.title}
                      </h2>
                      <p className="text-[15px] leading-[1.9] text-charcoal/65">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact block */}
            <div className="mt-16 rounded-3xl bg-[#f2ede6] p-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">Contact</p>
              <h2 className="mb-6 font-serif text-[1.4rem] font-light text-charcoal">
                Questions about these terms?
              </h2>
              <p className="mb-6 text-[15px] leading-7 text-charcoal/65">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <dl className="space-y-3">
                {[
                  { label: "Brokerage", value: "Onsite Real Estate Group" },
                  { label: "Address", value: "3920 W Tapps Dr E, Lake Tapps, WA 98391" },
                  { label: "Email", value: "Andre@OnsiteRegroup.com" },
                  { label: "Phone", value: "253-441-9764" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                    <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-charcoal/45">{label}</dt>
                    <dd className="font-serif text-[1rem] font-light text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1a1a18] py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-white/50">Ready to Get Started?</p>
                <h2 className="font-serif text-[1.6rem] font-light text-white">Find Your Next Home.</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/buy-home"
                  className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-charcoal transition-all duration-500 hover:bg-white/90"
                >
                  Buy a Home
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full border border-white/35 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white/10"
                >
                  Contact Us
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
