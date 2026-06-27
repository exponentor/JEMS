"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const valueProps = [
  "AI-personalized learning paths",
  "Real mock interviews with feedback",
  "Smart matching to jobs that fit you",
];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });
    setLoading(false);
    if (!res || res.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/student/dashboard");
    router.refresh();
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-navy via-navy to-[#1f2937] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-slate/20 blur-3xl" />
        </div>

        <Link href="/" className="relative text-2xl font-extrabold tracking-tight">
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

          {/* Continue with GitHub */}
          <button
            type="button"
            onClick={() =>
              signIn("github", { callbackUrl: "/student/dashboard" })
            }
            className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full border border-lightgray bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-[#f9fafb]"
          >
            <GithubIcon />
            Continue with GitHub
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-mediumgray">
            <span className="h-px flex-1 bg-lightgray" />
            or sign in with email
            <span className="h-px flex-1 bg-lightgray" />
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
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
              disabled={loading}
              className="mt-1 w-full rounded-full bg-cta-gradient px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
