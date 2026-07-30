import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "See what's selling, when it's busy, and how your business is performing in real time.",
};

export default function AnalyticsPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Analytics
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            Data-driven decisions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            See what is selling, when it is busy, and how your business is
            performing in real time.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                A clear picture of your restaurant
              </h2>
              <p className="mt-6 text-mejdar-gray leading-relaxed">
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
                  What you will see
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: "Daily Revenue", value: "€2,847", sub: "+12% vs last week" },
                    { label: "Orders Today", value: "68", sub: "Peak: 12:30–13:30" },
                    { label: "Top Item", value: "Fish & Chips", sub: "24 orders today" },
                    { label: "Avg. Order", value: "€41.87", sub: "+5% vs last week" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-white p-3">
                      <div className="text-xs text-mejdar-gray">{stat.label}</div>
                      <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">
                        {stat.value}
                      </div>
                      <div className="text-xs text-mejdar-teal">{stat.sub}</div>
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
