"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { brand } from "@/lib/config";

const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MEJDAR. Book a demo or ask us anything about our restaurant ordering platform.",
};

type FormData = {
  name: string;
  business: string;
  email: string;
  phone: string;
  locationCount: string;
  currentMethod: string;
  message: string;
  consent: boolean;
  honeypot: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    business: "",
    email: "",
    phone: "",
    locationCount: "1",
    currentMethod: "",
    message: "",
    consent: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.business.trim()) errs.business = "Business name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Please enter a valid email";
    if (!formData.consent) errs.consent = "You must consent to being contacted";
    if (formData.honeypot) errs.honeypot = "Spam detected";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Simulate submission (no persistence configured)
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (submitted) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg bg-mejdar-limestone p-8">
            <h1 className="text-3xl font-bold text-mejdar-navy">Thank you!</h1>
            <p className="mt-4 text-mejdar-gray">
              We&apos;ve received your enquiry. We&apos;ll get back to you
              within 1 business day.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Ready to take control of your online ordering? Fill in the form
            below and we&apos;ll get back to you within 1 business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-mejdar-navy">
                Full name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal ${
                  errors.name ? "border-red-500" : "border-mejdar-gray-light"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium text-mejdar-navy">
                Business name *
              </label>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal ${
                  errors.business ? "border-red-500" : "border-mejdar-gray-light"
                }`}
              />
              {errors.business && (
                <p className="mt-1 text-xs text-red-600">{errors.business}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-mejdar-navy">
                Work email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal ${
                  errors.email ? "border-red-500" : "border-mejdar-gray-light"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-mejdar-navy">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-mejdar-gray-light px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal"
              />
            </div>

            <div>
              <label htmlFor="locationCount" className="block text-sm font-medium text-mejdar-navy">
                Number of locations
              </label>
              <select
                id="locationCount"
                name="locationCount"
                value={formData.locationCount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-mejdar-gray-light px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal"
              >
                <option value="1">1</option>
                <option value="2-5">2–5</option>
                <option value="6-10">6–10</option>
                <option value="10+">10+</option>
              </select>
            </div>

            <div>
              <label htmlFor="currentMethod" className="block text-sm font-medium text-mejdar-navy">
                Current ordering method
              </label>
              <select
                id="currentMethod"
                name="currentMethod"
                value={formData.currentMethod}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-mejdar-gray-light px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal"
              >
                <option value="">Select...</option>
                <option value="phone">Phone orders only</option>
                <option value="third-party">Third-party platform (Uber Eats, Bolt, etc.)</option>
                <option value="own-website">Own website with ordering</option>
                <option value="none">No online ordering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-mejdar-navy">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-mejdar-gray-light px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-mejdar-teal"
              />
            </div>

            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className={`mt-1 h-4 w-4 rounded border-gray-300 ${
                    errors.consent ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-mejdar-gray">
                  I consent to {brand.name} processing my personal data to
                  respond to my enquiry. I understand I can withdraw consent
                  at any time by contacting {brand.contactEmail}. *
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-600">{errors.consent}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-mejdar-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-mejdar-teal-light disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send enquiry"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
