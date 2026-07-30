import type { Metadata } from "next";
import { legal } from "@/lib/config";

export const metadata: Metadata = {
  title: "Data Processing Information",
  description:
    "How MEJDAR processes personal data under the GDPR.",
};

export default function DataProcessingPage() {
  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Data Processing Information
          </h1>
          <p className="mt-4 text-white/80">
            How we handle personal data under the GDPR
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-mejdar max-w-none">
          <h2 className="text-xl font-bold text-mejdar-navy">
            1. Data Controller
          </h2>
          <p className="text-mejdar-gray">
            {legal.companyName} ({legal.companyRegNo})
            <br />
            {legal.registeredAddress}
            <br />
            DPO: {legal.dpo}
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            2. Personal data we process
          </h2>
          <p className="text-mejdar-gray">
            As a data controller for the MEJDAR website, we process:
          </p>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>Contact form data (name, email, phone, business details)</li>
            <li>Analytics data (page views, browser info) — only with consent</li>
          </ul>
          <p className="text-mejdar-gray">
            As a data processor for restaurant customers using MEJDAR
            (restaurants are the data controllers), we process:
          </p>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>Customer order data (name, address, order details)</li>
            <li>Reservation data (name, date, party size, contact info)</li>
            <li>Account data (email, password hash)</li>
            <li>Payment data (processed by payment providers, not stored by us)</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            3. Purpose and legal basis
          </h2>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>
              <strong>Contact forms:</strong> Legitimate interest (responding to
              enquiries) + consent (marketing communications)
            </li>
            <li>
              <strong>Analytics:</strong> Consent (opt-in only)
            </li>
            <li>
              <strong>Order processing:</strong> Performance of a contract
              (restaurant&apos;s customer order)
            </li>
            <li>
              <strong>Legal obligations:</strong> Tax, accounting and regulatory
              compliance
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            4. Data retention
          </h2>
          <ul className="text-mejdar-gray list-disc pl-6">
            <li>Contact form submissions: 12 months</li>
            <li>Analytics data: Aggregated, retained indefinitely</li>
            <li>Restaurant order data: As configured by the restaurant</li>
            <li>Account data: Duration of account + 30 days</li>
          </ul>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            5. Data processing agreements
          </h2>
          <p className="text-mejdar-gray">
            We maintain data processing agreements with all sub-processors.
            Current sub-processors include hosting providers and email delivery
            services.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            6. Your rights
          </h2>
          <p className="text-mejdar-gray">
            Under the GDPR you have the right to access, rectify, erase,
            restrict processing, port your data, and object to processing.
            Contact {legal.dpo} to exercise these rights.
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            7. International transfers
          </h2>
          <p className="text-mejdar-gray">
            We do not transfer personal data outside the EEA unless adequate
            safeguards are in place (Standard Contractual Clauses or adequacy
            decisions).
          </p>

          <h2 className="mt-8 text-xl font-bold text-mejdar-navy">
            8. Complaints
          </h2>
          <p className="text-mejdar-gray">
            You have the right to lodge a complaint with the Maltese
            Information and Data Protection Commissioner (IDPC) at
            idpc.org.mt.
          </p>
        </div>
      </section>
    </>
  );
}
