import { business, canonical, url } from './site';
import { menu, categories } from './menu';

export const absolute = (path: string) => canonical(url(path));
export const displayDate = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
export const restaurantId = () => `${absolute('')}#restaurant`;

export function pageGraph(pathname: string, title: string, description: string, image: string) {
  const pageUrl = canonical(pathname);
  if (!pageUrl) return undefined;
  const home = absolute('')!;
  const parts = pathname.slice(url('').length).split('/').filter(Boolean);
  const labels: Record<string, string> = {
    menu: 'Menu',
    category: 'Categories',
    blog: 'Food talk',
    festivals: 'Festival season',
    about: 'Our kitchen',
    contact: 'Contact',
    sundargarh: 'Sundargarh',
    privacy: 'Privacy',
  };
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: home }];
  parts.forEach((part, index) => {
    if (part === 'category') return;
    const name =
      menu.find((item) => item.id === part)?.name ||
      categories.find((cat) => cat.id === part)?.name ||
      labels[part] ||
      title.split(' | ')[0];
    crumbs.push({
      '@type': 'ListItem',
      position: crumbs.length + 1,
      name,
      item: absolute(`${parts.slice(0, index + 1).join('/')}/`)!,
    });
  });
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': restaurantId(),
        name: business.name,
        url: home,
        email: business.email,
        description:
          'Pure-veg, egg-free pizza, grilled sandwiches and snacks in Sundargarh. Browse here and order on Zomato.',
        servesCuisine: ['Vegetarian', 'Pizza', 'Sandwiches', 'Snacks'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: business.city,
          addressRegion: business.region,
          addressCountry: 'IN',
        },
        logo: absolute('brand/logo.webp'),
        image: absolute('images/menu/paneer-chataka-pizza-960.webp'),
        hasMenu: absolute('menu/'),
      },
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        url: home,
        name: business.name,
        inLanguage: 'en-IN',
        publisher: { '@id': restaurantId() },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${home}#website` },
        about: { '@id': restaurantId() },
        primaryImageOfPage: { '@type': 'ImageObject', url: absolute(image) },
        breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
      },
      { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: crumbs },
    ],
  };
}
