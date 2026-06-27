import type { Metadata } from "next";
import Support from "@/components/support/Support";

export const metadata: Metadata = {
  title: "Support — Jems",
};

export default function SupportPage() {
  return <Support />;
}
