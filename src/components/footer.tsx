import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0c0b0b] text-white">
      <div className="mx-auto max-w-300 px-6 pt-14 pb-8 lg:px-10 lg:pt-16">
        <Link href="/" aria-label="Wanderlast home" className="inline-block">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-10 w-auto brightness-0 invert lg:h-12"
          />
        </Link>
        <p className="mt-3 max-w-70 text-[10px] leading-relaxed text-white/50 lg:text-xs">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:mt-12 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase">
              Newsletter
            </h3>
            <p className="mt-2 max-w-60 text-[10px] leading-relaxed text-white/50">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-4 flex h-10 w-full max-w-62.5 bg-[#373737]">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 text-[10px] text-white outline-none placeholder:text-white/60"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="grid w-10 place-items-center text-white transition-colors hover:text-brand"
              >
                <ArrowRight className="size-3.5" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 lg:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/80 transition-colors hover:text-brand lg:text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 lg:space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/80 transition-colors hover:text-brand lg:text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2.5 text-[10px] text-white/80 lg:space-y-3 lg:text-[11px]">
              <li>
                <a
                  href="tel:+7869011622"
                  className="transition-colors hover:text-brand"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlast.com"
                  className="transition-colors hover:text-brand"
                >
                  info@wanderlast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-white/45">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-white/80">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderlast on X"
              className="transition-colors hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderlast on LinkedIn"
              className="transition-colors hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderlast on Instagram"
              className="transition-colors hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
