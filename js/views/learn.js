// Learn: subject list + per-subject topic journey map.

import { h, progressRing } from '../ui.js';
import { SUBJECTS, getSubject } from '../data/syllabus.js';
import { subjectProgress, isTopicComplete } from '../gamify.js';

export function renderLearn() {
  const root = h('div', { class: 'view' });
  root.append(h('header', { class: 'page-head' }, [
    h('h1', { class: 'page-title', text: 'Learn' }),
  ]));

  for (const s of SUBJECTS) {
    const p = subjectProgress(s.id);
    root.append(
      h('button', { class: 'card subject-card', onClick: () => { location.hash = `#/subject/${s.id}`; } }, [
        h('div', { class: 'subject-icon', text: s.icon }),
        h('div', { class: 'subject-body' }, [
          h('p', { class: 'subject-name', text: s.fullName }),
          h('div', { class: 'bar slim' }, [h('div', { class: 'bar-fill', style: { width: p.pct + '%' } })]),
          h('p', { class: 'muted xsmall', text: p.done + ' / ' + p.total + ' topics' }),
        ]),
        progressRing(p.pct, 52, 6),
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

    path.append(
      h('li', { class: 'journey-item ' + status }, [
        h('div', { class: 'journey-node', text: done ? '✓' : String(i + 1) }),
        h('button', { class: 'journey-card', onClick: () => { location.hash = `#/topic/${subjectId}/${t.id}`; } }, [
          h('span', { class: 'journey-name', text: t.name }),
        ]),
      ]),
    );
  });
  root.append(path);
  return root;
}
