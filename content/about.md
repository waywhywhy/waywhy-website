# About waydlp

**waydlp** — _your media, your format, your way_ — is a free, open-source media downloader for Windows, Linux and Android.

It exists because downloading a video or song you're allowed to keep should be simple, fast and private, without ads, accounts, or tools that are either too basic or too intimidating. A new user can paste a link and download in seconds; a power user can control codecs, templates, rate limits and every yt-dlp option.

## Principles

- **Free and open source**, with no artificial restrictions.
- **Private by default** — no accounts, no ads, no telemetry; everything runs on your device.
- **Honest** — real progress, real metadata, real choices; limitations are documented, not hidden.
- **Fast and light** — native apps that stay responsive on modest hardware.
- **Beginner-friendly and powerful** — advanced options are available but out of the way.

## How it's built

| Part                         | Technology                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------- |
| Desktop app (Windows, Linux) | Rust, native GUI with [egui](https://github.com/emilk/egui), Tokio, SQLite        |
| Installers                   | Rust (graphical and command-line), WiX MSI, deb, rpm, AppImage, Flatpak, PKGBUILD |
| Android app                  | Dart + Flutter, Kotlin, an embedded yt-dlp/FFmpeg runtime                         |
| Media engine                 | [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [FFmpeg](https://ffmpeg.org)       |
| Website                      | Next.js + TypeScript, hosted on Vercel                                            |

All the design across apps and website shares one identity: true AMOLED black with purple highlights.

## Repositories

- [waydlp-desktop-rust](https://github.com/waywhywhy/waydlp-desktop-rust)
- [waydlp-mobile-dart](https://github.com/waywhywhy/waydlp-mobile-dart)
- [waywhy-website](https://github.com/waywhywhy/waywhy-website)
- [.github](https://github.com/waywhywhy/.github) — organisation profile and community health files

## Thanks

waydlp stands on the shoulders of yt-dlp, FFmpeg, and the many open-source libraries listed on the [licenses](/licenses) page.
