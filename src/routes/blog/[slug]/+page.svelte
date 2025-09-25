<script lang="ts">
	import type { PageData } from './+page';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.frontmatter.title} - yuki.games/blog</title>
</svelte:head>

<section>
	{#if data.frontmatter.title}
		<h2>
			<span>{data.frontmatter.title}</span>
		</h2>
	{/if}
	<div class="mt-0! text-base text-gray-400 font-mono">
		Published at: <date>{data.dateStr}</date>
	</div>

	<div class="mt-4">
		<article class="markdown-body bg-inherit!">
			<svelte:component this={data.content} />
		</article>
	</div>
</section>

<footer class="flex mt-8 pt-2 border-t border-gray-700 gap-2 justify-end">
	<a href={data.gitHubUrl} target="_blank">Read this on GitHub</a>
</footer>

<style>
	@import 'tailwindcss';

	:global {
		@import 'github-markdown-css/github-markdown-dark.css';
		@import 'prism-themes/themes/prism-a11y-dark.css';

		.toc {
			@apply pb-6 mb-6 border-b-4 border-[#3d444d];
		}
		.toc > ol {
			@apply pl-0 mb-0 ml-4;
		}
		.footnotes {
			@apply border-t-0!;
		}

		.markdown-body {
			ol {
				@apply list-decimal;
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
