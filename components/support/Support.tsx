"use client";

import { useState } from "react";
import {
  type LucideIcon,
  Check,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/student/DashboardShell";
import PageHeader from "@/components/dashboard/student/PageHeader";
import { Card } from "@/components/dashboard/student/ui";

interface Channel {
  title: string;
  desc: string;
  status: string;
  cta: string;
  icon: LucideIcon;
  online?: boolean;
}

const CHANNELS: Channel[] = [
  { title: "Live Chat", desc: "Chat with our team", status: "Avg reply < 2 min", cta: "Start chat", icon: MessageCircle, online: true },
  { title: "Email", desc: "support@jems.com", status: "Replies within 24h", cta: "Send email", icon: Mail },
  { title: "Call us", desc: "Mon–Fri, 9–6 IST", status: "Available now", cta: "Call now", icon: Phone, online: true },
];

const CATEGORIES = [
  "Account & login",
  "Resume Builder",
  "Mock Interviews",
  "Job matching",
  "Billing & plans",
  "Something else",
];

type TicketStatus = "Open" | "In progress" | "Resolved";

const TICKETS: { id: string; subject: string; status: TicketStatus; date: string }[] = [
  { id: "#JMS-1042", subject: "Resume PDF export issue", status: "In progress", date: "Jun 25" },
  { id: "#JMS-1031", subject: "Interview score not updating", status: "Open", date: "Jun 23" },
  { id: "#JMS-1009", subject: "Cannot connect LinkedIn", status: "Resolved", date: "Jun 18" },
];

function statusTone(s: TicketStatus) {
  if (s === "Resolved") return "bg-emerald/10 text-emerald";
  if (s === "In progress") return "bg-slate/10 text-slate";
  return "bg-gold/10 text-[#b45309]";
}

const inputClass =
  "h-11 w-full rounded-lg border border-lightgray bg-white px-3 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15";

export default function Support() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSent(true);
    setSubject("");
    setCategory("");
    setMessage("");
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Support" crumb="Support" />

        {/* Channels */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} className="flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate/10 text-slate">
                    <Icon className="h-5 w-5" />
                  </span>
                  {c.online && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald">
                      <span className="h-2 w-2 rounded-full bg-emerald" />
                      Online
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-bold text-navy">{c.title}</h3>
                <p className="text-xs text-mediumgray">{c.desc}</p>
                <p className="mt-1 flex-1 text-[11px] font-medium text-mediumgray">{c.status}</p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg border border-lightgray py-2.5 text-sm font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
                >
                  {c.cta}
                </button>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Submit a ticket */}
          <Card className="lg:col-span-3">
            <div className="border-b border-lightgray px-5 py-3.5">
              <h2 className="text-sm font-semibold text-navy">Submit a ticket</h2>
            </div>
            <div className="p-5">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <Check className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-navy">Ticket submitted</p>
                  <p className="mt-1 text-xs text-mediumgray">
                    We&apos;ve received your request and will reply by email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-5 rounded-lg border border-lightgray px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-slate hover:text-slate"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="sup-subject" className="mb-1.5 block text-xs font-medium text-navy">
                      Subject
                    </label>
                    <input
                      id="sup-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief summary of the issue"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="sup-category" className="mb-1.5 block text-xs font-medium text-navy">
                      Category
                    </label>
                    <select
                      id="sup-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`${inputClass} appearance-none ${category ? "" : "text-mediumgray"}`}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="text-navy">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sup-message" className="mb-1.5 block text-xs font-medium text-navy">
                      Message
                    </label>
                    <textarea
                      id="sup-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue in detail…"
                      className="min-h-28 w-full resize-y rounded-lg border border-lightgray bg-white px-3 py-2 text-sm leading-6 text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:ring-2 focus:ring-slate/15"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary-gradient py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-8"
                  >
                    Submit ticket
                  </button>
                </form>
              )}
            </div>
          </Card>

          {/* Your tickets */}
          <Card className="lg:col-span-2">
            <div className="border-b border-lightgray px-5 py-3.5">
              <h2 className="text-sm font-semibold text-navy">Your tickets</h2>
            </div>
            <ul className="divide-y divide-lightgray">
              {TICKETS.map((t) => (
                <li key={t.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-mediumgray">{t.id}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusTone(t.status)}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-navy">{t.subject}</p>
                  <p className="mt-0.5 text-xs text-mediumgray">Updated {t.date}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
