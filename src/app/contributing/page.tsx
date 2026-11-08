import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = {
  title: "Contributing",
  description: "How to contribute code, documentation, translations and bug reports to waydlp.",
};

export default function Page() {
  return <MarkdownPage file="contributing.md" />;
}
