<script lang="ts">
	import { type Component, getContext } from 'svelte';

	const MDComponent = getContext<Component>('markdown-content');
</script>

<MDComponent />

<style lang="scss">
	@import 'tailwindcss';

	:global {
		@import 'prism-themes/themes/prism-a11y-dark.css';
		@import './github-markdown-dark.css';

		.m {
			// Higher contrast ratio for blog article
			@apply text-slate-200!;

			& > {
				.markdown-alert,
				blockquote,
				details,
				div,
				figure,
				h5,
				h6,
				hr,
				p,
				pre,
				ul,
				.toc hr {
					@apply ml-8!;
				}
				video {
					@apply pl-8;
				}
				ul {
					@apply pl-0;
				}
			}

			img,
			video {
				@apply w-full h-full contain-content;
			}

			h3 a {
				@apply flex items-center h-[calc(var(--text-lg)*var(--yuki-line-height))];
			}
			h4 a {
				@apply flex items-center h-[calc(var(--text-base)*var(--yuki-line-height))];
			}
			h3 a img,
			h4 a img,
			h5 a img,
			h6 a img {
				@apply ml-2 h-[16px]! w-[16px]! inline-block text-slate-100 pr-0!;
			}

			.toc {
				@apply mb-6;
			}
			.toc .toc-level-1 {
				@apply pl-0 mb-0 ml-8;
			}
			& > ol,
			.toc > ol {
				@apply list-decimal;
			}

			.footer-links a::before {
				content: '[';
			}
			.footer-links a::after {
				content: ']';
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
