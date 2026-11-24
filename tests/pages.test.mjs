import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { categories, getProduct, getSmallOrderTier, products } from '../dist/src/catalog.js';
import { calculateQuote, getPricePresets, getPriceRange, getUnitPriceRange } from '../dist/src/quote.js';
import { about, categoryChip, escapeHtml, footer, header, home, money, productDetail, productGrid, productRoute, quoteRoute } from '../dist/src/views.js';
import { calculatorPage, makeBrief } from '../dist/src/calculator-view.js';
import { cartPage } from '../dist/src/cart-view.js';
import { copy } from '../dist/src/copy.js';
import { addCartItem, describeCartItem, orderMessage, persistCart, readCart, removeCartItem, summarizeCart, updateCartQuantity, whatsappOrderUrl } from '../dist/src/cart.js';
import { mountProductTape } from '../dist/src/product-tape.js';

const site = new URL('../dist/', import.meta.url);
const publishedSite = 'https://mahmoudbkanaan.github.io/al-qaryatin-press/';

function documentMarkup(path) {
  return readFile(new URL(`${path}index.html`, site), 'utf8');
}

function alternateLinks(markup) {
  const links = [...markup.matchAll(/<(?:xhtml:)?link\b[^>]*\brel="alternate"[^>]*>/g)];
  return links.map(([tag]) => [tag.match(/\bhreflang="([^"]+)"/)[1], tag.match(/\bhref="([^"]+)"/)[1]]);
}

function schemaGraph(markup) {
  const json = markup.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, 'The document includes structured data');
  const schema = JSON.parse(json);
  assert.equal(schema['@context'], 'https://schema.org');
  return schema['@graph'];
}

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
  for (const filename of ['fustat-arabic.woff2', 'fustat-latin.woff2']) {
    const file = await readFile(new URL('fonts/' + filename, site));
    assert.equal(file.toString('ascii', 0, 4), 'wOF2', filename);
  }
  await access(new URL('fonts/Fustat-OFL.txt', site));
  const arabicFont = await readFile(new URL('fonts/rubik-arabic.woff2', site));
  assert.equal(arabicFont.toString('ascii', 0, 4), 'wOF2');
  const styles = await readFile(new URL('styles.css', site), 'utf8');
  assert.match(styles, /font-family: "Fustat";[^}]*font-weight: 200 800;[^}]*url\("\.\/fonts\/fustat-arabic\.woff2"\)/);
  assert.match(styles, /:root\[lang="ar"\]\s*\{\s*--arabic:\s*"Fustat"/);
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
  assert.equal(productRoute('business-cards'), './product/business-cards/');
  assert.equal(quoteRoute('business-cards'), './calculator/?product=business-cards');
});

test('the bilingual sitemap lists every public page with reciprocal language links and self-canonicals', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', site), 'utf8');
  assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  const byUrl = new Map(blocks.map(([, block]) => [block.match(/<loc>([^<]+)<\/loc>/)[1], block]));
  const paths = ['', 'catalogue/', 'calculator/', 'about/', ...products.map(product => `product/${product.id}/`)];
  assert.equal(blocks.length, paths.length * 2);
  assert.equal(byUrl.size, blocks.length, 'The sitemap has no duplicate URLs');

  await Promise.all(paths.map(async path => {
    const en = publishedSite + path;
    const ar = publishedSite + 'ar/' + path;
    const alternates = { en, ar, 'x-default': en };
    for (const [route, canonical] of [[path, en], ['ar/' + path, ar]]) {
      const entry = byUrl.get(canonical);
      assert.ok(entry, canonical);
      assert.deepEqual(Object.fromEntries(alternateLinks(entry)), alternates, canonical);

      const doc = await documentMarkup(route);
      assert.equal(doc.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/)[1], canonical);
      assert.deepEqual(Object.fromEntries(alternateLinks(doc)), alternates, route);
      assert.match(doc, /\bname="robots" content="index,follow,max-image-preview:large"/);
      assert.equal(new URL(doc.match(/<base href="([^"]+)"/)[1], canonical).href, publishedSite, route);
    }
  }));

  for (const route of ['cart/', 'ar/cart/']) {
    const cart = await documentMarkup(route);
    assert.ok(!byUrl.has(publishedSite + route), route);
    assert.match(cart, /\bname="robots" content="noindex,follow"/);
    assert.doesNotMatch(cart, /\brel="canonical"/);
  }
});

