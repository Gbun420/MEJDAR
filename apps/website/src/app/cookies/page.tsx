import type { Metadata } from "next";
import { AnimateInView } from "@/components/AnimateInView";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How MEJDAR uses cookies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-3 text-white/60">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="prose prose-gray max-w-none">
            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit
              a website. They help us understand how you use our site and improve
              your experience.
            </p>
            <h2>How we use cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
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
            <h2>Third-party cookies</h2>
            <p>
              We do not use advertising cookies or share cookie data with third
              parties for marketing purposes.
            </p>
            <h2>Managing cookies</h2>
            <p>
              You can control cookies through your browser settings. Disabling
              strictly necessary cookies may affect website functionality.
            </p>
            <h2>Changes</h2>
            <p>
              We may update this policy from time to time. Changes will be posted
              on this page with an updated date.
            </p>
            <h2>Contact</h2>
            <p>
              For questions about our cookie policy, contact{" "}
              <a href={`mailto:${legal.dpo}`}>{legal.dpo}</a>.
            </p>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
