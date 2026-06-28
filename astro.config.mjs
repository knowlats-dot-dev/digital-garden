// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'
import svelte from '@astrojs/svelte'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks:  ['sans-serif'],
      weights: [400, 500, 600]
    },
    {
      provider: fontProviders.fontsource(),
      name: "Bitcount Prop Single",
      cssVariable: "--font-pixel",
      fallbacks: ["monospace"],
      weights: [400],
    },
    ]
})
