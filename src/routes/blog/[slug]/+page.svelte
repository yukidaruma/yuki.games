<script lang="ts">
	import { setContext } from 'svelte';
	import type { PageData } from './+page';
	import { formatDateFull } from '../blog-utils';
	import MarkdownBody from './markdown-body.svelte';

	export let data: PageData;

	setContext('markdown-content', data.content);
</script>

<svelte:head>
	<title>{data.frontmatter.title} - yuki.games/blog</title>
	<meta property="og:title" content={`${data.frontmatter.title} - yuki.games/blog`} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://yuki.games/blog/{data.slug}" />
	<link rel="alternate" type="text/markdown" title="Markdown source" href="/blog/{data.slug}.md" />
	{#if data.frontmatter.summary}
		<meta property="og:description" content={data.frontmatter.summary} />
	{/if}
</svelte:head>

<section>
	<header
		class="mt-4 flex md:block flex-col-reverse md:flex-row md:items-start md:justify-between gap-2"
	>
		<div
			class="md:float-right text-sm text-gray-500 font-mono grid grid-cols-[auto_1fr] gap-x-2 ml-8 mt-0! md:ml-0 md:text-right shrink-0"
		>
			<span class="md:text-right">Published at:</span>
			<date>{formatDateFull(data.frontmatter['published-at'])}</date>
			{#if data.frontmatter['updated-at']}
				<span class="md:text-right">Updated at:</span>
				<date>{formatDateFull(data.frontmatter['updated-at'])}</date>
			{/if}
		</div>
		<h2 class="mt-0! flex items-center">
			<span>{data.frontmatter.title}</span>
		</h2>
	</header>

	<article class="m mt-4">
		<MarkdownBody />
		<hr />
	</article>
</section>

<footer class="footer-links flex mt-8 pt-2 gap-2 text-xs justify-end">
	<a href={data.gitHubUrl} target="_blank">View on GitHub</a>
	<a href={`${data.gitHubUrl.replace('/blob/', '/blame/')}`} target="_blank">blame</a>
	<a href="/blog/{data.slug}.md" target="_blank">Markdown</a>
</footer>

<style>
	.footer-links a::before {
		content: '[';
	}
	.footer-links a::after {
		content: ']';
	}
</style>
