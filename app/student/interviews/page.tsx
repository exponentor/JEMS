import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MockInterviews from "@/components/interviews/MockInterviews";
import { getMockInterviews } from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Mock Interviews — Jems",
};

export default async function InterviewsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const data = await getMockInterviews(session.user.id);
  return <MockInterviews data={data} />;
}
