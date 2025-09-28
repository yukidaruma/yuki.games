import type { PageServerLoad } from './$types';
import { ensureFrontmatterProperties, type BlogFrontmatter } from './blog-utils';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob('../../../blog.yuki.games/contents/*.md');

	const moduleEntries = Object.entries(modules);
	const loadedModules = await Promise.all(
		moduleEntries.map(async ([path, loader]) => {
			const mod = (await loader()) as { metadata: BlogFrontmatter };
			const slug = path.split('/').pop()!.replace('.md', '');
			return {
				slug,
				frontmatter: ensureFrontmatterProperties(slug, mod.metadata)
			};
		})
	);

	// Separate posts and archives
	const sortedModules = loadedModules.sort(
		(a, b) => b.frontmatter['published-at'].getTime() - a.frontmatter['published-at'].getTime()
	);

	const blogPosts = sortedModules.filter((post) => !post.frontmatter['is-archive']);
	const archivePosts = sortedModules.filter((post) => post.frontmatter['is-archive']);

	return {
		blogPosts,
		archivePosts
	};
};
