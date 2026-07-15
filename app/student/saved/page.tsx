import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SavedJobs from "@/components/saved/SavedJobs";
import { getSavedJobs } from "@/lib/db/student-data";

export const metadata: Metadata = {
  title: "Saved Jobs — Jems",
};

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const saved = await getSavedJobs(session.user.id);
  return <SavedJobs saved={saved} />;
}
