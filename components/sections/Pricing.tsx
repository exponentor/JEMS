"use client";

import { Eyebrow, revealClass, useReveal } from "./_shared";

interface PricingProps {
  onStartFree?: () => void;
  onStartPro?: () => void;
}

const freeFeatures = [
  "Basic profile",
  "1 resume version",
  "2 mock interviews / month",
  "Job recommendations (limited)",
  "Community support",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited resumes",
  "Unlimited mock interviews",
  "Personalized learning path",
  "1-on-1 career mentor (monthly)",
  "Priority job matching",
];

function Check({ tone }: { tone: "gray" | "orange" }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        tone === "orange"
          ? "bg-orange/15 text-orange"
          : "bg-emerald/15 text-emerald"
      }`}
    >
      ✓
    </span>
  );
}

/** Pricing — two tiers, unauthenticated visitors only. */
export default function Pricing({ onStartFree, onStartPro }: PricingProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);

  return (
    <section id="pricing" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-11">
        <div className={`mx-auto max-w-2xl text-center ${r}`}>
          <Eyebrow align="center">Simple Pricing</Eyebrow>
          <h2 className="mt-11 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Plans for Every Goal
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            Start free. Upgrade anytime.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-center gap-6 md:grid-cols-2">
          {/* Free */}
          <div
            style={{ transitionDelay: visible ? "120ms" : "0ms" }}
            className={`flex h-full flex-col rounded-3xl border border-lightgray bg-white/90 p-8 shadow-[var(--shadow-soft)] backdrop-blur-sm ${r}`}
          >
            <h3 className="text-lg font-bold text-navy">Free</h3>
            <p className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-navy">$0</span>
              <span className="pb-1 text-sm text-mediumgray">/month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-navy">
                  <Check tone="gray" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onStartFree}
              className="mt-8 w-full rounded-full border border-navy px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Start Free
            </button>
          </div>

          {/* Pro (highlighted) */}
          <div
            style={{ transitionDelay: visible ? "220ms" : "0ms" }}
            className={`relative flex h-full flex-col rounded-3xl border-2 border-orange bg-white p-8 shadow-[var(--shadow-cta)] md:-translate-y-2 ${r}`}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta-gradient px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-[var(--shadow-soft)]">
              Most Popular
            </span>
            <h3 className="text-lg font-bold text-orange">Pro</h3>
            <p className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-navy">$99</span>
              <span className="pb-1 text-sm text-mediumgray">/month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-navy">
                  <Check tone="orange" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onStartPro}
              className="mt-8 w-full rounded-full bg-cta-gradient px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02]"
            >
              Start Pro
            </button>
          </div>
        </div>

        <p
          className={`mt-8 text-center text-sm text-mediumgray ${r}`}
          style={{ transitionDelay: visible ? "320ms" : "0ms" }}
        >
          Cancel anytime. No contracts.
        </p>
      </div>
    </section>
  );
}
