import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MEJDAR — Hospitality Systems",
    template: "%s | MEJDAR",
  },
  description:
    "MEJDAR gives restaurants their own branded ordering, reservation and analytics system with local support and predictable monthly pricing. Built in Malta for independent hospitality businesses.",
  keywords: [
    "restaurant ordering",
    "online ordering",
    "reservations",
    "Malta",
    "restaurant technology",
    "delivery",
    "takeaway",
    "hospitality systems",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MEJDAR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
