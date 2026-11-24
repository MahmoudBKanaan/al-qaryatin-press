import { business, categories, featuredProducts, getSmallOrderTier, isOptionAvailable } from './catalog.js';
import { formatSAR, getPricePresets, getPriceRange, getUnitPriceRange } from './quote.js';
import { icon } from './icons.js';
import { categoryRoute, productRoute, quoteRoute, route } from './routes.js';

export { categoryRoute, productRoute, quoteRoute, route } from './routes.js';

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

export function label(record, key, lang) {
  return (lang === 'ar' && record[key + 'Ar']) || record[key];
}

export function availableOptions(product) {
  const presetOptions = new Set(getPricePresets(product).map(preset => preset.optionId).filter(Boolean));
  return product.options.filter(option =>
    option.id !== 'number-of-folds' && isOptionAvailable(option) && !presetOptions.has(option.id));
}

export const quantityUnit = (quantity, t, lang) => lang === 'en' && quantity !== 1 ? 'pieces' : t.each;
export const localeId = lang => lang === 'ar' ? 'ar-SA' : 'en-SA';
export const number = (value, lang) => new Intl.NumberFormat(localeId(lang)).format(value);
export const money = (value, lang) => formatSAR(value, localeId(lang));
export const priceMultiplier = (value, lang) => `${number(value, lang)}×`;

function quantityRange(minimum, maximum, t, lang) {
  const range = minimum === maximum ? number(minimum, lang) : `${number(minimum, lang)}–${number(maximum, lang)}`;
  return `<bdi>${range}</bdi> ${quantityUnit(maximum, t, lang)}`;
}

export function quantityPricingDetails(product, t, lang) {
  const tier = getSmallOrderTier(product);
  const minimum = tier?.minimum ?? product.minimum;
  const range = quantityRange(minimum, product.maximum, t, lang);
  const smallOrder = tier ? t.smallOrderRule
    .replace('{range}', quantityRange(tier.minimum, product.minimum - 1, t, lang))
    .replace('{multiplier}', `<bdi dir="ltr">${priceMultiplier(tier.multiplier, lang)}</bdi>`) : '';
  return { minimum, range, smallOrder };
}

function priceRange({ minimum, maximum }, lang, maximumFractionDigits = 2) {
  const locale = localeId(lang);
  if (minimum === maximum) return formatSAR(minimum, locale, maximumFractionDigits);
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency', currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits,
  });
  return formatter.formatRange?.(minimum, maximum) ??
    [formatSAR(minimum, locale, maximumFractionDigits), formatSAR(maximum, locale, maximumFractionDigits)].join(' – ');
}

function brand(lang) {
  const name = escapeHtml(label(business, 'name', lang));
  return `<a class="brand" href="${route('', undefined, lang)}">
    <img src="./media/brand-mark.webp" width="47" height="47" alt="">
    <strong>${name}</strong>
  </a>`;
}

export function header(page, t, lang, cartCount = 0, alternateHref) {
  const alternateLang = lang === 'en' ? 'ar' : 'en';
  const languageHref = alternateHref ?? route('', undefined, alternateLang);
  return `<header class="site-header">
    <div class="wrap header-inner">
      ${brand(lang)}
      <nav id="main-navigation" class="navigation" aria-label="${t.primaryNav}">
        <ul class="navigation-list m3-card-list" role="list">
          ${[['home', '', t.home], ['catalogue', 'catalogue', t.catalog], ['calculator', 'calculator', t.calculator], ['about', 'about', t.about]].map(([id, url, text]) =>
            `<li><a href="${route(url, undefined, lang)}"${page === id || (page === 'product' && id === 'catalogue') ? ' aria-current="page"' : ''}>${text}</a></li>`).join('')}
        </ul>
      </nav>
      <div class="header-actions">
        <a class="button button-text language" data-action="language" href="${escapeHtml(languageHref)}" hreflang="${alternateLang}" aria-label="${t.switchLanguage}">${icon('language')}<span class="language-label">${t.lang}</span></a>
        <a class="button button-primary header-quote" href="${route('calculator', undefined, lang)}">${icon('calculator')}${t.estimate}</a>
        <a class="icon-button header-cart" id="header-cart" href="${route('cart', undefined, lang)}" aria-label="${t.cartTitle} (${number(cartCount, lang)})"${page === 'cart' ? ' aria-current="page"' : ''}>${icon('cart')}<span class="cart-badge" aria-hidden="true"${cartCount ? '' : ' hidden'}>${number(cartCount, lang)}</span></a>
        <button class="icon-button menu-toggle" type="button" aria-controls="main-navigation" aria-expanded="false" aria-label="${lang === 'ar' ? 'القائمة' : 'Menu'}" data-action="menu">${icon('menu')}</button>
      </div>
    </div>
  </header>`;
}

