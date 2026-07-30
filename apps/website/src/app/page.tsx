import Link from "next/link";
import {
  ShoppingBag,
  CalendarDays,
  ChartNoAxesCombined,
  Truck,
  Tag,
  Headphones,
  Check,
  X as XIcon,
  ArrowRight,
  Search,
  Palette,
  Globe,
  Shield,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { brand, pricing } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";
import { ProductPreview } from "@/components/ProductPreview";

const features = [
  {
    icon: ShoppingBag,
    title: "Direct online ordering",
    description:
      "Take orders from your own website. No third-party commissions eating into your margins.",
  },
  {
    icon: CalendarDays,
    title: "Table reservations",
    description:
      "Let customers book tables online. Manage availability, deposits and waitlists from one dashboard.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Restaurant analytics",
    description:
      "See what is selling, when it is busy, and how your business is performing in real time.",
  },
  {
    icon: Truck,
    title: "Delivery and collection",
    description:
      "Configure delivery zones, collection time slots and order scheduling for your restaurant.",
  },
  {
    icon: Tag,
    title: "Customer promotions",
    description:
      "Create coupons, loyalty rewards and special offers to bring customers back.",
  },
  {
    icon: Headphones,
    title: "Local managed support",
    description:
      "Based in Malta. Real people who understand your business, not a call centre overseas.",
  },
];

const comparisonMejdar = [
  "Restaurant-owned branding",
  "Restaurant-owned domain",
  "Direct customer relationships",
  "Predictable MEJDAR service pricing",
  "Your own payment provider",
  "Configurable delivery and collection",
  "Direct reporting and analytics",
];

const comparisonMarketplace = [
  "Marketplace-controlled branding",
  "Limited direct customer relationship",
  "Platform-dependent visibility",
  "Variable platform charges",
  "Reduced control over ordering experience",
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn about your restaurant, menu, workflow and goals. No generic templates \u2014 a setup shaped around your operation.",
  },
  {
    number: "02",
    title: "Brand and menu setup",
    description:
      "Your logo, colours, menu categories, modifiers, pricing and delivery zones. Everything configured to match your restaurant.",
  },
  {
    number: "03",
    title: "Testing and staff training",
    description:
      "Your team tests the full ordering and reservation flow. We train staff on the dashboard and ensure everything works before launch.",
  },
  {
    number: "04",
    title: "Launch and support",
    description:
      "Your system goes live. MEJDAR provides ongoing support, updates and managed hosting so you can focus on your customers.",
  },
];

const trustSignals = [
  { icon: Shield, label: "Open-source foundation" },
  { icon: Globe, label: "Restaurant-controlled data" },
  { icon: Palette, label: "Configurable branding" },
  { icon: Headphones, label: "Managed local support" },
  { icon: BarChart3, label: "No MEJDAR percentage commission" },
  { icon: Search, label: "Transparent reporting" },
];

