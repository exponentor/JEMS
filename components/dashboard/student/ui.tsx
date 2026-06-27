import type { ReactNode } from "react";

/** Standard dashboard surface — soft border + subtle shadow, no gradients. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-lightgray bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ProgressBar({
  value,
  barClass = "bg-slate",
}: {
  value: number;
  barClass?: string;
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-lightgray">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-semibold text-navy">{children}</h2>;
}

/** Controlled switch used in Settings / notifications. */
export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-slate" : "bg-lightgray"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
