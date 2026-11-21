import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { categories, getProduct, products } from '../dist/src/catalog.js';
import { calculateQuote, getPricePresets, getPriceRange } from '../dist/src/quote.js';
import { about, categoryChip, footer, header, home, productDetail, productGrid, productRoute, quoteRoute } from '../dist/src/views.js';
import { calculatorPage } from '../dist/src/calculator-view.js';
import { copy } from '../dist/src/copy.js';
import { mountProductTape } from '../dist/src/product-tape.js';

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
    assert.match(product.image, /^\.\/media\/product-\d+(?:-v\d+)?\.webp$/);
    await access(new URL(product.image, site));
    for (const option of product.options) {
      if (option.productId) assert.ok(getProduct(option.productId)?.available, option.productId);
    }
  }
  const variants = products.filter(product => product.code === 'A0022');
  assert.equal(variants.length, 2);
  assert.notEqual(productRoute(variants[0].id), productRoute(variants[1].id));
});

test('the public entry points to a single version of the module graph', async () => {
  const index = await readFile(new URL('index.html', site), 'utf8');
  const entry = index.match(/src="(\.\/app\/[a-f0-9]{16}\/app\.js)"/)?.[1];
  assert.ok(entry);
  assert.match(index, /href="\.\/styles\.css\?v=[a-f0-9]{16}"/);
  const directory = new URL('./', new URL(entry, site));
  for (const module of await readdir(new URL('src/', site))) {
    assert.deepEqual(await readFile(new URL(module, directory)), await readFile(new URL('src/' + module, site)));
  }
});
test('published source and navigation use a single public catalogue', async () => {
  const filenames = ['index.html', 'styles.css', ...(await readdir(new URL('src/', site))).map(name => 'src/' + name)];
  for (const filename of filenames) {
    const source = await readFile(new URL(filename, site), 'utf8');
    assert.doesNotMatch(source, /agency|agencies|الوكالات|قناة البيع|data-channel|m[²³]|م[²³]|square metr|cubic metr|متر مربع|متر مكعب|catalogue pricing basis/i, filename);
  }
  assert.equal(productRoute('business-cards'), '#/product/business-cards');
  assert.equal(quoteRoute('business-cards'), '#/calculator?product=business-cards');
});

test('every published product has three priced examples and a matching order range', () => {
  const excluded = ['rate', 'unit', 'sellingUnit', 'formula', 'conversionValue', 'dimensions'];
  for (const product of products) {
    assert.ok(excluded.every(key => !Object.hasOwn(product, key)), product.id);
    const presets = getPricePresets(product);
    assert.equal(presets.length, 3, product.id);
    const amounts = presets.map((preset, index) => {
      assert.ok(preset.size && preset.sizeAr, product.id);
      assert.ok(preset.quantity >= product.minimum && preset.quantity <= product.maximum, product.id);
      const quote = calculateQuote(product, { preset: index });
      assert.equal(quote.status, 'estimate', product.id);
      assert.ok(quote.subtotal > 0, product.id);
      return quote.subtotal;
    });
    const range = getPriceRange(product);
    assert.equal(range.minimum, amounts[0], product.id);
    assert.equal(range.maximum, amounts.at(-1), product.id);
    assert.ok(amounts[0] <= amounts[1] && amounts[1] <= amounts[2], product.id);
  }
});

test('the calculator rounds the order total and keeps custom quotes separate', () => {
  const businessCards = calculateQuote(getProduct('business-cards'), { quantity: 500 });
  const rollUp = calculateQuote(getProduct('roll-up-display-stands'), { quantity: 1, preset: 1, options: ['medium-size'] });
  const cards = calculateQuote(getProduct('custom-paper-cards'), { preset: 0, quantity: 100 });
  const paperBoxes = calculateQuote(getProduct('paper-boxes'), { quantity: 1000, preset: 0 });
  const customBoxes = calculateQuote(getProduct('paper-boxes'), { quantity: 1000, preset: 0, customRequirements: true });
  assert.equal(businessCards.subtotal, 100);
  assert.equal(rollUp.subtotal, 182);
  assert.equal(cards.subtotal, 11.25);
  assert.equal(paperBoxes.subtotal, 2500);
  assert.equal(customBoxes.status, 'review');
  assert.equal(customBoxes.subtotal, null);
});

test('the calculator accepts grouped quantities from Arabic and English keyboards', () => {
  const product = getProduct('business-cards');
  const expected = calculateQuote(product, { quantity: 1250 });
  assert.equal(expected.status, 'estimate');
  for (const quantity of ['1,250', '١٬٢٥٠', '۱٬۲۵۰']) {
    assert.deepEqual(calculateQuote(product, { quantity }), expected);
  }
  assert.equal(calculateQuote(product, { quantity: '12,50' }).status, 'invalid');
});

