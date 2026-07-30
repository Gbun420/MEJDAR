import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-dm-sans)] text-7xl font-bold text-mejdar-teal/20">
          404
        </h1>
        <h2 className="mt-2 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">
          Page not found
        </h2>
        <p className="mt-4 text-mejdar-gray">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-mejdar-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-mejdar-teal-light"
        >
          Back to MEJDAR
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
