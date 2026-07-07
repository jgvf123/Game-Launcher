# Frame School

A personal, offline-first study app for the **visual grammar of filmmaking** — shot sizes,
camera angles, lenses, movement, lighting, and color. Browse an illustrated reference
library, drill flashcards with spaced repetition, and test yourself with mixed quizzes.
Single user, no backend, no accounts: everything persists in your browser's localStorage.

## Running it

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # serve the production build
```

The app uses hash-based routing, so the built `dist/` can also be served from any static
file server (or opened locally) and every route keeps working.

## What's inside

- **Library** — 57 concept cards across 6 modules, each with an original schematic SVG
  diagram, a one-line definition, a deeper explanation, mood tags (browse "everything
  used for a tense mood"), and see-also links. Filter by module, mood, or free text.
- **Study** — flashcards (diagram on the front, answer on the back) with a lightweight
  SM-2-style spaced-repetition scheduler. Rate each card *Didn't know / Knew it / Knew it
  well*; failed cards return within the session, known cards step out over days.
  Keyboard: `Space` flips, `1`/`2`/`3` rates.
- **Test** — mixed quizzes with four question types (image → name, name → definition,
  scenario → technique, fill-in-the-blank), scoped to a module, a mood, or everything.
  Immediate feedback per answer; 80% on a module test earns its mastered badge.
- **Progress** — per-module studied/mastered bars, streaks, and a quiz-score history chart.
- **Settings** — light/dark theme, per-module reset, and a full reset (both confirmed).

## Tech

React 19 + Vite + TypeScript, Tailwind CSS v4, React Router (hash router). All
illustrations are hand-built inline SVG components sharing one palette (theme-aware via
CSS variables) — no raster assets, no runtime API calls, fully offline after first load.

Content lives in `src/content/` (typed data, no prose in components); illustrations in
`src/illustrations/`; scheduling/quiz/persistence logic in `src/lib/`.
