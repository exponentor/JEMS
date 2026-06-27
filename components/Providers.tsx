"use client";

import { SessionProvider } from "next-auth/react";

/** Wraps the app so client components can read the Auth.js session. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
