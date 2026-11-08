import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = {
  title: "About",
  description: "What waydlp is, who it is for and how it is built.",
};

export default function Page() {
  return <MarkdownPage file="about.md" />;
}
