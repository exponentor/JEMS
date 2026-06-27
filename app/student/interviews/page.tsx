import type { Metadata } from "next";
import MockInterviews from "@/components/interviews/MockInterviews";

export const metadata: Metadata = {
  title: "Mock Interviews — Jems",
};

export default function InterviewsPage() {
  return <MockInterviews />;
}
