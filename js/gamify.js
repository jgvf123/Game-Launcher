// Gamification logic: XP, levels, streak, daily goal, badges. Pure logic — UI alag hai.

import { getState, update, topicKey } from './state.js';
import { SUBJECTS, getSubject, totalTopicCount } from './data/syllabus.js';

// ---------- Dates ----------
export function todayStr(d = new Date()) {
  // Local date as YYYY-MM-DD (timezone-safe enough for streak logic).
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
  // a, b = 'YYYY-MM-DD'. Returns whole-day difference b - a.
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

// ---------- Levels ----------
const LEVEL_TITLES = [
  'Naya Aspirant',
  'Tayyari Shuru',
  'Mehnati Learner',
  'Focused Mind',
  'Consistent Topper',
  'CGL Warrior',
  'Exam Slayer',
  'Selection Bound',
];

export function levelInfo(xp) {
  let level = 1;
  let need = 100; // xp to advance to next level
  let acc = 0; // xp at start of current level
  while (xp >= acc + need) {
    acc += need;
    level += 1;
    need = 100 + (level - 1) * 50; // gentle growth
  }
  const intoLevel = xp - acc;
  const pct = Math.max(0, Math.min(100, Math.round((intoLevel / need) * 100)));
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return { level, intoLevel, need, pct, title };
}

// ---------- Daily goal & streak ----------
export function ensureDaily() {
  const today = todayStr();
  update((s) => {
    if (s.daily.date !== today) {
      s.daily.date = today;
      s.daily.xpEarned = 0;
    }
  });
}

export function touchStreak() {
  const today = todayStr();
  update((s) => {
    const last = s.streak.lastActive;
    if (last === today) return; // already counted today
    if (!last) {
      s.streak.count = 1;
    } else {
      const diff = daysBetween(last, today);
      if (diff === 1) s.streak.count += 1;
      else if (diff > 1) s.streak.count = 1; // missed a day -> reset
      // diff <= 0 (clock weirdness): leave as-is
    }
    s.streak.lastActive = today;
  });
}

// ---------- XP ----------
// Returns { leveledUp, level, dailyGoalHit }
export function addXp(amount) {
  ensureDaily();
  const before = levelInfo(getState().xp).level;
  let dailyGoalBefore = false;
  let dailyGoalAfter = false;
  update((s) => {
    dailyGoalBefore = s.daily.xpEarned >= s.daily.goal;
    s.xp = Math.max(0, s.xp + amount);
    s.daily.xpEarned += Math.max(0, amount);
    dailyGoalAfter = s.daily.xpEarned >= s.daily.goal;
  });
  touchStreak();
  const after = levelInfo(getState().xp).level;
  return {
    leveledUp: after > before,
    level: after,
    dailyGoalHit: !dailyGoalBefore && dailyGoalAfter,
  };
}

// ---------- Activity recorders ----------
export function recordFlashcards(topicId) {
  const s = getState();
  if (s.flashcardsDone[topicId]) return { leveledUp: false, xp: 0 };
  update((st) => {
    st.flashcardsDone[topicId] = true;
  });
  const res = addXp(10);
  return { ...res, xp: 10 };
}

export function recordQuiz(topicId, correct, total) {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  update((s) => {
    if (!s.quizBest[topicId] || percent > s.quizBest[topicId]) {
      s.quizBest[topicId] = percent;
    }
  });
  const gained = correct * 5;
  const res = addXp(gained);
  return { ...res, xp: gained, percent };
}

export function completeTopic(subjectId, topicId) {
  const key = topicKey(subjectId, topicId);
  const s = getState();
  if (s.completedTopics[key]) return { leveledUp: false, xp: 0, already: true };
  update((st) => {
    st.completedTopics[key] = true;
  });
  const res = addXp(15);
  return { ...res, xp: 15 };
}

export function isTopicComplete(subjectId, topicId) {
  return !!getState().completedTopics[topicKey(subjectId, topicId)];
}

// ---------- Lesson (study) ----------
export function recordLesson(topicId) {
  const s = getState();
  if (s.studiedTopics[topicId]) return { leveledUp: false, xp: 0, already: true };
  update((st) => { st.studiedTopics[topicId] = true; });
  const res = addXp(8);
  return { ...res, xp: 8 };
}

export function isStudied(topicId) {
  return !!getState().studiedTopics[topicId];
}

// ---------- Bookmarks ----------
function bmKey(topicId, index) {
  return `${topicId}#${index}`;
}
export function isBookmarked(topicId, index) {
  return !!getState().bookmarks[bmKey(topicId, index)];
}
export function toggleBookmark(topicId, index) {
  const key = bmKey(topicId, index);
  let now = false;
  update((s) => {
    if (s.bookmarks[key]) delete s.bookmarks[key];
    else { s.bookmarks[key] = true; now = true; }
  });
  return now;
}
export function bookmarkList() {
  // returns [{ topicId, index }]
  return Object.keys(getState().bookmarks)
    .filter((k) => getState().bookmarks[k])
    .map((k) => {
      const [topicId, index] = k.split('#');
      return { topicId, index: Number(index) };
    });
}

// ---------- Notes ----------
export function getNote(topicId) {
  return getState().notes[topicId] || '';
}
export function setNote(topicId, text) {
  update((s) => {
    if (text && text.trim()) s.notes[topicId] = text;
    else delete s.notes[topicId];
  });
}

// ---------- Mock test ----------
export function addMockResult(correct, total) {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  update((s) => {
    s.mockResults.unshift({ date: todayStr(), correct, total, percent });
    if (s.mockResults.length > 20) s.mockResults.length = 20;
  });
  return addXp(correct * 2);
}

// ---------- Weak / strong areas ----------
// Sirf un topics par jinka quiz diya gaya. Returns sorted weakest-first.
export function attemptedTopics() {
  const s = getState();
  return Object.keys(s.quizBest).map((id) => ({ id, best: s.quizBest[id] }));
}
export function weakTopics(limit = 5) {
  return attemptedTopics()
    .filter((t) => t.best < 70)
    .sort((a, b) => a.best - b.best)
    .slice(0, limit);
}
export function strongTopics(limit = 5) {
  return attemptedTopics()
    .filter((t) => t.best >= 70)
    .sort((a, b) => b.best - a.best)
    .slice(0, limit);
}

// ---------- Profile ----------
export function getProfile() {
  return getState().profile;
}
export function setProfile(patch) {
  update((s) => { Object.assign(s.profile, patch); });
  return getState().profile;
}

// ---------- Intro ----------
export function isIntroSeen() { return !!getState().introSeen; }
export function setIntroSeen() { update((s) => { s.introSeen = true; }); }

// ---------- Per-subject reset ----------
export function resetSubject(subjectId) {
  const subject = getSubject(subjectId);
  if (!subject) return;
  update((s) => {
    for (const t of subject.topics) {
      delete s.completedTopics[topicKey(subjectId, t.id)];
      delete s.studiedTopics[t.id];
      delete s.flashcardsDone[t.id];
      delete s.quizBest[t.id];
      delete s.notes[t.id];
      Object.keys(s.bookmarks).forEach((k) => { if (k.startsWith(t.id + '#')) delete s.bookmarks[k]; });
    }
  });
}

// ---------- Progress ----------
export function subjectProgress(subjectId) {
  const subject = getSubject(subjectId);
  if (!subject) return { done: 0, total: 0, pct: 0 };
  const s = getState();
  let done = 0;
  for (const t of subject.topics) {
    if (s.completedTopics[topicKey(subjectId, t.id)]) done += 1;
  }
  const total = subject.topics.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function overallProgress() {
  const s = getState();
  const done = Object.keys(s.completedTopics).filter((k) => s.completedTopics[k]).length;
  const total = totalTopicCount();
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// ---------- Badges ----------
export const BADGES = [
  { id: 'first_topic', icon: '🌱', name: 'Pehla Kadam', desc: 'Pehla topic complete kiya' },
  { id: 'first_quiz', icon: '✏️', name: 'Quiz Shuru', desc: 'Pehla quiz attempt kiya' },
  { id: 'streak_3', icon: '🔥', name: '3-Day Streak', desc: 'Lagataar 3 din padha' },
  { id: 'streak_7', icon: '🏅', name: 'Week Warrior', desc: 'Lagataar 7 din streak' },
  { id: 'xp_500', icon: '⭐', name: '500 XP Club', desc: '500 XP kama liye' },
  { id: 'xp_1000', icon: '💎', name: '1000 XP Master', desc: '1000 XP kama liye' },
  { id: 'subject_reasoning', icon: '🧩', name: 'Reasoning Master', desc: 'Reasoning ke saare topics done' },
  { id: 'subject_ga', icon: '🌍', name: 'GA Master', desc: 'General Awareness ke saare topics done' },
  { id: 'subject_quant', icon: '🔢', name: 'Quant Master', desc: 'Quant ke saare topics done' },
  { id: 'subject_english', icon: '📘', name: 'English Master', desc: 'English ke saare topics done' },
];

// Evaluate badges from current state. Returns list of NEWLY earned badge objects.
export function checkBadges() {
  const s = getState();
  const earned = (id) => !!s.badges[id];
  const want = {};

  if (Object.keys(s.completedTopics).some((k) => s.completedTopics[k])) want.first_topic = true;
  if (Object.keys(s.quizBest).length >= 1) want.first_quiz = true;
  if (s.streak.count >= 3) want.streak_3 = true;
  if (s.streak.count >= 7) want.streak_7 = true;
  if (s.xp >= 500) want.xp_500 = true;
  if (s.xp >= 1000) want.xp_1000 = true;
  for (const subj of SUBJECTS) {
    if (subjectProgress(subj.id).pct === 100) want[`subject_${subj.id}`] = true;
  }

  const newly = [];
  for (const id of Object.keys(want)) {
    if (!earned(id)) {
      newly.push(BADGES.find((b) => b.id === id));
    }
  }
  if (newly.length) {
    update((st) => {
      for (const b of newly) st.badges[b.id] = true;
    });
  }
  return newly.filter(Boolean);
}

export function earnedBadges() {
  const s = getState();
  return BADGES.map((b) => ({ ...b, earned: !!s.badges[b.id] }));
}
