# Frequently asked questions

## Is waydlp free?

Yes. waydlp is free and open-source software (GPL-3.0-or-later). There are no ads, no paid tiers, no accounts and no artificial limits.

## Which websites does it support?

Every site supported by [yt-dlp](https://github.com/yt-dlp/yt-dlp) — thousands, including YouTube, YouTube Music, TikTok, Instagram, Facebook, X, Reddit, Twitch, SoundCloud, Vimeo, Dailymotion and Bandcamp. The app's **Supported Websites** page shows the exact list for your installed yt-dlp. Sites change, so a listed site can occasionally break until yt-dlp is updated.

## Is it legal?

waydlp is a tool. Whether a particular download is allowed depends on the content, the website's terms and the law where you live. Only download media you own, that is freely licensed, or that you otherwise have the right to download. waydlp does **not** circumvent DRM or other access controls.

## Does waydlp collect any data?

No. There is no telemetry or analytics. waydlp only connects to the internet for what you ask it to do: fetching the media and thumbnails you request, installing/updating yt-dlp or FFmpeg, and (only if you click it or enable it) checking GitHub for updates. See the [privacy policy](/privacy).

## Why does it need yt-dlp and FFmpeg?

yt-dlp knows how to read thousands of websites; FFmpeg joins, converts and tags media files. Both are the best open-source tools for the job, so waydlp builds on them instead of reinventing them. waydlp can install verified copies for you.

## Can I download a 1080p/4K video as MP4?

If the site offers that resolution, yes — waydlp only lists qualities that exist. Some sites serve 4K only as VP9/AV1; MP4 can hold those codecs but older players may not play them. Use MKV for the best quality, or MP4 with the H.264 preference for compatibility (often up to 1080p).

## Will a 320 kbps MP3 sound better than the original?

No. The bitrate is an encoder target. Converting can't restore quality that isn't in the source. For the best quality, choose _Best Audio Quality_ or _Original_.

## Can I download whole playlists or channels?

Yes. waydlp previews the playlist so you can pick items, and asks before downloading very large ones.

## Is there an online version?

Not at the moment, by design. Running downloads on our servers would cost money, collect user data, invite abuse and make the service less reliable than running yt-dlp on your own device. The website hosts information and downloads only.

## Is there an iOS / macOS version?

No. waydlp targets Windows, Linux and Android.

## How do I update?

waydlp never updates itself silently. Package-manager installs (deb, rpm, Arch, Flatpak) update with your package manager; the Windows installer, MSI, AppImage and portable builds are replaced with the newer download. waydlp can tell you when a new version is out (About → Check for updates). yt-dlp can be updated from inside the app at any time.

## Why does Windows warn about the installer?

The builds aren't code-signed yet, so SmartScreen doesn't recognise them. Verify the SHA-256 checksum on the download page, then choose “More info → Run anyway”.

## Where are my files and settings?

Downloads go to `Downloads/waydlp` by default (change it in Settings). `waydlp-cli paths` shows where settings and history are stored. In portable mode everything stays in the `data` folder next to the program.

## How can I help?

Report bugs, suggest features, improve the docs or contribute code — see [Contributing](/contributing).
