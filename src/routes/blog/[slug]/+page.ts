import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { ensureFrontmatterProperties } from '../blog-utils';
import type { BlogFrontmatter } from '../blog-utils';
import type { PageServerLoad } from './$types';

export const prerender = true;

export type PageData = {
	content: Component;
	frontmatter: BlogFrontmatter;
	gitHubUrl: string;
	slug: string;
};

export const load: PageServerLoad<PageData> = async ({ params }) => {
	try {
		const slug = params.slug.replace(/[^a-zA-Z0-9-_]/g, ''); // Sanitize input to prevent directory traversal
		const post = (await import(`../../../../blog.yuki.games/contents/${slug}.md`)) as {
			default: Component;
			metadata: BlogFrontmatter;
		};

		const contentPath = `contents/${slug}.md`;
		return {
			content: post.default,
			frontmatter: ensureFrontmatterProperties(params.slug, post.metadata),
			gitHubUrl: `https://github.com/yukidaruma/blog.yuki.games/blob/publish/${contentPath}`,
			slug: params.slug
		};
	} catch {
		// no-op
	}

	return error(404, 'Post not found');
};
