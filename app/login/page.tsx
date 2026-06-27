"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { demoAccounts } from "@/components/LoginModal";

const valueProps = [
  "AI-personalized learning paths",
  "Real mock interviews with feedback",
  "Smart matching to jobs that fit you",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = demoAccounts.find(
      (a) => a.email === email.trim() && a.password === password,
    );
    if (!match) {
      setError("Invalid credentials. Try a demo account below.");
      return;
    }
    if (match.role === "admin") {
      setError("Admin console isn't part of this demo.");
      return;
    }
    // Route each demo account to its own dashboard.
    router.push(
      match.role === "company" ? "/company/dashboard" : "/student/dashboard",
    );
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-navy via-navy to-[#1f2937] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-slate/20 blur-3xl" />
        </div>

        <Link
          href="/"
          className="relative text-2xl font-extrabold tracking-tight"
        >
          jems<span className="text-orange">.</span>
        </Link>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Your dream job is closer than you think.
          </h1>
          <ul className="mt-8 space-y-4">
            {valueProps.map((v) => (
              <li key={v} className="flex items-center gap-3 text-lightgray">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta-gradient text-xs font-bold text-white">
                  ✓
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <blockquote className="text-sm leading-7 text-lightgray">
            “I was stuck for 8 months. Jems got me job-ready in 4 weeks. Now
            earning 40% more.”
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-white">
            Priya Sharma{" "}
            <span className="font-normal text-mediumgray">· Hired at Google</span>
          </figcaption>
        </figure>
      </aside>

      {/* Right — login form */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-8 inline-block text-2xl font-extrabold tracking-tight text-navy lg:hidden"
          >
            jems<span className="text-orange">.</span>
          </Link>

          <h2 className="text-2xl font-extrabold tracking-tight text-navy">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-mediumgray">
            New to Jems?{" "}
            <Link
              href="/signup"
              className="font-semibold text-orange hover:underline"
            >
              Create an account
            </Link>
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-navy"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="w-full rounded-lg border border-lightgray px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-slate focus:ring-2 focus:ring-slate/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-navy">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-slate hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full rounded-lg border border-lightgray px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-slate focus:ring-2 focus:ring-slate/20"
                placeholder="••••••••"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-mediumgray">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-lightgray accent-orange"
              />
              Remember me
            </label>

            {error && (
              <p className="rounded-lg bg-orange/5 px-3 py-2 text-sm text-orange">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-cta-gradient px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02]"
            >
              Log in
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 border-t border-lightgray pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mediumgray">
              Quick demo login
            </p>
            <div className="flex flex-col gap-2">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword(a.password);
                    setError(null);
                  }}
                  className="flex items-center justify-between rounded-lg border border-lightgray px-3 py-2 text-left text-sm transition-colors hover:bg-[#f9fafb]"
                >
                  <span className="font-medium capitalize text-navy">
                    {a.role}
                  </span>
                  <span className="text-xs text-mediumgray">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
