import http from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
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
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
};

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, baseURL);
    const pathname = decodeURIComponent(url.pathname);
    const page = routeFromURL(url, baseURL);
    const isHtml = page && isPage(page.path);
    const isAsset = /^\/(?:sitemap\.xml|styles\.css|src\/[^/]+\.js|app\/[a-f0-9]{16}\/[^/]+\.js|(?:media|fonts)\/[^/]+)$/.test(pathname);
    if (!isHtml && !isAsset) {
      response.writeHead(404).end('Not found');
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
    if (!target.startsWith(base + sep) || !statSync(target).isFile()) {
      response.writeHead(404).end('Not found');
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

