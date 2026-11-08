# yt-dlp integration

[yt-dlp](https://github.com/yt-dlp/yt-dlp) is the open-source program that understands thousands of websites and extracts their media. waydlp is a friendly, reliable interface on top of it — it does not reimplement extraction.

## How waydlp runs yt-dlp

- **Analysis** runs `yt-dlp --dump-single-json --flat-playlist`. waydlp reads the real format list, so it only offers qualities, codecs and subtitle languages that exist. Playlists are listed without downloading anything.
- **Downloads** run yt-dlp with waydlp's own machine-readable progress templates. Every progress number in the app comes from those lines.
- yt-dlp is started **directly, never through a shell**, with each argument passed separately and the link placed after `--`.
- Your personal yt-dlp config files are ignored unless you enable them.
- Each download gets its own temporary folder. Pausing keeps it so the download resumes; cancelling deletes it; completion cleans it up.
- Stopping a download stops yt-dlp **and** any FFmpeg it started.

## Which yt-dlp is used

Detection order:

1. A path you set in Settings,
2. a copy **managed by waydlp**,
3. a copy next to the waydlp program (portable builds),
4. `yt-dlp` on your system `PATH` (package manager, pipx, winget…).

The About page and the sidebar show which one is active and its version.

## Keeping yt-dlp up to date

Websites change frequently, and yt-dlp releases fixes often. If downloads from a site start failing with _“Unable to extract”_ or _“yt-dlp may be out of date”_:

1. Open **Settings → yt-dlp & FFmpeg**.
2. Press **Check latest version**, then **Update yt-dlp**.

A managed update downloads the official build for your platform from yt-dlp's GitHub releases and **verifies its SHA-256** against the checksum file published in the same release before replacing the old copy. If you use a system copy, update it with the tool you installed it with; waydlp never modifies it (you can also install a managed copy that takes priority).

_Current limitation:_ the GPG signature of yt-dlp's checksum file is not verified yet; integrity relies on the checksum and GitHub's HTTPS certificate.

## Supported sites

The **Supported Websites** page lists every extractor of your installed yt-dlp version. If a site isn't listed, yt-dlp's _generic_ extractor may still find media on the page.

## Reporting problems

If plain `yt-dlp <url>` fails too, the problem belongs to [yt-dlp's issue tracker](https://github.com/yt-dlp/yt-dlp/issues). If yt-dlp works but waydlp doesn't, please [report it to waydlp](https://github.com/waywhywhy/waydlp-desktop-rust/issues/new/choose) with the technical details from the error.
