# Licenses

## waydlp

| Component                       | License                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Desktop app, CLI and installers | [GPL-3.0-or-later](https://github.com/waywhywhy/waydlp-desktop-rust/blob/main/LICENSE) |
| Android app                     | [GPL-3.0-or-later](https://github.com/waywhywhy/waydlp-mobile-dart/blob/main/LICENSE)  |
| Website                         | [MIT](https://github.com/waywhywhy/waywhy-website/blob/main/LICENSE)                   |
| Documentation                   | Same license as the repository it lives in                                             |

The waydlp name and logo identify this project; please don't use them in a way that suggests your fork or product is the official waydlp.

## Major third-party software

| Project                                                              | Used for                         | License                                                    |
| -------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| [yt-dlp](https://github.com/yt-dlp/yt-dlp)                           | Media extraction                 | Unlicense                                                  |
| [FFmpeg](https://ffmpeg.org/legal.html)                              | Merging, conversion, embedding   | LGPL-2.1+ / GPL-2.0+ (builds offered for download are GPL) |
| [egui / eframe](https://github.com/emilk/egui)                       | Desktop user interface           | MIT or Apache-2.0                                          |
| [AccessKit](https://github.com/AccessKit/accesskit)                  | Screen-reader support            | MIT or Apache-2.0                                          |
| [Tokio](https://tokio.rs)                                            | Asynchronous runtime             | MIT                                                        |
| [SQLite](https://sqlite.org) via rusqlite                            | Download history                 | Public domain / MIT                                        |
| [rustls](https://github.com/rustls/rustls) & reqwest                 | HTTPS                            | Apache-2.0 / ISC / MIT                                     |
| [Flutter](https://flutter.dev)                                       | Android user interface           | BSD-3-Clause                                               |
| [youtubedl-android](https://github.com/JunkFood02/youtubedl-android) | yt-dlp/FFmpeg runtime on Android | GPL-3.0                                                    |
| [Next.js](https://nextjs.org), React                                 | Website                          | MIT                                                        |
| [Tailwind CSS](https://tailwindcss.com)                              | Website styling                  | MIT                                                        |
| [marked](https://marked.js.org)                                      | Documentation rendering          | MIT                                                        |

Each repository lists its complete dependency tree in its lock file (`Cargo.lock`, `pubspec.lock`, `package-lock.json`); dependency licenses are checked in CI.
