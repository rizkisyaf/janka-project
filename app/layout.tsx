// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WalletProviderClient from "../components/WalletProviderClient";
import FeedbackWidget from '@/components/FeedbackWidget'
import { criticalCSS } from '@/app/utils/criticalCSS'
import StylesheetLoader from '@/components/StylesheetLoader'
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Janka - Real-World Hedging Event Platform",
  description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
  openGraph: {
    title: "Janka - Real-World Hedging Event Platform",
    description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
    images: [
      {
        url: "https://janka.vercel.app/banner.png",
        width: 1200,
        height: 630,
        alt: "Janka Banner",
        type: "image/png",
      },
    ],
    siteName: "Janka",
    locale: "en_US",
    type: "website",
    url: "https://janka.vercel.app",
  },
  twitter: {
    title: "Janka - Real-World Hedging Event Platform",
    card: "summary_large_image",
    description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
    images: ["https://janka.vercel.app/banner.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preload" href="./fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="./fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <StylesheetLoader />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProviderClient>{children}</WalletProviderClient>
        <FeedbackWidget />
        <Analytics />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a3fa0cb2-912b-4624-9b7f-40267de34b7f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
