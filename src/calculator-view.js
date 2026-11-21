import { categories, isAvailable, products } from './catalog.js';
import { calculateQuote } from './quote.js';
import { icon } from './icons.js';
import { availableOptions, escapeHtml, label, localeId, money, number, pageHeading, priceUnit, productRoute, quantityUnit } from './views.js';

export function calculatorPage(state, t, lang) {
  const eligible = products.filter(isAvailable);
  const product = eligible.find(item => item.id === state.productId);
  const groups = categories.map(category => {
    const options = eligible.filter(item => item.category === category.id).sort((a, b) =>
      label(a, 'name', lang).localeCompare(label(b, 'name', lang), localeId(lang)));
    if (!options.length) return '';
    return `<optgroup label="${escapeHtml(label(category, 'label', lang))}">${options.map(item =>
      `<option value="${item.id}" ${product?.id === item.id ? 'selected' : ''}>${escapeHtml(label(item, 'name', lang))} · ${item.code}</option>`).join('')}</optgroup>`;
  }).join('');

  return `${pageHeading(t.calculatorTitle, t.calculatorText)}
    <div class="wrap calculator-layout">
      <section class="surface form-card">
        <div class="form-heading"><span class="category-icon">${icon('calculator')}</span><h2>${t.configure}</h2></div>
        <form id="quote-form" autocomplete="off">
          <label class="field"><span>${t.product}</span><select id="quote-product" name="product"><option value="">${t.select}</option>${groups}</select></label>
          ${product ? orderFields(product, state, t, lang) : ''}
        </form>
      </section>
      <div id="quote-summary" aria-live="polite">${quoteSummary(product, state, t, lang)}</div>
    </div>`;
}

function orderFields(product, state, t, lang) {
  const options = availableOptions(product);
  const optionGroups = new Map();
  const standalone = [];
  for (const option of options) {
    if (!option.group) standalone.push(option);
    else {
      if (!optionGroups.has(option.group)) optionGroups.set(option.group, []);
      optionGroups.get(option.group).push(option);
    }
  }
  const measurements = product.dimensions.some(item => item.kind === 'measurement');
  const dimensions = product.dimensions;
  const optionText = option => escapeHtml(label(option, 'label', lang)) +
    (option.dimensions ? ' · ' + escapeHtml(option.dimensions) : '') + ' · ' + escapeHtml(option.value);
  const isSelected = option => state.options.includes(option.id);
  const groupLabel = group => group === 'size' ? (lang === 'ar' ? 'المقاس' : 'Size') : (lang === 'ar' ? 'السلفان' : 'Lamination');

  return `<label class="field"><span>${t.quantity}</span><input id="quote-quantity" name="quantity" inputmode="numeric" value="${escapeHtml(state.quantity)}" aria-describedby="qty-note"><small id="qty-note">${t.range} <bdi>${number(product.minimum, lang)}–${number(product.maximum, lang)}</bdi> ${quantityUnit(product.maximum, t, lang)}. ${t.qtyHint}</small></label>
    ${dimensions.length ? `<fieldset class="field-block"><legend>${t.dim}</legend>
      ${measurements ? `<label class="field"><span>${t.unit}</span><select name="dimension-unit">${['cm', 'mm', 'm'].map(unit => `<option value="${unit}" ${state.dimensions.unit === unit ? 'selected' : ''}>${t[unit]}</option>`).join('')}</select></label>` : ''}
      <div class="dimension-grid">${dimensions.map(item => `<label class="field"><span>${escapeHtml(label(item, 'label', lang))}</span><input type="text" inputmode="${item.kind === 'measurement' ? 'decimal' : 'numeric'}" name="dimension-${item.id}" value="${escapeHtml(state.dimensions[item.id] || '')}" placeholder="${item.kind === 'measurement' ? '0.0' : '0'}"></label>`).join('')}</div>
    </fieldset>` : ''}
    ${options.length ? `<fieldset class="field-block"><legend>${t.finishes}</legend>
      ${[...optionGroups].map(([group, items]) => `<label class="field"><span>${groupLabel(group)}</span><select name="group-${group}"><option value="">${t.noOptions}</option>
        ${items.map(option => `<option value="${option.id}" ${isSelected(option) ? 'selected' : ''}>${optionText(option)}</option>`).join('')}</select></label>`).join('')}
      ${standalone.map(option => `<label class="check-row"><input type="checkbox" name="option" value="${option.id}" ${isSelected(option) ? 'checked' : ''}><span>${optionText(option)}</span></label>`).join('')}
    </fieldset>` : ''}
    <label class="check-row extra-choice"><input type="checkbox" name="extra-enabled" ${state.extraEnabled ? 'checked' : ''}><span>${t.reviewExtra}</span></label>
    <label class="field extra-field" ${state.extraEnabled ? '' : 'hidden'}><span>${t.extra}</span><textarea name="extra" rows="3" maxlength="1200" placeholder="${t.extraPlaceholder}">${escapeHtml(state.extra)}</textarea></label>`;
}

