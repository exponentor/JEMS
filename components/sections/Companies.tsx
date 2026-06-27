"use client";

import { Eyebrow, revealClass, useReveal } from "./_shared";

const row1 = [
  "Google",
  "Amazon",
  "Microsoft",
  "Apple",
  "Meta",
  "Stripe",
  "Airbnb",
  "Uber",
  "Netflix",
  "Spotify",
];

const row2 = [
  "Adobe",
  "Salesforce",
  "Shopify",
  "Slack",
  "Notion",
  "Figma",
  "Dropbox",
  "Atlassian",
  "Twilio",
  "Pinterest",
];

const edgeFade = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
};

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden" style={edgeFade}>
      <div
        className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap px-10 text-2xl font-bold tracking-tight text-mediumgray/60 transition-colors duration-300 hover:text-navy"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Companies — hiring-partner logo marquee, unauthenticated visitors only. */
export default function Companies() {
  const { ref, visible } = useReveal<HTMLElement>();
  const r = revealClass(visible);

  return (
    <section id="companies" ref={ref} className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-12">
        <div className={`mx-auto max-w-2xl pb-3 text-center ${r}`}>
          <Eyebrow align="center" >Hiring Partners</Eyebrow>
          <h2 className="mt-11 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            50+ Companies Trust Jems
          </h2>
          <p className="mt-4 text-lg leading-8 text-mediumgray">
            Top companies are actively hiring from our platform.
          </p>
        </div>

        {/* Logo marquee — two rows drifting in opposite directions */}
        <div
          aria-hidden="true"
          className={`mt-14 flex flex-col gap-6 ${r}`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>

        {/* Stats + CTA */}
        <div
          className={`mt-14 flex flex-col items-center justify-center gap-6 rounded-2xl border border-lightgray bg-white/70 px-8 py-7 text-center backdrop-blur-sm sm:flex-row sm:gap-10 ${r}`}
          style={{ transitionDelay: visible ? "240ms" : "0ms" }}
        >
          <div>
            <p className="text-2xl font-extrabold text-navy">500+</p>
            <p className="text-sm text-mediumgray">open roles</p>
          </div>
          <span className="hidden h-10 w-px bg-lightgray sm:block" />
          <div>
            <p className="text-2xl font-extrabold text-navy">$120K–$180K</p>
            <p className="text-sm text-mediumgray">average salary range</p>
          </div>
          <span className="hidden h-10 w-px bg-lightgray sm:block" />
          <a
            href="#get-started"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange hover:underline"
          >
            Browse all open positions <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
