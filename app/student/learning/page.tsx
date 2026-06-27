import type { Metadata } from "next";
import LearningPaths from "@/components/learning/LearningPaths";

export const metadata: Metadata = {
  title: "Learning Paths — Jems",
};

export default function LearningPage() {
  return <LearningPaths />;
}
