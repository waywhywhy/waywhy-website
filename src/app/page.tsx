import Link from "next/link";
import { ButtonLink, Card, Logo, Pill } from "@/components/ui";
import { getLatestRelease } from "@/lib/releases";
import { gh, site } from "@/lib/site";

export const revalidate = 3600;

const highlights = [
  {
    title: "Paste. Pick. Download.",
    body: "Paste a link, see the real title, thumbnail and qualities that exist, and download in one click.",
  },
  {
    title: "Thousands of sites",
    body: "Everything yt-dlp supports — YouTube, SoundCloud, Vimeo, Bandcamp, Twitch, Reddit and many more.",
  },
  {
    title: "Video or audio, your way",
    body: "MP4, MKV, WebM or the original file. MP3, M4A, Opus, FLAC or WAV — with honest quality labels.",
  },
  {
    title: "Playlists & batches",
    body: "Preview playlists, pick the items you want, or paste a whole list of links at once.",
  },
  {
    title: "A real download manager",
    body: "Live progress straight from yt-dlp, pause and resume, automatic retries and searchable history.",
  },
  {
    title: "Private by design",
    body: "No accounts, no ads, no telemetry. Everything runs on your device.",
  },
];

const platforms = [
  { name: "Windows", detail: "Installer, MSI, portable", tech: "Native Rust app" },
  { name: "Linux", detail: "AppImage, deb, rpm, Flatpak, Arch, tar.gz", tech: "Native Rust app" },
  { name: "Android", detail: "APK", tech: "Flutter app, downloads on-device" },
];

export default async function HomePage() {
  const [desktop, mobile] = await Promise.all([
    getLatestRelease(site.repos.desktop),
    getLatestRelease(site.repos.mobile),
  ]);
  const released = desktop ?? mobile;

  return (
    <>
      <section className="hero-glow relative -mx-5 px-5 pt-20 pb-16 text-center sm:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Logo size={88} />
          <h1 className="mt-8 text-5xl font-bold tracking-tight text-fg sm:text-7xl">waydlp</h1>
          <p className="mt-4 text-xl text-accent-hover sm:text-2xl">{site.tagline}</p>
          <p className="mt-5 max-w-2xl text-lg text-fg-2">
            A free, open-source media downloader for Windows, Linux and Android, powered by yt-dlp and FFmpeg.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/download">Download waydlp</ButtonLink>
            <ButtonLink href={gh(site.repos.desktop)} variant="ghost" external>
              View on GitHub
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-fg-muted">
            {released ? (
              <>
                Latest release: <span className="text-fg-2">v{released.version}</span>
              </>
            ) : (
              <>No release has been published yet — follow the project on GitHub or build from source.</>
            )}
          </p>
        </div>
      </section>

      <section aria-labelledby="platforms" className="mt-6">
        <h2 id="platforms" className="sr-only">
          Platforms
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {platforms.map((p) => (
            <Card key={p.name}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <Pill tone="muted">{p.tech}</Pill>
              </div>
              <p className="mt-2 text-sm text-fg-2">{p.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="features" className="mt-24">
        <h2 id="features" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="mt-3 max-w-2xl text-fg-2">
          Beginners can paste a link and go. Power users get presets, file-name templates, codecs, rate
          limits, proxies and extra yt-dlp arguments — tucked away until needed.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <Card key={h.title} className="transition-colors hover:border-accent-2/70">
              <h3 className="font-semibold text-fg">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{h.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/features" className="text-accent-hover hover:underline">
            See all features →
          </Link>
        </div>
      </section>

      <section aria-labelledby="how" className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 id="how" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Honest by default
          </h2>
          <ul className="mt-6 space-y-4 text-fg-2">
            <li>
              <strong className="text-fg">Real progress.</strong> Every number comes from yt-dlp and FFmpeg —
              no simulated bars.
            </li>
            <li>
              <strong className="text-fg">Real choices.</strong> Only qualities and formats that actually
              exist are offered.
            </li>
            <li>
              <strong className="text-fg">No silent quality loss.</strong> Streams are remuxed when possible;
              re-encoding is opt-in, and bitrates are labelled as encoder targets.
            </li>
            <li>
              <strong className="text-fg">Clear errors.</strong> “The media is private” or “yt-dlp may be out
              of date” — with technical details one click away.
            </li>
          </ul>
        </div>
        <Card className="font-mono text-sm">
          <p className="text-fg-muted"># the same engine, from the command line</p>
          <p className="mt-2 text-fg">
            <span className="text-accent-hover">$</span> waydlp-cli analyze https://…
          </p>
          <p className="mt-1 text-fg">
            <span className="text-accent-hover">$</span> waydlp-cli download --audio mp3 --bitrate 320
            https://…
          </p>
          <p className="mt-1 text-fg">
            <span className="text-accent-hover">$</span> waydlp-cli download --video mp4 --max-height 1080 -
            &lt; links.txt
          </p>
        </Card>
      </section>

      <section aria-labelledby="oss" className="mt-24">
        <Card className="text-center">
          <h2 id="oss" className="text-2xl font-bold">
            Free and open source
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-fg-2">
            The apps are licensed under the GPL-3.0-or-later. Read the code, report issues and contribute on
            GitHub.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/docs" variant="ghost">
              Read the docs
            </ButtonLink>
            <ButtonLink href="/contributing" variant="ghost">
              Contribute
            </ButtonLink>
          </div>
        </Card>
      </section>
    </>
  );
}
