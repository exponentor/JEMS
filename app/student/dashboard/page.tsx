import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import TourAutostart from "@/components/tour/TourAutostart";
import { getDashboardData } from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Dashboard — Jems",
};

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const data = await getDashboardData(session.user.id);
  return (
    <>
      <StudentDashboard data={data} />
      {/* First visit: walk the student through the workspace once. */}
      <TourAutostart tour="student" />
    </>
  );
}
