import { error } from '@sveltejs/kit';
import { ensureFrontmatterProperties } from '../blog-utils';
import type { BlogFrontmatter } from '../blog-utils';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export type PageData = {
	content: Component;
	frontmatter: BlogFrontmatter;
	gitHubUrl: string;
	slug: string;
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
			return {
				content: post.default,
				frontmatter: ensureFrontmatterProperties(params.slug, post.metadata),
				gitHubUrl: `https://github.com/yukidaruma/blog.yuki.games/blob/publish/${contentPath}`,
				slug: params.slug
			};
		}
	} catch {
		// no-op
	}

	return error(404, 'Post not found');
};
