import type { Metadata } from "next";
import ProfilePage from "@/components/dashboard/student/ProfilePage";

export const metadata: Metadata = {
  title: "Profile — Jems",
};

export default function StudentProfilePage() {
  return <ProfilePage />;
}
