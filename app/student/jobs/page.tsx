import type { Metadata } from "next";
import JobMatches from "@/components/jobs/JobMatches";

export const metadata: Metadata = {
  title: "Job Matches — Jems",
};

export default function JobsPage() {
  return <JobMatches />;
}
