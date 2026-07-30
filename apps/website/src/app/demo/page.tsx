import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Try MEJDAR's restaurant ordering system. See how it looks for your customers.",
};

export default function DemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Live Demo</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            See how MEJDAR looks for your customers. Try our demo restaurant
            with a full menu, ordering and reservation system.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-mejdar-navy">
                Try it yourself
              </h2>
              <p className="mt-4 text-mejdar-gray">
                Our demo restaurant &ldquo;Harbour Table&rdquo; is fully
                configured with a menu, categories, modifiers and reservations.
                Browse the menu, add items to your cart, and see the full
                customer experience.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href={brand.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-mejdar-teal p-4 text-center text-white transition hover:bg-mejdar-teal-light"
                >
                  <span className="text-lg font-semibold">
                    Open the demo restaurant
                  </span>
                  <span className="block text-sm text-white/80">
                    Opens in a new tab
                  </span>
                </a>
                <a
                  href={`${brand.demoUrl}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border-2 border-mejdar-teal bg-white p-4 text-center text-mejdar-teal transition hover:bg-mejdar-limestone"
                >
                  <span className="text-lg font-semibold">
                    View the admin dashboard
                  </span>
                  <span className="block text-sm text-mejdar-gray">
                    Email: admin@mejdar.local / Password: password
                  </span>
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-mejdar-limestone p-8">
              <h3 className="text-lg font-semibold text-mejdar-navy">
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
                  <li key={item} className="flex items-start gap-2 text-sm text-mejdar-gray-dark">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-mejdar-gray">
                This is a demo environment. Orders placed here are for
                demonstration purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mejdar-teal py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Like what you see?</h2>
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
