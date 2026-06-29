# CGL Quest — SSC CGL Tier 1 Prep App 🎯

Ek calm, **fun & gamified** Progressive Web App jisse SSC CGL **Tier 1** ka
poora syllabus aaram se cover ho — flashcards, quizzes, journey map, XP, levels
aur daily streaks ke saath. Hinglish me, bilkul uncluttered, **offline-ready**,
aur **no-crash** focus ke saath banaya gaya.

## ✨ Features

- **Syllabus journey map** — 4 subjects (Reasoning, General Awareness,
  Quantitative Aptitude, English), har topic ka roadmap aur progress.
- **Flashcards** — har topic ke quick-revision cards (formulas, rules, GK facts).
- **Practice quizzes** — instant feedback + explanation wale MCQs (topic-wise ya
  mixed practice).
- **Gamification** — XP, levels, badges, daily goal ring aur 🔥 streak.
- **Soothing UI** — soft palette, light/dark mode, large tap targets, ek screen
  pe ek primary action.
- **PWA** — phone me "Add to Home Screen", offline bhi chalti hai.

## 📱 Kaise chalayein (locally)

Koi build/install nahi — bas ek static server chahiye (ES modules ke liye
`file://` se nahi chalega):

```bash
# repo root me
python3 -m http.server 8080
# phir browser me kholo:  http://localhost:8080/
```

Phone pe browser me kholkar **menu → Add to Home Screen** karo — app jaise install
ho jayega aur offline kaam karega.

## 🌐 Deploy (GitHub Pages)

1. GitHub repo → **Settings → Pages**.
2. Source = is branch ka root (`/`).
3. Diye gaye URL pe app live ho jayegi.

Sab files static hain (root pe `index.html`), to koi extra config nahi chahiye.

## 🗂️ Structure

```
index.html              # app shell + bottom nav
manifest.webmanifest    # PWA metadata
service-worker.js       # offline cache
css/styles.css          # calm theme (light/dark)
js/
  app.js                # hash router + init + theme + SW
  state.js              # guarded localStorage (no-crash)
  gamify.js             # XP / level / streak / badges
  ui.js                 # render helpers, toast, celebrate
  data/                 # syllabus, flashcards, quizzes (yahan content add karo)
  views/                # home, learn, topic, flashcards, quiz, stats
assets/icons/           # PWA icons
```

## ➕ Content add karna

- Naya quiz/flashcard: `js/data/quizzes.js` ya `js/data/flashcards.js` me topic
  id ke against entry jodo.
- Naya topic/subject: `js/data/syllabus.js` me add karo — baaki app apne-aap
  uthha lega.

## 🔒 Privacy

Saari progress sirf tumhare device ke `localStorage` me rehti hai — koi account,
koi server, koi tracking nahi.

---
*Syllabus standard SSC CGL Tier 1 pattern par based hai (100 Q · 200 marks ·
4 sections · sectional timing). Current affairs/static GK ko time-to-time update
karte raho.*
