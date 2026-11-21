import { business, categories, featuredProducts, getProduct } from './catalog.js';
import { formatSAR } from './quote.js';
import { icon } from './icons.js';

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

export const route = (path, params) => '#/' + path + (params?.size ? '?' + params : '');
export const categoryRoute = id => route('catalogue', new URLSearchParams({ category: id }));
export const quoteRoute = (id, channel = 'retail') => route('calculator', new URLSearchParams({
  product: id, ...(channel === 'agency' ? { channel } : {})
}));
export const productRoute = (id, channel = 'retail') => route('product/' + id,
  channel === 'agency' ? new URLSearchParams({ channel }) : undefined);

export function label(record, key, lang) {
  return (lang === 'ar' && record[key + 'Ar']) || record[key];
}

export const isAvailable = (product, channel) => product?.available && (channel !== 'agency' || product.agencyAvailable);
export const availableOptions = (product, channel) => product.options.filter(option =>
  option.available !== false && (!option.productId || isAvailable(getProduct(option.productId), channel)));

export const quantityUnit = (quantity, t, lang) => lang === 'en' && quantity !== 1 ? 'pieces' : t.each;
export const localeId = lang => lang === 'ar' ? 'ar-SA' : 'en-SA';
export const number = (value, lang) => new Intl.NumberFormat(localeId(lang)).format(value);
export const money = (value, lang) => formatSAR(value, localeId(lang));
export function priceUnit(unit, t) {
  return { piece: t.each, 'square metre': t.sqm, 'cubic metre': t.cbm }[unit] || unit;
}

function brand(lang, light = false) {
  return `<a class="brand${light ? ' brand-light' : ''}" href="#/" aria-label="${label(business, 'name', lang)}">
    <img src="./media/brand-mark.webp" width="47" height="47" alt="">
    <span><strong lang="ar" dir="rtl">${business.nameAr}</strong><small lang="en" dir="ltr">AL QARYATIN PRESS</small></span>
  </a>`;
}

