# 🐍 Neon Snake 3D

A polished, **3D interactive snake game** built with [Three.js](https://threejs.org/) —
12 hand-crafted levels, moving hurdles, power-ups, lives, stars, sound, music and
buttery-smooth interpolated motion. Plays on desktop, in a mobile browser, as an
installable PWA, **and as a native Android APK**.

![icon](www/icons/icon-192.png)

## ✨ Features

- **Real 3D world** — perspective camera that follows the snake, dynamic lighting,
  shadows, neon grid arena, fog, particles and screen shake.
- **Super-smooth motion** — grid-based logic runs on a fixed timestep while the
  render layer interpolates between steps, so movement is fluid at any framerate.
- **12 levels** of rising difficulty — open fields, walled arenas, pillar mazes,
  slaloms, diamond rings and a final *Overdrive* boss stage.
- **Hurdles & challenges** — solid walls, edge-wrap zones, and **moving blockers**
  that patrol the arena. Beat each level's orb target to advance.
- **Power-ups** — ⚡ Speed (2× points), 🐌 Slow-mo, 🛡 Shield (survive one crash),
  👻 Ghost (phase through walls).
- **Progression** — lives, score that carries across levels, 1–3 star ratings,
  unlockable level select and a saved high score (localStorage).
- **Controls** — swipe, on-screen D-pad, or keyboard (Arrows / WASD). `P`/`Esc` to pause.
- **Audio** — fully synthesised sound effects and background music (no asset files).
- **Offline** — PWA service worker caches everything; the APK bundles it all.

## 🎮 Play right now (no install)

```bash
npm run serve        # serves www/ on http://localhost:8080
```

Open the URL on your computer, or on your phone over the same network. On Android
Chrome you can tap **⋮ → Add to Home screen** to install it like a real app.

## 📱 Get the Android APK

Building an APK needs the Android SDK + Google's Maven servers, which aren't
reachable from this dev sandbox — so the APK is built automatically in CI where
they are available.

**To get the APK:**

1. Push this repo to GitHub (the branch already builds via
   `.github/workflows/build-apk.yml`).
2. Open the repo's **Actions** tab → the **Build Android APK** run.
3. Download **`neon-snake-3d-apk`** from the run's *Artifacts*, **or** grab
   `neon-snake-3d-debug.apk` from the auto-created **Release**.
4. Copy the `.apk` to your phone and tap it to install. If prompted, allow
   *"Install unknown apps"* for your browser/file-manager. Done — launch
   **Neon Snake 3D** from your app drawer.

You can also trigger a build manually: **Actions → Build Android APK → Run workflow**.

### Build the APK yourself (local machine with Android SDK)

```bash
npm install
npx cap add android      # generates the native android/ project
npx cap sync android
cd android && ./gradlew assembleDebug
# APK -> android/app/build/outputs/apk/debug/app-debug.apk
```

## 🗂 Project structure

```
www/                 the game (this is the source of truth / Capacitor webDir)
  index.html         UI shell: menus, HUD, screens
  styles.css         neon UI theme
  js/game.js         3D engine, game loop, state machine
  js/levels.js       12 level definitions + layout generators
  js/audio.js        synthesised SFX + music
  vendor/three.module.js   Three.js r160 (bundled for offline play)
  manifest.webmanifest, sw.js, icons/   PWA assets
capacitor.config.json          native app config (id com.neon.snake3d)
.github/workflows/build-apk.yml   CI that produces the downloadable APK
scripts/make_icons.py          procedural icon generator
```

## 🛠 Tech

Vanilla JS + Three.js, wrapped for Android with [Capacitor](https://capacitorjs.com/).
No build step for the web game — it's plain ES modules.
