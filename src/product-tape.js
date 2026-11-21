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

  root.classList.toggle('is-paused', paused);
  root.innerHTML = `<div class="product-tape-window" aria-hidden="true" dir="ltr">
      <div class="product-tape-track" style="--tape-category-count:${categories.length}">${run}${run}</div>
    </div>
    <button type="button" class="product-tape-toggle">${icon(paused ? 'play' : 'pause')}</button>`;

  if (typeof ResizeObserver === 'function') {
    const viewport = root.querySelector('.product-tape-window');
    const track = root.querySelector('.product-tape-track');
    const observer = new ResizeObserver(() => {
      const runHeight = track.firstElementChild.getBoundingClientRect().height;
      if (!runHeight) return;
      const viewportHeight = viewport.getBoundingClientRect().height;
      // A complete extra run covers the top-to-bottom shift of one cycle.
      const runs = Math.max(2, Math.ceil(viewportHeight / runHeight) + 1);
      if (runs !== track.childElementCount) track.innerHTML = run.repeat(runs);
    });
    observer.observe(viewport);
  }

  const button = root.querySelector('.product-tape-toggle');
  function updateLabel() {
    const label = labels[language][paused ? 'resume' : 'pause'];
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  button.addEventListener('click', () => {
    paused = !paused;
    root.classList.toggle('is-paused', paused);
    button.innerHTML = icon(paused ? 'play' : 'pause');
    updateLabel();
    try {
      globalThis.localStorage?.setItem(preference, String(paused));
    } catch { /* The current page still keeps its pause state. */ }
  });
  updateLabel();

  return function setLanguage(lang) {
    const next = lang === 'ar' ? 'ar' : 'en';
    if (next !== language) {
      language = next;
      updateLabel();
    }
  };
}
