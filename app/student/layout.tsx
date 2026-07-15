import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { StudentProvider } from "@/components/dashboard/student/StudentContext";
import { getStudentView } from "@/lib/student";

/**
 * Auth boundary for the whole student area. Every `/student/*` page requires a
 * signed-in user; we load their real profile once here and hand it down via
 * context so the screens render the logged-in student's data, not demo data.
 */
export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const student = await getStudentView(session.user.id);
  if (!student) redirect("/login");

  return <StudentProvider value={student}>{children}</StudentProvider>;
}
