import type { Metadata } from "next";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MEJDAR terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-white/80">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-mejdar max-w-none">
          <h2 className="text-xl font-bold text-mejdar-navy">1. Acceptance</h2>
          <p className="text-mejdar-gray">
            By using the MEJDAR website or services, you agree to these terms.
            If you do not agree, do not use our services.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">2. Services</h2>
          <p className="text-mejdar-gray">
            MEJDAR provides restaurant ordering, reservation and analytics
            software. Services are provided &ldquo;as is&rdquo; and we reserve
            the right to modify or discontinue services with reasonable notice.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">3. Accounts</h2>
          <p className="text-mejdar-gray">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity under your account.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">4. Payment</h2>
          <p className="text-mejdar-gray">
            Fees are as agreed in your service agreement. All fees are exclusive
            of VAT unless otherwise stated. Late payments may incur interest.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">5. Intellectual property</h2>
          <p className="text-mejdar-gray">
            MEJDAR and its content are protected by copyright and intellectual
            property laws. You may not copy, modify or distribute our software
            or content without written permission.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">6. Limitation of liability</h2>
          <p className="text-mejdar-gray">
            To the maximum extent permitted by law, MEJDAR shall not be liable
            for indirect, incidental, or consequential damages. Our total
            liability shall not exceed the fees paid in the 12 months preceding
            the claim.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">7. Termination</h2>
          <p className="text-mejdar-gray">
            Either party may terminate with 30 days&apos; written notice.
            We may terminate immediately for material breach.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">8. Governing law</h2>
          <p className="text-mejdar-gray">
            These terms are governed by the laws of Malta. Disputes shall be
            subject to the exclusive jurisdiction of Maltese courts.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">9. Changes</h2>
          <p className="text-mejdar-gray">
            We may update these terms from time to time. Continued use of our
            services after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">10. Contact</h2>
          <p className="text-mejdar-gray">
            For questions about these terms, contact us at{" "}
            <span className="text-mejdar-teal">{legal.dpo}</span>.
          </p>
        </div>
      </section>
    </>
  );
}
