// Learn: subject list + per-subject topic journey map.

import { h, progressRing } from '../ui.js';
import { SUBJECTS, getSubject } from '../data/syllabus.js';
import { subjectProgress, isTopicComplete } from '../gamify.js';
import { getQuiz } from '../data/quizzes.js';
import { getFlashcards } from '../data/flashcards.js';

export function renderLearn() {
  const root = h('div', { class: 'view' });
  root.append(h('header', { class: 'page-head' }, [
    h('h1', { class: 'page-title', text: 'Learn' }),
    h('p', { class: 'muted', text: 'Apna subject chuno aur journey shuru karo.' }),
  ]));

  for (const s of SUBJECTS) {
    const p = subjectProgress(s.id);
    root.append(
      h('button', { class: 'card subject-card', onClick: () => { location.hash = `#/subject/${s.id}`; } }, [
        h('div', { class: 'subject-icon', text: s.icon }),
        h('div', { class: 'subject-body' }, [
          h('p', { class: 'subject-name', text: s.fullName }),
          h('p', { class: 'muted small', text: s.blurb }),
          h('div', { class: 'bar slim' }, [h('div', { class: 'bar-fill', style: { width: p.pct + '%' } })]),
          h('p', { class: 'muted xsmall', text: p.done + ' / ' + p.total + ' topics done' }),
        ]),
        progressRing(p.pct, 56, 6),
      ]),
    );
  }
  return root;
}

export function renderSubject(subjectId) {
  const subject = getSubject(subjectId);
  const root = h('div', { class: 'view' });
  if (!subject) {
    root.append(h('p', { class: 'empty', text: 'Subject nahi mila.' }));
    return root;
  }
  const p = subjectProgress(subjectId);

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← Subjects', onClick: () => { location.hash = '#/learn'; } }),
    h('h1', { class: 'page-title', text: subject.icon + ' ' + subject.name }),
    h('p', { class: 'muted', text: p.done + ' / ' + p.total + ' topics complete · ' + p.pct + '%' }),
    h('div', { class: 'bar' }, [h('div', { class: 'bar-fill', style: { width: p.pct + '%' } })]),
  ]));

  let activeMarked = false;
  const path = h('ol', { class: 'journey' });
  subject.topics.forEach((t, i) => {
    const done = isTopicComplete(subjectId, t.id);
    let status = 'todo';
    if (done) status = 'done';
    else if (!activeMarked) { status = 'active'; activeMarked = true; }

    const counts = [];
    const fc = getFlashcards(t.id).length;
    const qz = getQuiz(t.id).length;
    if (fc) counts.push('🃏 ' + fc);
    if (qz) counts.push('❓ ' + qz);

    path.append(
      h('li', { class: 'journey-item ' + status }, [
        h('div', { class: 'journey-node', text: done ? '✓' : String(i + 1) }),
        h('button', { class: 'journey-card', onClick: () => { location.hash = `#/topic/${subjectId}/${t.id}`; } }, [
          h('p', { class: 'journey-name', text: t.name }),
          h('p', { class: 'muted small', text: t.blurb }),
          counts.length ? h('p', { class: 'muted xsmall', text: counts.join('   ') }) : null,
        ]),
      ]),
    );
  });
  root.append(path);
  return root;
}
