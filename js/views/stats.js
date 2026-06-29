// Stats: level, streak, XP, per-subject progress, badges, settings (theme + reset).

import { h, toast, modal } from '../ui.js';
import { getState, resetState } from '../state.js';
import { SUBJECTS } from '../data/syllabus.js';
import { levelInfo, overallProgress, subjectProgress, earnedBadges } from '../gamify.js';
import { setTheme } from '../app.js';

export function renderStats() {
  const st = getState();
  const lvl = levelInfo(st.xp);
  const overall = overallProgress();
  const root = h('div', { class: 'view' });

  root.append(h('header', { class: 'page-head' }, [
    h('h1', { class: 'page-title', text: 'Stats' }),
    h('p', { class: 'muted', text: 'Apni progress aur achievements yahan dekho.' }),
  ]));

  // Top numbers
  root.append(h('section', { class: 'card stat-grid' }, [
    statBox('Level', lvl.level, lvl.title),
    statBox('Total XP', st.xp, 'kamaaye'),
    statBox('Streak', st.streak.count + '🔥', 'din'),
    statBox('Topics', overall.done + '/' + overall.total, overall.pct + '% done'),
  ]));

  // Per-subject
  const subSec = h('section', { class: 'section' }, [h('p', { class: 'section-title', text: 'Subject-wise progress' })]);
  for (const s of SUBJECTS) {
    const p = subjectProgress(s.id);
    subSec.append(h('div', { class: 'card sub-progress' }, [
      h('div', { class: 'sub-progress-head' }, [
        h('span', { text: s.icon + ' ' + s.name }),
        h('span', { class: 'muted small', text: p.done + '/' + p.total + ' · ' + p.pct + '%' }),
      ]),
      h('div', { class: 'bar' }, [h('div', { class: 'bar-fill', style: { width: p.pct + '%' } })]),
    ]));
  }
  root.append(subSec);

  // Badges
  const badges = earnedBadges();
  const grid = h('div', { class: 'badge-grid' });
  for (const b of badges) {
    grid.append(h('div', { class: 'badge ' + (b.earned ? 'earned' : 'locked') }, [
      h('div', { class: 'badge-icon', text: b.earned ? b.icon : '🔒' }),
      h('div', { class: 'badge-name', text: b.name }),
      h('div', { class: 'badge-desc', text: b.desc }),
    ]));
  }
  root.append(h('section', { class: 'section' }, [
    h('p', { class: 'section-title', text: 'Badges (' + badges.filter((b) => b.earned).length + '/' + badges.length + ')' }),
    grid,
  ]));

  // Settings
  const themes = [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']];
  const themeRow = h('div', { class: 'theme-row' });
  themes.forEach(([val, label]) => {
    themeRow.append(h('button', {
      class: 'theme-btn' + (st.settings.theme === val ? ' active' : ''),
      dataset: { theme: val },
      text: label,
      onClick: () => {
        setTheme(val);
        Array.from(themeRow.children).forEach((b) => b.classList.toggle('active', b.dataset.theme === val));
      },
    }));
  });

  root.append(h('section', { class: 'section' }, [
    h('p', { class: 'section-title', text: 'Settings' }),
    h('div', { class: 'card' }, [
      h('p', { class: 'card-label', text: 'Theme' }),
      themeRow,
    ]),
    h('button', {
      class: 'btn btn-ghost full danger',
      text: 'Reset all progress',
      onClick: () => {
        modal({
          title: 'Pakka reset karein?',
          body: 'Saari progress, XP aur streak delete ho jayegi. Ye wapas nahi aayega.',
          actions: [
            { label: 'Cancel' },
            { label: 'Reset', primary: true, onClick: () => { resetState(); toast('Progress reset ho gayi.'); location.hash = '#/home'; } },
          ],
        });
      },
    }),
  ]));

  root.append(h('p', { class: 'muted xsmall center footer-note', text: 'CGL Quest · SSC CGL Tier 1 · Offline ready' }));

  return root;
}

function statBox(label, value, sub) {
  return h('div', { class: 'stat-box' }, [
    h('div', { class: 'stat-value', text: value }),
    h('div', { class: 'stat-label', text: label }),
    sub ? h('div', { class: 'stat-sub muted xsmall', text: sub }) : null,
  ]);
}
