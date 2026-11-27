import { business, categories, getProduct, isAvailable, products, whatsappUrl } from './catalog.js';
import { copy } from './copy.js';
import { categoryFromPath, categoryPath, routePath } from './routes.js';
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
    en: ['Print Shop, Packaging & Signage in Hafr Al Batin',
      'Visit Al Qaryatin Press in Hafr Al Batin for business card printing, branded packaging and signage. Browse the print catalogue, estimate your order or find the shop.'],
    ar: ['طباعة وتغليف ولوحات في حفر الباطن',
      'تقدّم مطبعة القريتين في حفر الباطن طباعة بطاقات الأعمال والأكياس الورقية والملصقات واللوحات. تصفّح المنتجات واحسب تكلفة طلبك أو اعثر على موقع المطبعة.'],
  },
  catalogue: {
    en: ['Print & Packaging Catalogue',
      'Browse business cards, brochures, boxes, bags, stickers and signs from Al Qaryatin Press. Compare standard sizes and order estimates in Hafr Al Batin.'],
    ar: ['كتالوج المطبوعات والتغليف',
      'تصفّح كروت وبروشورات وعلب وأكياس وملصقات ولوحات مطابع القريتين في حفر الباطن. قارن المقاسات وتقديرات الأسعار قبل الطلب.'],
  },
  calculator: {
    en: ['Printing Cost Calculator & Quote Request',
      'Estimate printing costs in Saudi riyals by product, size and quantity. Add finishes and send your specifications to Al Qaryatin Press for a print quote.'],
    ar: ['حاسبة أسعار الطباعة',
      'احسب تكلفة الطباعة بالريال السعودي حسب المنتج والمقاس والكمية. اختر التشطيب وأرسل المواصفات إلى مطابع القريتين لطلب عرض سعر طباعة.'],
  },
  about: {
    en: ['Print Shop Address & Opening Hours in Hafr Al Batin',
      'Find Al Qaryatin Press on Prince Sultan bin Abdulaziz Street in Al Khalidiyyah, Hafr Al Batin. Check opening hours, get directions or contact the press on WhatsApp.'],
    ar: ['عنوان مطابع القريتين وساعات العمل في حفر الباطن',
      'تقع مطبعة القريتين في حي الخالدية بحفر الباطن على شارع الأمير سلطان بن عبدالعزيز. اطّلع على أوقات الدوام واتجاهات الوصول ورقم واتساب المطبعة.'],
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

function breadcrumbNode(path, lang, trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': pageUrl(path, lang) + '#breadcrumbs',
    itemListElement: trail.map(([route, name], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: pageUrl(route, lang),
    })),
  };
}

function businessSchema(lang, page) {
  const arabic = lang === 'ar';
  const alternateName = [arabic ? business.name : business.nameAr, 'مطبعة القريتين'];
  return schema({
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_URL,
    name: arabic ? business.nameAr : business.name,
    alternateName: [...alternateName, new URL(SITE_URL).hostname],
    inLanguage: ['en', 'ar'],
    publisher: { '@id': businessId },
  }, {
    '@type': 'LocalBusiness',
    '@id': businessId,
    url: SITE_URL,
    name: arabic ? business.nameAr : business.name,
    alternateName,
    description: copy[lang].brandPromise,
    logo,
    image: heroImage,
    foundingDate: String(business.founded),
    hasMap: business.mapsUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4243072,
      longitude: 45.9528997,
    },
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
    areaServed: {
      '@type': 'City',
      name: arabic ? business.cityAr : business.city,
      alternateName: [arabic ? business.city : business.cityAr, 'Hafar Al-Batin'],
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
  const trail = [['', copy[lang].home], ['catalogue', copy[lang].catalog], [categoryPath(category.id), categoryName], [path, name]];
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
    }, breadcrumbNode(path, lang, trail)),
  };
}

function contentSchema(path, lang, label, description, category) {
  if (path === '' || path === 'about') {
    const type = path === 'about' ? 'AboutPage' : 'WebPage';
    return businessSchema(lang, pageNode(path, lang, label, description, type));
  }
  if (path === 'calculator') return schema(pageNode(path, lang, label, description));
  if (path !== 'catalogue' && !category) return null;
  const items = products.filter(product => isAvailable(product) && (!category || product.category === category.id));
  const collection = {
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
  };
  if (!category) return schema(collection);
  const categoryLabel = lang === 'ar' ? category.labelAr : category.label;
  const breadcrumb = breadcrumbNode(path, lang, [['', copy[lang].home], ['catalogue', copy[lang].catalog], [path, categoryLabel]]);
  return schema({ ...collection, breadcrumb: { '@id': breadcrumb['@id'] } }, breadcrumb);
}

export function pageMetadata(path = '', lang = 'en') {
  const arabic = lang === 'ar';
  if (path.startsWith('product/')) {
    const product = getProduct(path.slice('product/'.length));
    if (isAvailable(product)) return productMetadata(product, path, lang);
  }

  const category = categoryFromPath(path);
  const localizedPage = category
    ? [arabic ? category.titleAr : category.title, arabic ? category.descriptionAr : category.description]
    : Object.hasOwn(pages, path) ? pages[path][lang] : null;
  const [label, description] = localizedPage ?? (arabic
    ? ['الصفحة غير موجودة', 'ارجع إلى مطابع القريتين أو تصفّح كتالوج المطبوعات.']
    : ['Page not found', 'Visit Al Qaryatin Press or browse our print catalogue.']);
  const preview = category && products.find(product => isAvailable(product) && product.category === category.id);
  const share = preview
    ? shareImage(preview.image, arabic ? preview.nameAr : preview.name)
    : shareImage(heroImage, arabic ? 'كتيب وبطاقات ومجلد مطبوعة بألوان كحلية وذهبية' : 'A printed booklet, cards and presentation folder in navy and gold');
  const name = arabic ? business.nameAr : business.name;
  return {
    title: path === '' ? `${name} | ${label}` : `${label} | ${name}`,
    description,
    ...share,
    type: 'website',
    indexable: Boolean(localizedPage) && path !== 'cart',
    structuredData: contentSchema(path, lang, label, description, category),
  };
}
