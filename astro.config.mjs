// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://everdantia.art',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap()],
});
