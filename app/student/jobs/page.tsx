import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import JobMatches from "@/components/jobs/JobMatches";
import { getJobMatches, getSavedJobs } from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Job Matches — Jems",
};

export default async function JobsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const [jobs, saved] = await Promise.all([
    getJobMatches(userId),
    getSavedJobs(userId),
  ]);
  const initialSaved = saved.map((s) => s.jobId);

  return <JobMatches jobs={jobs} initialSaved={initialSaved} />;
}
