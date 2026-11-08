import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { DOCS } from "@/lib/docs";

export const metadata: Metadata = { title: "Documentation" };

export default function DocsIndex() {
  const sections = Array.from(new Set(DOCS.map((d) => d.section)));
  return (
    <div className="pt-16">
      <PageHeader
        kicker="Documentation"
        title="Learn waydlp"
        lead="Everything from your first download to building the apps yourself. No prior knowledge of yt-dlp or FFmpeg needed."
      />
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s} aria-labelledby={`sec-${s}`}>
            <h2 id={`sec-${s}`} className="mb-4 text-sm font-semibold tracking-wide text-fg-muted uppercase">
              {s}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DOCS.filter((d) => d.section === s).map((d) => (
                <Link key={d.slug} href={`/docs/${d.slug}`} className="group">
                  <Card className="h-full transition-colors group-hover:border-accent-2/70">
                    <h3 className="font-semibold text-fg group-hover:text-accent-hover">{d.title}</h3>
                    <p className="mt-1 text-sm text-fg-2">{d.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
