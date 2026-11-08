# Building from source

waydlp lives in separate repositories:

- [waydlp-desktop-rust](https://github.com/waywhywhy/waydlp-desktop-rust) — Windows & Linux app, CLI and installers (Rust)
- [waydlp-mobile-dart](https://github.com/waywhywhy/waydlp-mobile-dart) — Android app (Dart/Flutter + Kotlin)
- [waywhy-website](https://github.com/waywhywhy/waywhy-website) — this website (Next.js)

## Desktop (Rust)

Install Rust stable from [rustup.rs](https://rustup.rs). On Windows, also install the Visual Studio Build Tools (C++ workload). On Linux, install development headers:

```bash
# Debian / Ubuntu / Mint
sudo apt install build-essential pkg-config libxkbcommon-dev libwayland-dev libx11-dev \
  libxcursor-dev libxrandr-dev libxi-dev libgl1-mesa-dev libdbus-1-dev
# Fedora
sudo dnf install gcc pkgconf-pkg-config libxkbcommon-devel wayland-devel libX11-devel \
  libXcursor-devel libXrandr-devel libXi-devel mesa-libGL-devel dbus-devel
# Arch and derivatives
sudo pacman -S --needed base-devel libxkbcommon wayland libx11 libxcursor libxrandr libxi mesa dbus
```

Then:

```bash
git clone https://github.com/waywhywhy/waydlp-desktop-rust.git
cd waydlp-desktop-rust
cargo run -p waydlp-gui --release           # the app
cargo run -p waydlp-cli -- --help           # the command-line tool
cargo test --workspace --all-features       # tests
```

Packaging (installers, MSI, deb, rpm, AppImage, Flatpak, Arch) is described in `docs/PACKAGING.md` in that repository.

## Android (Flutter)

Requirements: Flutter (stable), Android SDK with platform 35+, JDK 17.

```bash
git clone https://github.com/waywhywhy/waydlp-mobile-dart.git
cd waydlp-mobile-dart
flutter pub get
flutter test
flutter build apk --release --split-per-abi
```

Release builds need a signing key; see `docs/SIGNING.md` in that repository. Without one, `flutter build apk --debug` produces an installable debug build.

## Website (Next.js)

Requirements: Node.js 20.9+.

```bash
git clone https://github.com/waywhywhy/waywhy-website.git
cd waywhy-website
npm ci
npm run dev          # http://localhost:3000
npm run check        # format, lint, types, tests, production build
```
