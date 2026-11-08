# waydlp website

The official website for **waydlp**: homepage, features, downloads, documentation, changelog and FAQ. It's built with Next.js, React, TypeScript and Tailwind CSS, and deploys to Vercel.

- **Real downloads only.** The download page reads GitHub Releases for [waydlp-desktop-rust](https://github.com/waywhywhy/waydlp-desktop-rust) and [waydlp-mobile-dart](https://github.com/waywhywhy/waydlp-mobile-dart), and shows each file with its size, architecture and SHA-256 from `SHA256SUMS.txt`. Until a release exists it says so, instead of showing placeholder links.
- **No tracking.** There are no analytics, cookies or third-party scripts, and a strict Content-Security-Policy is set in `next.config.ts`.
- **Docs are plain Markdown** in `content/docs/`. They're rendered at build time.

## Develop

Requires Node.js 20.9+.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run check        # prettier, eslint, tsc, vitest, next build
```

| Script              |                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm run lint`      | ESLint (next/core-web-vitals + TypeScript)                                              |
| `npm run typecheck` | `tsc --noEmit`                                                                          |
| `npm test`          | Vitest: artifact-name parsing, checksums, release handling with mocked GitHub responses |
| `npm run build`     | Production build                                                                        |

## Deploy on Vercel

1. Import the repository in Vercel. The framework is detected as Next.js; `vercel.json` pins `npm ci` and `npm run build`.
2. Optional environment variables (see `.env.example`):
   - `GITHUB_TOKEN`: a token with no scopes, to raise the GitHub API rate limit used for release data.
   - `NEXT_PUBLIC_SITE_URL`: the public URL, used for canonical links and the sitemap.
3. Pull requests get Preview Deployments automatically once the Vercel GitHub integration is connected.
4. **Custom domain:** add it under _Project → Settings → Domains_, set the DNS records Vercel shows, then set `NEXT_PUBLIC_SITE_URL`. No domain has been configured yet.

Release data is cached for an hour (ISR). A new release appears within an hour, or immediately after a redeploy.

## Release integration

Asset names follow `waydlp-<version>-<os>-<arch>[-variant].<ext>`, the same scheme as `waydlp_core::artifacts` in the desktop repository. The parser is in `src/lib/artifacts.ts`, and its tests cover every package kind.

## Why there's no online downloader

Running yt-dlp jobs on Vercel functions would be unreliable (time and size limits). A separate backend would cost money, process users' data and attract abuse. waydlp's apps download on the user's own device, so the site only hosts information and links to releases. See the FAQ.

## License

MIT. See [LICENSE](LICENSE).
