"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-neutral-900">
      <div className="mx-auto grid h-12 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10">
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                index === 0 &&
                  "text-brand underline decoration-2 underline-offset-[7px]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="justify-self-start p-1 lg:hidden"
        >
          {menuOpen ? (
            <X className="size-5" strokeWidth={1.75} />
          ) : (
            <Menu className="size-5" strokeWidth={1.75} />
          )}
        </button>

        <Link
          href="/"
          aria-label="Wonderlast home"
          className="justify-self-center"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        <div className="hidden items-center justify-self-end gap-6 lg:flex lg:gap-7">
          <Link
            href="#profile"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand"
          >
            <UserRound className="size-4" strokeWidth={1.8} />
            Profile
          </Link>
          <Link
            href="#login"
            className="text-sm font-medium transition-colors hover:text-brand"
          >
            Login
          </Link>
          <Link
            href="#signup"
            className="text-sm font-medium transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>

        <Link
          href="#login"
          className="justify-self-end text-sm font-medium lg:hidden"
        >
          Login
        </Link>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white px-5 pb-5 pt-2 shadow-lg lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-neutral-100 py-3 text-sm font-medium",
                  index === 0 && "text-brand"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 pt-4 text-sm font-medium">
            <Link href="#profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <Link href="#login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link href="#signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
