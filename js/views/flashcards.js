// Flashcards: tap to flip, next/prev. Deck poora dekhne par XP.

import { h, toast, celebrate } from '../ui.js';
import { getSubject, getTopic } from '../data/syllabus.js';
import { getFlashcards } from '../data/flashcards.js';
import { recordFlashcards, checkBadges } from '../gamify.js';

export function renderFlashcards(subjectId, topicId) {
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const cards = getFlashcards(topicId);
  const root = h('div', { class: 'view view-flash' });

  if (!topic || !cards.length) {
    root.append(h('p', { class: 'empty', text: 'Is topic ke flashcards abhi nahi hain.' }));
    return root;
  }

  let idx = 0;
  let flipped = false;
  let awarded = false;
  const seen = new Set();

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← ' + (topic.name || subject.name), onClick: () => { location.hash = `#/topic/${subjectId}/${topicId}`; } }),
    h('h1', { class: 'page-title', text: '🃏 Flashcards' }),
  ]));

  const counter = h('p', { class: 'muted small center flash-counter' });
  root.append(counter);

  const cardEl = h('button', { class: 'flashcard', 'aria-label': 'Card flip karne ke liye tap karo' });
  root.append(cardEl);

  const prevBtn = h('button', { class: 'btn btn-ghost', text: '← Prev' });
  const flipBtn = h('button', { class: 'btn btn-secondary', text: 'Flip' });
  const nextBtn = h('button', { class: 'btn btn-primary', text: 'Next →' });
  root.append(h('div', { class: 'flash-controls' }, [prevBtn, flipBtn, nextBtn]));

  function maybeAward() {
    if (!awarded && seen.size >= cards.length) {
      awarded = true;
      const res = recordFlashcards(topicId);
      const badges = checkBadges();
      if (res.xp) {
        if (res.leveledUp) celebrate({ icon: '⬆️', title: 'Level ' + res.level + '!', message: 'Flashcards complete!' });
        else toast('+' + res.xp + ' XP · Deck complete 🃏', 'good');
      }
      badges.forEach((b) => setTimeout(() => celebrate({ icon: b.icon, title: 'Badge unlocked!', message: b.name }), 400));
    }
  }

  function render() {
    const c = cards[idx];
    seen.add(idx);
    counter.textContent = (idx + 1) + ' / ' + cards.length;
    cardEl.className = 'flashcard' + (flipped ? ' is-flipped' : '');
    cardEl.replaceChildren(
      h('div', { class: 'flash-side flash-label', text: flipped ? 'Answer' : 'Question' }),
      h('div', { class: 'flash-text', text: flipped ? c.back : c.front }),
      h('div', { class: 'flash-hint', text: flipped ? 'Tap to flip back' : 'Tap to reveal' }),
    );
    prevBtn.disabled = idx === 0;
    nextBtn.textContent = idx === cards.length - 1 ? 'Finish ✓' : 'Next →';
    maybeAward();
  }

  function flip() { flipped = !flipped; render(); }

  cardEl.addEventListener('click', flip);
  flipBtn.addEventListener('click', flip);
  prevBtn.addEventListener('click', () => { if (idx > 0) { idx--; flipped = false; render(); } });
  nextBtn.addEventListener('click', () => {
    if (idx < cards.length - 1) { idx++; flipped = false; render(); }
    else { maybeAward(); location.hash = `#/topic/${subjectId}/${topicId}`; }
  });

  render();
  return root;
}
