"use client";

import { useState } from "react";

type ShareListingCardProps = {
  mlsNumber: string;
  street: string;
  cityLine: string;
  priceLabel: string;
};

export default function ShareListingCard({ mlsNumber, street, cityLine, priceLabel }: ShareListingCardProps) {
  const [copied, setCopied] = useState(false);

  const listingUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/listings/${mlsNumber}`
      : `/listings/${mlsNumber}`;
  const qrSrc = `/api/listings/${encodeURIComponent(mlsNumber)}/qr?size=480`;
  const qrDownloadHref = `/api/listings/${encodeURIComponent(mlsNumber)}/qr?size=1200`;

  const shareText = `${street}${cityLine ? `, ${cityLine}` : ""} — ${priceLabel}`;
  const smsHref = `sms:?&body=${encodeURIComponent(`${shareText}\n${listingUrl}`)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(street || "Listing from OnSite")}&body=${encodeURIComponent(
    `${shareText}\n\n${listingUrl}`
  )}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(listingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — no-op.
    }
  }

  return (
    <div className="rounded-3xl border border-charcoal/10 bg-[#f9f7f4] p-7">
      <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-mid-gray">Share This Listing</p>
      <div className="flex items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt={`QR code linking to the listing at ${street}`}
          width={104}
          height={104}
          className="h-[104px] w-[104px] shrink-0 rounded-xl border border-charcoal/10 bg-white p-1.5"
        />
        <p className="text-[12px] leading-relaxed text-charcoal/80">
          Scan to pull this listing up on any phone — perfect for yard signs, flyers, and open houses.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <a
          href={qrDownloadHref}
          download={`${mlsNumber}-qr.png`}
          className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal/5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download QR
        </a>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal/5"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy Link
            </>
          )}
        </button>
        <a
          href={smsHref}
          className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal/5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          Text
        </a>
        <a
          href={mailHref}
          className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal/5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email
        </a>
      </div>
    </div>
  );
}
