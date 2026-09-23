"use client";

import { SessionProvider } from "next-auth/react";
import { TourProvider } from "@/components/tour/TourProvider";

/** Wraps the app so client components can read the Auth.js session. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TourProvider>{children}</TourProvider>
    </SessionProvider>
  );
}
