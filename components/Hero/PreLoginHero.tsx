"use client";

import { Badge } from "@/components/ui/badge";

interface PreLoginHeroProps {
  onStartLearning?: () => void;
  onForCompanies?: () => void;
}

/** Marketing hero shown to unauthenticated visitors. */
export default function PreLoginHero({
  onStartLearning,
  onForCompanies,
}: PreLoginHeroProps) {
  return (
    <section className="relative overflow-hidden bg-transparent">
      {/* ── Layered decorative background ───────────────────────────── */}
      {/* Sits on the shared page canvas (bg-page on <body>). Mobile stays
          clean; decorative layers only appear from md (>=768px) up. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Desktop / tablet decorations only (>=md) */}
        <div className="hidden md:block">
          {/* Soft multi-color spotlight glow */}
          <div className="absolute inset-0 bg-hero-spotlight" />
          {/* Dotted texture, masked to fade at the edges */}
          <div className="absolute inset-0 bg-hero-dots" />

          {/* Blurred color blobs for depth (behind the crisp circles) */}
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange/15 blur-3xl animate-float" />
          <div className="absolute -right-24 top-20 h-[28rem] w-[28rem] rounded-full bg-slate/15 blur-3xl animate-float-slow" />
          <div className="absolute bottom-[-6rem] left-1/4 h-80 w-80 rounded-full bg-gold/15 blur-3xl animate-float" />

          {/* Crisp accent circles (they read as premium rings) */}
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-slate/10 animate-float-slow" />
          <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-slate/5 animate-float" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold/5 animate-float-slow" />
          <div className="absolute right-1/4 top-16 h-40 w-40 rounded-full ring-1 ring-orange/15" />
          <div className="absolute left-[12%] bottom-24 h-24 w-24 rounded-full ring-1 ring-slate/20 animate-pulse-glow" />
          <div className="absolute right-[18%] bottom-16 h-3 w-3 rounded-full bg-emerald/60 animate-pulse-glow" />
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <Badge
          variant="outline"
          className="mb-6 gap-2 rounded-full border-gold/40 bg-white/80 px-4 py-4 text-sm font-medium text-navy shadow-[var(--shadow-soft)] backdrop-blur-sm"
        >
          ✨ AI-Powered Career Acceleration
        </Badge>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Bridge the Gap Between{" "}
          <span className="bg-primary-gradient bg-clip-text text-transparent">
            Learning &amp; Hiring
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-mediumgray">
          Get job-ready with personalized AI learning, ace interviews with mock
          practice, and land offers from companies seeking your skills.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
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
            className="w-full rounded-full border-2 border-slate bg-white/70 px-8 py-3.5 text-base font-semibold text-slate backdrop-blur-sm transition-colors hover:bg-slate hover:text-white sm:w-auto"
          >
            For Companies
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-mediumgray">
          <span>
            <span className="font-bold text-navy">500+</span> Students
          </span>
          <span className="h-1 w-1 rounded-full bg-lightgray" />
          <span>
            <span className="font-bold text-navy">50</span> Companies
          </span>
          <span className="h-1 w-1 rounded-full bg-lightgray" />
          <span>
            <span className="font-bold text-emerald">85%</span> Placement Rate
          </span>
        </div>
      </div>
    </section>
  );
}
