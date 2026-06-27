"use client";

import { useRef, useState } from "react";
import {
  Briefcase,
  Camera,
  Check,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Target,
  Trash2,
  Upload,
} from "lucide-react";
import DashboardShell from "./DashboardShell";
import PageHeader from "./PageHeader";
import { student } from "./data";

type IconType = React.ComponentType<{ className?: string }>;

/** Brand glyphs (lucide dropped brand icons in this version). */
const LinkedinIcon: IconType = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const GithubIcon: IconType = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
);

/** A built-in gallery of avatars the user can pick from (DiceBear, rendered at runtime). */
const AVATAR_SEEDS = [
  "Felix", "Aneka", "Milo", "Zoe", "Kai", "Luna",
  "Rex", "Nova", "Theo", "Ivy", "Atlas", "Mira",
  "Jett", "Sora", "Bo",
];
const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffd5dc,c0aede,d1d4f9,b6e3f4,ffdfbf`;

const STATS = [
  { label: "Applications", value: "12", Icon: Briefcase },
  { label: "Job Matches", value: "37", Icon: Target },
  { label: "Interviews", value: "5", Icon: Check },
];

const TABS = ["Profile", "Activity", "Saved Jobs", "Settings"];

const SOCIALS = [
  { Icon: Phone, tone: "bg-emerald", label: "Call" },
  { Icon: Mail, tone: "bg-orange", label: "Email" },
  { Icon: Send, tone: "bg-slate", label: "Telegram" },
];

/** A labelled text input matching the Constructor-X form style. */
function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
  required,
  Icon,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  Icon?: IconType;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
      </span>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mediumgray" />
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-lightgray bg-white pr-3.5 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15 ${
            Icon ? "pl-9" : "pl-3.5"
          }`}
        />
      </div>
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-wide text-mediumgray">
      {children}
    </h3>
  );
}

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string>(avatarUrl("Felix"));
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("Profile");

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="User Profile" crumb="Profile" />

        {/* Cover + identity */}
        <div className="overflow-hidden rounded-2xl border border-lightgray bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="h-40 bg-[linear-gradient(120deg,#c7d2fe_0%,#a5b4fc_45%,#bae6fd_100%)] sm:h-48" />

          <div className="px-5 pb-5 sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Stats */}
              <div className="order-2 flex gap-6 sm:order-1">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <s.Icon className="mx-auto mb-1 h-5 w-5 text-slate" />
                    <p className="text-xl font-bold text-navy">{s.value}</p>
                    <p className="text-xs text-mediumgray">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Avatar */}
              <div className="order-1 -mt-16 flex flex-col items-center sm:order-2 sm:-mt-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt="Profile avatar"
                  className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                />
                <p className="mt-2 text-base font-bold text-navy">{student.name}</p>
                <p className="text-xs text-mediumgray">{student.title}</p>
              </div>

              {/* Socials */}
              <div className="order-3 flex items-center justify-center gap-2 sm:justify-end">
                {SOCIALS.map(({ Icon, tone, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${tone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex gap-1 overflow-x-auto border-t border-lightgray pt-3">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-slate/10 text-slate"
                      : "text-mediumgray hover:bg-[#f1f5f9] hover:text-navy"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Account management + profile information */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: account management */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-lightgray bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <SectionTitle>Account Management</SectionTitle>

              {/* Current photo */}
              <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-[#f1f5f9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt="Selected avatar"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setAvatar(avatarUrl("Felix"))}
                  aria-label="Reset photo"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur transition-colors hover:bg-navy/80"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Upload */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-lightgray py-3 text-sm font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </button>

              {/* Avatar gallery */}
              <div className="mt-5">
                <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-navy">
                  <Camera className="h-4 w-4 text-mediumgray" />
                  Or pick an avatar
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_SEEDS.map((seed) => {
                    const url = avatarUrl(seed);
                    const selected = avatar === url;
                    return (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => setAvatar(url)}
                        aria-label={`Avatar ${seed}`}
                        className={`relative aspect-square overflow-hidden rounded-full bg-[#f1f5f9] transition-transform hover:scale-110 ${
                          selected
                            ? "ring-2 ring-slate ring-offset-2"
                            : "ring-1 ring-lightgray"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={seed} className="h-full w-full object-cover" />
                        {selected && (
                          <span className="absolute inset-0 flex items-center justify-center bg-slate/30">
                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Password */}
              <div className="mt-6 space-y-4 border-t border-lightgray pt-5">
                <Field label="Old Password" type="password" placeholder="••••••••" />
                <Field label="New Password" type="password" placeholder="••••••••" />
                <button
                  type="button"
                  className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f2937]"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Right: profile information */}
          <div className="lg:col-span-2">
            <form className="space-y-8 rounded-2xl border border-lightgray bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {/* Profile information */}
              <div>
                <SectionTitle>Profile Information</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Username" defaultValue="alex.kumar" />
                  <Field label="First Name" defaultValue="Alex" />
                  <Field label="Nickname" placeholder="Alex" />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-navy">Role</span>
                    <select
                      defaultValue="Student"
                      className="h-11 w-full rounded-xl border border-lightgray bg-white px-3 text-sm text-navy outline-none transition-colors focus:border-slate focus:ring-2 focus:ring-slate/15"
                    >
                      <option>Student</option>
                      <option>Job Seeker</option>
                      <option>Mentor</option>
                    </select>
                  </label>
                  <Field label="Last Name" defaultValue="Kumar" />
                  <Field label="Display Name Publicly as" defaultValue="Alex Kumar" />
                </div>
              </div>

              {/* Contact info */}
              <div>
                <SectionTitle>Contact Info</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Email" type="email" defaultValue={student.email} required />
                  <Field label="Website" placeholder="alex-kumar.dev" />
                  <Field
                    label="LinkedIn"
                    type="url"
                    Icon={LinkedinIcon}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  <Field
                    label="GitHub"
                    type="url"
                    Icon={GithubIcon}
                    placeholder="https://github.com/your-username"
                  />
                  <Field label="WhatsApp" placeholder="@alex-kumar" />
                  <Field label="Telegram" placeholder="@alex-kumar" />
                </div>
              </div>

              {/* About */}
              <div>
                <SectionTitle>About the User</SectionTitle>
                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">
                    Biographical Info
                  </span>
                  <textarea
                    rows={5}
                    defaultValue="Aspiring frontend developer passionate about building delightful, accessible web experiences with React and TypeScript. Currently sharpening my skills and looking for my first full-time role."
                    className="w-full resize-y rounded-xl border border-lightgray bg-white p-3.5 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15"
                  />
                </label>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-mediumgray">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {student.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="h-4 w-4" /> alex-kumar.dev
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-lightgray pt-5">
                <button
                  type="reset"
                  className="rounded-xl border border-lightgray px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-[#f1f5f9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition-transform hover:-translate-y-0.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
