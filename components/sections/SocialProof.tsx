"use client";

import { useRef } from "react";
import { Eyebrow, revealClass, useReveal } from "./_shared";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  timeline: string;
  /** Tailwind bg classes for the avatar circle. */
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Hired as Senior Engineer at Google",
    quote:
      "I was stuck for 8 months. Jems got me job-ready in 4 weeks. Now earning 40% more.",
    timeline: "4 weeks on Jems",
    avatar: "bg-cta-gradient",
  },
  {
    name: "Raj Patel",
    role: "Data Engineer at Amazon",
    quote:
      "Mock interviews were game-changing. I went from scared to confident.",
    timeline: "6 weeks on Jems",
    avatar: "bg-primary-gradient",
  },
  {
    name: "Alex Chen",
    role: "Frontend Developer at Microsoft",
    quote:
      "The personalized learning path was exactly what I needed. No wasted time.",
    timeline: "5 weeks on Jems",
    avatar: "bg-gradient-to-br from-emerald to-slate",
  },
  {
    name: "Sara Williams",
    role: "ML Engineer at Netflix",
    quote:
      "From zero callbacks to four offers. The match scores told me exactly what to fix.",
    timeline: "7 weeks on Jems",
    avatar: "bg-gradient-to-br from-gold to-orange",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/** Social proof — student testimonials as a swipeable/scroll carousel. */
export default function SocialProof() {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll roughly one "page" of cards.
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="success" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-12">
        <div className={`mx-auto max-w-2xl text-center ${r}`}>
          <Eyebrow align="center">Student Success</Eyebrow>
          <h2 className="mt-11 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Real Students. Real Results.
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            See how Jems changed their careers.
          </p>
        </div>

        {/* Carousel */}
        <div className={`mt-14 ${r}`} style={{ transitionDelay: visible ? "120ms" : "0ms" }}>
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex shrink-0 snap-start basis-full flex-col rounded-2xl border border-lightgray bg-white/90 p-7 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
              >
                <blockquote className="flex-1 text-lg font-medium leading-8 text-navy">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-lightgray pt-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.avatar}`}
                    aria-hidden="true"
                  >
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="truncate text-sm text-mediumgray">{t.role}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange sm:block">
                    {t.timeline}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-lightgray bg-white text-navy transition-colors hover:border-orange hover:text-orange"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-lightgray bg-white text-navy transition-colors hover:border-orange hover:text-orange"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
