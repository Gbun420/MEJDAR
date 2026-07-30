import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Let customers book tables online. Manage availability, deposits and waitlists from one dashboard.",
};

export default function ReservationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Reservations</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Let customers book tables online. Manage availability, deposits and
            waitlists from one dashboard.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-mejdar-navy">
                Fill every table
              </h2>
              <p className="mt-4 text-mejdar-gray">
                Our reservation system handles online bookings, table management,
                waitlists and deposits — so your front-of-house team can focus
                on guests, not phones.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Online booking from your website",
                  "Table and floor plan management",
                  "Deposit and pre-payment support",
                  "Waitlist and cancellation management",
                  "Automated confirmation emails",
                  "Calendar view for bookings",
                  "Multi-location support",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-mejdar-gray-dark">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-mejdar-limestone p-8">
              <h3 className="text-lg font-semibold text-mejdar-navy">
                Benefits
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">24/7 booking</p>
                    <p className="text-sm text-mejdar-gray">Customers can book anytime, even when you&apos;re closed.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">🔔</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">Instant notifications</p>
                    <p className="text-sm text-mejdar-gray">Get notified of new bookings, cancellations and changes in real time.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">Reduce no-shows</p>
                    <p className="text-sm text-mejdar-gray">Deposits and automated reminders keep your bookings secure.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mejdar-teal py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
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
