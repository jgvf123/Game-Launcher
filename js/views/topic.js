// Topic detail: clear 3-step flow (Padho → Yaad karo → Test do) + notes + mark done.

import { h, toast, celebrate } from '../ui.js';
import { getSubject, getTopic } from '../data/syllabus.js';
import { getLesson } from '../data/lessons.js';
import { getFlashcards } from '../data/flashcards.js';
import { getQuiz } from '../data/quizzes.js';
import { getState } from '../state.js';
import {
  completeTopic, isTopicComplete, isStudied, checkBadges, getNote, setNote,
} from '../gamify.js';

function stepCard({ num, icon, title, sub, done, onClick }) {
  return h('button', { class: 'card step-card' + (done ? ' step-done' : ''), onClick }, [
    h('span', { class: 'step-num', text: done ? '✓' : String(num) }),
    h('span', { class: 'step-icon', text: icon }),
    h('div', { class: 'step-body' }, [
      h('p', { class: 'step-title', text: title }),
      h('p', { class: 'muted small', text: sub }),
    ]),
    h('span', { class: 'action-arrow', text: '→' }),
  ]);
}

export function renderTopic(subjectId, topicId) {
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const root = h('div', { class: 'view' });
  if (!subject || !topic) {
    root.append(h('p', { class: 'empty', text: 'Topic nahi mila.' }));
    return root;
  }

  const st = getState();
  const fc = getFlashcards(topicId);
  const qz = getQuiz(topicId);
  const hasLesson = getLesson(topicId).length > 0 || (topic.learn && topic.learn.length);
  const done = isTopicComplete(subjectId, topicId);
  const best = st.quizBest[topicId];

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← ' + subject.name, onClick: () => { location.hash = `#/subject/${subjectId}`; } }),
    h('h1', { class: 'page-title', text: topic.name }),
    done ? h('span', { class: 'tag tag-done', text: '✓ Complete' }) : null,
  ]));

  // 3 steps
  const steps = h('section', { class: 'section' });
  let n = 1;
  if (hasLesson) {
    steps.append(stepCard({
      num: n++, icon: '📖', title: 'Padho (samjho)', sub: 'Concept simple bhasha me',
      done: isStudied(topicId),
      onClick: () => { location.hash = `#/lesson/${subjectId}/${topicId}`; },
    }));
  }
  if (fc.length) {
    steps.append(stepCard({
      num: n++, icon: '🃏', title: 'Yaad karo', sub: fc.length + ' flashcards',
      done: !!st.flashcardsDone[topicId],
      onClick: () => { location.hash = `#/flashcards/${subjectId}/${topicId}`; },
    }));
  }
  if (qz.length) {
    steps.append(stepCard({
      num: n++, icon: '❓', title: 'Test do', sub: qz.length + ' questions' + (best != null ? '  ·  Best ' + best + '%' : ''),
      done: best != null && best >= 60,
      onClick: () => { location.hash = `#/quiz/${subjectId}/${topicId}`; },
    }));
  }
  if (!hasLesson && !fc.length && !qz.length) {
    steps.append(h('p', { class: 'muted small', text: 'Is topic ka content jald aa raha hai.' }));
  }
  root.append(steps);

  // Notes
  const noteArea = h('textarea', {
    class: 'note-area', placeholder: 'Yahan apne chhote notes likho… (auto-save)', rows: '3',
  });
  noteArea.value = getNote(topicId);
  let noteTimer = null;
  noteArea.addEventListener('input', () => {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => { setNote(topicId, noteArea.value); }, 500);
  });
  const notes = document.createElement('details');
  notes.className = 'notes-details';
  if (getNote(topicId)) notes.open = true;
  const summary = document.createElement('summary');
  summary.className = 'notes-summary';
  summary.textContent = '📝 Notes';
  notes.append(summary, noteArea);
  root.append(h('section', { class: 'section' }, [notes]));

  // Mark done
  if (!done) {
    root.append(h('button', {
      class: 'btn btn-primary full mark-done',
      text: '✓ Topic complete mark karo (+15 XP)',
      onClick: () => {
        const res = completeTopic(subjectId, topicId);
        const newBadges = checkBadges();
        if (res.leveledUp) celebrate({ icon: '⬆️', title: 'Level ' + res.level + '!', message: 'Tumne level up kiya — keep going!' });
        else toast('+' + res.xp + ' XP · Topic done 🎉', 'good');
        newBadges.forEach((b) => setTimeout(() => celebrate({ icon: b.icon, title: 'Badge unlocked!', message: b.name }), 400));
        location.hash = `#/subject/${subjectId}`;
      },
    }));
  } else {
    root.append(h('p', { class: 'muted small center', text: 'Ye topic complete hai — jab chaho revise kar sakte ho. 👍' }));
  }

  return root;
}
