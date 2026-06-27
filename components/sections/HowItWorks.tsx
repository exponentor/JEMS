"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  num: string;
  title: string;
  desc: string;
  /** Node tone — progresses from slate (start) to orange (goal). */
  tone: "slate" | "orange";
  final?: boolean;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Learn Your Way",
    desc: "AI adapts to your learning style. Examples, visuals, hands-on — whatever works for you.",
    tone: "slate",
  },
  {
    num: "02",
    title: "Master the Skills",
    desc: "Get an ATS-optimized resume. Practice real interviews. Get AI feedback like actual recruiters.",
    tone: "slate",
  },
  {
    num: "03",
    title: "Get Matched",
    desc: "Find jobs that fit YOU. See match percentages. Know what skills to learn.",
    tone: "orange",
  },
  {
    num: "04",
    title: "Land the Job",
    desc: "Interview. Negotiate. Celebrate your new role.",
    tone: "orange",
    final: true,
  },
];

function nodeClasses(step: Step): string {
  if (step.final) {
    return "border-transparent bg-cta-gradient text-white shadow-[var(--shadow-cta)]";
  }
  return step.tone === "orange"
    ? "border-orange bg-white text-orange"
    : "border-slate bg-white text-slate";
}

/**
 * How It Works — shown only to unauthenticated visitors below the problem
 * section. A connected journey timeline (horizontal on desktop, vertical on
 * mobile) rather than cards, to convey progression from learning to hired.
 */
export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = `transition-all duration-700 ease-out motion-reduce:transition-none ${
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

  return (
    <section id="how-it-works" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 sm:py-16 lg:px-8">
        {/* Header — centered dash-line eyebrow */}
        <div className={`mx-auto max-w-2xl text-center ${reveal}`}>
          <div className="flex items-center mb-11 justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-orange" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
              The Journey
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-orange" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            From Learning to Landing Your Dream Job
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            Four simple steps to close the gap.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {/* Connector line — vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-slate to-orange md:left-[12.5%] md:right-[12.5%] md:top-6 md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
          />

          {steps.map((step, i) => (
            <li
              key={step.num}
              style={{ transitionDelay: visible ? `${i * 140 + 120}ms` : "0ms" }}
              className={`relative flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center ${reveal}`}
            >
              {/* Node */}
              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold ${nodeClasses(
                  step,
                )}`}
              >
                {step.num}
              </div>

              {/* Content */}
              <div className="md:mt-6 md:px-2">
                <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-mediumgray">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Bottom stat */}
        <div
          style={{ transitionDelay: visible ? "720ms" : "0ms" }}
          className={`mt-16 flex justify-center ${reveal}`}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/5 px-5 py-2.5 text-sm font-medium text-navy">
            <span className="text-base font-extrabold text-emerald">85%</span>
            land jobs within 3–4 months
          </p>
        </div>
      </div>
    </section>
  );
}
