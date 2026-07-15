"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, MapPin, Search, Target } from "lucide-react";
import DashboardShell from "@/components/dashboard/student/DashboardShell";
import PageHeader from "@/components/dashboard/student/PageHeader";
import { Card, EmptyState } from "@/components/dashboard/student/ui";
import type { JobMatchView } from "@/lib/db/student-data";

function matchTone(match: number) {
  if (match >= 90) return "bg-emerald/10 text-emerald";
  if (match >= 80) return "bg-slate/10 text-slate";
  return "bg-gold/10 text-[#b45309]";
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "remote", label: "Remote" },
  { key: "top", label: "90%+ match" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function JobMatches({
  jobs,
  initialSaved,
}: {
  jobs: JobMatchView[];
  initialSaved: string[];
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [saved, setSaved] = useState<Set<string>>(() => new Set(initialSaved));

  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const visible = jobs.filter((j) =>
    filter === "remote" ? j.remote : filter === "top" ? j.match >= 90 : true,
  );

  if (jobs.length === 0) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-6xl space-y-6">
          <PageHeader title="Job Matches" crumb="Job Matches" />
          <EmptyState
            icon={Target}
            title="No job matches yet"
            hint="Complete your resume and add your skills so we can match you with roles that fit. Your best matches will appear here."
            ctaLabel="Build your resume"
            ctaHref="/student/resume"
          />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Job Matches" crumb="Job Matches" />

        {/* Search + filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mediumgray" />
            <input
              type="search"
              placeholder="Search roles or companies…"
              className="h-11 w-full rounded-lg border border-lightgray bg-white pl-9 pr-3 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15"
            />
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.key
                    ? "bg-navy text-white"
                    : "border border-lightgray bg-white text-mediumgray hover:text-navy"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-mediumgray">
          <span className="font-semibold text-navy">{visible.length}</span> matching roles
        </p>

        {/* Job list */}
        <div className="space-y-4">
          {visible.map((j) => {
            const isSaved = saved.has(j.id);
            return (
              <Card key={j.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f9] text-base font-bold text-navy">
                  {j.company.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-navy">{j.role}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${matchTone(j.match)}`}>
                      {j.match}% match
                    </span>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mediumgray">
                    <span className="font-medium text-navy">{j.company}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {j.location}
                    </span>
                    <span>{j.type}</span>
                    <span>{j.salary}</span>
                    <span>· {j.posted}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSave(j.id)}
                    aria-label={isSaved ? "Unsave" : "Save"}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                      isSaved
                        ? "border-slate bg-slate/10 text-slate"
                        : "border-lightgray text-mediumgray hover:border-slate hover:text-slate"
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    Apply
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
