# Using the downloader

## Home

The Home page has the link field, **Paste**, **Analyze** and **Quick download**, your active downloads, recent downloads and a summary (completed/failed downloads, yt-dlp and FFmpeg versions, download folder). **Paste several links…** opens the batch box.

## Analysis

**Analyze** asks yt-dlp for the page's metadata. waydlp then shows:

- the thumbnail, title, creator, duration and source site,
- pills such as _up to 2160p_ or _audio ~129 kbps_ — derived from the real format list,
- a _LIVE_ badge for live streams (the download records until the stream ends or you cancel).

Nothing is invented: if a site doesn't report something, it isn't shown.

## Options

**Modes**

| Mode          | What you get                              | Needs FFmpeg                         |
| ------------- | ----------------------------------------- | ------------------------------------ |
| Video         | Best video + best audio, merged           | Yes                                  |
| Audio         | Audio only, optionally converted          | Yes                                  |
| Video only    | Video stream without sound                | Only for container changes/embedding |
| Original file | The best single file as served, untouched | No                                   |

**Video options:** quality (only real resolutions), container (MP4, MKV, WebM, MOV, Original), codec preference (H.264, H.265, VP9, AV1 — unavailable ones are greyed out), frame-rate preference, and _Re-encode if the streams don't fit the container_ (off by default; when off waydlp only remuxes, which never loses quality).

**Audio options:** format (MP3, M4A, Opus, FLAC, WAV, OGG, Original), encoding quality (best VBR or a kbps target), and loudness normalisation.

**Metadata, thumbnails & subtitles:** embed metadata, cover art/thumbnail, chapters; download subtitles in the languages the video actually has (plus automatic captions if you want), embed them, convert to SRT.

**Advanced: pick an exact format** lists every format yt-dlp reported (id, resolution, codec, size) for full control.

**Save as preset** stores the current options under a name.

**Save to / File name** — choose the folder for this download and the file-name template (see [Advanced options](/docs/advanced)).

## Queue

- Progress bars show real data from yt-dlp: downloaded and total size (`~` marks an estimate), speed, time left, fragments for streamed formats. During merging/conversion the bar shows the current step instead.
- **Pause** keeps partial data; **Resume** continues. **Cancel** deletes partial data.
- **Retry** restarts failed downloads; temporary failures are retried automatically (Settings → Downloads → Automatic retries).
- Reorder with ⏶/⏷; set _Simultaneous downloads_ with the slider.
- Failed downloads explain the problem; **Technical details** has the exact yt-dlp output (with cookies and passwords removed) to copy into a bug report.

## History

Search by title, link or site; filter by status and site. For each entry: open the file, show it in its folder, copy the link, **download again** with the same options, **remove the entry** (the file stays) or **delete the files** (always asks first). History can be turned off or limited to a number of days in Settings → Privacy.

## Supported Websites

Lists every extractor of your installed yt-dlp, with a search box. Being listed doesn't guarantee a page works — sites change, some need sign-in, and DRM-protected services are not supported.
