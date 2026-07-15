import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ResumeBuilder from "@/components/resume/ResumeBuilder";
import { getStudentProfile, getStudentResume } from "@/lib/db/student-data";
import { emptyResume, type ResumeVersion } from "@/components/resume/types";

export const metadata: Metadata = {
  title: "Resume Builder — Jems",
};

export default async function StudentResumePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const [resume, profile] = await Promise.all([
    getStudentResume(userId),
    getStudentProfile(userId),
  ]);

  let versions: ResumeVersion[];
  if (resume && resume.versions.length > 0) {
    versions = resume.versions.map((v) => ({
      id: v.id,
      name: v.name,
      data: v.data as ResumeVersion["data"],
    }));
  } else {
    // First visit — seed a blank version pre-filled from their profile so the
    // header isn't empty. They build it out from here and it saves on edit.
    const seed = emptyResume();
    if (profile) {
      seed.header.fullName = profile.displayName || profile.name;
      seed.header.email = profile.email;
      seed.header.title = profile.targetRole;
      seed.header.location = profile.location;
      seed.header.phone = profile.phone;
      seed.header.linkedin = profile.linkedin;
      seed.header.portfolio = profile.website;
    }
    versions = [{ id: "v1", name: "Resume v1", data: seed }];
  }

  return <ResumeBuilder initialVersions={versions} />;
}