export function footer(t, lang) {
  return `<footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">${brand(lang)}<p>${t.brandPromise}</p></div>
      <nav class="footer-nav" aria-label="${t.footerNav}">
        <ul class="footer-nav-list m3-card-list" role="list">
          <li><a href="${route('catalogue', undefined, lang)}">${t.catalog}</a></li>
          <li><a href="${route('calculator', undefined, lang)}">${t.calculator}</a></li>
          <li><a href="${route('about', undefined, lang)}">${t.about}</a></li>
        </ul>
      </nav>
      <a class="footer-visit" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a>
    </div>
    <div class="wrap footer-bottom"><span>&copy; ${number(new Date().getFullYear(), lang)} ${t.copyright}</span><div class="footer-tape-controls"></div></div>
  </footer>`;
}

export function productCard(product, t, lang) {
  const name = escapeHtml(label(product, 'name', lang));
  const category = categories.find(item => item.id === product.category);
  const perItem = getUnitPriceRange(product);
  return `<article class="product-card">
    <a href="${productRoute(product.id, lang)}" class="product-link" aria-labelledby="name-${product.id}" aria-describedby="price-${product.id}">
      <div class="card-image"><img src="${product.image}" alt="" loading="lazy" width="960" height="720"></div>
      <div class="card-info">
        <p class="card-category">${escapeHtml(label(category, 'label', lang))}</p>
        <h3 id="name-${product.id}">${name}</h3>
        <div class="card-bottom"><span class="card-pricing" id="price-${product.id}"><span>${t.unitPrice}</span><bdi>${priceRange(perItem, lang, 5)}</bdi></span><span class="card-more">${icon('diagonal')}</span></div>
      </div>
    </a>
  </article>`;
}

export function productGrid(items, t, lang) {
  return `<ul class="product-grid m3-card-list" role="list">${items.map(product =>
    `<li class="product-grid-item">${productCard(product, t, lang)}</li>`).join('')}</ul>`;
}

export function categoryChip(id, title, current) {
  return `<button type="button" class="filter-chip" data-category="${id}" aria-pressed="${id === current}">${icon(id === 'all' ? 'grid' : id, 'chip-leading')}${icon('check', 'chip-check')}${escapeHtml(title)}</button>`;
}

export function pageHeading(title, text, eyebrow = '') {
  return `<div class="page-heading">
    <div class="wrap">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1 id="page-title" tabindex="-1">${title}</h1><p>${text}</p></div>
  </div>`;
}

function quoteBand(t, lang) {
  return `<section class="quote-band"><div><h2>${t.quoteTitle}</h2><p>${t.quoteText}</p></div>
    <a class="button button-gold" href="${route('calculator', undefined, lang)}">${icon('calculator')}${t.estimate}</a>
  </section>`;
}

export function contact(t, lang) {
  const address = [label(business, 'street', lang), label(business, 'district', lang),
    label(business, 'city', lang) + ' ' + label(business, 'postcode', lang)].join(lang === 'ar' ? '، ' : ', ');
  return `<section class="visit-card">
    <div class="visit-lead"><p class="eyebrow">${t.area}</p><h2>${t.contactTitle}</h2><p>${t.contactText}</p><a class="button button-tonal" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a></div>
    <dl class="visit-details m3-list">
      <div class="m3-list-item"><dt>${icon('location', 'm3-list-leading')}${t.address}</dt><dd>${escapeHtml(address)}</dd></div>
      <div class="m3-list-item"><dt>${icon('clock', 'm3-list-leading')}${t.hours}</dt><dd>${label(business, 'hours', lang)}<br>${t.friday}</dd></div>
    </dl>
  </section>`;
}

