"use client";

import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  ChevronRight,
  FileText,
  type LucideIcon,
  Mic,
  Target,
  TrendingUp,
} from "lucide-react";
import DashboardShell from "./DashboardShell";
import PageHeader from "./PageHeader";
import {
  activity,
  jobs,
  nextSteps,
  skills,
  stats,
  student,
  upcoming,
} from "./data";

function matchTone(match: number): string {
  if (match >= 90) return "bg-emerald/10 text-emerald";
  if (match >= 80) return "bg-slate/10 text-slate";
  return "bg-gold/10 text-[#b45309]";
}

const STAT_META: { Icon: LucideIcon; chip: string }[] = [
  { Icon: Target, chip: "bg-slate/10 text-slate" },
  { Icon: FileText, chip: "bg-emerald/10 text-emerald" },
  { Icon: Mic, chip: "bg-gold/15 text-[#b45309]" },
  { Icon: Briefcase, chip: "bg-orange/10 text-orange" },
];

/** Card shell — subtle border + soft shadow, no gradients. */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-lightgray bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHead({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-lightgray px-5 py-3.5">
      <h2 className="text-sm font-semibold text-navy">{title}</h2>
      {action && (
        <button
          type="button"
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate transition-colors hover:text-[#2563eb]"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
            <PageHeader title="Dashboard" crumb="Dashboard" />

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-navy">
                  Welcome back, {student.firstName}
                </h1>
                <p className="mt-1 text-sm text-mediumgray">
                  {student.title} · {student.location}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f2937] sm:self-auto"
              >
                Continue resume
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((s, i) => {
                const meta = STAT_META[i];
                return (
                  <Card key={s.label} className="p-5 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-medium text-mediumgray">{s.label}</p>
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${meta.chip}`}>
                        <meta.Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-navy">{s.value}</p>
                    <p
                      className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
                        s.trend === "up" ? "text-emerald" : "text-mediumgray"
                      }`}
                    >
                      {s.trend === "up" && <TrendingUp className="h-3.5 w-3.5" />}
                      {s.sub}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Next steps */}
                <Card>
                  <SectionHead title="Your next steps" />
                  <ul className="divide-y divide-lightgray">
                    {nextSteps.map((step) => (
                      <li
                        key={step.title}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-navy">{step.title}</p>
                          <p className="mt-0.5 text-xs text-mediumgray">{step.desc}</p>
                          {typeof step.progress === "number" && (
                            <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-lightgray">
                              <div
                                className="h-full rounded-full bg-slate"
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-lg border border-lightgray px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
                        >
                          {step.action}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Job matches */}
                <Card>
                  <SectionHead title="Top job matches" action="View all" />
                  <ul className="divide-y divide-lightgray">
                    {jobs.map((job) => (
                      <li
                        key={`${job.role}-${job.company}`}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6] text-sm font-bold text-navy">
                          {job.company.charAt(0)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-navy">
                            {job.role}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-mediumgray">
                            {job.company} · {job.location} · {job.salary}
                          </p>
                        </div>
                        <span
                          className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-block ${matchTone(job.match)}`}
                        >
                          {job.match}% match
                        </span>
                        <span className="hidden w-16 shrink-0 text-right text-xs text-mediumgray md:block">
                          {job.posted}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-mediumgray" />
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Profile completion */}
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-navy">Profile completion</h2>
                    <span className="text-sm font-bold text-slate">{student.readiness}%</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-lightgray">
                    <div
                      className="h-full rounded-full bg-slate"
                      style={{ width: `${student.readiness}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-mediumgray">
                    Complete your resume and add skills to reach 100% and unlock
                    priority matching.
                  </p>
                </Card>

                {/* Upcoming */}
                <Card>
                  <SectionHead title="Upcoming" />
                  <ul className="divide-y divide-lightgray">
                    {upcoming.map((item) => (
                      <li key={item.title} className="flex items-start gap-3 px-5 py-3.5">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate/10 text-slate">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy">{item.title}</p>
                          <p className="mt-0.5 text-xs text-mediumgray">{item.when}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Skills */}
                <Card className="p-5">
                  <h2 className="text-sm font-semibold text-navy">Your skills</h2>
                  <ul className="mt-3 space-y-3">
                    {skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-navy">{skill.name}</span>
                          <span className="text-mediumgray">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-lightgray">
                          <div
                            className="h-full rounded-full bg-navy"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Recent activity */}
                <Card>
                  <SectionHead title="Recent activity" />
                  <ul className="px-5 py-2">
                    {activity.map((a, i) => (
                      <li key={i} className="flex gap-3 py-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate" />
                        <div>
                          <p className="text-sm text-navy">{a.text}</p>
                          <p className="text-xs text-mediumgray">{a.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
      </div>
    </DashboardShell>
  );
}
