"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/dashboard/student/ui";
import { APPLICATION_STATUSES } from "@/lib/company/constants";
import type { CandidateView, OpeningView } from "@/lib/db/company";
import { PageHead, STATUS_STYLE, TYPE_STYLE, inputClass } from "./ui";

/**
 * Skill-based shortlisting: every student ranked against the selected
 * opening's requirements, applicants first, with the recruiter's pipeline
 * status editable inline.
 */
export default function Candidates({
  company,
  openings,
  selected,
  candidates,
}: {
  company: string;
  openings: OpeningView[];
  selected: OpeningView | null;
  candidates: CandidateView[];
}) {
  const router = useRouter();
  const [minScore, setMinScore] = useState(0);
  const [onlyApplicants, setOnlyApplicants] = useState(false);
  const [rows, setRows] = useState(candidates);
  const [busy, setBusy] = useState<string | null>(null);

  const setStatus = async (applicationId: string, status: string) => {
    setBusy(applicationId);
    try {
      const res = await fetch(`/api/company/applications/${applicationId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      if (res.ok) {
        setRows((r) => r.map((c) => (c.application?.id === applicationId ? { ...c, application: { ...c.application, status } } : c)));
        router.refresh();
      }
    } finally {
      setBusy(null);
    }
  };

  const visible = rows.filter((c) => c.score >= minScore && (!onlyApplicants || c.application));

  return (
    <div className="space-y-6">
      <PageHead company={company} title="Candidates" hint="Students ranked by verified-skill compatibility with an opening. Applicants appear first; you can move them through your pipeline here." />

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-navy">Opening</span>
            <select value={selected?.id ?? ""} onChange={(e) => router.push(`/company/candidates?job=${e.target.value}`)} className={inputClass}>
              {!selected && <option value="">Select an opening…</option>}
              {openings.map((o) => <option key={o.id} value={o.id}>{o.role} · {o.type}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-semibold text-navy">Min. compatibility: {minScore}%</span>
            <input type="range" min={0} max={100} step={10} value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="mt-2 w-full accent-[#ea580c]" />
          </label>
          <label className="flex items-end gap-2 pb-2 text-sm text-navy">
            <input type="checkbox" checked={onlyApplicants} onChange={(e) => setOnlyApplicants(e.target.checked)} className="h-4 w-4 accent-[#ea580c]" /> Applicants only
          </label>
        </div>
        {selected && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-lightgray pt-3">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TYPE_STYLE(selected.type)}`}>{selected.type}</span>
            <span className="text-xs text-mediumgray">Requires:</span>
            {selected.requiredSkills.map((s) => <span key={s} className="rounded bg-navy px-1.5 py-0.5 text-[10px] font-medium text-white">{s}</span>)}
            {selected.niceToHave.map((s) => <span key={s} className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-navy">+ {s}</span>)}
          </div>
        )}
      </Card>

      {!selected ? (
        <Card className="p-8 text-center text-sm text-mediumgray">Pick an opening to see its skill-ranked shortlist.</Card>
      ) : (
        <Card>
          <div className="flex items-center justify-between border-b border-lightgray px-5 py-3.5">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><Sparkles className="h-4 w-4 text-slate" /> {visible.length} candidates</h2>
            <span className="text-[11px] text-mediumgray">Ranked by the Matching Agent</span>
          </div>
          <ul className="divide-y divide-lightgray">
            {visible.length === 0 && <li className="px-5 py-8 text-center text-sm text-mediumgray">No candidates match these filters.</li>}
            {visible.map((c, i) => (
              <li key={c.studentId} className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center">
                <span className="w-6 text-xs font-semibold tabular-nums text-mediumgray">#{i + 1}</span>
                <div className="flex w-16 shrink-0 flex-col items-center">
                  <span className={`text-xl font-bold ${c.score >= 70 ? "text-emerald" : c.score >= 40 ? "text-amber-600" : "text-mediumgray"}`}>{c.score}%</span>
                  <span className="text-[10px] text-mediumgray">match</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`/p/${c.studentId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-slate hover:underline">{c.name} <ExternalLink className="h-3 w-3" /></a>
                    <span className="text-[11px] text-mediumgray">{c.targetRole}{c.institution ? ` · ${c.institution}` : ""}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald"><ShieldCheck className="h-3 w-3" /> {c.verifiedSkills} verified</span>
                    <span className="text-[10px] text-mediumgray">readiness {c.readiness}%</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {c.matched.map((s) => <span key={s} className="rounded bg-emerald/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald">✓ {s}</span>)}
                    {c.missing.map((s) => <span key={s} className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-600">✗ {s}</span>)}
                  </div>
                </div>
                <div className="shrink-0">
                  {c.application ? (
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE(c.application.status)}`}>{c.application.status}</span>
                      <select
                        value={c.application.status}
                        disabled={busy === c.application.id}
                        onChange={(e) => setStatus(c.application!.id, e.target.value)}
                        className="h-8 rounded-md border border-lightgray bg-white px-2 text-xs text-navy outline-none focus:border-slate disabled:opacity-60"
                        aria-label="Update application status"
                      >
                        {APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-mediumgray"><CircleCheck className="h-3.5 w-3.5" /> Not applied · recommended by skills</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
