import { products } from './catalog-data.js';
export { products };

// Product specifications and rates from Al Qaryatin Press Knowledge Base EN v1.0, chapter 13.
// Keep source rows separate even where their catalogue codes match.
export const business = {
  "name": "Al Qaryatin Press",
  "nameAr": "مطابع القريتين",
  "founded": 2005,
  "city": "Hafr Al Batin",
  "cityAr": "حفر الباطن",
  "district": "Al Khalidiyyah",
  "districtAr": "الخالدية",
  "street": "Prince Sultan bin Abdulaziz Street",
  "streetAr": "شارع الأمير سلطان بن عبدالعزيز",
  "country": "Saudi Arabia",
  "countryAr": "المملكة العربية السعودية",
  "postcode": "39953",
  "postcodeAr": "٣٩٩٥٣",
  "timeZone": "Asia/Riyadh",
  "hours": "Saturday–Thursday, 09:00–23:00",
  "hoursAr": "السبت–الخميس، ٠٩:٠٠–٢٣:٠٠",
  "closed": "Friday",
  "closedAr": "الجمعة",
  "mapsUrl": "https://maps.app.goo.gl/rjZ8sLKiXXuygppB6",
  "deliveryFee": 15,
  "minimumDeposit": 0.5,
  "revisionRounds": 2
};

export const categories = [
  {"id":"print","label":"Commercial print","labelAr":"المطبوعات التجارية"},
  {"id":"packaging","label":"Packaging","labelAr":"التغليف"},
  {"id":"stickers","label":"Stickers & vinyl","labelAr":"الملصقات والفينيل"},
  {"id":"signage","label":"Signs & displays","labelAr":"اللوحات والاستاندات"},
  {"id":"stationery","label":"Office & stationery","labelAr":"المكتبيات والأختام"},
  {"id":"gifts","label":"Gifts & apparel","labelAr":"الهدايا والملابس"},
  {"id":"awards","label":"Awards","labelAr":"الدروع والتكريم"},
  {"id":"services","label":"Design & print services","labelAr":"خدمات التصميم والطباعة"},
];

const productsById = new Map(products.map(product => [product.id, product]));

export function getProduct(id) {
  return productsById.get(id);
}

export function isAvailable(product) {
  return product?.available === true;
}

export function isOptionAvailable(option) {
  return option.available !== false && (!option.productId || isAvailable(getProduct(option.productId)));
}

export const featuredProducts = [
  'business-cards',
  'paper-boxes',
  'roll-up-display-stands',
  'paper-stickers',
  'acrylic-award',
  'ceramic-mugs',
].map(getProduct);