export function quoteSummary(product, state, t, lang) {
  if (!product) {
    return `<section class="surface estimate-card"><p class="eyebrow">${t.summary}</p><div class="estimate-empty"><span class="category-icon">${icon('receipt')}</span><h2>${t.pending}</h2><p>${t.pendingText}</p></div></section>`;
  }
  const result = calculateQuote(product, { ...state, customRequirements: state.extraEnabled });
  const title = { estimate: t.ready, review: t.review, invalid: t.invalid, unavailable: t.unavailable }[result.status];
  const issues = lang === 'ar' ? result.issuesAr : result.issues;
  const hasSubtotal = result.subtotal !== null;
  const knownBase = !hasSubtotal && result.baseSubtotal !== null;
  const canCopy = result.status === 'estimate' || result.status === 'review';

  return `<section class="surface estimate-card">
    <p class="eyebrow">${t.summary}</p>
    <div class="estimate-product"><img src="${product.image}" alt="" width="92" height="70"><div><a href="${productRoute(product.id)}">${escapeHtml(label(product, 'name', lang))}</a><small><bdi>${product.code}</bdi></small></div></div>
    <div class="estimate-live">
      <dl class="estimate-lines">
        <div><dt>${t.rate}</dt><dd><bdi>${money(product.rate, lang)}</bdi> / ${priceUnit(product.unit, t)}</dd></div>
        ${result.quantity !== null ? `<div><dt>${t.quantity}</dt><dd>${number(result.quantity, lang)}</dd></div>` : ''}
        ${result.multiplier && result.multiplier !== 1 ? `<div><dt>${t.multiplier}</dt><dd><bdi>×${number(result.multiplier, lang)}</bdi></dd></div>` : ''}
        ${knownBase ? `<div><dt>${t.baseSubtotal}</dt><dd><bdi>${money(result.baseSubtotal, lang)}</bdi></dd></div>` : ''}
      </dl>
      <div class="estimate-result ${hasSubtotal ? 'has-subtotal' : ''}"><h2>${hasSubtotal ? '' : icon('info')}${title}</h2>
        ${hasSubtotal ? `<p class="result-price"><bdi>${money(result.subtotal, lang)}</bdi></p>` : ''}
        ${issues.length ? `<ul>${issues.map(issue => `<li>${escapeHtml(issue)}</li>`).join('')}</ul>` : ''}
      </div>
    </div>
    ${product.formula ? `<details class="formula"><summary>${t.formula}</summary><bdi>${escapeHtml(product.formula)}</bdi></details>` : ''}
    <p class="estimate-note">${t.estimateNote}</p>
    ${canCopy ? `<button type="button" class="button button-primary copy-brief" data-action="brief">${icon('file')}${t.showBrief}</button>` : ''}
  </section>`;
}

export function makeBrief(product, state, t, lang) {
  const result = calculateQuote(product, { ...state, customRequirements: state.extraEnabled });
  if (result.status !== 'estimate' && result.status !== 'review') return '';
  const dimensionLines = product.dimensions.filter(item => state.dimensions[item.id]).map(item =>
    label(item, 'label', lang) + ': ' + state.dimensions[item.id] + (item.kind === 'measurement' ? ' ' + state.dimensions.unit : ''));
  const items = [
    t.brief + ' · ' + t.copyright,
    t.product + ': ' + label(product, 'name', lang) + ' (' + product.code + ')',
    t.quantity + ': ' + number(result.quantity, lang),
    ...dimensionLines,
  ];
  if (state.options.length) {
    const options = product.options.filter(option => state.options.includes(option.id));
    items.push(t.finishes + ': ' + options.map(option => label(option, 'label', lang)).join(', '));
  }
  if (state.extraEnabled) items.push(t.extra + ': ' + (state.extra.trim() || t.reviewExtra));
  if (result.status === 'estimate') items.push(t.ready + ': ' + money(result.subtotal, lang));
  else items.push(t.review + '.', ...(lang === 'ar' ? result.issuesAr : result.issues));
  return items.join('\n');
}