const faqs = [
  {
    question: "How is MEJDAR different from Uber Eats or Bolt Food?",
    answer:
      "MEJDAR gives you your own branded system \u2014 your domain, your customer data, your brand. Marketplaces charge commissions per order and control the customer relationship. With MEJDAR, you pay a predictable monthly fee and keep your margins.",
  },
  {
    question: "Do I need technical knowledge to use MEJDAR?",
    answer:
      "No. MEJDAR handles installation, configuration and ongoing hosting. Your team gets a simple dashboard for orders, reservations and reports. We provide training and local support in Malta.",
  },
  {
    question: "What are the setup and monthly costs?",
    answer:
      "Setup costs range from \u20AC650\u2013\u20AC1,500 depending on your requirements. Monthly fees range from \u20AC69\u2013\u20AC149. These are indicative prices \u2014 we provide a tailored quote after understanding your restaurant.",
  },
  {
    question: "Can I keep my existing payment provider?",
    answer:
      "Yes. MEJDAR integrates with Stripe and other payment providers. You are not locked into any specific payment system.",
  },
  {
    question: "Is my restaurant data secure?",
    answer:
      "Yes. Your data is stored securely and you own it. MEJDAR uses an open-source foundation, so there are no hidden data practices. We comply with GDPR and Maltese data protection requirements.",
  },
  {
    question: "Do you support delivery and collection?",
    answer:
      "Yes. MEJDAR supports collection orders, delivery with configurable zones, and scheduled orders. You set the rules \u2014 delivery areas, time slots, minimum orders and fees.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mejdar-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--mejdar-teal-dark)_0%,_transparent_60%)] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <AnimateInView>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
                  Independent hospitality technology, built in Malta
                </p>
              </AnimateInView>
              <AnimateInView delay={0.1}>
                <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {brand.tagline}
                </h1>
              </AnimateInView>
              <AnimateInView delay={0.2}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                  {brand.description}
                </p>
              </AnimateInView>
              <AnimateInView delay={0.3}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-mejdar-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-mejdar-terracotta-light"
                  >
                    {brand.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={brand.demoUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    {brand.secondaryCta}
                  </Link>
                </div>
              </AnimateInView>
              <AnimateInView delay={0.4}>
                <div className="mt-8 flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:gap-6">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-mejdar-teal-light" />
                    No MEJDAR commission per order
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-mejdar-teal-light" />
                    Your own brand and customer data
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-mejdar-teal-light" />
                    Local setup and support
                  </span>
                </div>
              </AnimateInView>
            </div>

            {/* Right \u2014 Product mockup */}
            <AnimateInView delay={0.3} className="hidden lg:block">
              <div className="relative">
                {/* Desktop screen */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 rounded-t-lg bg-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-2 text-[10px] text-white/40">harbourtable.mejdar.com</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-4">
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-2">
                      <div className="h-3 w-16 rounded bg-mejdar-teal/30" />
                      {["Starters", "Mains", "Desserts", "Drinks"].map((cat) => (
                        <div key={cat} className="rounded bg-white/5 px-2 py-1.5">
                          <div className="h-2 w-14 rounded bg-white/20" />
                          <div className="mt-1 h-1.5 w-10 rounded bg-white/10" />
                        </div>
                      ))}
                    </div>
                    {/* Menu grid */}
                    <div className="col-span-2 space-y-3">
                      <div className="h-3 w-20 rounded bg-white/20" />
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Maltese Platter", price: "\u20AC14.50" },
                          { name: "Fish Soup", price: "\u20AC12.00" },
                          { name: "Rabbit Stew", price: "\u20AC18.50" },
                          { name: "Lampuki Fillet", price: "\u20AC22.00" },
                        ].map((item) => (
                          <div key={item.name} className="rounded-lg bg-white/5 p-2.5">
                            <div className="h-12 rounded bg-mejdar-limestone/10" />
                            <div className="mt-2 h-2 w-16 rounded bg-white/20" />
                            <div className="mt-1 h-2 w-8 rounded bg-mejdar-teal/30" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile overlay */}
                <div className="absolute -bottom-6 -left-6 w-36 rounded-xl border border-white/10 bg-white/5 p-1 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-1 rounded-t-lg bg-white/10 px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-mejdar-teal/50" />
                    <span className="text-[7px] text-white/30">Mobile</span>
                  </div>
                  <div className="space-y-1.5 p-2">
                    <div className="h-8 rounded bg-mejdar-limestone/10" />
                    <div className="h-2 w-14 rounded bg-white/15" />
                    <div className="h-6 rounded bg-white/5" />
                    <div className="h-6 rounded bg-white/5" />
                  </div>
                </div>

                {/* Analytics card */}
                <div className="absolute -right-4 top-8 w-40 rounded-xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-sm">
                  <div className="text-[8px] font-semibold uppercase tracking-wider text-white/40">
                    Today&apos;s Revenue
                  </div>
                  <div className="mt-1 text-lg font-bold text-mejdar-teal-light">
                    \u20AC2,847
                  </div>
                  <div className="mt-2 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                      <div
                        key={i}
                        className="w-3 rounded-t bg-mejdar-teal/40"
                        style={{ height: `${h * 0.3}px` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Reservation notification */}
                <div className="absolute -right-2 bottom-12 w-44 rounded-lg border border-white/10 bg-white/10 p-2.5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-mejdar-teal/30">
                      <CalendarDays className="h-3 w-3 text-mejdar-teal-light" />
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold text-white/70">
                        New reservation
                      </div>
                      <div className="text-[8px] text-white/40">
                        Table 4 \u2014 7:30 PM, 4 guests
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ── Core value proposition ────────────────────────── */}
      <section className="bg-mejdar-limestone py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
              One system for every direct customer interaction
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
              Everything your restaurant needs to take orders, manage
              reservations and understand your customers \u2014 in one place.
            </p>
          </AnimateInView>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <AnimateInView key={feature.title} delay={i * 0.08}>
                <div className="group rounded-xl border border-mejdar-navy/5 bg-white p-7 shadow-sm transition hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mejdar-teal/10 text-mejdar-teal transition group-hover:bg-mejdar-teal group-hover:text-white">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mejdar-gray">
                    {feature.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product interface preview (tabbed) ──────────── */}
      <ProductPreview />

      {/* ── How MEJDAR works ────────────────────────────── */}
      <section className="bg-mejdar-limestone py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
              From setup to launch, we handle it
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
              MEJDAR manages installation, configuration and onboarding so
              you can focus on your restaurant.
            </p>
          </AnimateInView>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <AnimateInView key={step.number} delay={i * 0.1}>
                <div className="relative">
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-10 top-8 hidden h-px w-full bg-mejdar-teal/20 lg:block" />
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-mejdar-teal/30 bg-white font-[family-name:var(--font-dm-sans)] text-sm font-bold text-mejdar-teal">
                    {step.number}
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mejdar-gray">
                    {step.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── Online ordering ─────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateInView>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
                Online Ordering
              </p>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
                Your menu, your brand, your customers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mejdar-gray">
                Take orders directly from your website. Customers see your
                brand, your menu, your pricing \u2014 not a marketplace
                wrapper.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Fully branded ordering page on your own domain",
                  "Collection and delivery with configurable zones",
                  "Menu modifiers, extras and special instructions",
                  "Scheduled orders for advance booking",
                  "Real-time order management dashboard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-mejdar-gray-dark">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/ordering"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mejdar-teal hover:underline"
              >
                Learn more about ordering
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl border border-mejdar-navy/10 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-2 rounded-t-lg bg-mejdar-limestone/60 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-[10px] text-mejdar-gray">harbourtable.mejdar.com/menu</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { name: "Rabbit Stew", price: "\u20AC18.50", desc: "Traditional Maltese rabbit" },
                    { name: "Lampuki Fillet", price: "\u20AC22.00", desc: "Grilled dolphinfish" },
                    { name: "Maltese Platter", price: "\u20AC14.50", desc: "Selection of local favourites" },
                    { name: "Fish Soup", price: "\u20AC12.00", desc: "Fresh catch of the day" },
                  ].map((item) => (
                    <div key={item.name} className="rounded-lg border border-mejdar-navy/5 p-3">
                      <div className="h-16 rounded bg-mejdar-limestone" />
                      <p className="mt-2 text-xs font-semibold text-mejdar-navy">{item.name}</p>
                      <p className="text-[10px] text-mejdar-gray">{item.desc}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-mejdar-teal">{item.price}</span>
                        <span className="rounded bg-mejdar-teal px-2 py-0.5 text-[10px] font-semibold text-white">Add</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ── Reservations ────────────────────────────────── */}
      <section className="bg-mejdar-navy py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateInView delay={0.15} className="order-2 lg:order-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold">Reservations</h4>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium">Day</span>
                    <span className="rounded-md px-3 py-1 text-xs text-white/50">Week</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { time: "12:30", name: "Borg Party", guests: 6, table: "Table 8", status: "Confirmed" },
                    { time: "19:00", name: "Vella Group", guests: 8, table: "Table 1+2", status: "Pending" },
                    { time: "19:30", name: "Spiteri", guests: 4, table: "Table 5", status: "Confirmed" },
                    { time: "20:00", name: "Grech Family", guests: 10, table: "Terrace", status: "Waitlist" },
                  ].map((res, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5">
                      <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold">{res.time}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{res.name}</div>
                        <div className="text-xs text-white/50">{res.guests} guests \u00b7 {res.table}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${res.status === "Confirmed" ? "bg-green-500/20 text-green-300" : res.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" : "bg-white/10 text-white/50"}`}>
                        {res.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateInView>

            <AnimateInView className="order-1 lg:order-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
                Reservations
              </p>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight sm:text-4xl">
                Manage every table from one calendar
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Online bookings, table management, deposits and waitlists.
                Your team sees every reservation in real time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Online booking on your own website",
                  "Table availability and capacity management",
                  "Deposit collection and no-show protection",
                  "Waitlist and automatic notifications",
                  "Day and week calendar views",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal-light" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/reservations"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mejdar-teal-light hover:underline"
              >
                Learn more about reservations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ── Analytics ───────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateInView>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
                Analytics
              </p>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
                Understand your restaurant at a glance
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mejdar-gray">
                Revenue, orders, peak hours, top items and customer insights \u2014
                all in one dashboard. Export to CSV when you need it.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time revenue and order tracking",
                  "Peak hours and capacity planning",
                  "Top-selling items and category performance",
                  "Customer ordering patterns",
                  "CSV export for accounting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-mejdar-gray-dark">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/analytics"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mejdar-teal hover:underline"
              >
                Learn more about analytics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl border border-mejdar-navy/10 bg-white p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Weekly revenue", value: "\u20AC18,432", change: "+12%" },
                    { label: "Total orders", value: "438", change: "+8%" },
                    { label: "Repeat customers", value: "34%", change: "+3%" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-mejdar-navy/5 p-3">
                      <div className="text-[10px] text-mejdar-gray">{stat.label}</div>
                      <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">{stat.value}</div>
                      <div className="mt-0.5 text-[10px] text-mejdar-teal">{stat.change}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-mejdar-navy/5 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-mejdar-gray">Peak hours</div>
                  <div className="mt-2 flex items-end gap-1">
                    {[
                      { h: "10", v: 15 }, { h: "11", v: 35 }, { h: "12", v: 85 }, { h: "13", v: 90 },
                      { h: "14", v: 50 }, { h: "15", v: 20 }, { h: "16", v: 15 }, { h: "17", v: 25 },
                      { h: "18", v: 55 }, { h: "19", v: 80 }, { h: "20", v: 95 }, { h: "21", v: 70 },
                      { h: "22", v: 30 },
                    ].map((bar) => (
                      <div key={bar.h} className="flex flex-1 flex-col items-center gap-1">
                        <div className="w-full rounded-t bg-mejdar-teal" style={{ height: `${bar.v * 0.4}px` }} />
                        <span className="text-[7px] text-mejdar-gray">{bar.h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ── Comparison: Why direct ordering matters ─────── */}
      <section className="bg-mejdar-limestone py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
              Build your own direct channel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
              Own your ordering experience instead of renting someone
              else&apos;s.
            </p>
          </AnimateInView>

          <AnimateInView delay={0.15} className="mt-12">
            <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-mejdar-navy/10 bg-white shadow-sm sm:grid-cols-2">
              {/* MEJDAR column */}
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mejdar-teal text-white font-[family-name:var(--font-dm-sans)] text-sm font-bold">
                    M
                  </div>
                  <span className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">
                    With MEJDAR
                  </span>
                </div>
                <ul className="space-y-3">
                  {comparisonMejdar.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-mejdar-gray-dark">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marketplace column */}
              <div className="bg-mejdar-limestone/60 p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mejdar-gray/20 text-mejdar-gray font-[family-name:var(--font-dm-sans)] text-sm font-bold">
                    ?
                  </div>
                  <span className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">
                    Marketplace only
                  </span>
                </div>
                <ul className="space-y-3">
                  {comparisonMarketplace.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-mejdar-gray">
                      <XIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-terracotta/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-mejdar-gray">
              Payment-processing and optional third-party service fees are
              separate from MEJDAR service pricing.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* ── Pricing overview ────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
              No commission per order. No surprises on your invoice.
            </p>
          </AnimateInView>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            {pricing.plans.map((plan, i) => (
              <AnimateInView key={plan.id} delay={i * 0.1}>
                <div
                  className={`rounded-2xl border-2 p-8 ${
                    plan.id === "growth"
                      ? "border-mejdar-teal bg-white shadow-lg"
                      : "border-mejdar-navy/10 bg-white shadow-sm"
                  }`}
                >
                  {plan.id === "growth" && (
                    <span className="mb-4 inline-block rounded-full bg-mejdar-teal/10 px-3 py-1 text-xs font-semibold text-mejdar-teal">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-mejdar-navy">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-mejdar-gray">
                    {plan.tagline}
                  </p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-sm text-mejdar-gray">Setup</span>
                    <span className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">
                      {pricing.currencySymbol}{plan.setupPrice.min}
                      &ndash;{pricing.currencySymbol}{plan.setupPrice.max}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-mejdar-gray">Monthly</span>
                    <span className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">
                      {pricing.currencySymbol}{plan.monthlyPrice.min}
                      &ndash;{pricing.currencySymbol}{plan.monthlyPrice.max}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-mejdar-gray-dark"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-mejdar-teal" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                      plan.id === "growth"
                        ? "bg-mejdar-teal text-white hover:bg-mejdar-teal-light"
                        : "border-2 border-mejdar-teal text-mejdar-teal hover:bg-mejdar-teal/5"
                    }`}
                  >
                    {brand.primaryCta}
                  </Link>
                </div>
              </AnimateInView>
            ))}
          </div>
          <AnimateInView delay={0.2}>
            <p className="mt-8 text-center text-xs text-mejdar-gray">
              {pricing.disclaimer}
            </p>
            <p className="mt-2 text-center text-xs text-mejdar-gray">
              Payment-processing and optional third-party service fees are
              separate.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="bg-mejdar-limestone py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
              Everything you need to know about getting started with MEJDAR.
            </p>
          </AnimateInView>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <AnimateInView key={i} delay={i * 0.05}>
                <details className="group rounded-xl border border-mejdar-navy/5 bg-white shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-sm font-semibold text-mejdar-navy transition hover:bg-mejdar-limestone/50">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-mejdar-gray transition group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed text-mejdar-gray">
                    {faq.answer}
                  </div>
                </details>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / local identity ───────────────────────── */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
              Built in Malta for independent hospitality businesses
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-dm-sans)] text-2xl font-bold sm:text-3xl">
              Technology you can trust
            </h2>
          </AnimateInView>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {trustSignals.map((signal, i) => (
              <AnimateInView key={signal.label} delay={i * 0.06}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <signal.icon className="h-5 w-5 text-mejdar-teal-light" />
                  </div>
                  <span className="mt-3 text-xs font-medium text-white/70">
                    {signal.label}
                  </span>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="bg-mejdar-teal py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateInView>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold sm:text-4xl">
              Ready to take control of your ordering channel?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join restaurants across Malta who are building their own
              direct customer channel. No commissions, no middlemen.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-mejdar-navy px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-mejdar-navy-light"
              >
                {brand.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={brand.demoUrl}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {brand.secondaryCta}
              </Link>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
