import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: []
	},
	optimizeDeps: {
		include: []
	},
	server: {
		host: '0.0.0.0',
		port: 5002
	},
	css: {
		devSourcemap: false
	},
	build: {
		assetsInlineLimit: 0, // Prevents inlining of small assets
		sourcemap: false
	}
});
