import http from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getProduct, isAvailable } from '../src/catalog.js';
import { isPage, routeFromURL, routePath } from '../src/routes.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const useDist = process.argv.includes('--dist');
const appRoot = useDist ? join(root, 'dist') : root;
const mediaRoot = !useDist && existsSync(join(root, 'public')) ? join(root, 'public') : appRoot;
const port = Number(process.env.PORT || 4173);
const baseURL = new URL('http://localhost/');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function knownPage(page) {
  return page && page.path !== 'not-found' && isPage(page.path) &&
    (!page.path.startsWith('product/') || isAvailable(getProduct(page.path.slice('product/'.length))));
}

function notFound(response, lang) {
  const fallback = join(appRoot, lang === 'ar' ? 'ar' : '', '404.html');
  if (useDist && existsSync(fallback)) {
    response.writeHead(404, { 'Content-Type': types['.html'] });
    createReadStream(fallback).pipe(response);
  } else {
    response.writeHead(404, { 'Content-Type': types['.txt'] }).end('Not found');
  }
}

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, baseURL);
    const pathname = decodeURIComponent(url.pathname);
    const page = routeFromURL(url, baseURL);
    if (/^\/en(?:\/|$)/.test(pathname)) {
      const englishPath = new URL(url);
      englishPath.pathname = url.pathname.slice('/en'.length) || '/';
      const english = routeFromURL(englishPath, baseURL);
      if (english.lang === 'en' && knownPage(english)) {
        response.writeHead(301, { Location: '/' + routePath(english.path, 'en') + url.search }).end();
        return;
      }
    }
    const isHtml = knownPage(page);
    const isAsset = /^\/(?:sitemap\.xml|robots\.txt|styles\.css|src\/[^/]+\.js|app\/[a-f0-9]{16}\/[^/]+\.js|(?:media|media\/share|fonts)\/[^/]+)$/.test(pathname);
    if (!isHtml && !isAsset) {
      notFound(response, page?.lang);
      return;
    }
    const directory = isHtml ? routePath(page.path, page.lang) : '';
    if (isHtml && !pathname.endsWith('/') && !pathname.endsWith('/index.html')) {
      response.writeHead(301, { Location: '/' + directory + url.search }).end();
      return;
    }
    const base = /^\/(?:media|fonts)\//.test(pathname) ? mediaRoot : appRoot;
    const relative = isHtml ? (useDist ? directory : '') + 'index.html' : pathname.slice(1);
    const target = resolve(base, relative);
    if (!target.startsWith(base + sep) || !existsSync(target) || !statSync(target).isFile()) {
      notFound(response, page?.lang);
      return;
    }
    const headers = {
      'Content-Type': types[extname(target)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    };
    if (isHtml && !useDist && directory) {
      const depth = directory.split('/').filter(Boolean).length;
      const html = readFileSync(target, 'utf8').replace('<base href="./">', `<base href="${'../'.repeat(depth)}">`);
      response.writeHead(200, headers).end(html);
    } else {
      response.writeHead(200, headers);
      createReadStream(target).pipe(response);
    }
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log('Local http://127.0.0.1:' + port);
});

