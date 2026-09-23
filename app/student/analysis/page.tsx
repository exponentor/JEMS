import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CareerAnalysis from "@/components/analysis/CareerAnalysis";
import { getAnalysisInputs, getLatestAnalysis } from "@/lib/db/analysis";

export const metadata: Metadata = {
  title: "AI Career Analysis — Jems",
};

export default async function AnalysisPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [inputs, latest] = await Promise.all([
    getAnalysisInputs(session.user.id),
    getLatestAnalysis(session.user.id),
  ]);
  if (!inputs) redirect("/login");

  return <CareerAnalysis inputs={inputs} initialResult={latest} />;
}
