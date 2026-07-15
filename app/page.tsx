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
import Pricing from "@/components/sections/Pricing";
import ProblemSection from "@/components/sections/ProblemSection";
import SocialProof from "@/components/sections/SocialProof";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  // The landing page is for visitors only — a signed-in student belongs on
  // their dashboard, so send them straight there.
  useEffect(() => {
    if (status === "authenticated") router.replace("/student/dashboard");
  }, [status, router]);

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

      <main>
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
        <SocialProof />
        <Companies />
        <Pricing onStartFree={goLogin} onStartPro={goLogin} />
        <FinalCTA onStartLearning={goLogin} onForCompanies={goLogin} />
      </main>

      <Footer />
    </>
  );
}
