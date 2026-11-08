import type { Metadata } from "next";
import { Card, PageHeader, Pill } from "@/components/ui";
import { renderMarkdown } from "@/lib/docs";
import { getReleases, type GhRelease } from "@/lib/releases";
import { gh, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes for the waydlp apps, straight from GitHub Releases.",
};

export const revalidate = 3600;

async function ReleaseList({ name, repo, releases }: { name: string; repo: string; releases: GhRelease[] }) {
  const rendered = await Promise.all(
    releases.map(async (r) => ({ r, html: await renderMarkdown(escapeHtml(r.body ?? "")) })),
  );
  return (
    <section aria-labelledby={`h-${name}`} className="mt-12">
      <h2 id={`h-${name}`} className="text-2xl font-bold">
        {name}
      </h2>
      {releases.length === 0 ? (
        <Card className="mt-4">
          <p className="text-fg-2">
            No releases have been published yet. Follow progress in the{" "}
            <a className="text-accent-hover hover:underline" href={gh(repo, "/blob/main/CHANGELOG.md")}>
              repository changelog
            </a>
            .
          </p>
        </Card>
      ) : (
        <div className="mt-4 space-y-4">
          {rendered.map(({ r, html }) => (
            <Card key={r.tag_name}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold">{r.name || r.tag_name}</h3>
                {r.prerelease && <Pill tone="muted">pre-release</Pill>}
                {r.published_at && (
                  <span className="text-sm text-fg-muted">
                    {new Date(r.published_at).toISOString().slice(0, 10)}
                  </span>
                )}
                <a href={r.html_url} className="ml-auto text-sm text-accent-hover hover:underline">
                  On GitHub →
                </a>
              </div>
              <div className="prose-waydlp mt-3 text-sm" dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

/** Release notes are third-party controlled text: neutralise raw HTML before rendering markdown. */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function ChangelogPage() {
  const [desktop, mobile] = await Promise.all([
    getReleases(site.repos.desktop),
    getReleases(site.repos.mobile),
  ]);
  return (
    <div className="pt-16">
      <PageHeader
        kicker="Changelog"
        title="What's new"
        lead="Release notes are loaded from GitHub Releases."
      />
      <ReleaseList name="Desktop (Windows & Linux)" repo={site.repos.desktop} releases={desktop} />
      <ReleaseList name="Android" repo={site.repos.mobile} releases={mobile} />
    </div>
  );
}
