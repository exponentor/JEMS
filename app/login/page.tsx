"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { ForgotPasswordFlow } from "@/components/auth/ForgotPasswordFlow";
import GithubButton from "@/components/GithubButton";
import Logo from "@/components/Navbar/Logo";

const valueProps = [
  "AI-personalized learning paths",
  "Real mock interviews with feedback",
  "Smart matching to jobs that fit you",
];

/** Shown when a GitHub login is bounced here because no account exists yet. */
function NotRegisteredNotice() {
  const notRegistered = useSearchParams().get("error") === "not_registered";
  if (!notRegistered) return null;
  return (
    <p className="mt-6 rounded-lg border border-orange/20 bg-orange/5 px-3.5 py-3 text-sm text-navy">
      No account is linked to that GitHub yet.{" "}
      <Link href="/signup" className="font-semibold text-orange hover:underline">
        Create an account
      </Link>{" "}
      first.
    </p>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "forgot">("login");
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

        <div className="relative">
          <Logo className="h-8" />
        </div>

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
          <div className="mb-8 lg:hidden">
            <Logo className="h-8" />
          </div>

          {mode === "forgot" ? (
            <ForgotPasswordFlow onBackToLogin={() => setMode("login")} />
          ) : (
            <>
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

              <Suspense fallback={null}>
                <NotRegisteredNotice />
              </Suspense>

              {/* Continue with GitHub */}
              <div className="mt-8">
                <GithubButton intent="login" />
              </div>

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
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs font-medium text-slate hover:underline"
                    >
                      Forgot password?
                    </button>
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
                  aria-busy={loading}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-cta-gradient px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Signing in…" : "Log in"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
