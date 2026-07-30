import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "See what's selling, when it's busy, and how your business is performing in real time.",
};

export default function AnalyticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            See what&apos;s selling, when it&apos;s busy, and how your
            business is performing in real time.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-mejdar-navy">
                Data-driven decisions
              </h2>
              <p className="mt-4 text-mejdar-gray">
                MEJDAR Insights gives you a clear picture of your restaurant
                performance. Track revenue, popular items, peak hours and
                customer patterns — all in one place.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time revenue dashboard",
                  "Sales by category, item and time period",
                  "Peak hours and staffing insights",
                  "Order type breakdown (delivery vs collection vs dine-in)",
                  "Customer retention and repeat order tracking",
                  "Export reports as CSV",
                  "Role-based access to reports",
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
                What you&apos;ll see
              </h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-mejdar-navy">Daily Revenue</p>
                  <p className="text-2xl font-bold text-mejdar-teal">&euro;2,847</p>
                  <p className="text-xs text-mejdar-olive">+12% vs last week</p>
                </div>
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-mejdar-navy">Orders Today</p>
                  <p className="text-2xl font-bold text-mejdar-teal">68</p>
                  <p className="text-xs text-mejdar-olive">Peak: 12:30–13:30</p>
                </div>
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-mejdar-navy">Top Item</p>
                  <p className="text-lg font-bold text-mejdar-navy">Fish & Chips</p>
                  <p className="text-xs text-mejdar-gray">24 orders today</p>
                </div>
              </div>
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
