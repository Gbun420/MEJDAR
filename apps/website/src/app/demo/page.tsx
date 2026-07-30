import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Try MEJDAR's restaurant ordering system. See how it looks for your customers.",
};

export default function DemoPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Live Demo
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            See how MEJDAR works for your customers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Try our demo restaurant with a full menu, ordering and reservation
            system.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">
                Try it yourself
              </h2>
              <p className="mt-4 text-mejdar-gray">
                Our demo restaurant &ldquo;Harbour Table&rdquo; is fully
                configured with a menu, categories, modifiers and reservations.
                Browse the menu, add items to your cart, and see the full
                customer experience.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-mejdar-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-mejdar-teal-light"
              >
                Request a live demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-sm text-mejdar-gray">
                We will set up a personal walkthrough for you.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl bg-mejdar-limestone p-8">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                  What to try
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Browse the menu and view item details",
                    "Add items with modifiers (size, extras)",
                    "Complete a test order through checkout",
                    "Make a reservation for a future date",
                    "Check the admin dashboard for order management",
                    "View the reporting and analytics",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-mejdar-gray-dark"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-mejdar-gray">
                  This is a demo environment. Orders placed here are for
                  demonstration purposes only.
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold">
            Like what you see?
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
