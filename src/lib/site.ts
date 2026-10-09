export const business = {
  name: 'Bhuk Lagla Kitchen',
  city: 'Sundargarh',
  region: 'Odisha',
  email: 'bhuklagla@outlook.com',
  tagline: 'Big cravings. Small budget.',
  zomato: 'https://link.zomato.com/xqzv/rshare?id=15027983430563a88',
};
export const base = import.meta.env.BASE_URL;
export const url = (path = '') => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const publicationUrl = import.meta.env.PUBLIC_SITE_URL || '';
export const canonical = (pathname: string) =>
  publicationUrl ? new URL(pathname, publicationUrl).href : undefined;
