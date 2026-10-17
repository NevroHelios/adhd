// Offline support: precache the build and static files, then serve
// cache-first for those and network-first (with cache fallback) for the rest.

import { self } from '$app/service-worker';
import { version } from '$app/env';
import { assets, immutable, prerendered } from '$app/manifest';
import { resolve } from '$app/paths';

const CACHE = `cache-${version}`;
const ASSETS = [...immutable, ...assets, ...prerendered].map((a) => resolve(a.path));

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	async function respond() {
		const cache = await caches.open(CACHE);
		if (ASSETS.includes(url.pathname)) {
			const hit = await cache.match(url.pathname);
			if (hit) return hit;
		}
		try {
			const res = await fetch(event.request);
			if (res.status === 200) void cache.put(event.request, res.clone());
			return res;
		} catch (err) {
			const hit = await cache.match(event.request);
			if (hit) return hit;
			throw err;
		}
	}
	event.respondWith(respond());
});
