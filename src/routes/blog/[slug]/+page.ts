import { error } from '@sveltejs/kit';
import { parseBlogPostSlug, type BlogFrontmatter } from '../blog-utils';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export type PageData = {
	content: Component;
	frontmatter: BlogFrontmatter;
	gitHubUrl: string;
	date: Date;
	dateStr: string;
};

export const load: PageLoad<PageData> = async ({ params }) => {
	try {
		const modules = import.meta.glob('../../../../blog.yuki.games/contents/*.md');

		// Need to iterate to make Vite include them in the build time
		for (const path in modules) {
			if (!path.endsWith(`${params.slug}.md`)) {
				continue;
			}

			const contentPath = `contents/${params.slug}.md`;
			const post = (await modules[path]()) as {
				default: Component;
				metadata: BlogFrontmatter;
			};
			const { date, dateStr } = parseBlogPostSlug(params.slug);

			return {
				date,
				dateStr,
				content: post.default,
				frontmatter: post.metadata,
				gitHubUrl: `https://github.com/yukidaruma/blog.yuki.games/blob/publish/${contentPath}`
			};
		}
	} catch {
		// no-op
	}

	return error(404, 'Post not found');
};