test('localized home, catalogue and product content is crawlable without running scripts', async () => {
  const product = getProduct('business-cards');
  for (const lang of ['en', 'ar']) {
    const arabic = lang === 'ar';
    const prefix = arabic ? 'ar/' : '';
    const [homepage, catalogue, item] = await Promise.all([
      documentMarkup(prefix),
      documentMarkup(`${prefix}catalogue/`),
      documentMarkup(`${prefix}product/${product.id}/`),
    ]);
    assert.ok(homepage.includes(`<html lang="${lang}" dir="${arabic ? 'rtl' : 'ltr'}">`));
    assert.match(homepage, /<main\b[^>]*>[\s\S]*<h1\b/);
    assert.ok(homepage.includes(`href="./${prefix}catalogue/"`));
    assert.ok(homepage.includes(`href="./${prefix}product/${product.id}/"`));
    assert.ok(catalogue.includes(escapeHtml(copy[lang].catalogTitle)));
    assert.equal((catalogue.match(/class="product-link"/g) ?? []).length, products.length);
    assert.doesNotMatch(homepage + catalogue + item, /href="#\//);
    assert.ok(item.includes(`>${escapeHtml(arabic ? product.nameAr : product.name)}</h1>`));
    assert.ok(item.includes(`href="./${prefix}calculator/?product=${product.id}"`));
    const alternate = `./${arabic ? '' : 'ar/'}product/${product.id}/`;
    assert.ok(item.includes(`data-action="language" href="${alternate}" hreflang="${arabic ? 'en' : 'ar'}"`));
    assert.ok(item.includes(`href="./${prefix}product/${product.id}/#main"`));

    const homeSchema = schemaGraph(homepage);
    const website = homeSchema.find(node => node['@type'] === 'WebSite');
    const business = homeSchema.find(node => node['@type'] === 'LocalBusiness');
    assert.equal(website.url, publishedSite);
    assert.deepEqual(website.inLanguage, ['en', 'ar']);
    assert.equal(website.publisher['@id'], business['@id']);
    assert.equal(business.name, arabic ? 'مطابع القريتين' : 'Al Qaryatin Press');
    assert.equal(business.address.addressCountry, 'SA');
    const breadcrumbs = schemaGraph(item).find(node => node['@type'] === 'BreadcrumbList');
    assert.deepEqual(breadcrumbs.itemListElement.map(crumb => crumb.item), [
      publishedSite + prefix, publishedSite + prefix + 'catalogue/', publishedSite + prefix + `product/${product.id}/`,
    ]);
  }
});

test('published pages and order controls use only the selected language', async () => {
  const paths = ['', 'catalogue/', 'calculator/', 'about/', 'cart/', ...products.map(product => `product/${product.id}/`)];
  const brochure = getProduct('brochures-and-flyers');
  const garmentPrinting = getProduct('dtf-garment-printing');

  function assertPageText(text, lang, context) {
    // Product reference codes are shared identifiers, rather than prose.
    const content = text.replace(/\bA[0-9]{4}\b/g, '').replace(/&(?:amp|quot|apos|lt|gt|nbsp|copy);/g, '');
    const wrongScript = lang === 'ar' ? /\p{Script=Latin}+/gu : /\p{Script=Arabic}+/gu;
    const unexpected = [...new Set(content.match(wrongScript) ?? [])];
    assert.deepEqual(unexpected, [], context);
  }

  function assertPageMarkup(markup, lang, context) {
    const tags = /<(?:[^"'<>]|"[^"]*"|'[^']*')+>/g;
    const prose = markup.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
    const labels = [...prose.matchAll(tags)].flatMap(([tag]) => (
      [...tag.matchAll(/\s(?:alt|aria-label|aria-description|label|placeholder|title)="([^"]*)"/g)]
        .map(([, value]) => value)
    ));
    assertPageText([prose.replace(tags, ' '), ...labels].join(' '), lang, context);
  }

  function configuredOrder(product) {
    return {
      productId: product.id,
      preset: getPricePresets(product).length - 1,
      quantity: product.minimum,
      options: [],
      extraEnabled: false,
      extra: '',
    };
  }

  for (const lang of ['en', 'ar']) {
    const t = copy[lang];
    const arabic = lang === 'ar';
    const prefix = arabic ? 'ar/' : '';
    await Promise.all(paths.map(async path => {
      const route = prefix + path;
      assertPageMarkup(await documentMarkup(route), lang, route || '/');
    }));

    for (const product of products) {
      const state = configuredOrder(product);
      assertPageMarkup(calculatorPage(state, t, lang), lang, lang + ' calculator ' + product.id);
      const brief = makeBrief(product, state, t, lang);
      assert.ok(brief, product.id);
      assertPageText(brief, lang, lang + ' quote brief ' + product.id);
    }

    const cart = [brochure, garmentPrinting].reduce((items, product) => addCartItem(items, configuredOrder(product)), []);
    assert.equal(cart.length, 2);
    const message = orderMessage(cart, t, lang);
    assertPageText(message, lang, lang + ' WhatsApp order');
    assertPageMarkup(cartPage(cart, t, lang), lang, lang + ' populated cart');
    assert.ok(message.includes(arabic ? 'أ٤' : 'A4'));
    assert.ok(message.includes(arabic ? 'دي تي إف' : 'DTF garment printing'));

    const nav = header('home', t, lang);
    const name = arabic ? 'مطابع القريتين' : 'Al Qaryatin Press';
    assert.ok(nav.includes(name) && footer(t, lang).includes(name));
    assert.match(nav, arabic
      ? /<span class="language-label"[^>]*>الإنجليزية<\/span>/
      : /<span class="language-label"[^>]*>Arabic<\/span>/);
  }
});

test('catalogue cards show localized unit prices and product details show minimum-order totals', () => {
  const businessCards = getProduct('business-cards');
  const customCards = getProduct('custom-paper-cards');
  const products = [businessCards, customCards];

  assert.deepEqual(products.map(product => {
    const { minimum, maximum } = getUnitPriceRange(product);
    return [minimum, maximum];
  }), [[0.2, 0.2], [0.1125, 0.375]]);

  const amounts = text => text.match(/\p{Decimal_Number}+(?:[.٫]\p{Decimal_Number}+)?/gu);
  for (const lang of ['en', 'ar']) {
    const t = copy[lang];
    const locale = lang === 'ar' ? 'ar-SA' : 'en-SA';
    const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 5 });
    const fixed = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const cards = productGrid(products, t, lang);
    const prices = [...cards.matchAll(/id="price-([^"]+)"><span>([^<]+)<\/span><bdi>([^<]+)<\/bdi>/g)];
    assert.deepEqual(prices.map(price => [price[1], price[2], amounts(price[3])]), [
      [businessCards.id, t.unitPrice, [fixed.format(0.2)]],
      [customCards.id, t.unitPrice, [decimal.format(0.1125), decimal.format(0.375)]],
    ]);

    const orderAmounts = [[100], [11.25, 37.5]];
    for (const [index, product] of products.entries()) {
      const detail = productDetail(product, t, lang, []);
      assert.ok(detail.includes('<p class="price-caption">' + t.priceRange + '</p>'));
      const total = detail.match(/<bdi class="product-price">([^<]+)<\/bdi>/)?.[1];
      assert.ok(total, product.id);
      assert.deepEqual(amounts(total), orderAmounts[index].map(amount => decimal.format(amount)));
    }
  }
});

test('every published size matches the product detail price at the minimum quantity', () => {
  const excluded = ['rate', 'unit', 'sellingUnit', 'formula', 'conversionValue', 'dimensions'];
  for (const product of products) {
    assert.ok(excluded.every(key => !Object.hasOwn(product, key)), product.id);
    const presets = getPricePresets(product);
    assert.equal(presets.length, 3, product.id);
    const amounts = presets.map((preset, index) => {
      assert.ok(preset.size && preset.sizeAr, product.id);
      assert.ok(!Object.hasOwn(preset, 'quantity'), product.id);
      const quote = calculateQuote(product, { preset: index });
      assert.equal(quote.status, 'estimate', product.id);
      assert.equal(quote.quantity, product.minimum, product.id);
      assert.equal(quote.quantityMultiplier, 1, product.id);
      assert.ok(quote.subtotal > 0, product.id);
      return quote.subtotal;
    });
    const range = getPriceRange(product);
    assert.equal(range.minimum, Math.min(...amounts), product.id);
    assert.equal(range.maximum, Math.max(...amounts), product.id);
  }
});

test('catalogue small-order tiers apply at their exact quantity boundaries', () => {
  const tiers = new Map([
    [2, [20, 4, 100]], [6, [20, 4, 100]], [7, [20, 4, 100]], [8, [20, 4, 100]],
    [12, [1, 2, 10]], [13, [1, 2, 10]], [14, [2, 2, 10]],
    [22, [100, 4, 500]], [23, [100, 4, 500]], [24, [1, 1.5, 10]], [25, [1, 1.5, 10]],
    [26, [1, 1.2, 10]], [27, [1, 1.2, 10]], [43, [20, 3, 100]],
    [47, [100, 2, 1000]], [48, [100, 2, 1000]], [50, [1, 2, 20]],
    [57, [5, 1.5, 10]], [58, [1, 1.5, 10]], [72, [100, 2, 1000]], [73, [20, 3, 100]],
  ]);
  assert.deepEqual(products.filter(product => getSmallOrderTier(product)).map(product => product.row), [...tiers.keys()]);

  for (const product of products) {
    const expected = tiers.get(product.row);
    if (!expected) {
      assert.equal(getSmallOrderTier(product), null, product.id);
      continue;
    }

    const [minimum, multiplier, standardMinimum] = expected;
    assert.equal(product.minimum, standardMinimum, product.id);
    assert.equal(product.maximum, 100000, product.id);
    assert.deepEqual(getSmallOrderTier(product), { minimum, multiplier }, product.id);
    const quantities = new Map([
      [minimum, multiplier],
      [standardMinimum - 1, multiplier],
      [standardMinimum, 1],
      [product.maximum, 1],
    ]);
    for (const [preset, { unitPrice }] of getPricePresets(product).entries()) {
      for (const [quantity, expectedMultiplier] of quantities) {
        const quote = calculateQuote(product, { quantity, preset });
        const context = `${product.id} size ${preset} quantity ${quantity}`;
        const subtotal = Math.round((unitPrice * quantity * expectedMultiplier) * 100 + 1e-9) / 100;
        assert.equal(quote.status, 'estimate', context);
        assert.equal(quote.quantity, quantity, context);
        assert.equal(quote.quantityMultiplier, expectedMultiplier, context);
        assert.equal(quote.subtotal, subtotal, context);
      }
    }
    const belowTier = calculateQuote(product, { quantity: minimum - 1 });
    assert.equal(belowTier.status, minimum === 1 ? 'invalid' : 'review', product.id);
    assert.equal(belowTier.subtotal, null, product.id);
    assert.equal(belowTier.quantityMultiplier, null, product.id);
    assert.equal(calculateQuote(product, { quantity: product.maximum + 1 }).status, 'invalid', product.id);
  }

  const untiered = getProduct('business-cards');
  const belowRegular = calculateQuote(untiered, { quantity: 499 });
  assert.equal(belowRegular.status, 'review');
  assert.equal(belowRegular.subtotal, null);
  assert.equal(belowRegular.quantityMultiplier, null);
  const regular = calculateQuote(untiered);
  assert.equal(regular.quantity, 500);
  assert.equal(regular.quantityMultiplier, 1);
  assert.equal(regular.subtotal, 100);
});

test('small-order pricing accepts localized quantities and combines separate finish charges once', () => {
  const cards = getProduct('custom-paper-cards');
  const base = calculateQuote(cards, { preset: 0, quantity: 20 });
  assert.equal(base.quantityMultiplier, 4);
  assert.equal(base.subtotal, 9);
  for (const quantity of ['20', '٢٠', '۲۰']) {
    assert.deepEqual(calculateQuote(cards, { preset: 0, quantity }), base);
  }
  const doubleSided = calculateQuote(cards, { preset: 0, quantity: '٢٠', options: ['double-sided-printing'] });
  assert.equal(doubleSided.quantityMultiplier, 4);
  assert.equal(doubleSided.subtotal, 18);

  const stickers = getProduct('paper-cup-stickers');
  // The size option is already represented in the selected preset rate of SAR 0.48.
  const selectedSize = calculateQuote(stickers, { quantity: '١٠٠', options: ['cup-size-9'] });
  assert.equal(selectedSize.preset.unitPrice, 0.48);
  assert.equal(selectedSize.quantityMultiplier, 2);
  assert.equal(selectedSize.subtotal, 96);
  assert.deepEqual(calculateQuote(stickers, { preset: 1, quantity: 100 }), selectedSize);
});

test('volume-based specifications use the workbook conversion for every size', () => {
  const productRates = [
    ['paper-boxes', [0.25, 0.54, 1.408], [250, 540, 1408]],
    ['paper-bags', [0.09504, 0.216, 0.41472], [95.04, 216, 414.72]],
    ['acrylic-desk-nameplate', [0.45, 1.6, 3.6], [0.45, 1.6, 3.6]],
    ['custom-acrylic-award', [1.5, 4, 7.5], [1.5, 4, 7.5]],
  ];
  for (const [id, rates, totals] of productRates) {
    const product = getProduct(id);
    const presets = getPricePresets(product);
    assert.deepEqual(presets.map(preset => preset.unitPrice), rates, id);
    assert.deepEqual(getUnitPriceRange(product), { minimum: rates[0], maximum: rates.at(-1) }, id);
    assert.deepEqual(presets.map((_, preset) => calculateQuote(product, { preset }).subtotal), totals, id);
  }
});

test('every size preserves a supplied quantity', () => {
  for (const product of products) {
    const quantity = Math.min(product.minimum + 7, product.maximum);
    for (const [preset, specification] of getPricePresets(product).entries()) {
      const quote = calculateQuote(product, { preset, quantity });
      assert.equal(quote.status, 'estimate', product.id);
      assert.equal(quote.quantity, quantity, product.id);
      assert.deepEqual(quote.preset, specification, product.id);
    }
  }
});

test('the calculator rounds the order total and keeps custom quotes separate', () => {
  const businessCards = calculateQuote(getProduct('business-cards'), { quantity: 500 });
  const rollUp = calculateQuote(getProduct('roll-up-display-stands'), { quantity: 1, preset: 1, options: ['medium-size'] });
  const cards = calculateQuote(getProduct('custom-paper-cards'), { preset: 0, quantity: 100 });
  const paperBoxes = calculateQuote(getProduct('paper-boxes'), { quantity: 1000, preset: 0 });
  const customBoxes = calculateQuote(getProduct('paper-boxes'), { quantity: 1000, preset: 0, customRequirements: true });
  assert.equal(businessCards.subtotal, 100);
  assert.equal(rollUp.quantityMultiplier, 1);
  assert.equal(rollUp.subtotal, 182);
  assert.equal(cards.subtotal, 11.25);
  assert.equal(paperBoxes.subtotal, 250);
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
  assert.deepEqual(summarizeCart(before), { estimatedSubtotal: 138.6, reviewCount: 0 });

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
  const legacy = { productId: 'business-cards', preset: 2, quantity: 2000, options: [], extraEnabled: false, extra: '' };
  stored = JSON.stringify([...cart, legacy]);
  assert.deepEqual(readCart(storage), [...cart, legacy]);
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

test('persisted cart items and bilingual briefs reprice when the quantity crosses a tier', () => {
  const product = getProduct('custom-paper-cards');
  const saved = [{
    productId: product.id, preset: 0, quantity: 20, options: [], extraEnabled: false, extra: '',
  }];
  const cart = readCart({ getItem: () => JSON.stringify(saved) });
  assert.deepEqual(cart, saved);
  assert.deepEqual(summarizeCart(cart), { estimatedSubtotal: 9, reviewCount: 0 });

  const regular = updateCartQuantity(cart, 0, '١٠٠');
  assert.deepEqual(summarizeCart(regular), { estimatedSubtotal: 11.25, reviewCount: 0 });
  const unsupported = updateCartQuantity(cart, 0, '١٩');
  assert.deepEqual(summarizeCart(unsupported), { estimatedSubtotal: null, reviewCount: 1 });

  for (const lang of ['en', 'ar']) {
    const t = copy[lang];
    const multiplier = lang === 'ar' ? '٤×' : '4×';
    const smallOrderLine = `${t.smallOrderMultiplier} — ${multiplier}`;
    const lowTotal = `${t.ready} — ${money(9, lang)}`;
    const briefLines = makeBrief(product, cart[0], t, lang).split('\n');
    const orderLines = orderMessage(cart, t, lang).split('\n');
    assert.ok(briefLines.includes(lowTotal));
    assert.ok(briefLines.includes(smallOrderLine));
    assert.ok(orderLines.includes(lowTotal));
    assert.ok(orderLines.includes(smallOrderLine));
    for (const markup of [calculatorPage(cart[0], t, lang), cartPage(cart, t, lang)]) {
      assert.ok(markup.includes(money(9, lang)));
      assert.ok(markup.includes(t.smallOrderMultiplier));
      assert.ok(markup.includes(`<bdi dir="ltr">${multiplier}</bdi>`));
    }
    const details = productDetail(product, t, lang, []);
    assert.ok(details.includes(t.smallOrderPricing));
    assert.ok(details.includes(lang === 'ar' ? '٢٠–٩٩' : '20–99'));
    const regularMessage = orderMessage(regular, t, lang);
    assert.ok(regularMessage.split('\n').includes(`${t.ready} — ${money(11.25, lang)}`));
    assert.ok(!regularMessage.includes(t.smallOrderMultiplier));
    const reviewMessage = orderMessage(unsupported, t, lang);
    assert.ok(reviewMessage.includes(t.review));
    assert.ok(!reviewMessage.includes(t.ready));
    assert.ok(!reviewMessage.includes(t.smallOrderMultiplier));
  }
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
    const quantityLine = t.quantity + (localized ? ' — ٢٥٠' : ' — 250');
    const specification = localized ? '١٠ × ٧ سم' : '10 × 7 cm';
    const specificationLine = `${t.preset} — ${specification}`;
    assert.ok(message.split('\n').includes(quantityLine));
    assert.ok(message.split('\n').includes(specificationLine));
    assert.equal(describeCartItem(cart[0], t, lang).presetLabel, specification);
    const brief = makeBrief(primary, cart[0], t, lang).split('\n');
    assert.ok(brief.includes(quantityLine));
    assert.ok(brief.includes(specificationLine));
    assert.ok(message.includes(describeCartItem(cart[0], t, lang).optionLabels[0]));
    assert.ok(message.includes(describeCartItem(cart[1], t, lang).optionLabels[0]));
    assert.ok(message.includes(note.replace('\uD800', '\uFFFD')));
    assert.ok(message.includes(t.ready) && message.includes(t.review));
    assert.equal(whatsappOrderUrl([], t, lang), '');
  }
});

test('card collections and option lists preserve native list and selection semantics', () => {
  const product = getProduct('paper-boxes');
  const fixedSize = getProduct('business-cards');
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
    assert.ok(calculator.includes(lang === 'ar' ? 'المقاس أو المواصفة' : 'Size or specification'));
    assert.doesNotMatch(calculator, /preset-quantity/);
    const fixedSizeCalculator = calculatorPage({ ...state, productId: fixedSize.id, quantity: fixedSize.minimum }, t, lang);
    assert.equal((fixedSizeCalculator.match(/type="radio" name="preset"/g) ?? []).length, 1);
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

const tapeCategoryIds = categories.map(category => category.id);

function tapeIcons(markup) {
  return [...markup.matchAll(/data-tape-category="([^"]+)"/g)].map(match => match[1]);
}

function tapeWindows(markup) {
  const windows = [...markup.matchAll(/<div class="product-tape-window product-tape-(left|right)"[^>]*aria-hidden="true"[^>]*>/g)];
  assert.deepEqual(windows.map(window => window[1]), ['left', 'right']);
  return windows.map((window, index) => markup.slice(window.index, windows[index + 1]?.index));
}

test('the side tapes repeat matching categories and share a persistent localized pause control', async (t) => {
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
      querySelectorAll() { return []; },
    };
    return { root, button, classes, setLanguage: mountProductTape(root) };
  }

  const tape = createTape();
  const markup = tape.root.innerHTML;
  for (const window of tapeWindows(markup)) {
    assert.deepEqual(tapeIcons(window), [...tapeCategoryIds, ...tapeCategoryIds]);
  }
  const controls = { append(button) { this.button = button; } };
  tape.setLanguage('en', controls);
  assert.equal(controls.button, tape.button);
  assert.match(tape.button['aria-label'], /^Pause/);
  tape.button.click();
  assert.ok(tape.classes.has('is-paused'));
  assert.match(tape.button['aria-label'], /^Resume/);
  const localizedControls = { append(button) { this.button = button; } };
  tape.setLanguage('ar', localizedControls);
  assert.equal(localizedControls.button, tape.button);
  assert.match(tape.button['aria-label'], /^استئناف/);
  assert.equal(tape.root.innerHTML, markup);

  const restored = createTape();
  assert.ok(restored.classes.has('is-paused'));
  restored.button.click();
  assert.ok(!restored.classes.has('is-paused'));

  const index = await readFile(new URL('index.html', site), 'utf8');
  const css = await readFile(new URL('styles.css', site), 'utf8');
  assert.match(index, /id="product-tape" class="product-tape"><\/div>\s*<div id="app"/);
  assert.match(footer(copy.en, 'en'), /class="footer-tape-controls"/);
  const rail = css.match(/^\.product-tape-window\s*\{([^}]+)\}/m)?.[1] ?? '';
  assert.match(rail, /position:\s*fixed\s*;/);
  assert.match(rail, /inset-block:\s*[^;]+;|inset-block-start:\s*[^;]+;[\s\S]*inset-block-end:\s*[^;]+;/);
  assert.match(rail, /mask-image:\s*(?:linear-gradient\(|var\(--tape-fade\))/);
  assert.doesNotMatch(rail, /block-size:\s*min\(/);
  assert.match(css, /\.product-tape-right\s+\.product-tape-track\s*\{[^}]*\breverse\b/);
  const mobile = css.match(/@media\s*\(max-width:\s*650px\)\s*\{([\s\S]*?)^\}/m)?.[1] ?? '';
  assert.match(mobile, /\.product-tape(?:-window)?\s*(?:,[^{]+)?\{[^}]*display:\s*none/);
  assert.match(css, /@keyframes product-waterfall\s*\{\s*from\s*\{\s*transform:\s*translateY\(calc\(-1\s*\*\s*var\(--tape-category-count\)\s*\*\s*var\(--tape-pitch\)\)\)[\s\S]*to\s*\{\s*transform:\s*translateY\(0\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.product-tape-track \{ animation: none;/);
});

test('both tapes independently repeat enough icon cycles to cover the canvas', (t) => {
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

  function createRail(height, runHeight) {
    const rail = { height, runHeight, markup: '', writes: 0 };
    rail.track = {
      firstElementChild: { getBoundingClientRect: () => ({ height: rail.runHeight }) },
      get childElementCount() { return [...rail.markup.matchAll(/class="product-tape-run"/g)].length; },
      set innerHTML(value) {
        rail.markup = value;
        rail.writes++;
      },
    };
    rail.viewport = {
      firstElementChild: rail.track,
      getBoundingClientRect: () => ({ height: rail.height }),
    };
    return rail;
  }
  const left = createRail(1361, 340);
  const right = createRail(540, 270);
  const button = { setAttribute() {}, addEventListener() {} };
  const root = {
    classList: { toggle() {} },
    set innerHTML(markup) {
      assert.match(markup, new RegExp(`style="--tape-category-count:\\s*${categories.length};?"`));
      [left.markup, right.markup] = tapeWindows(markup);
    },
    querySelector(selector) {
      assert.equal(selector, '.product-tape-toggle');
      return button;
    },
    querySelectorAll(selector) {
      assert.equal(selector, '.product-tape-window');
      return [left.viewport, right.viewport];
    },
  };
  function assertRuns(rail, count) {
    assert.equal(rail.track.childElementCount, count);
    assert.deepEqual(tapeIcons(rail.markup), Array.from({ length: count }, () => tapeCategoryIds).flat());
    assert.ok((count - 1) * rail.runHeight >= rail.height,
      'The tape covers its window even when translated up by one full cycle.');
  }

  mountProductTape(root);
  assert.deepEqual(observed, [left.viewport, right.viewport]);
  const entries = observed.map(target => ({ target }));
  onResize(entries);
  assertRuns(left, 6);
  assertRuns(right, 3);
  onResize(entries);
  assert.deepEqual([left.writes, right.writes], [1, 1]);

  right.height = 200;
  onResize([{ target: right.viewport }]);
  assertRuns(right, 2);
  assertRuns(left, 6);
  assert.deepEqual([left.writes, right.writes], [1, 2]);
});
