import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCS, loadDoc } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = DOCS.find((x) => x.slug === slug);
  return d ? { title: d.title, description: d.description } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await loadDoc(slug);
  if (!doc) notFound();
  const i = DOCS.findIndex((d) => d.slug === slug);
  const prev = i > 0 ? DOCS[i - 1] : undefined;
  const next = i < DOCS.length - 1 ? DOCS[i + 1] : undefined;

  return (
    <div className="grid gap-10 pt-12 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block" aria-label="Documentation">
        <nav className="sticky top-24 space-y-1 text-sm">
          <Link href="/docs" className="mb-3 block font-semibold text-fg">
            Documentation
          </Link>
          {DOCS.map((d) => (
            <Link
              key={d.slug}
              href={`/docs/${d.slug}`}
              aria-current={d.slug === slug ? "page" : undefined}
              className={`block rounded-lg px-3 py-1.5 ${
                d.slug === slug ? "bg-accent-dark/30 text-fg" : "text-fg-2 hover:bg-surface hover:text-fg"
              }`}
            >
              {d.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="min-w-0">
        <p className="mb-2 text-sm text-fg-muted">
          <Link href="/docs" className="hover:text-accent-hover">
            Docs
          </Link>{" "}
          / {doc.meta.section}
        </p>
        <div className="prose-waydlp max-w-3xl" dangerouslySetInnerHTML={{ __html: doc.html }} />
        <nav
          className="mt-14 flex max-w-3xl justify-between gap-4 border-t border-border pt-6 text-sm"
          aria-label="Pagination"
        >
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="text-accent-hover hover:underline">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`} className="text-accent-hover hover:underline">
              {next.title} →
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
