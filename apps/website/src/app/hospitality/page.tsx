import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Hospitality Products",
  description:
    "MEJDAR is building a complete hospitality technology suite. Explore what's coming next.",
};

export default function HospitalityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Hospitality Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            MEJDAR is building a complete hospitality technology suite. Here&apos;s
            what&apos;s available today and what&apos;s coming next.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Available now */}
            <div className="rounded-lg border-2 border-mejdar-teal bg-white p-8">
              <span className="inline-block rounded-full bg-mejdar-teal/10 px-3 py-1 text-xs font-semibold text-mejdar-teal">
                Available now
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Restaurant Ordering
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Online ordering, delivery, collection, menu management,
                payments, coupons and more.
              </p>
              <Link
                href="/ordering"
                className="mt-4 inline-block text-sm font-semibold text-mejdar-teal hover:underline"
              >
                Learn more &rarr;
              </Link>
            </div>

            <div className="rounded-lg border-2 border-mejdar-teal bg-white p-8">
              <span className="inline-block rounded-full bg-mejdar-teal/10 px-3 py-1 text-xs font-semibold text-mejdar-teal">
                Available now
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Reservations
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Online bookings, table management, deposits, waitlists and
                automated confirmations.
              </p>
              <Link
                href="/reservations"
                className="mt-4 inline-block text-sm font-semibold text-mejdar-teal hover:underline"
              >
                Learn more &rarr;
              </Link>
            </div>

            <div className="rounded-lg border-2 border-mejdar-teal bg-white p-8">
              <span className="inline-block rounded-full bg-mejdar-teal/10 px-3 py-1 text-xs font-semibold text-mejdar-teal">
                Available now
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Analytics
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Revenue tracking, sales reports, peak hours, customer insights
                and CSV exports.
              </p>
              <Link
                href="/analytics"
                className="mt-4 inline-block text-sm font-semibold text-mejdar-teal hover:underline"
              >
                Learn more &rarr;
              </Link>
            </div>

            {/* Coming soon */}
            <div className="rounded-lg border border-mejdar-gray-light bg-mejdar-offwhite p-8">
              <span className="inline-block rounded-full bg-mejdar-olive/10 px-3 py-1 text-xs font-semibold text-mejdar-olive">
                Coming soon
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Table Management
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Interactive floor plans, table status tracking, server
                assignments and real-time availability.
              </p>
            </div>

            <div className="rounded-lg border border-mejdar-gray-light bg-mejdar-offwhite p-8">
              <span className="inline-block rounded-full bg-mejdar-olive/10 px-3 py-1 text-xs font-semibold text-mejdar-olive">
                Coming soon
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Loyalty Programme
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Points-based loyalty, customer rewards, referral programmes
                and engagement tracking.
              </p>
            </div>

            <div className="rounded-lg border border-mejdar-gray-light bg-mejdar-offwhite p-8">
              <span className="inline-block rounded-full bg-mejdar-olive/10 px-3 py-1 text-xs font-semibold text-mejdar-olive">
                Coming soon
              </span>
              <h2 className="mt-4 text-xl font-bold text-mejdar-navy">
                Staff Management
              </h2>
              <p className="mt-2 text-sm text-mejdar-gray">
                Scheduling, time tracking, role management and payroll
                integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mejdar-teal py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Want early access?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Get in touch to be among the first to try upcoming features.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-mejdar-navy px-6 py-3 text-base font-semibold text-white transition hover:bg-mejdar-navy-light"
          >
            {brand.primaryCta}
          </Link>
        </div>
      </section>
    </>
  );
}
