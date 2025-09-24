<script lang="ts">
	import { onMount } from 'svelte';

	import '../app.css';
	import '../global.css';
	let { children } = $props();

	// If JavaScript is enabled, add ".js" class to <html>
	onMount(() => {
		document.documentElement.classList.add('js-enabled');
	});
</script>

<div id="app" class="max-w-3xl mx-auto px-4">
	<h1>
		<a href="/" class="text-current!" title="Yuki.games - Home">Yuki.games</a>
	</h1>
	{@render children()}
</div>

<style>
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
</style>
