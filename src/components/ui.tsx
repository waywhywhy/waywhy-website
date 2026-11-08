import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wd-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B56BFF" />
          <stop offset="1" stopColor="#5A189A" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#wd-ring)" />
      <rect x="44" y="44" width="424" height="424" rx="96" fill="#000" />
      <polyline
        points="128,176 192,296 256,206 320,296 384,176"
        fill="none"
        stroke="#9D4EDD"
        strokeWidth="44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="150" y1="376" x2="362" y2="376" stroke="#B56BFF" strokeWidth="32" strokeLinecap="round" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover border border-accent-hover/40"
      : "border border-border text-fg hover:border-accent-2 hover:bg-surface";
  const cls = `${base} ${styles} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[--radius-card] border border-border bg-surface p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "muted" | "success";
}) {
  const tones = {
    accent: "border-accent-2/60 bg-accent-dark/25 text-accent-hover",
    muted: "border-border bg-surface-2 text-fg-2",
    success: "border-success/50 bg-success/10 text-success",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function PageHeader({ title, lead, kicker }: { title: string; lead?: string; kicker?: string }) {
  return (
    <header className="mb-10">
      {kicker && (
        <p className="mb-2 text-sm font-semibold tracking-wide text-accent-hover uppercase">{kicker}</p>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-lg text-fg-2">{lead}</p>}
    </header>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-bg-3 px-4 py-3 font-mono text-sm text-fg">
      <code>{children}</code>
    </pre>
  );
}
