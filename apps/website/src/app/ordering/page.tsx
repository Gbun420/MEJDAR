import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Restaurant Ordering",
  description:
    "Take online orders directly from your restaurant's website. No third-party commissions. Your brand, your customers.",
};

export default function OrderingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Online Ordering
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Take orders directly from your own website. No third-party
            commissions eating into your margins.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-mejdar-navy">
                Your menu. Your way.
              </h2>
              <p className="mt-4 text-mejdar-gray">
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
                How it works
              </h3>
              <ol className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-mejdar-teal text-xs font-bold text-white">1</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">Set up your menu</p>
                    <p className="text-sm text-mejdar-gray">Add your dishes, prices, and modifiers through the admin panel.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-mejdar-teal text-xs font-bold text-white">2</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">Embed on your website</p>
                    <p className="text-sm text-mejdar-gray">Add the ordering page to your existing website or use our storefront.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-mejdar-teal text-xs font-bold text-white">3</span>
                  <div>
                    <p className="font-medium text-mejdar-navy">Receive orders</p>
                    <p className="text-sm text-mejdar-gray">Orders arrive in your dashboard, by email, or via a printer. Your choice.</p>
                  </div>
                </li>
              </ol>
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
