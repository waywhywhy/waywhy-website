import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about waydlp." };

export default function Page() {
  return <MarkdownPage file="faq.md" />;
}