test('card collections and option lists preserve native list and selection semantics', () => {
  const product = getProduct('paper-boxes');
  const state = { productId: product.id, preset: 0, quantity: product.minimum, options: [], extraEnabled: true, extra: '' };
  for (const lang of ['en', 'ar']) {
    const t = copy[lang];
    const templates = [
      home(t, lang),
      header('calculator', t, lang),
      productDetail(product, t, lang, []),
      calculatorPage(state, t, lang),
      about(t, lang),
      footer(t, lang),
    ];
    for (const template of templates) {
      const lists = template.match(/<(?:ul|ol)(?:\s[^>]*)?>/g) ?? [];
      assert.ok(lists.length, lang);
      for (const list of lists) {
        assert.match(list, /role="list"/, list);
        assert.match(list, /m3-(?:card-list|list)/, list);
      }
    }
    assert.match(productGrid(products, t, lang), /<ul class="product-grid m3-card-list" role="list">/);
    assert.match(categoryChip('all', t.all, 'all'), /aria-pressed="true".*class="icon chip-check"/);
    const calculator = calculatorPage(state, t, lang);
    assert.equal((calculator.match(/type="radio" name="preset"/g) ?? []).length, 3);
    assert.match(calculator, /<select id="quote-product"/);
    assert.match(about(t, lang), /<li class="m3-list-item"><details><summary>/);
  }
});

test('the public theme uses fill-only icons, elevation, and reduced-motion states', async () => {
  const css = await readFile(new URL('styles.css', site), 'utf8');
  const icons = await readFile(new URL('src/icons.js', site), 'utf8');
  const defaultTheme = css.split('@media (forced-colors: active)')[0];
  const borders = defaultTheme.matchAll(/(?:^|[;{])\s*border(?:-(?:width|color|style|top|right|bottom|left|block(?:-start|-end)?|inline(?:-start|-end)?)(?:-(?:width|style|color))?)?\s*:\s*([^;}\n]+)/gm);
  for (const border of borders) assert.equal(border[1].trim(), '0', border[0]);
  assert.doesNotMatch(defaultTheme + icons, /stroke(?:-[a-z-]+)?\s*=|button-outline|brand-line/i);
  assert.match(icons, /fill="currentColor"/);
  assert.match(defaultTheme, /\.product-card[\s\S]*box-shadow: var\(--elevation-1\)/);
  assert.match(defaultTheme, /\.page-enter\s*\{\s*animation: page-arrival/);
  assert.match(defaultTheme, /\.cards-enter\s*>/);
  assert.match(defaultTheme, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*animation: none !important/);
});

test('the side tape uses two matching category runs and a persistent localized pause control', async (t) => {
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const preferences = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: key => preferences.get(key), setItem: (key, value) => preferences.set(key, value) },
  });
  t.after(() => {
    if (previousStorage) Object.defineProperty(globalThis, 'localStorage', previousStorage);
    else delete globalThis.localStorage;
  });

  function createTape() {
    const classes = new Set();
    const button = {
      setAttribute(name, value) { this[name] = value; },
      addEventListener(name, callback) { this[name] = callback; },
    };
    const root = {
      classList: { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); } },
      querySelector(selector) {
        assert.equal(selector, '.product-tape-toggle');
        return button;
      },
    };
    return { root, button, classes, setLanguage: mountProductTape(root) };
  }

  const tape = createTape();
  const markup = tape.root.innerHTML;
  assert.deepEqual([...markup.matchAll(/data-tape-category="([^"]+)"/g)].map(match => match[1]),
    [...categories, ...categories].map(category => category.id));
  assert.match(markup, /class="product-tape-window" aria-hidden="true"/);
  assert.match(tape.button['aria-label'], /^Pause/);
  tape.button.click();
  assert.ok(tape.classes.has('is-paused'));
  assert.match(tape.button['aria-label'], /^Resume/);
  tape.setLanguage('ar');
  assert.match(tape.button['aria-label'], /^استئناف/);
  assert.equal(tape.root.innerHTML, markup);

  const restored = createTape();
  assert.ok(restored.classes.has('is-paused'));
  restored.button.click();
  assert.ok(!restored.classes.has('is-paused'));

  const index = await readFile(new URL('index.html', site), 'utf8');
  const css = await readFile(new URL('styles.css', site), 'utf8');
  assert.match(index, /id="product-tape" class="product-tape"><\/div>\s*<div id="app"/);
  assert.match(css, /@keyframes product-waterfall\s*\{\s*from\s*\{\s*transform: translateY\(-50%\)[\s\S]*to\s*\{\s*transform: translateY\(0\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.product-tape-track \{ animation: none;/);
});
