import toc from '@jsdevtools/rehype-toc';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeUrls from 'rehype-urls';
import remarkFootnotes from 'remark-footnotes';
import remarkHeadingId from 'remark-heading-id';

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [[remarkHeadingId, { defaults: true, uniqueDefaults: true }], remarkFootnotes],
			rehypePlugins: [
				toc,
				{
					customizeTOC: function (toc) {
						return {
							type: 'root',
							children: [
								{
									type: 'element',
									tagName: 'h3'
								},
								toc
							]
						};
					}
				},
				[
					rehypeUrls,
					function (url) {
						if (url.pathname?.endsWith('.md')) {
							url.pathname = url.pathname.slice(0, -3);
						}
						return url;
					}
				]
			]
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},

	compilerOptions: {
		experimental: {
			async: true
		}
	}
};
