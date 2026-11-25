import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { calculatorPage } from '../src/calculator-view.js';
import { cartPage } from '../src/cart-view.js';
import { cataloguePage } from '../src/catalogue-view.js';
import { isAvailable, products } from '../src/catalog.js';
import { copy } from '../src/copy.js';
import { route, routePath } from '../src/routes.js';
import { about, escapeHtml, footer, header, home, productDetail } from '../src/views.js';

const languages = ['en', 'ar'];
const catalogue = { category: 'all', query: '', order: '' };
const emptyQuote = { productId: '', quantity: '', preset: 0, options: [], extraEnabled: false, extra: '' };
const hooks = {
  html: '<html lang="en" dir="ltr" data-site-private>',
  base: '<base href="./">',
  head: /<!-- page-head:start -->[\s\S]*?<!-- page-head:end -->/,
  skip: /<a class="skip-link" href="#main">[^<]*<\/a>/,
  app: '<div id="app"></div>',
  noscript: /<noscript>[\s\S]*?<\/noscript>/,
};

function renderDocument(template, { path, page, content }, lang, indexable, renderHead) {
  const t = copy[lang];
  const arabic = lang === 'ar';
  const depth = routePath(path, lang).split('/').filter(Boolean).length;
  const alternate = route(path, undefined, arabic ? 'en' : 'ar');
  const app = header(page, t, lang, 0, alternate) +
    `<main id="main" tabindex="-1">${content}</main>` + footer(t, lang);
  const noscript = arabic
    ? 'فعّل جافاسكريبت لاستخدام حاسبة الأسعار ومرشحات الكتالوج والسلة.'
    : 'Enable JavaScript to use the price calculator, catalogue filters, and cart.';

  return template
    .replace(hooks.html, `<html lang="${lang}" dir="${arabic ? 'rtl' : 'ltr'}"${indexable ? '' : ' data-site-private'}>`)
    .replace(hooks.base, `<base href="${depth ? '../'.repeat(depth) : './'}">`)
    .replace(hooks.head, () => `<!-- page-head:start -->\n${renderHead(path, lang, { indexable: indexable && page !== 'cart' })}\n  <!-- page-head:end -->`)
    .replace(hooks.skip, () => `<a class="skip-link" href="${escapeHtml(route(path, undefined, lang))}#main">${escapeHtml(t.skip)}</a>`)
    .replace(hooks.app, () => `<div id="app">${app}</div>`)
    .replace(hooks.noscript, () => `<noscript><p class="noscript">${noscript}</p></noscript>`);
}

function sitemapEntry(path, lang, siteUrl) {
  const url = language => escapeHtml(new URL(routePath(path, language), siteUrl).href);
  return `  <url>\n    <loc>${url(lang)}</loc>\n` +
    ['en', 'ar', 'x-default'].map(language =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${url(language === 'x-default' ? 'en' : language)}"/>\n`).join('') +
    '  </url>';
}

async function removeStaleProducts(dist, lang, availableIds) {
  const directory = new URL(routePath('product', lang), dist);
  const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  for (const entry of entries) {
    if (entry.isDirectory() && !availableIds.has(entry.name)) {
      await rm(new URL(`${encodeURIComponent(entry.name)}/index.html`, directory), { force: true });
    }
  }
}

export async function buildSeo(dist, { indexable }) {
  const { renderHead, SITE_URL: siteUrl } = await import(new URL('src/seo-head.js', dist));
  const template = await readFile(new URL('index.html', dist), 'utf8');
  for (const [name, hook] of Object.entries(hooks)) {
    if (!(typeof hook === 'string' ? template.includes(hook) : hook.test(template))) {
      throw new Error(`Missing ${name} hook in the index.html template`);
    }
  }

  const available = products.filter(isAvailable);
  const availableIds = new Set(available.map(product => product.id));
  const sitemap = [];
  for (const lang of languages) {
    const t = copy[lang];
    await removeStaleProducts(dist, lang, availableIds);
    const documents = [
      { path: '', page: 'home', content: home(t, lang) },
      { path: 'catalogue', page: 'catalogue', content: cataloguePage(catalogue, t, lang) },
      { path: 'calculator', page: 'calculator', content: calculatorPage(emptyQuote, t, lang) },
      { path: 'about', page: 'about', content: about(t, lang) },
      { path: 'cart', page: 'cart', content: cartPage([], t, lang) },
      ...available.map(product => {
        const related = available.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3);
        return { path: `product/${product.id}`, page: 'product', content: productDetail(product, t, lang, related) };
      }),
    ];
    for (const document of documents) {
      const directory = new URL(routePath(document.path, lang), dist);
      await mkdir(directory, { recursive: true });
      await writeFile(new URL('index.html', directory), renderDocument(template, document, lang, indexable, renderHead));
      if (indexable && document.page !== 'cart') sitemap.push(sitemapEntry(document.path, lang, siteUrl));
    }
  }

  const sitemapFile = new URL('sitemap.xml', dist);
  if (!indexable) {
    await rm(sitemapFile, { force: true });
    return;
  }
  await writeFile(sitemapFile, '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${sitemap.join('\n')}\n</urlset>\n`);
}
