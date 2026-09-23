"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Companies from "@/components/sections/Companies";
import Features from "@/components/sections/Features";
import FinalCTA from "@/components/sections/FinalCTA";
import HowItWorks from "@/components/sections/HowItWorks";
import Innovation from "@/components/sections/Innovation";
import InstitutionalImpact from "@/components/sections/InstitutionalImpact";
import Pricing from "@/components/sections/Pricing";
import ProblemSection from "@/components/sections/ProblemSection";
import SocialProof from "@/components/sections/SocialProof";

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession();

  // The landing page is for visitors only — a signed-in user belongs on
  // their own portal, so send them straight there.
  useEffect(() => {
    if (status !== "authenticated") return;
    const home: Record<string, string> = {
      student: "/student/dashboard",
      company: "/company/dashboard",
      institution: "/institution/dashboard",
      faculty: "/faculty/dashboard",
    };
    router.replace(home[session?.user?.role ?? "student"] ?? "/student/dashboard");
  }, [status, session, router]);

  const goLogin = () => router.push("/login");

  // Scroll-based navigation for the landing-page anchors.
  const handleNavigate = (href: string) => {
    if (typeof window === "undefined") return;
    if (href === "/" || href === "#home" || href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("#")) {
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Don't flash the marketing page while we redirect an authenticated user.
  if (status === "authenticated") return null;

  return (
    <>
      <Navbar
        isAuthenticated={false}
        userRole={null}
        currentPage="/"
        onNavigate={handleNavigate}
        onLogin={goLogin}
        onSignup={() => router.push("/signup")}
      />

      <main id="main" className="pt-16">
        <Hero
          isAuthenticated={false}
          userRole={null}
          onNavigate={handleNavigate}
          onStartLearning={goLogin}
          onForCompanies={goLogin}
        />

        <ProblemSection />
        <HowItWorks />
        <Features />
        <Innovation />
        <InstitutionalImpact />
        <SocialProof />
        <Companies />
        <Pricing onStartFree={goLogin} onStartPro={goLogin} />
        <FinalCTA onStartLearning={goLogin} onForCompanies={goLogin} />
      </main>

      <Footer />
    </>
  );
}