export function home(t, lang) {
  return `<section class="hero">
    <div class="hero-inner wrap">
      <div class="hero-copy">
        <p class="eyebrow">${t.area}</p>
        <h1 id="page-title" tabindex="-1"><span>${t.heroOne}</span><em>${t.heroTwo}</em></h1>
        <p class="hero-description">${t.heroDescription}</p>
        <div class="hero-actions"><a class="button button-gold" href="${route('catalogue', undefined, lang)}">${icon('grid')}${t.explore}</a><a class="button button-tonal" href="${route('calculator', undefined, lang)}">${icon('calculator')}${t.estimate}</a></div>
      </div>
      <div class="hero-media"><img src="./media/hero.webp" alt="" width="1480" height="987" fetchpriority="high"></div>
    </div>
  </section>
  <div class="wrap home-content">
    <section class="category-section" aria-labelledby="category-title">
      <h2 id="category-title" class="sr-only">${t.browseTitle}</h2>
      <ul class="category-links m3-card-list" role="list">${categories.map(category =>
        `<li class="category-grid-item"><a href="${categoryRoute(category.id, lang)}"><span class="category-icon">${icon(category.id)}</span><span>${escapeHtml(label(category, 'label', lang))}</span>${icon('chevron', 'm3-list-trailing')}</a></li>`).join('')}</ul>
    </section>
    <section aria-labelledby="featured-title" class="featured-section">
      <div class="section-heading"><div><h2 id="featured-title">${t.featured}</h2></div><a class="button button-tonal" href="${route('catalogue', undefined, lang)}">${t.viewAll}</a></div>
      ${productGrid(featuredProducts, t, lang)}
    </section>
    ${quoteBand(t, lang)}
    ${contact(t, lang)}
  </div>`;
}

