"use client";

import { Eyebrow, revealClass, useReveal } from "./_shared";

interface Feature {
  num: string;
  title: string;
  desc: string;
  accent: string;
}

const features: Feature[] = [
  {
    num: "01",
    title: "ATS-Optimized Resume",
    desc: "Build resumes that pass ATS systems and catch recruiter attention. One-click optimization.",
    accent: "text-orange",
  },
  {
    num: "02",
    title: "AI Mock Interviews",
    desc: "Practice real interviews. Get feedback on clarity, confidence, technical accuracy. Interview-ready in weeks.",
    accent: "text-slate",
  },
  {
    num: "03",
    title: "Smart Job Matching",
    desc: "Find opportunities that fit YOUR skills. See match scores. Know exactly what to learn to land them.",
    accent: "text-orange",
  },
  {
    num: "04",
    title: "Personalized Learning",
    desc: "Learn in YOUR style. Visual, hands-on, example-based — AI adapts to how you learn best.",
    accent: "text-slate",
  },
];

/** Features — four core tools, shown only to unauthenticated visitors. */
export default function Features() {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);

  return (
    <section id="features" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-12">
        <div className={`max-w-2xl ${r}`}>
          <Eyebrow>What You Get</Eyebrow>
          <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Everything You Need to Get Hired
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            All the tools to close the gap.
          </p>
        </div>

        {/* Thin-divider grid (gap-px on a light-gray container) — premium,
            no heavy card chrome. */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-lightgray bg-lightgray sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.num}
              style={{ transitionDelay: visible ? `${i * 120 + 120}ms` : "0ms" }}
              className={`h-full ${r}`}
            >
              <article className="group flex h-full flex-col bg-white/90 p-8 backdrop-blur-sm transition-colors hover:bg-white sm:p-10">
                <span className={`text-sm font-bold tracking-widest ${f.accent}`}>
                  {f.num}
                </span>
                <h3 className="mt-4 text-xl font-bold text-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mediumgray">
                  {f.desc}
                </p>
                <a
                  href="#get-started"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange opacity-70 transition-opacity group-hover:opacity-100"
                >
                  Explore <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
