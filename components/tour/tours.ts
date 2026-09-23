/**
 * Guided product tours (React Joyride). Each step is tagged with the pillar of
 * the SIH problem statement it demonstrates, so a judge can map what they see
 * on screen to the "expected solution" list.
 *
 * Steps anchor to `data-tour="…"` attributes. Cross-page steps carry a `route`;
 * the TourProvider navigates there and waits for the target before showing it.
 */

export type TourPillar =
  | "Skill Development"
  | "Internship"
  | "Placement"
  | "Platform"
  | "Collaboration";

export type TourId = "landing" | "student";

export interface TourStep {
  target: string;
  title: string;
  content: string;
  pillar: TourPillar;
  /** Route the target lives on. Omit for same-page tours. */
  route?: string;
  placement?: "top" | "bottom" | "left" | "right" | "auto" | "center";
  /** Highlight a wider element than the one the tooltip anchors to. */
  spotlight?: string;
}

/** Any student page's first card — set by DashboardContainer. */
const PAGE_HERO = '[data-tour="page"] > :first-child';
const PAGE_SECOND = '[data-tour="page"] > :nth-child(2)';

export const TOURS: Record<TourId, { title: string; steps: TourStep[] }> = {
  // ── Pre-login: the pitch, end to end ─────────────────────────────────
  landing: {
    title: "What is JEMS?",
    steps: [
      {
        target: '[data-tour="hero"]',
        placement: "center",
        pillar: "Platform",
        title: "An Academia–Industry Collaboration Portal",
        content:
          "JEMS is a single platform where students discover the skills industry actually wants, industries find candidates who have them, and institutions watch the whole pipeline. This 60-second tour walks through how the prototype covers the full skill → internship → placement lifecycle.",
      },
      {
        target: "#problem",
        placement: "top",
        pillar: "Platform",
        title: "The gap we're closing",
        content:
          "Students can't see which skills their target role needs. Industries can't find candidates with the right skill sets. Academicians have little visibility into industry exposure. Every feature that follows exists to remove one of those three gaps.",
      },
      {
        target: "#how-it-works",
        placement: "top",
        pillar: "Skill Development",
        title: "Assess → Map → Learn → Apply → Place",
        content:
          "A student sets a career goal, gets a skill profile with gaps, follows an industry-aligned roadmap with quizzes that verify each skill, is matched to internships and jobs by skill compatibility, and tracks every application to placement.",
      },
      {
        target: "#features",
        placement: "top",
        pillar: "Skill Development",
        title: "Skill profiling, roadmaps, verified portfolio",
        content:
          "Personalised roadmaps recommend roles, modules and certifications aligned to industry demand. Passing a module credits a verified skill to the student's digital portfolio, which feeds job matching and the resume builder.",
      },
      {
        target: "#companies",
        placement: "top",
        pillar: "Placement",
        title: "The industry side",
        content:
          "Companies post internships, projects, apprenticeships and entry-level roles with required skills, publish learning programs, and get skill-compatibility shortlists plus recruitment analytics on their own dashboard.",
      },
      {
        target: "#get-started",
        placement: "top",
        pillar: "Platform",
        title: "Role-based access",
        content:
          "One account system, four workspaces: students (assessment → roadmap → matching), industry (post openings, skill-ranked shortlists, publish programs), academicians (FDPs, faculty internships, research) and institutions (cohort analytics). Sign in as a student to see the live workspace tour.",
      },
    ],
  },

  // ── Post-login: the student workspace, page by page ──────────────────
  student: {
    title: "Your JEMS workspace",
    steps: [
      {
        route: "/student/dashboard",
        target: '[data-tour="dashboard-stats"]',
        placement: "bottom",
        pillar: "Platform",
        title: "Your dashboard",
        content:
          "Job readiness, applications, interviews and learning progress at a glance — the same signals an institution's analytics dashboard aggregates across its students.",
      },
      {
        route: "/student/dashboard",
        target: '[data-tour="sidebar"]',
        placement: "right",
        pillar: "Platform",
        title: "One workspace for the whole lifecycle",
        content:
          "Everything from skill assessment to placement lives in this sidebar. Let's walk through it in the order a student would actually use it.",
      },
      {
        route: "/student/assessment",
        target: '[data-tour="assessment-steps"]',
        placement: "bottom",
        pillar: "Skill Development",
        title: "Skill assessment comes first",
        content:
          "Students rate the skills industry actually lists in its openings, plus a soft-skill and aptitude questionnaire. Those are *claimed* skills — the Assessment Agent then verifies each one with a server-graded skill test. Only verified skills reach the resume, portfolio and matching.",
      },
      {
        route: "/student/analysis",
        target: '[data-tour="analysis-inputs"]',
        placement: "bottom",
        pillar: "Skill Development",
        title: "Skill assessment: your data meets industry data",
        content:
          "Your profile, skills and career goal on the left; the skills companies are actually asking for in live openings on the right. This is what the AI layer analyses.",
      },
      {
        route: "/student/analysis",
        target: '[data-tour="analysis-agents"]',
        placement: "bottom",
        pillar: "Platform",
        title: "Multi-agent AI layer",
        content:
          "Six coordinated agents — Analysis, Roadmap, Learning, Assessment, Matching, Collaboration — run under an orchestrator and show their reasoning. In this prototype they're rule-based; the Ollama integration point is ready for a real model.",
      },
      {
        route: "/student/roadmap",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Skill Development",
        title: "Skill mapping → personalised roadmap",
        content:
          "Pick a target career (pre-selected from your signup answers) and JEMS generates a phase-by-phase roadmap: the modules, topics and skills industry expects for that role. Skills you already hold are marked; the rest are your gaps.",
      },
      {
        route: "/student/roadmap",
        target: PAGE_SECOND,
        placement: "top",
        pillar: "Skill Development",
        title: "Verified skills, not self-declared ones",
        content:
          "Each module has narrated lessons and a quiz graded on the server. Modules unlock sequentially, and passing one credits its skills to your profile — that's what makes the portfolio 'verified'.",
      },
      {
        route: "/student/learning",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Skill Development",
        title: "Industry learning programs",
        content:
          "Training programs, certification courses and workshops published by companies, recommended against your skill gaps. Progress here feeds your readiness score.",
      },
      {
        route: "/student/jobs",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Placement",
        title: "Recommendation engine",
        content:
          "Internships and jobs posted by industry, ranked by how well your verified skill profile matches the role's required skills. Apply directly from here.",
      },
      {
        route: "/student/applications",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Internship",
        title: "Application tracking",
        content:
          "Every internship and job application in one place — applied, shortlisted, interview, offer. Recruiters update the status from their side; you see it here.",
      },
      {
        route: "/student/interviews",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Placement",
        title: "Placement readiness",
        content:
          "AI mock interviews for the roles you're targeting, with scores and feedback that count toward your readiness percentage.",
      },
      {
        route: "/student/profile",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Skill Development",
        title: "Profile & verified portfolio",
        content:
          "Edit your profile here, and open the Portfolio tab for skills verified by quizzes, a certificate per passed module, projects, internships and achievements — with a public link recruiters and institutions can open.",
      },
      {
        route: "/student/resume",
        target: '[data-tour="resume-import"]',
        placement: "bottom",
        pillar: "Placement",
        title: "Resume that reflects the portfolio",
        content:
          "One click imports every JEMS-verified skill, certificate and roadmap project into the resume, with a verified mark recruiters can trust. ATS scoring and versions are built in.",
      },
      {
        route: "/student/progress",
        target: PAGE_HERO,
        placement: "bottom",
        pillar: "Platform",
        title: "Analytics",
        content:
          "Skill growth, streaks, achievements and readiness over time. The institution view aggregates exactly these numbers across a cohort to monitor skill development and placement progress.",
      },
      {
        route: "/student/dashboard",
        target: '[data-tour="help"]',
        placement: "bottom",
        pillar: "Platform",
        title: "That's the tour",
        content:
          "You can replay it any time from this help button. Next: set your career goal on the Roadmap page and start your first module.",
      },
    ],
  },
};

export const PILLAR_STYLE: Record<TourPillar, string> = {
  "Skill Development": "bg-emerald/10 text-emerald",
  Internship: "bg-sky-50 text-sky-700",
  Placement: "bg-slate/10 text-slate",
  Platform: "bg-navy/10 text-navy",
  Collaboration: "bg-violet-50 text-violet-700",
};
