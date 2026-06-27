"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const preLoginLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/** Desktop center links + right auth buttons for unauthenticated visitors. */
export default function PreLoginNavbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden flex-1 justify-center md:flex">
        <ul className="flex items-center gap-1">
          {preLoginLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-slate" : "text-navy hover:text-slate"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        <Link
          href="/login"
          className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-[#f9fafb]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-cta-gradient px-5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.03]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}
