import type { Metadata } from "next";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "MEJDAR cookie policy. How we use cookies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="mt-4 text-white/80">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-mejdar max-w-none">
          <h2 className="text-xl font-bold text-mejdar-navy">What are cookies?</h2>
          <p className="text-mejdar-gray">
            Cookies are small text files placed on your device when you visit
            a website. They help us understand how you use our site and
            improve your experience.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">How we use cookies</h2>
          <p className="text-mejdar-gray">
            We use cookies for the following purposes:
          </p>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>
              <strong>Strictly necessary:</strong> Session cookies required for
              the website to function (e.g., form state). These cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics (optional):</strong> We use PostHog or a
              privacy-conscious alternative to understand how visitors use our
              site. This is only enabled after you consent to analytics cookies.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">Third-party cookies</h2>
          <p className="text-mejdar-gray">
            We do not use advertising cookies or share cookie data with third
            parties for marketing purposes.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">Managing cookies</h2>
          <p className="text-mejdar-gray">
            You can control cookies through your browser settings. Disabling
            strictly necessary cookies may affect website functionality.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">Changes</h2>
          <p className="text-mejdar-gray">
            We may update this policy from time to time. Changes will be
            posted on this page with an updated date.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">Contact</h2>
          <p className="text-mejdar-gray">
            For questions about our cookie policy, contact {legal.dpo}.
          </p>
        </div>
      </section>
    </>
  );
}
