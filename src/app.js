import { business, categories, getProduct, isAvailable, products } from './catalog.js';
import { calculatorPage, makeBrief, quoteSummary } from './calculator-view.js';
import { addCartItem, persistCart, readCart, removeCartItem, updateCartQuantity } from './cart.js';
import { cartCopy, cartPage, updateCartEstimate } from './cart-view.js';
import { cataloguePage, catalogueResults } from './catalogue-view.js';
import { copy } from './copy.js';
import { mountHeroCarousel } from './hero-carousel.js';
import { icon } from './icons.js';
import { mountProductTape } from './product-tape.js';
import { getPricePresets } from './quote.js';
import { isPage, route, routeFromURL } from './routes.js';
import { renderHead } from './seo-head.js';
import { about, footer, header, home, number, productDetail } from './views.js';

const app = document.querySelector('#app');
const notice = document.querySelector('#notice');
const skipLink = document.querySelector('.skip-link');
const updateProductTape = mountProductTape(document.querySelector('#product-tape'));
const siteBase = new URL(document.baseURI);
// Keep relative assets and links anchored to the site when History changes the path.
document.querySelector('base').href = siteBase.href;
const indexable = !document.documentElement.hasAttribute('data-site-private');
history.scrollRestoration = 'manual';
let language = 'en';
let metadataKey;

let currentPage = null;
let catalogue = { category: 'all', query: '', order: '' };
let quote = emptyQuote('');
let cart = readCart();
let noticeTimer;
let unmountHeroCarousel = () => {};
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let activePageTransition;
let navigationRequest = 0;

function emptyQuote(productId) {
  const found = getProduct(productId);
  const product = isAvailable(found) ? found : null;
  return {
    productId: product?.id || '',
    quantity: product?.minimum ?? '',
    preset: 0,
    options: [],
    extraEnabled: false,
    extra: '',
  };
}

function readRoute() {
  const current = routeFromURL(new URL(location.href), siteBase) ??
    { path: 'not-found', lang: 'en', params: new URLSearchParams() };
  if (!location.hash.startsWith('#/')) return current;

  const [legacyPath, query = ''] = location.hash.slice(2).split('?');
  const path = isPage(legacyPath) ? legacyPath : 'not-found';
  const params = new URLSearchParams(query);
  let lang = current.lang;
  if (!current.path && lang === 'en') {
    try {
      if (localStorage.getItem('qaryatin-language') === 'ar') lang = 'ar';
    } catch { /* Local storage may be unavailable. */ }
  }
  history.replaceState(history.state, '', routeURL(path, params, lang));
  return { path, params, lang };
}

function routeURL(path, params, lang = language) {
  return new URL(route(path, params, lang), siteBase);
}

function readCatalogue(params) {
  const id = params.get('category');
  return {
    category: categories.some(item => item.id === id) ? id : 'all',
    query: (params.get('q') || '').slice(0, 100),
    order: params.get('sort') === 'name' ? 'name' : '',
  };
}

function render({ focusPage = false, animateEntry = false } = {}) {
  const { path, params, lang } = readRoute();
  language = lang;
  const t = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  skipLink.textContent = t.skip;
  skipLink.href = routeURL(path, params).href + '#main';

  let content;
  if (path === 'catalogue') {
    currentPage = 'catalogue';
    catalogue = readCatalogue(params);
    content = cataloguePage(catalogue, t, language);
  } else if (path.startsWith('product/')) {
    currentPage = 'product';
    const found = getProduct(path.slice('product/'.length));
    const product = isAvailable(found) ? found : null;
    const related = product ? products.filter(item => item.id !== product.id && item.category === product.category && isAvailable(item)).slice(0, 3) : [];
    content = productDetail(product, t, language, related);
  } else if (path === 'calculator') {
    const id = params.get('product') || '';
    if (currentPage !== 'calculator' || quote.productId !== id) {
      quote = emptyQuote(id);
    }
    currentPage = 'calculator';
    content = calculatorPage(quote, t, language);
  } else if (path === 'cart') {
    currentPage = 'cart';
    content = cartPage(cart, t, language);
  } else if (path === 'about') {
    currentPage = 'about';
    content = about(t, language);
  } else if (path === '') {
    currentPage = 'home';
    content = home(t, language);
  } else {
    currentPage = 'not-found';
    content = productDetail(null, t, language, []);
  }

  const pageKey = `${language}/${path}`;
  if (metadataKey !== pageKey) {
    document.head.querySelectorAll('[data-page-head]').forEach(node => node.remove());
    document.head.insertAdjacentHTML('beforeend', renderHead(path, language, { indexable }));
    metadataKey = pageKey;
  }
  const alternate = route(currentPage === 'not-found' ? '' : path, params, language === 'ar' ? 'en' : 'ar');
  unmountHeroCarousel();
  app.innerHTML = header(currentPage, t, language, cart.length, alternate) +
    `<main id="main"${animateEntry ? ' class="page-enter"' : ''} tabindex="-1">${content}</main>` +
    footer(t, language) + briefDialog(t);
  updateProductTape(language, document.querySelector('.footer-tape-controls'));
  unmountHeroCarousel = mountHeroCarousel(app.querySelector('[data-hero-carousel]'));
  if (currentPage === 'catalogue') revealCatalogueCategory();
  if (focusPage) {
    const restore = currentPage === 'catalogue' && history.state?.catalogueReturn;
    const card = restore && Array.from(document.querySelectorAll('.product-link'))
      .find(link => link.href === restore.productHref);
    window.scrollTo(0, restore ? restore.top : 0);
    (card || document.querySelector('#page-title'))?.focus({ preventScroll: true });
  }
}

