import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Monitor, Smartphone, BarChart3, CalendarDays } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "Preview the Platform",
  description:
    "Preview MEJDAR's restaurant ordering system. See the customer ordering experience, admin dashboard, reservations and analytics.",
};

export default function DemoPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Platform Preview
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            See how MEJDAR works
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Explore the customer ordering experience, admin dashboard,
            reservation system and analytics \u2014 all built for independent
            restaurants.
          </p>
        </div>
      </section>

      {/* Feature previews */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Monitor,
                title: "Customer Ordering",
                description: "Branded menu page with categories, modifiers and cart. Your domain, your brand.",
                mockup: (
                  <div className="mt-4 rounded-lg border border-mejdar-navy/5 bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="space-y-1.5">
                      {["Rabbit Stew \u2014 \u20AC18.50", "Lampuki Fillet \u2014 \u20AC22.00", "Fish Soup \u2014 \u20AC12.00"].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded bg-mejdar-limestone/50 px-2 py-1">
                          <span className="text-[10px] text-mejdar-gray-dark">{item}</span>
                          <span className="rounded bg-mejdar-teal px-1.5 py-0.5 text-[8px] font-semibold text-white">Add</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                icon: Smartphone,
                title: "Mobile Experience",
                description: "Responsive ordering that works perfectly on phones. Customers order from anywhere.",
                mockup: (
                  <div className="mt-4 mx-auto w-28 rounded-xl border border-mejdar-navy/5 bg-white p-2 shadow-sm">
                    <div className="h-3 rounded bg-mejdar-limestone" />
                    <div className="mt-2 space-y-1">
                      {["Platter", "Soup", "Stew"].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded bg-mejdar-limestone/50 px-1.5 py-1">
                          <span className="text-[8px] text-mejdar-gray-dark">{item}</span>
                          <span className="text-[7px] text-mejdar-teal font-bold">Add</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                icon: CalendarDays,
                title: "Reservations",
                description: "Online table bookings with deposits, waitlists and calendar management.",
                mockup: (
                  <div className="mt-4 rounded-lg border border-mejdar-navy/5 bg-white p-3 shadow-sm">
                    <div className="text-[9px] font-semibold text-mejdar-navy mb-2">Today&apos;s bookings</div>
                    <div className="space-y-1">
                      {[
                        { time: "12:30", name: "Borg", guests: 6 },
                        { time: "19:00", name: "Vella", guests: 8 },
                        { time: "20:00", name: "Grech", guests: 4 },
                      ].map((res) => (
                        <div key={res.name} className="flex items-center justify-between rounded bg-mejdar-limestone/50 px-2 py-1">
                          <span className="text-[9px] font-semibold text-mejdar-navy">{res.time}</span>
                          <span className="text-[8px] text-mejdar-gray">{res.name} ({res.guests})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Revenue tracking, top items, peak hours and customer insights in real time.",
                mockup: (
                  <div className="mt-4 rounded-lg border border-mejdar-navy/5 bg-white p-3 shadow-sm">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="rounded bg-mejdar-limestone/50 p-1.5">
                        <div className="text-[7px] text-mejdar-gray">Revenue</div>
                        <div className="text-[10px] font-bold text-mejdar-navy">\u20AC18,432</div>
                      </div>
                      <div className="rounded bg-mejdar-limestone/50 p-1.5">
                        <div className="text-[7px] text-mejdar-gray">Orders</div>
                        <div className="text-[10px] font-bold text-mejdar-navy">438</div>
                      </div>
                    </div>
                  </div>
                ),
              },
            ].map((item, i) => (
              <AnimateInView key={item.title} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-xl border border-mejdar-navy/5 bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mejdar-teal/10 text-mejdar-teal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-mejdar-gray">
                    {item.description}
                  </p>
                  {item.mockup}
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* What to try */}
      <section className="bg-mejdar-limestone py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">
                Request a live walkthrough
              </h2>
              <p className="mt-4 text-mejdar-gray">
                The full MEJDAR experience is available as a guided demo.
                We will walk you through ordering, reservations, the admin
                dashboard and analytics \u2014 tailored to your restaurant.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-mejdar-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-mejdar-teal-light"
              >
                {brand.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                  What you will see
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
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Let us show you how MEJDAR would work for your restaurant.
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
