import type { Metadata } from "next";
import Link from "next/link";
import { DownloadPicker } from "@/components/download-picker";
import { ButtonLink, Card, Code, PageHeader } from "@/components/ui";
import { obtainiumImportUrl } from "@/lib/obtainium";
import { getLatestRelease } from "@/lib/releases";
import { gh, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download waydlp for Windows, Linux and Android. Every file comes from GitHub Releases with a SHA-256 checksum.",
};

export const revalidate = 3600;

export default async function DownloadPage() {
  const [desktop, mobile] = await Promise.all([
    getLatestRelease(site.repos.desktop),
    getLatestRelease(site.repos.mobile),
  ]);

  return (
    <div className="pt-16">
      <PageHeader
        kicker="Download"
        title="Get waydlp"
        lead="Choose your system and package format. Every file is served directly from GitHub Releases and listed with its SHA-256 checksum."
      />

      <DownloadPicker
        desktop={desktop}
        mobile={mobile}
        desktopReleasesUrl={gh(site.repos.desktop, "/releases")}
        mobileReleasesUrl={gh(site.repos.mobile, "/releases")}
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Android updates with Obtainium</h2>
          <p className="mt-2 text-sm text-fg-2">
            Install waydlp and track stable updates directly from GitHub Releases with Obtainium. This
            configuration selects the universal APK for ARM64, ARMv7 and x64 devices.
          </p>
          <div className="mt-4">
            <ButtonLink href={obtainiumImportUrl}>Add to Obtainium</ButtonLink>
          </div>
          <p className="mt-3 text-sm text-fg-2">
            Confirm the import in Obtainium, then check for updates to install. See the{" "}
            <Link href="/docs/android" className="text-accent hover:underline">
              Android guide
            </Link>{" "}
            for manual setup.
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Arch Linux, CachyOS, EndeavourOS, Manjaro</h2>
          <p className="mt-2 text-sm text-fg-2">
            PKGBUILDs for <code className="font-mono">waydlp</code> (from source),{" "}
            <code className="font-mono">waydlp-bin</code> and <code className="font-mono">waydlp-git</code>{" "}
            are maintained in the desktop repository. They are prepared for the AUR but{" "}
            <strong className="text-fg">not published there yet</strong>. Until then:
          </p>
          <div className="mt-3">
            <Code>{`git clone https://github.com/${site.repos.desktop}.git
cd waydlp-desktop-rust/packaging/arch/waydlp-git
makepkg -si`}</Code>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Flatpak</h2>
          <p className="mt-2 text-sm text-fg-2">
            A Flatpak manifest (<code className="font-mono">io.github.waywhywhy.waydlp</code>) is prepared for
            Flathub but <strong className="text-fg">not published there yet</strong>. Releases include a{" "}
            <code className="font-mono">.flatpak</code> bundle when available:
          </p>
          <div className="mt-3">
            <Code>{`flatpak install --user waydlp-<version>-linux-x64.flatpak
flatpak run io.github.waywhywhy.waydlp`}</Code>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Command-line installer</h2>
          <p className="mt-2 text-sm text-fg-2">
            Install from your terminal on Windows or Linux. The bootstrap detects x64/ARM64, verifies
            checksums and installs the desktop app and CLI for your user without admin access.
          </p>
          <div className="mt-3">
            <Code>{`# Windows (PowerShell)
& ([scriptblock]::Create((irm 'https://github.com/waywhywhy/waydlp-desktop-rust/releases/latest/download/install.ps1')))`}</Code>
          </div>
          <div className="mt-3">
            <Code>{`# Linux
curl -fsSL https://github.com/waywhywhy/waydlp-desktop-rust/releases/latest/download/install.sh -o install-waydlp.sh && sh install-waydlp.sh`}</Code>
          </div>
          <p className="mt-3 text-sm text-fg-2">
            The script prints launch, verify and uninstall commands. See the{" "}
            <Link href="/docs/installation" className="text-accent hover:underline">
              installation guide
            </Link>{" "}
            for custom folders and pinned versions.
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Verify your download</h2>
          <p className="mt-2 text-sm text-fg-2">Compare the checksum with the value shown above:</p>
          <div className="mt-3 space-y-3">
            <Code>{`# Linux
sha256sum waydlp-<version>-linux-x64.deb`}</Code>
            <Code>{`# Windows (PowerShell)
Get-FileHash .\\waydlp-<version>-windows-x64-setup.exe -Algorithm SHA256`}</Code>
          </div>
        </Card>
      </div>

      <p className="mt-10 text-sm text-fg-muted">
        Need help? See{" "}
        <Link href="/docs/installation" className="text-accent-hover hover:underline">
          installation
        </Link>{" "}
        and{" "}
        <Link href="/docs/troubleshooting" className="text-accent-hover hover:underline">
          troubleshooting
        </Link>
        . Prefer to build it yourself?{" "}
        <Link href="/docs/building-from-source" className="text-accent-hover hover:underline">
          Build from source
        </Link>
        .
      </p>
    </div>
  );
}
