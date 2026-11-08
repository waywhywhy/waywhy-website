# Security

## Reporting a vulnerability

**Please don't report security problems in public issues.** Use GitHub's private vulnerability reporting for the affected repository:

- Desktop app, CLI and installers: <https://github.com/waywhywhy/waydlp-desktop-rust/security/advisories/new>
- Android app: <https://github.com/waywhywhy/waydlp-mobile-dart/security/advisories/new>
- Website: <https://github.com/waywhywhy/waywhy-website/security/advisories/new>

Describe the problem, how to reproduce it, the affected version and platform, and the impact. We aim to acknowledge reports within 7 days and agree on a disclosure timeline with you.

Bugs in yt-dlp or FFmpeg themselves should be reported to those projects.

## How waydlp protects you

- **No shell.** yt-dlp and FFmpeg are started with explicit argument lists; links always come after `--`; extra arguments that would execute programs are rejected.
- **Safe paths.** File-name templates can't be absolute or contain `..`; archive extraction rejects path traversal.
- **Verified downloads.** yt-dlp, FFmpeg and waydlp installers are checked against SHA-256 checksums from the same GitHub release before use; every release ships `SHA256SUMS.txt`.
- **TLS everywhere** with certificate validation.
- **No secrets in logs.** Cookie and authorization headers and proxy passwords are redacted.
- **Least privilege.** User-level installs need no administrator rights; system packages go through your package manager; Android requests only the permissions it needs.
- **Package-manager ownership is respected** — waydlp never overwrites files managed by apt, dnf, pacman or Flatpak.

## Known limitations

- Release binaries are not yet code-signed on Windows.
- The GPG signature of yt-dlp's checksum file is not verified yet (the checksum itself is).
