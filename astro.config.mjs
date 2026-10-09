import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || undefined;
export default defineConfig({
  site,
  base: process.env.PUBLIC_BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
  vite: { build: { chunkSizeWarningLimit: 650 } },
});
