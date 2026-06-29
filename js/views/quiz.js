// Quiz engine: topic quiz + Practice + Mock test. Samjhao 💡 + bookmark per question.

import { h, toast, celebrate } from '../ui.js';
import { SUBJECTS, getSubject, getTopic } from '../data/syllabus.js';
import { getQuiz, QUIZZES } from '../data/quizzes.js';
import { getHint } from '../data/hints.js';
import {
  recordQuiz, addXp, checkBadges, subjectProgress,
  isBookmarked, toggleBookmark, addMockResult, bookmarkList,
} from '../gamify.js';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tag questions with their topic + original index (for hints/bookmarks).
function tag(questions, topicId) {
  return questions.map((q, i) => ({ ...q, _topicId: topicId, _idx: i }));
}

// ---------- Core runner (instant feedback + Samjhao + bookmark) ----------
function runQuiz(root, questions, { backHash, onComplete }) {
  let i = 0;
  let correct = 0;
  let answered = false;

  const scoreBar = h('div', { class: 'bar slim' }, [h('div', { class: 'bar-fill', style: { width: '0%' } })]);
  const counter = h('p', { class: 'muted small center' });
  const head = h('div', { class: 'quiz-q-head' });
  const qText = h('h2', { class: 'quiz-q' });
  const hintBox = h('div', { class: 'hint-box' });
  const samjhaoBtn = h('button', { class: 'btn btn-ghost samjhao-btn', text: '💡 Samjhao' });
  const opts = h('div', { class: 'quiz-options' });
  const feedback = h('div', { class: 'quiz-feedback' });
  const nextBtn = h('button', { class: 'btn btn-primary full', text: 'Next →' });

  root.append(scoreBar, counter, head, qText, samjhaoBtn, hintBox, opts, feedback, nextBtn);

  function showResult() {
    const pct = Math.round((correct / questions.length) * 100);
    root.replaceChildren(
      h('div', { class: 'quiz-result' }, [
        h('div', { class: 'result-emoji', text: pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪' }),
        h('h2', { class: 'result-title', text: correct + ' / ' + questions.length + ' sahi' }),
        h('p', { class: 'result-pct', text: pct + '%' }),
        h('p', { class: 'muted', text: pct >= 80 ? 'Zabardast! Concept clear hai.' : pct >= 50 ? 'Achha! Thodi aur practice.' : 'Koi baat nahi — Padho/flashcards revise karke phir try karo.' }),
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

    // bookmark toggle
    head.replaceChildren();
    const bm = h('button', { class: 'bm-btn', title: 'Save question' });
    function paintBm() { bm.textContent = isBookmarked(q._topicId, q._idx) ? '🔖 Saved' : '🔖 Save'; bm.classList.toggle('on', isBookmarked(q._topicId, q._idx)); }
    bm.addEventListener('click', () => { toggleBookmark(q._topicId, q._idx); paintBm(); });
    paintBm();
    head.append(bm);

    // Samjhao
    hintBox.className = 'hint-box';
    hintBox.replaceChildren();
    samjhaoBtn.style.display = '';
    samjhaoBtn.onclick = () => {
      const hint = getHint(q._topicId, q._idx);
      hintBox.className = 'hint-box show';
      hintBox.replaceChildren(
        h('p', { class: 'hint-title', text: '💡 Samjho' }),
        h('p', { text: hint || 'Is topic ka "Padho" section dobara dekho — concept wahan simple bhasha me hai.' }),
      );
      samjhaoBtn.style.display = 'none';
    };

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
  const questions = tag(getQuiz(topicId), topicId);
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

// ---------- Practice ----------
export function renderPractice(scope) {
  const root = h('div', { class: 'view' });

  if (!scope) {
    root.append(h('header', { class: 'page-head' }, [
      h('h1', { class: 'page-title', text: 'Practice' }),
    ]));
    root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = '#/mock'; } }, [
      h('span', { class: 'action-icon', text: '⏱️' }),
      h('div', {}, [h('p', { class: 'action-title', text: 'Mock Test (timed)' }), h('p', { class: 'muted small', text: '20 sawaal, timer ke saath — real exam feel' })]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
    root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = '#/saved'; } }, [
      h('span', { class: 'action-icon', text: '🔖' }),
      h('div', {}, [h('p', { class: 'action-title', text: 'Saved questions' }), h('p', { class: 'muted small', text: 'Jo questions aapne bookmark kiye' })]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
    root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = '#/practice/all'; } }, [
      h('span', { class: 'action-icon', text: '🎲' }),
      h('div', {}, [h('p', { class: 'action-title', text: 'Mixed Quiz' }), h('p', { class: 'muted small', text: 'Saare subjects se 10 random sawaal' })]),
      h('span', { class: 'action-arrow', text: '→' }),
    ]));
    for (const s of SUBJECTS) {
      const p = subjectProgress(s.id);
      root.append(h('button', { class: 'card practice-pick', onClick: () => { location.hash = `#/practice/${s.id}`; } }, [
        h('span', { class: 'action-icon', text: s.icon }),
        h('div', {}, [h('p', { class: 'action-title', text: s.name }), h('p', { class: 'muted small', text: '10 random questions · ' + p.pct + '% learned' })]),
        h('span', { class: 'action-arrow', text: '→' }),
      ]));
    }
    return root;
  }

  let pool = [];
  let title = 'Mixed Practice';
  if (scope === 'all') {
    for (const tid of Object.keys(QUIZZES)) pool = pool.concat(tag(QUIZZES[tid], tid));
  } else {
    const subject = getSubject(scope);
    title = (subject ? subject.name : '') + ' Practice';
    if (subject) for (const t of subject.topics) pool = pool.concat(tag(getQuiz(t.id), t.id));
  }

  if (!pool.length) { root.append(h('p', { class: 'empty', text: 'Practice questions nahi mile.' })); return root; }

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

// ---------- Saved (bookmarked) questions ----------
export function renderSaved() {
  const root = h('div', { class: 'view' });
  root.append(h('header', { class: 'page-head' }, [
    h('button', { class: 'back-link', text: '← Practice', onClick: () => { location.hash = '#/practice'; } }),
    h('h1', { class: 'page-title', text: '🔖 Saved Questions' }),
  ]));

  const questions = bookmarkList()
    .map(({ topicId, index }) => {
      const q = QUIZZES[topicId] && QUIZZES[topicId][index];
      return q ? { ...q, _topicId: topicId, _idx: index } : null;
    })
    .filter(Boolean);

  if (!questions.length) {
    root.append(h('p', { class: 'empty', text: 'Abhi koi saved question nahi. Quiz me 🔖 Save dabao, yahan revision ke liye aa jayega.' }));
    return root;
  }

  const arena = h('div', { class: 'quiz-arena' });
  root.append(arena);
  runQuiz(arena, questions, { backHash: '#/practice', onComplete: () => { toast('Saved revision done 👍', 'good'); } });
  return root;
}

// ---------- Mock test (timed, exam-like) ----------
export function renderMock() {
  const root = h('div', { class: 'view view-mock' });
  // build pool
  let pool = [];
  for (const tid of Object.keys(QUIZZES)) pool = pool.concat(tag(QUIZZES[tid], tid));
  const questions = shuffle(pool).slice(0, Math.min(20, pool.length));
  const total = questions.length;
  const answers = new Array(total).fill(null);
  let i = 0;
  let timeLeft = 10 * 60; // 10 minutes
  let timer = null;

  root.append(h('header', { class: 'page-head mock-head' }, [
    h('button', { class: 'back-link', text: '← Practice', onClick: () => finish(true) }),
    h('div', { class: 'mock-top' }, [
      h('h1', { class: 'page-title', text: '⏱️ Mock Test' }),
      h('span', { class: 'mock-timer', id: 'mockTimer', text: '10:00' }),
    ]),
  ]));

  const arena = h('div', { class: 'quiz-arena' });
  root.append(arena);

  const counter = h('p', { class: 'muted small center' });
  const qText = h('h2', { class: 'quiz-q' });
  const opts = h('div', { class: 'quiz-options' });
  const nav = h('div', { class: 'mock-nav' });
  arena.append(counter, qText, opts, nav);

  function fmt(s) { const m = Math.floor(s / 60); const ss = String(s % 60).padStart(2, '0'); return m + ':' + ss; }

  function tick() {
    timeLeft -= 1;
    const el = document.getElementById('mockTimer');
    if (el) { el.textContent = fmt(timeLeft); el.classList.toggle('low', timeLeft <= 60); }
    if (timeLeft <= 0) finish(false);
  }

  function render() {
    const q = questions[i];
    counter.textContent = 'Q ' + (i + 1) + ' / ' + total + '  ·  Answered: ' + answers.filter((a) => a != null).length;
    qText.textContent = q.q;
    opts.replaceChildren();
    q.options.forEach((opt, oi) => {
      const b = h('button', { class: 'quiz-opt' + (answers[i] === oi ? ' chosen' : ''), text: opt });
      b.addEventListener('click', () => { answers[i] = oi; render(); });
      opts.append(b);
    });
    nav.replaceChildren(
      h('button', { class: 'btn btn-ghost', text: '← Prev', onClick: () => { if (i > 0) { i--; render(); } } }),
      i === total - 1
        ? h('button', { class: 'btn btn-primary', text: 'Submit ✓', onClick: () => finish(false) })
        : h('button', { class: 'btn btn-primary', text: 'Next →', onClick: () => { i++; render(); } }),
    );
  }

  let finished = false;
  function finish(silent) {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    window.removeEventListener('hashchange', onLeave);
    if (silent) return; // user left via back; no result
    let correct = 0;
    questions.forEach((q, idx) => { if (answers[idx] === q.answer) correct += 1; });
    const pct = Math.round((correct / total) * 100);
    addMockResult(correct, total);
    checkBadges();
    root.replaceChildren(
      h('header', { class: 'page-head' }, [h('h1', { class: 'page-title', text: '⏱️ Mock Result' })]),
      h('div', { class: 'quiz-result' }, [
        h('div', { class: 'result-emoji', text: pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪' }),
        h('h2', { class: 'result-title', text: correct + ' / ' + total + ' sahi' }),
        h('p', { class: 'result-pct', text: pct + '%' }),
        h('p', { class: 'muted', text: 'Mock results Stats me bhi save ho gaye. Regular mock dene se exam ki aadat banegi!' }),
        h('div', { class: 'result-actions' }, [
          h('button', { class: 'btn btn-secondary', text: '↻ Naya mock', onClick: () => { location.hash = '#/mock'; location.reload(); } }),
          h('button', { class: 'btn btn-primary', text: 'Done', onClick: () => { location.hash = '#/practice'; } }),
        ]),
      ]),
    );
  }

  function onLeave() { finish(true); }
  window.addEventListener('hashchange', onLeave);

  timer = setInterval(tick, 1000);
  render();
  return root;
}
