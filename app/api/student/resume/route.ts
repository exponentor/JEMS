import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStudentResume, saveStudentResume } from "@/lib/db/student-data";
import { readJsonLimited } from "@/lib/http";
import { rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { validateResumePayload } from "@/lib/validation/student";

// A text resume is small; this comfortably fits several versions.
const MAX_BODY_BYTES = 300_000;

/** Returns the signed-in student's saved resume versions. */
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const resume = await getStudentResume(userId);
  return NextResponse.json({ resume });
}

/** Saves the validated set of resume versions for the signed-in student. */
export async function PUT(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (session?.user?.role !== "student") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  // Auto-save is debounced client-side; this bounds it server-side too.
  const limit = await rateLimit(`resume:${userId}`, 90, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  const parsed = await readJsonLimited(request, MAX_BODY_BYTES);
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { value, error } = validateResumePayload(parsed.data);
  if (error || !value) {
    return NextResponse.json({ error: error ?? "Invalid input." }, { status: 400 });
  }

  const ok = await saveStudentResume(userId, value.versions, value.atsScore);
  if (!ok) {
    return NextResponse.json(
      { error: "Could not save resume." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
