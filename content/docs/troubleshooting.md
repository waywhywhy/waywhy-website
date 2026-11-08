# Troubleshooting

waydlp translates errors into plain language. Here is what each message means and what to try. The **Technical details** section of an error contains the exact yt-dlp output — include it when asking for help.

| Message                                            | What it means                               | What to do                                                                    |
| -------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| **This link isn't supported**                      | yt-dlp doesn't recognise the site or page.  | Check the link; see Supported Websites; try the page's direct video link.     |
| **The media is unavailable**                       | Removed, deleted or made unavailable.       | Nothing to do on your side.                                                   |
| **The media is private**                           | Only invited accounts can see it.           | Use a cookies file for an account that has access.                            |
| **Sign-in required** / **Age-restricted content**  | The site requires a logged-in account.      | Provide a cookies file — only for your own account.                           |
| **Not available in your region**                   | Geo-restricted by the uploader.             | A proxy can be configured, where lawful.                                      |
| **The live stream hasn't started**                 | Scheduled premiere/live event.              | Try again when it's live.                                                     |
| **DRM-protected content**                          | Encrypted media (e.g. streaming services).  | Not supported, and never will be.                                             |
| **yt-dlp may be out of date**                      | The site changed and yt-dlp can't read it.  | Update yt-dlp (Settings → yt-dlp & FFmpeg), then retry.                       |
| **The site is rate-limiting requests**             | Too many requests (HTTP 429).               | Wait; reduce simultaneous downloads; waydlp retries automatically.            |
| **FFmpeg is required**                             | Merging/conversion/embedding needs FFmpeg.  | Install FFmpeg or use _Original file_.                                        |
| **The selected format isn't available**            | The chosen format/quality no longer exists. | Analyse again and choose a listed option.                                     |
| **The disk is full**                               | No space left.                              | Free space or choose another folder.                                          |
| **Permission denied**                              | waydlp can't write to the folder.           | Choose a folder you own (e.g. Downloads).                                     |
| **Invalid output location**                        | Folder or file name problem.                | Check the download folder and file-name template.                             |
| **Network problem** / **The connection timed out** | Connection failed.                          | Check your internet; a proxy/VPN may interfere. waydlp retries automatically. |
| **Conversion failed**                              | FFmpeg couldn't produce the file.           | Try another format; disable re-encoding; update FFmpeg.                       |
| **yt-dlp was not found**                           | No yt-dlp installation detected.            | Install it from Settings.                                                     |

## Other problems

**The app doesn't start.** waydlp renders with Vulkan, Direct3D 12 or OpenGL and falls back automatically. On Linux, make sure Mesa (Vulkan or OpenGL) drivers are installed; on very old hardware try `LIBGL_ALWAYS_SOFTWARE=1 waydlp`.

**AppImage won't run.** Install `libfuse2` (Ubuntu: `sudo apt install libfuse2t64`), or extract it with `--appimage-extract`.

**Windows says the app is unrecognised.** Builds aren't code-signed yet. Verify the checksum, then _More info → Run anyway_.

**Thumbnails don't show.** Check Settings → Privacy → Load thumbnails, and your connection.

**Opening files does nothing (Linux).** Install `xdg-utils`.

**The download is slower than in a browser.** Remove the speed limit in Settings → Downloads; some sites throttle; try again later.

## Logs

waydlp writes logs to its logs folder (Settings → yt-dlp & FFmpeg → _Open logs folder_). Enable _Debug logging_ for more detail (takes effect after a restart). Logs never contain cookie headers or proxy passwords.

## Still stuck?

Search or open an issue on [GitHub](https://github.com/waywhywhy/waydlp-desktop-rust/issues) (desktop) or [the Android repository](https://github.com/waywhywhy/waydlp-mobile-dart/issues). Please include your platform, waydlp and yt-dlp versions, the link (if it's public) and the technical details.
