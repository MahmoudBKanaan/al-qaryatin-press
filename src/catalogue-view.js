import { categories, isAvailable, products } from './catalog.js';
import { icon } from './icons.js';
import { normalizeDigits } from './quote.js';
import { categoryChip, escapeHtml, label, localeId, number, pageHeading, productGrid } from './views.js';

function normalized(value) {
  return normalizeDigits(value.toLocaleLowerCase().normalize('NFKC'))
    .replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي')
    .replace(/(^|[^\p{L}\p{N}])ا([3-6])(?![\p{L}\p{N}])/gu, '$1a$2').trim();
}

export function catalogueResults(catalogue, t, lang) {
  const tokens = normalized(catalogue.query).split(/\s+/).filter(Boolean);
  const items = products.filter(product => {
    if (!isAvailable(product) || (catalogue.category !== 'all' && catalogue.category !== product.category)) return false;
    const searchable = normalized([product.name, product.nameAr, product.code, product.catalogCategory].join(' '));
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

export function cataloguePage(catalogue, t, lang) {
  const list = catalogueResults(catalogue, t, lang);
  return `${pageHeading(t.catalogTitle, t.catalogText)}
    <div class="wrap catalogue-content">
      <form class="catalogue-toolbar" id="catalogue-search-form" role="search">
        <div class="search-field">
          <label class="sr-only" for="catalogue-search">${t.search}</label>${icon('search')}
          <input id="catalogue-search" type="search" enterkeyhint="search" placeholder="${t.search}" value="${escapeHtml(catalogue.query)}" maxlength="100" autocomplete="off">
          <button type="button" class="icon-button clear-search" data-action="clear-search" aria-label="${t.clearSearch}"${catalogue.query ? '' : ' hidden'}>${icon('close')}</button>
        </div>
      </form>
      <ul class="filters m3-chip-set" role="list" aria-label="${t.category}">
        <li>${categoryChip('all', t.all, catalogue.category)}</li>
        ${categories.map(category => `<li>${categoryChip(category.id, label(category, 'label', lang), catalogue.category)}</li>`).join('')}
      </ul>
      <div class="catalogue-meta"><p id="result-count" role="status">${list.count}</p><label><span>${t.sort}</span><select id="catalogue-order"><option value="">${t.catalogOrder}</option><option value="name" ${catalogue.order === 'name' ? 'selected' : ''}>${t.nameOrder}</option></select></label></div>
      <div id="catalogue-results">${list.html}</div>
    </div>`;
}
