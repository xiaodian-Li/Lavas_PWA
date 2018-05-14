/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author lixiaoyu(lixiaoyu@daojia.com)
 */

/* globals WorkboxSW */
importScripts('/static/js/workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW({
    cacheId: 'lavas-cache',
    ignoreUrlParametersMatching: [/^utm_/],
    skipWaiting: true,
    clientsClaim: true
});

// Define precache injection point.
workboxSW.precache([]);
workboxSW.router.registerNavigationRoute('/appshell'); // 设置动态缓存和 appshell
/**
 * example runningCache with api
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());
workboxSW.router.registerRoute(new RegExp('https://query\.yahooapis\.com/v1/public/yql'), // 雅虎天气的url在网络正常时会请求网络并更新缓存；否则会使用缓存内容
    workboxSW.strategies.networkFirst());

/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
// workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
//     workboxSW.strategies.cacheFirst({
//         cacheName: 'lavas-cache-images',
//         cacheExpiration: {
//             maxEntries: 100,
//             maxAgeSeconds: 7 * 24 * 60 * 60
//         },
//         cacheableResponse: {
//             statuses: [0, 200]
//         }
//     })
// );
