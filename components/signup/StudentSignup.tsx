"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import GithubButton from "@/components/GithubButton";
import {
  EXPERIENCE_LEVELS,
  LEARNING_STYLES,
  TARGET_ROLES,
  YEARS_OPTIONS,
} from "./data";
import { PasswordField } from "./PasswordField";
import { ProgressBar } from "./ProgressBar";
import { OptionCards, SelectField, TextInput } from "./primitives";
import { evaluatePassword, isEmailLike, isPhoneLike } from "./password";
import { StepCarousel } from "./StepCarousel";
import { SuccessPanel } from "./SuccessPanel";
import { VerifiableField } from "./VerifiableField";

const ROLE_OPTIONS = [
  ...TARGET_ROLES.map((r) => ({ value: r, label: r })),
  { value: "Other", label: "Other (type your own)" },
];

const PRIMARY_BTN =
  "rounded-lg bg-[#6366f1] px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(99,102,241,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4f46e5] hover:shadow-[0_6px_16px_rgba(99,102,241,0.28)]";
const BACK_BTN =
  "rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)]";

interface StudentSignupProps {
  onBack: () => void;
}

export default function StudentSignup({ onBack }: StudentSignupProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);

  // Page 1 — basic info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Page 2 — career setup
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [learning, setLearning] = useState("");
  const [years, setYears] = useState("");

  const [redirectIn, setRedirectIn] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // The user's own info — barred from appearing anywhere in the password.
  const forbiddenTerms = [name, email, phone];

  const emailOk = isEmailLike(email);
  const passwordOk = evaluatePassword(password, forbiddenTerms).acceptable;
  const confirmOk = confirm.length > 0 && confirm === password;
  const phoneProvided = phone.trim().length > 0;
  const targetRole = role === "Other" ? roleOther.trim() : role;

  const page1Ok =
    emailOk &&
    emailVerified &&
    passwordOk &&
    confirmOk &&
    name.trim().length > 0 &&
    (!phoneProvided || phoneVerified);

  const page2Ok = !!level && !!targetRole && !!learning && !!years;

  const goNext = () => {
    if (page1Ok) {
      setStep(1);
      setTried(false);
    } else {
      setTried(true);
    }
  };

  const create = async () => {
    if (!page2Ok) {
      setTried(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          experienceLevel: level,
          targetRole,
          learningStyle: learning,
          yearsOfExperience: years,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(data.error ?? "Could not create your account.");
        return;
      }
      // Account created — sign the new student in, then show the success step.
      await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      setStep(2);
      setTried(false);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (step !== 2) return;
    if (redirectIn <= 0) {
      router.push("/student/dashboard");
      return;
    }
    const t = setTimeout(() => setRedirectIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, redirectIn, router]);

  return (
    <div className="signup-accent" data-accent="slate">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-mediumgray transition-colors hover:text-navy"
      >
        ← Different account type
      </button>

      {step < 2 && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-mediumgray">Step {step + 1} of 3</p>
        </div>
      )}

      <ProgressBar current={step} total={3} />

      <div className="mt-5">
        <StepCarousel step={step}>
          {/* ── Page 1 — Basic details (two-column grid) ────────── */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-mediumgray sm:col-span-2">
              Basic details
            </p>

            <TextInput
              id="st-name"
              label="Full Name"
              autoComplete="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              valid={name.trim().length > 0}
              error={tried && name.trim().length === 0 ? "Full name is required." : null}
            />

            <VerifiableField
              id="st-email"
              label="Email Address"
              type="email"
              channel="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(v) => {
                setEmail(v);
                setEmailVerified(false);
              }}
              verified={emailVerified}
              onVerified={() => setEmailVerified(true)}
              canVerify={emailOk}
              error={
                tried && !emailOk
                  ? "Enter a valid email address."
                  : tried && !emailVerified
                    ? "Please verify your email."
                    : null
              }
            />

            <div className="sm:col-span-2">
              <PasswordField
                id="st-password"
                label="Password"
                value={password}
                onChange={setPassword}
                showMeter
                forbiddenTerms={forbiddenTerms}
                error={tried && !passwordOk ? "Choose a stronger password." : null}
              />
            </div>

            <PasswordField
              id="st-confirm"
              label="Confirm Password"
              value={confirm}
              onChange={setConfirm}
              valid={confirmOk}
              error={
                (tried || confirm.length > 0) && !confirmOk
                  ? "Passwords don't match."
                  : null
              }
            />

            <VerifiableField
              id="st-phone"
              label="Phone Number"
              type="tel"
              channel="phone"
              optional
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(v) => {
                setPhone(v);
                setPhoneVerified(false);
              }}
              verified={phoneVerified}
              onVerified={() => setPhoneVerified(true)}
              canVerify={isPhoneLike(phone)}
              error={
                tried && phoneProvided && !phoneVerified
                  ? "Verify your number, or clear it to skip."
                  : null
              }
            />

            <div className="pt-1 sm:col-span-2">
              <GithubButton intent="signup" className="rounded-lg" />

              <div className="my-4 flex items-center gap-3 text-xs text-mediumgray">
                <span className="h-px flex-1 bg-lightgray" />
                or with email
                <span className="h-px flex-1 bg-lightgray" />
              </div>

              <button type="button" onClick={goNext} className={`w-full ${PRIMARY_BTN}`}>
                Next
              </button>
              <p className="mt-3 text-center text-sm text-mediumgray">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* ── Page 2 — Career info (two-column grid) ──────────── */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-mediumgray sm:col-span-2">
              Career info
            </p>

            <div className="sm:col-span-2">
              <OptionCards
                label="What's your current experience level?"
                options={EXPERIENCE_LEVELS}
                value={level}
                onChange={setLevel}
                columns={2}
                error={tried && !level ? "Select your experience level." : null}
              />
            </div>

            <SelectField
              id="st-role"
              label="What role do you want?"
              value={role}
              onChange={setRole}
              options={ROLE_OPTIONS}
              placeholder="Select a role"
              error={tried && !role ? "Select a target role." : null}
            />
            <SelectField
              id="st-years"
              label="Years of experience"
              value={years}
              onChange={setYears}
              options={YEARS_OPTIONS}
              placeholder="Select"
              error={tried && !years ? "Select your years of experience." : null}
            />
            {role === "Other" && (
              <div className="sm:col-span-2">
                <TextInput
                  id="st-role-other"
                  label="Your target role"
                  placeholder="e.g. Machine Learning Engineer"
                  value={roleOther}
                  onChange={(e) => setRoleOther(e.target.value)}
                  valid={roleOther.trim().length > 0}
                  error={tried && !roleOther.trim() ? "Tell us the role you want." : null}
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <OptionCards
                label="How do you learn best?"
                options={LEARNING_STYLES}
                value={learning}
                onChange={setLearning}
                columns={2}
                error={tried && !learning ? "Pick how you learn best." : null}
              />
            </div>

            {submitError && (
              <p className="rounded-lg bg-orange/5 px-3 py-2 text-sm text-orange sm:col-span-2">
                {submitError}
              </p>
            )}

            <div className="flex items-center gap-3 pt-1 sm:col-span-2">
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setTried(false);
                }}
                className={BACK_BTN}
              >
                Back
              </button>
              <button
                type="button"
                onClick={create}
                disabled={submitting}
                aria-busy={submitting}
                className={`flex flex-1 items-center justify-center gap-2 ${PRIMARY_BTN} disabled:opacity-60`}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Creating…" : "Create Account"}
              </button>
            </div>
          </div>

          {/* ── Page 3 — Success ────────────────────────────────── */}
          <SuccessPanel
            title="Welcome to Jems!"
            message="Your account is ready. Let's get you job-ready."
            ctaLabel="Start exploring"
            onCta={() => router.push("/student/dashboard")}
            redirectIn={redirectIn}
          />
        </StepCarousel>
      </div>
    </div>
  );
}
