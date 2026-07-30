"use client";

import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { brand } from "@/lib/config";
import { AnimateInView } from "@/components/AnimateInView";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <section className="bg-mejdar-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mejdar-terracotta">
            Get in touch
          </p>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Ready to take control of your online ordering? Fill in the form
            and we will get back to you within 1 business day.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <AnimateInView className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl bg-mejdar-limestone p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mejdar-teal/10">
                    <Send className="h-6 w-6 text-mejdar-teal" />
                  </div>
                  <h2 className="mt-6 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">
                    Message sent
                  </h2>
                  <p className="mt-3 text-mejdar-gray">
                    Thank you for your enquiry. We will get back to you within
                    1 business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Full name <span className="text-mejdar-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="business"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Business name <span className="text-mejdar-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        required
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Work email <span className="text-mejdar-terracotta">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="locations"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Number of locations
                      </label>
                      <select
                        id="locations"
                        name="locations"
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      >
                        <option value="">Select...</option>
                        <option>1</option>
                        <option>2–5</option>
                        <option>6–10</option>
                        <option>10+</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="method"
                        className="block text-sm font-medium text-mejdar-navy"
                      >
                        Current ordering method
                      </label>
                      <select
                        id="method"
                        name="method"
                        className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                      >
                        <option value="">Select...</option>
                        <option>Phone orders only</option>
                        <option>
                          Third-party platform (Uber Eats, Bolt, etc.)
                        </option>
                        <option>Own website with ordering</option>
                        <option>No online ordering</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-mejdar-navy"
                    >
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1.5 block w-full rounded-lg border border-mejdar-navy/15 px-3.5 py-2.5 text-sm text-mejdar-navy outline-none transition focus:border-mejdar-teal focus:ring-2 focus:ring-mejdar-teal/20"
                    />
                  </div>
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="mt-5">
                    <label className="flex items-start gap-3 text-sm text-mejdar-gray-dark">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 rounded border-mejdar-navy/20 text-mejdar-teal focus:ring-mejdar-teal"
                      />
                      I consent to {brand.name} processing my personal data to
                      respond to my enquiry. I understand I can withdraw consent
                      at any time by contacting hello@mejdar.com.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mejdar-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-mejdar-teal-light disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send enquiry"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </AnimateInView>

            <AnimateInView delay={0.15} className="lg:col-span-2">
              <div className="rounded-2xl bg-mejdar-limestone p-8">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-mejdar-navy">
                  Other ways to reach us
                </h3>
                <div className="mt-4 space-y-4 text-sm text-mejdar-gray-dark">
                  <div>
                    <p className="font-medium text-mejdar-navy">Email</p>
                    <a
                      href="mailto:hello@mejdar.com"
                      className="text-mejdar-teal hover:underline"
                    >
                      hello@mejdar.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-mejdar-navy">Phone</p>
                    <a
                      href="tel:+35621234567"
                      className="text-mejdar-teal hover:underline"
                    >
                      +356 2123 4567
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-mejdar-navy">Address</p>
                    <p>123 Harbour Street</p>
                    <p>Valletta, Malta</p>
                  </div>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  );
}
