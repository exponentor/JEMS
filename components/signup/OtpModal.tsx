"use client";

import { Mail, Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LENGTH = 6;

interface OtpModalProps {
  /** Used for copy + icon — "email" or "phone". */
  channel: "email" | "phone";
  /** The address/number the code was "sent" to (display only). */
  destination: string;
  /** Role accent color (the modal is portaled outside the themed wrapper). */
  accent?: string;
  onClose: () => void;
  onVerified: () => void;
}

/**
 * OTP entry UI — front-end only. Any 6 digits "verify" successfully; there is
 * no backend yet. Rendered through a portal to `document.body` so it always
 * covers the viewport (the signup steps live inside a transformed, clipped
 * carousel that would otherwise trap a `position: fixed` overlay).
 *
 * The component is mounted only while open, so its initial state is always
 * fresh — no reset effect needed.
 */
export function OtpModal({
  channel,
  destination,
  accent = "#6366f1",
  onClose,
  onVerified,
}: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [seconds, setSeconds] = useState(30);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first box once.
  useEffect(() => {
    const t = setTimeout(() => inputs.current[0]?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  // Resend countdown.
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const complete = digits.every(Boolean);

  const setAt = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    const next = Array(LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const submit = () => {
    if (complete) onVerified();
  };

  if (typeof document === "undefined") return null;

  const Icon = channel === "email" ? Mail : Smartphone;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ ["--otp-accent" as string]: accent }}
    >
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
        style={{ animation: "fade-in 0.2s ease-out" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Verify your ${channel}`}
        className="relative w-full max-w-[400px] rounded-3xl bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
        style={{ animation: "slide-down 0.25s ease-out" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-mediumgray transition-colors hover:bg-navy/5 hover:text-navy"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "color-mix(in srgb, var(--otp-accent) 12%, white)",
              color: "var(--otp-accent)",
            }}
          >
            <Icon className="h-7 w-7" strokeWidth={2} />
          </div>
          <h3 className="mt-4 text-xl font-bold text-navy">
            Verify your {channel}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-mediumgray">
            We sent a 6-digit code to
            <br />
            <span className="font-semibold text-navy">
              {destination || (channel === "email" ? "your email" : "your phone")}
            </span>
          </p>
        </div>

        <div className="mt-7 flex justify-center gap-2.5" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              style={d ? { borderColor: "var(--otp-accent)" } : undefined}
              className="h-13 w-12 rounded-xl border-2 border-lightgray bg-white text-center text-xl font-bold text-navy shadow-[0_1px_3px_rgba(0,0,0,0.06)] outline-none transition-all duration-150 focus:border-[color:var(--otp-accent)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-mediumgray">
          Demo mode — enter any 6 digits to verify.
        </p>

        <button
          type="button"
          onClick={submit}
          disabled={!complete}
          style={complete ? { backgroundColor: "var(--otp-accent)" } : undefined}
          className="mt-6 w-full rounded-xl bg-mediumgray/40 px-5 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed"
        >
          Verify
        </button>

        <div className="mt-4 text-center text-xs text-mediumgray">
          Didn&apos;t get it?{" "}
          {seconds > 0 ? (
            <span>
              Resend in <span className="font-semibold text-navy">{seconds}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSeconds(30)}
              className="font-semibold hover:underline"
              style={{ color: "var(--otp-accent)" }}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
