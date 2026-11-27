import { categories, isAvailable, products } from './catalog.js';
import { icon } from './icons.js';
import { normalizeDigits } from './quote.js';
import { route } from './routes.js';
import { categoryChip, escapeHtml, label, localeId, number, productGrid } from './views.js';

function normalized(value) {
  return normalizeDigits(value.toLocaleLowerCase().normalize('NFKC'))
    .replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
    .replace(/[-‐‑–—]/g, ' ')
    .replace(/(^|[^\p{L}\p{N}])ا([3-6])(?![\p{L}\p{N}])/gu, '$1a$2').trim();
}

export function catalogueResults(catalogue, t, lang) {
  const tokens = normalized(catalogue.query).split(/\s+/).filter(Boolean);
  const items = products.filter(product => {
    if (!isAvailable(product) || (catalogue.category !== 'all' && catalogue.category !== product.category)) return false;
    const category = categories.find(item => item.id === product.category);
    const searchable = normalized([
      product.name, product.nameAr, product.code, product.catalogCategory, category.label, category.labelAr,
      product.description, product.descriptionAr, product.material, product.materialAr, product.specifications, product.specificationsAr,
    ].join(' '));
    return tokens.every(token => searchable.includes(token));
  });
  if (catalogue.order === 'name') {
    items.sort((a, b) => label(a, 'name', lang).localeCompare(label(b, 'name', lang), localeId(lang)));
  }
  const unit = items.length === 1 && lang === 'en' ? 'product' : t.found;
  return {
    count: `${number(items.length, lang)} ${unit}`,
    html: items.length ? productGrid(items, t, lang)
      : `<section class="empty-state m3-empty-state" aria-labelledby="catalogue-empty-title"><span class="category-icon">${icon('search')}</span><h2 id="catalogue-empty-title">${t.noProducts}</h2><p>${t.noProductsText}</p><button class="button button-tonal" type="button" data-action="clear-filters">${t.clearFilters}</button></section>`,
  };
}

export function catalogueParams(catalogue, initialParams) {
  const params = new URLSearchParams(initialParams);
  params.delete('category');
  if (catalogue.query) params.set('q', catalogue.query);
  else params.delete('q');
  if (catalogue.order) params.set('sort', catalogue.order);
  else params.delete('sort');
  return params;
}

export function cataloguePage(catalogue, t, lang, initialParams) {
  const list = catalogueResults(catalogue, t, lang);
  const query = catalogue.query.trim();
  const searchOpen = Boolean(query);
  const category = categories.find(item => item.id === catalogue.category);
  const params = catalogueParams(catalogue, initialParams);
  return `<div class="page-heading">
    <div class="wrap">
      ${category ? `<nav class="breadcrumb" aria-label="${t.breadcrumbs}"><ol class="breadcrumb-list m3-card-list" role="list">
        <li><a href="${route('', undefined, lang)}">${t.home}</a></li>
        <li>${icon('chevron')}<a href="${route('catalogue', undefined, lang)}">${t.catalog}</a></li>
        <li>${icon('chevron')}<span aria-current="page">${escapeHtml(label(category, 'label', lang))}</span></li>
      </ol></nav>` : ''}
      <div class="catalogue-title-row">
        <h1 id="page-title" tabindex="-1">${category ? escapeHtml(label(category, 'title', lang)) : t.catalogTitle}</h1>
        <button type="button" class="button button-tonal catalogue-search-toggle" data-action="toggle-search"
          aria-expanded="${searchOpen}" aria-controls="catalogue-search-form">
          ${icon('search')}<span>${t.searchToggle}</span>
          <bdi class="catalogue-search-query"${query ? '' : ' hidden'}>${escapeHtml(query)}</bdi>
          ${icon('chevron', 'search-toggle-chevron')}
        </button>
      </div>
      <p>${category ? escapeHtml(label(category, 'description', lang)) : t.catalogText}</p>
      <form class="catalogue-search-panel" id="catalogue-search-form" role="search"${searchOpen ? '' : ' hidden'}>
        <div class="search-field">
          <label class="sr-only" for="catalogue-search">${t.search}</label>${icon('search')}
          <input id="catalogue-search" type="search" dir="auto" enterkeyhint="search" placeholder="${t.search}" value="${escapeHtml(catalogue.query)}" maxlength="100" autocomplete="off">
          <button type="button" class="icon-button clear-search" data-action="clear-search" aria-label="${t.clearSearch}"${catalogue.query ? '' : ' hidden'}>${icon('close')}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="wrap catalogue-content">
    <ul class="filters m3-chip-set" role="list" aria-label="${t.category}">
      <li>${categoryChip('all', t.all, catalogue.category, lang, params)}</li>
      ${categories.map(category => `<li>${categoryChip(category.id, label(category, 'label', lang), catalogue.category, lang, params)}</li>`).join('')}
    </ul>
    <div class="catalogue-meta"><p id="result-count" role="status">${list.count}</p><label><span>${t.sort}</span><select id="catalogue-order"><option value="">${t.catalogOrder}</option><option value="name" ${catalogue.order === 'name' ? 'selected' : ''}>${t.nameOrder}</option></select></label></div>
    <div id="catalogue-results">${list.html}</div>
  </div>`;
}
