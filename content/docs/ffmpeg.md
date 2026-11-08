# FFmpeg

[FFmpeg](https://ffmpeg.org) is the standard open-source toolkit for audio and video. waydlp (through yt-dlp) uses it to:

- **merge** separate video and audio streams — large sites serve high resolutions this way,
- **remux** into another container without quality loss (e.g. WebM streams into MKV),
- **convert audio** (MP3, M4A, Opus, FLAC, WAV, OGG) and apply loudness normalisation,
- **re-encode video** when you explicitly allow it,
- **embed** thumbnails/cover art, metadata, chapters and subtitles, and convert subtitles to SRT.

FFprobe (part of FFmpeg) is used to inspect files during post-processing.

## Do I need it?

For most downloads, yes. Without FFmpeg you can still use **Original file** mode, which downloads the best single file the site offers without any processing. waydlp warns you before starting a download that needs FFmpeg when it isn't installed.

## Installing FFmpeg

**Windows** — Settings → yt-dlp & FFmpeg → **Install FFmpeg**. waydlp downloads the GPL build published by the yt-dlp project (about 200 MB), verifies its SHA-256 checksum and extracts `ffmpeg.exe` and `ffprobe.exe` into waydlp's own folder. You can also use a copy installed with winget (`winget install Gyan.FFmpeg`) or set a custom path.

**Linux** — use your package manager so FFmpeg receives security updates:

```bash
sudo apt install ffmpeg            # Debian, Ubuntu, Mint
sudo dnf install ffmpeg-free       # Fedora (or ffmpeg from RPM Fusion)
sudo zypper install ffmpeg         # openSUSE
sudo pacman -S ffmpeg              # Arch and derivatives
```

The **Flatpak** includes its own FFmpeg. The **Android** app includes FFmpeg in its embedded runtime.

## Bundled or system?

waydlp uses, in order: your custom path, the waydlp-managed copy, a copy next to the program, then the system `PATH`. waydlp never modifies a system copy.

## Licensing

FFmpeg is licensed under the LGPL, with optional GPL components; the builds waydlp offers to download on Windows are GPL builds. waydlp downloads them on your request — it does not ship FFmpeg inside the Windows or Linux installers.
