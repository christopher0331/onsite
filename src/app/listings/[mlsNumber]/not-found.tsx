import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ListingNotFound() {
  return (
    <>
      <Header />
      <main className="w-full max-w-full overflow-x-hidden bg-white pt-28 pb-20 text-center sm:pt-40">
        <h1 className="font-serif text-2xl font-light text-charcoal">Listing not found.</h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-charcoal/70">
          This listing is no longer available. Browse East Pierce homes for sale, or look up
          another listing by MLS number.
        </p>
        <Link
          href="/listings"
          className="mt-6 inline-block text-[12px] uppercase tracking-[0.25em] text-charcoal/75 hover:text-charcoal"
        >
          ← Back to Listings
        </Link>
      </main>
      <Footer />
    </>
  );
}
