import type { Metadata } from "next";
import Link from "next/link";
import { brand, pricing } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for restaurants. No commission per order. No surprises.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Simple, transparent pricing. No commission per order. No surprises
            on your invoice.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-lg border-2 border-mejdar-teal bg-white p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-mejdar-navy">
                  {plan.name}
                </h2>
                <p className="mt-1 text-mejdar-gray">{plan.tagline}</p>
                <div className="mt-6">
                  <p className="text-sm text-mejdar-gray">One-time setup</p>
                  <p className="text-3xl font-bold text-mejdar-navy">
                    {pricing.currencySymbol}
                    {plan.setupPrice.min}–{pricing.currencySymbol}
                    {plan.setupPrice.max}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-mejdar-gray">Monthly management</p>
                  <p className="text-3xl font-bold text-mejdar-teal">
                    {pricing.currencySymbol}
                    {plan.monthlyPrice.min}–{pricing.currencySymbol}
                    {plan.monthlyPrice.max}
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-mejdar-gray-dark"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 block rounded-md bg-mejdar-teal px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-mejdar-teal-light"
                >
                  {brand.primaryCta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-mejdar-limestone p-6 text-center">
            <p className="text-sm text-mejdar-gray">{pricing.disclaimer}</p>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-mejdar-navy text-center">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: "Are there any commission fees?",
                  a: "No. You pay a fixed monthly fee. There are no per-order commissions.",
                },
                {
                  q: "Can I switch plans later?",
                  a: "Yes. You can upgrade or downgrade at any time. We'll adjust your monthly fee accordingly.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept bank transfer and major credit cards. Payment is processed monthly in advance.",
                },
                {
                  q: "Is there a contract?",
                  a: "No long-term contracts. Month-to-month billing. Cancel anytime with 30 days notice.",
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-mejdar-navy">{faq.q}</h3>
                  <p className="mt-2 text-sm text-mejdar-gray">{faq.a}</p>
                </div>
              ))}
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
