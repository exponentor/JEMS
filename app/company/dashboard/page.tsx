import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Navbar/Logo";

export const metadata: Metadata = {
  title: "Company Dashboard — Jems",
};

/**
 * Placeholder company dashboard — the signup flow redirects here on success.
 * Replace with the real dashboard when it's built.
 */
export default function CompanyDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo className="h-8" />
      <span className="mt-8 inline-flex items-center rounded-full bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
        Company created
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy">
        Your company dashboard
      </h1>
      <p className="mt-2 max-w-md text-mediumgray">
        This is a placeholder. Post jobs, browse candidates and track your
        hiring funnel here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-lightgray px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-[#f9fafb]"
      >
        Back to home
      </Link>
    </main>
  );
}
