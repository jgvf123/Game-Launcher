// App entry: hash router, view mount, theme, daily/streak init, service worker.

import { loadState, getState, update } from './state.js';
import { ensureDaily } from './gamify.js';
import { renderOnboarding } from './views/onboarding.js';
import { renderHome } from './views/home.js';
import { renderLearn, renderSubject } from './views/learn.js';
import { renderTopic } from './views/topic.js';
import { renderLesson } from './views/lesson.js';
import { renderFlashcards } from './views/flashcards.js';
import { renderQuiz, renderPractice, renderMock, renderSaved } from './views/quiz.js';
import { renderStats } from './views/stats.js';

const appEl = () => document.getElementById('app');

// ---------- Theme ----------
const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function applyTheme() {
  const pref = getState().settings.theme || 'auto';
  const dark = pref === 'dark' || (pref === 'auto' && prefersDark());
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#11161c' : '#f3f6f9');
}

export function setTheme(pref) {
  update((s) => { s.settings.theme = pref; });
  applyTheme();
}

// ---------- Router ----------
function parseHash() {
  const raw = (location.hash || '#/home').replace(/^#\/?/, '');
  return raw.split('/').filter(Boolean); // e.g. ['topic','quant','algebra']
}

const NAV = [
  { id: 'home', label: 'Home', icon: '🏠', hash: '#/home' },
  { id: 'learn', label: 'Learn', icon: '📚', hash: '#/learn' },
  { id: 'practice', label: 'Practice', icon: '🎯', hash: '#/practice' },
  { id: 'stats', label: 'Stats', icon: '📊', hash: '#/stats' },
];

function renderNav(activeId) {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.replaceChildren();
  for (const item of NAV) {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (item.id === activeId ? ' active' : '');
    btn.innerHTML = `<span class="nav-icon">${item.icon}</span><span class="nav-label">${item.label}</span>`;
    btn.addEventListener('click', () => { location.hash = item.hash; });
    nav.append(btn);
  }
}

function route() {
  // Decorative leftovers (confetti) agli screen pe na le jao — clean feel.
  document.querySelectorAll('.confetti-layer').forEach((n) => n.remove());

  const container = appEl();

  // Onboarding gate — jab tak naam set nahi, sirf welcome screen.
  if (!getState().profile.onboarded) {
    try {
      if (container) container.replaceChildren(renderOnboarding());
    } catch (e) { console.error('Onboarding render error:', e); }
    setNavHidden(true);
    if (container) { container.scrollTop = 0; window.scrollTo(0, 0); }
    return;
  }
  setNavHidden(false);

  const parts = parseHash();
  const [section, a, b] = parts;
  let view;
  let activeNav = 'home';

  try {
    switch (section) {
      case 'learn': view = renderLearn(); activeNav = 'learn'; break;
      case 'subject': view = renderSubject(a); activeNav = 'learn'; break;
      case 'topic': view = renderTopic(a, b); activeNav = 'learn'; break;
      case 'lesson': view = renderLesson(a, b); activeNav = 'learn'; break;
      case 'flashcards': view = renderFlashcards(a, b); activeNav = 'learn'; break;
      case 'quiz': view = renderQuiz(a, b); activeNav = 'learn'; break;
      case 'practice': view = renderPractice(a); activeNav = 'practice'; break;
      case 'mock': view = renderMock(); activeNav = 'practice'; break;
      case 'saved': view = renderSaved(); activeNav = 'practice'; break;
      case 'stats': view = renderStats(); activeNav = 'stats'; break;
      case 'home':
      default: view = renderHome(); activeNav = 'home'; break;
    }
  } catch (e) {
    console.error('Render error:', e);
    view = document.createElement('div');
    view.className = 'view';
    view.innerHTML = '<p class="empty">Kuch gadbad ho gayi. Wapas Home jao.</p>';
  }

  if (container) {
    container.replaceChildren(view);
    container.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  renderNav(activeNav);
}

// Allow views (e.g. onboarding) to force a re-route.
export function rerender() { route(); }

function setNavHidden(hidden) {
  const nav = document.getElementById('nav');
  if (nav) nav.style.display = hidden ? 'none' : '';
}

// ---------- Service worker ----------
function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  // Naya version aane par ek baar auto-reload (purane cache se update mil jaye).
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((e) => {
      console.warn('SW registration failed (app still works online):', e);
    });
  });
}

// ---------- Init ----------
function init() {
  loadState();
  applyTheme();
  ensureDaily();

  // React to system theme changes when in auto mode.
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((getState().settings.theme || 'auto') === 'auto') applyTheme();
      });
    } catch (_) { /* older browsers: ignore */ }
  }

  window.addEventListener('hashchange', route);
  if (!location.hash) location.hash = '#/home';
  route();
  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
