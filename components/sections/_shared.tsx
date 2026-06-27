"use client";

import { useEffect, useRef, useState } from "react";

/** Scroll-into-view reveal. Returns a ref to attach and a `visible` flag. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
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

  return { ref, visible };
}

/** Shared reveal transition classes. */
export function revealClass(visible: boolean): string {
  return `transition-all duration-700 ease-out motion-reduce:transition-none ${
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
}

/** Editorial eyebrow label with an orange dash line. */
export function Eyebrow({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-orange" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
        {children}
      </span>
      {align === "center" && (
        <span aria-hidden="true" className="h-px w-8 bg-orange" />
      )}
    </div>
  );
}
