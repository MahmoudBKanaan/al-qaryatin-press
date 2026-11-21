import { business, categories, getProduct, products } from './catalog.js';
import { calculatorPage, makeBrief, quoteSummary } from './calculator-view.js';
import { copy } from './copy.js';
import { icon } from './icons.js';
import {
  about, categoryChip, channelControl, escapeHtml, footer, header, home, isAvailable, label, localeId, number,
  pageHeading, productCard, productDetail, route,
} from './views.js';

const app = document.querySelector('#app');
const notice = document.querySelector('#notice');
const skipLink = document.querySelector('.skip-link');
let language = 'en';
try {
  if (localStorage.getItem('qaryatin-language') === 'ar') language = 'ar';
} catch { /* Local storage may be unavailable. */ }

let currentPage = 'home';
let catalogue = { channel: 'retail', category: 'all', query: '', order: '' };
let quote = emptyQuote('retail', '');
let noticeTimer;

function emptyQuote(channel, productId) {
  const found = getProduct(productId);
  const product = isAvailable(found, channel) ? found : null;
  return {
    channel,
    productId: product?.id || '',
    quantity: product?.minimum || '',
    dimensions: { unit: 'cm' },
    options: [],
    extraEnabled: false,
    extra: '',
  };
}

function readRoute() {
  const [path, query = ''] = location.hash.startsWith('#/') ? location.hash.slice(2).split('?') : ['', ''];
  const params = new URLSearchParams(query);
  const requestedChannel = params.get('channel') === 'agency' ? 'agency' : 'retail';
  return { path, params, requestedChannel };
}

function readCatalogue(params, channel) {
  const id = params.get('category');
  return {
    channel,
    category: categories.some(item => item.id === id) ? id : 'all',
    query: (params.get('q') || '').slice(0, 100),
    order: params.get('sort') === 'name' ? 'name' : '',
  };
}

function render({ focusPage = false } = {}) {
  const { path, params, requestedChannel } = readRoute();
  const t = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  skipLink.textContent = t.skip;

  let content;
  let pageTitle;
  if (path === 'catalogue') {
    currentPage = 'catalogue';
    catalogue = readCatalogue(params, requestedChannel);
    pageTitle = t.catalogTitle;
    content = cataloguePage(t);
  } else if (path.startsWith('product/')) {
    currentPage = 'product';
    const found = getProduct(path.slice('product/'.length));
    const product = isAvailable(found, requestedChannel) ? found : null;
    const related = product ? products.filter(item => item.id !== product.id && item.category === product.category && isAvailable(item, requestedChannel)).slice(0, 3) : [];
    pageTitle = product ? label(product, 'name', language) : t.notFound;
    content = productDetail(product, t, language, requestedChannel, related);
  } else if (path === 'calculator') {
    const id = params.get('product') || '';
    if (currentPage !== 'calculator' || requestedChannel !== quote.channel || quote.productId !== id) {
      quote = emptyQuote(requestedChannel, id);
    }
    currentPage = 'calculator';
    pageTitle = t.calculator;
    content = calculatorPage(quote, t, language);
  } else if (path === 'about') {
    currentPage = 'about';
    pageTitle = t.about;
    content = about(t, language);
  } else {
    currentPage = 'home';
    pageTitle = language === 'ar' ? 'المطبوعات والتغليف واللوحات' : 'Printing, Packaging & Signage';
    content = home(t, language);
  }

  document.title = currentPage === 'home' ? label(business, 'name', language) + ' | ' + pageTitle : pageTitle + ' | ' + label(business, 'name', language);
  app.innerHTML = header(currentPage, t, language) + `<main id="main" tabindex="-1">${content}</main>` + footer(t, language) + briefDialog(t);
  if (focusPage) {
    window.scrollTo(0, 0);
    document.querySelector('#page-title')?.focus({ preventScroll: true });
  }
}

function normalized(value) {
  return value.toLocaleLowerCase().normalize('NFKC')
    .replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').trim();
}

