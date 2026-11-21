import { business, categories, getProduct, isAvailable, products } from './catalog.js';
import { calculatorPage, makeBrief, quoteSummary } from './calculator-view.js';
import { addCartItem, persistCart, readCart, removeCartItem, updateCartQuantity } from './cart.js';
import { cartCopy, cartPage, updateCartEstimate } from './cart-view.js';
import { copy } from './copy.js';
import { icon } from './icons.js';
import { mountProductTape } from './product-tape.js';
import { getPricePresets, normalizeDigits } from './quote.js';
import {
  about, categoryChip, escapeHtml, footer, header, home, label, localeId, number,
  pageHeading, productDetail, productGrid, route,
} from './views.js';

const app = document.querySelector('#app');
const notice = document.querySelector('#notice');
const skipLink = document.querySelector('.skip-link');
const setTapeLanguage = mountProductTape(document.querySelector('#product-tape'));
history.scrollRestoration = 'manual';
let language = 'en';
try {
  if (localStorage.getItem('qaryatin-language') === 'ar') language = 'ar';
} catch { /* Local storage may be unavailable. */ }

let currentPage = null;
let catalogue = { category: 'all', query: '', order: '' };
let quote = emptyQuote('');
let cart = readCart();
let noticeTimer;

function emptyQuote(productId) {
  const found = getProduct(productId);
  const product = isAvailable(found) ? found : null;
  const preset = product ? getPricePresets(product)[0] : null;
  return {
    productId: product?.id || '',
    quantity: preset?.quantity ?? '',
    preset: 0,
    options: [],
    extraEnabled: false,
    extra: '',
  };
}

function readRoute() {
  const [path, query = ''] = location.hash.startsWith('#/') ? location.hash.slice(2).split('?') : ['', ''];
  return { path, params: new URLSearchParams(query) };
}

function readCatalogue(params) {
  const id = params.get('category');
  return {
    category: categories.some(item => item.id === id) ? id : 'all',
    query: (params.get('q') || '').slice(0, 100),
    order: params.get('sort') === 'name' ? 'name' : '',
  };
}

