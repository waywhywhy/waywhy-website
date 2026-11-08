# Advanced options

## File-name templates

waydlp uses yt-dlp's [output template](https://github.com/yt-dlp/yt-dlp#output-template) syntax. The default is `%(title).180B [%(id)s].%(ext)s` (title shortened to 180 bytes, plus the media id).

| Template                                        | Example result              |
| ----------------------------------------------- | --------------------------- |
| `%(title)s.%(ext)s`                             | `My video.mp4`              |
| `%(uploader)s/%(title)s.%(ext)s`                | `Channel/My video.mp4`      |
| `%(upload_date>%Y-%m-%d)s - %(title)s.%(ext)s`  | `2026-05-01 - My video.mp4` |
| `%(artist,uploader)s - %(track,title)s.%(ext)s` | `Artist - Song.mp3`         |

Templates may create sub-folders but cannot be absolute paths or contain `..`, so files always stay inside your download folder. Characters that aren't allowed in file names are replaced automatically; _restrict file names_ (ASCII only) is available per preset.

## Presets

Built-in: _Best Video Quality_ (MKV, any codec), _Best Audio Quality_ (original stream), _MP4 1080p_ and _MP4 720p_ (H.264 for compatibility), _MP3_ (320 kbps target) and _Original Format_. Create your own from the Downloader with **Save as preset**; rename or delete them in Settings → Presets & backup. The **default preset** is used by Quick download and batch downloads.

## Network

- **Speed limit** — per download, e.g. `2M` or `500K`.
- **Network timeout** and **retries** — how long and how often yt-dlp retries requests and fragments.
- **Automatic retries** — how often waydlp restarts a download after a temporary failure (network, timeouts, HTTP 429), with increasing delays. Permanent failures (private, removed, DRM) are never retried.
- **Proxy** — `http://host:port`, `https://…`, `socks5://host:port` or `socks5h://…` (DNS through the proxy).

## Signing in with a cookies file

Some content requires an account. Export a `cookies.txt` (Netscape format) for that site with a browser extension you trust and choose it in **Settings → yt-dlp & FFmpeg → Cookies file**.

- waydlp never reads browser cookie stores by itself and never uploads cookies anywhere.
- Cookie headers are removed from diagnostic output.
- Anyone with the file can use your account: keep it private and remove it when you're done.
- waydlp does not bypass DRM, paywalls or other access controls.

## Extra yt-dlp arguments

Power users can add arguments, e.g. `--sponsorblock-remove sponsor` or `--match-filter "duration > 60"`. They are split like a shell would but **never run through a shell**. For safety, options that execute programs (`--exec`, `--netrc-cmd`, …) are rejected, as are options waydlp needs to control (progress output, `--update`, …).

By default waydlp ignores your personal yt-dlp configuration files so its behaviour is predictable; enable _Use my yt-dlp configuration files_ to change that.

## Custom tool locations

Point waydlp at a specific `yt-dlp` executable or an FFmpeg binary/folder. Order of detection: your custom path → waydlp-managed copy → copy next to waydlp → system `PATH`.

## Appearance and accessibility

Accent colour (default purple), interface scale (75–200%), compact or comfortable layout, animations and **reduce motion** (no animated progress bars or transitions). The app supports keyboard navigation and screen readers through AccessKit.

## Privacy controls

History on/off and retention, clipboard watching (off by default, only while waydlp is focused, and it only _offers_ a detected link), thumbnail loading, update checks (off by default), clearing image cache and the download archive.

## Settings files and portable mode

Settings are stored as TOML (`waydlp-cli paths` shows where) and can be exported/imported in Settings → Presets & backup. Imports never copy tool paths or cookie files. A `waydlp.portable` file next to the executable keeps everything in a `data` folder beside it.

## Command line

```bash
waydlp-cli analyze <url> [--json]
waydlp-cli download <url>… [--preset ID] [--audio mp3|m4a|opus|flac|wav|ogg|original] [--bitrate 320]
                    [--video mp4|mkv|webm|mov|original] [--max-height 1080] [--format-id ID]
                    [-o DIR] [--template T] [--playlist] [--items 1,3,5-7] [-j N]
waydlp-cli presets | history | tools | install-tool yt-dlp|ffmpeg | extractors | paths
```

The CLI shares settings, presets, tools and history with the app.
