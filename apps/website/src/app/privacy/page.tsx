import type { Metadata } from "next";
import { AnimateInView } from "@/components/AnimateInView";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MEJDAR collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-white/60">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="prose prose-gray max-w-none">
            <h2>1. Who we are</h2>
            <p>
              {legal.companyName} ({legal.companyRegNo}) is the data controller
              for this website. Our registered address is{" "}
              {legal.registeredAddress}. Contact our Data Protection Officer at{" "}
              <a href={`mailto:${legal.dpo}`}>{legal.dpo}</a>.
            </p>
            <h2>2. What we collect</h2>
            <p>
              When you submit a contact or demo form, we collect: your name,
              business name, email address, phone number (if provided), number of
              locations, current ordering method, and message content.
            </p>
            <p>
              We also collect standard web analytics data (page views, referrer,
              browser type) only after you consent to analytics cookies.
            </p>
            <h2>3. How we use your data</h2>
            <ul>
              <li>To respond to your enquiry or demo request</li>
              <li>
                To send you information about MEJDAR services (only with consent)
              </li>
              <li>To improve our website and services</li>
            </ul>
            <h2>4. Legal basis</h2>
            <p>
              We process your data based on: (a) your consent when you submit a
              form; and (b) our legitimate interest in responding to business
              enquiries.
            </p>
            <h2>5. Data retention</h2>
            <p>
              Form submissions are retained for up to 12 months unless you become
              a customer, in which case data is retained for the duration of the
              business relationship. Analytics data is aggregated and anonymised.
            </p>
            <h2>6. Your rights</h2>
            <p>
              Under the GDPR, you have the right to: access your data, rectify
              inaccurate data, erasure, restrict processing, data portability, and
              object to processing. Contact{" "}
              <a href={`mailto:${legal.dpo}`}>{legal.dpo}</a> to exercise these
              rights.
            </p>
            <h2>7. Third parties</h2>
            <p>
              We do not sell your personal data. We may use third-party services
              (hosting, email delivery) that process data on our behalf under data
              processing agreements.
            </p>
            <h2>8. Cookies</h2>
            <p>
              See our <a href="/cookies">Cookie Policy</a> for details on how we
              use cookies.
            </p>
            <h2>9. Contact</h2>
            <p>
              For privacy-related queries, contact{" "}
              <a href={`mailto:${legal.dpo}`}>{legal.dpo}</a>.
            </p>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
