<script lang="ts">
	import { type Component, getAllContexts, getContext, onMount } from 'svelte';

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
				.markdown-alert {
				}
				blockquote,
				details,
				div,
				figure,
				p,
				pre,
				ul,
				h5,
				h6,
				hr,
				.toc hr {
					@apply ml-8!;
				}
				ul {
					@apply pl-0;
				}
			}

			h3,
			h4,
			h5,
			h6 {
				@apply flex items-center;
			}

			.anchor {
				@apply ml-2!;
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
