// Home — minimal & learning-focused: greeting, one "continue" card, slim progress, subjects.

import { h } from '../ui.js';
import { getState } from '../state.js';
import { SUBJECTS } from '../data/syllabus.js';
import {
  overallProgress, subjectProgress, ensureDaily, isTopicComplete, getProfile,
} from '../gamify.js';

function greeting() {
  const hr = new Date().getHours();
  if (hr < 12) return 'Good morning';
  if (hr < 17) return 'Good afternoon';
  return 'Good evening';
}

function nextTopic() {
  for (const s of SUBJECTS) {
    for (const t of s.topics) {
      if (!isTopicComplete(s.id, t.id)) return { subject: s, topic: t };
    }
  }
  return null;
}

export function renderHome() {
  ensureDaily();
  const profile = getProfile();
  const st = getState();
  const firstName = (profile.name || '').split(' ')[0] || 'Aspirant';
  const overall = overallProgress();
  const root = h('div', { class: 'view view-home' });

  // Greeting + avatar
  root.append(h('header', { class: 'home-head' }, [
    h('div', { class: 'home-greet' }, [
      h('p', { class: 'eyebrow', text: greeting() + ', ' + firstName }),
      h('button', { class: 'home-avatar', title: 'Profile', text: profile.avatar || '🎓', onClick: () => { location.hash = '#/stats'; } }),
    ]),
  ]));

  // Continue (hero)
  const nx = nextTopic();
  if (nx) {
    root.append(h('section', { class: 'card hero-card' }, [
      h('p', { class: 'hero-label', text: 'Aage badho' }),
      h('p', { class: 'hero-topic', text: nx.topic.name }),
      h('p', { class: 'hero-sub', text: nx.subject.name }),
      h('button', { class: 'btn btn-primary full', text: 'Padhna shuru karo', onClick: () => { location.hash = `#/topic/${nx.subject.id}/${nx.topic.id}`; } }),
    ]));
  } else {
    root.append(h('section', { class: 'card hero-card' }, [
      h('p', { class: 'hero-topic', text: 'Poora syllabus complete 🎓' }),
      h('button', { class: 'btn btn-primary full', text: 'Revision karo', onClick: () => { location.hash = '#/practice'; } }),
    ]));
  }

  // Slim progress
  root.append(h('section', { class: 'card slim-progress' }, [
    h('div', { class: 'sp-row' }, [
      h('span', { class: 'muted small', text: overall.done + ' / ' + overall.total + ' topics' }),
      h('span', { class: 'streak-mini', html: `🔥 ${st.streak.count}` }),
    ]),
    h('div', { class: 'bar' }, [h('div', { class: 'bar-fill', style: { width: overall.pct + '%' } })]),
  ]));

  // Subjects
  const list = h('section', { class: 'subject-list' });
  for (const s of SUBJECTS) {
    const p = subjectProgress(s.id);
    list.append(h('button', { class: 'row-card', onClick: () => { location.hash = `#/subject/${s.id}`; } }, [
      h('span', { class: 'row-icon', text: s.icon }),
      h('span', { class: 'row-name', text: s.name }),
      h('span', { class: 'row-pct', text: p.pct + '%' }),
    ]));
  }
  root.append(list);

  return root;
}
