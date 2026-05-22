import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://institutowushusanchai.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
