import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		viteStaticCopy({
			targets: [{ src: 'blog.yuki.games/contents/static/**/*', dest: 'blog/static' }]
		}),
		sveltekit(),
		tailwindcss()
	],
	server: {
		fs: {
			allow: ['blog.yuki.games']
		}
	}
});
