import toc from '@jsdevtools/rehype-toc';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
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
				rehypeGithubAlerts,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: {
							className: ['anchor'],
							ariaHidden: true,
							tabIndex: -1
						},
						content() {
							return {
								type: 'element',
								tagName: 'img',
								properties: {
									src: '/octicon-link.svg'
								},
								children: []
							};
						}
					}
				],
				[
					toc,
					{
						customizeTOC(toc) {
							toc.children.push({ type: 'element', tagName: 'hr', properties: {}, children: [] });
							return toc;
						}
					}
				],
				[
					rehypeUrls,
					function (url, node) {
						const isExternalLink = url.href.startsWith('http') || url.href.startsWith('https');
						if (!isExternalLink && url.pathname?.endsWith('.md')) {
							url.pathname = url.pathname.slice(0, -3);
						}
						if (node.tagName === 'a' && isExternalLink) {
							node.properties.target = '_blank';
						}

						return url;
					}
				]
			]
		})
	],

	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css_unused_selector') return;

		handler(warning);
	},

	kit: {
		adapter: adapter()
	},

	compilerOptions: {
		experimental: {
			async: true
		}
	}
};
