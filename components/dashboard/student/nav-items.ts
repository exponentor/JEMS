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
  User,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Real route. Items without one are visual-only (page not built yet). */
  href?: string;
}

/** `data-tour` anchor for a nav item, e.g. "nav-resume" for /student/resume. */
export function navTourId(item: NavItem): string | undefined {
  return item.href ? `nav-${item.href.split("/").pop()}` : undefined;
}

export const NAVIGATE: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard" },
  { label: "Profile & Portfolio", icon: User, href: "/student/profile" },
  { label: "Resume Builder", icon: FileText, href: "/student/resume" },
  { label: "Applications", icon: Briefcase, href: "/student/applications" },
  { label: "Mock Interviews", icon: Mic, href: "/student/interviews" },
  { label: "Learning Paths", icon: GraduationCap, href: "/student/learning" },
  // { label: "Roadmap", icon: Route, href: "/student/roadmap" },
  // { label: "My Progress", icon: TrendingUp, href: "/student/progress" },
  { label: "Saved Jobs", icon: Bookmark, href: "/student/saved" },
];

export const MORE: NavItem[] = [
  { label: "Settings", icon: Settings, href: "/student/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/student/help" },
  { label: "Support", icon: LifeBuoy, href: "/student/support" },
];

/** The breadcrumb label for the current route, used by the topbar. */
export function crumbForPath(pathname: string): string {
  const items = [...NAVIGATE, ...MORE];
  const exact = items.find((item) => item.href === pathname);
  if (exact) return exact.label;
  // Nested routes (e.g. /student/roadmap/goals) inherit their section's label.
  const parent = items.find((item) => item.href && pathname.startsWith(item.href + "/"));
  return parent?.label ?? "Dashboard";
}
