import type { Metadata } from "next";
import { Card, PageHeader, Pill } from "@/components/ui";

export const metadata: Metadata = { title: "Features" };

const sections: { title: string; items: string[]; note?: string }[] = [
  {
    title: "Supported websites",
    items: [
      "Every site supported by the installed yt-dlp — thousands of extractors, listed live in the app.",
      "YouTube, YouTube Music, TikTok, Instagram, Facebook, X, Reddit, Twitch, SoundCloud, Vimeo, Dailymotion, Bandcamp and many more.",
      "Update yt-dlp from inside waydlp when a site changes.",
    ],
    note: "Some sites need you to be signed in; DRM-protected services are never supported.",
  },
  {
    title: "Video downloads",
    items: [
      "MP4, MKV, WebM, MOV or the original file.",
      "Only the resolutions that exist: 144p up to 4K and 8K when available.",
      "Codec (H.264, H.265, VP9, AV1) and frame-rate preferences.",
      "Separate video and audio streams merged automatically with FFmpeg.",
      "Remux first — re-encoding only when you allow it.",
    ],
  },
  {
    title: "Audio downloads",
    items: [
      "MP3, M4A (AAC), Opus, FLAC, WAV, OGG (Vorbis) or the original stream.",
      "Best quality or 320/256/192/128 kbps encoder targets — labelled honestly.",
      "Artist/title metadata and cover art embedding.",
      "Optional EBU R128 loudness normalisation.",
    ],
  },
  {
    title: "Playlists & batch downloads",
    items: [
      "Fast playlist previews (no media downloaded while listing).",
      "Pick individual items, download all, as video or audio.",
      "Per-playlist folders, automatic numbering and a download archive to skip duplicates.",
      "Paste many links at once.",
    ],
  },
  {
    title: "Download manager",
    items: [
      "Real progress, speed and time left — straight from yt-dlp.",
      "Concurrent downloads with a configurable limit and ordering.",
      "Pause/resume, cancel, retry, automatic retries for temporary errors.",
      "Searchable history with re-download, open file/folder and safe deletion.",
    ],
  },
  {
    title: "Customisation",
    items: [
      "Presets (built-in and your own), file-name templates, output folders.",
      "Speed limits, timeouts, proxy, cookies file and extra yt-dlp arguments for power users.",
      "Accent colour, interface scale, compact layout, reduced motion.",
      "Settings import/export and a portable mode.",
    ],
  },
  {
    title: "Privacy",
    items: [
      "No accounts, ads, analytics or telemetry.",
      "Downloads happen on your device — no waydlp servers involved.",
      "Clipboard watching and update checks are off unless you turn them on.",
      "Browser cookies are never read automatically.",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="pt-16">
      <PageHeader
        kicker="Features"
        title="Plenty of power, zero clutter"
        lead="waydlp keeps the everyday flow simple — paste, pick, download — and puts advanced options where power users expect them."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((s) => (
          <Card key={s.title}>
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-fg-2">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent-hover">
                    ▸
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            {s.note && (
              <p className="mt-4">
                <Pill tone="muted">{s.note}</Pill>
              </p>
            )}
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <h2 className="text-xl font-semibold">Platform differences</h2>
        <p className="mt-2 text-sm text-fg-2">
          The desktop apps (Windows, Linux) and the Android app share the same design and core features.
          Android runs yt-dlp and FFmpeg on the device through an embedded runtime; some desktop power-user
          options (custom executable paths, extra arguments) are desktop-only. See the documentation for
          details.
        </p>
      </Card>
    </div>
  );
}
