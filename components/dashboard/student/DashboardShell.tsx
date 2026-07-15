"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useStudent } from "./StudentContext";

/**
 * Shared chrome for every student dashboard screen: the Constructor-X style
 * sidebar + topbar with the page content rendered in the main column.
 */
export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = useStudent();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        name={student.name}
        email={student.email}
      />

      <div className="flex min-h-screen flex-col lg:pl-16">
        <Topbar
          name={student.name}
          email={student.email}
          onMenu={() => setSidebarOpen(true)}
          onLogout={() => signOut({ callbackUrl: "/" })}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
