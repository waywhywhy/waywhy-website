# Supported formats

## Video containers

| Container    | Plays on                       | Notes                                                                                |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------ |
| **MP4**      | Almost everything              | waydlp prefers H.264/AAC streams for MP4 presets so files play on older devices too. |
| **MKV**      | VLC, mpv, most desktop players | Accepts any codec; best for “highest quality”.                                       |
| **WebM**     | Browsers, Android              | VP9/AV1 + Opus.                                                                      |
| **MOV**      | Apple software, editors        |                                                                                      |
| **Original** | —                              | Whatever the site serves; merged into MKV when needed.                               |

## Video codecs

- **H.264 (AVC)** — most compatible; often limited to 1080p on large sites.
- **H.265 (HEVC)** — efficient, less widely supported.
- **VP9** — common for 1440p/4K on the web.
- **AV1** — smallest files; needs newer hardware/players.

The _Codec preference_ only offers codecs the site actually provides.

## Audio formats

| Format           | Type               | Use it for                                                              |
| ---------------- | ------------------ | ----------------------------------------------------------------------- |
| **MP3**          | Lossy              | Maximum compatibility (car stereos, old players).                       |
| **M4A (AAC)**    | Lossy              | Apple devices; often no conversion needed because many sites serve AAC. |
| **Opus**         | Lossy              | Best quality per bitrate; often the site's original audio.              |
| **OGG (Vorbis)** | Lossy              | Games, some Linux players.                                              |
| **FLAC**         | Lossless container | Archiving after editing. _Does not_ make a lossy source lossless.       |
| **WAV**          | Uncompressed       | Audio editors. Large files, no cover art.                               |
| **Original**     | As served          | No conversion at all.                                                   |

### About bitrates

Quality choices such as _320 kbps_ are **encoder targets**. Most web audio is already compressed (often around 128–160 kbps). Converting to a higher bitrate or to FLAC/WAV cannot restore detail that isn't in the source — it only makes the file larger. waydlp shows the best source bitrate it found so you can choose sensibly. For the best quality with no conversion, use _Original_ or _Best Audio Quality_.

## Remuxing vs re-encoding

- **Remuxing** copies the existing video/audio into a different container. Fast and lossless. waydlp always tries this first and prefers streams that fit your container.
- **Re-encoding** decodes and compresses again: slow, and it loses some quality. waydlp only re-encodes video when you enable _Re-encode if the streams don't fit the container_, and audio only when you pick a target format other than _Original_.

## Subtitles

Downloaded as the site provides them (usually VTT or SRV), optionally converted to **SRT**, and optionally embedded into MP4, MKV, WebM or MOV files.

## Thumbnails and metadata

Cover art is embedded into MP3, M4A, FLAC, Opus/OGG, MP4, MKV and MOV (not WAV or WebM). Title, artist/uploader, date, description and chapters are embedded when available.
