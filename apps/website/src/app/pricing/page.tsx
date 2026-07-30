import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { brand, pricing } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for MEJDAR restaurant ordering and reservation systems. No commission per order.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Simple, transparent pricing
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            No commission per order. No surprises on your invoice.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Fixed monthly fees. You keep your margins. MEJDAR earns when you
            earn.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {pricing.plans.map((plan, i) => (
              <AnimateInView key={plan.id} delay={i * 0.1}>
                <div
                  className={`flex h-full flex-col rounded-2xl border-2 p-8 ${
                    plan.id === "growth"
                      ? "border-mejdar-teal bg-white shadow-lg"
                      : "border-mejdar-navy/10 bg-white shadow-sm"
                  }`}
                >
                  {plan.id === "growth" && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-mejdar-teal/10 px-3 py-1 text-xs font-semibold text-mejdar-teal">
                      Most popular
                    </span>
                  )}
                  <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-mejdar-navy">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-sm text-mejdar-gray">
                    {plan.tagline}
                  </p>
                  <div className="mt-6">
                    <span className="text-sm text-mejdar-gray">
                      One-time setup
                    </span>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                      {pricing.currencySymbol}
                      {plan.setupPrice.min}–{pricing.currencySymbol}
                      {plan.setupPrice.max}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm text-mejdar-gray">
                      Monthly management
                    </span>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                      {pricing.currencySymbol}
                      {plan.monthlyPrice.min}–{pricing.currencySymbol}
                      {plan.monthlyPrice.max}
                    </div>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-mejdar-gray-dark"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition ${
                      plan.id === "growth"
                        ? "bg-mejdar-teal text-white hover:bg-mejdar-teal-light"
                        : "border-2 border-mejdar-teal text-mejdar-teal hover:bg-mejdar-teal/5"
                    }`}
                  >
                    {brand.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView delay={0.2}>
            <div className="mx-auto mt-12 max-w-2xl space-y-4 text-center">
              <p className="text-sm text-mejdar-gray">
                {pricing.disclaimer}
              </p>
              <p className="text-sm text-mejdar-gray">
                Payment-processing and optional third-party service fees are
                separate from MEJDAR service pricing.
              </p>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mejdar-limestone py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-center text-3xl font-bold text-mejdar-navy">
              Frequently asked questions
            </h2>
          </AnimateInView>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "Are there any commission fees?",
                a: "No. You pay a fixed monthly fee. There are no per-order commissions.",
              },
              {
                q: "Can I switch plans later?",
                a: "Yes. You can upgrade or downgrade at any time. We will adjust your monthly fee accordingly.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept bank transfer and major credit cards. Payment is processed monthly in advance.",
              },
              {
                q: "Is there a contract?",
                a: "No long-term contracts. Month-to-month billing. Cancel anytime with 30 days notice.",
              },
            ].map((faq, i) => (
              <AnimateInView key={faq.q} delay={i * 0.08}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-mejdar-navy">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mejdar-gray">
                    {faq.a}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Tell us about your restaurant and we will put together a proposal
            that fits your needs.
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
