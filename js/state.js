// Guarded localStorage state. Corrupt/missing data pe app crash nahi hoga — defaults se chalega.

const STORAGE_KEY = 'cglquest.v1';

const DEFAULTS = {
  version: 1,
  xp: 0,
  completedTopics: {}, // "subjectId:topicId" -> true
  flashcardsDone: {}, // topicId -> true
  quizBest: {}, // topicId -> best score percent (0-100)
  streak: { count: 0, lastActive: null }, // lastActive = 'YYYY-MM-DD'
  daily: { date: null, xpEarned: 0, goal: 30 },
  badges: {}, // badgeId -> true
  settings: { theme: 'auto' }, // 'auto' | 'light' | 'dark'
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Deep-merge stored data over defaults: naye default fields add ho jaate hain AUR
// stored dynamic-key maps (completedTopics, quizBest, etc.) poore preserve rehte hain.
function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function merge(base, extra) {
  const out = clone(base);
  if (!isPlainObject(extra)) return out;
  // Start from defaults, then overlay EVERY stored key (not just default keys).
  for (const key of Object.keys(extra)) {
    const bv = base[key];
    const ev = extra[key];
    if (ev === undefined) continue;
    if (isPlainObject(bv) && isPlainObject(ev)) {
      out[key] = merge(bv, ev);
    } else {
      out[key] = ev;
    }
  }
  return out;
}

let state = clone(DEFAULTS);

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = merge(DEFAULTS, parsed);
    } else {
      state = clone(DEFAULTS);
    }
  } catch (e) {
    // Corrupt data — reset gracefully, app crash na ho.
    console.warn('State load failed, resetting to defaults.', e);
    state = clone(DEFAULTS);
  }
  return state;
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage full / private mode — silently continue (in-memory state still works).
    console.warn('State save failed (storage unavailable).', e);
  }
}

export function getState() {
  return state;
}

// Apply a mutation function then persist. Returns the state.
export function update(mutator) {
  try {
    mutator(state);
  } catch (e) {
    console.warn('State update error.', e);
  }
  saveState();
  return state;
}

export function resetState() {
  state = clone(DEFAULTS);
  saveState();
  return state;
}

export function topicKey(subjectId, topicId) {
  return `${subjectId}:${topicId}`;
}
