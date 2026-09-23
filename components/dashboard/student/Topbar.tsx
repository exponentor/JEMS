"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useTour } from "@/components/tour/TourProvider";
import { crumbForPath } from "./nav-items";
import { useOpenMobileSidebar } from "./sidebar-context";
import { useStudent } from "./StudentContext";

export default function Topbar() {
  const student = useStudent();
  const pathname = usePathname();
  const openMobileSidebar = useOpenMobileSidebar();
  const crumb = crumbForPath(pathname);
  const { start: startTour } = useTour();

  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = student.name.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  const onLogout = () => signOut({ callbackUrl: "/" });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-navy/[0.06] bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={openMobileSidebar}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-surface lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mediumgray">
        <Link
          href="/student/dashboard"
          aria-label="Dashboard"
          className="transition-colors hover:text-navy"
        >
          <Home className="h-4 w-4" />
        </Link>
        <span>/</span>
        <span className="font-medium text-navy" aria-current="page">
          {crumb}
        </span>
      </nav>

      {/* Search */}
      <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mediumgray" />
        <input
          type="search"
          placeholder="Search …"
          className="h-9 w-full rounded-lg border border-navy/[0.08] bg-surface-2 pl-9 pr-12 text-sm text-navy outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-mediumgray focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/15"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-navy/[0.08] bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-mediumgray">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-surface hover:text-navy"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange ring-2 ring-white" />
        </button>
        <button
          type="button"
          aria-label="Take the product tour"
          title="Take the product tour"
          data-tour="help"
          onClick={() => startTour("student")}
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-surface hover:text-navy sm:flex"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="ml-1 hidden items-center gap-1.5 rounded-lg bg-cta-gradient px-3.5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
        >
          <Sparkles className="h-4 w-4" />
          Upgrade
        </button>

        <div className="relative ml-1" ref={ref}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white ring-2 ring-orange/15 transition-transform hover:scale-105"
          >
            {initial}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-navy/[0.08] bg-white py-1 shadow-[var(--shadow-card)]"
              style={{ animation: "fade-in 0.18s ease-out" }}
            >
              <div className="border-b border-lightgray px-4 py-2.5">
                <p className="truncate text-sm font-semibold text-navy">{student.name}</p>
                <p className="truncate text-xs text-mediumgray">{student.email}</p>
              </div>
              <Link
                href="/student/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-navy transition-colors hover:bg-surface-2"
              >
                <User className="h-4 w-4 text-mediumgray" />
                View profile
              </Link>
              <div className="my-1 border-t border-lightgray" />
              <button
                type="button"
                role="menuitem"
                onClick={onLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-orange transition-colors hover:bg-orange/5"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
