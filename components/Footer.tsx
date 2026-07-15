"use client";

import Image from "next/image";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "For Students", href: "#get-started" },
      { label: "For Companies", href: "#get-started" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Guides", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Twitter / X", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

/** Site footer — always visible (authenticated and not). */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top: brand + newsletter */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Image src="/logo.png" alt="Jems" width={782} height={697} className="h-8 w-auto" />
            <h2 className="mt-6 text-lg font-bold">Stay Updated</h2>
            <p className="mt-2 text-sm text-lightgray">
              Get weekly tips to land your dream job.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mediumgray outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/30 sm:w-64"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-cta-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.03]"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-lightgray transition-colors hover:text-orange"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-mediumgray sm:flex-row">
          <p>© 2026 Jems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
