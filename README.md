# Frame School

A personal, offline-first app for learning the craft of filmmaking — and then executing
every part of it in an AI pipeline. Ten tracks from story thinking to delivery and pricing,
each lesson ending in one timeboxed thing to make. Alongside them: an illustrated reference
library, spaced-repetition drilling, scenario drills and a prompt lab.

Single user, no backend, no accounts, no telemetry. Everything persists on device.

## Running it

```bash
npm install
npm run dev            # development server
npm run lint:content   # validate the curriculum (also runs as part of both builds)
npm test               # vitest — content invariants + the SM-2 scheduler
npm run build          # installable PWA build into dist/ (for static hosting)
npm run build:single   # everything inlined into one dist/index.html (runs from disk)
npm run preview        # serve the production build
```

## Installing on Android (as an app)

The default build is an installable **PWA**. A GitHub Actions workflow
(`.github/workflows/deploy.yml`) deploys it to GitHub Pages on every push; enable it once
in the repo under **Settings → Pages → Source: GitHub Actions**. Then on your phone:

1. Open the Pages URL in Chrome (e.g. `https://<user>.github.io/Game-Launcher/`).
2. Tap the **⋮ menu → Add to Home screen → Install**.
3. It now opens fullscreen from its own icon and works completely offline —
   the service worker precaches the entire app.

Alternatively, `npm run build:single` produces a single self-contained `dist/index.html`
you can copy anywhere and open directly — no server, no install, progress saved per
browser.

## The v2 curriculum

Ten tracks that teach the whole craft — story, script, camera, light, color, editing, sound,
how a production actually runs, AI filmmaking, and the business around it. The thing that
makes it different from a course: **every concept is taught twice** — once as it works on a
real set, and once as it is executed, broken and repaired when your camera is a diffusion
model. That second half is the `⚡ AI Translation` block on every lesson.

- **Tracks** (`/tracks`, `/track/:trackId`) — the full map, with written-vs-planned counts.
  A module whose lessons are not written yet shows as an empty shelf, never as a stub.
- **Lesson** (`/lesson/:lessonId`) — fixed layout every time: concept (≤600 words, taught terms
  bolded and tappable for a definition + Hinglish gloss), an interactive code-drawn diagram,
  a collapsible Hinglish gloss, two real examples, three common mistakes, the AI Translation
  block, three checks that seed the review queue, and one timeboxed assignment with three
  self-grading criteria and a **Mark as shipped** button.
- **Review** (`/review`) — one SM-2 queue across everything: lesson checks, glossary terms and
  the v1 concept cards, so there is a single schedule rather than three.
- **Glossary** (`/glossary`) — every bolded term, in English and Hinglish, linked to the lesson
  that teaches it.
- **Ship Log** (`/ship-log`) — the only page that counts finished work rather than pages read.

### Content rules, enforced by the build

`npm run lint:content` fails the build if a lesson has no assignment, a **bolded** term is
missing from the glossary, a body exceeds 600 words, a diagram reference does not resolve, a
prerequisite or module id is wrong, or a check has an unanswerable index. The `Example` type
is a discriminated union: naming a film requires a year and a specific shot, and the only
alternative is a `generic` variant that cannot carry a title — so inventing a source is a
type error rather than a judgement call.

Curriculum data lives in `src/curriculum/` (schema, tracks, glossary, lessons); interactive
diagrams in `src/diagrams/`; on-device stores in `src/data/`.

## What's inside (v1, still live)

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

React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 + React Router (hash router), with
Zod validating content, react-markdown rendering lesson prose, Dexie for on-device storage
and Vitest for tests. Every diagram and illustration is a hand-built inline SVG component
sharing one theme-aware palette — no raster assets, no runtime API calls, no fonts from a
CDN, fully offline after first load, and nothing ever leaves the machine.

**Where data lives.** Review scheduling, quiz history, streak and theme stay in the `fs.*`
localStorage keys v1 already used: localStorage is synchronous and keeps working when the
single-file build is opened straight off disk over `file://`, where some browsers refuse
IndexedDB. Dexie (`frame-school-v2`) owns the newer and bulkier data — lesson progress,
notes, the ship log, projects, shot lists and any blob.

Content lives in `src/curriculum/` (v2) and `src/content/` (v1 cards, stories, drills);
illustrations in `src/illustrations/` and `src/diagrams/`; scheduling and persistence in
`src/lib/` and `src/data/`.
