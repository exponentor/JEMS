import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AssessmentHub from "@/components/assessment/AssessmentHub";
import { getAssessmentState } from "@/lib/db/assessment";

export const metadata: Metadata = { title: "Skill Assessment — Jems" };

export default async function AssessmentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const state = await getAssessmentState(session.user.id);
  if (!state) redirect("/login");
  return <AssessmentHub state={state} />;
}
