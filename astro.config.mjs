// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://everdantia.art',
  output: 'static',
  integrations: [sitemap()],
});
