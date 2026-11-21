import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { getProduct, products } from '../dist/src/catalog.js';
import { calculateQuote } from '../dist/src/quote.js';
import { productRoute, quoteRoute } from '../dist/src/views.js';

const site = new URL('../dist/', import.meta.url);

test('the site ships valid scripts, mockups, and both Arabic font subsets', async () => {
  const modules = await readdir(new URL('src/', site));
  for (const module of modules) {
    const path = fileURLToPath(new URL('src/' + module, site));
    execFileSync(process.execPath, ['--check', path]);
  }
  for (const filename of ['index.html', 'styles.css', 'fonts/alexandria-arabic.woff2', 'fonts/alexandria-latin.woff2']) {
    await access(new URL(filename, site));
  }

  assert.ok(products.length > 0);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  for (const product of products) {
    assert.equal(product.available, true, product.id);
    assert.match(product.image, /^\.\/media\/product-\d+\.webp$/);
    await access(new URL(product.image, site));
    for (const option of product.options) {
      if (option.productId) assert.ok(getProduct(option.productId)?.available, option.productId);
    }
  }
  const variants = products.filter(product => product.code === 'A0022');
  assert.equal(variants.length, 2);
  assert.notEqual(productRoute(variants[0].id), productRoute(variants[1].id));
});

test('published source and navigation use a single public catalogue', async () => {
  const filenames = ['index.html', 'styles.css', ...(await readdir(new URL('src/', site))).map(name => 'src/' + name)];
  for (const filename of filenames) {
    const source = await readFile(new URL(filename, site), 'utf8');
    assert.doesNotMatch(source, /agency|agencies|الوكالات|قناة البيع|data-channel/i, filename);
  }
  assert.equal(productRoute('business-cards'), '#/product/business-cards');
  assert.equal(quoteRoute('business-cards'), '#/calculator?product=business-cards');
});

test('the calculator preserves documented estimates and reviews dimensional orders', () => {
  const businessCards = calculateQuote(getProduct('business-cards'), { quantity: 500 });
  const rollUp = calculateQuote(getProduct('roll-up-display-stands'), { quantity: 1, options: ['medium-size'] });
  const paperBoxes = calculateQuote(getProduct('paper-boxes'), { quantity: 1000, dimensions: { length: 20, width: 15, height: 10, unit: 'cm' } });
  assert.equal(businessCards.status, 'estimate');
  assert.equal(businessCards.subtotal, 100);
  assert.equal(rollUp.status, 'estimate');
  assert.equal(rollUp.subtotal, 182);
  assert.equal(paperBoxes.status, 'review');
  assert.equal(paperBoxes.subtotal, null);
});
