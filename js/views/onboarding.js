// Onboarding — minimal: sirf naam + target. (Avatar hata diya.)

import { h, toast } from '../ui.js';
import { setProfile } from '../gamify.js';
import { rerender } from '../app.js';

const TARGETS = ['SSC CGL 2026', 'SSC CGL 2027', 'Abhi decide nahi'];

export function renderOnboarding() {
  const root = h('div', { class: 'view view-onboard' });
  let chosenTarget = TARGETS[0];

  root.append(h('div', { class: 'onboard-hero' }, [
    h('h1', { class: 'onboard-title', text: 'Aapka naam?' }),
    h('p', { class: 'muted onboard-sub', text: 'Taaki app aapko naam se yaad rakhe.' }),
  ]));

  const nameInput = h('input', {
    class: 'text-input', type: 'text', placeholder: 'Naam likho…', maxlength: '20', autocomplete: 'off',
  });
  root.append(h('section', { class: 'card' }, [nameInput]));

  const targetRow = h('div', { class: 'chip-row' });
  function paint() { Array.from(targetRow.children).forEach((b) => b.classList.toggle('active', b.dataset.t === chosenTarget)); }
  TARGETS.forEach((t) => targetRow.append(h('button', { class: 'select-chip', dataset: { t }, text: t, onClick: () => { chosenTarget = t; paint(); } })));
  root.append(h('section', { class: 'card' }, [
    h('label', { class: 'field-label', text: 'Target' }),
    targetRow,
  ]));
  paint();

  root.append(h('button', {
    class: 'btn btn-primary full onboard-go', text: 'Shuru karein',
    onClick: () => {
      const name = nameInput.value.trim();
      if (!name) { toast('Pehle naam likho'); nameInput.focus(); return; }
      setProfile({ name, target: chosenTarget, onboarded: true });
      location.hash = '#/home';
      rerender();
    },
  }));

  root.append(h('p', { class: 'muted xsmall center footer-note', text: 'Sab kuch sirf aapke phone me — private.' }));
  return root;
}
