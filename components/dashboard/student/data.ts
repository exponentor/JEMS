/**
 * Demo student dashboard data, derived from the test login account
 * (student@test.com — "Alex Kumar"). Stands in for a real session/API.
 */

export interface StatTile {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down" | "neutral";
}

export interface NextStep {
  title: string;
  desc: string;
  action: string;
  progress?: number;
}

export interface JobMatch {
  role: string;
  company: string;
  match: number;
  location: string;
  type: string;
  salary: string;
  posted: string;
}

export interface UpcomingItem {
  title: string;
  when: string;
  tag: string;
}

export interface ActivityItem {
  text: string;
  time: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export const student = {
  name: "Alex Kumar",
  firstName: "Alex",
  email: "student@test.com",
  title: "Aspiring Frontend Developer",
  location: "Bengaluru, India",
  readiness: 45,
};

export const stats: StatTile[] = [
  { label: "Job Readiness", value: "45%", sub: "+8% this week", trend: "up" },
  { label: "ATS Resume Score", value: "68", sub: "out of 100", trend: "neutral" },
  { label: "Mock Interviews", value: "2 / 10", sub: "Avg score 72%", trend: "up" },
  { label: "New Job Matches", value: "5", sub: "3 closing soon", trend: "neutral" },
];

export const nextSteps: NextStep[] = [
  {
    title: "Complete your resume",
    desc: "2 of 5 sections done",
    action: "Continue",
    progress: 40,
  },
  {
    title: "Take a mock interview",
    desc: "Frontend fundamentals",
    action: "Start",
  },
  {
    title: "Add 3 more skills",
    desc: "Boost your match score",
    action: "Add skills",
  },
];

export const jobs: JobMatch[] = [
  {
    role: "Frontend Developer",
    company: "Stripe",
    match: 92,
    location: "Remote",
    type: "Full-time",
    salary: "$120k–150k",
    posted: "2d ago",
  },
  {
    role: "React Engineer",
    company: "Airbnb",
    match: 88,
    location: "Bengaluru",
    type: "Full-time",
    salary: "₹18–24 LPA",
    posted: "4d ago",
  },
  {
    role: "UI Engineer",
    company: "Razorpay",
    match: 81,
    location: "Hybrid",
    type: "Full-time",
    salary: "₹14–20 LPA",
    posted: "1w ago",
  },
  {
    role: "Junior Web Developer",
    company: "Zoho",
    match: 76,
    location: "Chennai",
    type: "Full-time",
    salary: "₹8–12 LPA",
    posted: "1w ago",
  },
];

export const upcoming: UpcomingItem[] = [
  { title: "Mock Interview: System Design", when: "Tomorrow · 3:00 PM", tag: "Interview" },
  { title: "Resume review with mentor", when: "Fri · 11:00 AM", tag: "Mentor" },
  { title: "Live session: React Patterns", when: "Sat · 6:00 PM", tag: "Learning" },
];

export const activity: ActivityItem[] = [
  { text: "Completed “React Hooks” lesson", time: "2h ago" },
  { text: "Scored 74% on JavaScript mock interview", time: "Yesterday" },
  { text: "Applied to Frontend Developer at Stripe", time: "2 days ago" },
  { text: "Updated resume — Experience section", time: "3 days ago" },
];

export const skills: SkillItem[] = [
  { name: "React", level: 80 },
  { name: "JavaScript", level: 75 },
  { name: "CSS / Tailwind", level: 70 },
  { name: "TypeScript", level: 55 },
  { name: "Node.js", level: 40 },
];
