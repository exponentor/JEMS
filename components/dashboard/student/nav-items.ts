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

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Real route. Items without one are visual-only (page not built yet). */
  href?: string;
}

export const NAVIGATE: NavItem[] = [
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

export const MORE: NavItem[] = [
  { label: "Settings", icon: Settings, href: "/student/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/student/help" },
  { label: "Support", icon: LifeBuoy, href: "/student/support" },
];

/** The breadcrumb label for the current route, used by the topbar. */
export function crumbForPath(pathname: string): string {
  const match = [...NAVIGATE, ...MORE].find((item) => item.href === pathname);
  return match?.label ?? "Dashboard";
}
