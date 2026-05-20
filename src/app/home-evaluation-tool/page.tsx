import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import EvaluationToolIframe from "@/components/EvaluationToolIframe";

const toolUrl =
  process.env.NEXT_PUBLIC_HOME_EVALUATION_TOOL_URL ||
  "https://lead-valuator.replit.app";

export const metadata: Metadata = {
  title: "Home Evaluation Tool | OnSite Real Estate Group",
  description:
    "Use OnSite ReGroup's home evaluation tool to start your property valuation.",
};

export default function HomeEvaluationToolPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="bg-[#1a1a18] pt-40 pb-16 sm:pt-52 sm:pb-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/80">
              Home Evaluation
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.8rem)] font-light leading-[1.0] text-white">
              Home Evaluation Tool.
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] leading-8 text-white/90">
              Answer a few quick questions and get a clear starting point for
              your home&apos;s current market value.
            </p>
          </div>
        </section>

        <section className="bg-[#f2ede6] py-10 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-[0_18px_70px_rgba(0,0,0,0.10)]">
              {toolUrl ? (
                <EvaluationToolIframe src={toolUrl} />
              ) : (
                <div className="grid min-h-[520px] place-items-center px-6 text-center">
                  <div className="max-w-xl">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-mid-gray">
                      Tool Not Configured
                    </p>
                    <h2 className="font-serif text-3xl font-light text-charcoal">
                      Add the valuation app URL to enable this page.
                    </h2>
                    <p className="mt-5 text-[15px] leading-7 text-charcoal/85">
                      Set{" "}
                      <code className="rounded bg-charcoal/5 px-2 py-1 text-[13px]">
                        NEXT_PUBLIC_HOME_EVALUATION_TOOL_URL
                      </code>{" "}
                      to the deployed Replit app URL.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
