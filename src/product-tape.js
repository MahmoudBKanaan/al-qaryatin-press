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
      <div class="product-tape-track">${run}${run}</div>
    </div>
    <button type="button" class="product-tape-toggle">${icon(paused ? 'play' : 'pause')}</button>`;

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