export function productDetail(product, t, lang, related) {
  if (!product) return `${pageHeading(t.notFound, t.notFoundText)}<div class="wrap simple-section"><a class="button button-primary" href="${route('catalogue', undefined, lang)}">${t.explore}</a></div>`;
  const name = escapeHtml(label(product, 'name', lang));
  const category = categories.find(item => item.id === product.category);
  const options = product.options.filter(option => option.id !== 'number-of-folds' && isOptionAvailable(option));
  const range = getPriceRange(product);
  const quantityPricing = quantityPricingDetails(product, t, lang);
  const sizeExamples = range.small.size === range.large.size
    ? [[t.preset, range.small]]
    : [[t.smallSize, range.small], [t.largeSize, range.large]];
  const catalogueBack = categoryRoute(product.category, lang);
  const requirements = [label(product, 'requirements', lang), ...label(product, 'intake', lang)].filter(Boolean);
  return `<div class="wrap product-page">
    <nav class="breadcrumb" aria-label="${t.breadcrumbs}">
      <ol class="breadcrumb-list m3-card-list" role="list">
        <li><a href="${route('catalogue', undefined, lang)}">${t.catalog}</a></li>
        <li>${icon('chevron')}<a href="${catalogueBack}">${escapeHtml(label(category, 'label', lang))}</a></li>
        <li>${icon('chevron')}<bdi aria-current="page">${product.code}</bdi></li>
      </ol>
    </nav>
    <div class="product-hero">
      <figure class="product-figure"><img src="${product.image}" alt="${name}" width="960" height="720"><figcaption>${t.referenceImage}</figcaption></figure>
      <section class="product-overview">
        <p class="eyebrow">${escapeHtml(label(category, 'label', lang))}</p>
        <h1 id="page-title" tabindex="-1">${name}</h1>
        <p class="product-description">${escapeHtml(label(product, 'description', lang))}</p>
        <div class="product-pricing">
          <p class="price-caption">${t.priceRange}</p>
          <bdi class="product-price">${priceRange(range, lang)}</bdi>
          <p class="range-note">${t.rangeNote}</p>
          <dl class="order-examples m3-list">${sizeExamples.map(([title, size]) =>
            `<div class="m3-list-item"><dt>${title}</dt><dd>${escapeHtml(label(size, 'size', lang))}</dd></div>`).join('')}</dl>
        </div>
        <dl class="product-stats m3-list">
          <div class="m3-list-item"><dt>${icon('layers', 'm3-list-leading')}${t.min}</dt><dd>${number(product.minimum, lang)} ${quantityUnit(product.minimum, t, lang)}</dd></div>
          <div class="m3-list-item"><dt>${icon('clock', 'm3-list-leading')}${t.lead}</dt><dd>${escapeHtml(label(product, 'turnaround', lang).replace(/^(Approximately |حوالي )/, ''))}</dd></div>
        </dl>
        <div class="product-order-actions">
          <button type="button" class="button button-primary" data-action="add-product-to-cart" data-product-id="${product.id}">${icon('cart')}${t.addMinimumOrder}</button>
          <a class="button button-tonal" href="${quoteRoute(product.id, lang)}">${icon('calculator')}${t.estimate}</a>
        </div>
      </section>
    </div>
    <section class="spec-section">
      <div class="surface spec-card"><h2>${t.details}</h2>
        <dl class="specification-list m3-list">
          <div class="m3-list-item"><dt>${icon('layers', 'm3-list-leading')}${t.material}</dt><dd>${escapeHtml(label(product, 'material', lang))}</dd></div>
          <div class="m3-list-item"><dt>${icon('print', 'm3-list-leading')}${t.specification}</dt><dd>${escapeHtml(label(product, 'specifications', lang))}</dd></div>
          <div class="m3-list-item"><dt>${icon('packaging', 'm3-list-leading')}${t.range}</dt><dd>${quantityPricing.range}</dd></div>
          ${quantityPricing.smallOrder ? `<div class="m3-list-item"><dt>${icon('receipt', 'm3-list-leading')}${t.smallOrderPricing}</dt><dd>${quantityPricing.smallOrder}</dd></div>` : ''}
        </dl>
      </div>
      <div class="surface spec-card"><h2>${t.prepare}</h2><p>${t.prepareText}</p>
        <ul class="requirements-list m3-list" role="list">${requirements.map(text =>
          `<li class="m3-list-item">${escapeHtml(text)}</li>`).join('')}</ul>
      </div>
      ${options.length ? `<div class="surface spec-card finishes"><h2>${t.finishes}</h2><ul class="finishes-list m3-list" role="list">${options.map(option =>
        `<li class="m3-list-item"><span>${escapeHtml(label(option, 'label', lang))}</span>${option.dimensions ? `<bdi class="detail-note m3-list-trailing">${escapeHtml(label(option, 'dimensions', lang))}</bdi>` : ''}</li>`).join('')}</ul></div>` : ''}
    </section>
    ${related.length ? `<section class="related-section"><div class="section-heading"><h2>${t.related}</h2><a class="button button-tonal" href="${catalogueBack}">${t.back}</a></div>${productGrid(related, t, lang)}</section>` : ''}
  </div>`;
}

export function about(t, lang) {
  return `${pageHeading(t.aboutTitle, t.aboutText, t.area)}
    <div class="wrap about-content">
      <section><div class="section-heading"><div><h2>${t.orderTitle}</h2><p>${t.orderIntro}</p></div></div>
        <ol class="steps-grid m3-card-list" role="list">${t.orderSteps.map(([symbol, title, description]) =>
          `<li class="surface order-step"><span class="category-icon">${icon(symbol)}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
      </section>
      <section class="faq-section"><h2>${t.faq}</h2>
        <ul class="faq-list m3-list" role="list">${t.faqs.map(([question, answer]) =>
          `<li class="m3-list-item"><details><summary><span>${question}</span>${icon('chevron', 'm3-list-trailing')}</summary><p>${answer}</p></details></li>`).join('')}</ul>
      </section>
      ${contact(t, lang)}
    </div>`;
}
