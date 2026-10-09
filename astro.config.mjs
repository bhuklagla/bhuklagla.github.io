import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const local = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = process.env.PUBLIC_SITE_URL || local.PUBLIC_SITE_URL || undefined;
export default defineConfig({
  site,
  base: process.env.PUBLIC_BASE_PATH || local.PUBLIC_BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: site
    ? [
        sitemap({
          filter: (page) => !/\/(?:insights|offline|404)\/?$/.test(new URL(page).pathname),
        }),
      ]
    : [],
  devToolbar: { enabled: false },
  vite: { build: { chunkSizeWarningLimit: 650 } },
});
