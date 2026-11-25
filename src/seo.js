import { business, categories, getProduct, isAvailable, products, whatsappUrl } from './catalog.js';
import { copy } from './copy.js';
import { routePath } from './routes.js';
import { SITE_URL } from './site-url.js';

export { SITE_URL };

const businessId = SITE_URL + '#press';
const websiteId = SITE_URL + '#website';
const heroImage = new URL('media/hero-print.webp', SITE_URL).href;
const logo = new URL('media/brand-mark.webp', SITE_URL).href;
const pageUrl = (path, lang) => new URL(routePath(path, lang), SITE_URL).href;

function shareImage(source, imageAlt) {
  const filename = source.split('/').pop().replace(/\.webp$/, '.jpg');
  return {
    image: new URL('media/share/' + filename, SITE_URL).href,
    imageType: 'image/jpeg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt,
  };
}

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
      'تخدم مطابع القريتين حفر الباطن منذ عام 2005. تعرّف على خطوات طلب الطباعة وموقع المطابع وساعات العمل وطريقة الوصول.'],
  },
  cart: {
    en: ['Cart', 'Review the items in your Al Qaryatin Press order.'],
    ar: ['السلة', 'راجع المنتجات في طلبك لدى مطابع القريتين.'],
  },
};

function schema(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

function pageNode(path, lang, name, description, type = 'WebPage') {
  const url = pageUrl(path, lang);
  return {
    '@type': type,
    '@id': url + '#webpage',
    url, name, description,
    inLanguage: lang,
    isPartOf: { '@id': websiteId },
    publisher: { '@id': businessId },
  };
}

function businessSchema(lang, page) {
  const arabic = lang === 'ar';
  return schema({
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_URL,
    name: arabic ? business.nameAr : business.name,
    alternateName: arabic ? business.name : business.nameAr,
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
    telephone: business.orderPhone,
    contactPoint: {
      '@type': 'ContactPoint',
      url: whatsappUrl,
      telephone: business.orderPhone,
      contactType: arabic ? 'طلبات الطباعة' : 'Print orders',
    },
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
  }, { ...page, about: { '@id': businessId } });
}

function productMetadata(product, path, lang) {
  const arabic = lang === 'ar';
  const name = arabic ? product.nameAr : product.name;
  const description = arabic ? product.descriptionAr : product.description;
  const url = pageUrl(path, lang);
  const itemId = pageUrl(path, 'en') + '#item';
  const category = categories.find(category => category.id === product.category);
  const categoryName = arabic ? category.labelAr : category.label;
  const isService = product.category === 'services';
  const trail = [['', copy[lang].home], ['catalogue', copy[lang].catalog], [path, name]];
  return {
    title: `${name} | ${arabic ? business.nameAr : business.name}`,
    description: arabic
      ? `${name} من ${business.nameAr} في ${business.cityAr}. ${description}`
      : `${name} from ${business.name} in ${business.city}. ${description}`,
    ...shareImage(product.image, arabic ? `نموذج ${name}` : `${name} product mockup`),
    type: 'product',
    indexable: true,
    structuredData: schema({
      ...pageNode(path, lang, name, description),
      mainEntity: { '@id': itemId },
      breadcrumb: { '@id': url + '#breadcrumbs' },
    }, {
      '@id': itemId,
      '@type': isService ? 'Service' : 'Product',
      name, description, url,
      image: new URL(product.image, SITE_URL).href,
      category: categoryName,
      ...(isService
        ? { provider: { '@id': businessId } }
        : { material: arabic ? product.materialAr : product.material }),
    }, {
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumbs',
      itemListElement: trail.map(([route, title], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: title,
        item: pageUrl(route, lang),
      })),
    }),
  };
}

function contentSchema(path, lang, label, description) {
  if (path === '' || path === 'about') {
    const type = path === 'about' ? 'AboutPage' : 'WebPage';
    return businessSchema(lang, pageNode(path, lang, label, description, type));
  }
  if (path === 'calculator') return schema(pageNode(path, lang, label, description));
  if (path !== 'catalogue') return null;
  const items = products.filter(isAvailable);
  return schema({
    ...pageNode(path, lang, label, description, 'CollectionPage'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: lang === 'ar' ? product.nameAr : product.name,
        url: pageUrl('product/' + product.id, lang),
      })),
    },
  });
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
    ...shareImage(heroImage, arabic
      ? 'كتيب وبطاقات ومجلد مطبوعة بألوان كحلية وذهبية'
      : 'A printed booklet, cards and presentation folder in navy and gold'),
    type: 'website',
    indexable: Boolean(localizedPage) && path !== 'cart',
    structuredData: contentSchema(path, lang, label, description),
  };
}
