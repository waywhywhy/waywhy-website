import { describe, expect, it } from "vitest";
import { formatBytes, parseArtifactName, parseChecksums } from "./artifacts";
import { getLatestRelease, toReleaseData, type Fetcher, type GhRelease } from "./releases";

describe("parseArtifactName", () => {
  it("parses every desktop and Android artifact kind", () => {
    const cases: [string, string, string, string][] = [
      ["waydlp-1.0.0-windows-x64-setup.exe", "windows", "x64", "windows-setup"],
      ["waydlp-1.0.0-windows-arm64.msi", "windows", "arm64", "msi"],
      ["waydlp-1.0.0-windows-x64-portable.zip", "windows", "x64", "windows-portable"],
      ["waydlp-1.0.0-linux-x64.AppImage", "linux", "x64", "appimage"],
      ["waydlp-1.0.0-linux-x64.deb", "linux", "x64", "deb"],
      ["waydlp-1.0.0-linux-arm64.rpm", "linux", "arm64", "rpm"],
      ["waydlp-1.0.0-linux-x64.tar.gz", "linux", "x64", "tar-gz"],
      ["waydlp-1.0.0-linux-x64.flatpak", "linux", "x64", "flatpak"],
      ["waydlp-1.0.0-linux-x64.pkg.tar.zst", "linux", "x64", "arch-pkg"],
      ["waydlp-1.0.0-android-arm64.apk", "android", "arm64", "apk"],
      ["waydlp-1.0.0-android-universal.apk", "android", "universal", "apk"],
      ["waydlp-1.0.0-android-universal.aab", "android", "universal", "aab"],
    ];
    for (const [name, os, arch, kind] of cases) {
      expect(parseArtifactName(name), name).toEqual({ version: "1.0.0", os, arch, kind });
    }
  });

  it("handles pre-release versions", () => {
    expect(parseArtifactName("waydlp-1.2.0-rc.1-linux-x64.deb")?.version).toBe("1.2.0-rc.1");
  });

  it("rejects foreign names", () => {
    expect(parseArtifactName("SHA256SUMS.txt")).toBeNull();
    expect(parseArtifactName("waydlp-linux-x64.deb")).toBeNull();
    expect(parseArtifactName("other-1.0.0-linux-x64.deb")).toBeNull();
    expect(parseArtifactName("waydlp-1.0.0-macos-x64.dmg")).toBeNull();
  });
});

describe("parseChecksums", () => {
  it("reads sha256sum output", () => {
    const h = "a".repeat(64);
    const m = parseChecksums(`${h}  waydlp-1.0.0-linux-x64.deb\n${h.toUpperCase()} *x.exe\n# c\nbad`);
    expect(m.get("waydlp-1.0.0-linux-x64.deb")).toBe(h);
    expect(m.get("x.exe")).toBe(h);
    expect(m.size).toBe(2);
  });
});

describe("formatBytes", () => {
  it("formats sizes", () => {
    expect(formatBytes(0)).toBe("—");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(250 * 1024 * 1024)).toBe("250 MB");
  });
});

const release: GhRelease = {
  tag_name: "v1.0.0",
  html_url: "https://github.com/waywhywhy/waydlp-desktop-rust/releases/tag/v1.0.0",
  name: "waydlp 1.0.0",
  body: "notes",
  draft: false,
  prerelease: false,
  published_at: "2026-11-01T00:00:00Z",
  assets: [
    { name: "waydlp-1.0.0-linux-x64.deb", browser_download_url: "https://example.invalid/deb", size: 1000 },
    { name: "SHA256SUMS.txt", browser_download_url: "https://example.invalid/sums", size: 10 },
    { name: "random.txt", browser_download_url: "https://example.invalid/r", size: 1 },
  ],
};

describe("release metadata", () => {
  it("maps assets and attaches checksums", () => {
    const d = toReleaseData("r", release, `${"b".repeat(64)}  waydlp-1.0.0-linux-x64.deb\n`);
    expect(d.version).toBe("1.0.0");
    expect(d.assets).toHaveLength(1);
    expect(d.assets[0]?.sha256).toBe("b".repeat(64));
    expect(d.checksumsUrl).toBe("https://example.invalid/sums");
  });

  it("returns null when no release exists (never invents links)", async () => {
    const fetcher: Fetcher = async () => new Response("Not Found", { status: 404 });
    expect(await getLatestRelease("waywhywhy/none", fetcher)).toBeNull();
  });

  it("returns null when GitHub is unreachable", async () => {
    const fetcher: Fetcher = async () => {
      throw new Error("offline");
    };
    expect(await getLatestRelease("x/y", fetcher)).toBeNull();
  });

  it("ignores pre-releases for the latest stable download", async () => {
    const fetcher: Fetcher = async () => new Response(JSON.stringify({ ...release, prerelease: true }));
    expect(await getLatestRelease("x/y", fetcher)).toBeNull();
  });

  it("fetches checksums for a stable release", async () => {
    const fetcher: Fetcher = async (url) =>
      url.endsWith("/sums")
        ? new Response(`${"c".repeat(64)}  waydlp-1.0.0-linux-x64.deb`)
        : new Response(JSON.stringify(release));
    const d = await getLatestRelease("x/y", fetcher);
    expect(d?.assets[0]?.sha256).toBe("c".repeat(64));
  });
});
