# Foundrio App Mockup (Android + iOS Ready)

Interactive mobile-first app inspired by your design reference, with working flows:
- Login
- Dashboard stats
- Project list and progress
- RAJUK status
- Document download actions
- Drawer + bottom navigation

## Run web app locally

```bash
python3 -m http.server 4173
```

Open: <http://localhost:4173>

## Build Android APK and iOS app (on your machine)

This repository includes a complete web app that can be wrapped as Android/iOS app.
Because this environment does not have Android SDK / Xcode access, binary generation must be run on a local dev machine.

### Option A: Capacitor (recommended)

```bash
npm install
npm run mobile:init
npm run mobile:android
npm run mobile:ios
```

Then:
- Android Studio: Build APK from `android/`
- Xcode: Build/archive app from `ios/`

### Option B: Direct web deploy

You can also host this as a PWA using the included `manifest.webmanifest` and `sw.js`.

## Notes

- All mockup UI functions are implemented in `app.js`.
- Document buttons generate downloadable files directly in the app.
