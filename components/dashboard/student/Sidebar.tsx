"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  type LucideIcon,
  Mic,
  Settings,
  Target,
  TrendingUp,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Real route. Items without one are visual-only (page not built yet). */
  href?: string;
}

const NAVIGATE: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard" },
  { label: "Profile", icon: User, href: "/student/profile" },
  { label: "Resume Builder", icon: FileText, href: "/student/resume" },
  { label: "Job Matches", icon: Target, href: "/student/jobs" },
  { label: "Applications", icon: Briefcase, href: "/student/applications" },
  { label: "Mock Interviews", icon: Mic, href: "/student/interviews" },
  { label: "Learning Paths", icon: GraduationCap, href: "/student/learning" },
  { label: "My Progress", icon: TrendingUp, href: "/student/progress" },
  { label: "Saved Jobs", icon: Bookmark, href: "/student/saved" },
];

const MORE: NavItem[] = [
  { label: "Settings", icon: Settings, href: "/student/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/student/help" },
  { label: "Support", icon: LifeBuoy, href: "/student/support" },
];

/** Text that is hidden while the rail is collapsed and fades in on hover. */
const reveal =
  "whitespace-nowrap transition-opacity duration-200 opacity-100 lg:hidden lg:opacity-0 lg:group-hover:inline-block lg:group-hover:opacity-100";

function NavList({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p
        className={`${reveal} mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-mediumgray`}
      >
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = !!item.href && pathname === item.href;
          const cls = `group/item flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all lg:justify-center lg:group-hover:justify-start ${
            isActive
              ? "bg-primary-gradient text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
              : "text-[#475569] hover:bg-[#f1f5f9] hover:text-navy"
          }`;
          const inner = (
            <>
              <Icon
                className="h-[18px] w-[18px] shrink-0 transition-transform group-hover/item:scale-110"
                strokeWidth={2}
              />
              <span className={`${reveal} flex-1 truncate text-left`}>{item.label}</span>
            </>
          );
          return (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} onClick={onNavigate} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button type="button" onClick={onNavigate} className={`w-full ${cls}`}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Aceternity-style sidebar: a slim 64px icon rail (icons centered) that
 * expands to 240px on hover, fading labels in. Mobile is a slide-in drawer.
 */
export default function Sidebar({
  open,
  onClose,
  name,
  email,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
}) {
  const pathname = usePathname();
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`group fixed inset-y-0 left-0 z-50 flex h-screen w-60 flex-col overflow-hidden border-r border-lightgray bg-white transition-[width,transform,box-shadow] duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:w-16 lg:translate-x-0 lg:hover:w-60 lg:hover:shadow-[10px_0_40px_rgba(17,24,39,0.07)]`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex h-16 shrink-0 items-center gap-2.5 px-3 lg:justify-center lg:group-hover:justify-start lg:px-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-base font-extrabold text-white">
            j
          </span>
          <span className={`${reveal} text-lg font-extrabold tracking-tight text-navy`}>
            jems<span className="text-orange">.</span>
          </span>
        </Link>

        {/* User card */}
        <div className="px-2.5">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#f1f5f9] lg:justify-center lg:group-hover:justify-start"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate text-sm font-semibold text-white ring-2 ring-slate/15">
              {initial}
            </span>
            <span className={`${reveal} min-w-0 flex-1`}>
              <span className="block truncate text-[13px] font-semibold text-navy">{name}</span>
              <span className="block truncate text-[11px] text-mediumgray">{email}</span>
            </span>
          </button>
        </div>

        <div className="mx-3 my-2 h-px bg-lightgray" />

        {/* Nav */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-2.5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <NavList title="Navigate" items={NAVIGATE} pathname={pathname} onNavigate={onClose} />
          <NavList title="More" items={MORE} pathname={pathname} onNavigate={onClose} />
        </nav>
      </aside>
    </>
  );
}
