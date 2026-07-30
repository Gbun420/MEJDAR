import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Target, Heart, Globe } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About MEJDAR — building hospitality technology for independent restaurants in Malta.",
};

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Clear pricing, honest communication, no hidden fees.",
  },
  {
    icon: Target,
    title: "Simplicity",
    description:
      "Powerful tools that are easy to use. No training manuals needed.",
  },
  {
    icon: Globe,
    title: "Local first",
    description: "Built for Malta, supported in Malta. Real people, real support.",
  },
  {
    icon: Heart,
    title: "Your brand",
    description:
      "Your restaurant's identity stays yours. No third-party branding.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            About MEJDAR
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            Building the tools that help restaurants thrive
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            In the digital age, restaurants deserve to own their ordering
            channel.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateInView>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
                Our mission
              </h2>
              <p className="mt-6 text-mejdar-gray leading-relaxed">
                Restaurants deserve to own their ordering channel. Too many are
                locked into third-party platforms that charge high commissions
                and sit between them and their customers.
              </p>
              <p className="mt-4 text-mejdar-gray leading-relaxed">
                MEJDAR gives restaurants their own branded ordering,
                reservation and analytics system. No commissions. No middlemen.
                Just the tools you need to run your business your way.
              </p>
              <p className="mt-4 text-mejdar-gray leading-relaxed">
                We are based in Valletta, Malta. We understand the Maltese
                hospitality market because we are part of it. When you work
                with MEJDAR, you are working with real people who can meet you
                for a coffee.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="rounded-2xl bg-mejdar-limestone p-10">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                  Contact
                </h3>
                <div className="mt-4 space-y-2 text-sm text-mejdar-gray-dark">
                  <p>{brand.name} Ltd</p>
                  <p>{brand.address.street}</p>
                  <p>
                    {brand.address.city}, {brand.address.country}
                  </p>
                  <p className="mt-3">
                    <a
                      href={`mailto:${brand.contactEmail}`}
                      className="text-mejdar-teal hover:underline"
                    >
                      {brand.contactEmail}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${brand.contactPhone.replace(/\s/g, "")}`}
                      className="text-mejdar-teal hover:underline"
                    >
                      {brand.contactPhone}
                    </a>
                  </p>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mejdar-limestone py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="text-center">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-mejdar-navy">
              Our values
            </h2>
          </AnimateInView>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <AnimateInView key={value.title} delay={i * 0.1}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mejdar-teal/10 text-mejdar-teal">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-mejdar-gray">
                    {value.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mejdar-teal py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold">
            Work with us
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Let&apos;s talk about how MEJDAR can help your restaurant.
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
