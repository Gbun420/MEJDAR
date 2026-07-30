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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-crisp-0a25e3.netlify.app";

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
    "restaurant management",
    "table booking",
  ],
  authors: [{ name: "MEJDAR Ltd" }],
  creator: "MEJDAR",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MEJDAR",
    title: "MEJDAR — Your restaurant. Your customers. Your ordering channel.",
    description:
      "Restaurants get their own branded ordering, reservation and analytics system. No commissions. Local support. Built in Malta.",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "MEJDAR — Hospitality Systems",
    description:
      "Restaurants get their own branded ordering, reservation and analytics system. No commissions. Local support. Built in Malta.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MEJDAR",
    description:
      "MEJDAR gives restaurants their own branded ordering, reservation and analytics system with local support and predictable monthly pricing.",
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Harbour Street",
      addressLocality: "Valletta",
      addressCountry: "MT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@mejdar.com",
      telephone: "+356-2123-4567",
      contactType: "sales",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MEJDAR Hospitality Systems",
    description:
      "Branded online ordering, reservation management and restaurant analytics platform for independent hospitality businesses.",
    provider: {
      "@type": "Organization",
      name: "MEJDAR",
    },
    areaServed: {
      "@type": "Country",
      name: "Malta",
    },
    serviceType: "Restaurant Technology Platform",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
