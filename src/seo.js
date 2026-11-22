import { business, getProduct, isAvailable } from './catalog.js';
import { copy } from './copy.js';
import { routePath } from './routes.js';

export const SITE_URL = 'https://mahmoudbkanaan.github.io/al-qaryatin-press/';

const businessId = SITE_URL + '#press';
const heroImage = new URL('media/hero.webp', SITE_URL).href;
const logo = new URL('media/brand-mark.webp', SITE_URL).href;
const pageUrl = (path, lang) => new URL(routePath(path, lang), SITE_URL).href;

const pages = {
  '': {
    en: ['Printing, Packaging & Signage in Hafr Al Batin',
      'Al Qaryatin Press in Hafr Al Batin offers commercial printing, custom packaging, stickers, signs and displays. Browse products and estimate your print order.'],
    ar: ['طباعة وتغليف ولوحات في حفر الباطن',
      'مطابع القريتين في حفر الباطن للمطبوعات التجارية والتغليف المخصص والملصقات واللوحات. تصفّح الكتالوج واحسب تكلفة طلب الطباعة.'],
  },
  catalogue: {
    en: ['Print & Packaging Catalogue',
      'Browse business cards, brochures, boxes, bags, stickers and signs from Al Qaryatin Press. Compare standard sizes and order estimates in Hafr Al Batin.'],
    ar: ['كتالوج المطبوعات والتغليف',
      'تصفّح كروت وبروشورات وعلب وأكياس وملصقات ولوحات مطابع القريتين في حفر الباطن. قارن المقاسات وتقديرات الأسعار قبل الطلب.'],
  },
  calculator: {
    en: ['Print Price Calculator',
      'Estimate your print order with Al Qaryatin Press. Select a product, size and quantity to see a price estimate or prepare a quote request.'],
    ar: ['حاسبة أسعار الطباعة',
      'احسب التكلفة التقديرية لطلبك لدى مطابع القريتين. اختر المنتج والمقاس والكمية لعرض تقدير السعر أو إعداد طلب عرض سعر.'],
  },
  about: {
    en: ['About the Print Shop in Hafr Al Batin',
      'Al Qaryatin Press has served Hafr Al Batin since 2005. Find our address, opening hours and directions, and learn how to place a print order.'],
    ar: ['عن المطابع وموقعها في حفر الباطن',
      'تخدم مطابع القريتين حفر الباطن منذ عام ٢٠٠٥. تعرّف على خطوات طلب الطباعة وموقع المطابع وساعات العمل وطريقة الوصول.'],
  },
  cart: {
    en: ['Cart', 'Review the items in your Al Qaryatin Press order.'],
    ar: ['السلة', 'راجع المنتجات في طلبك لدى مطابع القريتين.'],
  },
};

function schema(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

function businessSchema(lang) {
  const arabic = lang === 'ar';
  return schema({
    '@type': 'WebSite',
    '@id': SITE_URL + '#website',
    url: SITE_URL,
    name: business.name,
    alternateName: business.nameAr,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': businessId },
  }, {
    '@type': 'LocalBusiness',
    '@id': businessId,
    url: SITE_URL,
    name: arabic ? business.nameAr : business.name,
    alternateName: arabic ? business.name : business.nameAr,
    description: copy[lang].brandPromise,
    logo,
    image: heroImage,
    foundingDate: String(business.founded),
    hasMap: business.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: arabic ? `${business.streetAr}، ${business.districtAr}` : `${business.street}, ${business.district}`,
      addressLocality: arabic ? business.cityAr : business.city,
      postalCode: business.postcode,
      addressCountry: 'SA',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '23:00',
    },
  });
}

function productMetadata(product, path, lang) {
  const arabic = lang === 'ar';
  const name = arabic ? product.nameAr : product.name;
  const trail = [['', copy[lang].home], ['catalogue', copy[lang].catalogTitle], [path, name]];
  return {
    title: `${name} | ${arabic ? business.nameAr : business.name}`,
    description: arabic
      ? `${name} من ${business.nameAr} في ${business.cityAr}. تعرّف على المواصفات والخيارات وقدّر تكلفة طلبك.`
      : `${product.description} Explore specifications and request a quote from ${business.name}.`,
    image: new URL(product.image, SITE_URL).href,
    imageAlt: arabic ? `صورة توضيحية: ${name}` : `${name} product mockup`,
    type: 'product',
    indexable: true,
    structuredData: schema({
      '@type': 'BreadcrumbList',
      itemListElement: trail.map(([route, title], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: title,
        item: pageUrl(route, lang),
      })),
    }),
  };
}

export function pageMetadata(path = '', lang = 'en') {
  const arabic = lang === 'ar';
  if (path.startsWith('product/')) {
    const product = getProduct(path.slice('product/'.length));
    if (isAvailable(product)) return productMetadata(product, path, lang);
  }

  const localizedPage = Object.hasOwn(pages, path) ? pages[path][lang] : null;
  const [label, description] = localizedPage ?? (arabic
    ? ['الصفحة غير موجودة', 'ارجع إلى مطابع القريتين أو تصفّح كتالوج المطبوعات.']
    : ['Page not found', 'Visit Al Qaryatin Press or browse our print catalogue.']);
  const name = arabic ? business.nameAr : business.name;
  return {
    title: path === '' ? `${name} | ${label}` : `${label} | ${name}`,
    description,
    image: heroImage,
    imageAlt: arabic ? 'نماذج تغليف وطباعة تشمل كتيبًا وبطاقات وعلبة عرض' : 'Print and packaging mockups with a booklet, cards and a presentation box',
    type: 'website',
    indexable: Boolean(localizedPage) && path !== 'cart',
    structuredData: path === '' || path === 'about' ? businessSchema(lang) : null,
  };
}
