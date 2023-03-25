
const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
};

const putInCache = async (request, response) => {
    const cache = await caches.open('v1');
    await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  //Prioritize network requests
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (responseFromCache) {
      return responseFromCache;
    }
    if (fallbackResponse) {
      return fallbackResponse;
    }
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }  
  
  
    // Next try to get the resource from the network
    
};

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
};

self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
    event.waitUntil(
      addResourcesToCache([
        '/',
        '/index.html',
        '/scripts/app.js',
        '/scripts/sw.js',
        '/scripts/chess.js',
        '/manifest.webmanifest',
        '/img/chesspieces/wikipedia/bB.png',
        '/img/chesspieces/wikipedia/bK.png',
        '/img/chesspieces/wikipedia/bN.png',
        '/img/chesspieces/wikipedia/bP.png',
        '/img/chesspieces/wikipedia/bQ.png',
        '/img/chesspieces/wikipedia/bR.png',
        '/img/chesspieces/wikipedia/wB.png',
        '/img/chesspieces/wikipedia/wK.png',
        '/img/chesspieces/wikipedia/wN.png',
        '/img/chesspieces/wikipedia/wP.png',
        '/img/chesspieces/wikipedia/wQ.png',
        '/img/chesspieces/wikipedia/wR.png',
        '/img/icons/icon-192x192.png',
        '/img/icons/icon-256x256.png',
        '/img/icons/icon-384x384.png',
        '/img/icons/icon-512x512.png',
        '/img/icons/menu.png',
        '/assets/Roboto/Roboto-Black.ttf',
        '/assets/Roboto/Roboto-Light.ttf',
      ])
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: '/img/icons/icon-192x192.png',
      })
    );
});