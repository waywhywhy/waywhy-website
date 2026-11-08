# Android installation

The Android app is a native Flutter app (not a website wrapper). It downloads **on your phone**: yt-dlp and FFmpeg run on the device through an embedded runtime, so no waydlp server is involved. Android 7.0 or newer is required. There is no iOS version.

## Install the APK

1. On your phone, download `waydlp-<version>-android-arm64.apk` (fits almost all phones from the last years) or `waydlp-<version>-android-universal.apk` (works on every device, larger).
2. Open the file. Android asks to allow installs from your browser or file manager — allow it for this install.
3. Open waydlp.

Verify the checksum if you downloaded the APK on another device. Releases are signed with the waydlp release key; Android refuses updates signed with a different key.

## Install and update with Obtainium

[Add waydlp to Obtainium](https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22io.github.waywhywhy.waydlp%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fwaywhywhy%2Fwaydlp-mobile-dart%22%2C%22author%22%3A%22waywhywhy%22%2C%22name%22%3A%22waydlp%22%2C%22additionalSettings%22%3A%22%7B%5C%22apkFilterRegEx%5C%22%3A%5C%22%5Ewaydlp-.%2A-android-universal%5B.%5Dapk%24%5C%22%2C%5C%22includePrereleases%5C%22%3Afalse%2C%5C%22autoApkFilterByArch%5C%22%3Afalse%2C%5C%22verifyLatestTag%5C%22%3Atrue%7D%22%7D) on your Android device, confirm the
configuration import, then check for updates to install waydlp. If you do not
have Obtainium yet, the link offers its installation page.

The configuration follows stable GitHub releases and selects the universal APK
for ARM64, ARMv7 and x64. Existing installations from GitHub Releases can be
updated with the same signing key. Update notifications and background installation
depend on your Obtainium settings and Android permissions.

For manual setup, add `https://github.com/waywhywhy/waydlp-mobile-dart` in Obtainium,
leave **Include pre-releases** off, enable **Verify latest tag**, and set
**Filter APKs by Regular Expression** to:

```regex
^waydlp-.*-android-universal[.]apk$
```

You can also download [obtainium.json](https://raw.githubusercontent.com/waywhywhy/waydlp-mobile-dart/main/obtainium.json)
and import it from Obtainium's Import/Export page. The universal APK is larger
than an architecture-specific download, but avoids choosing a variant each time.

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
