// Quiz engine: topic quiz + Practice (subject / mixed). One question at a time, instant feedback.

import { h, toast, celebrate } from '../ui.js';
import { SUBJECTS, getSubject, getTopic } from '../data/syllabus.js';
import { getQuiz, QUIZZES } from '../data/quizzes.js';
import { recordQuiz, addXp, checkBadges, subjectProgress } from '../gamify.js';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Core runner: builds quiz UI into `root`. onComplete(correct, total) called at end.
function runQuiz(root, questions, { backHash, onComplete }) {
  let i = 0;
  let correct = 0;
  let answered = false;

  const counter = h('p', { class: 'muted small center' });
  const qText = h('h2', { class: 'quiz-q' });
  const opts = h('div', { class: 'quiz-options' });
  const feedback = h('div', { class: 'quiz-feedback' });
  const nextBtn = h('button', { class: 'btn btn-primary full', text: 'Next →' });
  const scoreBar = h('div', { class: 'bar slim' }, [h('div', { class: 'bar-fill', style: { width: '0%' } })]);

  root.append(scoreBar, counter, qText, opts, feedback, nextBtn);

  function showResult() {
    const pct = Math.round((correct / questions.length) * 100);
    root.replaceChildren(
      h('div', { class: 'quiz-result' }, [
        h('div', { class: 'result-emoji', text: pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪' }),
        h('h2', { class: 'result-title', text: correct + ' / ' + questions.length + ' sahi' }),
        h('p', { class: 'result-pct', text: pct + '%' }),
        h('p', { class: 'muted', text: pct >= 80 ? 'Zabardast! Concept clear hai.' : pct >= 50 ? 'Achha! Thodi aur practice.' : 'Koi baat nahi — flashcards revise karke phir try karo.' }),
        h('div', { class: 'result-actions' }, [
          h('button', { class: 'btn btn-secondary', text: '↻ Retry', onClick: () => { location.reload(); } }),
          h('button', { class: 'btn btn-primary', text: 'Done', onClick: () => { location.hash = backHash; } }),
        ]),
      ]),
    );
    if (onComplete) onComplete(correct, questions.length);
  }

  function render() {
    answered = false;
    const q = questions[i];
    counter.textContent = 'Question ' + (i + 1) + ' / ' + questions.length + '  ·  Score: ' + correct;
    scoreBar.firstChild.style.width = Math.round((i / questions.length) * 100) + '%';
    qText.textContent = q.q;
    feedback.className = 'quiz-feedback';
    feedback.replaceChildren();
    nextBtn.style.display = 'none';
    opts.replaceChildren();

    q.options.forEach((opt, oi) => {
      const b = h('button', { class: 'quiz-opt', text: opt });
      b.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isRight = oi === q.answer;
        if (isRight) correct += 1;
        // mark all
        Array.from(opts.children).forEach((child, ci) => {
          child.classList.add('locked');
          if (ci === q.answer) child.classList.add('correct');
          else if (ci === oi) child.classList.add('wrong');
        });
        feedback.className = 'quiz-feedback show ' + (isRight ? 'right' : 'wrong');
        feedback.replaceChildren(
          h('p', { class: 'fb-head', text: isRight ? '✓ Sahi!' : '✗ Galat' }),
          q.explain ? h('p', { class: 'fb-exp', text: q.explain }) : null,
        );
        nextBtn.style.display = '';
        nextBtn.textContent = i === questions.length - 1 ? 'Result dekho →' : 'Next →';
      });
      opts.append(b);
    });
  }

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    if (i < questions.length - 1) { i += 1; render(); }
    else showResult();
  });

  render();
}

// ---------- Topic quiz ----------
export function renderQuiz(subjectId, topicId) {
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const questions = getQuiz(topicId);
  const root = h('div', { class: 'view view-quiz' });

  if (!topic || !questions.length) {
    root.append(h('p', { class: 'empty', text: 'Is topic ka quiz abhi nahi hai.' }));
    return root;
  }

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← ' + topic.name, onClick: () => { location.hash = `#/topic/${subjectId}/${topicId}`; } }),
    h('h1', { class: 'page-title', text: '❓ ' + topic.name + ' Quiz' }),
  ]));

  const arena = h('div', { class: 'quiz-arena' });
  root.append(arena);

  runQuiz(arena, questions, {
    backHash: `#/topic/${subjectId}/${topicId}`,
    onComplete: (correct, total) => {
      const res = recordQuiz(topicId, correct, total);
      const badges = checkBadges();
      if (res.leveledUp) celebrate({ icon: '⬆️', title: 'Level ' + res.level + '!', message: 'Quiz ne tumhe upar pohncha diya!' });
      else if (res.xp) toast('+' + res.xp + ' XP earned ✨', 'good');
      badges.forEach((b) => setTimeout(() => celebrate({ icon: b.icon, title: 'Badge unlocked!', message: b.name }), 500));
    },
  });
  return root;
}

// ---------- Practice (subject picker + mixed) ----------
export function renderPractice(scope) {
  const root = h('div', { class: 'view' });

  if (!scope) {
    root.append(h('header', { class: 'page-head' }, [
      h('h1', { class: 'page-title', text: 'Practice' }),
      h('p', { class: 'muted', text: 'Random questions se apni speed test karo.' }),
    ]));
    root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = '#/practice/all'; } }, [
      h('span', { class: 'action-icon', text: '🎲' }),
      h('div', {}, [
        h('p', { class: 'action-title', text: 'Mixed Quiz' }),
        h('p', { class: 'muted small', text: 'Saare subjects se 10 random sawaal' }),
      ]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
    for (const s of SUBJECTS) {
      const p = subjectProgress(s.id);
      root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = `#/practice/${s.id}`; } }, [
        h('span', { class: 'action-icon', text: s.icon }),
        h('div', {}, [
          h('p', { class: 'action-title', text: s.name }),
          h('p', { class: 'muted small', text: '10 random questions · ' + p.pct + '% learned' }),
        ]),
        h('span', { class: 'action-arrow', text: '→' }),
      ]));
    }
    return root;
  }

  // Build a pool of questions for the scope.
  let pool = [];
  let title = 'Mixed Practice';
  if (scope === 'all') {
    for (const tid of Object.keys(QUIZZES)) pool = pool.concat(QUIZZES[tid]);
  } else {
    const subject = getSubject(scope);
    title = (subject ? subject.name : '') + ' Practice';
    if (subject) {
      for (const t of subject.topics) pool = pool.concat(getQuiz(t.id));
    }
  }

  if (!pool.length) {
    root.append(h('p', { class: 'empty', text: 'Practice questions nahi mile.' }));
    return root;
  }

  const questions = shuffle(pool).slice(0, Math.min(10, pool.length));

  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← Practice', onClick: () => { location.hash = '#/practice'; } }),
    h('h1', { class: 'page-title', text: '🎯 ' + title }),
  ]));
  const arena = h('div', { class: 'quiz-arena' });
  root.append(arena);

  runQuiz(arena, questions, {
    backHash: '#/practice',
    onComplete: (correct) => {
      const res = addXp(correct * 5);
      const badges = checkBadges();
      if (res.leveledUp) celebrate({ icon: '⬆️', title: 'Level ' + res.level + '!', message: 'Practice se level up!' });
      else if (correct) toast('+' + correct * 5 + ' XP earned ✨', 'good');
      badges.forEach((b) => setTimeout(() => celebrate({ icon: b.icon, title: 'Badge unlocked!', message: b.name }), 500));
    },
  });
  return root;
}
