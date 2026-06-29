// Topic detail: short intro + "kya seekhna hai" + flashcards/quiz entry + mark done.

import { h, toast, celebrate } from '../ui.js';
import { getSubject, getTopic } from '../data/syllabus.js';
import { getFlashcards } from '../data/flashcards.js';
import { getQuiz } from '../data/quizzes.js';
import { getState } from '../state.js';
import { completeTopic, isTopicComplete, checkBadges } from '../gamify.js';

export function renderTopic(subjectId, topicId) {
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const root = h('div', { class: 'view' });
  if (!subject || !topic) {
    root.append(h('p', { class: 'empty', text: 'Topic nahi mila.' }));
    return root;
  }

  const fc = getFlashcards(topicId);
  const qz = getQuiz(topicId);
  const done = isTopicComplete(subjectId, topicId);
  const best = getState().quizBest[topicId];

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← ' + subject.name, onClick: () => { location.hash = `#/subject/${subjectId}`; } }),
    h('h1', { class: 'page-title', text: topic.name }),
    h('p', { class: 'muted', text: topic.blurb }),
    done ? h('span', { class: 'tag tag-done', text: '✓ Completed' }) : null,
  ]));

  // Kya seekhna hai
  if (topic.learn && topic.learn.length) {
    root.append(h('section', { class: 'card' }, [
      h('p', { class: 'card-label', text: '📌 Kya cover karna hai' }),
      h('ul', { class: 'learn-list' }, topic.learn.map((pt) => h('li', { text: pt }))),
    ]));
  }

  // Activities
  const acts = h('section', { class: 'section' }, [h('p', { class: 'section-title', text: 'Practice & Revise' })]);

  if (fc.length) {
    acts.append(h('button', { class: 'card action-card', onClick: () => { location.hash = `#/flashcards/${subjectId}/${topicId}`; } }, [
      h('span', { class: 'action-icon', text: '🃏' }),
      h('div', {}, [
        h('p', { class: 'action-title', text: 'Flashcards' }),
        h('p', { class: 'muted small', text: fc.length + ' quick revision cards' }),
      ]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
  }

  if (qz.length) {
    acts.append(h('button', { class: 'card action-card', onClick: () => { location.hash = `#/quiz/${subjectId}/${topicId}`; } }, [
      h('span', { class: 'action-icon', text: '❓' }),
      h('div', {}, [
        h('p', { class: 'action-title', text: 'Practice Quiz' }),
        h('p', { class: 'muted small', text: qz.length + ' questions' + (best != null ? '  ·  Best: ' + best + '%' : '') }),
      ]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
  }

  if (!fc.length && !qz.length) {
    acts.append(h('p', { class: 'muted small', text: 'Is topic ke liye practice content jald aa raha hai.' }));
  }
  root.append(acts);

  // Mark done
  if (!done) {
    root.append(h('button', {
      class: 'btn btn-primary full mark-done',
      text: '✓ Topic complete mark karo (+15 XP)',
      onClick: () => {
        const res = completeTopic(subjectId, topicId);
        const newBadges = checkBadges();
        if (res.leveledUp) {
          celebrate({ icon: '⬆️', title: 'Level ' + res.level + '!', message: 'Tumne level up kiya — keep going!' });
        } else {
          toast('+' + res.xp + ' XP · Topic done 🎉', 'good');
        }
        newBadges.forEach((b) => setTimeout(() => celebrate({ icon: b.icon, title: 'Badge unlocked!', message: b.name }), 400));
        location.hash = `#/subject/${subjectId}`;
      },
    }));
  } else {
    root.append(h('p', { class: 'muted small center', text: 'Ye topic complete hai — phir se revise kar sakte ho. 👍' }));
  }

  return root;
}
