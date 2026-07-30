import type { Metadata } from "next";
import { AnimateInView } from "@/components/AnimateInView";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MEJDAR terms of service for website and service usage.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-white/60">Last updated: {legal.lastUpdated}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateInView className="prose prose-gray max-w-none">
            <h2>1. Acceptance</h2>
            <p>
              By using the MEJDAR website or services, you agree to these terms.
              If you do not agree, do not use our services.
            </p>
            <h2>2. Services</h2>
            <p>
              MEJDAR provides restaurant ordering, reservation and analytics
              software. Services are provided &ldquo;as is&rdquo; and we reserve
              the right to modify or discontinue services with reasonable notice.
            </p>
            <h2>3. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity under your account.
            </p>
            <h2>4. Payment</h2>
            <p>
              Fees are as agreed in your service agreement. All fees are exclusive
              of VAT unless otherwise stated. Late payments may incur interest.
            </p>
            <h2>5. Intellectual property</h2>
            <p>
              MEJDAR and its content are protected by copyright and intellectual
              property laws. You may not copy, modify or distribute our software
              or content without written permission.
            </p>
            <h2>6. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, MEJDAR shall not be liable
              for indirect, incidental, or consequential damages. Our total
              liability shall not exceed the fees paid in the 12 months preceding
              the claim.
            </p>
            <h2>7. Termination</h2>
            <p>
              Either party may terminate with 30 days&apos; written notice. We
              may terminate immediately for material breach.
            </p>
            <h2>8. Governing law</h2>
            <p>
              These terms are governed by the laws of Malta. Disputes shall be
              subject to the exclusive jurisdiction of Maltese courts.
            </p>
            <h2>9. Changes</h2>
            <p>
              We may update these terms from time to time. Continued use of our
              services after changes constitutes acceptance of the new terms.
            </p>
            <h2>10. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href={`mailto:${legal.dpo}`}>{legal.dpo}</a>.
            </p>
          </AnimateInView>
        </div>
      </section>
    </>
  );
}
