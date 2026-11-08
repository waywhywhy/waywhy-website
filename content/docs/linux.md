# Linux setup

waydlp works on most modern distributions with X11 or Wayland, including Arch Linux, CachyOS, EndeavourOS, Manjaro, Ubuntu, Debian, Linux Mint, Fedora and openSUSE. It renders with Vulkan or OpenGL (Mesa drivers).

## Debian, Ubuntu, Linux Mint

```bash
sudo apt install ./waydlp-<version>-linux-x64.deb
sudo apt install ffmpeg            # recommended
```

Remove with `sudo apt remove waydlp`.

## Fedora and openSUSE

```bash
sudo dnf install ./waydlp-<version>-linux-x64.rpm
sudo dnf install ffmpeg-free       # or ffmpeg from RPM Fusion for more codecs
```

```bash
sudo zypper install ./waydlp-<version>-linux-x64.rpm
sudo zypper install ffmpeg
```

## Arch Linux, CachyOS, EndeavourOS, Manjaro

Three PKGBUILDs live in the desktop repository under `packaging/arch`:

- `waydlp` — builds the tagged release from source,
- `waydlp-bin` — repackages the prebuilt release archive,
- `waydlp-git` — builds the latest development version.

```bash
git clone https://github.com/waywhywhy/waydlp-desktop-rust.git
cd waydlp-desktop-rust/packaging/arch/waydlp-git
makepkg -si
sudo pacman -S ffmpeg yt-dlp       # optional dependencies
```

The packages are prepared for the AUR but **not published there yet**. Releases may also include a ready-made `…-linux-x64.pkg.tar.zst` for `sudo pacman -U`.

## Flatpak

```bash
flatpak install --user waydlp-<version>-linux-x64.flatpak
flatpak run io.github.waywhywhy.waydlp
```

The Flatpak includes FFmpeg and yt-dlp. It can access your **Downloads** folder; other folders are chosen through the system file picker. A Flathub submission is prepared but **not published yet**. Updates: `flatpak update`.

## AppImage

```bash
chmod +x waydlp-<version>-linux-x64.AppImage
./waydlp-<version>-linux-x64.AppImage
```

Some distributions need `libfuse2` to run AppImages. To add it to your menu: `waydlp-installer install --format appimage`.

## Portable tar.gz

```bash
tar -xzf waydlp-<version>-linux-x64.tar.gz
cd waydlp-<version>-linux-x64
./waydlp
```

It keeps its data in a `data` folder next to it. For a normal per-user install with a menu entry and `~/.local/bin/waydlp`:

```bash
./waydlp-installer install --file ../waydlp-<version>-linux-x64.tar.gz
```

## yt-dlp on Linux

waydlp works with your distribution's `yt-dlp`, a `pipx install yt-dlp` copy, or its own managed copy (Settings → yt-dlp & FFmpeg → Install yt-dlp), which is downloaded from GitHub and checksum-verified. Distribution packages are sometimes outdated; if a site fails, the managed copy is the quickest fix.

## Updating

waydlp never updates files owned by your package manager. Update deb/rpm/Arch/Flatpak installs with your package manager; replace AppImages and portable folders manually; re-run `waydlp-installer install` for user installs.
