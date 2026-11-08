import Link from "next/link";
import { gh, nav, site } from "@/lib/site";
import { Logo } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-fg" aria-label="waydlp home">
          <Logo size={30} />
          <span className="text-lg tracking-tight">waydlp</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 overflow-x-auto text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-fg-2 transition-colors hover:bg-surface hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={gh(site.repos.desktop)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-lg border border-border px-3 py-2 text-fg-2 transition-colors hover:border-accent-2 hover:text-fg sm:inline-block"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/download", label: "Download" },
      { href: "/changelog", label: "Changelog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
      { href: "/docs/building-from-source", label: "Build from source" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/contributing", label: "Contributing" },
      { href: "/security", label: "Security" },
      { href: "/privacy", label: "Privacy" },
      { href: "/licenses", label: "Licenses" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-semibold">waydlp</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted">{site.tagline}</p>
          <p className="mt-3 text-sm text-fg-muted">
            Free and open source. No ads, no accounts, no tracking.
          </p>
        </div>
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-fg">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-fg-2 hover:text-accent-hover">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-fg-muted">
          waydlp is not affiliated with any website it can download from. Only download media you have the
          right to access. waydlp does not circumvent DRM.
        </p>
      </div>
    </footer>
  );
}
