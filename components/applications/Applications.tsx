"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/student/DashboardShell";
import PageHeader from "@/components/dashboard/student/PageHeader";
import { Card } from "@/components/dashboard/student/ui";

const STAGES = ["Applied", "In review", "Interview", "Offer"] as const;
type Stage = (typeof STAGES)[number];
type Status = Stage | "Rejected";

interface Application {
  id: string;
  role: string;
  company: string;
  applied: string;
  status: Status;
}

const APPS: Application[] = [
  { id: "a1", role: "Frontend Developer", company: "Stripe", applied: "Jun 22", status: "Interview" },
  { id: "a2", role: "React Engineer", company: "Airbnb", applied: "Jun 20", status: "In review" },
  { id: "a3", role: "UI Engineer", company: "Razorpay", applied: "Jun 18", status: "Offer" },
  { id: "a4", role: "Frontend Engineer", company: "Vercel", applied: "Jun 15", status: "Applied" },
  { id: "a5", role: "Software Engineer I", company: "Swiggy", applied: "Jun 10", status: "Rejected" },
];

function statusTone(s: Status) {
  if (s === "Offer") return "bg-emerald/10 text-emerald";
  if (s === "Rejected") return "bg-[#fee2e2] text-[#EF4444]";
  if (s === "Interview") return "bg-slate/10 text-slate";
  return "bg-gold/10 text-[#b45309]";
}

const TABS = ["All", "Applied", "In review", "Interview", "Offer", "Rejected"] as const;

export default function Applications() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const counts = {
    Applied: APPS.filter((a) => a.status === "Applied").length,
    "In review": APPS.filter((a) => a.status === "In review").length,
    Interview: APPS.filter((a) => a.status === "Interview").length,
    Offer: APPS.filter((a) => a.status === "Offer").length,
  };

  const visible = APPS.filter((a) => tab === "All" || a.status === tab);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Applications" crumb="Applications" />

        {/* Pipeline stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(Object.keys(counts) as (keyof typeof counts)[]).map((k) => (
            <Card key={k} className="p-5">
              <p className="text-xs font-medium text-mediumgray">{k}</p>
              <p className="mt-2 text-2xl font-bold text-navy">{counts[k]}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-navy text-white"
                  : "border border-lightgray bg-white text-mediumgray hover:text-navy"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        <Card>
          <ul className="divide-y divide-lightgray">
            {visible.map((a) => {
              const stageIndex = a.status === "Rejected" ? -1 : STAGES.indexOf(a.status);
              return (
                <li key={a.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f9] text-sm font-bold text-navy">
                    {a.company.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy">{a.role}</p>
                    <p className="text-xs text-mediumgray">
                      {a.company} · Applied {a.applied}
                    </p>
                    {/* Stage tracker */}
                    <div className="mt-2 flex max-w-xs items-center gap-1">
                      {STAGES.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            a.status === "Rejected"
                              ? "bg-lightgray"
                              : i <= stageIndex
                                ? "bg-slate"
                                : "bg-lightgray"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold ${statusTone(a.status)}`}>
                    {a.status}
                  </span>
                </li>
              );
            })}
          </ul>
          {visible.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-mediumgray">
              No applications in this stage.
            </p>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
