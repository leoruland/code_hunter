const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'QR Code Hunter App',
    short_name: 'Code Hunter',
    themeColor: '#362636',
    msTileColor: '#362636',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    
    // Workbox-Konfiguration
    workboxPluginMode: 'GenerateSW', // oder 'InjectManifest' für mehr Kontrolle
    workboxOptions: {
      // Service Worker Optionen
      skipWaiting: true,
      clientsClaim: true,
      
      // Caching-Strategien
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://api\\.example\\.com/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300 // 5 Minuten
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('\\.(png|jpg|jpeg|svg|gif)$'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Tage
            }
          }
        }
      ]
    },
    
    // Manifest-Konfiguration
    manifestOptions: {
      background_color: '#362636',
      icons: [
        {
          src: './img/icons/code_hunter_app_icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/code_hunter_app_icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './img/icons/code_hunter_app_icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  }
})
