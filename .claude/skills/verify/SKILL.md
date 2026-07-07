---
name: verify
description: Build, launch, and drive Frame School (Vite + React SPA) to verify changes at the browser surface.
---

# Verifying Frame School

Browser GUI app, no backend. All state is in localStorage under `fs.*` keys
(`fs.reviews`, `fs.quizzes`, `fs.streak`, `fs.theme`).

## Launch

```bash
npm install                      # once
npm run dev -- --port 5199 &     # dev server at http://localhost:5199
```

## Drive (Playwright)

Playwright is not a project dependency — install it temporarily (`npm i -D playwright`,
uninstall afterwards). In the remote environment browsers are pre-installed; launch with:

```js
chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
```

Scripts must resolve `node_modules`, so copy them into the repo root (e.g. `drive.tmp.mjs`),
run, then delete. Routes are hash-based: `#/`, `#/library`, `#/library/<cardId>`, `#/study`,
`#/test`, `#/progress`, `#/settings`.

## Flows worth driving

- Library: card grid renders SVGs, mood-chip filter, search box, card detail see-also links.
- Study: `Start session` → `Flip to reveal` → rate; check `fs.reviews` intervals/reps and
  `fs.streak` in localStorage. Keyboard: Space flips, `1`/`2`/`3` rates. Rating "Didn't know"
  re-queues the card at the end of the session.
- Test: pick a module → answer 10 questions (choices are the buttons inside the question
  card) → results screen; check `fs.quizzes`.
- Settings: theme toggle stamps `dark` class on `<html>`; module reset and full reset both
  go through confirmation dialogs (native `<dialog>`).

## Gotchas

- The production build is single-file (`vite-plugin-singlefile`); verify it over
  `file:///…/dist/index.html` too — that's how the user runs it. Router clicks work
  on `file://` (hash history).
- Avoid `text=Browse the Library`-style selectors: Home's "Start here" list items
  contain the same words and Playwright may click the `<li>` instead of the button.
  Use `getByRole('link'/'button', { name, exact: true })`.

- After `await page.click('nav a…')` wait for a selector unique to the target page —
  headings like "Shot Sizes" also appear on Home.
- Screenshot reads can be stale in the harness; when in doubt sample pixels from the PNG
  rather than re-reading the image.
- Headless chromium here mis-composites `backdrop-filter` over translucent backgrounds —
  that's why nav surfaces use solid colors.
