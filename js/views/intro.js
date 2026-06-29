// First-launch intro — 3 calm slides, skip anytime. Minimal text.

import { h } from '../ui.js';
import { setIntroSeen } from '../gamify.js';
import { rerender } from '../app.js';

const SLIDES = [
  { icon: '📖', title: 'Padho, samjho', text: 'Poora SSC CGL syllabus, simple bhasha me.' },
  { icon: '✏️', title: 'Practice karo', text: 'Flashcards, quiz aur mock — apni speed pe.' },
  { icon: '🌱', title: 'Roz thoda', text: 'Calm aur distraction-free. Aaram se aage badho.' },
];

export function renderIntro() {
  const root = h('div', { class: 'view view-intro' });
  let i = 0;

  function done() { setIntroSeen(); rerender(); }

  const skip = h('button', { class: 'intro-skip', text: 'Skip', onClick: done });
  const stage = h('div', { class: 'intro-stage' });
  const dots = h('div', { class: 'intro-dots' });
  const cta = h('button', { class: 'btn btn-primary full' });

  function render() {
    const s = SLIDES[i];
    stage.replaceChildren(
      h('div', { class: 'intro-icon', text: s.icon }),
      h('h1', { class: 'intro-title', text: s.title }),
      h('p', { class: 'intro-text', text: s.text }),
    );
    dots.replaceChildren(...SLIDES.map((_, k) => h('span', { class: 'dot' + (k === i ? ' on' : '') })));
    cta.textContent = i === SLIDES.length - 1 ? 'Shuru karein' : 'Aage';
    cta.onclick = () => { if (i < SLIDES.length - 1) { i += 1; render(); } else done(); };
    skip.style.visibility = i === SLIDES.length - 1 ? 'hidden' : 'visible';
  }

  root.append(skip, stage, h('div', { class: 'intro-foot' }, [dots, cta]));
  render();
  return root;
}
