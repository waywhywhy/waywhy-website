"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { archLabel, formatBytes, KINDS, type Kind, type Os } from "@/lib/artifacts";
import type { DownloadAsset, ReleaseData } from "@/lib/releases";

interface Props {
  desktop: ReleaseData | null;
  mobile: ReleaseData | null;
  desktopReleasesUrl: string;
  mobileReleasesUrl: string;
}

const OS_TABS: { id: Os; label: string }[] = [
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
  { id: "android", label: "Android" },
];

const INSTALL: Partial<Record<Kind, { title: string; steps: string[] }>> = {
  "windows-setup": {
    title: "Install",
    steps: [
      "Run the setup .exe and follow the steps. It installs for your user only and needs no administrator rights.",
      "Windows SmartScreen may warn because builds are not code-signed yet: verify the SHA-256, then choose “More info → Run anyway”.",
      "Uninstall from Settings → Apps.",
    ],
  },
  msi: {
    title: "Install",
    steps: [
      "Double-click the MSI, or deploy it with: msiexec /i waydlp-<version>-windows-x64.msi /qn",
      "Installs into Program Files for all users (administrator rights required).",
    ],
  },
  "windows-portable": {
    title: "Run",
    steps: [
      "Extract the zip anywhere (even a USB stick) and run waydlp.exe.",
      "Settings and history stay in the folder.",
    ],
  },
  appimage: {
    title: "Run",
    steps: [
      "chmod +x waydlp-*.AppImage",
      "./waydlp-*.AppImage",
      "Optional: ./waydlp-installer install --format appimage adds a menu entry.",
    ],
  },
  deb: {
    title: "Install",
    steps: ["sudo apt install ./waydlp-<version>-linux-x64.deb", "Recommended: sudo apt install ffmpeg"],
  },
  rpm: {
    title: "Install",
    steps: [
      "Fedora: sudo dnf install ./waydlp-<version>-linux-x64.rpm",
      "openSUSE: sudo zypper install ./waydlp-<version>-linux-x64.rpm",
    ],
  },
  "tar-gz": {
    title: "Run or install",
    steps: [
      "tar -xzf waydlp-<version>-linux-x64.tar.gz && cd waydlp-<version>-linux-x64",
      "./waydlp           (portable)",
      "./waydlp-installer install --file ../waydlp-<version>-linux-x64.tar.gz   (user install with menu entry)",
    ],
  },
  flatpak: {
    title: "Install",
    steps: [
      "flatpak install --user waydlp-<version>-linux-x64.flatpak",
      "flatpak run io.github.waywhywhy.waydlp",
    ],
  },
  "arch-pkg": { title: "Install", steps: ["sudo pacman -U waydlp-<version>-linux-x64.pkg.tar.zst"] },
  apk: {
    title: "Install",
    steps: [
      "Download the APK on your phone (arm64 fits most modern devices; “universal” works everywhere).",
      "Open it and allow installation from your browser or file manager when Android asks.",
      "Verify the SHA-256 if you downloaded it on another device.",
    ],
  },
};

function detectOs(): Os {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return "windows";
}

function AssetRow({ a }: { a: DownloadAsset }) {
  const [copied, setCopied] = useState(false);
  return (
    <li className="rounded-xl border border-border bg-bg-2 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-fg">{KINDS[a.kind].label}</p>
          <p className="text-sm text-fg-muted">
            {archLabel(a.arch)} · {formatBytes(a.size)} · <span className="font-mono">{a.name}</span>
          </p>
        </div>
        <a
          href={a.url}
          className="rounded-xl border border-accent-hover/40 bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Download
        </a>
      </div>
      {a.sha256 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-fg-muted">SHA-256</span>
          <code className="max-w-full overflow-x-auto rounded-md border border-border bg-bg-3 px-2 py-1 font-mono text-fg-2">
            {a.sha256}
          </code>
          <button
            type="button"
            className="rounded-md border border-border px-2 py-1 text-fg-2 hover:border-accent-2 hover:text-fg"
            onClick={() => {
              void navigator.clipboard?.writeText(a.sha256 ?? "").then(() => setCopied(true));
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-warning">No checksum was published for this file.</p>
      )}
    </li>
  );
}

export function DownloadPicker({ desktop, mobile, desktopReleasesUrl, mobileReleasesUrl }: Props) {
  const [os, setOs] = useState<Os>("windows");
  useEffect(() => {
    // Pre-select the visitor's platform (computed locally; nothing is sent anywhere).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOs(detectOs());
  }, []);

  const release = os === "android" ? mobile : desktop;
  const releasesUrl = os === "android" ? mobileReleasesUrl : desktopReleasesUrl;
  const assets = useMemo(() => (release?.assets ?? []).filter((a) => a.os === os), [release, os]);
  const kinds = useMemo(() => Array.from(new Set(assets.map((a) => a.kind))), [assets]);
  const [kind, setKind] = useState<Kind | null>(null);
  const activeKind = kind && kinds.includes(kind) ? kind : (kinds[0] ?? null);
  const shown = assets.filter((a) => a.kind === activeKind);

  return (
    <div>
      <div role="tablist" aria-label="Operating system" className="flex flex-wrap gap-2">
        {OS_TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={os === t.id}
            onClick={() => {
              setOs(t.id);
              setKind(null);
            }}
            className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
              os === t.id
                ? "border-accent-2 bg-accent-dark/40 text-fg"
                : "border-border text-fg-2 hover:border-accent-2/60 hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[--radius-card] border border-border bg-surface p-6" role="tabpanel">
        {!release ? (
          <div>
            <h2 className="text-xl font-semibold">No release published yet</h2>
            <p className="mt-2 text-fg-2">
              waydlp for {OS_TABS.find((t) => t.id === os)?.label} hasn&apos;t had a published release yet.
              Builds will appear here automatically, straight from GitHub Releases, as soon as one is
              published.
            </p>
            <p className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href={releasesUrl}
                className="text-accent-hover hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch the releases page →
              </a>
              <Link href="/docs/building-from-source" className="text-accent-hover hover:underline">
                Build from source →
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold">waydlp {release.version}</h2>
              <p className="text-sm text-fg-muted">
                {release.publishedAt
                  ? `Released ${new Date(release.publishedAt).toISOString().slice(0, 10)}`
                  : null}
                {" · "}
                <a
                  href={release.url}
                  className="text-accent-hover hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Release notes
                </a>
                {release.checksumsUrl && (
                  <>
                    {" · "}
                    <a href={release.checksumsUrl} className="text-accent-hover hover:underline">
                      SHA256SUMS.txt
                    </a>
                  </>
                )}
              </p>
            </div>
            {kinds.length === 0 ? (
              <p className="mt-4 text-fg-2">This release has no files for this platform.</p>
            ) : (
              <>
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Package format">
                  {kinds.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      aria-pressed={activeKind === k}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                        activeKind === k
                          ? "border-accent-2 bg-accent-dark/30 text-fg"
                          : "border-border text-fg-2 hover:text-fg"
                      }`}
                    >
                      {KINDS[k].short}
                    </button>
                  ))}
                </div>
                <ul className="mt-5 space-y-3">
                  {shown.map((a) => (
                    <AssetRow key={a.name} a={a} />
                  ))}
                </ul>
                {activeKind && INSTALL[activeKind] && (
                  <div className="mt-6">
                    <h3 className="font-semibold">{INSTALL[activeKind]?.title}</h3>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-fg-2">
                      {INSTALL[activeKind]?.steps.map((s) => (
                        <li key={s}>
                          <span className="font-mono text-[0.85em]">
                            {s.replaceAll("<version>", release.version)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