function catalogueResults(t) {
  const tokens = normalized(catalogue.query).split(/\s+/).filter(Boolean);
  const items = products.filter(product => {
    if (!isAvailable(product, catalogue.channel) || (catalogue.category !== 'all' && catalogue.category !== product.category)) return false;
    const searchable = normalized([product.name, product.nameAr, product.code, product.catalogCategory].join(' '));
    return tokens.every(token => searchable.includes(token));
  });
  if (catalogue.order === 'name') {
    items.sort((a, b) => label(a, 'name', language).localeCompare(label(b, 'name', language), localeId(language)));
  }
  const count = items.length + ' ' + (items.length === 1 && language === 'en' ? 'product' : t.found);
  return {
    count: number(items.length, language) + count.slice(String(items.length).length),
    html: items.length ? `<div class="product-grid">${items.map(item =>
      productCard(item, t, language, catalogue.channel)).join('')}</div>`
      : `<div class="empty-state"><span class="category-icon">${icon('search')}</span><h2>${t.noProducts}</h2><p>${t.noProductsText}</p><button class="button button-outline" type="button" data-action="clear-filters">${t.clearFilters}</button></div>`,
  };
}

function cataloguePage(t) {
  const list = catalogueResults(t);
  return `${pageHeading(t.catalogTitle, t.catalogText)}
    <div class="wrap catalogue-content">
      <div class="catalogue-toolbar">
        <label class="search-field"><span class="sr-only">${t.search}</span>${icon('search')}<input id="catalogue-search" type="search" placeholder="${t.search}" value="${escapeHtml(catalogue.query)}" maxlength="100" autocomplete="off"></label>
        <div id="catalogue-channel">${channelControl(catalogue.channel, t)}</div>
      </div>
      <div class="filters" role="group" aria-label="${t.category}">
        ${categoryChip('all', t.all, catalogue.category)}
        ${categories.map(category => categoryChip(category.id, label(category, 'label', language), catalogue.category)).join('')}
      </div>
      <div class="catalogue-meta"><p id="result-count" role="status">${list.count}</p><label><span>${t.sort}</span><select id="catalogue-order"><option value="">${t.catalogOrder}</option><option value="name" ${catalogue.order === 'name' ? 'selected' : ''}>${t.nameOrder}</option></select></label></div>
      <div id="catalogue-results">${list.html}</div>
    </div>`;
}

function updateCatalogue() {
  const t = copy[language];
  const params = new URLSearchParams();
  if (catalogue.category !== 'all') params.set('category', catalogue.category);
  if (catalogue.channel === 'agency') params.set('channel', 'agency');
  if (catalogue.query) params.set('q', catalogue.query);
  if (catalogue.order) params.set('sort', catalogue.order);
  history.replaceState(null, '', route('catalogue', params));
  document.querySelectorAll('[data-category]').forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.category === catalogue.category)));
  const group = document.querySelector('#catalogue-channel');
  if (!group.querySelector('[data-channel="' + catalogue.channel + '"][aria-pressed="true"]')) {
    group.innerHTML = channelControl(catalogue.channel, t);
    group.querySelector('[aria-pressed="true"]').focus();
  }
  const { count, html } = catalogueResults(t);
  document.querySelector('#result-count').textContent = count;
  document.querySelector('#catalogue-results').innerHTML = html;
}

function setQuoteChannel(channel) {
  if (quote.channel === channel) return;
  const previous = quote;
  quote = isAvailable(getProduct(previous.productId), channel)
    ? { ...previous, channel, options: previous.options.filter(id => {
      const option = getProduct(previous.productId).options.find(item => item.id === id);
      return !option?.productId || isAvailable(getProduct(option.productId), channel);
    }) }
    : emptyQuote(channel, '');
  updateQuoteRoute();
  render();
  document.querySelector('#quote-form [data-channel="' + channel + '"]')?.focus();
}

function updateQuoteRoute() {
  const params = new URLSearchParams();
  if (quote.productId) params.set('product', quote.productId);
  if (quote.channel === 'agency') params.set('channel', 'agency');
  history.replaceState(null, '', route('calculator', params));
}

function updateSummary() {
  const summary = document.querySelector('#quote-summary');
  const formulaOpen = summary.querySelector('.formula')?.open;
  summary.innerHTML = quoteSummary(getProduct(quote.productId), quote, copy[language], language);
  const formula = summary.querySelector('.formula');
  if (formula) formula.open = Boolean(formulaOpen);
}

