# Windows setup

waydlp supports **Windows 11** and **Windows 10** (x64; ARM64 builds are provided but less tested).

## Setup .exe (recommended)

1. Download `waydlp-<version>-windows-x64-setup.exe`.
2. Run it. The installer shows the license, lets you choose the install folder and shortcuts, checks for yt-dlp/FFmpeg and installs.
3. waydlp is installed **for your user** in `%LOCALAPPDATA%\Programs\waydlp`. No administrator rights are needed.
4. To remove it: **Settings → Apps → Installed apps → waydlp → Uninstall**. Your settings and history are kept.

The setup file contains the application, so it works offline.

### “Windows protected your PC”

waydlp's builds are **not code-signed yet**, so Microsoft Defender SmartScreen may warn on first run. Check the SHA-256 checksum against the download page; if it matches, choose **More info → Run anyway**.

## MSI (administrators)

`waydlp-<version>-windows-x64.msi` installs for all users into `C:\Program Files\waydlp` and requires administrator rights. Silent install:

```powershell
msiexec /i waydlp-<version>-windows-x64.msi /qn
msiexec /x waydlp-<version>-windows-x64.msi /qn   # uninstall
```

Newer MSIs upgrade older ones automatically.

## Portable

Extract `waydlp-<version>-windows-x64-portable.zip` anywhere and run `waydlp.exe`. Because of the `waydlp.portable` file, settings, history and waydlp-managed tools are stored in a `data` folder beside it, and nothing else on the PC is changed. Delete the folder to remove it.

## yt-dlp and FFmpeg on Windows

In waydlp, open **Settings → yt-dlp & FFmpeg**:

- **Install yt-dlp** downloads the official `yt-dlp.exe` from GitHub and verifies its SHA-256 checksum.
- **Install FFmpeg** downloads the FFmpeg build published by the yt-dlp project (~200 MB) and verifies it.

You can also point waydlp at copies you already have (e.g. installed with `winget install yt-dlp.yt-dlp` or `winget install Gyan.FFmpeg`).

## Updating

waydlp can check GitHub for new versions (About → Check for updates; automatic checks are off by default). Download and run the new setup .exe — it upgrades in place. MSI installs upgrade by installing the newer MSI. Portable: replace the files, keep the `data` folder.
