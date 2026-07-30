import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Let customers book tables online. Manage availability, deposits and waitlists from one dashboard.",
};

export default function ReservationsPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Reservations
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            Fill every table
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Our reservation system handles online bookings, table management,
            waitlists and deposits.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                Let customers book anytime
              </h2>
              <p className="mt-6 text-mejdar-gray leading-relaxed">
                Our reservation system handles online bookings, table
                management, waitlists and deposits — so your front-of-house
                team can focus on guests, not phones.
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
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-mejdar-gray-dark"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl bg-mejdar-limestone p-8">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                  Benefits
                </h3>
                <div className="mt-4 space-y-4">
                  {[
                    { title: "24/7 booking", desc: "Customers can book anytime, even when you are closed." },
                    { title: "Instant notifications", desc: "Get notified of new bookings, cancellations and changes in real time." },
                    { title: "Reduce no-shows", desc: "Deposits and automated reminders keep your bookings secure." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-lg bg-white p-4">
                      <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-mejdar-navy">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-mejdar-gray">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold">
            Ready to get started?
          </h2>
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
