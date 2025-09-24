<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import '../app.css';
	import '../global.css';
	let { children } = $props();

	// If JavaScript is enabled, add ".js" class to <html>
	onMount(() => {
		document.documentElement.classList.add('js-enabled');
	});

	const navData = $derived(
		(() => {
			const currentPath = page.url.pathname;

			const navTuples = [
				['/', 'Home'],
				['/blog', 'Blog'],
				['/privacy', 'Privacy Policy']
			];

			return navTuples.map(([href, label]) => ({
				href,
				label,
				isActive: href === '/' ? currentPath === '/' : currentPath.startsWith(href)
			}));
		})()
	);
</script>

<svelte:head>
	<title>Blog - yuki.games</title>
</svelte:head>

<div id="app" class="max-w-4xl mx-auto px-4">
	<h1 class="flex items-center space-x-2 [&>a]:text-current! [&>span]:text-gray-500">
		<a href="/" class="inline-block" title="yuki.games - Home">yuki.games</a>
		{#each navData as item}
			{#if item.href !== '/' && item.isActive}
				<span>/</span>
				<a href={item.href} class="hover:underline">{item.href.substring(1)}</a>
			{/if}
		{/each}
	</h1>
	<nav>
		{#each navData as item}
			<a href={item.href} data-active={item.isActive} class="data-[active=true]:text-current!">
				{item.label}
			</a>
		{/each}
	</nav>
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
