<script lang="ts">
	import { page } from '$app/state';
	import GitHubSearch from '$lib/components/GitHubSearch.svelte';

	import '../app.css';
	import '../global.css';
	let { children } = $props();

	const navData = $derived(
		(() => {
			const currentPath = page.url.pathname;

			const navTuples = [
				['/', 'Home'],
				['/blog', 'Blog (ja)'],
				['/privacy', 'Privacy Policy']
			];

			return navTuples.map(([href, label]) => ({
				href,
				label,
				isActive: href === '/' ? currentPath === '/' : currentPath.startsWith(href)
			}));
		})()
	);

	const isBlog = $derived(page.url.pathname.startsWith('/blog'));
</script>

<svelte:head>
	<title>Blog - yuki.games</title>
	<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
</svelte:head>

<div id="app" class="max-w-4xl mx-auto px-4">
	<div>
		<div class="flex items-center justify-between">
			<h1 class="flex items-center space-x-2 [&>a]:text-current! [&>span]:text-gray-500">
				<a href="/" class="inline-block" title="yuki.games - Home">yuki.games</a>
				{#each navData as item}
					{#if item.href !== '/' && item.isActive}
						<span>/</span>
						<a href={item.href} class="hover:underline">{item.href.substring(1)}</a>
					{/if}
				{/each}
			</h1>
			{#if isBlog}
				<div class="hidden md:block">
					<GitHubSearch
						repository="yukidaruma/blog.yuki.games"
						label="Search on GitHub:"
						labelClass="font-light text-sm"
					/>
				</div>
			{/if}
		</div>

		<nav>
			{#each navData as item}
				<a href={item.href} data-active={item.isActive} class="data-[active=true]:text-current!">
					{item.label}
				</a>
			{/each}
		</nav>

		{#if isBlog}
			<div class="flex-1 block md:hidden my-2 ml-8">
				<GitHubSearch
					repository="yukidaruma/blog.yuki.games"
					label="Search on GitHub:"
					labelClass="font-light text-sm"
				/>
			</div>
		{/if}
	</div>

	{@render children()}
</div>

<style>
	@import 'tailwindcss';

	:global {
		.js {
			display: none;
		}
		html.js-enabled .js {
			display: initial;
		}
		html.js-enabled .no-js {
			display: none;
		}
	}

	nav {
		@apply text-sm font-light ml-7 space-x-2 py-2;
	}
	nav a {
		@apply before:content-['['] after:content-[']'];
	}
</style>
