"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Check } from "lucide-react";
import DashboardShell from "@/components/dashboard/student/DashboardShell";
import { Card, Toggle } from "@/components/dashboard/student/ui";
import { useStudent } from "@/components/dashboard/student/StudentContext";

const inputClass =
  "h-11 w-full rounded-lg border border-lightgray bg-white px-3 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-navy">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  );
}

function SettingsCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <h2 className="text-sm font-semibold text-navy">{title}</h2>
      {desc && <p className="mt-0.5 text-xs text-mediumgray">{desc}</p>}
      <div className="mt-4">{children}</div>
    </Card>
  );
}

const NOTIFS = [
  { key: "matches", label: "New job matches", desc: "When roles match your profile" },
  { key: "interviews", label: "Interview reminders", desc: "Upcoming mock interviews" },
  { key: "summary", label: "Weekly summary", desc: "Your progress digest every Monday" },
  { key: "product", label: "Product news", desc: "Features and announcements" },
] as const;

export default function Settings() {
  const student = useStudent();
  const [fullName, setFullName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [title, setTitle] = useState(student.title);
  const [location, setLocation] = useState(student.location);

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    matches: true,
    interviews: true,
    summary: false,
    product: true,
  });

  const [remoteOnly, setRemoteOnly] = useState(true);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Permanently delete your account and all of your data? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setDeleteError(data.error ?? "Could not delete your account.");
        setDeleting(false);
        return;
      }
      // Account gone — drop the session and return to the landing page.
      await signOut({ callbackUrl: "/" });
    } catch {
      setDeleteError("Network error. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Account */}
        <SettingsCard title="Account" desc="Update your personal details.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" value={fullName} onChange={setFullName} />
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <Field label="Professional title" value={title} onChange={setTitle} />
            <Field label="Location" value={location} onChange={setLocation} />
          </div>
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard title="Notifications" desc="Choose what we email you about.">
          <ul className="divide-y divide-lightgray">
            {NOTIFS.map((n) => (
              <li key={n.key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-navy">{n.label}</p>
                  <p className="text-xs text-mediumgray">{n.desc}</p>
                </div>
                <Toggle
                  checked={notifs[n.key]}
                  onChange={(v) => setNotifs((prev) => ({ ...prev, [n.key]: v }))}
                />
              </li>
            ))}
          </ul>
        </SettingsCard>

        {/* Job preferences */}
        <SettingsCard title="Job preferences" desc="Tune how we match you with roles.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Desired role" value="Frontend Developer" onChange={() => {}} />
            <Field label="Expected salary" value="₹18–24 LPA" onChange={() => {}} />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#f8fafc] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-navy">Remote roles only</p>
              <p className="text-xs text-mediumgray">Only show remote-friendly jobs</p>
            </div>
            <Toggle checked={remoteOnly} onChange={setRemoteOnly} />
          </div>
        </SettingsCard>

        {/* Password */}
        <SettingsCard title="Password" desc="Change your account password.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Current" type="password" value="" onChange={() => {}} />
            <Field label="New" type="password" value="" onChange={() => {}} />
            <Field label="Confirm" type="password" value="" onChange={() => {}} />
          </div>
        </SettingsCard>

        {/* Save bar */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald">
              <Check className="h-4 w-4" />
              Changes saved
            </span>
          )}
          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-primary-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(234,88,12,0.25)] transition-transform hover:-translate-y-0.5"
          >
            Save changes
          </button>
        </div>

        {/* Danger zone */}
        <Card className="border-[#fecaca] p-6">
          <h2 className="text-sm font-semibold text-[#EF4444]">Danger zone</h2>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-mediumgray">
              Permanently delete your account and all of your data.
            </p>
            <button
              type="button"
              onClick={deleteAccount}
              disabled={deleting}
              className="shrink-0 self-start rounded-lg border border-[#EF4444] px-4 py-2 text-sm font-semibold text-[#EF4444] transition-colors hover:bg-[#fee2e2] disabled:opacity-60 sm:self-auto"
            >
              {deleting ? "Deleting…" : "Delete account"}
            </button>
          </div>
          {deleteError && (
            <p className="mt-3 text-xs font-medium text-[#EF4444]">{deleteError}</p>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
