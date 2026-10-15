import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // --- PWA baseline (S6). All keys explicit; fill deferred items at noted milestones.
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'MDpad',
        short_name: 'MDpad',
        description: 'GitHub-style single-file markdown editor',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        // TEMP icons (docs/icon_temp, user art pending G9). Replace at S9-final.
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        // M0 ⑤ fills runtimeCaching (MathJax/Mermaid/emoji lazy assets). Empty = nothing extra cached yet.
        runtimeCaching: [],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
})
