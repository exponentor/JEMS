"use client";

import {
  type LucideIcon,
  Code2,
  MessageSquare,
  Network,
  Play,
  Target,
  TrendingUp,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/student/DashboardShell";
import PageHeader from "@/components/dashboard/student/PageHeader";
import { Card } from "@/components/dashboard/student/ui";

const STATS = [
  { label: "Completed", value: "12" },
  { label: "Average score", value: "74%" },
  { label: "Best score", value: "88%" },
  { label: "Current streak", value: "3 days" },
];

interface InterviewType {
  title: string;
  desc: string;
  duration: string;
  icon: LucideIcon;
}

const TYPES: InterviewType[] = [
  { title: "Behavioral", desc: "Common HR & situational questions", duration: "20 min", icon: MessageSquare },
  { title: "Technical Coding", desc: "DSA and language fundamentals", duration: "45 min", icon: Code2 },
  { title: "System Design", desc: "Architecture & scalability", duration: "40 min", icon: Network },
  { title: "Role-specific", desc: "Tailored to your target role", duration: "30 min", icon: Target },
];

interface PastInterview {
  date: string;
  type: string;
  score: number;
}

const PAST: PastInterview[] = [
  { date: "Jun 24", type: "Behavioral", score: 78 },
  { date: "Jun 20", type: "Technical Coding", score: 65 },
  { date: "Jun 15", type: "System Design", score: 74 },
  { date: "Jun 10", type: "Role-specific", score: 81 },
];

function scoreTone(score: number) {
  if (score >= 80) return "bg-emerald/10 text-emerald";
  if (score >= 70) return "bg-slate/10 text-slate";
  return "bg-gold/10 text-[#b45309]";
}

export default function MockInterviews() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Mock Interviews" crumb="Mock Interviews" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Card key={s.label} className="p-5">
              <p className="text-xs font-medium text-mediumgray">{s.label}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-2xl font-bold text-navy">
                {s.value}
                {i === 1 && <TrendingUp className="h-4 w-4 text-emerald" />}
              </p>
            </Card>
          ))}
        </div>

        {/* Start a new interview */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy">Start a new interview</h2>
            <span className="text-xs text-mediumgray">Powered by AI feedback</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <Card key={t.title} className="group flex flex-col p-5 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate/10 text-slate">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy">{t.title}</h3>
                  <p className="mt-1 flex-1 text-xs text-mediumgray">{t.desc}</p>
                  <p className="mt-3 text-xs font-medium text-mediumgray">{t.duration}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-gradient py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition-transform group-hover:-translate-y-0.5"
                  >
                    <Play className="h-4 w-4" />
                    Start
                  </button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Past interviews */}
        <Card>
          <div className="flex items-center justify-between border-b border-lightgray px-5 py-3.5">
            <h2 className="text-sm font-semibold text-navy">Past interviews</h2>
            <button type="button" className="text-xs font-semibold text-slate hover:text-[#2563eb]">
              View all
            </button>
          </div>
          <ul className="divide-y divide-lightgray">
            {PAST.map((p) => (
              <li key={`${p.date}-${p.type}`} className="flex items-center gap-4 px-5 py-3.5">
                <span className={`flex h-9 w-12 items-center justify-center rounded-lg text-sm font-bold ${scoreTone(p.score)}`}>
                  {p.score}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{p.type}</p>
                  <p className="text-xs text-mediumgray">{p.date} · 2026</p>
                </div>
                <button type="button" className="shrink-0 rounded-lg border border-lightgray px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:border-slate hover:text-slate">
                  View feedback
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}
