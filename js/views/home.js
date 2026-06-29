// Home dashboard: greeting, daily-goal ring, streak, level, overall progress, "aaj kya karein".

import { h, progressRing } from '../ui.js';
import { getState } from '../state.js';
import { SUBJECTS } from '../data/syllabus.js';
import {
  levelInfo, overallProgress, subjectProgress, ensureDaily, isTopicComplete,
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
  const st = getState();
  const lvl = levelInfo(st.xp);
  const overall = overallProgress();
  const dailyPct = st.daily.goal ? Math.round((st.daily.xpEarned / st.daily.goal) * 100) : 0;
  const goalDone = st.daily.xpEarned >= st.daily.goal;

  const root = h('div', { class: 'view view-home' });

  // Header
  root.append(
    h('header', { class: 'home-head' }, [
      h('div', {}, [
        h('p', { class: 'eyebrow', text: greeting() + ' 👋' }),
        h('h1', { class: 'home-title', text: 'CGL Quest' }),
        h('p', { class: 'muted', text: 'Roz thoda — fun way me poora syllabus.' }),
      ]),
    ]),
  );

  // Daily goal + streak card
  const dailyCard = h('section', { class: 'card daily-card' }, [
    progressRing(dailyPct, 104, 10, h('div', { class: 'ring-center' }, [
      h('strong', { text: st.daily.xpEarned }),
      h('span', { class: 'ring-sub', text: '/ ' + st.daily.goal + ' XP' }),
    ])),
    h('div', { class: 'daily-meta' }, [
      h('p', { class: 'card-label', text: 'Aaj ka goal' }),
      h('p', {
        class: 'daily-status',
        text: goalDone ? '🎉 Goal poora! Shabaash.' : 'Bas ' + Math.max(0, st.daily.goal - st.daily.xpEarned) + ' XP aur.',
      }),
      h('div', { class: 'streak-pill', html: `🔥 <strong>${st.streak.count}</strong> day streak` }),
    ]),
  ]);
  root.append(dailyCard);

  // Level + overall progress
  root.append(
    h('section', { class: 'card level-card' }, [
      h('div', { class: 'level-row' }, [
        h('div', { class: 'level-badge', text: 'Lv ' + lvl.level }),
        h('div', { class: 'level-info' }, [
          h('p', { class: 'level-title', text: lvl.title }),
          h('p', { class: 'muted small', text: lvl.intoLevel + ' / ' + lvl.need + ' XP to next level' }),
        ]),
      ]),
      h('div', { class: 'bar' }, [h('div', { class: 'bar-fill', style: { width: lvl.pct + '%' } })]),
      h('div', { class: 'overall-row' }, [
        h('span', { class: 'muted small', text: 'Syllabus progress' }),
        h('span', { class: 'muted small', text: overall.done + ' / ' + overall.total + ' topics' }),
      ]),
      h('div', { class: 'bar' }, [h('div', { class: 'bar-fill alt', style: { width: overall.pct + '%' } })]),
    ]),
  );

  // Aaj kya karein
  const nx = nextTopic();
  if (nx) {
    root.append(
      h('section', { class: 'card cta-card' }, [
        h('p', { class: 'card-label', text: 'Aaj kya karein?' }),
        h('p', { class: 'cta-topic', text: nx.subject.icon + '  ' + nx.topic.name }),
        h('p', { class: 'muted small', text: nx.topic.blurb }),
        h('button', {
          class: 'btn btn-primary full',
          text: 'Shuru karo →',
          onClick: () => { location.hash = `#/topic/${nx.subject.id}/${nx.topic.id}`; },
        }),
      ]),
    );
  } else {
    root.append(
      h('section', { class: 'card cta-card' }, [
        h('p', { class: 'cta-topic', text: '🎓 Poora syllabus complete!' }),
        h('p', { class: 'muted small', text: 'Kamaal! Ab practice se revision karte raho.' }),
        h('button', { class: 'btn btn-primary full', text: 'Practice karo', onClick: () => { location.hash = '#/practice'; } }),
      ]),
    );
  }

  // Subject quick chips
  const chips = h('div', { class: 'subject-chips' });
  for (const s of SUBJECTS) {
    const p = subjectProgress(s.id);
    chips.append(
      h('button', {
        class: 'chip',
        onClick: () => { location.hash = `#/subject/${s.id}`; },
      }, [
        h('span', { class: 'chip-icon', text: s.icon }),
        h('span', { class: 'chip-name', text: s.name }),
        h('span', { class: 'chip-pct', text: p.pct + '%' }),
      ]),
    );
  }
  root.append(h('section', { class: 'section' }, [
    h('p', { class: 'section-title', text: 'Subjects' }),
    chips,
  ]));

  return root;
}
