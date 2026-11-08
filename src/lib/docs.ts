import fs from "node:fs/promises";
import path from "node:path";
import { Marked } from "marked";

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  section: "Start here" | "Platforms" | "Using waydlp" | "Under the hood" | "Help";
}

/** Ordered table of contents. Each entry has a `content/docs/<slug>.md` file. */
export const DOCS: DocMeta[] = [
  {
    slug: "installation",
    title: "Installation",
    description: "Pick the right download for your system.",
    section: "Start here",
  },
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Your first download in a minute.",
    section: "Start here",
  },
  {
    slug: "windows",
    title: "Windows setup",
    description: "Installer, MSI, portable and SmartScreen.",
    section: "Platforms",
  },
  {
    slug: "linux",
    title: "Linux setup",
    description: "AppImage, deb, rpm, Flatpak, Arch and tar.gz.",
    section: "Platforms",
  },
  {
    slug: "android",
    title: "Android installation",
    description: "Installing and using the APK.",
    section: "Platforms",
  },
  {
    slug: "using-the-downloader",
    title: "Using the downloader",
    description: "Analysis, options, queue and history.",
    section: "Using waydlp",
  },
  {
    slug: "formats",
    title: "Supported formats",
    description: "Containers, codecs and audio formats.",
    section: "Using waydlp",
  },
  {
    slug: "playlists",
    title: "Playlists & batches",
    description: "Previews, selection, numbering, archives.",
    section: "Using waydlp",
  },
  {
    slug: "advanced",
    title: "Advanced options",
    description: "Templates, presets, proxies, cookies, CLI.",
    section: "Using waydlp",
  },
  {
    slug: "yt-dlp",
    title: "yt-dlp integration",
    description: "How waydlp uses yt-dlp, and keeping it updated.",
    section: "Under the hood",
  },
  {
    slug: "ffmpeg",
    title: "FFmpeg",
    description: "Merging, conversion and embedding.",
    section: "Under the hood",
  },
  {
    slug: "building-from-source",
    title: "Building from source",
    description: "Rust desktop, Flutter Android, this website.",
    section: "Under the hood",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Common errors and how to fix them.",
    section: "Help",
  },
];

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

const marked = new Marked({ gfm: true });

/** Slug for headings so in-page links work. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const t = title ? ` title="${title}"` : "";
      return external
        ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${href}"${t}>${text}</a>`;
    },
  },
});

/** Render trusted, repository-owned markdown to HTML. */
export async function renderMarkdown(md: string): Promise<string> {
  return marked.parse(md);
}

export async function loadDoc(slug: string): Promise<{ meta: DocMeta; html: string } | null> {
  const meta = DOCS.find((d) => d.slug === slug);
  if (!meta) return null;
  const md = await fs.readFile(path.join(DOCS_DIR, `${slug}.md`), "utf8");
  return { meta, html: await renderMarkdown(md) };
}

export async function loadContent(file: string): Promise<string> {
  const md = await fs.readFile(path.join(process.cwd(), "content", file), "utf8");
  return renderMarkdown(md);
}
