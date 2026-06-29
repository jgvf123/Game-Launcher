// Lesson view — "Padho". Topic ka concept simple Hinglish me, fir aage quiz/flashcards.

import { h, toast } from '../ui.js';
import { getSubject, getTopic } from '../data/syllabus.js';
import { getLesson } from '../data/lessons.js';
import { getQuiz } from '../data/quizzes.js';
import { getFlashcards } from '../data/flashcards.js';
import { recordLesson } from '../gamify.js';

function renderBlock(b) {
  const wrap = h('div', { class: 'lesson-block' });
  if (b.h) wrap.append(h('p', { class: 'lesson-h', text: b.h }));
  if (b.p) wrap.append(h('p', { class: 'lesson-p', text: b.p }));
  if (b.list) wrap.append(h('ul', { class: 'lesson-list' }, b.list.map((x) => h('li', { text: x }))));
  if (b.eg) wrap.append(h('div', { class: 'lesson-eg' }, [h('span', { class: 'eg-tag', text: 'Example' }), h('span', { text: b.eg })]));
  if (b.tip) wrap.append(h('div', { class: 'lesson-tip' }, [h('span', { class: 'tip-tag', text: '💡 Tip' }), h('span', { text: b.tip })]));
  return wrap;
}

export function renderLesson(subjectId, topicId) {
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const lesson = getLesson(topicId);
  const root = h('div', { class: 'view view-lesson' });

  if (!topic) {
    root.append(h('p', { class: 'empty', text: 'Topic nahi mila.' }));
    return root;
  }

  // Studying => XP (ek baar).
  const res = recordLesson(topicId);
  if (res && res.xp) toast('+' + res.xp + ' XP · Padhne ke liye 👏', 'good');

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← ' + topic.name, onClick: () => { location.hash = `#/topic/${subjectId}/${topicId}`; } }),
    h('h1', { class: 'page-title', text: '📖 ' + topic.name }),
    h('p', { class: 'muted', text: 'Pehle samjho, fir practice karo.' }),
  ]));

  if (lesson.length) {
    const card = h('section', { class: 'card lesson-card' });
    lesson.forEach((b) => card.append(renderBlock(b)));
    root.append(card);
  } else {
    root.append(h('section', { class: 'card' }, [
      h('p', { class: 'lesson-p', text: topic.blurb }),
      topic.learn ? h('ul', { class: 'lesson-list' }, topic.learn.map((x) => h('li', { text: x }))) : null,
    ]));
  }

  // Next steps
  const next = h('section', { class: 'section' }, [h('p', { class: 'section-title', text: 'Ab aage badho' })]);
  if (getFlashcards(topicId).length) {
    next.append(h('button', { class: 'btn btn-secondary full', text: '🃏 Flashcards se yaad karo', onClick: () => { location.hash = `#/flashcards/${subjectId}/${topicId}`; } }));
  }
  if (getQuiz(topicId).length) {
    next.append(h('button', { class: 'btn btn-primary full', text: '❓ Ab quiz do', onClick: () => { location.hash = `#/quiz/${subjectId}/${topicId}`; } }));
  }
  root.append(next);

  return root;
}
