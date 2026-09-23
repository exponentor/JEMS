import type { Metadata } from "next";
import Candidates from "@/components/company/Candidates";
import { requireRole } from "@/lib/auth/require-role";
import { getCandidatesForOpening, getCompanyContext, listOpenings } from "@/lib/db/company";

export const metadata: Metadata = { title: "Candidates — Jems" };

export default async function CandidatesPage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const session = await requireRole("company");
  const { job } = await searchParams;
  const [company, openings] = await Promise.all([getCompanyContext(session.user.id), listOpenings(session.user.id)]);
  const jobId = job || openings[0]?.id;
  const result = jobId ? await getCandidatesForOpening(session.user.id, jobId) : null;
  return (
    <Candidates
      company={company?.name ?? "Company"}
      openings={openings}
      selected={result?.opening ?? null}
      candidates={result?.candidates ?? []}
    />
  );
}
