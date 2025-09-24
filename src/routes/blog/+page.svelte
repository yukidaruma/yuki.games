<script lang="ts">
	import { onMount } from 'svelte';
	import { parseBlogPostSlug, type BlogFrontmatter } from './blog-utils';

	let blogPosts: Array<{
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

		blogPosts = loadedModules.sort((a, b) => b.slugData.date.getTime() - a.slugData.date.getTime());
	});
</script>

<svelte:head>
	<title>Blog - yuki.games/blog</title>
</svelte:head>

<h2>Blog</h2>
<section>
	<div>
		<ul>
			{#each blogPosts as post}
				<li>
					<a href="/blog/{post.slug}" class="hover:underline">
						{post.frontmatter.title}
					</a>
					{#if post.slugData.dateStr}
						(<time>{post.slugData.dateStr}</time>)
					{/if}
					{#if post.frontmatter.summary}
						<p class="mt-2 text-gray-700">{post.frontmatter.summary}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>
