import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';
import path from 'path';


export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const certPath = path.resolve('./localhost+3.pem');
  const keyPath = path.resolve('./localhost+3-key.pem');
  const httpsConfig = isServe && fs.existsSync(certPath) && fs.existsSync(keyPath)
    ? {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
    : undefined;

  return {
    base: '/code_hunter/',
    plugins: [
      basicSsl(),
      vue(),
      VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      
      manifest: {
        name: 'QR Code Hunter App',
        short_name: 'Code Hunter',
        description: 'es ist sehr gut.',
        theme_color: '#362636',
        background_color: '#362636',
        display: 'standalone',
        icons: [
          {
            src: 'icons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      
      // Workbox-Konfiguration
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Tage
              }
            },
          },
          {
            urlPattern: /^https:\/\/api\.example\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60 // 5 Minuten
              }
            }
          },
        ]
      },
      
      // DevOptions für Entwicklung aktivieren
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
    ],
    server: {
      host: true,
      https: httpsConfig,
    }
  };
});
