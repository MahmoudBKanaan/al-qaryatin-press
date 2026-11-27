import { getSmallOrderTier, isAvailable, isOptionAvailable } from './catalog.js';
import { pricePresets } from './price-presets.js';

const messages = {
  product: ['Choose a product from the catalogue.', 'اختر منتجًا من القائمة.'],
  unavailable: ['This product is currently unavailable.', 'هذا المنتج غير متاح حاليًا.'],
  preset: ['Choose a size or specification.', 'اختر مقاسًا أو مواصفة.'],
  quantity: ['Enter a positive whole-number quantity.', 'أدخل كمية صحيحة أكبر من صفر.'],
  aboveMaximum: ['Reduce the quantity to the catalogue maximum.', 'خفّض الكمية إلى الحد الأقصى المدوّن في الكتالوج.'],
  belowMinimum: ['Ask the press to confirm whether this quantity can be supplied and at what price.', 'تواصل مع المطبعة لتأكيد إمكانية تنفيذ هذه الكمية وسعرها.'],
  belowMinimumArea: ['Increase the quantity or choose a larger size to meet the minimum order area. The press can review smaller orders.', 'زد الكمية أو اختر مقاسًا أكبر لبلوغ الحد الأدنى لمساحة الطلب. يمكن للمطبعة مراجعة الطلبات الأصغر.'],
  aboveStandardArea: ['This size is above the standard size limit and requires a quote from the press.', 'يتجاوز هذا المقاس الحد القياسي ويتطلب عرض سعر من المطبعة.'],
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

export function isStandardPreset(product, preset) {
  return Boolean(preset) && (!Number.isFinite(product?.maximumStandardAreaCm2) ||
    !Number.isFinite(preset.areaCm2) || preset.areaCm2 <= product.maximumStandardAreaCm2);
}

export function getAreaMinimumQuantity(product, preset) {
  const minimum = product?.minimumOrderAreaCm2;
  if (!Number.isFinite(minimum) || minimum <= 0) return 1;

  const area = preset?.areaCm2;
  if (!Number.isFinite(area) || area <= 0) return Infinity;
  return Math.ceil(minimum / area);
}

function getStandardMinimumQuantity(product, preset) {
  return Math.max(product.minimum, getAreaMinimumQuantity(product, preset));
}

function getStandardConfigurations(product) {
  return getPricePresets(product).flatMap((preset, presetIndex) => {
    const quantity = getStandardMinimumQuantity(product, preset);
    if (!isStandardPreset(product, preset) || quantity > product.maximum) return [];
    return [{ preset, presetIndex, quantity }];
  });
}

export function getStandardOrder(product) {
  let order = null;
  for (const { presetIndex, quantity } of getStandardConfigurations(product)) {
    if (!order || quantity < order.quantity) order = { presetIndex, quantity };
  }
  return order;
}

export function getUnitPriceRange(product) {
  const prices = getStandardConfigurations(product).map(({ preset }) => preset.unitPrice);
  if (!prices.length) return null;
  return { minimum: Math.min(...prices), maximum: Math.max(...prices) };
}

export function getPriceRange(product) {
  const configurations = getStandardConfigurations(product);
  if (!configurations.length) return null;

  const totals = configurations.map(({ preset, quantity }) => subtotalInRiyals(preset.unitPrice, quantity));
  return {
    minimum: Math.min(...totals),
    maximum: Math.max(...totals),
    small: configurations[0].preset,
    large: configurations.at(-1).preset,
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
    ? sizeSelections[0] ?? presets[getStandardOrder(product)?.presetIndex ?? 0]
    : Number.isInteger(preset) ? presets[preset] : undefined;
  const standardMinimum = selected ? getStandardMinimumQuantity(product, selected) : product?.minimum;
  const count = numericInput(quantity ?? (Number.isFinite(standardMinimum) ? standardMinimum : product?.minimum));
  let baseSubtotal = null;
  let multiplier = null;
  let quantityMultiplier = null;

  function result(status, issueKeys = [], subtotal = null) {
    const uniqueIssues = [...new Set(issueKeys)];
    return {
      status,
      subtotal,
      baseSubtotal,
      quantity: Number.isFinite(count) ? count : null,
      preset: selected ?? null,
      multiplier,
      quantityMultiplier,
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

  if (count >= product.minimum) {
    quantityMultiplier = 1;
  } else {
    const tier = getSmallOrderTier(product);
    if (tier && count >= tier.minimum) quantityMultiplier = tier.multiplier;
  }

  const issueKeys = [];
  if (quantityMultiplier === null) issueKeys.push('belowMinimum');
  const belowMinimumArea = count < getAreaMinimumQuantity(product, selected);
  const aboveStandardArea = !isStandardPreset(product, selected);
  if (belowMinimumArea) issueKeys.push('belowMinimumArea');
  if (aboveStandardArea) issueKeys.push('aboveStandardArea');
  if (belowMinimumArea || aboveStandardArea) quantityMultiplier = null;
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
  if (quantityMultiplier !== null) baseSubtotal = subtotalInRiyals(selected.unitPrice, count, quantityMultiplier);
  if (issueKeys.length) return result('review', issueKeys);

  multiplier = pricedOptions[0]?.multiplier ?? 1;
  return result('estimate', [], subtotalInRiyals(selected.unitPrice, count, quantityMultiplier * multiplier));
}

export function formatSAR(value, locale = 'en-SA') {
  if (!Number.isFinite(value)) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SAR',
    currencyDisplay: 'code',
    numberingSystem: 'latn',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
