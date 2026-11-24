import { describeCartItem, orderMessage, summarizeCart, whatsappOrderUrl } from './cart.js';
import { icon } from './icons.js';
import { escapeHtml, label, money, number, pageHeading, priceMultiplier, productRoute, route } from './views.js';

export const cartCopy = {
  en: {
    intro: 'Review your items and send the order to the press on WhatsApp.',
    empty: 'Your cart is empty',
    emptyText: 'Browse the catalogue to find products for your order.',
    continue: 'Continue shopping',
    items: 'Items in your cart',
    remove: 'Remove',
    removed: 'Item removed from your cart.',
    invalidQuantity: 'Enter a valid whole-number quantity for this product.',
    summary: 'Order summary',
    estimated: 'Estimated subtotal',
    partial: 'Estimated subtotal for priced items',
    review: 'The press will confirm the price for items that require review.',
    order: 'Order',
    help: 'WhatsApp opens with your order ready to send.',
    preview: 'Preview WhatsApp message',
  },
  ar: {
    intro: 'راجع منتجاتك وأرسل تفاصيل الطلب إلى المطابع عبر واتساب.',
    empty: 'سلتك فارغة',
    emptyText: 'تصفّح الكتالوج لاختيار منتجات طلبك.',
    continue: 'تابع التسوق',
    items: 'المنتجات في سلتك',
    remove: 'إزالة',
    removed: 'تمت إزالة المنتج من السلة.',
    invalidQuantity: 'أدخل كمية صحيحة ومسموحًا بها لهذا المنتج.',
    summary: 'ملخص الطلب',
    estimated: 'المجموع الفرعي التقديري',
    partial: 'المجموع الفرعي التقديري للمنتجات المسعّرة',
    review: 'ستؤكد المطابع أسعار المنتجات التي تحتاج إلى مراجعة.',
    order: 'اطلب الآن',
    help: 'سيفتح واتساب وتظهر تفاصيل طلبك جاهزة للإرسال.',
    preview: 'معاينة رسالة واتساب',
  },
};

function itemEstimate(result, t, lang) {
  const estimate = Number.isFinite(result.subtotal)
    ? `<p class="cart-line-price"><span>${t.subtotal}</span><strong><bdi>${money(result.subtotal, lang)}</bdi></strong></p>`
    : `<p class="cart-review">${icon('info')}${t.review}</p>`;
  const multiplier = result.quantityMultiplier > 1
    ? `<p class="cart-line-price"><span>${t.smallOrderMultiplier} <bdi dir="ltr">${priceMultiplier(result.quantityMultiplier, lang)}</bdi></span></p>`
    : '';
  return estimate + multiplier;
}

function cartItem(item, index, t, lang, c) {
  const { product, result, presetLabel, optionLabels, note } = describeCartItem(item, t, lang);
  const productName = escapeHtml(label(product, 'name', lang));
  const titleId = `cart-item-title-${index}`;
  const quantityId = `cart-quantity-${index}`;

  return `<li class="surface cart-item m3-list-item">
    <div class="cart-item-product">
      <img src="${escapeHtml(product.image)}" width="96" height="72" loading="lazy" alt="">
      <div>
        <h2 class="cart-item-title" id="${titleId}"><a href="${productRoute(product.id, lang)}">${productName}</a></h2>
        <p class="cart-item-code"><bdi>${escapeHtml(product.code)}</bdi></p>
      </div>
    </div>
    <dl class="cart-item-details m3-list">
      <div class="m3-list-item"><dt>${t.preset}</dt><dd>${escapeHtml(presetLabel)}</dd></div>
      <div class="m3-list-item"><dt>${t.finishes}</dt><dd>${escapeHtml(optionLabels.join(lang === 'ar' ? '، ' : ', ') || t.noOptions)}</dd></div>
      ${note ? `<div class="m3-list-item cart-item-note"><dt>${t.extra}</dt><dd dir="auto">${escapeHtml(note)}</dd></div>` : ''}
    </dl>
    <div class="cart-item-actions">
      <label class="field cart-item-quantity">
        <span id="${quantityId}-label">${t.quantity}</span>
        <input id="${quantityId}" name="cart-quantity" data-cart-index="${index}" inputmode="numeric"
          value="${escapeHtml(number(item.quantity, lang))}" aria-labelledby="${quantityId}-label ${titleId}" autocomplete="off">
        <small class="cart-quantity-error" id="cart-quantity-error-${index}" hidden>${c.invalidQuantity}</small>
      </label>
      <div class="cart-item-estimate" data-cart-item-estimate="${index}">${itemEstimate(result, t, lang)}</div>
      <button type="button" class="button button-text cart-remove" data-action="remove-cart-item" data-cart-index="${index}"
        aria-label="${c.remove} ${productName}">${icon('close')}${c.remove}</button>
    </div>
  </li>`;
}

function cartTotals(cart, lang, c) {
  const { estimatedSubtotal, reviewCount } = summarizeCart(cart);
  return `${Number.isFinite(estimatedSubtotal) ? `<p class="cart-total">
      <span>${reviewCount ? c.partial : c.estimated}</span>
      <strong><bdi>${money(estimatedSubtotal, lang)}</bdi></strong>
    </p>` : ''}
    ${reviewCount ? `<p class="cart-review">${icon('info')}${c.review}</p>` : ''}`;
}

export function cartPage(cart, t, lang) {
  const c = cartCopy[lang];
  const heading = pageHeading(t.cartTitle, c.intro);
  if (!cart.length) {
    return `${heading}
      <div class="wrap cart-content"><section class="empty-state m3-empty-state">
        <span class="category-icon">${icon('packaging')}</span><h2>${c.empty}</h2><p>${c.emptyText}</p>
        <a class="button button-primary" href="${route('catalogue', undefined, lang)}">${t.catalog}</a>
      </section></div>`;
  }

  return `${heading}
    <div class="wrap cart-content cart-layout">
      <div>
        <ul class="cart-items m3-card-list" role="list" aria-label="${c.items}">
          ${cart.map((item, index) => cartItem(item, index, t, lang, c)).join('')}
        </ul>
        <a class="button button-tonal cart-continue" href="${route('catalogue', undefined, lang)}">${c.continue}</a>
      </div>
      <section class="surface cart-summary" aria-labelledby="cart-summary-title">
        <h2 id="cart-summary-title">${c.summary}</h2>
        <div class="cart-totals" aria-live="polite">${cartTotals(cart, lang, c)}</div>
        <a class="button button-primary cart-order" id="cart-order" href="${escapeHtml(whatsappOrderUrl(cart, t, lang))}"
          aria-describedby="cart-order-help">${icon('chat')}${c.order}</a>
        <p id="cart-order-help" class="cart-help">${c.help}</p>
        <details class="cart-message">
          <summary>${c.preview}</summary>
          <textarea id="cart-message-text" aria-label="${c.preview}" readonly rows="6">${escapeHtml(orderMessage(cart, t, lang))}</textarea>
        </details>
      </section>
    </div>`;
}

export function updateCartEstimate(root, cart, t, lang, index) {
  const { result } = describeCartItem(cart[index], t, lang);
  root.querySelector(`[data-cart-item-estimate="${index}"]`).innerHTML = itemEstimate(result, t, lang);
  root.querySelector('.cart-totals').innerHTML = cartTotals(cart, lang, cartCopy[lang]);
  root.querySelector('#cart-order').href = whatsappOrderUrl(cart, t, lang);
  root.querySelector('#cart-message-text').value = orderMessage(cart, t, lang);
}
