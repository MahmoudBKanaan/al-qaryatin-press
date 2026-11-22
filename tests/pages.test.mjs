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
import { addCartItem, describeCartItem, orderMessage, persistCart, readCart, removeCartItem, summarizeCart, updateCartQuantity, whatsappOrderUrl } from '../dist/src/cart.js';
import { mountProductTape } from '../dist/src/product-tape.js';

const site = new URL('../dist/', import.meta.url);

test('the site ships valid scripts, mockups, and bundled Arabic fonts', async () => {
  const modules = await readdir(new URL('src/', site));
  for (const module of modules) {
    const path = fileURLToPath(new URL('src/' + module, site));
    execFileSync(process.execPath, ['--check', path]);
  }
  for (const filename of [
    'index.html',
    'styles.css',
    'fonts/alexandria-arabic.woff2',
    'fonts/alexandria-latin.woff2',
    'fonts/rubik-arabic.woff2',
    'fonts/Rubik-OFL.txt',
  ]) {
    await access(new URL(filename, site));
  }
  const arabicFont = await readFile(new URL('fonts/rubik-arabic.woff2', site));
  assert.equal(arabicFont.toString('ascii', 0, 4), 'wOF2');
  const styles = await readFile(new URL('styles.css', site), 'utf8');
  assert.match(styles, /font-family: "Rubik";[^}]*font-weight: 500 700;[^}]*url\("\.\/fonts\/rubik-arabic\.woff2"\)/);

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

test('the cart merges identical configurations and retains distinct lines', () => {
  const item = { productId: 'custom-paper-cards', preset: 1, options: ['double-sided-printing'] };
  const before = addCartItem([], { ...item, quantity: 99 });
  assert.deepEqual(summarizeCart(before), { estimatedSubtotal: null, reviewCount: 1 });

  const merged = addCartItem(before, { ...item, quantity: '١' });
  assert.equal(before[0].quantity, 99);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].quantity, 100);
  assert.deepEqual(summarizeCart(merged), { estimatedSubtotal: 35, reviewCount: 0 });

  let cart = addCartItem(merged, { ...item, preset: 2, quantity: 100 });
  cart = addCartItem(cart, { ...item, options: [], quantity: 100 });
  cart = addCartItem(cart, { productId: 'business-cards', preset: 0, quantity: 500 });
  assert.equal(cart.length, 4);
  assert.equal(updateCartQuantity(cart, 0, '١٬٢٥٠')[0].quantity, 1250);
  assert.equal(updateCartQuantity(cart, 0, '0'), null);
  assert.equal(updateCartQuantity(cart, 0, '12,50'), null);
  assert.equal(updateCartQuantity(cart, 0, 100001), null);
  assert.equal(addCartItem(cart, item), null);
  assert.equal(addCartItem(cart, { ...item, quantity: 100000 }), null);
  assert.equal(addCartItem(cart, { ...item, quantity: 100, options: ['gloss-lamination', 'matte-lamination'] }), null);
  assert.deepEqual(removeCartItem(cart, 1), [cart[0], cart[2], cart[3]]);
});

test('the cart persists selections and recovers from invalid or blocked storage', () => {
  const notes = 'Use the supplied artwork. Keep the back blank.';
  const item = { productId: 'paper-boxes', preset: 2, quantity: 1200, options: ['matte-lamination'], extraEnabled: true, extra: notes };
  const cart = addCartItem([], item);
  let stored;
  const storage = { getItem: () => stored, setItem: (_, value) => { stored = value; } };

  assert.deepEqual(readCart(storage), []);
  persistCart(storage, cart);
  assert.deepEqual(readCart(storage), cart);
  stored = JSON.stringify([...cart, { productId: 'paper-boxes' }, null, { productId: 'not-a-product', quantity: 1 }]);
  assert.deepEqual(readCart(storage), cart);
  stored = '{';
  assert.deepEqual(readCart(storage), []);
  const blocked = {
    getItem() { throw Error('Storage blocked'); },
    setItem() { throw Error('Storage blocked'); },
  };
  assert.deepEqual(readCart(blocked), []);
  assert.doesNotThrow(() => persistCart(blocked, cart));
});

