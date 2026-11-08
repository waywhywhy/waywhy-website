import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "waydlp collects no personal data: no accounts, ads, analytics or telemetry.",
};

export default function Page() {
  return <MarkdownPage file="privacy.md" />;
}
