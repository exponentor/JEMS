import type { Metadata } from "next";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

export const metadata: Metadata = {
  title: "Resume Builder — Jems",
};

export default function StudentResumePage() {
  return <ResumeBuilder />;
}