test('WhatsApp checkout encodes every item in the current language', () => {
  const primary = getProduct('custom-paper-cards');
  const secondary = getProduct('paper-boxes');
  const note = 'Design + proof & delivery 🖨️\nأرفق التصميم\uD800';
  const first = { productId: primary.id, preset: 1, quantity: 250, options: ['double-sided-printing'] };
  const second = { productId: secondary.id, preset: 0, quantity: 1000, options: ['matte-lamination'], extraEnabled: true, extra: note };
  const cart = addCartItem(addCartItem([], first), second);
  assert.deepEqual(summarizeCart(cart), { estimatedSubtotal: 87.5, reviewCount: 1 });

  for (const lang of ['en', 'ar']) {
    const t = copy[lang];
    const localized = lang === 'ar';
    const url = new URL(whatsappOrderUrl(cart, t, lang));
    const message = url.searchParams.get('text');
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/966568080265');
    assert.equal(message, orderMessage(cart, t, lang).replace('\uD800', '\uFFFD'));
    assert.ok(message.includes(localized ? primary.nameAr : primary.name));
    assert.ok(message.includes(localized ? secondary.nameAr : secondary.name));
    assert.ok(message.includes(primary.code) && message.includes(secondary.code));
    assert.ok(message.includes(t.quantity + (localized ? ' — ٢٥٠' : ' — 250')));
    assert.ok(message.includes(localized ? '١٠ × ٧ سم' : '10 × 7 cm'));
    assert.ok(message.includes(describeCartItem(cart[0], t, lang).optionLabels[0]));
    assert.ok(message.includes(describeCartItem(cart[1], t, lang).optionLabels[0]));
    assert.ok(message.includes(note.replace('\uD800', '\uFFFD')));
    assert.ok(message.includes(t.ready) && message.includes(t.review));
    assert.equal(whatsappOrderUrl([], t, lang), '');
  }
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
  const rail = css.match(/^\.product-tape\s*\{([^}]+)\}/m)?.[1] ?? '';
  assert.match(rail, /position:\s*fixed\s*;/);
  assert.match(rail, /inset-block-start:\s*[^;]+;/);
  assert.match(rail, /inset-block-end:\s*[^;]+;/);
  assert.match(rail, /grid-template-rows:\s*minmax\(0,\s*1fr\) auto;/);
  assert.doesNotMatch(css, /\.product-tape-window\s*\{[^}]*block-size:\s*min\(/);
  assert.match(css, /@keyframes product-waterfall\s*\{\s*from\s*\{\s*transform:\s*translateY\(calc\(-1\s*\*\s*var\(--tape-category-count\)\s*\*\s*var\(--tape-pitch\)\)\)[\s\S]*to\s*\{\s*transform:\s*translateY\(0\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.product-tape-track \{ animation: none;/);
});

test('the tape adds complete icon cycles to cover a taller canvas without gaps', (t) => {
  const previousObserver = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver');
  let onResize;
  const observed = [];
  Object.defineProperty(globalThis, 'ResizeObserver', {
    configurable: true,
    value: class {
      constructor(callback) { onResize = callback; }
      observe(element) { observed.push(element); }
    },
  });
  t.after(() => {
    if (previousObserver) Object.defineProperty(globalThis, 'ResizeObserver', previousObserver);
    else delete globalThis.ResizeObserver;
  });

  let windowHeight = 1361;
  let runHeight = 340;
  let trackMarkup = '';
  let trackWrites = 0;
  const viewport = { getBoundingClientRect: () => ({ height: windowHeight }) };
  const track = {
    firstElementChild: { getBoundingClientRect: () => ({ height: runHeight }) },
    get childElementCount() { return [...trackMarkup.matchAll(/class="product-tape-run"/g)].length; },
    set innerHTML(value) {
      trackMarkup = value;
      trackWrites++;
    },
  };
  const selectors = {
    '.product-tape-toggle': { setAttribute() {}, addEventListener() {} },
    '.product-tape-window': viewport,
    '.product-tape-track': track,
  };
  const root = {
    classList: { toggle() {} },
    set innerHTML(markup) {
      assert.match(markup, new RegExp(`style="--tape-category-count:\\s*${categories.length};?"`));
      trackMarkup = markup;
    },
    querySelector(selector) { return selectors[selector]; },
  };
  const categoryIds = categories.map(category => category.id);
  function assertRuns(count) {
    assert.equal(track.childElementCount, count);
    assert.deepEqual([...trackMarkup.matchAll(/data-tape-category="([^"]+)"/g)].map(match => match[1]),
      Array.from({ length: count }, () => categoryIds).flat());
    assert.ok((count - 1) * runHeight >= windowHeight,
      'The tape covers its window even when translated up by one full cycle.');
  }

  mountProductTape(root);
  assert.deepEqual(observed, [viewport]);
  onResize();
  assertRuns(6);
  const writes = trackWrites;
  onResize();
  assert.equal(trackWrites, writes);

  windowHeight = 540;
  runHeight = 270;
  onResize();
  assertRuns(3);

  windowHeight = 200;
  onResize();
  assertRuns(2);
});
