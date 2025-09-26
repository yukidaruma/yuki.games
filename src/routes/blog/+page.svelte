<script lang="ts">
	import { ensureFrontmatterProperties, formatDateFull, type BlogFrontmatter } from './blog-utils';

	let blogPosts: Array<{
		slug: string;
		frontmatter: BlogFrontmatter;
	}> = [];

	let archivePosts: Array<{
		slug: string;
		frontmatter: BlogFrontmatter;
	}> = [];

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
	blogPosts = sortedModules.filter((post) => !post.frontmatter['is-archive']);
	archivePosts = sortedModules.filter((post) => post.frontmatter['is-archive']);
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
						<date
							class={post.frontmatter['updated-at']
								? 'border-b border-dotted border-gray-400 cursor-help'
								: null}
							title={post.frontmatter['updated-at']
								? `Updated at: ${formatDateFull(post.frontmatter['updated-at'])}`
								: null}
						>
							{formatDateFull(post.frontmatter['published-at'])}
						</date>
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
