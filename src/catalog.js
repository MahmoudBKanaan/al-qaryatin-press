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
  "postcodeAr": "39953",
  "timeZone": "Asia/Riyadh",
  "hours": "Saturday–Thursday, 09:00–23:00",
  "hoursAr": "السبت–الخميس، 09:00–23:00",
  "closed": "Friday",
  "closedAr": "الجمعة",
  "mapsUrl": "https://maps.app.goo.gl/rjZ8sLKiXXuygppB6",
  "orderPhone": "+966568080265",
  "deliveryFee": 15,
  "minimumDeposit": 0.5,
  "revisionRounds": 2
};

export const whatsappUrl = 'https://wa.me/' + business.orderPhone.slice(1);

export const categories = [
  {
    id: 'print', label: 'Commercial print', labelAr: 'المطبوعات التجارية',
    title: 'Business cards, brochures and commercial printing',
    titleAr: 'طباعة بطاقات الأعمال والبروشورات والمطبوعات التجارية',
    description: 'Introduce your business with printed cards or a folded leaflet. For longer pieces, explore menu, magazine and book printing.',
    descriptionAr: 'عرّف بنشاطك ببطاقة عمل أو مطوية تشرح خدماتك. وللمحتوى الأطول، اختر من قوائم الطعام والمجلات والكتب المطبوعة.',
  },
  {
    id: 'packaging', label: 'Packaging', labelAr: 'التغليف',
    title: 'Branded paper bags, boxes and cups',
    titleAr: 'طباعة الأكياس والعلب والأكواب الورقية',
    description: 'Package your products in paper bags or boxes printed with your shop’s logo, or choose branded paper cups for a café or event.',
    descriptionAr: 'قدّم منتجات متجرك في أكياس أو علب ورقية مطبوعة بشعارك، أو اختر أكوابًا ورقية تحمل هوية مقهاك أو مناسبتك.',
  },
  {
    id: 'stickers', label: 'Stickers & vinyl', labelAr: 'الملصقات والفينيل',
    title: 'Custom stickers, product labels and vinyl graphics',
    titleAr: 'طباعة ملصقات المنتجات والفينيل',
    description: 'Choose paper labels for packaging, perforated vinyl for glass, or cut vinyl lettering for a logo with no background.',
    descriptionAr: 'اختر الملصقات الورقية لتغليف المنتجات، أو الفينيل المثقّب لزجاج الواجهات، أو الحروف والشعارات المفرّغة لتثبيتها على السطح مباشرة.',
  },
  {
    id: 'signage', label: 'Signs & displays', labelAr: 'اللوحات والاستاندات',
    title: 'Printed signs, banners and display stands',
    titleAr: 'طباعة اللوحات والبنرات وحوامل العرض',
    description: 'Display a design on a printed wall panel, mark an event entrance with a floor stand, or take a roll-up banner to an exhibition.',
    descriptionAr: 'اعرض تصميمك على لوحة جدارية مطبوعة، أو اختر حاملًا أرضيًا لمدخل مناسبتك أو لوحة عرض قابلة للّف لمشاركتك في معرض.',
  },
  {
    id: 'stationery', label: 'Office & stationery', labelAr: 'المكتبيات والأختام',
    title: 'Business stationery, invoice books and stamps',
    titleAr: 'دفاتر الفواتير والأختام والمطبوعات المكتبية',
    description: 'Keep track of payments with invoice and receipt books, prepare correspondence on company letterhead, or choose a personal or self-inking stamp.',
    descriptionAr: 'نظّم معاملات منشأتك بدفاتر الفواتير وسندات القبض والصرف، واختر لمراسلاتك ورقًا رسميًا يحمل شعار المنشأة أو ختمًا ذاتي التحبير.',
  },
  {
    id: 'gifts', label: 'Gifts & apparel', labelAr: 'الهدايا والملابس',
    title: 'Personalised gifts and garment printing',
    titleAr: 'طباعة الهدايا والملابس حسب الطلب',
    description: 'Put your design on ceramic mugs or metal keychains for giveaways, or choose printed clothing and caps for your event team.',
    descriptionAr: 'اطبع تصميمك على أكواب السيراميك أو ميداليات المفاتيح لتقديمها هدايا، أو اختر ملابس وقبعات مطبوعة لفريقك في الفعاليات.',
  },
  {
    id: 'awards', label: 'Awards', labelAr: 'الدروع والتكريم',
    title: 'Personalised awards and recognition plaques',
    titleAr: 'دروع تكريم بالأسماء والشعارات',
    description: 'Mark an achievement with the recipient’s name or a dedication. Compare acrylic, glass, crystal and wooden awards for your ceremony.',
    descriptionAr: 'احتفِ بإنجاز المكرّم بدرع يحمل اسمه أو عبارة إهداء. قارن بين دروع الأكريليك والزجاج والكريستال والخشب واختر ما يناسب حفل التكريم.',
  },
  {
    id: 'services', label: 'Design & print services', labelAr: 'خدمات التصميم والطباعة',
    title: 'Graphic design, document printing and binding',
    titleAr: 'التصميم الجرافيكي وطباعة المستندات وتجليدها',
    description: 'Request a design for print or publication. For finished documents, choose colour or black-and-white copies and metal wire binding for pages that open flat.',
    descriptionAr: 'اطلب تصميمًا جاهزًا للطباعة أو النشر. وللمستندات الجاهزة، اختر نسخًا ملوّنة أو بالأبيض والأسود مع خيار التجليد بالسلك المعدني لفتح الصفحات بسهولة.',
  },
];

const productsById = new Map(products.map(product => [product.id, product]));

export function getProduct(id) {
  return productsById.get(id);
}

export function isAvailable(product) {
  return product?.available === true;
}

export function getSmallOrderTier(product) {
  if (!isAvailable(product)) return null;
  const { lowerThreshold: minimum, smallOrderValue } = product;
  if (!Number.isSafeInteger(minimum) || minimum < 1 || minimum >= product.minimum || typeof smallOrderValue !== 'string') return null;
  const multiplier = Number(/^(\d+(?:\.\d+)?)x$/i.exec(smallOrderValue.trim())?.[1]);
  return Number.isFinite(multiplier) && multiplier > 1 ? { minimum, multiplier } : null;
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
