import { loadContent } from "@/lib/docs";

/** Renders a repository-owned markdown file from `content/`. */
export async function MarkdownPage({ file }: { file: string }) {
  const html = await loadContent(file);
  return (
    <div className="pt-16">
      <div className="prose-waydlp max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
