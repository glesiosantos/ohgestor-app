import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

// Permite que o service worker assuma o controle imediatamente
clientsClaim()

// Limpa caches antigos
cleanupOutdatedCaches()

// Pré-cache de arquivos estáticos gerados pelo Quasar
precacheAndRoute(self.__WB_MANIFEST)

// Ignorar requisições para a API
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api',
    networkTimeoutSeconds: 5
  })
)

// Estratégia para navegação (HTML)
registerRoute(
  new NavigationRoute(new StaleWhileRevalidate({
    cacheName: 'pages'
  }))
)

// Evento de instalação
self.addEventListener('install', () => {
  console.log('Service Worker instalado')
  self.skipWaiting()
})

// Evento de ativação
self.addEventListener('activate', () => {
  console.log('Service Worker ativado')
})
