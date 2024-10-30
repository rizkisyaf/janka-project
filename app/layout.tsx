// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WalletProviderClient from "../components/WalletProviderClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Janka - Real-World Hedging Event Platform",
  description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
  openGraph: {
    title: "Janka - Real-World Hedging Event Platform",
    description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
    images: [
      {
        url: "https://janka-project.vercel.app/banner.png",
        width: 1200,
        height: 630,
        alt: "Janka Banner",
        type: "image/png",
      },
    ],
    siteName: "Janka",
    locale: "en_US",
    type: "website",
    url: "https://janka-project.vercel.app",
  },
  twitter: {
    title: "Janka - Real-World Hedging Event Platform",
    card: "summary_large_image",
    description: "Janka enables users to hedge against real-world, uninsurable events with transparency, precision, and oracle-verified data.",
    images: ["https://janka-project.vercel.app/banner.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProviderClient>{children}</WalletProviderClient>
      </body>
    </html>
  );
}
