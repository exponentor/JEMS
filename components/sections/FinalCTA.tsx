"use client";

import { revealClass, useReveal } from "./_shared";

interface FinalCTAProps {
  onStartLearning?: () => void;
  onForCompanies?: () => void;
}

/** Final conversion push before the footer, unauthenticated visitors only. */
export default function FinalCTA({
  onStartLearning,
  onForCompanies,
}: FinalCTAProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);

  return (
    <section id="get-started" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy to-[#1f2937] px-6 py-16 text-center shadow-[var(--shadow-card)] sm:px-12 sm:py-20 ${r}`}
        >
          {/* Subtle decorative glow inside the panel */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-slate/20 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to Bridge the Gap?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-lightgray">
              Join 500+ students who&apos;ve already transformed their careers.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onStartLearning}
                className="w-full rounded-full bg-cta-gradient px-8 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Start Learning Free
              </button>
              <button
                type="button"
                onClick={onForCompanies}
                className="w-full rounded-full border-2 border-white/70 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-navy sm:w-auto"
              >
                I&apos;m a Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
