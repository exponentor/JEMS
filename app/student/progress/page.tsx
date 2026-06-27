import type { Metadata } from "next";
import MyProgress from "@/components/progress/MyProgress";

export const metadata: Metadata = {
  title: "My Progress — Jems",
};

export default function ProgressPage() {
  return <MyProgress />;
}
