import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import AiAssistant from "@/components/AiAssistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Real Estate Agents Lake Tapps | Onsite ReGroup",
  description:
    "Top rated real estate agents in Pierce County. Sell your home with confidence. Trusted agents serving Lake Tapps, Bonney Lake, Sumner, Buckley, Graham, Puyallup & Beyond.",
  openGraph: {
    title: "Real Estate Agents Lake Tapps | Onsite ReGroup",
    description:
      "Top rated real estate agents in Pierce County. Sell your home with confidence.",
    url: "https://www.onsiteregroup.com",
    siteName: "OnSite ReGroup",
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
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} antialiased overflow-x-clip`}>
        {children}
        <AiAssistant />
      </body>
    </html>
  );
}
