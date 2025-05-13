// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import expressiveCode from 'astro-expressive-code'
import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'

export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
    build: {
      chunkSizeWarningLimit: 1200,
    },
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },
  integrations: [sitemap(), robotsTxt(), react(), expressiveCode(), mdx()],
})
