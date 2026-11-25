import { business } from './catalog.js';
import { routePath } from './routes.js';
import { pageMetadata, SITE_URL } from './seo.js';
import { escapeHtml, label } from './views.js';

export { SITE_URL };

export function renderHead(path, lang, { indexable }) {
  const page = pageMetadata(path, lang);
  const canonical = new URL(routePath(path, lang), SITE_URL).href;
  const allowIndex = indexable && page.indexable;
  const meta = (attribute, key, value) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" data-page-head>`;
  const link = (rel, href, language) => `<link data-page-head rel="${rel}" href="${escapeHtml(href)}"${language ? ` hreflang="${language}"` : ''}>`;
  const localized = code => new URL(routePath(path, code), SITE_URL).href;

  return [
    `<title data-page-head>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', page.description),
    meta('name', 'robots', allowIndex ? 'index,follow,max-image-preview:large' : 'noindex,follow'),
    ...(allowIndex ? [
      link('canonical', canonical),
      link('alternate', localized('en'), 'en'),
      link('alternate', localized('ar'), 'ar'),
      link('alternate', localized('en'), 'x-default'),
    ] : []),
    meta('property', 'og:type', page.type),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:url', canonical),
    meta('property', 'og:image', page.image),
    meta('property', 'og:image:secure_url', page.image),
    meta('property', 'og:image:type', page.imageType),
    meta('property', 'og:image:width', page.imageWidth),
    meta('property', 'og:image:height', page.imageHeight),
    meta('property', 'og:image:alt', page.imageAlt),
    meta('property', 'og:site_name', label(business, 'name', lang)),
    meta('property', 'og:locale', lang === 'ar' ? 'ar_SA' : 'en_SA'),
    meta('property', 'og:locale:alternate', lang === 'ar' ? 'en_SA' : 'ar_SA'),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', page.image),
    meta('name', 'twitter:image:alt', page.imageAlt),
    ...(allowIndex && page.structuredData ? [`<script data-page-head type="application/ld+json">${JSON.stringify(page.structuredData).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n  ');
}
