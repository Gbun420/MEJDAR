import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold text-mejdar-teal">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-mejdar-navy">
          Page not found
        </h2>
        <p className="mt-4 text-mejdar-gray">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-mejdar-teal px-6 py-3 text-base font-semibold text-white transition hover:bg-mejdar-teal-light"
        >
          Back to {brand.name}
        </Link>
      </div>
    </section>
  );
}
