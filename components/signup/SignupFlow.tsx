"use client";

import { useState } from "react";
import CompanySignup from "./CompanySignup";
import RoleChoice from "./RoleChoice";
import SignupShell from "./SignupShell";
import StudentSignup from "./StudentSignup";

/** Top-level signup orchestrator: role choice → role-specific multi-step form. */
export default function SignupFlow() {
  const [role, setRole] = useState<"student" | "company" | null>(null);

  const reset = () => setRole(null);

  return (
    <SignupShell>
      {role === null && <RoleChoice onSelect={setRole} />}
      {role === "student" && <StudentSignup onBack={reset} />}
      {role === "company" && <CompanySignup onBack={reset} />}
    </SignupShell>
  );
}