export function header(page, t, lang) {
  return `<header class="site-header">
    <div class="wrap header-inner">
      ${brand(lang)}
      <nav id="main-navigation" class="navigation" aria-label="${t.catalog}">
        ${[['home', '', t.home], ['catalogue', 'catalogue', t.catalog], ['calculator', 'calculator', t.calculator], ['about', 'about', t.about]].map(([id, url, text]) =>
          `<a href="#/${url}" ${(page === id || page === 'product' && id === 'catalogue') ? 'aria-current="page"' : ''}>${text}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <button class="button button-text language" type="button" data-action="language" aria-label="${t.switchLanguage}">${icon('language')}${t.lang}</button>
        <a class="button button-primary header-quote" href="#/calculator">${icon('calculator')}${t.estimate}</a>
        <button class="icon-button menu-toggle" type="button" aria-controls="main-navigation" aria-expanded="false" aria-label="${lang === 'ar' ? 'القائمة' : 'Menu'}" data-action="menu">${icon('menu')}</button>
      </div>
    </div>
  </header>`;
}

export function footer(t, lang) {
  return `<footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">${brand(lang, true)}<p>${t.brandPromise}</p></div>
      <nav class="footer-nav" aria-label="${t.catalog}"><a href="#/catalogue">${t.catalog}</a><a href="#/calculator">${t.calculator}</a><a href="#/about">${t.about}</a></nav>
      <a class="footer-visit" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a>
    </div>
    <div class="wrap footer-bottom"><span>&copy; ${number(new Date().getFullYear(), lang)} ${t.copyright}</span><bdi>@${business.username}</bdi></div>
  </footer>`;
}

export function productCard(product, t, lang, channel = 'retail') {
  const name = escapeHtml(label(product, 'name', lang));
  const category = categories.find(item => item.id === product.category);
  return `<article class="product-card">
    <a href="${productRoute(product.id, channel)}" class="product-link" aria-label="${name}">
      <div class="card-image"><img src="${product.image}" alt="" loading="lazy" width="960" height="720"></div>
      <div class="card-info">
        <p class="card-category">${escapeHtml(label(category, 'label', lang))}</p>
        <h3>${name}</h3>
        <div class="card-bottom"><span><bdi class="card-rate">${money(product.rate, lang)}</bdi> <span class="rate-unit">/ ${priceUnit(product.unit, t)}</span></span><span class="card-more">${icon('diagonal')}</span></div>
      </div>
    </a>
  </article>`;
}

export function categoryChip(id, title, current) {
  return `<button type="button" class="filter-chip" data-category="${id}" aria-pressed="${id === current}">${icon(id === 'all' ? 'grid' : id)}${escapeHtml(title)}</button>`;
}

export function channelControl(current, t) {
  return `<div class="segmented" role="group" aria-label="${t.channel}">
    ${['retail', 'agency'].map(channel => `<button type="button" data-channel="${channel}" aria-pressed="${channel === current}">${channel === current ? icon('check') : ''}${t[channel]}</button>`).join('')}
  </div>`;
}

export function pageHeading(title, text, eyebrow = '') {
  return `<div class="page-heading">
    <div class="wrap">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1 id="page-title" tabindex="-1">${title}</h1><p>${text}</p></div>
  </div>`;
}

function quoteBand(t) {
  return `<section class="quote-band"><div><h2>${t.quoteTitle}</h2><p>${t.quoteText}</p></div>
    <a class="button button-gold" href="#/calculator">${icon('calculator')}${t.estimate}</a>
  </section>`;
}

export function contact(t, lang) {
  const address = [label(business, 'street', lang), label(business, 'district', lang),
    label(business, 'city', lang) + ' ' + business.postcode].join(lang === 'ar' ? '، ' : ', ');
  return `<section class="visit-card">
    <div class="visit-lead"><p class="eyebrow">${t.area}</p><h2>${t.contactTitle}</h2><p>${t.contactText}</p><a class="button button-outline" href="${business.mapsUrl}" target="_blank" rel="noopener">${icon('location')}${t.directions}</a></div>
    <dl class="visit-details">
      <div>${icon('location')}<div><dt>${t.address}</dt><dd>${escapeHtml(address)}</dd></div></div>
      <div>${icon('clock')}<div><dt>${t.hours}</dt><dd>${label(business, 'hours', lang)}<br>${t.friday}</dd></div></div>
    </dl>
  </section>`;
}

export function home(t, lang) {
  return `<section class="hero">
    <div class="hero-media"><img src="./media/hero.webp" alt="" width="1480" height="987" fetchpriority="high"></div>
    <div class="hero-copy wrap">
      <div>
        <p class="eyebrow"><span class="brand-line"></span>${t.area}</p>
        <h1 id="page-title" tabindex="-1"><span>${t.heroOne}</span><em>${t.heroTwo}</em></h1>
        <p class="hero-description">${t.heroDescription}</p>
        <div class="hero-actions"><a class="button button-gold" href="#/catalogue">${icon('grid')}${t.explore}</a><a class="button button-light" href="#/calculator">${icon('calculator')}${t.estimate}</a></div>
      </div>
    </div>
  </section>
  <div class="wrap home-content">
    <section class="category-section" aria-labelledby="category-title">
      <h2 id="category-title" class="sr-only">${t.browseTitle}</h2>
      <div class="category-links">${categories.map(category =>
        `<a href="${categoryRoute(category.id)}"><span class="category-icon">${icon(category.id)}</span><span>${escapeHtml(label(category, 'label', lang))}</span></a>`).join('')}</div>
    </section>
    <section aria-labelledby="featured-title" class="featured-section">
      <div class="section-heading"><div><h2 id="featured-title">${t.featured}</h2></div><a class="button button-outline" href="#/catalogue">${t.viewAll}</a></div>
      <div class="product-grid">${featuredProducts.map(product => productCard(product, t, lang)).join('')}</div>
    </section>
    ${quoteBand(t)}
    ${contact(t, lang)}
  </div>`;
}

export function productDetail(product, t, lang, channel, related) {
  if (!product) return `${pageHeading(t.notFound, t.notFoundText)}<div class="wrap simple-section"><a class="button button-primary" href="#/catalogue">${t.explore}</a></div>`;
  const name = escapeHtml(label(product, 'name', lang));
  const category = categories.find(item => item.id === product.category);
  const options = availableOptions(product, channel).filter(option => option.id !== 'number-of-folds');
  const catalogueBack = route('catalogue', new URLSearchParams({ category: product.category, ...(channel === 'agency' ? { channel } : {}) }));
  const specLang = lang === 'ar' ? ' lang="en" dir="ltr"' : '';
  return `<div class="wrap product-page">
    <nav class="breadcrumb" aria-label="${t.catalog}"><a href="${route('catalogue', channel === 'agency' ? new URLSearchParams({ channel }) : undefined)}">${t.catalog}</a>${icon('chevron')}<a href="${catalogueBack}">${escapeHtml(label(category, 'label', lang))}</a>${icon('chevron')}<bdi>${product.code}</bdi></nav>
    <div class="product-hero">
      <figure class="product-figure"><img src="${product.image}" alt="${name}" width="960" height="720"><figcaption>${t.referenceImage}</figcaption></figure>
      <section class="product-overview">
        <p class="eyebrow">${escapeHtml(label(category, 'label', lang))}</p>
        <h1 id="page-title" tabindex="-1">${name}</h1>
        <p class="product-alias" lang="${lang === 'ar' ? 'en' : 'ar'}">${escapeHtml(lang === 'ar' ? product.name : product.nameAr)}</p>
        <p class="product-description"${specLang}>${escapeHtml(product.description)}</p>
        <div class="product-rate"><span>${t.rate}</span><div><bdi>${money(product.rate, lang)}</bdi><small> / ${priceUnit(product.unit, t)}</small></div></div>
        <dl class="product-stats">
          <div>${icon('layers')}<div><dt>${t.min}</dt><dd>${number(product.minimum, lang)} ${quantityUnit(product.minimum, t, lang)}</dd></div></div>
          <div>${icon('clock')}<div><dt>${t.lead}</dt><dd>${escapeHtml(label(product, 'turnaround', lang).replace(/^(Approximately |حوالي )/, ''))}</dd></div></div>
        </dl>
        <a class="button button-primary product-calculate" href="${quoteRoute(product.id, channel)}">${icon('calculator')}${t.estimate}</a>
      </section>
    </div>
    <section class="spec-section">
      <div class="surface spec-card"><h2>${t.details}</h2>${t.specificationsLanguage ? `<p class="detail-note">${t.specificationsLanguage}</p>` : ''}
        <dl><dt>${t.material}</dt><dd${specLang}>${escapeHtml(product.material)}</dd><dt>${t.specification}</dt><dd${specLang}>${escapeHtml(product.specifications)}</dd>
        <dt>${t.range}</dt><dd><bdi>${number(product.minimum, lang)}–${number(product.maximum, lang)}</bdi> ${quantityUnit(product.maximum, t, lang)}</dd></dl>
      </div>
      <div class="surface spec-card"><h2>${t.prepare}</h2><p>${t.prepareText}</p>
        <ul${specLang}>${[product.requirements, ...product.intake].filter(Boolean).map(text => `<li>${escapeHtml(text)}</li>`).join('')}</ul>
      </div>
      ${options.length ? `<div class="surface spec-card finishes"><h2>${t.finishes}</h2><ul>${options.map(option =>
        `<li><span>${escapeHtml(label(option, 'label', lang))}${option.dimensions ? ` <bdi class="detail-note">(${escapeHtml(option.dimensions)})</bdi>` : ''}</span><bdi>${escapeHtml(option.value)}</bdi></li>`).join('')}</ul></div>` : ''}
    </section>
    ${related.length ? `<section class="related-section"><div class="section-heading"><h2>${t.related}</h2><a class="button button-outline" href="${catalogueBack}">${t.back}</a></div><div class="product-grid">${related.map(item => productCard(item, t, lang, channel)).join('')}</div></section>` : ''}
  </div>`;
}

export function about(t, lang) {
  return `${pageHeading(t.aboutTitle, t.aboutText, t.area)}
    <div class="wrap about-content">
      <section><div class="section-heading"><div><h2>${t.orderTitle}</h2><p>${t.orderIntro}</p></div></div>
        <div class="steps-grid">${t.orderSteps.map(([symbol, title, description]) =>
          `<article class="surface order-step"><span class="category-icon">${icon(symbol)}</span><h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
      </section>
      <section class="faq-section"><h2>${t.faq}</h2><div class="faq-list">${t.faqs.map(([question, answer]) => `<details><summary>${question}${icon('chevron')}</summary><p>${answer}</p></details>`).join('')}</div></section>
      ${contact(t, lang)}
    </div>`;
}


