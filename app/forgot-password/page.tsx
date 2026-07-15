"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForgotPasswordFlow } from "@/components/auth/ForgotPasswordFlow";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 inline-block text-2xl font-extrabold tracking-tight text-navy"
        >
          jems<span className="text-orange">.</span>
        </Link>
        <ForgotPasswordFlow onBackToLogin={() => router.push("/login")} />
      </div>
    </div>
  );
}