function render({ focusPage = false } = {}) {
  const { path, params } = readRoute();
  const enterPage = currentPage === null || focusPage;
  const t = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  setTapeLanguage(language);
  skipLink.textContent = t.skip;

  let content;
  let pageTitle;
  if (path === 'catalogue') {
    currentPage = 'catalogue';
    catalogue = readCatalogue(params);
    pageTitle = t.catalogTitle;
    content = cataloguePage(t);
  } else if (path.startsWith('product/')) {
    currentPage = 'product';
    const found = getProduct(path.slice('product/'.length));
    const product = isAvailable(found) ? found : null;
    const related = product ? products.filter(item => item.id !== product.id && item.category === product.category && isAvailable(item)).slice(0, 3) : [];
    pageTitle = product ? label(product, 'name', language) : t.notFound;
    content = productDetail(product, t, language, related);
  } else if (path === 'calculator') {
    const id = params.get('product') || '';
    if (currentPage !== 'calculator' || quote.productId !== id) {
      quote = emptyQuote(id);
    }
    currentPage = 'calculator';
    pageTitle = t.calculator;
    content = calculatorPage(quote, t, language);
  } else if (path === 'cart') {
    currentPage = 'cart';
    pageTitle = t.cartTitle;
    content = cartPage(cart, t, language);
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
  app.innerHTML = header(currentPage, t, language, cart.length) +
    `<main id="main"${enterPage ? ' class="page-enter"' : ''} tabindex="-1">${content}</main>` +
    footer(t, language) + briefDialog(t);
  if (currentPage === 'catalogue') revealCatalogueCategory();
  if (focusPage) {
    const restore = currentPage === 'catalogue' && history.state?.catalogueReturn;
    const card = restore && Array.from(document.querySelectorAll('.product-link'))
      .find(link => link.hash === restore.productHash);
    window.scrollTo(0, restore ? restore.top : 0);
    (card || document.querySelector('#page-title'))?.focus({ preventScroll: true });
  }
}

function normalized(value) {
  return normalizeDigits(value.toLocaleLowerCase().normalize('NFKC'))
    .replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').trim();
}

function catalogueResults(t) {
  const tokens = normalized(catalogue.query).split(/\s+/).filter(Boolean);
  const items = products.filter(product => {
    if (!isAvailable(product) || (catalogue.category !== 'all' && catalogue.category !== product.category)) return false;
    const searchable = normalized([product.name, product.nameAr, product.code, product.catalogCategory].join(' '));
    return tokens.every(token => searchable.includes(token));
  });
  if (catalogue.order === 'name') {
    items.sort((a, b) => label(a, 'name', language).localeCompare(label(b, 'name', language), localeId(language)));
  }
  const count = items.length + ' ' + (items.length === 1 && language === 'en' ? 'product' : t.found);
  return {
    count: number(items.length, language) + count.slice(String(items.length).length),
    html: items.length ? productGrid(items, t, language)
      : `<section class="empty-state m3-empty-state" aria-labelledby="catalogue-empty-title"><span class="category-icon">${icon('search')}</span><h2 id="catalogue-empty-title">${t.noProducts}</h2><p>${t.noProductsText}</p><button class="button button-tonal" type="button" data-action="clear-filters">${t.clearFilters}</button></section>`,
  };
}

function cataloguePage(t) {
  const list = catalogueResults(t);
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
        ${categories.map(category => `<li>${categoryChip(category.id, label(category, 'label', language), catalogue.category)}</li>`).join('')}
      </ul>
      <div class="catalogue-meta"><p id="result-count" role="status">${list.count}</p><label><span>${t.sort}</span><select id="catalogue-order"><option value="">${t.catalogOrder}</option><option value="name" ${catalogue.order === 'name' ? 'selected' : ''}>${t.nameOrder}</option></select></label></div>
      <div id="catalogue-results">${list.html}</div>
    </div>`;
}

function revealCatalogueCategory() {
  const filters = document.querySelector('.filters');
  if (filters.scrollWidth <= filters.clientWidth) return;
  const active = filters.querySelector('[aria-pressed="true"]').getBoundingClientRect();
  const bounds = filters.getBoundingClientRect();
  if (active.left < bounds.left) filters.scrollLeft += active.left - bounds.left;
  if (active.right > bounds.right) filters.scrollLeft += active.right - bounds.right;
}

function updateCatalogue({ animateCards = false } = {}) {
  const t = copy[language];
  const params = new URLSearchParams();
  if (catalogue.category !== 'all') params.set('category', catalogue.category);
  if (catalogue.query) params.set('q', catalogue.query);
  if (catalogue.order) params.set('sort', catalogue.order);
  history.replaceState(null, '', route('catalogue', params));
  document.querySelectorAll('[data-category]').forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.category === catalogue.category)));
  document.querySelector('.clear-search').hidden = catalogue.query === '';
  revealCatalogueCategory();
  const { count, html } = catalogueResults(t);
  document.querySelector('#result-count').textContent = count;
  const results = document.querySelector('#catalogue-results');
  results.innerHTML = html;
  if (animateCards) results.querySelector('.product-grid')?.classList.add('cards-enter');
}

function updateQuoteRoute() {
  const params = new URLSearchParams();
  if (quote.productId) params.set('product', quote.productId);
  history.replaceState(null, '', route('calculator', params));
}

function updateSummary() {
  const summary = document.querySelector('#quote-summary');
  summary.innerHTML = quoteSummary(getProduct(quote.productId), quote, copy[language], language);
}

function saveCart(updated) {
  cart = updated;
  persistCart(undefined, cart);
  const link = document.querySelector('#header-cart');
  const count = number(cart.length, language);
  const badge = link.querySelector('.cart-badge');
  link.setAttribute('aria-label', copy[language].cartTitle + ' (' + count + ')');
  badge.textContent = count;
  badge.hidden = cart.length === 0;
}

function addOrderItem(configuration) {
  const updated = addCartItem(cart, configuration);
  const t = copy[language];
  if (!updated) {
    showNotice(t.cartInvalid);
    return;
  }
  saveCart(updated);
  showNotice(t.cartAdded);
}

function invalidCartField() {
  return app.querySelector('input[name="cart-quantity"][aria-invalid="true"]');
}

function updateCartField(field) {
  const index = Number(field.dataset.cartIndex);
  const updated = updateCartQuantity(cart, index, field.value);
  const message = cartCopy[language].invalidQuantity;
  field.setCustomValidity(updated ? '' : message);
  field.setAttribute('aria-invalid', String(!updated));
  const error = app.querySelector('#cart-quantity-error-' + index);
  error.hidden = !!updated;
  if (updated) field.removeAttribute('aria-describedby');
  else field.setAttribute('aria-describedby', error.id);
  if (updated) {
    saveCart(updated);
    updateCartEstimate(app, cart, copy[language], language, index);
  }

  const action = app.querySelector('#cart-order');
  const invalid = Boolean(invalidCartField());
  app.querySelector('.cart-message').hidden = invalid;
  if (invalid) {
    action.removeAttribute('href');
    action.setAttribute('aria-disabled', 'true');
  } else {
    action.removeAttribute('aria-disabled');
  }
}

function briefDialog(t) {
  return `<dialog class="brief-dialog" id="brief-dialog" aria-labelledby="brief-title"><div class="dialog-content">
    <div class="dialog-heading"><h2 id="brief-title">${t.brief}</h2><form method="dialog"><button class="icon-button" aria-label="${language === 'ar' ? 'إغلاق' : 'Close'}">${icon('close')}</button></form></div>
    <textarea class="brief-text" id="brief-text" aria-label="${t.brief}" readonly rows="8"></textarea>
    <p class="brief-copy-status" id="brief-copy-status" role="status"></p>
    <div class="dialog-actions"><a class="button button-tonal" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a><button type="button" class="button button-primary" data-action="copy">${icon('copy')}${t.prepBrief}</button></div>
  </div></dialog>`;
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add('active');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('active'), 3500);
}

async function copyBrief() {
  const dialog = document.querySelector('#brief-dialog');
  const text = dialog.querySelector('#brief-text');
  const t = copy[language];
  try {
    await navigator.clipboard.writeText(text.value);
    dialog.close();
    showNotice(t.copied);
  } catch {
    if (dialog.open && dialog.isConnected) {
      dialog.querySelector('#brief-copy-status').textContent = t.copyFailed;
      text.focus();
      text.setSelectionRange(0, text.value.length);
    }
  }
}

function setMenuExpanded(button, expanded) {
  button.setAttribute('aria-expanded', String(expanded));
  document.querySelector('#main-navigation').classList.toggle('is-open', expanded);
  if (expanded) document.querySelector('#main-navigation a')?.focus({ preventScroll: true });
}

app.addEventListener('click', event => {
  if (event.target.closest('#cart-order')) {
    const invalid = invalidCartField();
    if (invalid) {
      event.preventDefault();
      invalid.reportValidity();
      return;
    }
  }
  const isPlainClick = event.button === 0 && !event.defaultPrevented &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  const catalogueProduct = currentPage === 'catalogue' && event.target.closest('.product-link');
  if (catalogueProduct && isPlainClick) {
    history.replaceState({ catalogueReturn: { top: window.scrollY, productHash: catalogueProduct.hash } }, '');
  }
  const navigationLink = event.target.closest('.navigation a');
  if (navigationLink?.hash === location.hash && isPlainClick) {
    const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
    if (expanded) {
      event.preventDefault();
      setMenuExpanded(expanded, false);
      expanded.focus({ preventScroll: true });
      return;
    }
  }

  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.category) {
    if (catalogue.category !== button.dataset.category) {
      catalogue.category = button.dataset.category;
      updateCatalogue({ animateCards: true });
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
      setMenuExpanded(button, !expanded);
      break;
    }
    case 'clear-search':
    case 'clear-filters': {
      const resetCategory = button.dataset.action === 'clear-filters';
      if (resetCategory) catalogue.category = 'all';
      catalogue.query = '';
      const field = document.querySelector('#catalogue-search');
      field.value = '';
      updateCatalogue({ animateCards: true });
      (resetCategory ? document.querySelector('[data-category="all"]') : field).focus();
      break;
    }
    case 'brief': {
      const dialog = document.querySelector('#brief-dialog');
      const text = makeBrief(getProduct(quote.productId), quote, copy[language], language);
      if (text) {
        document.querySelector('#brief-text').value = text;
        dialog.querySelector('#brief-copy-status').textContent = '';
        dialog.showModal();
      }
      break;
    }
    case 'copy':
      void copyBrief();
      break;
    case 'add-product-to-cart':
      addOrderItem(emptyQuote(button.dataset.productId));
      break;
    case 'add-quote-to-cart':
      addOrderItem(quote);
      break;
    case 'remove-cart-item': {
      const index = Number(button.dataset.cartIndex);
      saveCart(removeCartItem(cart, index));
      render();
      const replacement = document.querySelector('#cart-quantity-' + Math.min(index, cart.length - 1));
      (replacement || document.querySelector('#page-title')).focus();
      showNotice(cartCopy[language].removed);
      break;
    }
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
  if (field.name === 'extra') quote.extra = field.value;
  if (field.name === 'cart-quantity') updateCartField(field);
});

app.addEventListener('change', event => {
  const field = event.target;
  if (field.id === 'catalogue-order') {
    catalogue.order = field.value;
    updateCatalogue({ animateCards: true });
  }
  if (field.id === 'quote-product') {
    quote = emptyQuote(field.value);
    updateQuoteRoute();
    render();
    document.querySelector('#quote-product')?.focus({ preventScroll: true });
  }
  if (field.name === 'preset' && field.checked) {
    const index = Number(field.value);
    const preset = getPricePresets(getProduct(quote.productId))[index];
    if (!preset) return;
    quote.preset = index;
    quote.quantity = preset.quantity;
    document.querySelector('#quote-quantity').value = quote.quantity;
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
  if (event.target.id === 'catalogue-search-form') {
    event.preventDefault();
    document.querySelector('#catalogue-search').blur();
  }
});

skipLink.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#main')?.focus();
});
document.addEventListener('keydown', event => {
  const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
  if (event.key === 'Escape' && expanded) {
    setMenuExpanded(expanded, false);
    expanded.focus();
  }
});
document.addEventListener('pointerdown', event => {
  const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
  if (expanded && !event.target.closest('#main-navigation, .menu-toggle')) setMenuExpanded(expanded, false);
});
matchMedia('(max-width: 900px)').addEventListener('change', () => {
  const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
  if (expanded) setMenuExpanded(expanded, false);
});
window.addEventListener('hashchange', () => render({ focusPage: true }));
render();
