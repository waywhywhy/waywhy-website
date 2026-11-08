import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = {
  title: "Security",
  description: "How to report security vulnerabilities in waydlp privately.",
};

export default function Page() {
  return <MarkdownPage file="security.md" />;
}
