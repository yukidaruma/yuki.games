<script lang="ts">
	import type { PageData } from './+page';
	import { formatDateFull } from '../blog-utils';

	export let data: PageData;
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

<section class="mt-4">
	<header class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
		{#if data.frontmatter.title}
			<h2 class="mt-0!">
				<span>{data.frontmatter.title}</span>
			</h2>
		{/if}
		<div
			class="text-sm text-gray-500 font-mono grid grid-cols-[auto_1fr] gap-x-2 ml-8 mt-0! md:ml-0 md:text-right shrink-0"
		>
			<span class="md:text-right">Published at:</span>
			<date>{formatDateFull(data.frontmatter['published-at'])}</date>
			{#if data.frontmatter['updated-at']}
				<span class="md:text-right">Updated at:</span>
				<date>{formatDateFull(data.frontmatter['updated-at'])}</date>
			{/if}
		</div>
	</header>

	<div class="mt-4">
		<article class="markdown-body bg-inherit!">
			<svelte:component this={data.content} />
		</article>
	</div>
</section>

<footer class="footer-links flex mt-8 pt-2 border-t border-gray-700 gap-2 text-xs justify-end">
	<a href={data.gitHubUrl} target="_blank">View on GitHub</a>
	<a href={`${data.gitHubUrl.replace('/blob/', '/blame/')}`} target="_blank">blame</a>
	<a href="/blog/{data.slug}.md" target="_blank">Markdown</a>
</footer>

<style>
	@import 'tailwindcss';

	:global {
		@import 'github-markdown-css/github-markdown-dark.css';
		@import 'prism-themes/themes/prism-a11y-dark.css';

		.footer-links a::before {
			content: '[';
		}
		.footer-links a::after {
			content: ']';
		}

		.toc {
			@apply pb-6 mb-6 border-b-4 border-[#3d444d];
		}
		.toc .toc-level-1 {
			@apply pl-0 mb-0 ml-4;
		}
		.footnotes {
			@apply border-t-0!;
		}

		.markdown-body {
			ol {
				@apply list-decimal;
			}

			a,
			a code {
				@apply text-blue-400! underline!;
			}
			h3,
			h4,
			h5,
			h6 {
				@apply font-medium!;
			}

			/* Show class name on code blocks as language name */
			pre[class*='language-']:not(.language-undefined)::before {
				content: attr(class);
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				font-size: 0.75rem;
				font-weight: bold;
				color: #6b7280;
				text-transform: none;
				background: rgba(0, 0, 0, 0.1);
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;
			}
			pre[class*='language-'] {
				position: relative;
			}
		}
	}
</style>
