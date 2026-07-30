import Link from "next/link";
import { brand, pricing } from "@/lib/config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {brand.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            {brand.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-mejdar-terracotta px-6 py-3 text-base font-semibold text-white transition hover:bg-mejdar-terracotta-light"
            >
              {brand.primaryCta}
            </Link>
            <Link
              href={brand.demoUrl}
              className="rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              {brand.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-mejdar-limestone py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-mejdar-navy">
            Everything your restaurant needs
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Online Ordering",
                description:
                  "Take orders directly from your website. No third-party commissions eating into your margins.",
                icon: "🛒",
              },
              {
                title: "Reservations",
                description:
                  "Let customers book tables online. Manage availability, deposits and waitlists from one dashboard.",
                icon: "📅",
              },
              {
                title: "Analytics",
                description:
                  "See what's selling, when it's busy, and how your business is performing in real time.",
                icon: "📊",
              },
              {
                title: "Your Brand",
                description:
                  "Your logo, your colours, your domain. No third-party branding on your ordering page.",
                icon: "🎨",
              },
              {
                title: "Local Support",
                description:
                  "Based in Malta. Real people who understand your business, not a call centre overseas.",
                icon: "🇲🇹",
              },
              {
                title: "Predictable Pricing",
                description:
                  "Fixed monthly fees. No commission per order. No surprises on your invoice.",
                icon: "💶",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-mejdar-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-mejdar-gray">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-mejdar-navy">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-mejdar-gray">
            {pricing.disclaimer}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-lg border-2 border-mejdar-teal bg-white p-8 text-left shadow-sm"
              >
                <h3 className="text-xl font-bold text-mejdar-navy">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-mejdar-gray">{plan.tagline}</p>
                <div className="mt-4">
                  <span className="text-sm text-mejdar-gray">Setup: </span>
                  <span className="text-lg font-bold text-mejdar-navy">
                    {pricing.currencySymbol}
                    {plan.setupPrice.min}–{pricing.currencySymbol}
                    {plan.setupPrice.max}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-mejdar-gray">Monthly: </span>
                  <span className="text-lg font-bold text-mejdar-navy">
                    {pricing.currencySymbol}
                    {plan.monthlyPrice.min}–{pricing.currencySymbol}
                    {plan.monthlyPrice.max}
                  </span>
                </div>
                <ul className="mt-6 space-y-2">
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
                  className="mt-6 block rounded-md bg-mejdar-teal px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-mejdar-teal-light"
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to take control?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Join restaurants across Malta who are building their own ordering
            channel. No commissions, no middlemen.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-mejdar-navy px-8 py-3 text-base font-semibold text-white transition hover:bg-mejdar-navy-light"
          >
            {brand.primaryCta}
          </Link>
        </div>
      </section>
    </>
  );
}
