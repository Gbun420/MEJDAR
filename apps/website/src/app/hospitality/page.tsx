import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Hospitality Products",
  description:
    "MEJDAR is building a complete hospitality technology suite. Explore what is available today and what is coming next.",
};

const products = [
  {
    status: "available",
    title: "Restaurant Ordering",
    description:
      "Online ordering, delivery, collection, menu management, payments, coupons and more.",
    href: "/ordering",
  },
  {
    status: "available",
    title: "Reservations",
    description:
      "Online bookings, table management, deposits, waitlists and automated confirmations.",
    href: "/reservations",
  },
  {
    status: "available",
    title: "Analytics",
    description:
      "Revenue tracking, sales reports, peak hours, customer insights and CSV exports.",
    href: "/analytics",
  },
  {
    status: "coming-soon",
    title: "Table Management",
    description:
      "Interactive floor plans, table status tracking, server assignments and real-time availability.",
  },
  {
    status: "coming-soon",
    title: "Loyalty Programme",
    description:
      "Points-based loyalty, customer rewards, referral programmes and engagement tracking.",
  },
  {
    status: "coming-soon",
    title: "Staff Management",
    description:
      "Scheduling, time tracking, role management and payroll integration.",
  },
];

export default function HospitalityPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Hospitality Products
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            A complete hospitality technology suite
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Here is what is available today and what is coming next.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <AnimateInView key={product.title} delay={i * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-xl border p-6 ${
                    product.status === "available"
                      ? "border-mejdar-navy/5 bg-white shadow-sm"
                      : "border-mejdar-navy/5 bg-mejdar-limestone/40"
                  }`}
                >
                  <span
                    className={`mb-3 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.status === "available"
                        ? "bg-mejdar-teal/10 text-mejdar-teal"
                        : "bg-mejdar-gray/10 text-mejdar-gray"
                    }`}
                  >
                    {product.status === "available"
                      ? "Available now"
                      : "Coming soon"}
                  </span>
                  <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                    {product.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-mejdar-gray">
                    {product.description}
                  </p>
                  {product.href && (
                    <Link
                      href={product.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mejdar-teal hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold">
            Want early access?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Get in touch to be among the first to try upcoming features.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-mejdar-navy px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-mejdar-navy-light"
          >
            {brand.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
