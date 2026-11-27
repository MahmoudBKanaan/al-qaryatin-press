import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { calculatorPage } from '../src/calculator-view.js';
import { cartPage } from '../src/cart-view.js';
import { cataloguePage } from '../src/catalogue-view.js';
import { categories, isAvailable, products } from '../src/catalog.js';
import { copy } from '../src/copy.js';
import { categoryPath, route, routePath } from '../src/routes.js';
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

function renderDocument(template, { path, page, content, baseHref }, lang, indexable, renderHead) {
  const t = copy[lang];
  const arabic = lang === 'ar';
  const depth = routePath(path, lang).split('/').filter(Boolean).length;
  const alternate = route(page === 'not-found' ? '' : path, undefined, arabic ? 'en' : 'ar');
  const app = header(page, t, lang, 0, alternate) +
    `<main id="main" tabindex="-1">${content}</main>` + footer(t, lang);
  const noscript = arabic
    ? 'فعّل جافاسكريبت لاستخدام حاسبة الأسعار ومرشحات الكتالوج والسلة.'
    : 'Enable JavaScript to use the price calculator, catalogue filters, and cart.';

  return template
    .replace(hooks.html, `<html lang="${lang}" dir="${arabic ? 'rtl' : 'ltr'}"${indexable ? '' : ' data-site-private'}>`)
    .replace(hooks.base, `<base href="${baseHref ?? ('../'.repeat(depth) || './')}">`)
    .replace(hooks.head, () => `<!-- page-head:start -->\n${renderHead(path, lang, { indexable: indexable && page !== 'cart' })}\n  <!-- page-head:end -->`)
    .replace(hooks.skip, () => `<a class="skip-link" href="${escapeHtml(route(path, undefined, lang))}#main">${escapeHtml(t.skip)}</a>`)
    .replace(hooks.app, () => `<div id="app" data-prerendered-page="${page}" data-prerendered-route="${escapeHtml(routePath(path, lang))}">${app}</div>`)
    .replace(hooks.noscript, () => `<noscript><p class="noscript">${noscript}</p></noscript>`);
}

function sitemapEntry({ path, image }, lang, siteUrl) {
  const url = language => escapeHtml(new URL(routePath(path, language), siteUrl).href);
  return `  <url>\n    <loc>${url(lang)}</loc>\n` +
    ['en', 'ar', 'x-default'].map(language =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${url(language === 'x-default' ? 'en' : language)}"/>\n`).join('') +
    (image ? `    <image:image><image:loc>${escapeHtml(new URL(image, siteUrl).href)}</image:loc></image:image>\n` : '') +
    '  </url>';
}

async function removeStalePages(dist, lang, parent, availableIds) {
  const directory = new URL(routePath(parent, lang), dist);
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

export async function buildSeo(dist, { indexable, mountPath = '/' }) {
  const { renderHead, SITE_URL: siteUrl } = await import(new URL('src/seo-head.js', dist));
  const template = await readFile(new URL('index.html', dist), 'utf8');
  for (const [name, hook] of Object.entries(hooks)) {
    if (!(typeof hook === 'string' ? template.includes(hook) : hook.test(template))) {
      throw new Error(`Missing ${name} hook in the index.html template`);
    }
  }

  const available = products.filter(isAvailable);
  const availableIds = new Set(available.map(product => product.id));
  const categoryIds = new Set(categories.map(category => category.id));
  const sitemap = [];
  const redirects = [];
  for (const lang of languages) {
    const t = copy[lang];
    await removeStalePages(dist, lang, 'product', availableIds);
    await removeStalePages(dist, lang, 'catalogue', categoryIds);
    const documents = [
      { path: '', page: 'home', content: home(t, lang), image: 'media/hero-print.webp' },
      { path: 'catalogue', page: 'catalogue', content: cataloguePage(catalogue, t, lang) },
      ...categories.map(category => ({
        path: categoryPath(category.id), page: 'catalogue',
        content: cataloguePage({ ...catalogue, category: category.id }, t, lang),
      })),
      { path: 'calculator', page: 'calculator', content: calculatorPage(emptyQuote, t, lang) },
      { path: 'about', page: 'about', content: about(t, lang) },
      { path: 'cart', page: 'cart', content: cartPage([], t, lang) },
      ...available.map(product => {
        const related = available.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3);
        return { path: `product/${product.id}`, page: 'product', content: productDetail(product, t, lang, related), image: product.image };
      }),
    ];
    for (const document of documents) {
      const directory = new URL(routePath(document.path, lang), dist);
      await mkdir(directory, { recursive: true });
      await writeFile(new URL('index.html', directory), renderDocument(template, document, lang, indexable, renderHead));
      if (indexable && document.page !== 'cart') sitemap.push(sitemapEntry(document, lang, siteUrl));
      if (lang === 'en') {
        const path = routePath(document.path, lang);
        const alias = '/en/' + path;
        redirects.push(`${alias.slice(0, -1)} /${path} 301`, `${alias} /${path} 301`);
      }
    }
    // Cloudflare serves the closest 404.html in the requested directory tree.
    // The request path may be at any depth, so root all recovery links at the hosting mount.
    const error = { page: 'not-found', path: 'not-found', baseHref: mountPath, content: productDetail(null, t, lang, []) };
    const fallback = new URL(routePath('', lang) + '404.html', dist);
    await writeFile(fallback, renderDocument(template, error, lang, indexable, renderHead));
  }

  const sitemapFile = new URL('sitemap.xml', dist);
  await writeFile(new URL('_redirects', dist), redirects.join('\n') + '\n');
  const robots = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  await writeFile(new URL('robots.txt', dist), robots);
  if (!indexable) {
    await rm(sitemapFile, { force: true });
    return;
  }
  await writeFile(sitemapFile, '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    `${sitemap.join('\n')}\n</urlset>\n`);
}
