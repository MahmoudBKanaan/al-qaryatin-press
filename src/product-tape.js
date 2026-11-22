import { categories } from './catalog.js';
import { icon } from './icons.js';

const preference = 'qaryatin-product-tape-paused';
const labels = {
  en: { pause: 'Pause product icon animation', resume: 'Resume product icon animation' },
  ar: { pause: 'إيقاف حركة أيقونات المنتجات مؤقتًا', resume: 'استئناف حركة أيقونات المنتجات' },
};

export function mountProductTape(root) {
  if (!root) return () => {};

  let paused = false;
  let language = 'en';
  try {
    paused = globalThis.localStorage?.getItem(preference) === 'true';
  } catch { /* A site can run with storage disabled. */ }

  const items = categories.map(({ id }) =>
    `<span class="product-tape-item" data-tape-category="${id}">${icon(id)}</span>`).join('');
  const run = `<div class="product-tape-run">${items}</div>`;
  const trackMarkup = `<div class="product-tape-track" style="--tape-category-count:${categories.length}">${run}${run}</div>`;

  root.classList.toggle('is-paused', paused);
  root.innerHTML = `<div class="product-tape-window product-tape-left" aria-hidden="true">${trackMarkup}</div>
    <div class="product-tape-window product-tape-right" aria-hidden="true">${trackMarkup}</div>
    <button type="button" class="button button-tonal product-tape-toggle"></button>`;

  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(entries => {
      for (const { target: viewport } of entries) {
        const track = viewport.firstElementChild;
        const runHeight = track.firstElementChild.getBoundingClientRect().height;
        if (!runHeight) continue;
        const viewportHeight = viewport.getBoundingClientRect().height;
        // One extra run covers the full animation displacement in either direction.
        const runs = Math.max(2, Math.ceil(viewportHeight / runHeight) + 1);
        if (runs !== track.childElementCount) track.innerHTML = run.repeat(runs);
      }
    });
    root.querySelectorAll('.product-tape-window').forEach(viewport => observer.observe(viewport));
  }

  const button = root.querySelector('.product-tape-toggle');
  function updateLabel() {
    const label = labels[language][paused ? 'resume' : 'pause'];
    button.setAttribute('aria-label', label);
    button.innerHTML = `${icon(paused ? 'play' : 'pause')}<span>${label}</span>`;
  }

  button.addEventListener('click', () => {
    paused = !paused;
    root.classList.toggle('is-paused', paused);
    updateLabel();
    try {
      globalThis.localStorage?.setItem(preference, String(paused));
    } catch { /* The current page still keeps its pause state. */ }
  });
  updateLabel();

  return function updateProductTape(lang, controls) {
    controls?.append(button);
    const next = lang === 'ar' ? 'ar' : 'en';
    if (next !== language) {
      language = next;
      updateLabel();
    }
  };
}
