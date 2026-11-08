import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata: Metadata = {
  title: "Licenses",
  description: "Licenses of waydlp and the open-source software it uses.",
};

export default function Page() {
  return <MarkdownPage file="licenses.md" />;
}
