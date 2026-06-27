import type { Metadata } from "next";
import SavedJobs from "@/components/saved/SavedJobs";

export const metadata: Metadata = {
  title: "Saved Jobs — Jems",
};

export default function SavedPage() {
  return <SavedJobs />;
}