function briefDialog(t) {
  return `<dialog class="brief-dialog" id="brief-dialog" aria-labelledby="brief-title"><div class="dialog-content">
    <div class="dialog-heading"><h2 id="brief-title">${t.brief}</h2><form method="dialog"><button class="icon-button" aria-label="${language === 'ar' ? 'إغلاق' : 'Close'}">${icon('close')}</button></form></div>
    <textarea class="brief-text" id="brief-text" aria-label="${t.brief}" readonly rows="8"></textarea>
    <div class="dialog-actions"><a class="button button-outline" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a><button type="button" class="button button-primary" data-action="copy">${icon('copy')}${t.prepBrief}</button></div>
  </div></dialog>`;
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add('active');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('active'), 3500);
}

async function copyBrief() {
  const text = document.querySelector('#brief-text');
  const t = copy[language];
  try {
    await navigator.clipboard.writeText(text.value);
    document.querySelector('#brief-dialog').close();
    showNotice(t.copied);
  } catch {
    text.focus();
    text.select();
    showNotice(t.copyFailed);
  }
}

app.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.category) {
    catalogue.category = button.dataset.category;
    updateCatalogue();
    return;
  }
  if (button.dataset.channel) {
    if (currentPage === 'calculator') setQuoteChannel(button.dataset.channel);
    if (currentPage === 'catalogue') {
      catalogue.channel = button.dataset.channel;
      updateCatalogue();
    }
    return;
  }
  switch (button.dataset.action) {
    case 'language': {
      language = language === 'en' ? 'ar' : 'en';
      try { localStorage.setItem('qaryatin-language', language); } catch { /* Optional preference. */ }
      render();
      document.querySelector('.language')?.focus({ preventScroll: true });
      break;
    }
    case 'menu': {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      document.querySelector('.navigation')?.classList.toggle('is-open', !expanded);
      break;
    }
    case 'clear-filters':
      catalogue.category = 'all';
      catalogue.query = '';
      document.querySelector('#catalogue-search').value = '';
      updateCatalogue();
      document.querySelector('#catalogue-search').focus();
      break;
    case 'brief': {
      const dialog = document.querySelector('#brief-dialog');
      const text = makeBrief(getProduct(quote.productId), quote, copy[language], language);
      if (text) {
        document.querySelector('#brief-text').value = text;
        dialog.showModal();
      }
      break;
    }
    case 'copy':
      void copyBrief();
      break;
  }
});

app.addEventListener('input', event => {
  const field = event.target;
  if (field.id === 'catalogue-search') {
    catalogue.query = field.value;
    updateCatalogue();
  }
  if (field.name === 'quantity') {
    quote.quantity = field.value;
    updateSummary();
  }
  if (field.name?.startsWith('dimension-') && field.name !== 'dimension-unit') {
    quote.dimensions[field.name.slice('dimension-'.length)] = field.value;
    updateSummary();
  }
  if (field.name === 'extra') quote.extra = field.value;
});

app.addEventListener('change', event => {
  const field = event.target;
  if (field.id === 'catalogue-order') {
    catalogue.order = field.value;
    updateCatalogue();
  }
  if (field.id === 'quote-product') {
    quote = emptyQuote(quote.channel, field.value);
    updateQuoteRoute();
    render();
    document.querySelector('#quote-product')?.focus({ preventScroll: true });
  }
  if (field.name === 'dimension-unit') {
    quote.dimensions.unit = field.value;
    updateSummary();
  }
  if (field.name === 'option' || field.name?.startsWith('group-')) {
    quote.options = Array.from(document.querySelectorAll('#quote-form input[name="option"]:checked, #quote-form select[name^="group-"]')).map(item => item.value).filter(Boolean);
    updateSummary();
  }
  if (field.name === 'extra-enabled') {
    quote.extraEnabled = field.checked;
    document.querySelector('.extra-field').hidden = !field.checked;
    updateSummary();
  }
});

app.addEventListener('submit', event => {
  if (event.target.id === 'quote-form') event.preventDefault();
});

skipLink.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#main')?.focus();
});
document.addEventListener('keydown', event => {
  const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
  if (event.key === 'Escape' && expanded) {
    expanded.click();
    expanded.focus();
  }
});
window.addEventListener('hashchange', () => render({ focusPage: true }));
render();


