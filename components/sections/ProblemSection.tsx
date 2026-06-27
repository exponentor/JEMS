"use client";

import { Eyebrow, revealClass, useReveal } from "./_shared";

interface Problem {
  index: string;
  stat: string;
  meaning: string;
  explanation: string;
  /** Tailwind bg class for the top accent bar. */
  accent: string;
}

const problems: Problem[] = [
  {
    index: "01",
    stat: "73% of graduates",
    meaning: "lack job-ready skills",
    explanation:
      "Universities teach theory. Companies need practical skills. Students spend 4 years learning disconnected from what actually matters in the job market.",
    accent: "bg-orange",
  },
  {
    index: "02",
    stat: "6–12 months",
    meaning: "wasted on skill mismatch",
    explanation:
      "Students graduate, apply for jobs, realize they don't have the right skills, then scramble to upskill. Companies wait months for quality candidates. Everyone loses.",
    accent: "bg-gold",
  },
  {
    index: "03",
    stat: "$15K",
    meaning: "per bad hire for companies",
    explanation:
      "Companies spend millions recruiting. Bad hires cost time, money, and team morale. Students waste tuition on irrelevant skills. The system is broken and expensive.",
    accent: "bg-emerald",
  },
];

/**
 * Problem section — shown only to unauthenticated visitors below the hero.
 * Three stat-led columns and a dark navy CTA panel. Reveals on scroll.
 */
export default function ProblemSection() {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);

  return (
    <section id="problem" ref={ref} className="bg-transparent">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-15">
        {/* Header — left-aligned editorial eyebrow with a dash line */}
        <div className={`max-w-2xl ${r}`}>
          <Eyebrow>The Real Problem</Eyebrow>
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Why Most Students Struggle to Get Hired
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            Education and industry expectations are completely disconnected.
            Students graduate unprepared. Companies can&apos;t find skilled
            talent. It&apos;s a broken system we&apos;re fixing.
          </p>
        </div>

        {/* Three problems */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={p.index}
              style={{ transitionDelay: visible ? `${i * 120 + 120}ms` : "0ms" }}
              className={r}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-lightgray bg-white p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                {/* Top accent bar */}
                <span
                  className={`absolute inset-x-0 top-0 h-1 ${p.accent}`}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold tracking-widest text-lightgray transition-colors group-hover:text-mediumgray">
                  {p.index}
                </span>
                <p className="mt-5 text-3xl font-extrabold tracking-tight text-orange sm:text-4xl">
                  {p.stat}
                </p>
                <p className="mt-2 text-lg font-bold text-navy">{p.meaning}</p>
                <p className="mt-4 text-sm leading-7 text-mediumgray">
                  {p.explanation}
                </p>
              </article>
            </div>
          ))}
        </div>

        {/* Bottom CTA panel */}
        <div
          style={{ transitionDelay: visible ? "480ms" : "0ms" }}
          className={`mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#1f2937] px-8 py-12 text-center sm:px-12 sm:py-14 ${r}`}
        >
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            The gap is real.{" "}
            <span className="bg-cta-gradient bg-clip-text text-transparent">
              The solution is Jems.
            </span>
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-lightgray">
            We&apos;re bridging this gap with AI-powered personalization, real
            interview practice, and smart matching.
          </p>
          <a
            href="#how-it-works"
            className="mt-7 inline-flex items-center rounded-full bg-cta-gradient px-7 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.03]"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
