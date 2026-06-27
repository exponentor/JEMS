import Link from "next/link";
import { Home } from "lucide-react";

/**
 * Shared breadcrumb header card shown at the top of every sidebar
 * destination — a bold page title on the left and a Home / crumb trail
 * on the right.
 */
export default function PageHeader({
  title,
  crumb,
}: {
  title: string;
  crumb: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-lightgray bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h1 className="text-lg font-bold text-navy">{title}</h1>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mediumgray">
        <Link
          href="/student/dashboard"
          aria-label="Dashboard"
          className="transition-colors hover:text-navy"
        >
          <Home className="h-4 w-4" />
        </Link>
        <span>/</span>
        <span className="rounded-md bg-slate/10 px-2 py-0.5 font-medium text-slate">
          {crumb}
        </span>
      </nav>
    </div>
  );
}
