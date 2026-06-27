"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Signup chrome — a single, full-width white screen (no side panel, no
 * gradients). A slim header holds the logo and a "Log in" link; the form
 * sits in a centered, wide container so its fields can lay out in two columns.
 */
export default function SignupShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-navy"
        >
          jems<span className="text-orange">.</span>
        </Link>
        <Link
          href="/login"
          className="ml-auto text-sm font-semibold text-navy transition-colors hover:text-navy/70"
        >
          Log in
        </Link>
      </header>

      <div className="flex flex-1 justify-center px-6 pb-14 pt-2 lg:px-10">
        <div className="w-full max-w-[760px]">{children}</div>
      </div>
    </div>
  );
}
