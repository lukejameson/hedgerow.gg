/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);
	const headers = new Headers(response.headers);
	const path = event.url.pathname;

	// Add security headers
	headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
	headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	headers.set('X-Content-Type-Options', 'nosniff');

	// Handle static assets
	if (path.startsWith('/_app/')) {
		if (path.endsWith('.js')) {
			headers.set('Content-Type', 'application/javascript; charset=utf-8');
		} else if (path.endsWith('.css')) {
			headers.set('Content-Type', 'text/css; charset=utf-8');
		} else if (path.endsWith('.svg')) {
			headers.set('Content-Type', 'image/svg+xml');
		} else if (path.endsWith('.png')) {
			headers.set('Content-Type', 'image/png');
		} else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
			headers.set('Content-Type', 'image/jpeg');
		}

		// Cache control for immutable content
		if (path.includes('/immutable/')) {
			headers.set('Cache-Control', 'public, max-age=31536000, immutable');
		} else {
			headers.set('Cache-Control', 'public, max-age=3600');
		}
	}

	return new Response(response.body, {
		status: response.status,
		headers
	});
}
