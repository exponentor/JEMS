import type { Metadata } from "next";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";

export const metadata: Metadata = {
  title: "Dashboard — Jems",
};

export default function StudentDashboardPage() {
  return <StudentDashboard />;
}
