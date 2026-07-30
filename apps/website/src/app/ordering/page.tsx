import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Online Ordering",
  description:
    "Take orders directly from your own website. No third-party commissions eating into your margins.",
};

export default function OrderingPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Online Ordering
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            Take orders directly from your own website
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            No third-party commissions eating into your margins.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                Your menu. Your way.
              </h2>
              <p className="mt-6 text-mejdar-gray leading-relaxed">
                Build and manage your menu with categories, modifiers, options
                and allergen information. Update prices, add specials and
                control availability — all from a single dashboard.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Categories and subcategories",
                  "Modifiers and add-ons (size, extra toppings, sides)",
                  "Allergen and dietary information",
                  "Daily specials and limited-time offers",
                  "Item-level availability control",
                  "High-quality images per item",
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
                  How it works
                </h3>
                <ol className="mt-4 space-y-4">
                  {[
                    { step: "1", text: "Set up your menu — Add your dishes, prices, and modifiers through the admin panel." },
                    { step: "2", text: "Embed on your website — Add the ordering page to your existing website or use our storefront." },
                    { step: "3", text: "Receive orders — Orders arrive in your dashboard, by email, or via a printer. Your choice." },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-mejdar-teal text-xs font-bold text-white">
                        {item.step}
                      </span>
                      <p className="text-sm text-mejdar-gray-dark">{item.text}</p>
                    </li>
                  ))}
                </ol>
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
