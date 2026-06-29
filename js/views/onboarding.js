// Welcome / onboarding — pehli baar app khulne par naam + avatar leta hai.

import { h, toast } from '../ui.js';
import { setProfile } from '../gamify.js';
import { rerender } from '../app.js';

const AVATARS = ['🎓', '📚', '✏️', '🚀', '🌟', '🔥', '🦉', '🐯', '💪', '🧠', '👑', '🎯'];
const TARGETS = ['SSC CGL 2026', 'SSC CGL 2027', 'Abhi decide nahi'];

export function renderOnboarding() {
  const root = h('div', { class: 'view view-onboard' });
  let chosenAvatar = AVATARS[0];
  let chosenTarget = TARGETS[0];

  root.append(
    h('div', { class: 'onboard-hero' }, [
      h('div', { class: 'onboard-logo', text: '🎯' }),
      h('h1', { class: 'onboard-title', text: 'CGL Quest me aapka swagat hai!' }),
      h('p', { class: 'muted onboard-sub', text: 'Chaliye shuru karte hain — pehle thoda apne baare me batao.' }),
    ]),
  );

  // Name
  const nameInput = h('input', {
    class: 'text-input',
    type: 'text',
    placeholder: 'Apna naam likho…',
    maxlength: '20',
    autocomplete: 'off',
  });
  root.append(h('section', { class: 'card' }, [
    h('label', { class: 'field-label', text: '👤 Aapka naam' }),
    nameInput,
  ]));

  // Avatar
  const avatarGrid = h('div', { class: 'avatar-grid' });
  function paintAvatars() {
    Array.from(avatarGrid.children).forEach((b) => b.classList.toggle('active', b.dataset.av === chosenAvatar));
  }
  AVATARS.forEach((a) => {
    avatarGrid.append(h('button', {
      class: 'avatar-btn', dataset: { av: a }, text: a,
      onClick: () => { chosenAvatar = a; paintAvatars(); },
    }));
  });
  root.append(h('section', { class: 'card' }, [
    h('label', { class: 'field-label', text: '🙂 Ek avatar chuno' }),
    avatarGrid,
  ]));
  paintAvatars();

  // Target
  const targetRow = h('div', { class: 'chip-row' });
  function paintTargets() {
    Array.from(targetRow.children).forEach((b) => b.classList.toggle('active', b.dataset.t === chosenTarget));
  }
  TARGETS.forEach((t) => {
    targetRow.append(h('button', {
      class: 'select-chip', dataset: { t }, text: t,
      onClick: () => { chosenTarget = t; paintTargets(); },
    }));
  });
  root.append(h('section', { class: 'card' }, [
    h('label', { class: 'field-label', text: '🎯 Aapka target' }),
    targetRow,
  ]));
  paintTargets();

  // Submit
  root.append(h('button', {
    class: 'btn btn-primary full onboard-go',
    text: 'Chalo shuru karein →',
    onClick: () => {
      const name = nameInput.value.trim();
      if (!name) {
        toast('Pehle apna naam likho 🙂');
        nameInput.focus();
        return;
      }
      setProfile({ name, avatar: chosenAvatar, target: chosenTarget, onboarded: true });
      toast('Welcome, ' + name + '! 🎉', 'good');
      location.hash = '#/home';
      rerender();
    },
  }));

  root.append(h('p', { class: 'muted xsmall center footer-note', text: '🔒 Sab kuch sirf aapke phone me save hoga — koi account/server nahi.' }));

  return root;
}
