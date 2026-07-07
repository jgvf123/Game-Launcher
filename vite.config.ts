import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { VitePWA } from 'vite-plugin-pwa'

// Two build flavors share one config:
//  - default (`npm run build`): installable PWA — manifest + service worker,
//    ready for static hosting (GitHub Pages) and "Add to Home screen" on Android.
//  - BUILD_SINGLE=1 (`npm run build:single`): everything inlined into one
//    dist/index.html that runs from disk with no server.
const single = process.env.BUILD_SINGLE === '1'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    single
      ? viteSingleFile()
      : VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg'],
          manifest: {
            name: 'Frame School',
            short_name: 'Frame School',
            description:
              'A self-study reference and quiz app for the visual grammar of filmmaking.',
            display: 'standalone',
            orientation: 'portrait',
            start_url: './',
            scope: './',
            background_color: '#fafafa',
            theme_color: '#c2410c',
            icons: [
              { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
              {
                src: 'icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
              },
            ],
          },
          workbox: {
            // Precache the whole app so it works fully offline once installed.
            globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          },
        }),
  ],
})
