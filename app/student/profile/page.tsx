import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ProfilePage from "@/components/dashboard/student/ProfilePage";
import {
  getApplications,
  getJobMatches,
  getMockInterviews,
  getStudentProfile,
} from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Profile — Jems",
};

export default async function StudentProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const [profile, apps, matches, interviews] = await Promise.all([
    getStudentProfile(userId),
    getApplications(userId),
    getJobMatches(userId),
    getMockInterviews(userId),
  ]);
  if (!profile) redirect("/login");

  return (
    <ProfilePage
      profile={profile}
      stats={{
        applications: apps.length,
        matches: matches.length,
        interviews: interviews.completed,
      }}
    />
  );
}
