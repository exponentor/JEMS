"use client";

import Link from "next/link";

interface LogoProps {
  /** Optional side-effect on click (e.g. close the mobile menu). */
  onClick?: () => void;
}

/** The "jems." wordmark — links to home. */
export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="jems home"
      className="select-none text-2xl font-extrabold tracking-tight text-navy transition-opacity hover:opacity-80"
    >
      jems<span className="text-orange">.</span>
    </Link>
  );
}
