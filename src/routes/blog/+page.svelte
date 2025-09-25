<script lang="ts">
	import { onMount } from 'svelte';
	import { parseBlogPostSlug, type BlogFrontmatter } from './blog-utils';

	let blogPosts: Array<{
		slug: string;
		slugData: ReturnType<typeof parseBlogPostSlug>;
		frontmatter: BlogFrontmatter;
	}> = [];

	let archivePosts: Array<{
		slug: string;
		slugData: ReturnType<typeof parseBlogPostSlug>;
		frontmatter: BlogFrontmatter;
	}> = [];

	onMount(async () => {
		const modules = import.meta.glob('../../../blog.yuki.games/contents/*.md');

		const moduleEntries = Object.entries(modules);
		const loadedModules = await Promise.all(
			moduleEntries.map(async ([path, loader]) => {
				const mod = (await loader()) as { metadata: BlogFrontmatter };
				const slug = path.split('/').pop()!.replace('.md', '');
				return {
					slug,
					slugData: parseBlogPostSlug(slug),
					frontmatter: mod.metadata
				};
			})
		);

		// Separate posts and archives
		const sortedModules = loadedModules.sort(
			(a, b) => b.slugData.date.getTime() - a.slugData.date.getTime()
		);
		blogPosts = sortedModules.filter((post) => !post.frontmatter['is-archive']);
		archivePosts = sortedModules.filter((post) => post.frontmatter['is-archive']);
	});
</script>

<svelte:head>
	<title>Blog - yuki.games/blog</title>
</svelte:head>

{#each [blogPosts, archivePosts] as posts, index}
	<h2>{index === 0 ? 'Blog' : 'Old blog archive'}</h2>
	<section>
		<div>
			<ul>
				{#each posts as post}
					<li>
						{#if post.slugData.dateStr}
							<date>{post.slugData.dateStr}</date>
						{/if}
						<a href="/blog/{post.slug}" class="hover:underline">
							{post.frontmatter.title}
						</a>
						{#if post.frontmatter.summary}
							<p class="mt-2 text-gray-700">{post.frontmatter.summary}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/each}
