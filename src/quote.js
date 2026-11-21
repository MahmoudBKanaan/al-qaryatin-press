import { isAvailable, isOptionAvailable } from './catalog.js';
import { pricePresets } from './price-presets.js';

const messages = {
  product: ['Choose a product from the catalogue.', 'اختر منتجًا من القائمة.'],
  unavailable: ['This product is currently unavailable.', 'هذا المنتج غير متاح حاليًا.'],
  preset: ['Choose one of the example order sizes.', 'اختر أحد مقاسات الطلب المقترحة.'],
  quantity: ['Enter a positive whole-number quantity.', 'أدخل كمية صحيحة أكبر من صفر.'],
  aboveMaximum: ['Reduce the quantity to the catalogue maximum.', 'خفّض الكمية إلى الحد الأقصى المدوّن في الكتالوج.'],
  belowMinimum: ['Ask the press to confirm whether this quantity can be supplied and at what price.', 'تواصل مع المطبعة لتأكيد إمكانية تنفيذ هذه الكمية وسعرها.'],
  unknownOption: ['Confirm the requested option with the press.', 'أكّد الخيار المطلوب مع المطبعة.'],
  optionConflict: ['Select one alternative per finish or size.', 'اختر بديلًا واحدًا لكل مقاس أو تشطيب.'],
  combinedOptions: ['Ask the press how the selected options are priced together.', 'تواصل مع المطبعة لمعرفة سعر الخيارات المحددة عند جمعها.'],
  separateProduct: ['The selected add-on is priced separately.', 'تُسعَّر الإضافة المحددة بشكل منفصل.'],
  unavailableOption: ['The selected add-on is currently unavailable.', 'الإضافة المحددة غير متاحة حاليًا.'],
  unpricedOption: ['The catalogue leaves the price of this option open for confirmation.', 'يتطلب سعر هذا الخيار تأكيد المطبعة.'],
  customRequirements: ['Confirm the custom size or requirements and associated charges with the press.', 'أكّد المقاس المخصص أو المتطلبات الخاصة وتكاليفها مع المطبعة.'],
};

export function normalizeDigits(value) {
  return value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0));
}

function numericInput(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return Number.NaN;

  const normalized = normalizeDigits(value.trim())
    .replaceAll('٫', '.')
    .replaceAll('٬', ',')
    .replace(/(\d),(?=\d{3}(?:\D|$))/g, '$1');

  return /^\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : Number.NaN;
}

function subtotalInRiyals(unitPrice, quantity, multiplier = 1) {
  const total = unitPrice * quantity * multiplier;
  return Math.round((total + Number.EPSILON * total) * 100) / 100;
}

export function getPricePresets(product) {
  return isAvailable(product) ? pricePresets[product.row] ?? [] : [];
}

export function getPriceRange(product) {
  const presets = getPricePresets(product);
  if (!presets.length) return null;

  const totals = presets.map(item => subtotalInRiyals(item.unitPrice, item.quantity));
  return {
    minimum: Math.min(...totals),
    maximum: Math.max(...totals),
    small: presets[0],
    large: presets.at(-1),
  };
}

function optionIssue(option) {
  if (!isOptionAvailable(option)) return 'unavailableOption';
  if (Number.isFinite(option.multiplier)) return null;
  return option.productId ? 'separateProduct' : 'unpricedOption';
}

export function calculateQuote(product, {
  quantity,
  preset,
  options = [],
  customRequirements = false,
} = {}) {
  const presets = getPricePresets(product);
  const distinctIds = [...new Set(options)];
  const sizeSelections = presets.filter(item => item.optionId && distinctIds.includes(item.optionId));
  const selected = preset === undefined
    ? sizeSelections[0] ?? presets[0]
    : Number.isInteger(preset) ? presets[preset] : undefined;
  const count = numericInput(quantity ?? selected?.quantity);
  let baseSubtotal = null;
  let multiplier = null;

  function result(status, issueKeys = [], subtotal = null) {
    const uniqueIssues = [...new Set(issueKeys)];
    return {
      status,
      subtotal,
      baseSubtotal,
      quantity: Number.isFinite(count) ? count : null,
      preset: selected ?? null,
      multiplier,
      issues: uniqueIssues.map(key => messages[key][0]),
      issuesAr: uniqueIssues.map(key => messages[key][1]),
    };
  }

  if (!product) return result('invalid', ['product']);
  if (!isAvailable(product)) return result('unavailable', ['unavailable']);
  if (!selected) return result('invalid', ['preset']);
  if (!Number.isSafeInteger(count) || count < 1) return result('invalid', ['quantity']);
  if (count > product.maximum) return result('invalid', ['aboveMaximum']);
  if (sizeSelections.length > 1 || (sizeSelections[0] && sizeSelections[0] !== selected)) {
    return result('invalid', ['optionConflict']);
  }

  const extraIds = distinctIds.filter(id => id !== selected.optionId);
  const selectedOptions = product.options.filter(option => extraIds.includes(option.id));
  const selectedGroups = selectedOptions.map(option => option.group).filter(Boolean);
  if (new Set(selectedGroups).size !== selectedGroups.length) return result('invalid', ['optionConflict']);

  const issueKeys = [];
  if (count < product.minimum) issueKeys.push('belowMinimum');
  if (selectedOptions.length !== extraIds.length) issueKeys.push('unknownOption');
  if (typeof customRequirements === 'string' ? customRequirements.trim() : customRequirements) {
    issueKeys.push('customRequirements');
  }
  for (const option of selectedOptions) {
    const issue = optionIssue(option);
    if (issue) issueKeys.push(issue);
  }

  const pricedOptions = selectedOptions.filter(option => Number.isFinite(option.multiplier));
  if (pricedOptions.length > 1) issueKeys.push('combinedOptions');
  if (count >= product.minimum) baseSubtotal = subtotalInRiyals(selected.unitPrice, count);
  if (issueKeys.length) return result('review', issueKeys);

  multiplier = pricedOptions[0]?.multiplier ?? 1;
  return result('estimate', [], subtotalInRiyals(selected.unitPrice, count, multiplier));
}

export function formatSAR(value, locale = 'en-SA') {
  if (!Number.isFinite(value)) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
