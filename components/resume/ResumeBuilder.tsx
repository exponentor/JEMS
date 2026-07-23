"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  FilePlus2,
  Loader2,
  Menu,
  Trash2,
} from "lucide-react";
import { useOpenMobileSidebar } from "@/components/dashboard/student/sidebar-context";
import ResumeEditor from "./ResumeEditor";
import ResumePreview from "./ResumePreview";
import {
  atsScore,
  emptyResume,
  type ResumeData,
  type ResumeVersion,
  uid,
} from "./types";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export default function ResumeBuilder({
  initialVersions,
}: {
  initialVersions: ResumeVersion[];
}) {
  const openMobileSidebar = useOpenMobileSidebar();

  const [versions, setVersions] = useState<ResumeVersion[]>(initialVersions);
  const [activeId, setActiveId] = useState(initialVersions[0]?.id ?? "v1");

  const active = versions.find((v) => v.id === activeId) ?? versions[0];
  const data = active.data;

  const setData = (producer: (prev: ResumeData) => ResumeData) =>
    setVersions((vs) =>
      vs.map((v) =>
        v.id === active.id ? { ...v, data: producer(v.data) } : v,
      ),
    );

  // ── Versions ────────────────────────────────────────────────
  const addVersion = () => {
    const id = uid("v");
    setVersions((vs) => [
      ...vs,
      { id, name: `Resume v${vs.length + 1}`, data: emptyResume() },
    ]);
    setActiveId(id);
  };
  const deleteVersion = () => {
    if (versions.length <= 1) return;
    const remaining = versions.filter((v) => v.id !== active.id);
    setVersions(remaining);
    setActiveId(remaining[0].id);
  };
  const renameVersion = (name: string) =>
    setVersions((vs) =>
      vs.map((v) => (v.id === active.id ? { ...v, name } : v)),
    );

  // ── Auto-save (persists to MongoDB) ─────────────────────────
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(() => Date.now());
  const [, tick] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    // Skip the very first render so loading a resume doesn't trigger a save.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setSaving(true);
    const t = setTimeout(async () => {
      try {
        await fetch("/api/student/resume", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            versions,
            atsScore: atsScore(active.data).score,
          }),
        });
        setLastSaved(Date.now());
      } finally {
        setSaving(false);
      }
    }, 900);
    return () => clearTimeout(t);
    // Re-save whenever any version's content or names change.
  }, [versions, active.data]);

  // Refresh the "x min ago" label periodically.
  useEffect(() => {
    const i = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(i);
  }, []);

  const ats = atsScore(data);

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-lightgray bg-white px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={openMobileSidebar}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-navy hover:bg-[#f9fafb] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link
          href="/student/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-mediumgray transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <div className="ml-2 border-l border-lightgray pl-3">
          <h1 className="text-sm font-bold text-navy">Resume Builder</h1>
          <p className="hidden text-xs text-mediumgray sm:block">
            Create ATS-optimized resume
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs font-medium text-mediumgray">
          {saving ? (
            <span className="inline-flex items-center gap-1.5 text-slate">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving…
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-emerald">
              <Check className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                Saved · {timeAgo(lastSaved)}
              </span>
              <span className="sm:hidden">Saved</span>
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2">
          {/* ── Left: editor ───────────────────────────────── */}
          <div className="space-y-6">
            {/* ATS score */}
            <div className="rounded-lg border border-lightgray bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-navy">ATS Score</h2>
                <span
                  className={`text-sm font-bold ${ats.tone === "good" ? "text-emerald" : "text-orange"}`}
                >
                  {ats.score}/100
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-lightgray">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${
                    ats.tone === "good" ? "bg-emerald" : "bg-orange"
                  }`}
                  style={{ width: `${ats.score}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-mediumgray">{ats.suggestion}</p>
            </div>

            {/* Version controls */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-lightgray bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <input
                value={active.name}
                onChange={(e) => renameVersion(e.target.value)}
                aria-label="Resume version name"
                className="h-9 min-w-0 flex-1 rounded-md border border-lightgray px-3 text-sm font-semibold text-navy outline-none focus:border-slate focus:shadow-[0_4px_12px_rgba(234,88,12,0.15)]"
              />
              <select
                value={activeId}
                onChange={(e) => setActiveId(e.target.value)}
                aria-label="Switch version"
                className="h-9 rounded-md border border-lightgray bg-white px-2 text-sm text-navy outline-none focus:border-slate"
              >
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addVersion}
                aria-label="New version"
                className="flex h-9 items-center gap-1.5 rounded-md border border-lightgray px-3 text-xs font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
              >
                <FilePlus2 className="h-4 w-4" />
                New
              </button>
              <button
                type="button"
                onClick={deleteVersion}
                disabled={versions.length <= 1}
                aria-label="Delete version"
                className="flex h-9 w-9 items-center justify-center rounded-md text-mediumgray transition-colors hover:bg-[#fee2e2] hover:text-[#EF4444] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-mediumgray"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <ResumeEditor data={data} setData={setData} />
          </div>

          {/* ── Right: preview ─────────────────────────────── */}
          <div className="xl:sticky xl:top-[5.5rem] xl:self-start">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-navy">Preview</h2>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cta-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(234,88,12,0.2)] transition-transform hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Download as PDF
              </button>
            </div>
            <div className="max-h-[calc(100vh-8rem)] overflow-auto rounded-lg bg-[#eef1f5] p-4">
              <ResumePreview data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
