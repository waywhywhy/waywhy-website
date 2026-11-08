# Contributing to the waydlp website

General guidelines are in the [organisation contributing guide](https://github.com/waywhywhy/.github/blob/main/CONTRIBUTING.md).

- Documentation lives in `content/docs/*.md`. Add new pages to the table of contents in `src/lib/docs.ts`.
- Keep the design tokens in `src/app/globals.css` in sync with the apps (see `BRANDING.md` in the `.github` repository).
- No analytics, trackers or third-party scripts.
- Never show download links that don't come from real GitHub Releases.
- Before a pull request, run `npm run check`.
