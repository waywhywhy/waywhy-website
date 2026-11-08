# Playlists & batch downloads

## Playlists, channels and albums

Paste a playlist, channel, album or set link and press **Analyze**. waydlp lists the items quickly (no media is downloaded while listing), with titles and durations where the site provides them.

- Tick the items you want, or use **Select all**, **Select none** and **Invert**.
- Choose a mode and options. Because items can differ, quality choices for playlists are _limits_ (“up to 1080p”): each item gets the best quality at or below the limit.
- **Save into a folder named after the playlist** and **Number files by playlist position** are on by default (Settings → Downloads).
- Press **Download N items**. The whole playlist is one entry in the queue, showing which item is downloading (“item 3 of 25”).

To protect you from accidentally downloading thousands of files, waydlp asks for confirmation above 50 items (adjustable), and **Quick download never downloads a playlist without a preview**.

### A video inside a playlist

Links like `watch?v=…&list=…` point to one video in a playlist. waydlp analyses just that video. Use the playlist's own link to get the whole list.

## Skipping what you already have

Enable **Settings → Downloads → Skip already-downloaded items**. waydlp keeps a download archive (the list of downloaded video ids) and yt-dlp skips those next time — handy for keeping a channel or playlist up to date. Clear it in Settings → Privacy.

## Batch downloads

On Home, click **Paste several links…** and paste one link per line (commas and spaces work too). waydlp shows how many links are valid, ignores invalid ones, and adds each to the queue with your default preset. Playlist links in a batch are skipped unless you tick _Include playlist links in full_.

From the command line:

```bash
waydlp-cli download --preset mp3 - < links.txt
```
