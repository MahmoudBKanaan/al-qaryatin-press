import { getProduct, isAvailable } from './catalog.js';
import { calculateQuote } from './quote.js';
import { availableOptions, label, money, number } from './views.js';

const storageKey = 'qaryatin-cart';
const whatsappRecipient = '966568080265';

function normalizeItem(configuration) {
  if (!configuration || typeof configuration !== 'object') return null;
  const { productId, preset = 0, quantity, options = [], extraEnabled = false, extra = '' } = configuration;
  const product = getProduct(productId);
  if (!isAvailable(product) || !Array.isArray(options) ||
      (typeof quantity !== 'string' && typeof quantity !== 'number')) return null;

  const allowedOptions = new Set(availableOptions(product).map(option => option.id));
  const optionIds = [...new Set(options)];
  if (optionIds.some(id => !allowedOptions.has(id))) return null;

  const item = {
    productId,
    preset,
    quantity,
    options: optionIds.sort(),
    extraEnabled: extraEnabled === true,
    extra: extraEnabled === true && typeof extra === 'string' ? extra.slice(0, 1200).trim() : '',
  };
  const result = calculateQuote(product, { ...item, customRequirements: item.extraEnabled });
  return result.status === 'estimate' || result.status === 'review' ? { ...item, quantity: result.quantity } : null;
}

export function readCart(storage) {
  try {
    const saved = JSON.parse((storage ?? globalThis.localStorage)?.getItem(storageKey) ?? '[]');
    return Array.isArray(saved) ? saved.map(normalizeItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function persistCart(storage, cart) {
  try {
    (storage ?? globalThis.localStorage)?.setItem(storageKey, JSON.stringify(cart));
  } catch {
    // Keep the in-memory cart available when browser storage is disabled or full.
  }
}

export function addCartItem(cart, configuration) {
  const incoming = normalizeItem(configuration);
  if (!incoming) return null;

  const index = cart.findIndex(item => item.productId === incoming.productId && item.preset === incoming.preset &&
    item.extraEnabled === incoming.extraEnabled && item.extra === incoming.extra &&
    item.options.length === incoming.options.length && item.options.every((id, i) => id === incoming.options[i]));
  if (index < 0) return [...cart, incoming];
  return updateCartQuantity(cart, index, cart[index].quantity + incoming.quantity);
}

export function updateCartQuantity(cart, index, quantity) {
  const item = cart[index];
  if (!item) return null;
  const updated = normalizeItem({ ...item, quantity });
  return updated ? cart.map((entry, i) => i === index ? updated : entry) : null;
}

export function removeCartItem(cart, index) {
  return cart.filter((_, i) => i !== index);
}

export function describeCartItem(item, t, lang) {
  const product = getProduct(item.productId);
  const result = calculateQuote(product, { ...item, customRequirements: item.extraEnabled });
  const optionLabels = product.options.filter(option => item.options.includes(option.id))
    .map(option => label(option, 'label', lang));
  const presetName = [t.smallOrder, t.standardOrder, t.largeOrder][item.preset];
  const presetLabel = result.preset ? [presetName, label(result.preset, 'size', lang)].filter(Boolean).join(' · ') : '';
  const note = item.extraEnabled ? item.extra || t.reviewExtra : '';
  return { product, result, presetLabel, optionLabels, note };
}

export function summarizeCart(cart) {
  let estimatedCents = 0;
  let pricedCount = 0;
  let reviewCount = 0;
  for (const item of cart) {
    const result = calculateQuote(getProduct(item.productId), { ...item, customRequirements: item.extraEnabled });
    if (result.status === 'estimate') {
      estimatedCents += Math.round(result.subtotal * 100);
      pricedCount++;
    } else {
      reviewCount++;
    }
  }
  return { estimatedSubtotal: pricedCount ? estimatedCents / 100 : null, reviewCount };
}

export function orderMessage(cart, t, lang) {
  if (!cart.length) return '';

  const arabic = lang === 'ar';
  const greeting = arabic
    ? `مرحبًا ${t.copyright}، أود تقديم الطلب التالي.`
    : `Hello ${t.copyright}, I'd like to place the following order.`;
  const details = cart.map((item, index) => {
    const { product, result, presetLabel, optionLabels, note } = describeCartItem(item, t, lang);
    const lines = [
      `${number(index + 1, lang)}. ${label(product, 'name', lang)} (${product.code})`,
      `${t.quantity} — ${number(result.quantity, lang)}`,
      `${t.preset} — ${presetLabel}`,
      `${t.finishes} — ${optionLabels.join(arabic ? '، ' : ', ') || t.noOptions}`,
    ];
    if (note) lines.push(`${t.extra} — ${note}`);
    if (result.status === 'estimate') {
      lines.push(`${t.ready} — ${money(result.subtotal, lang)}`);
    } else {
      lines.push(t.review, ...(arabic ? result.issuesAr : result.issues));
      if (result.baseSubtotal !== null) lines.push(`${t.baseSubtotal} — ${money(result.baseSubtotal, lang)}`);
    }
    return lines.join('\n');
  });

  const { estimatedSubtotal, reviewCount } = summarizeCart(cart);
  const summary = [];
  if (estimatedSubtotal !== null) {
    const subtotalLabel = reviewCount
      ? arabic ? 'المجموع الفرعي التقديري للمنتجات المسعّرة' : 'Estimated subtotal for priced items'
      : arabic ? 'المجموع الفرعي التقديري' : 'Estimated subtotal';
    summary.push(`${subtotalLabel} — ${money(estimatedSubtotal, lang)}`);
  }
  if (reviewCount) {
    summary.push(arabic
      ? 'ستؤكد المطابع أسعار المنتجات التي تحتاج إلى مراجعة.'
      : 'The press will confirm the price for items that require review.');
  }
  return [greeting, ...details, summary.join('\n')].filter(Boolean).join('\n\n');
}

export function whatsappOrderUrl(cart, t, lang) {
  const message = orderMessage(cart, t, lang);
  if (!message) return '';

  const url = new URL(`https://wa.me/${whatsappRecipient}`);
  url.searchParams.set('text', message);
  return url.href.replaceAll('+', '%20');
}
