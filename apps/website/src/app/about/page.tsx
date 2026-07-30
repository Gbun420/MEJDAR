import type { Metadata } from "next";
import { brand, legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MEJDAR — a Malta-based hospitality technology company building tools for restaurants.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">About MEJDAR</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Building the tools that help restaurants thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-mejdar max-w-none">
            <h2 className="text-2xl font-bold text-mejdar-navy">Our mission</h2>
            <p className="text-mejdar-gray">
              Restaurants deserve to own their ordering channel. Too many are
              locked into third-party platforms that charge high commissions
              and sit between them and their customers.
            </p>
            <p className="text-mejdar-gray">
              MEJDAR gives restaurants their own branded ordering, reservation
              and analytics system. No commissions. No middlemen. Just the
              tools you need to run your business your way.
            </p>

            <h2 className="mt-12 text-2xl font-bold text-mejdar-navy">
              Based in Malta
            </h2>
            <p className="text-mejdar-gray">
              We&apos;re a local company building for local businesses. We
              understand the Maltese hospitality market because we&apos;re part
              of it. When you work with MEJDAR, you&apos;re working with real
              people who can meet you for a coffee.
            </p>

            <h2 className="mt-12 text-2xl font-bold text-mejdar-navy">
              Our values
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Transparency",
                  text: "Clear pricing, honest communication, no hidden fees.",
                },
                {
                  title: "Simplicity",
                  text: "Powerful tools that are easy to use. No training manuals needed.",
                },
                {
                  title: "Local first",
                  text: "Built for Malta, supported in Malta. Real people, real support.",
                },
                {
                  title: "Your brand",
                  text: "Your restaurant's identity stays yours. No third-party branding.",
                },
              ].map((value) => (
                <div key={value.title} className="rounded-lg bg-mejdar-limestone p-4">
                  <h3 className="font-semibold text-mejdar-navy">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm text-mejdar-gray">{value.text}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold text-mejdar-navy">
              Contact
            </h2>
            <p className="text-mejdar-gray">
              {legal.companyName}
              <br />
              {brand.address.street}
              <br />
              {brand.address.city}, {brand.address.country}
              <br />
              {brand.contactEmail}
              <br />
              {brand.contactPhone}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
