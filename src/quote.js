import { getProduct } from './catalog.js';

const dimensionUnits = new Set(['mm', 'cm', 'm']);
const messages = {
  product: ['Choose a product from the catalogue.', 'اختر منتجًا من القائمة.'],
  channel: ['Choose a customer type to check availability.', 'اختر نوع العميل للتحقق من التوفر.'],
  unavailable: ['This product is currently unavailable.', 'هذا المنتج غير متاح حاليًا.'],
  agency: ['This product is unavailable for agency orders.', 'هذا المنتج غير متاح لطلبات الوكالات.'],
  quantity: ['Enter a positive whole-number quantity.', 'أدخل كمية صحيحة أكبر من صفر.'],
  aboveMaximum: ['Reduce the quantity to the catalogue maximum.', 'خفّض الكمية إلى الحد الأقصى المدوّن في الكتالوج.'],
  belowMinimum: ['Ask the press to confirm whether this quantity can be supplied and at what price.', 'تواصل مع المطبعة لتأكيد إمكانية تنفيذ هذه الكمية وسعرها.'],
  unknownOption: ['Confirm the requested option with the press.', 'أكّد الخيار المطلوب مع المطبعة.'],
  optionConflict: ['Select one alternative per finish or size.', 'اختر بديلًا واحدًا لكل مقاس أو تشطيب.'],
  combinedOptions: ['Ask the press how the selected options are priced together.', 'تواصل مع المطبعة لمعرفة سعر الخيارات المحددة عند جمعها.'],
  separateProduct: ['The selected add-on is priced separately.', 'تُسعَّر الإضافة المحددة بشكل منفصل.'],
  unavailableOption: ['The selected add-on is currently unavailable for this customer type.', 'الإضافة المحددة غير متاحة حاليًا لنوع العميل هذا.'],
  unpricedOption: ['The catalogue leaves the price of this option open for confirmation.', 'يتطلب سعر هذا الخيار تأكيد المطبعة.'],
  customRequirements: ['Confirm the special requirements and associated charges with the press.', 'أكّد المتطلبات الخاصة وتكاليفها مع المطبعة.'],
  missingDimensions: ['Enter the applicable measurements and counts for the press to review.', 'أدخل الأبعاد والأعداد المطلوبة لتراجعها المطبعة.'],
  dimensionalPricing: ['The press needs to confirm the measurement and count basis before pricing this product.', 'تحتاج المطبعة إلى تأكيد طريقة القياس والعد قبل تسعير هذا المنتج.'],
};

function numericInput(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return Number.NaN;

  const normalized = value.trim()
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0))
    .replaceAll('٫', '.')
    .replaceAll('٬', ',')
    .replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, '');

  return /^\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : Number.NaN;
}

function completeDimensions(product, dimensions) {
  return product.dimensions.every(({ id, kind }) => {
    const value = numericInput(dimensions[id]);
    if (!Number.isFinite(value) || value <= 0) return false;

    return kind === 'count' ? Number.isSafeInteger(value) : dimensionUnits.has(dimensions[id + 'Unit'] ?? dimensions.unit);
  });
}

function subtotalInRiyals(rate, quantity, multiplier = 1) {
  return Math.round(rate * quantity * multiplier * 100) / 100;
}

function optionIssue(option, channel) {
  if (option.multiplier !== null) return null;
  if (!option.productId) return 'unpricedOption';

  const extra = getProduct(option.productId);
  const available = extra?.available && (channel === 'retail' || extra.agencyAvailable);
  return available ? 'separateProduct' : 'unavailableOption';
}

export function calculateQuote(product, {
  quantity,
  channel = 'retail',
  options = [],
  dimensions = {},
  customRequirements = false,
} = {}) {
  const count = numericInput(quantity);
  const displayedRate = product?.rate ?? null;
  let baseSubtotal = null;
  let multiplier = null;

  function result(status, issueKeys = [], subtotal = null) {
    const uniqueIssues = [...new Set(issueKeys)];

    return {
      status,
      subtotal,
      baseSubtotal,
      quantity: Number.isFinite(count) ? count : null,
      rate: displayedRate,
      unit: product?.unit ?? null,
      multiplier,
      issues: uniqueIssues.map(key => messages[key][0]),
      issuesAr: uniqueIssues.map(key => messages[key][1]),
    };
  }

  if (!product) return result('invalid', ['product']);
  if (channel !== 'retail' && channel !== 'agency') return result('invalid', ['channel']);
  if (!product.available) return result('unavailable', ['unavailable']);
  if (channel === 'agency' && !product.agencyAvailable) return result('unavailable', ['agency']);
  if (!Number.isSafeInteger(count) || count < 1) return result('invalid', ['quantity']);
  if (count > product.maximum) return result('invalid', ['aboveMaximum']);

  const distinctIds = [...new Set(options)];
  const selectedOptions = product.options.filter(option => distinctIds.includes(option.id));
  const selectedGroups = selectedOptions.map(option => option.group).filter(Boolean);
  if (new Set(selectedGroups).size !== selectedGroups.length) return result('invalid', ['optionConflict']);

  const issueKeys = [];
  if (count < product.minimum) issueKeys.push('belowMinimum');
  if (selectedOptions.length !== distinctIds.length) issueKeys.push('unknownOption');
  if (typeof customRequirements === 'string' ? customRequirements.trim() : customRequirements) {
    issueKeys.push('customRequirements');
  }
  for (const option of selectedOptions) {
    const issue = optionIssue(option, channel);
    if (issue) issueKeys.push(issue);
  }

  const pricedOptions = selectedOptions.filter(option => option.multiplier !== null);
  if (pricedOptions.length > 1) issueKeys.push('combinedOptions');

  if (product.unit !== 'piece') {
    if (!completeDimensions(product, dimensions)) issueKeys.push('missingDimensions');
    issueKeys.push('dimensionalPricing');
    return result('review', issueKeys);
  }

  if (count >= product.minimum) baseSubtotal = subtotalInRiyals(product.rate, count);
  if (issueKeys.length) return result('review', issueKeys);

  multiplier = pricedOptions[0]?.multiplier ?? 1;
  const subtotal = subtotalInRiyals(product.rate, count, multiplier);
  return result('estimate', [], subtotal);
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

