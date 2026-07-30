import type { Metadata } from "next";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MEJDAR privacy policy. How we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-white/80">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-mejdar max-w-none">
          <h2 className="text-xl font-bold text-mejdar-navy">1. Who we are</h2>
          <p className="text-mejdar-gray">
            {legal.companyName} ({legal.companyRegNo}) is the data controller
            for this website. Our registered address is {legal.registeredAddress}.
            Contact our Data Protection Officer at {legal.dpo}.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">2. What we collect</h2>
          <p className="text-mejdar-gray">
            When you submit a contact or demo form, we collect: your name,
            business name, email address, phone number (if provided), number
            of locations, current ordering method, and message content.
          </p>
          <p className="text-mejdar-gray">
            We also collect standard web analytics data (page views, referrer,
            browser type) only after you consent to analytics cookies.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">3. How we use your data</h2>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>To respond to your enquiry or demo request</li>
            <li>To send you information about MEJDAR services (only with consent)</li>
            <li>To improve our website and services</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">4. Legal basis</h2>
          <p className="text-mejdar-gray">
            We process your data based on: (a) your consent when you submit a
            form; and (b) our legitimate interest in responding to business
            enquiries.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">5. Data retention</h2>
          <p className="text-mejdar-gray">
            Form submissions are retained for up to 12 months unless you become
            a customer, in which case data is retained for the duration of the
            business relationship. Analytics data is aggregated and anonymised.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">6. Your rights</h2>
          <p className="text-mejdar-gray">
            Under the GDPR, you have the right to: access your data, rectify
            inaccurate data, erasure, restrict processing, data portability,
            and object to processing. Contact {legal.dpo} to exercise these
            rights.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">7. Third parties</h2>
          <p className="text-mejdar-gray">
            We do not sell your personal data. We may use third-party services
            (hosting, email delivery) that process data on our behalf under
            data processing agreements.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">8. Cookies</h2>
          <p className="text-mejdar-gray">
            See our <a href="/cookies" className="text-mejdar-teal underline">Cookie Policy</a> for
            details on how we use cookies.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">9. Contact</h2>
          <p className="text-mejdar-gray">
            For privacy-related queries, contact {legal.dpo}.
          </p>
        </div>
      </section>
    </>
  );
}
