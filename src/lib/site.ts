/** Central configuration: names and real repository URLs. */
export const site = {
  name: "waydlp",
  tagline: "Your media, your format, your way.",
  description:
    "waydlp is a free, open-source media downloader for Windows, Linux and Android, powered by yt-dlp and FFmpeg. No ads, no accounts, no tracking.",
  org: "waywhywhy",
  repos: {
    desktop: "waywhywhy/waydlp-desktop-rust",
    mobile: "waywhywhy/waydlp-mobile-dart",
    website: "waywhywhy/waywhy-website",
    org: "waywhywhy/.github",
  },
  /** Set NEXT_PUBLIC_SITE_URL in Vercel once a domain is configured. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const gh = (repo: string, path = "") => `https://github.com/${repo}${path}`;

export const nav = [
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
  { href: "/faq", label: "FAQ" },
] as const;
