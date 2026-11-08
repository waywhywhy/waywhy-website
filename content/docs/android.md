# Android installation

The Android app is a native Flutter app (not a website wrapper). It downloads **on your phone**: yt-dlp and FFmpeg run on the device through an embedded runtime, so no waydlp server is involved. Android 7.0 or newer is required. There is no iOS version.

## Install the APK

1. On your phone, download `waydlp-<version>-android-arm64.apk` (fits almost all phones from the last years) or `waydlp-<version>-android-universal.apk` (works on every device, larger).
2. Open the file. Android asks to allow installs from your browser or file manager — allow it for this install.
3. Open waydlp.

Verify the checksum if you downloaded the APK on another device. Releases are signed with the waydlp release key; Android refuses updates signed with a different key.

## Sharing links to waydlp

In YouTube, your browser or any other app, tap **Share → waydlp**. waydlp opens with the link and analyses it.

## Where files are saved

By default, downloads go to **Download/waydlp** and appear in your gallery and music apps. You can pick another folder in Settings; Android then asks you to grant access to that folder.

## Background downloads

Downloads continue while you use other apps, shown in a notification with progress (tap it to open the queue). Android may ask you to allow notifications. You can restrict downloads to Wi-Fi in Settings.

## Updating yt-dlp on Android

Sites change often. Open **Settings → yt-dlp** and tap **Update** to fetch the latest yt-dlp version into the app.

## Limitations

- The first start unpacks the embedded Python/yt-dlp/FFmpeg runtime, which takes a few seconds and needs ~100 MB of storage.
- Very large downloads and conversions are slower than on a computer and use more battery.
- Desktop-only power-user options (custom executable paths, extra yt-dlp arguments) are not available on Android.
