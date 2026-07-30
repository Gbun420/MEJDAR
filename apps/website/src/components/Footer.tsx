import Link from "next/link";
import { brand, navigation } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-mejdar-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold">{brand.name}</h3>
            <p className="mt-2 text-sm text-white/70">{brand.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Product
            </h4>
            <ul className="mt-3 space-y-2">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Company
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/70 transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-sm text-white/70 transition hover:text-white">
                  Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Legal
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-white/70 transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-white/70 transition hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/70 transition hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-processing" className="text-sm text-white/70 transition hover:text-white">
                  Data Processing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/50">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
