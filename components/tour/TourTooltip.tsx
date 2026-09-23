"use client";

import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import type { TooltipRenderProps } from "react-joyride";
import { PILLAR_STYLE, type TourPillar } from "./tours";

/** Joyride tooltip restyled to the app's card language, with the SIH pillar chip. */
export function TourTooltip({
  step,
  index,
  size,
  isLastStep,
  backProps,
  primaryProps,
  skipProps,
  closeProps,
  tooltipProps,
}: TooltipRenderProps) {
  const pillar = (step.data as { pillar?: TourPillar } | undefined)?.pillar;

  return (
    <div
      {...tooltipProps}
      className="w-[min(92vw,380px)] rounded-2xl border border-lightgray bg-white p-5 text-left shadow-[0_16px_48px_-12px_rgba(17,24,39,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        {pillar ? (
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${PILLAR_STYLE[pillar]}`}>
            {pillar}
          </span>
        ) : (
          <span />
        )}
        <button
          {...closeProps}
          type="button"
          className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-surface hover:text-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {step.title && <h3 className="mt-3 text-base font-bold text-navy">{step.title}</h3>}
      <div className="mt-1.5 text-sm leading-relaxed text-mediumgray">{step.content}</div>

      {/* Step dots */}
      <div className="mt-4 flex items-center gap-1" aria-hidden>
        {Array.from({ length: size }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-slate" : i < index ? "w-1.5 bg-slate/40" : "w-1.5 bg-lightgray"
            }`}
          />
        ))}
        <span className="ml-auto text-[11px] font-medium tabular-nums text-mediumgray">
          {index + 1} / {size}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        {!isLastStep ? (
          <button
            {...skipProps}
            type="button"
            className="text-xs font-medium text-mediumgray transition-colors hover:text-navy"
          >
            Skip tour
          </button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2">
          {index > 0 && (
            <button
              {...backProps}
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-lightgray bg-white px-3 py-2 text-sm font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
          <button
            {...primaryProps}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-gradient px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(234,88,12,0.25)] transition-transform hover:-translate-y-0.5"
          >
            {isLastStep ? (
              <>
                Done <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Next <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
