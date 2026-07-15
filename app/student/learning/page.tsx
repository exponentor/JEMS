import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LearningPaths from "@/components/learning/LearningPaths";
import { getLearningPaths } from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Learning Paths — Jems",
};

export default async function LearningPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const paths = await getLearningPaths(session.user.id);
  return <LearningPaths paths={paths} />;
}
