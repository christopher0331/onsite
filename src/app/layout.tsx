import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import AiAssistantLazy from "@/components/AiAssistantLazy";
import PostHogScript from "@/components/PostHogScript";
import { OrganizationSchema } from "@/components/service-areas/SchemaLd";
import { SITE_BRAND } from "@/lib/nap";
import { getCanonicalBaseUrl } from "@/lib/site-url";

const GA_MEASUREMENT_ID = "G-70Q8F15W0D";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getCanonicalBaseUrl()),
  title: "Real Estate Agents Lake Tapps | Onsite ReGroup",
  description:
    "Top rated real estate agents in Pierce County. Sell your home with confidence. Trusted agents serving Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & Beyond.",
  openGraph: {
    title: "Real Estate Agents Lake Tapps | Onsite ReGroup",
    description:
      "Top rated real estate agents in Pierce County. Sell your home with confidence.",
    siteName: SITE_BRAND,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.variable} ${dmSans.variable} antialiased overflow-x-hidden`}>
        <OrganizationSchema />
        {children}
        <AiAssistantLazy />
        <PostHogScript />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
