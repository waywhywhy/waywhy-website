/**
 * Release artifact naming — mirrors `waydlp_core::artifacts` in the desktop
 * repository and the Android release workflow:
 *
 *   waydlp-<version>-<os>-<arch>[-<variant>].<ext>
 *
 * e.g. waydlp-1.0.0-windows-x64-setup.exe, waydlp-1.0.0-linux-x64.deb,
 *      waydlp-1.0.0-android-arm64.apk
 */

export type Os = "windows" | "linux" | "android";
export type Arch = "x64" | "arm64" | "armv7" | "universal";

export type Kind =
  | "windows-setup"
  | "msi"
  | "windows-portable"
  | "appimage"
  | "deb"
  | "rpm"
  | "tar-gz"
  | "flatpak"
  | "arch-pkg"
  | "apk"
  | "aab";

interface KindInfo {
  os: Os;
  suffix: string;
  label: string;
  short: string;
}

export const KINDS: Record<Kind, KindInfo> = {
  "windows-setup": { os: "windows", suffix: "-setup.exe", label: "Installer (.exe)", short: "EXE" },
  msi: { os: "windows", suffix: ".msi", label: "MSI package", short: "MSI" },
  "windows-portable": { os: "windows", suffix: "-portable.zip", label: "Portable (.zip)", short: "ZIP" },
  appimage: { os: "linux", suffix: ".AppImage", label: "AppImage", short: "AppImage" },
  deb: { os: "linux", suffix: ".deb", label: "Debian / Ubuntu (.deb)", short: "DEB" },
  rpm: { os: "linux", suffix: ".rpm", label: "Fedora / openSUSE (.rpm)", short: "RPM" },
  "tar-gz": { os: "linux", suffix: ".tar.gz", label: "Portable (.tar.gz)", short: "tar.gz" },
  flatpak: { os: "linux", suffix: ".flatpak", label: "Flatpak bundle", short: "Flatpak" },
  "arch-pkg": { os: "linux", suffix: ".pkg.tar.zst", label: "Arch package", short: "pkg.tar.zst" },
  apk: { os: "android", suffix: ".apk", label: "APK", short: "APK" },
  aab: { os: "android", suffix: ".aab", label: "App Bundle (.aab)", short: "AAB" },
};

const ARCHES: Arch[] = ["x64", "arm64", "armv7", "universal"];

export interface ParsedArtifact {
  version: string;
  os: Os;
  arch: Arch;
  kind: Kind;
}

/** Parse a release asset name. Returns null for anything not following the convention. */
export function parseArtifactName(name: string): ParsedArtifact | null {
  if (!name.startsWith("waydlp-")) return null;
  const rest = name.slice("waydlp-".length);
  // Longer suffixes first so ".pkg.tar.zst" isn't mistaken for something shorter.
  const kinds = (Object.keys(KINDS) as Kind[]).sort(
    (a, b) => KINDS[b].suffix.length - KINDS[a].suffix.length,
  );
  for (const kind of kinds) {
    const info = KINDS[kind];
    if (!rest.endsWith(info.suffix)) continue;
    const stem = rest.slice(0, -info.suffix.length);
    for (const arch of ARCHES) {
      const tail = `-${info.os}-${arch}`;
      if (stem.endsWith(tail)) {
        const version = stem.slice(0, -tail.length);
        if (/^\d+\.\d+\.\d+([-+][0-9A-Za-z.-]+)?$/.test(version)) {
          return { version, os: info.os, arch, kind };
        }
      }
    }
  }
  return null;
}

/** Parse a `sha256sum`-format file into a map of file name → lowercase hex digest. */
export function parseChecksums(text: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([0-9a-fA-F]{64})\s+\*?(.+)$/.exec(line);
    if (m && m[1] && m[2]) out.set(m[2].trim(), m[1].toLowerCase());
  }
  return out;
}

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v >= 100 || i === 0 ? v.toFixed(0) : v.toFixed(1)} ${units[i]}`;
}

export function archLabel(a: Arch): string {
  switch (a) {
    case "x64":
      return "x86-64";
    case "arm64":
      return "ARM64";
    case "armv7":
      return "ARMv7";
    case "universal":
      return "Universal";
  }
}
