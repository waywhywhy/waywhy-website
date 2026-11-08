# Installation

waydlp runs on **Windows**, **Linux** and **Android**. Every release file is published on GitHub Releases together with a `SHA256SUMS.txt` file, and the [download page](/download) lists them automatically.

> Published builds and SHA-256 checksums are listed on the [download page](/download). You can also [build from source](/docs/building-from-source).

## Which file should I pick?

| You use…                            | Download                                                         | Why                                                                 |
| ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| Windows 10/11                       | `…-windows-x64-setup.exe`                                        | Easiest. Installs for your user, Start-menu entry, no admin rights. |
| Windows, managed PCs                | `…-windows-x64.msi`                                              | Standard MSI for administrators and deployment tools.               |
| Windows, no install                 | `…-windows-x64-portable.zip`                                     | Runs from any folder or USB stick.                                  |
| Ubuntu, Debian, Mint                | `…-linux-x64.deb`                                                | Integrates with apt.                                                |
| Fedora, openSUSE                    | `…-linux-x64.rpm`                                                | Integrates with dnf/zypper.                                         |
| Arch, CachyOS, EndeavourOS, Manjaro | PKGBUILD or `…-linux-x64.pkg.tar.zst`                            | Native pacman package.                                              |
| Any Linux, sandboxed                | `…-linux-x64.flatpak`                                            | Runs in a Flatpak sandbox.                                          |
| Any Linux, single file              | `…-linux-x64.AppImage`                                           | No installation needed.                                             |
| Any Linux, portable                 | `…-linux-x64.tar.gz`                                             | Portable folder plus an optional user install.                      |
| Android 7+                          | `…-android-arm64.apk` (most phones) or `…-android-universal.apk` | Sideload the APK.                                                   |

`arm64` builds exist for ARM computers (e.g. Windows on ARM, Raspberry Pi 5) where we can build them; they are less tested than x64.

## Verify your download

Compare the SHA-256 checksum with the one on the download page or in `SHA256SUMS.txt`:

```bash
sha256sum waydlp-1.0.0-linux-x64.deb
```

```powershell
Get-FileHash .\waydlp-1.0.0-windows-x64-setup.exe -Algorithm SHA256
```

## The command-line installer

Install the latest stable desktop release directly from a terminal. These scripts detect
x64 or ARM64, verify SHA-256 checksums and install for your user without admin access.

**Windows (PowerShell):**

```powershell
& ([scriptblock]::Create((irm 'https://github.com/waywhywhy/waydlp-desktop-rust/releases/latest/download/install.ps1')))
```

**Linux (requires curl and sha256sum):**

```sh
curl -fsSL https://github.com/waywhywhy/waydlp-desktop-rust/releases/latest/download/install.sh -o install-waydlp.sh && sh install-waydlp.sh
```

The default install folder is `%LOCALAPPDATA%\Programs\waydlp` on Windows or
`~/.local/opt/waydlp` on Linux. A menu entry is created, and the script prints the
full commands to launch the app, use the CLI, verify files and uninstall. PATH and
shell profiles are left unchanged. Run the same command again to upgrade.

You can also download and inspect [install.ps1](https://github.com/waywhywhy/waydlp-desktop-rust/blob/main/install.ps1)
or [install.sh](https://github.com/waywhywhy/waydlp-desktop-rust/blob/main/install.sh), then choose a version and folder:

```powershell
.\install.ps1 -Version 0.1.0 -InstallDir 'C:\Tools\waydlp' -NoMenu
& 'C:\Tools\waydlp\waydlp-installer.exe' verify
& 'C:\Tools\waydlp\waydlp-installer.exe' uninstall
```

```sh
sh install.sh --version 0.1.0 --dir "$HOME/Apps/waydlp" --no-menu
"$HOME/Apps/waydlp/waydlp-installer" verify
"$HOME/Apps/waydlp/waydlp-installer" uninstall
```

Use `-DesktopShortcut` (Windows) or `--desktop-shortcut` (Linux) for a desktop icon.
The bootstrap installs the desktop app and CLI from the Windows ZIP or Linux tar archive.

The portable archives include `waydlp-installer`, which picks the best format for your system, downloads it from GitHub Releases, verifies the checksum and installs it:

```bash
waydlp-installer detect            # show your platform and available formats
waydlp-installer install           # install the latest release
waydlp-installer install --format flatpak --yes
waydlp-installer verify            # check the installed files
waydlp-installer uninstall         # your settings and history are kept
```

System packages (`deb`, `rpm`, Arch, Flatpak) are always installed **through your package manager**; waydlp never overwrites files your package manager owns.

## Dependencies

waydlp uses two free tools:

- **yt-dlp** — finds the media on web pages (required).
- **FFmpeg** — merges, converts and embeds (recommended).

You don't need to install them first. On first start, waydlp shows whether they were found and can install verified copies (yt-dlp everywhere, FFmpeg on Windows). On Linux, install FFmpeg from your distribution. See the platform pages for details.
