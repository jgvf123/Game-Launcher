// Tiny UI helpers: element builder, toast, celebration overlay, progress ring.
// No framework — bas chhote, reliable helpers taaki UI clean aur crash-free rahe.

export function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === 'style' && typeof v === 'object') {
      Object.assign(node.style, v);
    } else if (k === 'dataset' && typeof v === 'object') {
      Object.assign(node.dataset, v);
    } else {
      node.setAttribute(k, v);
    }
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

export function clear(node) {
  if (node) node.replaceChildren();
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// SVG progress ring. Returns an element.
export function progressRing(pct, size = 96, stroke = 9, label = null) {
  const p = Math.max(0, Math.min(100, pct || 0));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - p / 100);
  const wrap = h('div', { class: 'ring', style: { width: size + 'px', height: size + 'px' } });
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.innerHTML = `
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none"
      stroke="var(--ring-track)" stroke-width="${stroke}"></circle>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none"
      stroke="var(--ring-fill)" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
      transform="rotate(-90 ${size / 2} ${size / 2})"></circle>`;
  const labelEl = h('div', { class: 'ring-label' });
  if (label == null) labelEl.textContent = p + '%';
  else if (label.nodeType) labelEl.append(label);
  else labelEl.textContent = String(label);
  wrap.append(svg, labelEl);
  return wrap;
}

let toastTimer = null;
export function toast(message, kind = '') {
  let t = document.getElementById('toast');
  if (!t) {
    t = h('div', { id: 'toast', class: 'toast', role: 'status', 'aria-live': 'polite' });
    document.body.appendChild(t);
  }
  t.className = 'toast ' + kind;
  t.textContent = message;
  // restart animation
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

const reducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Gentle confetti — DOM dots, reduced-motion safe. Never blocks the UI.
function confetti() {
  if (reducedMotion()) return;
  const colors = ['#7bd3c0', '#a7c4f5', '#f5c98a', '#c3a7f5', '#f59ba7'];
  const layer = h('div', { class: 'confetti-layer', 'aria-hidden': 'true' });
  for (let i = 0; i < 28; i++) {
    const dot = h('span', { class: 'confetti-dot' });
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.background = colors[i % colors.length];
    dot.style.animationDelay = Math.random() * 0.3 + 's';
    dot.style.transform = `translateY(-10vh) rotate(${Math.random() * 360}deg)`;
    layer.appendChild(dot);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1800);
}

// Celebration overlay (level up / badge). Auto-dismiss + tap to close.
export function celebrate({ title, message, icon = '🎉', confetti: showConfetti = true } = {}) {
  if (showConfetti) confetti();
  const overlay = h('div', { class: 'celebrate-overlay', role: 'dialog', 'aria-live': 'polite' });
  const card = h('div', { class: 'celebrate-card' }, [
    h('div', { class: 'celebrate-icon', text: icon }),
    h('div', { class: 'celebrate-title', text: title || 'Shabaash!' }),
    message ? h('div', { class: 'celebrate-msg', text: message }) : null,
    h('button', { class: 'btn btn-primary', text: 'Aage badho', onClick: () => overlay.remove() }),
  ]);
  overlay.appendChild(card);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

// Confirm-style modal with custom actions.
export function modal({ title, body, actions = [] }) {
  const overlay = h('div', { class: 'celebrate-overlay', role: 'dialog' });
  const card = h('div', { class: 'celebrate-card' }, [
    title ? h('div', { class: 'celebrate-title', text: title }) : null,
    typeof body === 'string' ? h('div', { class: 'celebrate-msg', text: body }) : body,
    h(
      'div',
      { class: 'modal-actions' },
      actions.map((a) =>
        h('button', {
          class: 'btn ' + (a.primary ? 'btn-primary' : 'btn-ghost'),
          text: a.label,
          onClick: () => {
            overlay.remove();
            if (a.onClick) a.onClick();
          },
        }),
      ),
    ),
  ]);
  overlay.appendChild(card);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
  return overlay;
}
