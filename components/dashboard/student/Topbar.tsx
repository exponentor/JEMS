"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronLeft,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";

interface TopbarProps {
  name: string;
  email: string;
  onMenu: () => void;
  onLogout: () => void;
}

const NAV = [
  { label: "Dashboard", href: "/student/dashboard" },
  { label: "Profile", href: "/student/profile" },
  { label: "Resume", href: "/student/resume" },
  { label: "Support", href: "/student/support" },
];

export default function Topbar({ name, email, onMenu, onLogout }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initial = name.trim().charAt(0).toUpperCase() || "U";

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

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-lightgray bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-[#f1f5f9] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="hidden h-9 w-9 items-center justify-center rounded-full border border-lightgray text-navy transition-colors hover:bg-[#f1f5f9] lg:flex"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Center nav */}
      <nav className="hidden items-center gap-1 lg:flex">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "text-navy"
                  : "text-mediumgray hover:bg-[#f1f5f9] hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Search */}
      <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mediumgray" />
        <input
          type="search"
          placeholder="Search …"
          className="h-9 w-full rounded-lg border border-lightgray bg-[#f8fafc] pl-9 pr-12 text-sm text-navy outline-none transition-colors placeholder:text-mediumgray focus:border-slate focus:bg-white focus:ring-2 focus:ring-slate/15"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-lightgray bg-white px-1.5 py-0.5 text-[10px] font-semibold text-mediumgray">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-[#f1f5f9] hover:text-navy"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange ring-2 ring-white" />
        </button>
        <button
          type="button"
          aria-label="Help"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-[#f1f5f9] hover:text-navy sm:flex"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-mediumgray transition-colors hover:bg-[#f1f5f9] hover:text-navy sm:flex"
        >
          <Settings className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="ml-1 hidden items-center gap-1.5 rounded-lg bg-primary-gradient px-3.5 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate text-sm font-semibold text-white ring-2 ring-slate/15 transition-transform hover:scale-105"
          >
            {initial}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-lightgray bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              style={{ animation: "fade-in 0.18s ease-out" }}
            >
              <div className="border-b border-lightgray px-4 py-2.5">
                <p className="truncate text-sm font-semibold text-navy">{name}</p>
                <p className="truncate text-xs text-mediumgray">{email}</p>
              </div>
              <Link
                href="/student/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-navy transition-colors hover:bg-[#f8fafc]"
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

        <button
          type="button"
          onClick={onLogout}
          aria-label="Close"
          className="hidden h-9 w-9 items-center justify-center rounded-full border border-lightgray text-mediumgray transition-colors hover:bg-[#f1f5f9] hover:text-navy sm:flex"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