function renderNavigation({ commit, switchLanguage = false } = {}) {
  const request = ++navigationRequest;
  activePageTransition?.skipTransition();

  function update(animateEntry) {
    // A skipped native transition can still call its update after a newer navigation.
    if (request !== navigationRequest) return;
    commit?.();
    render({ focusPage: !switchLanguage, animateEntry });
    if (switchLanguage) app.querySelector('.language').focus({ preventScroll: true });
  }

  const root = document.documentElement;
  const main = app.querySelector('#main');
  const canAnimate = !reducedMotion.matches && !document.hidden;
  if (!canAnimate || !document.startViewTransition || !main) {
    root.removeAttribute('data-page-transition');
    update(canAnimate);
    return;
  }

  root.setAttribute('data-page-transition', '');
  main.classList.add('page-leaving');
  const transition = document.startViewTransition(() => update(false));
  activePageTransition = transition;
  function finish() {
    if (activePageTransition !== transition) return;
    activePageTransition = undefined;
    root.removeAttribute('data-page-transition');
    main.classList.remove('page-leaving');
  }
  void transition.ready.catch(() => {});
  void transition.finished.then(finish, error => {
    finish();
    console.error(error);
  });
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
  history.replaceState(null, '', routeURL('catalogue', params));
  app.querySelector('.language').href = routeURL('catalogue', params, language === 'ar' ? 'en' : 'ar');
  skipLink.href = location.href + '#main';
  document.querySelectorAll('[data-category]').forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.category === catalogue.category)));
  document.querySelector('.clear-search').hidden = catalogue.query === '';
  revealCatalogueCategory();
  const { count, html } = catalogueResults(catalogue, t, language);
  document.querySelector('#result-count').textContent = count;
  const results = document.querySelector('#catalogue-results');
  results.innerHTML = html;
  if (animateCards) results.querySelector('.product-grid')?.classList.add('cards-enter');
}

function updateQuoteRoute() {
  const params = new URLSearchParams();
  if (quote.productId) params.set('product', quote.productId);
  history.replaceState(null, '', routeURL('calculator', params));
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
  const link = isPlainClick && event.target.closest('a[href]:not([target], [download])');
  if (link) {
    const destination = new URL(link.href);
    const next = routeFromURL(destination, siteBase);
    if (next && !destination.hash && isPage(next.path)) {
      event.preventDefault();
      if (destination.href === location.href) {
        const expanded = document.querySelector('.menu-toggle[aria-expanded="true"]');
        if (expanded) {
          setMenuExpanded(expanded, false);
          expanded.focus({ preventScroll: true });
        }
        return;
      }
      const switchLanguage = link.dataset.action === 'language';
      renderNavigation({
        switchLanguage,
        commit() {
          if (currentPage === 'catalogue' && link.classList.contains('product-link')) {
            history.replaceState({ catalogueReturn: { top: window.scrollY, productHref: destination.href } }, '');
          }
          if (switchLanguage) {
            try { localStorage.setItem('qaryatin-language', next.lang); } catch { /* Legacy link preference. */ }
          }
          history.pushState(null, '', destination);
        },
      });
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
    if (!getPricePresets(getProduct(quote.productId))[index]) return;
    quote.preset = index;
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
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) activePageTransition?.skipTransition();
});
window.addEventListener('popstate', () => renderNavigation());
window.addEventListener('hashchange', () => {
  if (location.hash.startsWith('#/')) renderNavigation();
});
render();
