export function routePath(path = '', lang = 'en') {
  return (lang === 'ar' ? 'ar/' : '') + (path ? path + '/' : '');
}

export function route(path = '', params, lang = 'en') {
  return './' + routePath(path, lang) + (params?.size ? '?' + params : '');
}

export function routeFromURL(url, base) {
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return null;
  const parts = url.pathname.slice(base.pathname.length).split('/').filter(Boolean);
  const lang = parts[0] === 'ar' ? 'ar' : 'en';
  if (lang === 'ar') parts.shift();
  if (parts.at(-1) === 'index.html') parts.pop();
  return { path: parts.join('/'), lang, params: url.searchParams };
}

export function isPage(path) {
  return ['', 'catalogue', 'calculator', 'about', 'cart', 'not-found'].includes(path) || /^product\/[a-z0-9-]+$/.test(path);
}

export const categoryRoute = (id, lang) => route('catalogue', new URLSearchParams({ category: id }), lang);
export const quoteRoute = (id, lang) => route('calculator', new URLSearchParams({ product: id }), lang);
export const productRoute = (id, lang) => route('product/' + id, undefined, lang);
